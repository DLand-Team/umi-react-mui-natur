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

// Otis Admin PRO React Base Styles
import typography from '@/assets/theme-dark/base/typography';
import borders from '@/assets/theme-dark/base/borders';

// Otis Admin PRO React Helper Functions
import pxToRem from '@/assets/theme-dark/functions/pxToRem';

const { fontWeightBold, size } = typography;
const { borderRadius } = borders;

export default {
	display: 'inline-flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: size.xs,
	fontWeight: fontWeightBold,
	borderRadius: borderRadius.lg,
	padding: `${pxToRem(6.302)} ${pxToRem(16.604)}`,
	lineHeight: 1.4,
	textAlign: 'center',
	textTransform: 'uppercase',
	userSelect: 'none',
	backgroundSize: '150% !important',
	backgroundPositionX: '25% !important',
	transition: 'all 150ms ease-in',

	'&:disabled': {
		pointerEvent: 'none',
		opacity: 0.65,
	},

	'& .material-icons': {
		fontSize: pxToRem(15),
		marginTop: pxToRem(-2),
	},
} as const;
