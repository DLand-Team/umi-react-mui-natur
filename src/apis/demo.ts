import { http } from '@/http';
import { createAsyncController } from '@/utils/greate-async';

export interface TableDataParams {
	pageNum: number;
	pageSize: number;
	name: string;
}

export type TableData = {
	date: string;
	name: string;
	address: string;
}[];

export const fetchTableData = async (p: TableDataParams) => {
	const res = await http.post<TableData>('/getTableData', p);
	return res.data;
};

export const fetchTableDataController = createAsyncController(fetchTableData, {
	ttl: 1000 * 10,
});
