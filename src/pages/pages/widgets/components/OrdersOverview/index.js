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
import Icon from '@mui/material/Icon';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// Otis Admin PRO React example components
import TimelineItem from '@/components/Timeline/TimelineItem';

function OrdersOverview() {
	return (
		<Card sx={{ height: '100%' }}>
			<MDBox pt={3} px={3}>
				<MDTypography variant="h6" fontWeight="medium">
					Orders overview
				</MDTypography>
				<MDBox mt={0} mb={2}>
					<MDTypography variant="button" color="text" fontWeight="regular">
						<MDTypography display="inline" variant="body2" verticalAlign="middle">
							<Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
						</MDTypography>
						&nbsp;
						<MDTypography variant="button" color="text" fontWeight="medium">
							24%
						</MDTypography>{' '}
						this month
					</MDTypography>
				</MDBox>
			</MDBox>
			<MDBox p={2}>
				<TimelineItem
					color="success"
					icon="notifications"
					title="$2400, Design changes"
					dateTime="22 DEC 7:20 PM"
				/>
				<TimelineItem
					color="error"
					icon="inventory_2"
					title="New order #1832412"
					dateTime="21 DEC 11 PM"
				/>
				<TimelineItem
					color="info"
					icon="shopping_cart"
					title="Server payments for April"
					dateTime="21 DEC 9:34 PM"
				/>
				<TimelineItem
					color="warning"
					icon="payment"
					title="New card added for order #4395133"
					dateTime="20 DEC 2:20 AM"
				/>
				<TimelineItem
					color="primary"
					icon="vpn_key"
					title="New card added for order #4395133"
					dateTime="18 DEC 4:54 AM"
					lastItem
				/>
			</MDBox>
		</Card>
	);
}

export default OrdersOverview;
