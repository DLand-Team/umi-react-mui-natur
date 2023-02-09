import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import MuiTable from '@mui/material/Table';
import * as React from 'react';
import type { ReactNode } from 'react';
import { Box, CircularProgress, TableContainer } from '@mui/material';
import styles from './style.module.scss';

export interface Column<D extends any = any> {
	key: string;
	title: string;
	dataIndex?: any;
	render?: (row: D, rowIndex: number, tableData: D[]) => ReactNode;
}

export type Columns<D extends any = any> = Column<D>[];

export type Row = Record<string, any>;

export interface TableProps<C extends Column = Column, R extends Row = Row> {
	columns: C[];
	rows: R[];
	loading?: boolean;
}

function Table<R extends Row = Row, C extends Column = Column>({
	rows,
	columns,
	loading = false,
}: TableProps<C, R>) {
	return (
		<TableContainer className={styles['table-container']}>
			<MuiTable size="small">
				<TableHead>
					<TableRow>
						{columns.map((c) => (
							<TableCell key={c.key}>{c.title}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow key={row.id || index}>
							{columns.map((c) => (
								<TableCell key={c.key}>
									{c.render ? c.render?.(row, index, rows) : c.dataIndex ? row[c.dataIndex] : null}
								</TableCell>
							))}
						</TableRow>
					))}
					{!rows.length && (
						<TableRow>
							<TableCell colSpan={columns.length}>
								<Box className={styles['empty-table-box']}>EMPTY DATA</Box>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</MuiTable>
			{loading && (
				<Box className={styles['loading-box']}>
					<CircularProgress thickness={3} size={50} />
				</Box>
			)}
		</TableContainer>
	);
}

export { Table };
