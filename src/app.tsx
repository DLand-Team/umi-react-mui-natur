import type { GlobalStylesProps } from '@mui/material';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Loading from './components/Loading';
import Message from './components/Message';
import './plugins/dayjs';
import { defaultTheme } from './plugins/mui';

const globalStyle: GlobalStylesProps['styles'] = (theme) => ({});

export function rootContainer(container: any) {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles styles={globalStyle} />
			<CssBaseline />
			<Message />
			<Loading />
			<LocalizationProvider dateAdapter={AdapterDayjs}>{container}</LocalizationProvider>
		</ThemeProvider>
	);
}
