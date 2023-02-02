import type { PickPromiseType } from 'natur/dist/ts-utils';
import type { DependencyList } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

export type PromiseFunction = (...args: any) => Promise<any>;

const shallowEqual = (arr1: DependencyList, arr2: DependencyList) => {
	if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
		return false;
	}
	if (arr1.length !== arr2.length) {
		return false;
	}
	return arr1.every((a1, index) => a1 === arr2[index]);
};

export interface AsyncFunctionState<T> {
	loading: boolean;
	error: Error | null;
	data: T;
}

const initDeps: any[] = [];

export interface UseAsyncFunctionOptions {
	/**
	 * 依赖项，manual为false时有效
	 */
	deps?: DependencyList;
	/**
	 * 是否需要手动触发
	 */
	manual?: boolean;
	/**
	 * 同时只能发起一个请求，默认true
	 */
	single?: boolean;
	/**
	 * 防抖参数，默认-1，无防抖
	 */
	debounceTime?: number;
}

const listeners = new Map<
	{},
	{
		resolve: (...arg: any) => any;
		reject: (...arg: any) => any;
	}[]
>();

/**
 * 占位值
 */
export const PLACEHOLDER_VALUE = {};

export const useAsyncFunction = <F extends PromiseFunction>(
	fn: F,
	opts: UseAsyncFunctionOptions = {},
): {
	data: PickPromiseType<F> | null;
	loading: boolean;
	error: Error | null;
	run: F;
} => {
	const { deps, manual, single = true, debounceTime = -1 } = opts;
	const stateRef = useRef({
		isMounted: false,
		isLoading: undefined as undefined | ReturnType<F>,
		depsRef: initDeps as DependencyList,
		id: {},
		timeoutHandler: null as any,
	});
	const argsRef = useRef({
		fn,
		deps: undefined as DependencyList | undefined,
		manual: false,
		single: true,
		debounceTime: -1,
	});
	const [asyncFunctionState, setAsyncFunctionState] = useState<
		AsyncFunctionState<PickPromiseType<F> | null>
	>({
		loading: false,
		error: null,
		data: null,
	});
	argsRef.current.fn = fn;
	argsRef.current.manual = !!manual;
	argsRef.current.single = !!single;
	argsRef.current.deps = deps;
	argsRef.current.debounceTime = debounceTime;

	if (deps && !Array.isArray(deps)) {
		throw new Error('The deps must be an Array!');
	}

	const runFn = useCallback((...args: Parameters<F>) => {
		if (
			stateRef.current.isLoading &&
			argsRef.current.single &&
			argsRef.current.debounceTime === -1
		) {
			return stateRef.current.isLoading;
		}
		stateRef.current.isLoading = Promise.resolve()
			.then(() => {
				setAsyncFunctionState((ov) => {
					if (ov.loading) {
						return ov;
					}
					return {
						...ov,
						loading: true,
					};
				});
				return new Promise<void>((resolve, reject) => {
					if (argsRef.current.debounceTime === -1) {
						return resolve();
					}
					if (!Array.isArray(listeners.get(stateRef.current.id))) {
						listeners.set(stateRef.current.id, []);
					}
					listeners.get(stateRef.current.id)!.push({
						resolve,
						reject,
					});
					if (stateRef.current.timeoutHandler) {
						clearTimeout(stateRef.current.timeoutHandler);
					}
					stateRef.current.timeoutHandler = setTimeout(() => {
						resolve();
					}, argsRef.current.debounceTime);
				});
			})
			.then((arg: any) => {
				if (arg === undefined) {
					return argsRef.current.fn!(...(args as any))
						.then((res) => {
							listeners.get(stateRef.current.id)?.forEach((i) => {
								i.resolve(res || PLACEHOLDER_VALUE);
							});
							if (listeners.has(stateRef.current.id)) {
								listeners.set(stateRef.current.id, []);
							}
							return res;
						})
						.catch((err) => {
							listeners.get(stateRef.current.id)?.forEach((i) => {
								i.reject(err || PLACEHOLDER_VALUE);
							});
							if (listeners.has(stateRef.current.id)) {
								listeners.set(stateRef.current.id, []);
							}
							throw err;
						});
				}
				return arg;
			})
			.then((res) => {
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
			})
			.catch((err) => {
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
				throw err;
			})
			.finally(() => {
				stateRef.current.isLoading = undefined;
			}) as ReturnType<F>;
		return stateRef.current.isLoading;
	}, []) as unknown as F;

	useEffect(() => {
		if (stateRef.current.isMounted) {
			return;
		}
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

	useEffect(() => {
		return () => {
			if (stateRef.current.isLoading) {
				stateRef.current.isLoading.then(() => {
					if (listeners.has(stateRef.current.id)) {
						listeners.delete(stateRef.current.id);
					}
				});
			} else {
				if (listeners.has(stateRef.current.id)) {
					listeners.delete(stateRef.current.id);
				}
			}
		};
	}, []);

	return {
		data: asyncFunctionState.data,
		loading: asyncFunctionState.loading,
		error: asyncFunctionState.error,
		run: runFn,
	};
};
