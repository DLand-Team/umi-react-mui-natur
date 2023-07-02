import { createActions, createMapCreator } from '@/utils';

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
	// m2: createMapItem([(s) => s.text.loading], (p) => p),
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

export default {
	state: state,
	actions: actions,
	maps,
};
