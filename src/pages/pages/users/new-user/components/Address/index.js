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

// prop-type is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDInput from '@/components/MDInput';

// NewUser page components
import FormField from 'layouts/pages/users/new-user/components/FormField';

function Address({ formData }) {
	const { formField, values, errors, touched } = formData;
	const { address1, address2, city, zip } = formField;
	const { address1: address1V, address2: address2V, city: cityV, zip: zipV } = values;

	return (
		<MDBox>
			<MDTypography variant="h5" fontWeight="bold">
				Address
			</MDTypography>
			<MDBox mt={1.625}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<FormField
							type={address1.type}
							label={address1.label}
							name={address1.name}
							value={address1V}
							placeholder={address1.placeholder}
							error={errors.address1 && touched.address1}
							success={address1V.length > 0 && !errors.address1}
						/>
					</Grid>
					<Grid item xs={12}>
						<MDBox mt={-1.625}>
							<FormField
								type={address2.type}
								label={address2.label}
								name={address2.name}
								value={address2V}
								placeholder={address2.placeholder}
							/>
						</MDBox>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<FormField
							type={city.type}
							label={city.label}
							name={city.name}
							value={cityV}
							placeholder={city.placeholder}
							error={errors.city && touched.city}
							success={cityV.length > 0 && !errors.city}
						/>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Autocomplete
							options={['State 1', 'State 2', 'State 3']}
							renderInput={(params) => <MDInput {...params} variant="standard" label="State" />}
						/>
					</Grid>
					<Grid item xs={6} sm={3}>
						<FormField
							type={zip.type}
							label={zip.label}
							name={zip.name}
							value={zipV}
							placeholder={zip.placeholder}
							error={errors.zip && touched.zip}
							success={zipV.length > 0 && !errors.zip}
						/>
					</Grid>
				</Grid>
			</MDBox>
		</MDBox>
	);
}

// typechecking props for Address
Address.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Address;
