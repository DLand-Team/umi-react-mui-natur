import type { BoxProps } from '@mui/material';
import 'umi/typings';

// declare module '*.glb' {
//   const glb: any;
//   export default glb;
// }


declare module '*.glb' {
  const src: string
  export default src;
}

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
