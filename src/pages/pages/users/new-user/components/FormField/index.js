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

// formik components
import { ErrorMessage, Field } from 'formik';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDInput from '@/components/MDInput';

function FormField({ label, name, ...rest }) {
	return (
		<MDBox mb={1.5}>
			<Field {...rest} name={name} as={MDInput} variant="standard" label={label} fullWidth />
			<MDBox mt={0.75}>
				<MDTypography component="div" variant="caption" color="error" fontWeight="regular">
					<ErrorMessage name={name} />
				</MDTypography>
			</MDBox>
		</MDBox>
	);
}

// typechecking props for FormField
FormField.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default FormField;
