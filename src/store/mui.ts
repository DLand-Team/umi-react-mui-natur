const state = {
	miniSidenav: false,
	transparentSidenav: false,
	whiteSidenav: false,
	sidenavColor: 'info',
	transparentNavbar: true,
	fixedNavbar: true,
	openConfigurator: false,
	direction: 'ltr' as 'ltr' | 'rtl',
	layout: 'dashboard',
	darkMode: false,
};

type State = typeof state;

const actions = {
	setMiniSidenav: (miniSidenav: boolean) => ({ miniSidenav }),
	setTransparentSidenav: (transparentSidenav: boolean) => ({ transparentSidenav }),
	setWhiteSidenav: (whiteSidenav: boolean) => ({ whiteSidenav }),
	setSidenavColor: (sidenavColor: string) => ({ sidenavColor }),
	setTransparentNavbar: (transparentNavbar: boolean) => ({ transparentNavbar }),
	setFixedNavbar: (fixedNavbar: boolean) => ({ fixedNavbar }),
	setOpenConfigurator: (openConfigurator: boolean) => ({ openConfigurator }),
	setDirection: (direction: State['direction']) => ({ direction }),
	setLayout: (layout: string) => ({ layout }),
	setDarkMode: (darkMode: boolean) => ({ darkMode }),
};

export default {
	state,
	actions,
};
