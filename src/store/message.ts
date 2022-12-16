import type { ImmerThunkParams } from 'natur-immer'

type MessageType = 'info' | 'success' | 'warning' | 'error';

type MessageItem = {
	text: string;
	duration: number;
	show: boolean;
	id: string;
	type: MessageType;
};

const createMessageItem = ({
	text,
	duration = 3000,
	type = 'info',
}: {
	text: string;
	duration?: number;
	type?: MessageType;
}) => ({
	text,
	duration,
	show: true,
	type,
	id: Math.random().toString(36).slice(2),
});



const createMessageAction = (type: MessageType = 'info') => (
	text: string,
	duration: number = 3000,
) => ({
	setState,
	dispatch,
}: ImmerThunkParams<typeof state>) => {
	const messageItem = createMessageItem({text, duration, type});
	// 隐藏message，触发message ui退出动画
	setTimeout(() => dispatch('message/hide', messageItem.id), duration);
	// 触发message ui退出动画3秒后，message ui应该已经退出完成了，此时删除message数据
	setTimeout(() => dispatch('message/remove', messageItem.id), duration + 3000);
	return setState(s => {s.push(messageItem)});
};


const state = [] as MessageItem[];


export default {
	state,
	actions: {
		info: createMessageAction('info'),
		success: createMessageAction('success'),
		warning: createMessageAction('warning'),
		error: createMessageAction('error'),
		hide: (id: string) => ({
			getState,
		}: ImmerThunkParams<typeof state>) => getState().map(i => (i.id === id ? { ...i, show: false } : i)),
		remove: (id: string) => ({
			getState,
		}: ImmerThunkParams<typeof state>) => getState().filter(i => i.id !== id),
	},
};
