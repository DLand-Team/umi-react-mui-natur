import type { ITP, WIA } from 'natur-immer';
/**
 * 全局loading状态管理
 */

const state = {
	/**
	 * loading count
	 */
	loadingCount: 0,
	/**
	 * loading text 
	 */
	loadingText: 'loading',
	loadingZIndex: 100,
};

type State = typeof state;

export default {
	state,
	maps: {
		showLoading: ['loadingCount', (lc: number) => !!lc],
	},
	actions: {
		show: () => ({ getState }: ITP<State>) => ({
			loadingCount: getState().loadingCount + 1,
		}),
		hide: () => ({ getState }: ITP<State>) => ({
			loadingCount: getState().loadingCount - 1,
		}),
		changeLoadingText: (loadingText: string) => ({ loadingText }),
		changeLoadingZIndex: (loadingZIndex: number) => ({
			loadingZIndex,
		}),
	},
};
