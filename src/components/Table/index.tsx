import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import MuiTable from '@mui/material/Table';
import * as React from 'react';
import type { ReactNode } from 'react';

export interface Column {
	key: string;
	title: string;
	dataIndex?: string;
	render?: (row: any) => ReactNode;
}

export type Row = Record<string, any>;

export interface TableProps<C extends Column = Column, R extends Row = Row> {
	columns: C[];
	rows: R[];
}

function Table<C extends Column = Column, R extends Row = Row>({
	rows,
	columns,
}: TableProps<C, R>) {
	return (
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
								{c.render ? c.render?.(row) : c.dataIndex ? row[c.dataIndex] : null}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</MuiTable>
	);
}

export { Table };
