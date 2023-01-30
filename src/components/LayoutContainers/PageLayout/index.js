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

function PageLayout({ background, children }) {
	const [, { setLayout }] = useMaterialUIController();
	const { pathname } = useLocation();

	useEffect(() => {
		setLayout('page');
	}, [pathname]);

	return (
		<MDBox
			width="100vw"
			height="100%"
			minHeight="100vh"
			bgColor={background}
			sx={{ overflowX: 'hidden' }}
		>
			{children}
		</MDBox>
	);
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
	background: 'default',
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
	background: PropTypes.oneOf(['white', 'light', 'default']),
	children: PropTypes.node.isRequired,
};

export default PageLayout;
