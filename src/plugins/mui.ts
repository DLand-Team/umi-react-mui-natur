import { inputClasses, outlinedInputClasses } from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const spaceUnit = 8;

// Create a theme instance.
export const defaultTheme = createTheme({
	palette: {
		primary: {
			// main: '#556cd6',
			main: '#2775B6',
		},
		secondary: {
			// light: '#C06F98',
			main: '#C06F98',
			// main: '#806D9E',
			// main: '#C08EAF',
			// dark: '#813C85',
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
					[`&.${inputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
						// borderWidth: '6px !important'
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					// borderWidth: '6px',
					[`&.${inputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
						// borderWidth: '2px',
						borderColor: 'red',
					},
					// height: 32
					// paddingTop: spaceUnit * 0.5,
					// paddingBottom: spaceUnit * 0.5,
				},
			},
		},
	},
});

// console.log(defaultTheme)
