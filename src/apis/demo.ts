import { http } from '@/http';

export interface TableDataParams {
	pageNum: number;
	pageSize: number;
	name: string;
}

export type TabelData = {
  date: string;
  name: string;
  address: string;
}[];


export const fetchTableData = async (p: TableDataParams) => {
	const res = await http.post<TabelData>('/getTableData', p);
	return res.data;
};
