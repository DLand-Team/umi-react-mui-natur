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

import { useState, useEffect } from 'react';

// @mui material components
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDButton from '@/components/MDButton';

// Custom styles for the Configurator
import ConfiguratorRoot from '@/components/Configurator/ConfiguratorRoot';
import { useInject } from '../../utils/hooks';

function Configurator() {
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
	const [disabled, setDisabled] = useState(false);
	const sidenavColors = ['primary', 'dark', 'info', 'success', 'warning', 'error'];

	// Use the useEffect hook to change the button state for the sidenav type based on window size.
	useEffect(() => {
		// A function that sets the disabled state of the buttons for the sidenav type.
		function handleDisabled() {
			return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
		}

		// The event listener that's calling the handleDisabled function when resizing the window.
		window.addEventListener('resize', handleDisabled);

		// Call the handleDisabled function to set the state with the initial value.
		handleDisabled();

		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleDisabled);
	}, []);

	const handleCloseConfigurator = () => setOpenConfigurator(false);
	const handleTransparentSidenav = () => {
		setTransparentSidenav(true);
		setWhiteSidenav(false);
	};
	const handleWhiteSidenav = () => {
		setWhiteSidenav(true);
		setTransparentSidenav(false);
	};
	const handleDarkSidenav = () => {
		setWhiteSidenav(false);
		setTransparentSidenav(false);
	};
	const handleMiniSidenav = () => setMiniSidenav(!miniSidenav);
	const handleFixedNavbar = () => setFixedNavbar(!fixedNavbar);
	const handleDarkMode = () => setDarkMode(!darkMode);

	// sidenav type buttons styles
	const sidenavTypeButtonsStyles = ({
		functions: { pxToRem },
		palette: { white, dark, background },
		borders: { borderWidth },
	}) => ({
		height: pxToRem(39),
		background: darkMode ? background.sidenav : white.main,
		color: darkMode ? white.main : dark.main,
		border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

		'&:hover, &:focus, &:focus:not(:hover)': {
			background: darkMode ? background.sidenav : white.main,
			color: darkMode ? white.main : dark.main,
			border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
		},
	});

	// sidenav type active button styles
	const sidenavTypeActiveButtonStyles = ({
		functions: { pxToRem, linearGradient },
		palette: { white, gradients, background },
	}) => ({
		height: pxToRem(39),
		background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
		color: darkMode ? background.sidenav : white.main,

		'&:hover, &:focus, &:focus:not(:hover)': {
			background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
			color: darkMode ? background.sidenav : white.main,
		},
	});

	return (
		<ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
			<MDBox
				display="flex"
				justifyContent="space-between"
				alignItems="baseline"
				pt={4}
				pb={0.5}
				px={3}
			>
				<MDBox>
					<MDTypography variant="h5">Material UI Configurator</MDTypography>
					<MDTypography variant="body2" color="text">
						See our dashboard options.
					</MDTypography>
				</MDBox>

				<Icon
					sx={({ typography: { size }, palette: { dark, white } }) => ({
						fontSize: `${size.lg} !important`,
						color: darkMode ? white.main : dark.main,
						stroke: 'currentColor',
						strokeWidth: '2px',
						cursor: 'pointer',
						transform: 'translateY(5px)',
					})}
					onClick={handleCloseConfigurator}
				>
					close
				</Icon>
			</MDBox>

			<Divider />

			<MDBox pt={0.5} pb={3} px={3}>
				<MDBox>
					<MDTypography variant="h6">Sidenav Colors</MDTypography>

					<MDBox mb={0.5}>
						{sidenavColors.map((color) => (
							<IconButton
								key={color}
								sx={({
									borders: { borderWidth },
									palette: { white, dark, background },
									transitions,
								}) => ({
									width: '24px',
									height: '24px',
									padding: 0,
									border: `${borderWidth[1]} solid ${darkMode ? background.sidenav : white.main}`,
									borderColor: () => {
										let borderColorValue = sidenavColor === color && dark.main;

										if (darkMode && sidenavColor === color) {
											borderColorValue = white.main;
										}

										return borderColorValue;
									},
									transition: transitions.create('border-color', {
										easing: transitions.easing.sharp,
										duration: transitions.duration.shorter,
									}),
									backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
										linearGradient(gradients[color].main, gradients[color].state),

									'&:not(:last-child)': {
										mr: 1,
									},

									'&:hover, &:focus, &:active': {
										borderColor: darkMode ? white.main : dark.main,
									},
								})}
								onClick={() => setSidenavColor(color)}
							/>
						))}
					</MDBox>
				</MDBox>

				<MDBox mt={3} lineHeight={1}>
					<MDTypography variant="h6">Sidenav Type</MDTypography>
					<MDTypography variant="button" color="text">
						Choose between different sidenav types.
					</MDTypography>

					<MDBox
						sx={{
							display: 'flex',
							mt: 2,
							mr: 1,
						}}
					>
						<MDButton
							color="dark"
							variant="gradient"
							onClick={handleDarkSidenav}
							disabled={disabled}
							fullWidth
							sx={
								!transparentSidenav && !whiteSidenav
									? sidenavTypeActiveButtonStyles
									: sidenavTypeButtonsStyles
							}
						>
							Dark
						</MDButton>
						<MDBox sx={{ mx: 1, width: '8rem', minWidth: '8rem' }}>
							<MDButton
								color="dark"
								variant="gradient"
								onClick={handleTransparentSidenav}
								disabled={disabled}
								fullWidth
								sx={
									transparentSidenav && !whiteSidenav
										? sidenavTypeActiveButtonStyles
										: sidenavTypeButtonsStyles
								}
							>
								Transparent
							</MDButton>
						</MDBox>
						<MDButton
							color="dark"
							variant="gradient"
							onClick={handleWhiteSidenav}
							disabled={disabled}
							fullWidth
							sx={
								whiteSidenav && !transparentSidenav
									? sidenavTypeActiveButtonStyles
									: sidenavTypeButtonsStyles
							}
						>
							White
						</MDButton>
					</MDBox>
				</MDBox>
				<MDBox
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mt={3}
					lineHeight={1}
				>
					<MDTypography variant="h6">Navbar Fixed</MDTypography>

					<Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
				</MDBox>
				<Divider />
				<MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
					<MDTypography variant="h6">Sidenav Mini</MDTypography>

					<Switch checked={miniSidenav} onChange={handleMiniSidenav} />
				</MDBox>
				<Divider />
				<MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
					<MDTypography variant="h6">Light / Dark</MDTypography>

					<Switch checked={darkMode} onChange={handleDarkMode} />
				</MDBox>
				<Divider />
				<MDBox mt={3} mb={2}>
					<MDBox mb={2}>
						<MDButton
							component={Link}
							href="https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/"
							target="_blank"
							rel="noreferrer"
							color="info"
							variant="contained"
							fullWidth
						>
							buy now
						</MDButton>
					</MDBox>
					<MDButton
						component={Link}
						href="https://www.creative-tim.com/learning-lab/material-ui-marketplace/quick-start/otis-admin/"
						target="_blank"
						rel="noreferrer"
						color={darkMode ? 'light' : 'dark'}
						variant="outlined"
						fullWidth
					>
						view documentation
					</MDButton>
				</MDBox>
			</MDBox>
		</ConfiguratorRoot>
	);
}

export default Configurator;
