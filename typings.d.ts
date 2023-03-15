import type { DataGridProps } from '@mui/x-data-grid';
import 'umi/typings';

declare module '@mui/material/styles' {
	interface Theme {
		myComponent?: {
			fontSize?: number;
		};
		MuiDataGrid?: {
			sxOverrides?: DataGridProps['sx'];
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		MuiDataGrid?: {
			sxOverrides?: DataGridProps['sx'];
		};
	}
}
