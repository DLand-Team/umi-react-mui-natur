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
import MDBadge from '@/components/MDBadge';

function Steps() {
	return (
		<Card>
			<MDBox p={3}>
				<MDTypography variant="body2" color="text">
					خطوات
				</MDTypography>
				<MDBox mt={2} mb={1} lineHeight={0}>
					<MDTypography variant="h3" fontWeight="bold">
						11.4ك
					</MDTypography>
				</MDBox>
				<MDBadge variant="contained" color="success" badgeContent="+4.3%" container />
			</MDBox>
		</Card>
	);
}

export default Steps;
