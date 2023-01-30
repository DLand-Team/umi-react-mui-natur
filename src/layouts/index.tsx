import { useInject, useLocation, useMaterialUIController } from '@/utils/hooks';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, store } from 'umi';
import Icon from '@mui/material/Icon';
import MDBox from '@/components/MDBox';
import Sidenav from '@/components/Sidenav';
import Configurator from '@/components/Configurator';
import brandWhite from '@/assets/images/logo-ct.png';
import brandDark from '@/assets/images/logo-ct-dark.png';

import routes from '@/router';

export default function Layout() {
	const location = useLocation();
	const [mui] = useInject('mui');
	const {
		miniSidenav,
		direction,
		layout,
		openConfigurator,
		sidenavColor,
		transparentSidenav,
		whiteSidenav,
		darkMode,
	} = mui.state;
	const {
		setOpenConfigurator,
		setTransparentSidenav,
		setWhiteSidenav,
		setMiniSidenav,
		setFixedNavbar,
		setSidenavColor,
		setDarkMode,
	} = mui.actions;
	
	useEffect(() => {
		// 监听路由变化，并同步到store
		store.dispatch('route', 'updatePath', location.pathname);
	}, [location]);

	const [onMouseEnter, setOnMouseEnter] = useState(false);
	const { pathname } = useLocation();

	// Open sidenav when mouse enter on mini sidenav
	const handleOnMouseEnter = () => {
		if (miniSidenav && !onMouseEnter) {
			setMiniSidenav(false);
			setOnMouseEnter(true);
		}
	};

	// Close sidenav when mouse leave mini sidenav
	const handleOnMouseLeave = () => {
		if (onMouseEnter) {
			setMiniSidenav(true);
			setOnMouseEnter(false);
		}
	};

	// Change the openConfigurator state
	const handleConfiguratorOpen = () => setOpenConfigurator(!openConfigurator);

	// Setting the dir attribute for the body element
	useEffect(() => {
		document.body.setAttribute('dir', direction);
	}, [direction]);

	// Setting page scroll to 0 when changing the route
	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement!.scrollTop = 0;
	}, [pathname]);

	const configsButton = (
		<MDBox
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="3.25rem"
			height="3.25rem"
			bgColor="white"
			shadow="sm"
			borderRadius="50%"
			position="fixed"
			right="2rem"
			bottom="2rem"
			zIndex={99}
			color="dark"
			sx={{ cursor: 'pointer' }}
			onClick={handleConfiguratorOpen}
		>
			<Icon fontSize="small" color="inherit">
				settings
			</Icon>
		</MDBox>
	);

	return (
		<>
			{layout === 'dashboard' && (
				<>
					<Sidenav
						color={sidenavColor}
						brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
						brandName="Otis Admin PRO"
						routes={routes}
						onMouseEnter={handleOnMouseEnter}
						onMouseLeave={handleOnMouseLeave}
					/>
					<Configurator />
					{configsButton}
				</>
			)}
			{layout === 'vr' && <Configurator />}
			<Outlet />
		</>
	);
}
