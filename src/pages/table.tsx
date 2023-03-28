import { fetchTableData } from '@/apis/demo';
import { SearchInput } from '@/components/SearchInput';
import type { Columns } from '@/components/Table';
import { Table } from '@/components/Table';
import { useHttp, useLoading } from '@/utils/hooks';
import { Box, Button } from '@mui/material';
import type { PickPromiseType } from 'great-async';
import { useEffect, useState } from 'react';
import { Link } from 'umi';

type Rows = PickPromiseType<typeof fetchTableData>;

const columns: Columns<Rows[0]> = [
	{
		title: 'Name',
		dataIndex: 'name',
		fixed: 'left',
	},
	{
		title: 'Date',
		dataIndex: 'date',
	},
	{
		title: 'Address',
		dataIndex: 'address',
	},
	{
		title: 'Actions',
		dataIndex: 'action',
		width: 100,
		fixed: 'right',
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
	const { data, loading, run } = useHttp(() => fetchTableData(listQuery), {
		manual: true,
		debounceTime: 300,
		retryCount: 2,
	});

	useEffect(() => {
		run();
	}, [run]);

	// useLoading(loading);

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
			<Table
				sx={{mt: 1}}
				rowKey={'name'}
				data={data || []}
				columns={columns}
				loading={loading}
			/>
		</Box>
	);
}
