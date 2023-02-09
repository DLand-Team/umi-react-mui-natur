import type { Columns } from '../components/Table';
import { Table } from '../components/Table';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import type { TabelData } from '@/apis/demo';
import { fetchTableData } from '@/apis/demo';
import { useHttp, useInject } from '@/utils/hooks';


const columns: Columns<TabelData[0]> = [
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

export default function TableStorePage() {
	const [table] = useInject('table');
	const { loading, run } = useHttp(table.actions.fetchTableData, { manual: true, debounceTime: 300 });

	useEffect(() => {
		run();
	}, [])

	return (
		<Box sx={{ p: 1 }}>
			<div>
				<TextField size={'small'} value={table.state.listQuery.name} onChange={(e) => table.actions.updateListQuery({name: e.target.value})} />
				<Button onClick={run}>Search</Button>
			</div>
			<Table rows={table.state.tableData || []} columns={columns} loading={loading} />
		</Box>
	);
}
