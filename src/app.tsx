import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import Loading from './components/Loading';
import Message from './components/Message';
import { defaultTheme } from './plugins/mui';
import { commonUITheme } from './plugins/common-ui';

export function rootContainer(container: any) {
	return (
		<ThemeProvider theme={commonUITheme}>
			<CssBaseline />
			<Message />
			<Loading />
			{container}
		</ThemeProvider>
	);
}
