import type { Columns } from '../components/Table';
import { Table } from '../components/Table';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchTableData } from '@/apis/demo';
import { useHttp } from '@/utils/hooks';
import type { PickPromiseType } from '@/utils/useAsyncFunction';
import { Link } from 'umi';

type Rows = PickPromiseType<typeof fetchTableData>;

const columns: Columns<Rows[0]> = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Date',
		dataIndex: 'date',
		key: 'date',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Actions',
		key: 'action',
		render: (row) => {
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
	const { data, loading, run } = useHttp(() => fetchTableData(listQuery), { manual: true, debounceTime: 300 });

	useEffect(() => {
		run();
	}, [run]);

	return (
		<Box sx={{ p: 1 }}>
			<Link to='/table-store'>table store</Link>
			<div>
				<TextField size={'small'} value={listQuery.name} onChange={(e) => {
					setListQuery({
						...listQuery,
						name: e.target.value
					});
				}} />
				<Button onClick={() => run()}>Search</Button>
			</div>
			<Table rows={data || []} columns={columns} loading={loading} />
		</Box>
	);
}
