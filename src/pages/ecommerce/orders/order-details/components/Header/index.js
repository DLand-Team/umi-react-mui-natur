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

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDButton from '@/components/MDButton';

function Header() {
	return (
		<MDBox display="flex" justifyContent="space-between" alignItems="center">
			<MDBox>
				<MDBox mb={1}>
					<MDTypography variant="h6" fontWeight="medium">
						Order Details
					</MDTypography>
				</MDBox>
				<MDTypography component="p" variant="button" color="text">
					Order no. <b>241342</b> from
					<b>23.02.2021</b>
				</MDTypography>
				<MDTypography component="p" variant="button" fontWeight="regular" color="text">
					Code: <b>KF332</b>
				</MDTypography>
			</MDBox>
			<MDButton variant="gradient" color="dark">
				invoice
			</MDButton>
		</MDBox>
	);
}

export default Header;
