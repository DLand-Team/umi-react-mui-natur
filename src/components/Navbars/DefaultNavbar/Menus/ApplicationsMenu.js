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

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// react-router components
import { Link } from 'react-router-dom';

// @mui material components
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// Otis Admin PRO React example components
import DefaultNavbarMenu from '@/components/Navbars/DefaultNavbar/DefaultNavbarMenu';

function ApplicationsMenu({ routes, open, close, mobileMenu }) {
	const renderApplicationsMenuRoute = (routeName) =>
		routes.map(
			({ key, collapse }) =>
				key === routeName &&
				collapse.map(({ key: collapseKey, route, name, icon }) => (
					<MenuItem
						key={collapseKey}
						component={Link}
						to={route}
						onClick={mobileMenu ? undefined : close}
					>
						<MDBox display="flex" alignItems="center" py={0.25} fontSize="1rem" color="text">
							{typeof icon === 'string' ? <Icon>{icon}</Icon> : icon}
							<MDTypography
								variant="button"
								color="text"
								fontWeight="regular"
								pl={2}
								lineHeight={0}
							>
								{name}
							</MDTypography>
						</MDBox>
					</MenuItem>
				)),
		);

	return mobileMenu ? (
		<MDBox px={1.5}>{renderApplicationsMenuRoute('applications')}</MDBox>
	) : (
		<DefaultNavbarMenu open={open} close={close}>
			{renderApplicationsMenuRoute('applications')}
		</DefaultNavbarMenu>
	);
}

// Setting default values for the props of ApplicationsMenu
ApplicationsMenu.defaultProps = {
	mobileMenu: false,
	open: false,
	close: false,
};

// Typechecking props for the ApplicationsMenu
ApplicationsMenu.propTypes = {
	routes: PropTypes.instanceOf(Array).isRequired,
	open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	close: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
	mobileMenu: PropTypes.bool,
};
export default ApplicationsMenu;
