import type { AnyFn, PromiseFunction } from "./common";
import { FalsyValue } from "./common";


export interface CacheData {
	timestamp: number;
	data: any;
}

export const cacheMap = typeof WeakMap !== 'undefined' ? new WeakMap<AnyFn, Map<string, CacheData>>() : new Map<AnyFn, Map<string, CacheData>>();

type Timer = ReturnType<typeof setTimeout>;


function createClearExpiredCache(fn: PromiseFunction, ttl: number) {
	let timer: Timer | null = null;
	return function clearExpiredCache() {
		if (timer) {
			clearTimeout(timer);
		}
		// put operation into micro event loop, so it will not impact the main process
		timer = setTimeout(() => {
			const fnCache = cacheMap.get(fn);
			if (!fnCache) {
				return;
			}
			const now = Date.now();
			fnCache.forEach((value, key) => {
				if (now - value.timestamp > ttl) {
					fnCache.delete(key);
				}
			});
		});
	}
}


function clearCache(fn: PromiseFunction, key?: string) {
  const fnCache = cacheMap.get(fn);
  if (!fnCache) {
    return;
  }
  if (key) {
    fnCache.delete(key);
  } else {
    fnCache.clear();
  }
}


function defaultGenKeyByParams(params: any[]) {
	return JSON.stringify(params);
}

export interface CreateAsyncControllerOptions<F extends PromiseFunction = PromiseFunction> {
	/**
	 * debounce time config. default value is -1 which means no debounce feature,
	 */
	debounceTime?: number;
	/**
	 * time to live of cache, default is -1
	 */
	ttl?: number;
	/**
	 * the fn function can only be called once at a time，default is true
	 */
	single?: boolean;
	/**
	 * a strategy to genrate key of cache
	 */
	genKeyByParams?: (params: Parameters<F>) => string;
	/**
	 * retry count of call function when error occur
	 */
	retryCount?: number;
	/**
	 * retry strategy, if return value is true, it will retry to call function
	 * @param error 
	 * @returns 
	 */
	retryStrategy?: (error: any) => boolean;
}


export interface ClearCache<F extends PromiseFunction> {
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	(...params: Parameters<F>): void;
	(): void;
}

export type ReturnTypeOfCreateAsyncController<F extends PromiseFunction> = {
	(...arg: Parameters<F>): ReturnType<F>;
	clearCache: ClearCache<F>;
};

/**
 * create async controller, http request is the main use case
 * support debounce, cache, single mode
 * @param fn A function and it's return type must be Promise
 * @param param1 createAsyncController options
 * @returns 
 */
export function createAsyncController<F extends PromiseFunction>(fn: F, {
  debounceTime = -1,
  ttl = -1,
	single = false,
	retryCount = 0,
	retryStrategy = (error) => !!error,
	genKeyByParams = defaultGenKeyByParams
}: CreateAsyncControllerOptions<F> = {}) {
  let fetchMemberPageListTimer: any = null;
	let promiseHandler: Promise<any> | null;
	const clearExpiredCache = createClearExpiredCache(fnProxy, ttl);

  let listener: {
		resolve: (arg?: any) => any,
		reject: (arg?: any) => any,
	}[] = [];

	async function retryFn(params: Parameters<F>, _retryCount: number = 0): Promise<ReturnType<F>> {
		try {
			const res = await fn(...(params as any[]));
			return res;
		} catch (error) {
			if (_retryCount > 0 && retryStrategy(error)) {
				return retryFn(params, _retryCount - 1);
			}
			throw error;
		}
	}

  function fnProxy (...params: Parameters<F>): ReturnType<F> {
    const key = genKeyByParams(params);
    const thisCache = cacheMap.get(fnProxy);
    const cacheObj = thisCache?.get(key);
		if (ttl !== -1) {
			// Check and delete expired caches on each call to prevent out of memory error
			clearExpiredCache();
			if (cacheObj && Date.now() - cacheObj.timestamp < ttl) {
				return Promise.resolve(cacheObj.data) as ReturnType<F>;
			}
		}
    
		if (single && promiseHandler && debounceTime === -1) {
			return promiseHandler as ReturnType<F>;
		}
    promiseHandler = new Promise<void>((resolve, reject) => {
			if (debounceTime === -1) {
				return resolve();
			}
      listener.push({
        resolve,
        reject,
      });
      if (fetchMemberPageListTimer) {
        clearTimeout(fetchMemberPageListTimer);
      }
      fetchMemberPageListTimer = setTimeout(resolve, debounceTime);
    }).then((arg: any) => {
      if (arg === undefined) {
        return retryFn(params, retryCount)
          .then(res => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const thisCache = cacheMap.get(fnProxy);
            if (thisCache && ttl !== -1 && thisCache.get(key)?.data !== res) {
							thisCache.set(key, {
                data: res,
                timestamp: Date.now(),
              });
            }
            listener.forEach(i => {
              i.resolve(res || new FalsyValue(res));
            });
            return res;
          })
          .catch(e => {
            listener.forEach(i => {
              i.reject(e);
            });

            throw e;
          });
      }
      return arg instanceof FalsyValue ? arg.getValue() : arg;
    }).finally(() => {
      fetchMemberPageListTimer = null;
			promiseHandler = null;
			listener = [];
    });
		return promiseHandler as ReturnType<F>;
  };

  cacheMap.set(fnProxy, new Map<string, CacheData>());

	function fnClearCache (...params: Parameters<F>): void;
	function fnClearCache (): void;
	function fnClearCache (...params: Parameters<F>) {
    clearCache(fnProxy, params.length ? genKeyByParams(params) : undefined);
  };
	fnProxy.clearCache = fnClearCache;
  return fnProxy;
};

