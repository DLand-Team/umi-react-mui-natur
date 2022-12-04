import type { ImmerThunkParams } from 'natur-immer'

type ToastType = 'info' | 'success' | 'warning' | 'error';

type ToastItem = {
	text: string;
	duration: number;
	show: boolean;
	id: string;
	type: ToastType;
};

const createToastItem = ({
	text,
	duration = 3000,
	type = 'info',
}: {
	text: string;
	duration?: number;
	type?: ToastType;
}) => ({
	text,
	duration,
	show: true,
	type,
	id: Math.random().toString(36).slice(2),
});



const createToastAction = (type: ToastType = 'info') => (
	text: string,
	duration: number = 3000,
) => ({
	setState,
	dispatch,
}: ImmerThunkParams<typeof state>) => {
	const toastItem = createToastItem({text, duration, type});
	// 隐藏toast，触发toast ui退出动画
	setTimeout(() => dispatch('toast/hide', toastItem.id), duration);
	// 触发toast ui退出动画3秒后，toast ui应该已经退出完成了，此时删除toast数据
	setTimeout(() => dispatch('toast/remove', toastItem.id), duration + 3000);
	return setState(s => {s.push(toastItem)});
};


const state = [] as ToastItem[];


export default {
	state,
	actions: {
		info: createToastAction('info'),
		success: createToastAction('success'),
		warning: createToastAction('warning'),
		error: createToastAction('error'),
		hide: (id: string) => ({
			getState,
		}: ImmerThunkParams<typeof state>) => getState().map(i => (i.id === id ? { ...i, show: false } : i)),
		remove: (id: string) => ({
			getState,
		}: ImmerThunkParams<typeof state>) => getState().filter(i => i.id !== id),
	},
};
