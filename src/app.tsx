import type { GlobalStylesProps } from '@mui/material';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import Loading from './components/Loading';
import Message from './components/Message';
import { defaultTheme } from './plugins/mui';

const globalStyle: GlobalStylesProps['styles'] = (theme) => ({
	'.mui-picker-dropdown': {
		border: '0 !important',
		boxShadow: 'none !important',
		zIndex: 100,
	},
	'.mui-picker-panel': {
		background: '#fff !important',
		border: '0 !important',
		padding: 20,
		boxShadow: `${theme.shadows[10]} !important`,
		borderRadius: 4,
	},

	'.mui-picker-header-view': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: 50,

		'.mui-picker-month-btn,.mui-picker-year-btn': {
			background: '#fff',
			fontSize: 16,
			fontWeight: 500,
			width: 36,
			height: 36,
			borderRadius: '50%',
			'&:hover': {
				background: `${theme.palette.action.hover} !important`,
			},
		},
		'.mui-picker-decade-btn': {
			background: '#fff',
			fontSize: 16,
			fontWeight: 500,
			// width: 36,
			height: 36,
		},
	},
	'.mui-picker-header > button': {
		padding: 0,
		border: 0,
		width: 36,
		height: 36,
		borderRadius: '50%',
		background: 'transparent',
		'&:hover': {
			background: `${theme.palette.action.hover} !important`,
		},
	},
	'.mui-picker-content': {
		width: '100%',
	},
	'.mui-picker-content thead th': {
		padding: '8px 0',
	},
	'.mui-picker-cell-inner': {
		width: '36px !important',
		height: '36px !important',
		button: {
			color: `${theme.palette.text.primary} !important`,
		},
		borderRadius: '50%',
		border: '0 !important',
		'&:hover': {
			background: `${theme.palette.action.hover} !important`,
		},
	},
	'.mui-picker-cell-end > .mui-picker-cell-inner': {
		button: {
			color: `${theme.palette.text.disabled} !important`,
		},
		fill: `${theme.palette.text.primary} !important`,
	},
	'.mui-picker-cell-today > .mui-picker-cell-inner': {
		border: `1px solid ${theme.palette.text.secondary} !important`,
	},
	'.mui-picker-cell-selected > .mui-picker-cell-inner': {
		background: `${theme.palette.primary.main} !important`,
		button: {
			color: '#fff !important',
		},
	},
});

export function rootContainer(container: any) {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles styles={globalStyle} />
			<CssBaseline />
			<Message />
			<Loading />
			{container}
		</ThemeProvider>
	);
}
