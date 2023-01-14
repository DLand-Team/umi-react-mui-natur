import { store } from "umi";


export class Message {
	static success(msg: string, time?: number) {
		store.dispatch('message', 'success', msg, time);
	}
	static error(msg: string, time?: number) {
		store.dispatch('message', 'error', msg, time);
	}
	static info(msg: string, time?: number) {
		store.dispatch('message', 'info', msg, time);
	}
	static warning(msg: string, time?: number) {
		store.dispatch('message', 'warning', msg, time);
	}
}