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

// @mui material components
import Fade from '@mui/material/Fade';

// Otis Admin PRO React base styles
import colors from '@/assets/theme-dark/base/colors';
import typography from '@/assets/theme-dark/base/typography';
import borders from '@/assets/theme-dark/base/borders';

// Otis Admin PRO React helper functions
import pxToRem from '@/assets/theme-dark/functions/pxToRem';

const { black, white } = colors;
const { size, fontWeightRegular } = typography;
const { borderRadius } = borders;

export default {
	defaultProps: {
		arrow: true,
		TransitionComponent: Fade,
	},

	styleOverrides: {
		tooltip: {
			maxWidth: pxToRem(200),
			backgroundColor: black.main,
			color: white.main,
			fontSize: size.sm,
			fontWeight: fontWeightRegular,
			textAlign: 'center' as const,
			borderRadius: borderRadius.md,
			opacity: 0.7,
			padding: `${pxToRem(5)} ${pxToRem(8)} ${pxToRem(4)}`,
		},

		arrow: {
			color: black.main,
		},
	},
};
