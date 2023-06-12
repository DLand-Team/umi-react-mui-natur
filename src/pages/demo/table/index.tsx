import { fetchTableData } from '@/apis/demo';
import { SearchInput } from '@/components/SearchInput';
import type { Columns } from '@/components/Table';
import { Table } from '@/components/Table';
import { useHttp, useLoading } from '@/utils/hooks';
import { css } from '@emotion/css';
import { Box, Button } from '@mui/material';
import type { PickPromiseType } from 'great-async';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type Rows = PickPromiseType<typeof fetchTableData>;

const columns: Columns<Rows[0]> = [
	{
		title: 'Name',
		dataIndex: 'name',
		fixed: 'left',
		width: 100
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

export default function TableDemo() {
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
			<h1>Table Demo</h1>
			<b>More detail you look for in <a href="https://www.npmjs.com/package/rc-table" target='_blank' rel="noreferrer">npm link</a></b>
			<p>expandable and fixed columns table</p>
			<Table
				sx={{mt: 1}}
				rowKey={'name'}
				data={data || []}
				columns={columns}
				scroll={{x: 1500}}
				loading={loading}
				expandable={{
					columnTitle: <i>Expand</i>,
					columnWidth: 80,
					expandedRowClassName: () => 'expand-row-class',
					expandedRowRender: (record) => {
						return <div style={{position: 'static'}}>{record.name}-{record.address}-{record.date}</div>
					},
					expandIcon: (props) => {
						return (
							<Box onClick={e => props.onExpand(props.record, e)}>
								<Box component={ChevronRightIcon} sx={{
									transition: 'transform 0.2s',
									transform: props.expanded ? 'rotate(90deg)' : ''
								}} />
								{/* {
								props.expanded ? <RemoveIcon /> : <AddIcon />
							} */}
							</Box>
						);
					}
				}}
			/>
		</Box>
	);
}
