import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import MuiTable from '@mui/material/Table';
import * as React from 'react';
import type { ReactNode } from 'react';
import { Autocomplete, Box, CircularProgress, Input, Pagination, TableContainer, Typography } from '@mui/material';
import styles from './style.module.scss';

export interface Column<D extends any = any> {
	key: string;
	title: string;
	dataIndex?: any;
	render?: (row: D, rowIndex: number, tableData: D[]) => ReactNode;
}

export type Columns<D extends any = any> = Column<D>[];

export type Row = Record<string, any>;

export interface PaginationData {
	pageSize: number;
	pageNum: number;
	total: number;
}
export interface TableProps<C extends Column = Column, R extends Row = Row> {
	columns: C[];
	rows: R[];
	loading?: boolean;
	pagination?: PaginationData;
	onTableChange?: (pagination: PaginationData) => any;
}

function Table<R extends Row = Row, C extends Column = Column>({
	rows,
	columns,
	loading = false,
	pagination,
	onTableChange,
}: TableProps<C, R>) {
	const data = rows;
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
								<Box className={styles['empty-table-box']}>NO DATA</Box>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</MuiTable>
			{pagination && (
        <Box display="flex" p={3}>
          <Box display="flex" alignItems="center">
            <Typography
              variant="button"
              sx={{ display: "flex", alignItems: "center" }}
              color="secondary"
              fontWeight="regular"
            >
              Showing 1 to 10 of {data.length} entries
            </Typography>
            <Box display="flex" alignItems="center" ml={2}>
              <Autocomplete
                disableClearable
                options={["5", "10", "15", "20", "25"]}
                size="small"
                sx={{ width: "5rem" }}
                value={String(pagination.pageSize)}
                onChange={(e, v) => onTableChange?.({ ...pagination, pageSize: Number(v) })}
                renderInput={(params) => <Input {...params} />}
              />
              <Typography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </Typography>
            </Box>
          </Box>

          <Pagination
            sx={{
							ml: "auto",
							":root": {
								justifyContent: 'flex-end',
								display: 'flex'
							}
						}}
            page={pagination.pageNum}
            onChange={(_, v) => onTableChange?.({ ...pagination, pageNum: v })}
            count={Math.floor(pagination.total / pagination.pageSize)}
            variant="outlined"
            color="primary"
          />
        </Box>
      )}
			{loading && (
				<Box className={styles['loading-box']}>
					<CircularProgress thickness={3} size={50} />
				</Box>
			)}
		</TableContainer>
	);
}

export { Table };
