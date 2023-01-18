import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import Loading from './components/Loading';
import Message from './components/Message';
import { defaultTheme } from './plugins/mui';

export function rootContainer(container: any) {
	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<Message />
			<Loading />
			{container}
		</ThemeProvider>
	);
}
