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

// Otis Admin PRO React helper functions
import pxToRem from '@/assets/theme-dark/functions/pxToRem';

const { background } = colors;
const { borderRadius } = borders;

export default {
	styleOverrides: {
		root: {
			width: pxToRem(250),
			whiteSpace: 'nowrap',
			border: 'none',
		},

		paper: {
			width: pxToRem(250),
			backgroundColor: background.sidenav,
			height: `calc(100vh - ${pxToRem(32)})`,
			margin: pxToRem(16),
			borderRadius: borderRadius.xl,
			border: 'none',
		},

		paperAnchorDockedLeft: {
			borderRight: 'none',
		},
	} as const,
};
