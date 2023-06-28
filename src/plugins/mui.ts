import { inputClasses, outlinedInputClasses } from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const spaceUnit = 8;

// Create a theme instance.
export const defaultTheme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#C06F98',
		},
		error: {
			main: red.A400,
		},
	},
	spacing: (n: number) => `${n * spaceUnit}px`,
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					[`&.${inputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					// [`&.${inputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
					// 	borderColor: 'red',
					// },
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				head: {
					fontWeight: 600,
					textAlign: 'start',
				},
				body: {
					overflowWrap: 'break-word',
				},
			},
		},
		MuiAlert: {
			defaultProps: {
				variant: 'filled',
			},
		},
	},
	MyMuiTable: {
		sxOverrides: {
			'& .mui-table': {
				border: '1px solid rgba(224, 224, 224, 1)',
				borderRadius: 1,
				overflow: 'hidden',
			},
			'& table': {
				width: '100%',
				textAlign: 'start',
				borderRadius: '8px 8px 0 0',
				borderCollapse: 'separate',
				borderSpacing: 0,
			},
		},
	},
});
