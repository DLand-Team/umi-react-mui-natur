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

import { forwardRef } from 'react';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @mui material components
import Icon from '@mui/material/Icon';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// custom styles for the DefaultItem
import defaultItemIconBox from '@/components/Items/DefaultItem/styles';

const DefaultItem = forwardRef(({ color, icon, title, description, ...rest }, ref) => (
	<MDBox {...rest} ref={ref} display="flex" alignItems="center">
		<MDBox sx={(theme) => defaultItemIconBox(theme, { color })}>
			<Icon>{icon}</Icon>
		</MDBox>
		<MDBox ml={2} mt={0.5} lineHeight={1.4}>
			<MDTypography display="block" variant="button" fontWeight="medium">
				{title}
			</MDTypography>
			<MDTypography variant="button" fontWeight="regular" color="text">
				{description}
			</MDTypography>
		</MDBox>
	</MDBox>
));

// Setting default values for the props of DefaultItem
DefaultItem.defaultProps = {
	color: 'info',
};

// Typechecking props for the DefaultItem
DefaultItem.propTypes = {
	color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark']),
	icon: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default DefaultItem;
