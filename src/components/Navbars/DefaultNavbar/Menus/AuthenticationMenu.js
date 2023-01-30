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

import { useState } from 'react';

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

function AuthenticationMenu({ routes, open, close, mobileMenu }) {
	const renderAuthenticationMenuRoute = (routeName) =>
		routes.map(({ key, name, icon, collapse }) => {
			let template;

			const [menu, setMenu] = useState(false);
			const openMenu = ({ currentTarget }) => setMenu(currentTarget);
			const closeMenu = () => setMenu(false);

			if (key === routeName && !mobileMenu) {
				template = (
					<MenuItem key={key} onMouseEnter={openMenu} onMouseLeave={closeMenu}>
						<Icon sx={{ mr: 1 }}>{icon}</Icon>
						{name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<Icon sx={{ fontWeight: 'bold', ml: 'auto' }}>chevron_right</Icon>
						<DefaultNavbarMenu
							placement="right-start"
							open={menu}
							close={closeMenu}
							style={{ paddingLeft: '1.25rem' }}
						>
							{collapse.map(({ key: collapseKey, name: collapseName, route }) => (
								<MenuItem
									component={Link}
									to={route}
									key={collapseKey}
									onClick={mobileMenu ? undefined : close}
								>
									{collapseName}
								</MenuItem>
							))}
						</DefaultNavbarMenu>
					</MenuItem>
				);
			} else if (key === routeName && mobileMenu) {
				template = (
					<MDBox key={key} px={2} mt={0} mb={2}>
						<MDTypography variant="button" fontWeight="bold" gutterBottom>
							<MDTypography component="span" variant="body2" color="text">
								<Icon sx={{ mr: 1, mb: -0.375 }}>{icon}</Icon>
							</MDTypography>
							{name}
						</MDTypography>
						{collapse.map(({ key: collapseKey, name: collapseName, route }) => (
							<MenuItem
								component={Link}
								to={route}
								key={collapseKey}
								onClick={mobileMenu ? undefined : close}
							>
								{collapseName}
							</MenuItem>
						))}
					</MDBox>
				);
			}

			return template;
		});

	const renderMenuContent = (
		<MDBox display="block">
			{renderAuthenticationMenuRoute('sign-in')}
			{renderAuthenticationMenuRoute('sign-up')}
			{renderAuthenticationMenuRoute('reset-password')}
			{renderAuthenticationMenuRoute('lock')}
			{renderAuthenticationMenuRoute('2-step-verification')}
			{renderAuthenticationMenuRoute('error')}
		</MDBox>
	);

	return mobileMenu ? (
		renderMenuContent
	) : (
		<DefaultNavbarMenu open={open} close={close}>
			{renderMenuContent}
		</DefaultNavbarMenu>
	);
}

// Setting default values for the props of AuthenticationMenu
AuthenticationMenu.defaultProps = {
	mobileMenu: false,
	open: false,
	close: false,
};

// Typechecking props for the AuthenticationMenu
AuthenticationMenu.propTypes = {
	routes: PropTypes.instanceOf(Array).isRequired,
	open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	close: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
	mobileMenu: PropTypes.bool,
};

export default AuthenticationMenu;
