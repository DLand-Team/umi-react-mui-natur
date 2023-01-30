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

import { Fragment } from 'react';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// react-router components
import { Link } from 'react-router-dom';

// @mui material components
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';

// Otis Admin PRO React example components
import DefaultNavbarCategory from '@/components/Navbars/DefaultNavbar/DefaultNavbarCategory';
import DefaultNavbarMenu from '@/components/Navbars/DefaultNavbar/DefaultNavbarMenu';

// Otis Admin PRO React context
import { useMaterialUIController } from 'context';

function PagesMenu({ routes, open, close, mobileMenu }) {
	const [controller] = useMaterialUIController();
	const { darkMode } = controller;

	const renderPagesMenuRoute = (routeName) =>
		routes.map(
			({ key, name, icon, collapse }) =>
				key === routeName && (
					<Fragment key={key}>
						<DefaultNavbarCategory icon={icon} title={name} />
						{collapse.map(({ key: collapseKey, route, name: collapseName }) => (
							<MenuItem
								key={collapseKey}
								component={Link}
								to={route}
								onClick={mobileMenu ? undefined : close}
							>
								<MDBox color="text" pl={2}>
									{collapseName}
								</MDBox>
							</MenuItem>
						))}
					</Fragment>
				),
		);

	const renderMenuContent = (
		<MDBox
			py={1}
			px={2}
			sx={{
				background: ({ palette: { background, white } }) =>
					darkMode ? background.card : white.main,
			}}
		>
			<Grid container spacing={3}>
				<Grid item xs={12} lg={3}>
					{renderPagesMenuRoute('dashboards')}
					<MDBox mt={2}>{renderPagesMenuRoute('users')}</MDBox>
				</Grid>
				<Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
					<MDBox display={{ xs: 'none', lg: 'block' }}>
						<Divider orientation="vertical" />
					</MDBox>
					<MDBox>
						{renderPagesMenuRoute('extra')}
						<MDBox mt={2}>{renderPagesMenuRoute('projects')}</MDBox>
					</MDBox>
				</Grid>
				<Grid item xs={12} lg={5} sx={{ display: 'flex' }}>
					<MDBox display={{ xs: 'none', lg: 'block' }}>
						<Divider orientation="vertical" />
					</MDBox>
					<MDBox width="100%">
						{renderPagesMenuRoute('account')}
						<MDBox mt={2}>{renderPagesMenuRoute('profile')}</MDBox>
					</MDBox>
				</Grid>
			</Grid>
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

// Setting default values for the props of PagesMenu
PagesMenu.defaultProps = {
	mobileMenu: false,
	open: false,
	close: false,
};

// Typechecking props for the PagesMenu
PagesMenu.propTypes = {
	routes: PropTypes.instanceOf(Array).isRequired,
	open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	close: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
	mobileMenu: PropTypes.bool,
};

export default PagesMenu;
