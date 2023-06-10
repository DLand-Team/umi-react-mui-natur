import type { ITP } from 'natur-immer';

const state = {
	routePath: '',
	text: {
		loading: '',
		message: 'message a',
	},
};

type State = typeof state;

const actions = {
	updateLoadingText: (loadingText: string) => ({ setState }: ITP<State>) => (
		setState((s) => {
			s.text.loading = loadingText;
		})
	),
	updateMessageText: (messageText: string) => ({ setState }: ITP<State>) => (
		setState((s) => {
			s.text.message = messageText;
		})
	),
};

export default {
	state,
	actions,
};
