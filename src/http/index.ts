import { overrideHttpType } from './overrideHttpType';
import { HttpError } from './../utils/HttpError';
import axios from "axios";
import { history, store } from "umi";
import { Message } from '@/utils/message';



const _http = axios.create({
    timeout: 1000 * 60,
});

_http.interceptors.request.use(config => {
    store.dispatch('loading', 'show');
    return config;
}, err => {
    store.dispatch('loading', 'hide');
    Message.error(err.message);
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
		Message.error(err.message);
    // throw err;
		throw new HttpError(err.message, Number(err.code || err.status));
})

export const http = overrideHttpType(_http);
