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
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDAvatar from '@/components/MDAvatar';

function ProductCell({ image, name }) {
	return (
		<MDBox display="flex" alignItems="center" pr={2}>
			<MDBox mr={2}>
				<MDAvatar src={image} alt={name} />
			</MDBox>
			<MDTypography variant="button" fontWeight="medium">
				{name}
			</MDTypography>
		</MDBox>
	);
}

// Typechecking props for the ProductCell
ProductCell.propTypes = {
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default ProductCell;
