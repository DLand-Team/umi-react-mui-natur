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

// Otis Admin PRO React helper functions
import pxToRem from '@/assets/theme-dark/functions/pxToRem';

export default {
	defaultProps: {
		baseClassName: 'material-icons-round',
		fontSize: 'inherit',
	} as const,

	styleOverrides: {
		fontSizeInherit: {
			fontSize: 'inherit !important',
		},

		fontSizeSmall: {
			fontSize: `${pxToRem(20)} !important`,
		},

		fontSizeLarge: {
			fontSize: `${pxToRem(36)} !important`,
		},
	},
};
