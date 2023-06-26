import type { TablePaginationProps } from '@/components/TablePagination';
import { TablePagination } from '@/components/TablePagination';
import type { BoxProps } from '@mui/material';
import { Table as MuiTable, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import { merge } from 'lodash';
import type { TableProps as RcTableProps } from 'rc-table';
import RcTable from 'rc-table';
import { useMemo } from 'react';
import NoData from '../NoData';
import { TableBox } from './style';

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

const emptyTableUI = <NoData width={'100%'} height="100%" />;

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
};

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
	const finalSx = useMemo(
		() => ({
			...theme.MyMuiTable?.sxOverrides,
			...sx,
		}),
		[sx, theme.MyMuiTable?.sxOverrides],
	);

	const finalComponents = useMemo(() => merge({}, components, restProps.components), [restProps.components]);

	return (
		<TableBox sx={finalSx} loading={loading} loadingZIndex={2}>
			<RcTable
				components={finalComponents}
				prefixCls="mui-table"
				data={data}
				columns={columns}
				emptyText={emptyTableUI}
				{...restProps}
			/>
			{pagination ? <TablePagination {...pagination} onChange={onPageChange} mt={1} /> : null}
		</TableBox>
	);
}

export { Table };
