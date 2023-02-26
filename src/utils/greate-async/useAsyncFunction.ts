import type { ClearCache, CreateAsyncControllerOptions} from './asyncController';
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

export interface UseAsyncFunctionOptions<F extends PromiseFunction> extends CreateAsyncControllerOptions<F> {
	/**
	 * dependence list，it works when manual is false
	 */
	deps?: DependencyList;
	/**
	 * whether to call fn manually
	 */
	manual?: boolean;
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
	 * the difference is calling run will update loading state
	 */
	run: F,
	clearCache: ClearCache<F>;
} | {
	data: PickPromiseType<F>;
	loading: false;
	error: any;
	run: F,
	clearCache: ClearCache<F>;
}


export const useAsyncFunction = <F extends PromiseFunction>(
	fn: F,
	opts: UseAsyncFunctionOptions<F> = {},
) => {
	const {
		deps,
		manual = false,
		...createAsyncControllerOptions
	} = opts;
	const stateRef = useRef({
		isMounted: false,
		depsRef: initDeps as DependencyList,
		id: {},
	});
	const argsRef = useRef({
		fn,
		deps: undefined as DependencyList | undefined,
		manual: false,
	});
	const [createAsyncControllerOpts] = useState(createAsyncControllerOptions);
	const [asyncFunctionState, setAsyncFunctionState] = useState<
		AsyncFunctionState<PickPromiseType<F> | null>
	>({
		loading: !manual,
		error: null,
		data: null,
	});
	argsRef.current.fn = fn;
	argsRef.current.manual = manual;
	argsRef.current.deps = deps;

	if (deps && !Array.isArray(deps)) {
		throw new Error('The deps must be an Array!');
	}

	const fnProxy = useMemo(() => {
		const fn1 = (...args: Parameters<F>) => argsRef.current.fn(...(args as any));
		return createAsyncController(
			fn1 as F,
			createAsyncControllerOpts
		);
	}, [createAsyncControllerOpts]);

	const createRunFn = useCallback((throwError: boolean) => {
		return async (...args: Parameters<F>) => {
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
				if (throwError) {
					throw err;
				}
			}
		}
	}, [fnProxy]);

	const runFn = useMemo(() => createRunFn(false), [createRunFn]);
	const manualRunFn = useMemo(() => createRunFn(true), [createRunFn]) as F;

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
		run: manualRunFn,
		clearCache: fnProxy.clearCache
	} as UseAsyncFunctionReturn<F>;
};

