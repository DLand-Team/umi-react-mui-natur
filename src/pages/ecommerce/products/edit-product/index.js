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

// @mui material components
import Grid from '@mui/material/Grid';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDButton from '@/components/MDButton';

// Otis Admin PRO React example components
import DashboardLayout from '@/components/LayoutContainers/DashboardLayout';
import DashboardNavbar from '@/components/Navbars/DashboardNavbar';
import Footer from '@/components/Footer';

// EditProduct page components
import ProductImage from 'layouts/ecommerce/products/edit-product/components/ProductImage';
import ProductInfo from 'layouts/ecommerce/products/edit-product/components/ProductInfo';
import Socials from 'layouts/ecommerce/products/edit-product/components/Socials';
import Pricing from 'layouts/ecommerce/products/edit-product/components/Pricing';

function EditProduct() {
	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox my={3}>
				<MDBox mb={6}>
					<Grid container spacing={3} alignItems="center">
						<Grid item xs={12} lg={6}>
							<MDTypography variant="h4" fontWeight="medium">
								Make the changes below
							</MDTypography>
							<MDBox mt={1} mb={2}>
								<MDTypography variant="body2" color="text">
									We’re constantly trying to express ourselves and actualize our dreams. If you have
									the opportunity to play.
								</MDTypography>
							</MDBox>
						</Grid>
						<Grid item xs={12} lg={6}>
							<MDBox display="flex" justifyContent="flex-end">
								<MDButton variant="gradient" color="info">
									save
								</MDButton>
							</MDBox>
						</Grid>
					</Grid>
				</MDBox>
				<Grid container spacing={3}>
					<Grid item xs={12} lg={4}>
						<ProductImage />
					</Grid>
					<Grid item xs={12} lg={8}>
						<ProductInfo />
					</Grid>
					<Grid item xs={12} lg={4}>
						<Socials />
					</Grid>
					<Grid item xs={12} lg={8}>
						<Pricing />
					</Grid>
				</Grid>
			</MDBox>
			<Footer />
		</DashboardLayout>
	);
}

export default EditProduct;
