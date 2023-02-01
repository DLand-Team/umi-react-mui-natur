import type { PickPromiseType } from 'natur/dist/ts-utils';
import type { DependencyList } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

export type PromiseFunction = (...args: any) => Promise<any>;

const shallowEqual = (arr1: DependencyList, arr2: DependencyList) => {
	if (arr1.length !== arr2.length) {
		return false;
	}
	if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
		return false;
	}
	return arr1.every((a1, index) => a1 === arr2[index]);
};

type HttpState<T> = {
	loading: boolean;
	error: Error | null;
	data: T;
};

const initDeps: any[] = [];

export interface UseHttpOptions {
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
}

export const useHttp = <F extends PromiseFunction>(
	fn: F,
	opts: UseHttpOptions = {},
): {
	data: PickPromiseType<F> | null;
	loading: boolean;
	error: Error | null;
	run: F,
} => {
	const { deps, manual, single = true } = opts;
	const isMounted = useRef(false);
	const isLoading = useRef<any>();
	const depsRef = useRef<DependencyList>(initDeps);
	const argsRef = useRef({
		fn,
		deps: undefined as DependencyList | undefined,
		manual: false,
		single: true,
	});
	const [httpStatus, setHttpStatus] = useState<HttpState<PickPromiseType<F> | null>>({
		loading: false,
		error: null,
		data: null,
	});
	argsRef.current.fn = fn;
	argsRef.current.manual = !!manual;
	argsRef.current.single = !!single;
	argsRef.current.deps = deps;


	if (deps && !Array.isArray(deps)) {
		throw new Error('The second argument of useHttp must be an Array!');
	}

	const runFn = useCallback((...args: Parameters<F>) => {
		if (isLoading.current && argsRef.current.single) {
			return isLoading.current;
		}
		isLoading.current = Promise.resolve().then(() => {
			setHttpStatus((ov) => ({
				...ov,
				loading: true,
			}));
			return argsRef.current.fn!(...args as any)
		}).then((res) => {
				setHttpStatus({
					loading: false,
					error: null,
					data: res,
				});
				return res;
			})
			.catch((err) => {
				setHttpStatus(() => ({
					error: err,
					loading: false,
					data: null,
				}));
				throw err;
			}).finally(() => {
				isLoading.current = undefined;
			});
		return isLoading.current;
	}, []) as F;

	useEffect(() => {
		if (isMounted.current) {
			return;
		}
		const ld = argsRef.current.deps;
		if (ld?.length) {
			depsRef.current = ld;
		}
		isMounted.current = true;
		if (argsRef.current.manual) {
			return;
		}
		// @ts-ignore
		runFn();
	}, [runFn]);

	useEffect(() => {
		if (isMounted.current === false || depsRef.current === initDeps) {
			return;
		}
		const ld = argsRef.current.deps;
		if (shallowEqual(ld!, depsRef.current)) {
			return;
		}
		depsRef.current = ld!;
		if (argsRef.current.manual) {
			return;
		}
		// @ts-ignore
		runFn();
	}, [deps, runFn]);

	return {
		data: httpStatus.data,
		loading: httpStatus.loading,
		error: httpStatus.error,
		run: runFn,
	};
};
