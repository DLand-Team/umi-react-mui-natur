import { NaturFactory } from '@/utils/NaturFactory';

const state = {
	routePath: '',
	text: {
		loading: '',
		message: 'message a',
		b1: [false],
	},
	naturStore: {
		text: '',
	},
};

const createMap = NaturFactory.mapCreator(state);

const maps = {
	m1: createMap(
		(s) => s.text.message,
		(p) => p,
	),
	m2: createMap(
		(s) => s.text.loading,
		(s) => s.naturStore,
		(p, p2) => p2,
	),
	m3: createMap(
		(s) => s.naturStore.text,
		(s) => s.routePath,
		(s) => s.text,
		(p, p1, p3) => p,
	),
};

const createActions = NaturFactory.actionsCreator(state, maps);

const actions = createActions({
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
