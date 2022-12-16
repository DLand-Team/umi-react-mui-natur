import type { ImmerThunkParams } from 'natur-immer';


const state = {
	text: {
		loading: '',
		message: '1111',
	},
};

type State = typeof state;
type ITP = ImmerThunkParams<State>;

const actions = {
	updateLoadingText: (loadingText: string) => ({setState}: ITP) => setState(s => {s.text.loading = loadingText}),
	updateToastText: (messageText: string) => ({setState}: ITP) => setState(s => {s.text.loading = messageText}),
};

export default {
	state,
	actions,
};
