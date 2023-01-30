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
import Icon from '@mui/material/Icon';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

function DefaultNavbarCategory({ icon, title }) {
	return (
		<MDBox width="100%" display="flex" alignItems="center" py={1}>
			<MDBox
				display="flex"
				justifyContent="center"
				alignItems="center"
				width="1.5rem"
				height="1.5rem"
				borderRadius="md"
				color="text"
				mr={1}
				fontSize="1rem"
			>
				{typeof icon === 'string' ? <Icon>{icon}</Icon> : icon}
			</MDBox>
			<MDTypography variant="button" fontWeight="bold">
				{title}
			</MDTypography>
		</MDBox>
	);
}

// Typechecking props for the DefaultNavbarCategory
DefaultNavbarCategory.propTypes = {
	icon: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
};

export default DefaultNavbarCategory;
