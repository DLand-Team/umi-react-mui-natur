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

// Otis Admin PRO React example components
import TimelineItem from '@/components/Timeline/TimelineItem';

function OrdersOverview() {
	return (
		<>
			<MDTypography variant="h6" fontWeight="medium">
				Track order
			</MDTypography>
			<MDBox mt={2}>
				<TimelineItem
					color="secondary"
					icon="notifications"
					title="Order received"
					dateTime="22 DEC 7:20 PM"
				/>
				<TimelineItem
					color="secondary"
					icon="inventory_2"
					title="Generate order id #1832412"
					dateTime="22 DEC 7:21 AM"
				/>
				<TimelineItem
					color="secondary"
					icon="shopping_cart"
					title="Order transmited to courier"
					dateTime="22 DEC 8:10 AM"
				/>
				<TimelineItem
					color="success"
					icon="done"
					title="Order delivered"
					dateTime="22 DEC 4:54 PM"
					lastItem
				/>
			</MDBox>
		</>
	);
}

export default OrdersOverview;
