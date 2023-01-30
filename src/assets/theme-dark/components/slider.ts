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
import colors from '@/assets/theme/base/colors';
import borders from '@/assets/theme/base/borders';
import boxShadows from '@/assets/theme/base/boxShadows';

// Otis Admin PRO React helper functions
import pxToRem from '@/assets/theme/functions/pxToRem';

const { grey, white, black, info } = colors;
const { borderRadius, borderWidth } = borders;
const { sliderBoxShadow } = boxShadows;

export default {
	styleOverrides: {
		root: {
			width: '100%',

			'& .MuiSlider-active, & .Mui-focusVisible': {
				boxShadow: 'none !important',
			},

			'& .MuiSlider-valueLabel': {
				color: black.main,
			},
		},

		rail: {
			height: pxToRem(2),
			background: grey[200],
			borderRadius: borderRadius.sm,
			opacity: 1,
		},

		track: {
			background: info.main,
			height: pxToRem(2),
			position: 'relative',
			border: 'none',
			borderRadius: borderRadius.lg,
			zIndex: 1,
		},

		thumb: {
			width: pxToRem(14),
			height: pxToRem(14),
			backgroundColor: white.main,
			zIndex: 10,
			boxShadow: sliderBoxShadow.thumb,
			border: `${borderWidth[1]} solid ${info.main}`,

			'&:hover': {
				boxShadow: 'none',
			},
		},
	} as const,
};
