import { Table } from '../components/Table';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

const dataSource = [
	{
		key: '1',
		name: '胡彦斌',
		age: 32,
		address: '西湖区湖底公园1号',
	},
	{
		key: '2',
		name: '胡彦祖',
		age: 42,
		address: '西湖区湖底公园1号',
	},
];

const columns = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '年龄',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: '住址',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Actions',
		key: 'action',
		render: (row: typeof dataSource[0]) => {
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
	return (
		<Box sx={{ p: 1 }}>
			<div>
				<TextField size={'small'} value={name} onChange={(e) => setName(e.target.value)} />
			</div>
			<Table rows={dataSource} columns={columns} />
		</Box>
	);
}
