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

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// NewUser page components
import FormField from 'layouts/pages/users/new-user/components/FormField';

function Profile({ formData }) {
	const { formField, values } = formData;
	const { publicEmail, bio } = formField;
	const { publicEmail: publicEmailV, bio: bioV } = values;

	return (
		<MDBox>
			<MDTypography variant="h5" fontWeight="bold">
				Profile
			</MDTypography>
			<MDBox mt={1.625}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<FormField
							type={publicEmail.type}
							label={publicEmail.label}
							name={publicEmail.name}
							value={publicEmailV}
							placeholder={publicEmail.placeholder}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormField
							type={bio.type}
							label={bio.label}
							name={bio.name}
							value={bioV}
							placeholder={bio.placeholder}
							multiline
							rows={5}
						/>
					</Grid>
				</Grid>
			</MDBox>
		</MDBox>
	);
}

// typechecking props for Profile
Profile.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Profile;
