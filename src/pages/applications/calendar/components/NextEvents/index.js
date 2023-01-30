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

// Otis Admin PRO React example components
import DefaultItem from '@/components/Items/DefaultItem';

function NextEvents() {
	return (
		<Card sx={{ height: '100%' }}>
			<MDBox pt={2} px={2}>
				<MDTypography variant="h6" fontWeight="medium">
					Next events
				</MDTypography>
			</MDBox>
			<MDBox p={2}>
				<DefaultItem
					color="dark"
					icon="paid"
					title="Cyber Week"
					description="27 March 2020, at 12:30 PM"
				/>
				<MDBox mt={3.5}>
					<DefaultItem
						color="dark"
						icon="notifications"
						title="Meeting with Marry"
						description="24 March 2020, at 10:00 PM"
					/>
				</MDBox>
				<MDBox mt={3.5}>
					<DefaultItem
						color="dark"
						icon="menu_book"
						title="Book Deposit Hall"
						description="25 March 2021, at 9:30 AM"
					/>
				</MDBox>
				<MDBox mt={3.5}>
					<DefaultItem
						color="dark"
						icon="local_shipping"
						title="Shipment Deal UK"
						description="25 March 2021, at 2:00 PM"
					/>
				</MDBox>
				<MDBox mt={3.5}>
					<DefaultItem
						color="dark"
						icon="palette"
						title="Verify Dashboard Color Palette"
						description="26 March 2021, at 9:00 AM"
					/>
				</MDBox>
			</MDBox>
		</Card>
	);
}

export default NextEvents;
