import { isBrowser } from './index';
import { useEffect, useRef, useSyncExternalStore } from "react"
import { store, useLocation as useOriginLocation } from 'umi'
import qs from 'qs';
import { useRequest } from 'ahooks';
import type { LazyStoreModules, Modules, Store } from 'natur';

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
}


export const useBrowserInit = (fn: () => any) => {
    const initRef = useRef(false);
    if (!initRef.current && isBrowser) {
        initRef.current = true;
        fn();
    }
}

export const useLocation = () => {
    const $location = useOriginLocation();
    let query = {};
    if ($location.search) {
        query = {
            ...qs.parse($location.search.slice(1)),
        }
    }
    return {
        ...$location,
        query
    }
}

export type UseHttpArgs = Parameters<typeof useRequest>


/**
 * 包装一层useRequest
 * @param args 
 * @returns 
 */
export const useHttp = (...args: UseHttpArgs) => {
 const res =	useRequest(...args);
 return res;
}

export const createUseNatur = <
	M extends Modules,
	LM extends LazyStoreModules,
>(storeIns: Store<M, LM>) => {
	/**
	 * natur hooks函数
	 */
	return function useNatur(moduleName: keyof Store<M, LM>['type']) {
		const stateRef = useRef<any>();
	 	return useSyncExternalStore(on => storeIns.subscribe(moduleName, on), () => {
			const m = storeIns.getModule(moduleName as string);
			if (m.state !== stateRef.current?.state) {
				stateRef.current = m
			}
			return stateRef.current;
		});
	}
}

export const useNatur = createUseNatur(store);
