import { http } from '@/http';
import { createAsyncController } from 'great-async';
import dayjs from 'dayjs';
import { sleep } from '@/utils';
import { createObjectConvertor } from 'convert-key';


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
	// const res = await http.post<TableData>('/getTableData', p);
	// return res.data;
	await sleep(1000);
	return new Array(10).fill(null).map((_, i) => ({
		date: dayjs().format('YYYY-MM-DD'),
		name: 'tom' + i,
		address: 'China',
	}));
};

export const fetchTableDataController = createAsyncController(fetchTableData, {
	ttl: 1000 * 10,
});
