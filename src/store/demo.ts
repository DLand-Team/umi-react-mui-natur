import type { ImmerThunkParams } from 'natur-immer';


const state = {
	text: {
		loading: '',
		toast: '1111',
	},
};

type State = typeof state;
type ITP = ImmerThunkParams<State>;

const actions = {
	updateLoadingText: (loadingText: string) => ({setState}: ITP) => setState(s => {s.text.loading = loadingText}),
	updateToastText: (toastText: string) => ({setState}: ITP) => setState(s => {s.text.loading = toastText}),
};

export default {
	state,
	actions,
};
