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

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Grid from '@mui/material/Grid';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';

// Otis Admin PRO React example components
import DefaultNavbar from '@/components/Navbars/DefaultNavbar';
import PageLayout from '@/components/LayoutContainers/PageLayout';

// Otis Admin PRO React page layout routes
import pageRoutes from 'page.routes';

// Authentication pages components
import Footer from 'layouts/authentication/components/Footer';

function BasicLayout({ image, children }) {
	return (
		<PageLayout>
			<DefaultNavbar
				routes={pageRoutes}
				action={{
					type: 'external',
					route: 'https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/ ',
					label: 'buy now',
				}}
				transparent
				light
			/>
			<MDBox
				position="absolute"
				width="100%"
				minHeight="100vh"
				sx={{
					backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
						image &&
						`${linearGradient(
							rgba(gradients.dark.main, 0.6),
							rgba(gradients.dark.state, 0.6),
						)}, url(${image})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			/>
			<MDBox px={1} width="100%" height="100vh" mx="auto">
				<Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
					<Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
						{children}
					</Grid>
				</Grid>
			</MDBox>
			<Footer light />
		</PageLayout>
	);
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
	image: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default BasicLayout;
