import { createModule } from '@/utils';

const m = createModule({
	state: {
		routePath: '',
		text: {
			loading: '',
			message: 'message a',
		},
		naturStore: {
			text: '',
		},
	},
	actions: {
		updateLoadingText: (loadingText: string) => async (ctx) =>
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
	},
});

export default {
	state: m.state,
	actions: m.actions,
};
