import { isBrowser } from './index';
import { useEffect, useRef } from "react"
import { useLocation as useOriginLocation } from 'umi'
import qs from 'qs';

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