import type { TablePaginationProps } from '@mui/material';
import { Box, MenuItem, PaginationItem, Select } from '@mui/material';
import type {
	PaginationProps,
	PaginationRenderItemParams,
} from '@mui/material/Pagination';
import MuiPagination from '@mui/material/Pagination';
import {
	gridPageSelector,
	gridPageSizeSelector,
	useGridApiContext,
	useGridRootProps,
	useGridSelector,
} from '@mui/x-data-grid';
import { isNil, merge } from 'lodash';
import { useCallback, useMemo } from 'react';
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

export function Pagination({
	className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
	const apiRef = useGridApiContext();
	const rootProps = useGridRootProps();
	const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
	const page = useGridSelector(apiRef, gridPageSelector);

	const onChange = useCallback((event: any, newPage: number) => {
		apiRef.current?.setPage?.(newPage - 1);
	}, [apiRef]);

	const selectUI = useMemo(() => {
		return (
			<Select
				sx={selectSx}
				value={pageSize}
				size="small"
				onChange={(e) => {
					apiRef.current.setPageSize(Number(e.target.value));
				}}
			>
				{rootProps.pageSizeOptions
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
	}, [pageSize, rootProps.pageSizeOptions, apiRef]);

	return (
		<Box flex={1} display="flex">
			<MuiPagination
				color="primary"
				className={className}
				count={rootProps.rowCount ? Math.ceil(rootProps.rowCount / pageSize) : 0}
				page={(page || 0) + 1}
				onChange={onChange}
				renderItem={renderItem}
			/>
			{selectUI}
			{!isNil(rootProps.rowCount) ? (
				<Box ml={1} display="flex" alignItems={'center'}>
					{numeral(rootProps.rowCount).format('0,0')} result(s)
				</Box>
			) : null}
		</Box>
	);
}
