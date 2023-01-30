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
import typography from '@/assets/theme/base/typography';
import colors from '@/assets/theme/base/colors';

// Otis Admin PRO React helper functions
import pxToRem from '@/assets/theme/functions/pxToRem';
import rgba from '@/assets/theme/functions/rgba';

const { size, fontWeightRegular } = typography;
const { white } = colors;

export default {
	styleOverrides: {
		label: {
			marginTop: `${pxToRem(8)} !important`,
			fontWeight: fontWeightRegular,
			fontSize: size.xs,
			color: '#9fc9ff',
			textTransform: 'uppercase' as const,

			'&.Mui-active': {
				fontWeight: `${fontWeightRegular} !important`,
				color: `${rgba(white.main, 0.8)} !important`,
			},

			'&.Mui-completed': {
				fontWeight: `${fontWeightRegular} !important`,
				color: `${rgba(white.main, 0.8)} !important`,
			},
		},
	},
};
