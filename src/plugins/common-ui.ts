import { inputClasses, outlinedInputClasses } from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const spaceUnit = 8;

// Create a theme instance.
export const commonUITheme = createTheme({
	palette: {
		primary: {
			main: '#007FFF',
		},
		secondary: {
			main: '#C06F98',
		},
		error: {
			main: red.A400,
		},
	},
	spacing: 8,
	shape: {
		borderRadius: 8
	},
	typography: {
		// htmlFontSize: 100,
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableRipple: true
			},
			styleOverrides: {
				root: {
					'&:hover': {
						backgroundColor: 'red',
						boxShadow: '0px 2px 4px -1px rgba(0,0,0, 1), 0px 4px 5px 0px rgba(0,0,0,1), 0px 1px 10px 0px rgba(0,0,0,1)'
					}
				}
			}
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					padding: '8px 7px !important'
				},
				root: {
					[`&.${inputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
						borderWidth: '1px !important',
						borderColor: 'green !important'
					}
				}
			}
		},
	},
	MyMuiTable: {
		sxOverrides: {
			'& thead th': {
				background: 'red'
			}
		}
	}
});
