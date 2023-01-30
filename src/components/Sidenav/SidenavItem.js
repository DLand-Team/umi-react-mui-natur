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

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @mui material components
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';

// Custom styles for the SidenavItem
import { item, itemContent, itemArrow } from '@/components/Sidenav/styles/sidenavItem';

// Otis Admin PRO React contexts
import { useMaterialUIController } from '@/utils/hooks';

function SidenavItem({ color, name, active, nested, children, open, ...rest }) {
	const [controller] = useMaterialUIController();
	const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;

	return (
		<>
			<ListItem
				{...rest}
				component="li"
				sx={(theme) => item(theme, { active, color, transparentSidenav, whiteSidenav, darkMode })}
			>
				<MDBox
					sx={(theme) =>
						itemContent(theme, {
							active,
							miniSidenav,
							name,
							open,
							nested,
							transparentSidenav,
							whiteSidenav,
							darkMode,
						})
					}
				>
					<ListItemText primary={name} />
					{children && (
						<Icon
							component="i"
							sx={(theme) =>
								itemArrow(theme, { open, miniSidenav, transparentSidenav, whiteSidenav, darkMode })
							}
						>
							expand_less
						</Icon>
					)}
				</MDBox>
			</ListItem>
			{children && (
				<Collapse in={open} timeout="auto" unmountOnExit {...rest}>
					{children}
				</Collapse>
			)}
		</>
	);
}

// Setting default values for the props of SidenavItem
SidenavItem.defaultProps = {
	color: 'info',
	active: false,
	nested: false,
	children: false,
	open: false,
};

// Typechecking props for the SidenavItem
SidenavItem.propTypes = {
	color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark']),
	name: PropTypes.string.isRequired,
	active: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	nested: PropTypes.bool,
	children: PropTypes.node,
	open: PropTypes.bool,
};

export default SidenavItem;
