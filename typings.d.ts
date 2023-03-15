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


declare module '@mui/x-data-grid' {
	interface DataGridPropsWithDefaultValues {
		pinnedColumns?: {
			left?: string[];
			right?: string[];
		};
	}
}

declare module '@mui/x-data-grid/models/gridStateCommunity' {
	interface GridStateCommunity {
		pinnedColumns: {
			left?: string[];
			right?: string[];
		};
	}
}