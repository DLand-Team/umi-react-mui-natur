import type { Columns } from '../components/Table';
import { Table } from '../components/Table';
import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import type { TableData } from '@/apis/demo';
import { useFlatInject, useHttp } from '@/utils/hooks';
import { Link } from 'umi';
import { SearchInput } from '@/components/SearchInput';

const columns: Columns<TableData[0]> = [
	{
		title: 'Name',
		dataIndex: 'name',
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

export default function TableStorePage() {
	const [table] = useFlatInject('table');
	const { loading, run } = useHttp(table.fetchTableData, {
		manual: true,
		debounceTime: 300,
	});
	useEffect(() => {
		run();
	}, []);

	return (
		<Box sx={{ p: 1 }}>
			<Link to="/table">table</Link>
			<SearchInput
				value={table.listQuery.name}
				onChange={(e) => table.updateListQuery({ name: e.target.value })}
				onSearch={run}
				loading={loading}
			/>
			<Table
				rowKey={'name'}
				data={table.tableData || []}
				columns={columns}
				loading={loading}
			/>
		</Box>
	);
}
