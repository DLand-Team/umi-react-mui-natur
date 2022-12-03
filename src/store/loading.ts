/**
 * 全局loading状态管理
 */
import type { ThunkParams } from 'natur';

const state = {
	loadingCount: 0,
	loadingText: '加载中',
	loadingZIndex: 100,
};

type State = typeof state;

export default {
	state,
	maps: {
		showLoading: ['loadingCount', (lc: number) => !!lc]
	},
	actions: {
		show: () => ({getState}: ThunkParams<State>) => ({
			loadingCount: getState().loadingCount + 1
		}),
		hide: () => ({getState}: ThunkParams<State>) => ({
			loadingCount: getState().loadingCount - 1
		}),
		changeLoadingText: (loadingText: string) => ({loadingText}),
		changeLoadingZIndex: (loadingZIndex: number) => ({
			loadingZIndex,
		}),
	},
};
