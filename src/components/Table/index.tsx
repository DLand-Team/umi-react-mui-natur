import { useTheme } from '@mui/material';
import type {
	DataGridProps,
	GridColDef,
	GridPaginationModel,
	GridValidRowModel} from '@mui/x-data-grid';
import {
	DataGrid,
} from '@mui/x-data-grid';
import { merge } from 'lodash';
import { useCallback, useMemo, useRef } from 'react';
import { LoadingOverlay } from '../Loading/box';
import NoData from '../NoData';
import { Pagination } from './Pagination';

export type Column<D extends GridValidRowModel = GridValidRowModel> = GridColDef<D>;
export type Columns<D extends GridValidRowModel = GridValidRowModel> = Column<D>[];

export type Row = GridValidRowModel;

export interface TableProps<R extends Row = Row> extends Omit<DataGridProps<R>, 'pagination'> {
	pagination?: {
		pageSize: number;
		pageNum: number;
		total: number;
	},
	onPageChange?: (p: Omit<Exclude<TableProps<R>['pagination'], undefined>, 'total'>) => any;
}

const defaultPageSizeOptions = [5, 10, 15, 30, 50, 100];

const defaultCellEditable = () => false;

function Table<R extends Row = Row>({
	rows,
	columns,
	sx,
	// initialState,
	slots,
	pagination,
	onPageChange,
	...restProps
}: TableProps<R>) {
	// const initState: DataGridProps['initialState'] = useMemo(() => {
	// 	return initialState;
	// }, [initialState]);
	
	const theme = useTheme();
	const finalSx = useMemo(() => {
		return merge(
			{
				height: rows.length ? 'auto' : 400
			},
			theme.MuiDataGrid?.sxOverrides,
			sx,
		);
	}, [sx, theme.MuiDataGrid?.sxOverrides, rows.length]);
	const finalColumns = useMemo(() => {
		return columns.map((i) => {
			if (i.sortable !== undefined) {
				return i;
			}
			return {
				sortable: false,
				...i,
			};
		});
	}, [columns]);
	const finalSlots = useMemo(() => {
		return merge(
			{
				loadingOverlay: LoadingOverlay,
				noRowsOverlay: NoData,
				pagination: Pagination,
			},
			slots,
		);
	}, [slots]);

	const paginationModel = useMemo(() => {
		if (pagination) {
			return {
				pageSize: pagination.pageSize,
				page: pagination.pageNum - 1
			}
		}
		return undefined;
	}, [pagination]);

	const onPaginationChangeRef = useRef(onPageChange);
	onPaginationChangeRef.current = onPageChange;

	const onPaginationModelChange = useCallback((p: GridPaginationModel) => {
		onPaginationChangeRef.current?.({
			pageNum: p.page + 1,
			pageSize: p.pageSize,
		});
	}, [])

	return (
		<DataGrid
			rows={rows}
			sx={finalSx}
			isCellEditable={defaultCellEditable}
			disableColumnFilter
			disableColumnMenu
			autoHeight={!!rows.length}
			autoPageSize
			disableColumnSelector
			columns={finalColumns}
			pageSizeOptions={defaultPageSizeOptions}
			rowSelection
			rowCount={pagination?.total}
			slots={finalSlots}
			hideFooterSelectedRowCount
			hideFooterPagination={!pagination}
			pagination={!!pagination === true ? true : undefined}
			paginationModel={paginationModel}
			onPaginationModelChange={onPaginationModelChange}
			{...restProps}
		/>
	);
}

export { Table };
