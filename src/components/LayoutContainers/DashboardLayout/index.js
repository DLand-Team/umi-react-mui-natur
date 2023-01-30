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

import { useEffect } from 'react';

// react-router-dom components
import { useLocation } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import { useMaterialUIController } from '../../../utils/hooks';

// Otis Admin PRO React context

function DashboardLayout({ children }) {
	const [controller, { setLayout }] = useMaterialUIController();
	const { miniSidenav } = controller;
	const { pathname } = useLocation();

	useEffect(() => {
		setLayout('dashboard');
	}, [pathname]);

	return (
		<MDBox
			sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
				p: 3,
				position: 'relative',

				[breakpoints.up('xl')]: {
					marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
					transition: transitions.create(['margin-left', 'margin-right'], {
						easing: transitions.easing.easeInOut,
						duration: transitions.duration.standard,
					}),
				},
			})}
		>
			{children}
		</MDBox>
	);
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default DashboardLayout;
