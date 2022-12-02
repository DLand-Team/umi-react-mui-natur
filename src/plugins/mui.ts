import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

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
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow:'none'
                }
            }
        }
    }
});

