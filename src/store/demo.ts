import type { ITP } from 'natur-immer';

const state = {
	routePath: '',
	text: {
		loading: '',
		message: 'message a',
	},
	naturStore: {
		text: '',
	}
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
	updateNaturStoreText: (text: string) => ({ setState }: ITP<State>) => (
		setState((s) => {
			s.naturStore.text = text;
		})
	),
};

export default {
	state,
	actions,
};
