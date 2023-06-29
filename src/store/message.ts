import type { SnackbarOrigin } from '@mui/material';
import type { ITP } from 'natur-immer';
import type { ReactNode } from 'react';

type MessageType = 'info' | 'success' | 'warning' | 'error' | 'dark';

export type MessageItem = {
	text: ReactNode;
	duration: number;
	show: boolean;
	id: string;
	type: MessageType;
	position: SnackbarOrigin;
};

const defaultPosition: SnackbarOrigin = {
	vertical: 'bottom',
	horizontal: 'right',
};

type CreateMessageItemParams = Partial<Omit<MessageItem, 'id' | 'show'>> & {
	text: ReactNode;
};

const createMessageItem = ({
	text,
	duration = 3000,
	type = 'info',
	position = defaultPosition,
}: CreateMessageItemParams) => ({
	text,
	duration,
	show: true,
	type,
	position,
	id: Math.random().toString(36).slice(2),
});

const createMessageAction =
	(type: MessageType = 'info') =>
	(text: ReactNode, duration?: number, position?: SnackbarOrigin) =>
	({ setState, getState }: ITP<State>) => {
		const messageItem = createMessageItem({
			text,
			duration: duration || 3000,
			type,
			position: position || getState().messagePosition,
		});
		return setState((s) => {
			s.messageList.push(messageItem);
		});
	};

const state = {
	messageList: [] as MessageItem[],
	messagePosition: defaultPosition,
};

type State = typeof state;

// const maps = {
// 	messageList: [
// 		'messageList',
// 		(messageList: State['messageList']) => {
// 			return messageList.filter((i) => i.type !== 'dark');
// 		},
// 	],
// };

export default {
	state,
	// maps,
	actions: {
		updatePosition: (newPosition: SnackbarOrigin) => ({ messagePosition: newPosition }),
		info: createMessageAction('info'),
		success: createMessageAction('success'),
		warning: createMessageAction('warning'),
		error: createMessageAction('error'),
		dark: createMessageAction('dark'),
		hide:
			(id: string) =>
			({ setState }: ITP<State>) => {
				setState((s) => {
					s.messageList.forEach((i) => {
						if (i.id === id) {
							i.show = false;
						}
					});
				});
			},
		remove:
			(id: string) =>
			({ setState }: ITP<State>) => {
				setState((s) => {
					s.messageList = s.messageList.filter((i) => i.id !== id);
				});
			},
	},
};
