import { isBrowser } from './index';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFlatInject, useLocation as useOriginLocation } from 'umi';
import qs from 'qs';
import type { Observable } from 'rxjs';
import { debounce } from 'lodash';

export {
	useInject,
	useFlatInject
} from 'umi'


/**
 * ahook的useMount在react strict模式下会执行两次，所以自己实现此方法
 * @param fn
 */
export const useMount = (fn: () => any) => {
	const mountedRef = useRef(false);
	useEffect(() => {
		if (mountedRef.current) {
			return;
		}
		mountedRef.current = true;
		fn();
	}, []);
};

export const useBrowserInit = (fn: () => any) => {
	const initRef = useRef(false);
	if (!initRef.current && isBrowser) {
		initRef.current = true;
		fn();
	}
};

export interface LocationQuery {
	redirect?: string;
	[k: string]: string | undefined;
}

export const useLocation = <T extends LocationQuery = LocationQuery>() => {
	const $location = useOriginLocation();
	let query: T = {} as T;
	if ($location.search) {
		query = {
			...qs.parse($location.search.slice(1)),
		} as T;
	}
	return {
		...$location,
		query,
	};
};

export { useAsyncFunction as useHttp } from 'great-async';



export function useLoading(loading: boolean) {
  const [{ show, hide }] = useFlatInject("loading", {});
	const showLoadingRef = useRef(0);
  useEffect(() => {
    if (loading && showLoadingRef.current === 0) {
      show();
			showLoadingRef.current++;
    } else if(!loading && showLoadingRef.current > 0) {
      hide();
			showLoadingRef.current--;
    }
  }, [hide, loading, show]);
	useEffect(() => {
		return () => {
			if (showLoadingRef.current > 0) {
				hide();
			}
		}
	}, [hide])
}


export const useMousePosition = () => {
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
	});
	useEffect(() => {
		const eventListner = (event: MouseEvent) => {
			setPosition({
				x: event.clientX,
				y: event.clientY,
			});
		}
		document.addEventListener('mousemove', eventListner);
		return () => document.removeEventListener('mousemove', eventListner);
	}, []);
	return position;
}

export const useObservable = <T extends any = any>(observer: Observable<T>, listener: (v: T) => any) => {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;
  useEffect(() => {
    const unsubHandler = observer.subscribe((value) => {
      listenerRef.current?.(value);
    });
    return () => unsubHandler.unsubscribe();
  }, [observer]);
};

export const useObservableState = <T extends any = any>(observer: Observable<T>, defaultState: T) => {
  const [state, setState] = useState(defaultState);
  useEffect(() => {
    const unsubHandler = observer.subscribe(setState);
    return () => unsubHandler.unsubscribe();
  }, [observer]);
  return state;
};



export function useEventListener<E extends HTMLElement, ET extends keyof HTMLElementEventMap>(
	ele: E | null,
	eventType: ET,
	eventHandler: (e: HTMLElementEventMap[ET]) => any,
): void;
export function useEventListener<
	E extends SVGElement,
	ET extends keyof SVGElementEventMap,
	// eslint-disable-next-line @typescript-eslint/unified-signatures
>(ele: E | null, eventType: ET, eventHandler: (e: SVGElementEventMap[ET]) => any): void;
export function useEventListener<
	E extends Document,
	ET extends keyof DocumentEventMap,
	// eslint-disable-next-line @typescript-eslint/unified-signatures
>(ele: E | null, eventType: ET, eventHandler: (e: DocumentEventMap[ET]) => any): void;
export function useEventListener<
	E extends Window,
	ET extends keyof WindowEventMap,
	// eslint-disable-next-line @typescript-eslint/unified-signatures
>(ele: E | null, eventType: ET, eventHandler: (e: WindowEventMap[ET]) => any): void;
export function useEventListener<E extends HTMLElement, ET extends keyof HTMLElementEventMap>(
	ele: E | null,
	eventType: ET,
	eventHandler: (e: HTMLElementEventMap[ET]) => any,
) {
	const eventHandlerRef = useRef(eventHandler);
	eventHandlerRef.current = eventHandler;
	const [,refresh] = useState({});
	useEffect(() => {
		if (!ele) {
			setTimeout(() => {
				refresh({});
			})
		}
	}, [ele]);
	useEffect(() => {
		if (ele) {
			const eventHandle = (e: HTMLElementEventMap[ET]) => {
				eventHandlerRef.current?.(e);
			};
			ele.addEventListener(eventType, eventHandle);
			return () => {
				ele.removeEventListener(eventType, eventHandle);
			};
		}
	}, [ele, eventType]);
}



export function useFn<T extends (...args: any) => any>(fn: T) {
	const fnRef = useRef(fn);
	fnRef.current = fn;
	return useCallback((...args: Parameters<T>) => {
		// @ts-ignore
		fnRef.current?.(...args);
	}, []);
}

export function useDebounceFn<T extends (...args: any) => any>(fn: T, time: number = 10) {
	const fnProxy = useFn(fn);
	return useMemo(() => {
		return debounce(fnProxy, time);
	}, []);
}
