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
import boxShadows from '@/assets/theme-dark/base/boxShadows';
import typography from '@/assets/theme-dark/base/typography';
import colors from '@/assets/theme-dark/base/colors';
import borders from '@/assets/theme-dark/base/borders';

// Otis Admin PRO React helper functions
import pxToRem from '@/assets/theme-dark/functions/pxToRem';

const { md } = boxShadows;
const { size } = typography;
const { text, background } = colors;
const { borderRadius } = borders;

export default {
	defaultProps: {
		disableAutoFocusItem: true,
	},

	styleOverrides: {
		paper: {
			minWidth: pxToRem(160),
			boxShadow: md,
			padding: `${pxToRem(16)} ${pxToRem(8)}`,
			fontSize: size.sm,
			color: text.main,
			textAlign: 'left' as const,
			backgroundColor: `${background.card} !important`,
			borderRadius: borderRadius.md,
		},
	},
};
