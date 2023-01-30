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
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// Otis Admin PRO React context
import { useMaterialUIController } from 'context';

function DefaultNavbarLink({
	name,
	openHandler,
	closeHandler,
	children,
	collapseStatus,
	light,
	...rest
}) {
	const [controller] = useMaterialUIController();
	const { darkMode } = controller;

	return (
		<>
			<MDBox
				{...rest}
				mx={1}
				p={1}
				onMouseEnter={children ? undefined : openHandler}
				onMouseLeave={children ? undefined : closeHandler}
				display="flex"
				alignItems="baseline"
				color={light ? 'white' : 'dark'}
				sx={{ cursor: 'pointer', userSelect: 'none' }}
			>
				<MDTypography
					variant="button"
					fontWeight="regular"
					textTransform="capitalize"
					color={darkMode ? 'white' : 'inherit'}
					sx={{ fontWeight: '100%' }}
				>
					{name}
				</MDTypography>
				<MDTypography variant="body2" color={light ? 'white' : 'dark'}>
					<Icon sx={{ fontWeight: 'bold', verticalAlign: 'middle' }}>keyboard_arrow_down</Icon>
				</MDTypography>
			</MDBox>
			{children && (
				<Collapse in={Boolean(collapseStatus)} timeout="auto" unmountOnExit>
					{children}
				</Collapse>
			)}
		</>
	);
}

// Setting default values for the props of DefaultNavbarLink
DefaultNavbarLink.defaultProps = {
	openHandler: false,
	closeHandler: false,
	children: false,
	collapseStatus: false,
	light: false,
};

// Typechecking props for the DefaultNavbarLink
DefaultNavbarLink.propTypes = {
	name: PropTypes.string.isRequired,
	openHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	closeHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	children: PropTypes.node,
	collapseStatus: PropTypes.bool,
	light: PropTypes.bool,
};

export default DefaultNavbarLink;
