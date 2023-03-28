import type { ITP } from 'natur-immer';

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

const createMessageAction =
	(type: MessageType = 'info') =>
	(text: string, duration: number = 3000) =>
	({ setState, localDispatch }: ITP<typeof state>) => {
		const messageItem = createMessageItem({ text, duration, type });
		// 隐藏message，触发message ui退出动画
		setTimeout(() => localDispatch('hide', messageItem.id), duration);
		return setState((s) => {
			s.push(messageItem);
		});
	};

const state = [] as MessageItem[];

export default {
	state,
	actions: {
		info: createMessageAction('info'),
		success: createMessageAction('success'),
		warning: createMessageAction('warning'),
		error: createMessageAction('error'),
		hide:
			(id: string) =>
			({ getState }: ITP<typeof state>) =>
				getState().map((i) => (i.id === id ? { ...i, show: false } : i)),
		remove:
			(id: string) =>
			({ getState }: ITP<typeof state>) =>
				getState().filter((i) => i.id !== id),
	},
};
