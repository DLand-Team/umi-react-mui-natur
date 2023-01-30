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

import { useState } from 'react';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Switch from '@mui/material/Switch';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDInput from '@/components/MDInput';
import MDButton from '@/components/MDButton';

// Authentication layout components
import IllustrationLayout from 'layouts/authentication/components/IllustrationLayout';

// Image
import bgImage from '@/assets/images/illustrations/illustration-reset.jpg';

function Illustration() {
	const [rememberMe, setRememberMe] = useState(false);

	const handleSetRememberMe = () => setRememberMe(!rememberMe);

	return (
		<IllustrationLayout
			title="Sign In"
			description="Enter your email and password to sign in"
			illustration={bgImage}
		>
			<MDBox component="form" role="form">
				<MDBox mb={2}>
					<MDInput type="email" label="Email" fullWidth />
				</MDBox>
				<MDBox mb={2}>
					<MDInput type="password" label="Password" fullWidth />
				</MDBox>
				<MDBox display="flex" alignItems="center" ml={-1}>
					<Switch checked={rememberMe} onChange={handleSetRememberMe} />
					<MDTypography
						variant="button"
						fontWeight="regular"
						color="text"
						onClick={handleSetRememberMe}
						sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
					>
						&nbsp;&nbsp;Remember me
					</MDTypography>
				</MDBox>
				<MDBox mt={4} mb={1}>
					<MDButton variant="gradient" color="info" size="large" fullWidth>
						sign in
					</MDButton>
				</MDBox>
				<MDBox mt={3} textAlign="center">
					<MDTypography variant="button" color="text">
						Don&apos;t have an account?{' '}
						<MDTypography
							component={Link}
							to="/authentication/sign-up/cover"
							variant="button"
							color="info"
							fontWeight="medium"
							textGradient
						>
							Sign up
						</MDTypography>
					</MDTypography>
				</MDBox>
			</MDBox>
		</IllustrationLayout>
	);
}

export default Illustration;
