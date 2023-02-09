import { fetchTableData } from '@/apis/demo';
import type { TabelData } from './../apis/demo';
import type { ImmerThunkParams } from 'natur-immer';


const state = {
	tableData: [] as TabelData,
	listQuery: {
		name: '',
		pageSize: 10,
		pageNum: 1,
	}
};

type State = typeof state;
type ITP = ImmerThunkParams<State>;

const actions = {
	updateListQuery: (listQuery: Partial<State['listQuery']>) => ({setState}: ITP) => {
		setState(nowState => {
			nowState.listQuery = {
				...nowState.listQuery,
				...listQuery
			}
		})
	},
	fetchTableData: () => async ({getState}: ITP) => {
		const res = await fetchTableData(getState().listQuery);
		return {
			tableData: res,
		}
	},
};

export default {
	state,
	actions,
};
