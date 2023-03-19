import type { ITP, WIA } from 'natur-immer';
import { withAPI } from 'natur-immer';

const state = {
	routePath: '',
	text: {
		loading: '',
		message: '1111',
	},
};

type State = typeof state;

const actions = {
	updateLoadingText: withAPI((loadingText: string, { setState }: WIA<State>) =>
		setState((s) => {
			s.text.loading = loadingText;
		}),
	),
	updateMessageText: withAPI((messageText: string, { setState }: WIA<State>) =>
		setState((s) => {
			s.text.message = messageText;
		}),
	),
};

export default {
	state,
	actions,
};
