import { fetchTableData } from '@/apis/demo';
import { SearchInput } from '@/components/SearchInput';
import type { PickPromiseType } from '@/utils/greate-async';
import { useHttp } from '@/utils/hooks';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'umi';
import type { Columns } from '../components/Table';
import { Table } from '../components/Table';

type Rows = PickPromiseType<typeof fetchTableData>;

const columns: Columns<Rows[0]> = [
	{
		headerName: 'Name',
		field: 'name',
	},
	{
		headerName: 'Date',
		field: 'date',
	},
	{
		headerName: 'Address',
		field: 'address',
	},
	{
		headerName: 'Actions',
		field: 'action',
		renderCell: (row) => {
			return (
				<Button
					size={'small'}
					onClick={() => {
						console.log(row);
					}}
				>
					action
				</Button>
			);
		},
	},
];

export default function TablePage() {
	const [listQuery, setListQuery] = useState({
		name: '',
		pageSize: 10,
		pageNum: 1,
	});
	const { data, loading, run } = useHttp(() => fetchTableData(listQuery), {
		manual: true,
		debounceTime: 300,
		retryCount: 2,
	});

	useEffect(() => {
		run();
	}, [run]);

	return (
		<Box sx={{ p: 1 }}>
			<Link to="/table-store">table store</Link>
			<SearchInput
				value={listQuery.name}
				onChange={(e) => {
					setListQuery({
						...listQuery,
						name: e.target.value,
					});
				}}
				onSearch={() => run()}
				loading={loading}
			/>
			<Table rows={data || []} columns={columns} loading={loading} />
		</Box>
	);
}
