import { http } from '@/http';

export interface TableDataParams {
	pageNum: number;
	pageSize: number;
	name: string;
}

export const fetchTableData = async () => {
	const res = await http.post<
		{
			date: string;
			name: string;
			address: string;
		}[]
	>('/getTableData');
	return res.data;
};
