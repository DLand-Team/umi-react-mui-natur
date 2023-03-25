import type { BoxProps } from '@mui/material';
import { Box, MenuItem, PaginationItem, Select } from '@mui/material';
import type { PaginationProps, PaginationRenderItemParams } from '@mui/material/Pagination';
import MuiPagination from '@mui/material/Pagination';

import { isNil, merge } from 'lodash';
import { useCallback, useMemo, useRef } from 'react';
import numeral from 'numeral';

const renderItem = (item: PaginationRenderItemParams) => {
	let myProps: PaginationProps = {};
	if (item.type === 'previous' || item.type === 'next') {
		myProps = {
			shape: 'rounded',
			variant: 'outlined',
		};
	}
	return <PaginationItem {...merge({} as any, item, myProps)} />;
};

const selectSx = {
	ml: 1,
};

export interface TablePaginationProps extends Omit<BoxProps, 'onChange'> {
	pageNum: number;
	pageSize: number;
	total: number;
	pageSizeOptions?: number[];
	onChange?: (p: Pick<TablePaginationProps, 'pageNum' | 'pageSize'>) => any;
}

export function TablePagination({
	pageNum,
	pageSize,
	total,
	onChange,
	pageSizeOptions = [5, 10, 15, 30, 50, 100],
	...boxProps
}: TablePaginationProps) {
	const page = pageNum;

	const onChangeRef = useRef(onChange);

	onChangeRef.current = onChange;

	const rowCount = total;

	const selectUI = useMemo(() => {
		return (
			<Select
				sx={selectSx}
				value={pageSize}
				size="small"
				onChange={(e) => {
					onChangeRef.current?.({
						pageSize: Number(e.target.value),
						pageNum,
					});
				}}
			>
				{pageSizeOptions
					.map((i) => ({
						value: i,
						label: `${i}/page`,
					}))
					.map((i) => (
						<MenuItem key={i.value} value={i.value}>
							{i.label}
						</MenuItem>
					))}
			</Select>
		);
	}, [pageSize, pageSizeOptions, onChange]);

	const onPaginationChange = useCallback(
		(e: any, newPageNum: number) => {
			if (newPageNum !== pageNum) {
				onChangeRef.current?.({
					pageNum: newPageNum,
					pageSize,
				});
			}
		},
		[pageNum, pageSize],
	);

	return (
		<Box flex={1} display="flex" alignItems={'center'} {...boxProps}>
			<MuiPagination
				color="primary"
				count={rowCount ? Math.ceil(rowCount / pageSize) : 0}
				page={page}
				onChange={onPaginationChange}
				renderItem={renderItem}
			/>
			{selectUI}
			{!isNil(rowCount) ? (
				<Box ml={1} display="flex" alignItems={'center'}>
					{numeral(rowCount).format('0,0')} result(s)
				</Box>
			) : null}
		</Box>
	);
}
