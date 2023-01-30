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

// @mui material components
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';
import Link from '@mui/material/Link';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// Otis Admin PRO React example components
import DefaultNavbarMenu from '@/components/Navbars/DefaultNavbar/DefaultNavbarMenu';

function DocsMenu({ routes, open, close, mobileMenu }) {
	const renderDocsMenuRoute = (routeName) =>
		routes.map(
			({ key, collapse }) =>
				key === routeName &&
				collapse.map(({ key: collapseKey, href, name, icon, description }) => (
					<MenuItem
						key={collapseKey}
						component={Link}
						href={href}
						target="_blank"
						rel="noreferrer"
						onClick={mobileMenu ? undefined : close}
					>
						<MDBox display="flex" py={0.25} fontSize="1rem" color="text">
							{typeof icon === 'string' ? (
								<Icon color="inherit">{icon}</Icon>
							) : (
								<MDBox color="inherit">{icon}</MDBox>
							)}
							<MDBox pl={1} lineHeight={0}>
								<MDTypography variant="button" display="block" fontWeight="bold">
									{name}
								</MDTypography>
								<MDTypography variant="button" fontWeight="regular" color="text">
									{description}
								</MDTypography>
							</MDBox>
						</MDBox>
					</MenuItem>
				)),
		);

	return mobileMenu ? (
		renderDocsMenuRoute('docs')
	) : (
		<DefaultNavbarMenu open={open} close={close}>
			{renderDocsMenuRoute('docs')}
		</DefaultNavbarMenu>
	);
}

// Setting default values for the props of DocsMenu
DocsMenu.defaultProps = {
	mobileMenu: false,
	open: false,
	close: false,
};

// Typechecking props for the DocsMenu
DocsMenu.propTypes = {
	routes: PropTypes.instanceOf(Array).isRequired,
	open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	close: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
	mobileMenu: PropTypes.bool,
};

export default DocsMenu;
