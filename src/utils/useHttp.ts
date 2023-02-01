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
	deps?: DependencyList;
	manual?: boolean;
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
	const isMounted = useRef(false);
	const isManual = useRef(false);
	const fnRef = useRef<PromiseFunction>();
	const [httpStatus, setHttpStatus] = useState<HttpState<PickPromiseType<F> | null>>({
		loading: false,
		error: null,
		data: null,
	});
	fnRef.current = fn;

	const { deps, manual } = opts;

	const depsRef = useRef<DependencyList>(initDeps);
	const latestDepsRef = useRef<DependencyList>();

	isManual.current = !!manual;
	latestDepsRef.current = deps;

	if (deps && !Array.isArray(deps)) {
		throw new Error('The second argument of useHttp must be an Array!');
	}

	const runFn = useCallback((...args: Parameters<F>) => {
		setHttpStatus((ov) => ({
			...ov,
			loading: true,
		}));
		return fnRef
			.current!(...args as any)
			.then((res) => {
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
			});
	}, []) as F;

	useEffect(() => {
		if (isMounted.current) {
			return;
		}
		const ld = latestDepsRef.current;
		if (ld?.length) {
			depsRef.current = ld;
		}
		isMounted.current = true;
		if (isManual.current) {
			return;
		}
		// @ts-ignore
		runFn();
	}, [runFn]);

	useEffect(() => {
		if (isMounted.current === false || depsRef.current === initDeps) {
			return;
		}
		const ld = latestDepsRef.current;
		if (shallowEqual(ld!, depsRef.current)) {
			return;
		}
		depsRef.current = ld!;
		if (isManual.current) {
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
