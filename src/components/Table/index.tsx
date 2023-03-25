import type { BoxProps } from '@mui/material';
import {
	useTheme,
	Table as MuiTable,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
} from '@mui/material';
import NoData from '../NoData';
import type { TableProps as RcTableProps } from 'rc-table';
import { default as RcTable } from 'rc-table';
import type { TablePaginationProps } from '@/components/TablePagination';
import { TablePagination } from '@/components/TablePagination';
import { TableBox } from './style';
import { useMemo } from 'react';

export type Columns<D extends Record<any, any>> = RcTableProps<D>['columns'];

export type Row = Record<any, any>;

export interface TableProps<R extends Row = Row> extends RcTableProps<R> {
	pagination?: {
		pageSize: number;
		pageNum: number;
		total: number;
	};
	onPageChange?: TablePaginationProps['onChange'];
	sx?: BoxProps['sx'];
	loading?: boolean;
}

const emptyTableUI = <NoData width={'100%'} height='100%' />;

const components: TableProps['components'] = {
	table: MuiTable,
	header: {
    wrapper: TableHead,
    row: TableRow,
    cell: TableCell,
  },
  body: {
    wrapper: TableBody,
    row: TableRow,
    cell: TableCell,
  },
}

function Table<R extends Row = Row>({
	data,
	columns,
	sx,
	pagination,
	onPageChange,
	loading,
	...restProps
}: TableProps<R>) {
	const theme = useTheme();
	const finalSx = useMemo(() => ({
		...theme.MyMuiTable?.sxOverrides,
		...sx,
	}), [sx, theme.MyMuiTable?.sxOverrides]);
	return (
		<TableBox sx={finalSx} loading={loading} loadingZIndex={2}>
				<RcTable components={components} prefixCls='mui-table' data={data} columns={columns} emptyText={emptyTableUI} {...restProps} />
				{pagination ? <TablePagination {...pagination} onChange={onPageChange} mt={1} /> : null}
		</TableBox>
	);
}

export { Table };
