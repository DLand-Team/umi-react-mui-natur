import { inputClasses, outlinedInputClasses } from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { getDataGridUtilityClass } from '@mui/x-data-grid';

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
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					[`&.${inputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: 'red',
					},
				},
			},
		},
	},
	MuiDataGrid: {
		sxOverrides: {
			border: 'none',
			[`.${getDataGridUtilityClass('main')}`]: {
				color: '#6E7680',
			},
			[`.${getDataGridUtilityClass('cell')}:focus`]: {
				outline: "unset"
			},
			[`& .${getDataGridUtilityClass('columnSeparator')}`]: {
				display: 'none',
			},
			[`& .${getDataGridUtilityClass('columnHeaderTitle')}`]: {
				fontWeight: 'bold'
			},
		}
	}
});
