import type { ReturnTypeOfCreateAsyncController} from './asyncController';
import { createAsyncController } from './asyncController';
import type { DependencyList } from 'react';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import type { PickPromiseType, PromiseFunction} from './common';
import { shallowEqual } from './common';

export interface AsyncFunctionState<T> {
	loading: boolean;
	error: any;
	data: T;
}

const initDeps: any[] = [];

export interface UseAsyncFunctionOptions {
	/**
	 * dependence list，it works when manual is false
	 */
	deps?: DependencyList;
	/**
	 * whether to call fn manually
	 */
	manual?: boolean;
	/**
	 * the fn function can only be called once at a time，default is true
	 */
	single?: boolean;
	/**
	 * debounce time config. default value is -1 which means no debounce feature,
	 */
	debounceTime?: number;
	/**
	 * time to live of cache, default is -1
	 */
	ttl?: number;
}

export type UseAsyncFunctionReturn<F extends PromiseFunction> = {
	/**
	 * return value of fn
	 */
	data: PickPromiseType<F> | null;
	/**
	 * promise's loading status
	 */
	loading: true;
	/**
	 * promise's error value
	 */
	error: any;
	/**
	 * proxy of fn, same as fn.
	 */
	run: F,
	fnProxy: ReturnTypeOfCreateAsyncController<F>,
} | {
	data: PickPromiseType<F>;
	loading: false;
	error: any;
	run: F,
	fnProxy: ReturnTypeOfCreateAsyncController<F>,
}


export const useAsyncFunction = <F extends PromiseFunction>(
	fn: F,
	opts: UseAsyncFunctionOptions = {},
): UseAsyncFunctionReturn<F> => {
	const { deps, manual, single, debounceTime = -1, ttl = -1 } = opts;
	const stateRef = useRef({
		isMounted: false,
		depsRef: initDeps as DependencyList,
		id: {},
	});
	const argsRef = useRef({
		fn,
		deps: undefined as DependencyList | undefined,
		manual: false,
		single: true,
		debounceTime: -1,
		ttl: -1,
	});
	const [asyncFunctionState, setAsyncFunctionState] = useState<
		AsyncFunctionState<PickPromiseType<F> | null>
	>({
		loading: !manual,
		error: null,
		data: null,
	});
	argsRef.current.fn = fn;
	argsRef.current.manual = !!manual;
	argsRef.current.single = !!single;
	argsRef.current.deps = deps;
	argsRef.current.debounceTime = debounceTime;
	argsRef.current.ttl = ttl;

	if (deps && !Array.isArray(deps)) {
		throw new Error('The deps must be an Array!');
	}

	const fnProxy = useMemo(() => {
		return createAsyncController(
			(...arg: Parameters<F>) => argsRef.current.fn(...(arg as any)),
			{
				single: argsRef.current.single,
				debounceTime: argsRef.current.debounceTime,
				ttl: argsRef.current.ttl,
			}
		);
	}, [])

	const runFn = useCallback(async (...args: Parameters<F>) => {
		await Promise.resolve();
		setAsyncFunctionState((ov) => {
			if (ov.loading) {
				return ov;
			}
			return {
				...ov,
				loading: true,
			};
		});
		try {
			const res = await fnProxy(...args);
			setAsyncFunctionState((ov) => {
				if (!ov.loading && ov.error === null && ov.data === res) {
					return ov;
				}
				return {
					loading: false,
					error: null,
					data: res,
				};
			});
			return res;
		} catch (err) {
			setAsyncFunctionState((ov) => {
				if (!ov.loading && ov.error === err && ov.data === null) {
					return ov;
				}
				return {
					error: err,
					loading: false,
					data: null,
				};
			});
			if (argsRef.current.manual) {
				throw err;
			}
		}
	}, [fnProxy]) as unknown as F;

	useEffect(() => {
		const ld = argsRef.current.deps;
		if (ld?.length) {
			stateRef.current.depsRef = ld;
		}
		stateRef.current.isMounted = true;
		if (argsRef.current.manual) {
			return;
		}
		// @ts-ignore
		runFn();
	}, [runFn]);

	useEffect(() => {
		if (!stateRef.current.isMounted || stateRef.current.depsRef === initDeps) {
			return;
		}
		const ld = argsRef.current.deps;
		if (shallowEqual(ld!, stateRef.current.depsRef)) {
			return;
		}
		stateRef.current.depsRef = ld!;
		if (argsRef.current.manual) {
			return;
		}
		// @ts-ignore
		runFn();
	}, [deps, runFn]);

	return {
		data: asyncFunctionState.data,
		loading: asyncFunctionState.loading,
		error: asyncFunctionState.error,
		run: runFn,
		fnProxy: fnProxy as any,
	} as UseAsyncFunctionReturn<F>;
};
