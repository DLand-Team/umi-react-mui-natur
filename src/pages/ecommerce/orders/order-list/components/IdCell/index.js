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
import Checkbox from '@mui/material/Checkbox';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

function IdCell({ id, checked }) {
	return (
		<MDBox display="flex" alignItems="center">
			<Checkbox defaultChecked={checked} />
			<MDBox ml={1}>
				<MDTypography variant="caption" fontWeight="medium" color="text">
					{id}
				</MDTypography>
			</MDBox>
		</MDBox>
	);
}

// Setting default value for the props of IdCell
IdCell.defaultProps = {
	checked: false,
};

// Typechecking props for the IdCell
IdCell.propTypes = {
	id: PropTypes.string.isRequired,
	checked: PropTypes.bool,
};

export default IdCell;
