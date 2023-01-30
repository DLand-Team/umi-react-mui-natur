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
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// Otis Admin PRO React example components
import DashboardLayout from '@/components/LayoutContainers/DashboardLayout';
import DashboardNavbar from '@/components/Navbars/DashboardNavbar';
import Footer from '@/components/Footer';
import DataTable from '@/components/Tables/DataTable';

// ProductPage page components
import ProductImages from 'layouts/ecommerce/products/product-page/components/ProductImages';
import ProductInfo from 'layouts/ecommerce/products/product-page/components/ProductInfo';

// Data
import dataTableData from 'layouts/ecommerce/products/product-page/data/dataTableData';

function ProductPage() {
	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox py={3}>
				<Card sx={{ overflow: 'visible' }}>
					<MDBox p={3}>
						<MDBox mb={3}>
							<MDTypography variant="h5" fontWeight="medium">
								Product Details
							</MDTypography>
						</MDBox>

						<Grid container spacing={3}>
							<Grid item xs={12} lg={6} xl={5}>
								<ProductImages />
							</Grid>
							<Grid item xs={12} lg={5} sx={{ mx: 'auto' }}>
								<ProductInfo />
							</Grid>
						</Grid>

						<MDBox mt={8} mb={2}>
							<MDBox mb={1} ml={2}>
								<MDTypography variant="h5" fontWeight="medium">
									Other Products
								</MDTypography>
							</MDBox>
							<DataTable
								table={dataTableData}
								entriesPerPage={false}
								showTotalEntries={false}
								isSorted={false}
							/>
						</MDBox>
					</MDBox>
				</Card>
			</MDBox>
			<Footer />
		</DashboardLayout>
	);
}

export default ProductPage;
