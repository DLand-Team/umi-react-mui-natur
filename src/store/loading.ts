import type { WIA } from 'natur-immer';
import { withAPI } from 'natur-immer';
/**
 * 全局loading状态管理
 */

const state = {
	/**
	 * loading次数
	 */
	loadingCount: 0,
	/**
	 * loading文本
	 */
	loadingText: '加载中',
	loadingZIndex: 100,
};

type State = typeof state;

export default {
	state,
	maps: {
		showLoading: ['loadingCount', (lc: number) => !!lc],
	},
	actions: {
		show: withAPI(({ getState }: WIA<State>) => ({
			loadingCount: getState().loadingCount + 1,
		})),
		hide: withAPI(({ getState }: WIA<State>) => ({
			loadingCount: getState().loadingCount - 1,
		})),
		changeLoadingText: (loadingText: string) => ({ loadingText }),
		changeLoadingZIndex: (loadingZIndex: number) => ({
			loadingZIndex,
		}),
	},
};
