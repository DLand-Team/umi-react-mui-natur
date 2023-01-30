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
import borders from '@/assets/theme-dark/base/borders';
import colors from '@/assets/theme-dark/base/colors';

// Otis Admin PRO React helper functions
import pxToRem from '@/assets/theme-dark/functions/pxToRem';

const { borderRadius } = borders;
const { light } = colors;

export default {
	styleOverrides: {
		root: {
			height: pxToRem(6),
			borderRadius: borderRadius.md,
			overflow: 'visible',
			position: 'relative',
		},

		colorPrimary: {
			backgroundColor: light.main,
		},

		colorSecondary: {
			backgroundColor: light.main,
		},

		bar: {
			height: pxToRem(6),
			borderRadius: borderRadius.sm,
			position: 'absolute',
			transform: `translate(0, 0) !important`,
			transition: 'width 0.6s ease !important',
		},
	} as const,
};
