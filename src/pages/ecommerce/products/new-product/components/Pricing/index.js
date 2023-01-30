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
import Autocomplete from '@mui/material/Autocomplete';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDInput from '@/components/MDInput';

// NewProduct page components
import FormField from 'layouts/ecommerce/products/new-product/components/FormField';

function Pricing() {
	return (
		<MDBox>
			<MDTypography variant="h5">Pricing</MDTypography>
			<MDBox mt={3}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={3}>
						<FormField type="text" label="Price" placeholder="99.00" />
					</Grid>
					<Grid item xs={12} sm={4} sx={{ mt: 2 }}>
						<Autocomplete
							defaultValue="USD"
							options={['BTC', 'CNY', 'EUR', 'GBP', 'INR', 'USD']}
							renderInput={(params) => <MDInput {...params} variant="standard" />}
						/>
					</Grid>
					<Grid item xs={12} sm={5}>
						<FormField type="text" label="SKU" placeholder="71283476591" />
					</Grid>
				</Grid>
			</MDBox>
			<MDBox mt={1}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<MDBox my={2} display="inline-block">
							<MDTypography component="label" variant="button" fontWeight="regular" color="text">
								Tags
							</MDTypography>
						</MDBox>
						<Autocomplete
							multiple
							defaultValue={['In Stock', 'Out of Stock']}
							options={['Black Friday', 'Expired', 'Out of Stock', 'In Stock', 'Sale']}
							renderInput={(params) => <MDInput {...params} variant="standard" />}
						/>
					</Grid>
				</Grid>
			</MDBox>
		</MDBox>
	);
}

export default Pricing;
