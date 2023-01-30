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

// react-flatpickr components
import Flatpickr from 'react-flatpickr';

// react-flatpickr styles
import 'flatpickr/dist/flatpickr.css';

// Otis Admin PRO React components
import MDInput from '@/components/MDInput';

function MDDatePicker({ input, ...rest }) {
	return (
		<Flatpickr
			{...rest}
			render={({ defaultValue }, ref) => (
				<MDInput {...input} defaultValue={defaultValue} inputRef={ref} />
			)}
		/>
	);
}

// Setting default values for the props of MDDatePicker
MDDatePicker.defaultProps = {
	input: {},
};

// Typechecking props for the MDDatePicker
MDDatePicker.propTypes = {
	input: PropTypes.instanceOf(Object),
};

export default MDDatePicker;
