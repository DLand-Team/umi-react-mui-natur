import 'umi/typings';

declare module '@mui/material/styles' {
  interface Theme {
    myComponent?: {
			fontSize?: number;
		}
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
		myComponent?: {
			fontSize?: number
		}
  }
}
