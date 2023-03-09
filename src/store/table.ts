import { fetchTableData } from '@/apis/demo';
import type { TableData } from './../apis/demo';
import { withAPI } from 'natur-immer';
import type { ImmerThunkParams, WIA } from 'natur-immer';
import type { WatchEvent } from 'natur';

const state = {
	tableData: [] as TableData,
	listQuery: {
		name: '',
		pageSize: 10,
		pageNum: 1,
	},
};

type State = typeof state;
type ITP = ImmerThunkParams<State>;

const actions = {
	updateListQuery:
		(listQuery: Partial<State['listQuery']>) =>
		({ setState }: ITP) => {
			setState((nowState) => {
				nowState.listQuery = {
					...nowState.listQuery,
					...listQuery,
				};
			});
		},
	fetchTableData: withAPI(async ({ getState }: WIA<State>) => {
		const res = await fetchTableData(getState().listQuery);
		return {
			tableData: res,
		};
	}),
};

const watch = {
	route: (watchEvent: WatchEvent) => {
		console.log(watchEvent.type);
	},
};

export default {
	state,
	actions,
	watch,
};
