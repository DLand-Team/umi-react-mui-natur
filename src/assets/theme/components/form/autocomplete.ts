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
import boxShadows from '@/assets/theme/base/boxShadows';
import typography from '@/assets/theme/base/typography';
import colors from '@/assets/theme/base/colors';
import borders from '@/assets/theme/base/borders';

// Otis Admin PRO React helper functions
import pxToRem from '@/assets/theme/functions/pxToRem';

const { lg } = boxShadows;
const { size } = typography;
const { text, white, transparent, light, dark, gradients } = colors;
const { borderRadius } = borders;

export default {
	styleOverrides: {
		popper: {
			boxShadow: lg,
			padding: pxToRem(8),
			fontSize: size.sm,
			color: text.main,
			textAlign: 'left' as const,
			backgroundColor: `${white.main} !important`,
			borderRadius: borderRadius.md,
		},

		paper: {
			boxShadow: 'none' as const,
			backgroundColor: transparent.main,
		},

		option: {
			padding: `${pxToRem(4.8)} ${pxToRem(16)}`,
			borderRadius: borderRadius.md,
			fontSize: size.sm,
			color: text.main,
			transition: 'background-color 300ms ease, color 300ms ease',

			'&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus': {
				backgroundColor: light.main,
				color: dark.main,
			},

			'&[aria-selected="true"]': {
				backgroundColor: `${light.main} !important`,
				color: `${dark.main} !important`,
			},
		},

		noOptions: {
			fontSize: size.sm,
			color: text.main,
		},

		groupLabel: {
			color: dark.main,
		},

		loading: {
			fontSize: size.sm,
			color: text.main,
		},

		tag: {
			display: 'flex',
			alignItems: 'center',
			height: 'auto',
			padding: pxToRem(4),
			backgroundColor: gradients.dark.state,
			color: white.main,

			'& .MuiChip-label': {
				lineHeight: 1.2,
				padding: `0 ${pxToRem(10)} 0 ${pxToRem(4)}`,
			},

			'& .MuiSvgIcon-root, & .MuiSvgIcon-root:hover, & .MuiSvgIcon-root:focus': {
				color: white.main,
				marginRight: 0,
			},
		} as const,
	},
};
