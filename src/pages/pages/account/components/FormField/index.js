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

// Otis Admin PRO React components
import MDInput from '@/components/MDInput';

function FormField({ label, ...rest }) {
	return (
		<MDInput
			variant="standard"
			label={label}
			fullWidth
			InputLabelProps={{ shrink: true }}
			{...rest}
		/>
	);
}

// Setting default values for the props of FormField
FormField.defaultProps = {
	label: ' ',
};

// Typechecking props for FormField
FormField.propTypes = {
	label: PropTypes.string,
};

export default FormField;
