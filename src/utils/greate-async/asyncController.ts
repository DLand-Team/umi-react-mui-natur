import type { AnyFn, PromiseFunction } from "./common";
import { FalsyValue } from "./common";


export interface CacheData {
	timestamp: number;
	data: any;
}

export const cacheMap = typeof WeakMap !== 'undefined' ? new WeakMap<AnyFn, Map<string, CacheData>>() : new Map<AnyFn, Map<string, CacheData>>();



function checkAndClearCache(fn: PromiseFunction, ttl: number) {
  // put operation into micro event loop, so it will not impact the main process
  setTimeout(() => {
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

/**
 * 创建异步控制器，主要用于http请求的场景
 * 支持防抖，缓存，单个请求等功能
 * @param fn 
 * @param param1 
 * @returns 
 */
export const createAsyncController = <F extends PromiseFunction>(fn: F, {
  debounceTime = -1,
  ttl = -1,
	single = false,
} = {}) => {
  let fetchMemberPageListTimer: any = null;
	let promiseHandler: Promise<any> | null;
  let listener: {
		resolve: (arg?: any) => any,
		reject: (arg?: any) => any,
	}[] = [];

  const fnProxy = (...params: Parameters<F>) => {
    const key = JSON.stringify(params);
    const thisCache = cacheMap.get(fnProxy);
    const cacheObj = thisCache?.get(key);
    if (ttl !== -1 && cacheObj && Date.now() - cacheObj.timestamp < ttl) {
			checkAndClearCache(fn, ttl);
      return Promise.resolve(cacheObj.data);
    }
		if (single && promiseHandler && debounceTime === -1) {
			return promiseHandler;
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
        return fn(params)
          .then(res => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const thisCache = cacheMap.get(fnProxy);
            if (thisCache && !thisCache.get(key) && ttl !== -1) {
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
      listener = [];
      fetchMemberPageListTimer = null;
			promiseHandler = null;
    });
		return promiseHandler;
  };
  cacheMap.set(fnProxy, new Map<string, CacheData>());
	fnProxy.clearCache = (key?: string) => {
    clearCache(fnProxy, key);
  };
  return fnProxy as F & {
		clearCache: (key?: string) => void;
	};
};

