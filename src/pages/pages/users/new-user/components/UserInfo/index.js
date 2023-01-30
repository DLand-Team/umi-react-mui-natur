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

function UserInfo({ formData }) {
	const { formField, values, errors, touched } = formData;
	const { firstName, lastName, company, email, password, repeatPassword } = formField;
	const {
		firstName: firstNameV,
		lastName: lastNameV,
		company: companyV,
		email: emailV,
		password: passwordV,
		repeatPassword: repeatPasswordV,
	} = values;

	return (
		<MDBox>
			<MDBox lineHeight={0}>
				<MDTypography variant="h5">About me</MDTypography>
				<MDTypography variant="button" color="text">
					Mandatory informations
				</MDTypography>
			</MDBox>
			<MDBox mt={1.625}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<FormField
							type={firstName.type}
							label={firstName.label}
							name={firstName.name}
							value={firstNameV}
							placeholder={firstName.placeholder}
							error={errors.firstName && touched.firstName}
							success={firstNameV.length > 0 && !errors.firstName}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormField
							type={lastName.type}
							label={lastName.label}
							name={lastName.name}
							value={lastNameV}
							placeholder={lastName.placeholder}
							error={errors.lastName && touched.lastName}
							success={lastNameV.length > 0 && !errors.lastName}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<FormField
							type={company.type}
							label={company.label}
							name={company.name}
							value={companyV}
							placeholder={company.placeholder}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormField
							type={email.type}
							label={email.label}
							name={email.name}
							value={emailV}
							placeholder={email.placeholder}
							error={errors.email && touched.email}
							success={emailV.length > 0 && !errors.email}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<FormField
							type={password.type}
							label={password.label}
							name={password.name}
							value={passwordV}
							placeholder={password.placeholder}
							error={errors.password && touched.password}
							success={passwordV.length > 0 && !errors.password}
							inputProps={{ autoComplete: '' }}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormField
							type={repeatPassword.type}
							label={repeatPassword.label}
							name={repeatPassword.name}
							value={repeatPasswordV}
							placeholder={repeatPassword.placeholder}
							error={errors.repeatPassword && touched.repeatPassword}
							success={repeatPasswordV.length > 0 && !errors.repeatPassword}
							inputProps={{ autoComplete: '' }}
						/>
					</Grid>
				</Grid>
			</MDBox>
		</MDBox>
	);
}

// typechecking props for UserInfo
UserInfo.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default UserInfo;
