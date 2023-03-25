import type { BoxProps } from '@mui/material';
import 'umi/typings';

declare module '@mui/material/styles' {
	interface Theme {
		MyMuiTable?: {
			sxOverrides?: BoxProps['sx'];
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		MyMuiTable?: {
			sxOverrides?: BoxProps['sx'];
		};
	}
}
