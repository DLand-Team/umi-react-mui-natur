import { CssBaseline, ThemeProvider } from '@mui/material';
import type { ReactNode } from 'react';
import React from 'react';
import Loading from './components/Loading';
import Message from './components/Message';
import { useInject } from '@/utils/hooks';
import themeDark from '@/assets/theme-dark';
import theme from '@/assets/theme';

const Ctx = ({ children }: { children: ReactNode }) => {
	const [mui] = useInject('mui', { state: ['darkMode'] });
	console.log(mui);
	return (
		<ThemeProvider theme={mui.state.darkMode ? themeDark : theme}>
			<CssBaseline />
			<Message />
			<Loading />
			{children}
		</ThemeProvider>
	);
};

export function rootContainer(container: any) {
	return <Ctx>{container}</Ctx>;
}
