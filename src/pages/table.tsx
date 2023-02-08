import { Table } from '../components/Table';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchTableData } from '@/apis/demo';
import { useHttp } from '@/utils/hooks';

const columns = [
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
		render: (row: any) => {
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
	const [name, setName] = useState('');
	const { data, loading, run } = useHttp(fetchTableData, {manual: true});
	
	useEffect(() => {
		run();
	}, [run]);
	
	return (
		<Box sx={{ p: 1 }}>
			<div>
				<TextField size={'small'} value={name} onChange={(e) => setName(e.target.value)} />
				<Button disabled={loading} onClick={run}>Search</Button>
			</div>
			<Table rows={data || []} columns={columns} />
		</Box>
	);
}
