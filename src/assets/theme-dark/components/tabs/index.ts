/**
=========================================================
* Otis Admin PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Otis Admin PRO React base styles
import colors from '@/assets/theme-dark/base/colors';
import borders from '@/assets/theme-dark/base/borders';
import boxShadows from '@/assets/theme-dark/base/boxShadows';

// Otis Admin PRO React helper functions
import pxToRem from '@/assets/theme-dark/functions/pxToRem';

const { background } = colors;
const { borderRadius } = borders;
const { md } = boxShadows;

export default {
	styleOverrides: {
		root: {
			position: 'relative',
			backgroundColor: background.card,
			borderRadius: borderRadius.xl,
			minHeight: 'unset',
			padding: pxToRem(4),
		},

		flexContainer: {
			height: '100%',
			position: 'relative',
			zIndex: 10,
		},

		fixed: {
			overflow: 'unset !important' as 'unset',
			overflowX: 'unset !important' as 'unset',
		},

		vertical: {
			'& .MuiTabs-indicator': {
				width: '100%',
			},
		},

		indicator: {
			height: '100%',
			borderRadius: borderRadius.lg,
			backgroundColor: background.default,
			boxShadow: md,
			transition: 'all 500ms ease',
		},
	} as const,
};
