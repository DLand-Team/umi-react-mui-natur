import { HttpError } from './../utils/HttpError';
import type { AxiosRequestConfig} from "axios";
import axios from "axios";
import { history, store } from "umi";



const _http = axios.create({
    timeout: 1000 * 60,
});

_http.interceptors.request.use(config => {
    store.dispatch('loading', 'show');
    return config;
}, err => {
    store.dispatch('loading', 'hide');
    store.dispatch('toast', 'error', err.message);
    throw err;
})

_http.interceptors.response.use(response => {
    // 如果401是未登录状态, 则跳转到登录页面
    if (response.data.code == '401') {
        const redirect = location.pathname + location.search;
        history.replace(`/login?redirect=${redirect}`);
        throw new HttpError(response.data.message, Number(response.data.code));
    }
    if (response.data.code != '200') {
        throw new HttpError(response.data.message, Number(response.data.code));
    }
    store.dispatch('loading', 'hide');
    return response.data;
}, err => {
    store.dispatch('loading', 'hide');
    store.dispatch('toast', 'error', err.message);
    throw err;
})

// 重写axios的类型
type GetParams = Parameters<typeof _http.get>;
type PostParams = Parameters<typeof _http.post>;
type PatchParams = Parameters<typeof _http.patch>;
type DeleteParams = Parameters<typeof _http.delete>;
type HeadParams = Parameters<typeof _http.head>;
type PutParams = Parameters<typeof _http.put>;

const overrideHttpType = <T>(config: AxiosRequestConfig) => _http<T, T>(config);
overrideHttpType.request = <T>(config: AxiosRequestConfig) => _http.request<T, T>(config);
overrideHttpType.get = <T>(...arg: GetParams) => _http.get<T, T>(...arg);
overrideHttpType.post = <T>(...arg: PostParams) => _http.post<T, T>(...arg);
overrideHttpType.patch = <T>(...arg: PatchParams) => _http.patch<T, T>(...arg);
overrideHttpType.delete = <T>(...arg: DeleteParams) => _http.delete<T, T>(...arg);
overrideHttpType.head = <T>(...arg: HeadParams) => _http.head<T, T>(...arg);
overrideHttpType.put = <T>(...arg: PutParams) => _http.put<T, T>(...arg);

type HttpType = typeof overrideHttpType;

export const http = _http as HttpType;
