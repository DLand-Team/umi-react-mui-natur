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

// @mui material components
import Card from '@mui/material/Card';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDButton from '@/components/MDButton';

function DeleteAccount() {
	return (
		<Card id="delete-account">
			<MDBox
				pr={3}
				display="flex"
				justifyContent="space-between"
				alignItems={{ xs: 'flex-start', sm: 'center' }}
				flexDirection={{ xs: 'column', sm: 'row' }}
			>
				<MDBox p={3} lineHeight={1}>
					<MDBox mb={1}>
						<MDTypography variant="h5">Delete Account</MDTypography>
					</MDBox>
					<MDTypography variant="button" color="text">
						Once you delete your account, there is no going back. Please be certain.
					</MDTypography>
				</MDBox>
				<MDBox display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
					<MDButton variant="outlined" color="secondary">
						deactivate
					</MDButton>
					<MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
						<MDButton variant="gradient" color="error" sx={{ height: '100%' }}>
							delete account
						</MDButton>
					</MDBox>
				</MDBox>
			</MDBox>
		</Card>
	);
}

export default DeleteAccount;
