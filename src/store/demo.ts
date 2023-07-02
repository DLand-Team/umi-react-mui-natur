import { createActions, createMapCreator, createWatch } from '@/utils';

const state = {
	routePath: '',
	text: {
		loading: '',
		message: 'message a',
	},
	naturStore: {
		text: '',
	},
};

const createMap = createMapCreator(state);

const maps = {
	m1: createMap(
		(s) => s.text.loading,
		(p) => p,
	),
	m2: createMap(
		(s) => s.text.loading,
		(s) => s.naturStore,
		(p, p2) => p2,
	),
};

const actions = createActions(state, {
	updateLoadingText: (loadingText: string) => (ctx) =>
		ctx.setState((s) => {
			s.text.loading = loadingText;
		}),
	updateMessageText: (messageText: string) => (ctx) =>
		ctx.setState((s) => {
			s.text.message = messageText;
		}),
	updateNaturStoreText: (text: string) => (ctx) =>
		ctx.setState((s) => {
			s.naturStore.text = text;
		}),
});

const watch = createWatch({
	ff: (event, api) => {},
});

export default {
	state: state,
	actions: actions,
	maps,
};
