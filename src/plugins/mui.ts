import { inputClasses, outlinedInputClasses } from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const spaceUnit = 8;

// Create a theme instance.
export const defaultTheme = createTheme({
	palette: {
		primary: {
			main: '#2775B6',
		},
		secondary: {
			main: '#C06F98',
		},
		error: {
			main: red.A400,
		},
	},
	spacing: (...args: (string|number)[]) => args.reduce((res, i) => `${res} ${(typeof i === 'number' && i !== 0) ? `${i * spaceUnit}px` : i}`, ''),
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
					[`&.${inputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
					},
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
					textAlign: 'start'
				},
				body: {
					overflowWrap: 'break-word'
				}
			}
		}
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
				borderRadius: (theme) => theme.spacing(1,1,0,0),
			}
		}
	}
});
