import type { ImmerThunkParams } from 'natur-immer';


const state = {
	routePath: '',
	text: {
		loading: '',
		message: '1111',
	},
};

type State = typeof state;
type ITP = ImmerThunkParams<State>;

const actions = {
	updateLoadingText: (loadingText: string) => ({setState}: ITP) => setState(s => {s.text.loading = loadingText}),
	updateMessageText: (messageText: string) => ({setState}: ITP) => setState(s => {s.text.message = messageText}),
};

export default {
	state,
	actions,
};
