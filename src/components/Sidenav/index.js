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

import { useEffect, useState } from 'react';

// react-router-dom components
import { useLocation, NavLink } from 'umi';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @mui material components
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// Otis Admin PRO React example components
import SidenavCollapse from '@/components/Sidenav/SidenavCollapse';
import SidenavList from '@/components/Sidenav/SidenavList';
import SidenavItem from '@/components/Sidenav/SidenavItem';

// Custom styles for the Sidenav
import SidenavRoot from '@/components/Sidenav/SidenavRoot';
import sidenavLogoLabel from '@/components/Sidenav/styles/sidenav';
import { useMaterialUIController } from '../../utils/hooks';

// Otis Admin PRO React context

function Sidenav({ color, brand, brandName, routes, ...rest }) {
	const [openCollapse, setOpenCollapse] = useState(false);
	const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
	const [controller, { setMiniSidenav, setTransparentSidenav, setWhiteSidenav }] =
		useMaterialUIController();
	const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
	const location = useLocation();
	const { pathname } = location;
	const collapseName = pathname.split('/').slice(1)[0];
	const items = pathname.split('/').slice(1);
	const itemParentName = items[1];
	const itemName = items[items.length - 1];

	let textColor = 'white';

	if (transparentSidenav || (whiteSidenav && !darkMode)) {
		textColor = 'dark';
	} else if (whiteSidenav && darkMode) {
		textColor = 'inherit';
	}

	const closeSidenav = () => setMiniSidenav(true);

	useEffect(() => {
		setOpenCollapse(collapseName);
		setOpenNestedCollapse(itemParentName);
	}, []);

	useEffect(() => {
		// A function that sets the mini state of the sidenav.
		function handleMiniSidenav() {
			setMiniSidenav(window.innerWidth < 1200);
			setTransparentSidenav(window.innerWidth < 1200 ? false : transparentSidenav);
			setWhiteSidenav(window.innerWidth < 1200 ? false : whiteSidenav);
		}

		/**
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
		window.addEventListener('resize', handleMiniSidenav);

		// Call the handleMiniSidenav function to set the state with the initial value.
		handleMiniSidenav();

		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleMiniSidenav);
	}, [location]);

	// Render all the nested collapse items from the routes.js
	const renderNestedCollapse = (collapse) => {
		const template = collapse.map(({ name, route, key, href }) =>
			href ? (
				<Link
					key={key}
					href={href}
					target="_blank"
					rel="noreferrer"
					sx={{ textDecoration: 'none' }}
				>
					<SidenavItem name={name} nested />
				</Link>
			) : (
				<NavLink to={route} key={key} sx={{ textDecoration: 'none' }}>
					<SidenavItem name={name} active={route === pathname} nested />
				</NavLink>
			),
		);

		return template;
	};
	// Render the all the collpases from the routes.js
	const renderCollapse = (collapses) =>
		collapses.map(({ name, collapse, route, href, key }) => {
			let returnValue;

			if (collapse) {
				returnValue = (
					<SidenavItem
						key={key}
						color={color}
						name={name}
						active={key === itemParentName ? 'isParent' : false}
						open={openNestedCollapse === key}
						onClick={({ currentTarget }) =>
							openNestedCollapse === key && currentTarget.classList.contains('MuiListItem-root')
								? setOpenNestedCollapse(false)
								: setOpenNestedCollapse(key)
						}
					>
						{renderNestedCollapse(collapse)}
					</SidenavItem>
				);
			} else {
				returnValue = href ? (
					<Link
						href={href}
						key={key}
						target="_blank"
						rel="noreferrer"
						sx={{ textDecoration: 'none' }}
					>
						<SidenavItem color={color} name={name} active={key === itemName} />
					</Link>
				) : (
					<NavLink to={route} key={key} sx={{ textDecoration: 'none' }}>
						<SidenavItem color={color} name={name} active={key === itemName} />
					</NavLink>
				);
			}
			return <SidenavList key={key}>{returnValue}</SidenavList>;
		});

	// Render all the routes from the routes.js (All the visible items on the Sidenav)
	const renderRoutes = routes.map(
		({ type, name, icon, title, collapse, noCollapse, key, href }) => {
			let returnValue;

			if (type === 'collapse') {
				returnValue = href ? (
					<Link
						href={href}
						key={key}
						target="_blank"
						rel="noreferrer"
						sx={{ textDecoration: 'none' }}
					>
						<SidenavCollapse
							name={name}
							icon={icon}
							active={key === collapseName}
							noCollapse={noCollapse}
						/>
					</Link>
				) : (
					<SidenavCollapse
						key={key}
						name={name}
						icon={icon}
						active={key === collapseName}
						open={openCollapse === key}
						onClick={() => (openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key))}
					>
						{collapse ? renderCollapse(collapse) : null}
					</SidenavCollapse>
				);
			} else if (type === 'title') {
				returnValue = (
					<MDTypography
						key={key}
						color={textColor}
						display="block"
						variant="caption"
						fontWeight="bold"
						textTransform="uppercase"
						pl={3}
						mt={2}
						mb={1}
						ml={1}
					>
						{title}
					</MDTypography>
				);
			} else if (type === 'divider') {
				returnValue = (
					<Divider
						key={key}
						light={
							(!darkMode && !whiteSidenav && !transparentSidenav) ||
							(darkMode && !transparentSidenav && whiteSidenav)
						}
					/>
				);
			}

			return returnValue;
		},
	);

	return (
		<SidenavRoot
			{...rest}
			variant="permanent"
			ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
		>
			<MDBox pt={3} pb={1} px={4} textAlign="center">
				<MDBox
					display={{ xs: 'block', xl: 'none' }}
					position="absolute"
					top={0}
					right={0}
					p={1.625}
					onClick={closeSidenav}
					sx={{ cursor: 'pointer' }}
				>
					<MDTypography variant="h6" color="secondary">
						<Icon sx={{ fontWeight: 'bold' }}>close</Icon>
					</MDTypography>
				</MDBox>
				<MDBox component={NavLink} to="/" display="flex" alignItems="center">
					{brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />}
					<MDBox
						width={!brandName && '100%'}
						sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
					>
						<MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
							{brandName}
						</MDTypography>
					</MDBox>
				</MDBox>
			</MDBox>
			<Divider
				light={
					(!darkMode && !whiteSidenav && !transparentSidenav) ||
					(darkMode && !transparentSidenav && whiteSidenav)
				}
			/>
			<List>{renderRoutes}</List>
		</SidenavRoot>
	);
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
	color: 'info',
	brand: '',
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
	color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark']),
	brand: PropTypes.string,
	brandName: PropTypes.string.isRequired,
	routes: PropTypes.instanceOf(Array).isRequired,
};

export default Sidenav;
