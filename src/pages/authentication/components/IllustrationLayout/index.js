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
import MDTypography from '@/components/MDTypography';

// Otis Admin PRO React example components
import DefaultNavbar from '@/components/Navbars/DefaultNavbar';
import PageLayout from '@/components/LayoutContainers/PageLayout';

// Otis Admin PRO React page layout routes
import pageRoutes from 'page.routes';

// Otis Admin PRO React context
import { useMaterialUIController } from 'context';

function IllustrationLayout({ header, title, description, illustration, children }) {
	const [controller] = useMaterialUIController();
	const { darkMode } = controller;

	return (
		<PageLayout background="white">
			<DefaultNavbar
				routes={pageRoutes}
				action={{
					type: 'external',
					route: 'https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/ ',
					label: 'buy now',
				}}
			/>
			<Grid
				container
				sx={{
					backgroundColor: ({ palette: { background, white } }) =>
						darkMode ? background.default : white.main,
				}}
			>
				<Grid item xs={12} lg={6}>
					<MDBox
						display={{ xs: 'none', lg: 'flex' }}
						width="calc(100% - 2rem)"
						height="calc(100vh - 2rem)"
						borderRadius="lg"
						ml={2}
						mt={2}
						sx={{ backgroundImage: `url(${illustration})` }}
					/>
				</Grid>
				<Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: 'auto' }}>
					<MDBox display="flex" flexDirection="column" justifyContent="center" height="100vh">
						<MDBox py={3} px={3} textAlign="center">
							{!header ? (
								<>
									<MDBox mb={1} textAlign="center">
										<MDTypography variant="h4" fontWeight="bold">
											{title}
										</MDTypography>
									</MDBox>
									<MDTypography variant="body2" color="text">
										{description}
									</MDTypography>
								</>
							) : (
								header
							)}
						</MDBox>
						<MDBox p={3}>{children}</MDBox>
					</MDBox>
				</Grid>
			</Grid>
		</PageLayout>
	);
}

// Setting default values for the props of IllustrationLayout
IllustrationLayout.defaultProps = {
	header: '',
	title: '',
	description: '',
	illustration: '',
};

// Typechecking props for the IllustrationLayout
IllustrationLayout.propTypes = {
	header: PropTypes.node,
	title: PropTypes.string,
	description: PropTypes.string,
	children: PropTypes.node.isRequired,
	illustration: PropTypes.string,
};

export default IllustrationLayout;
