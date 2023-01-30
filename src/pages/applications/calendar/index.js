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
import { useMemo } from 'react';

// @mui material components
import Grid from '@mui/material/Grid';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';

// Otis Admin PRO React example components
import DashboardLayout from '@/components/LayoutContainers/DashboardLayout';
import DashboardNavbar from '@/components/Navbars/DashboardNavbar';
import Footer from '@/components/Footer';
import EventCalendar from '@/components/Calendar';

// Calendar application components
import Header from 'layouts/applications/calendar/components/Header';
import NextEvents from 'layouts/applications/calendar/components/NextEvents';
import ProductivityChart from 'layouts/applications/calendar/components/ProductivityChart';

// Data
import calendarEventsData from 'layouts/applications/calendar/data/calendarEventsData';

function Calendar() {
	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox pt={3}>
				<MDBox display="flex" justifyContent="flex-end" mt={1} mb={4} mx={2}>
					<Header />
				</MDBox>
				<Grid container spacing={3}>
					<Grid item xs={12} xl={9} sx={{ height: 'max-content' }}>
						{useMemo(
							() => (
								<EventCalendar
									initialView="dayGridMonth"
									initialDate="2021-08-10"
									events={calendarEventsData}
									selectable
									editable
								/>
							),
							[calendarEventsData],
						)}
					</Grid>
					<Grid item xs={12} xl={3}>
						<MDBox mb={3}>
							<NextEvents />
						</MDBox>
						<MDBox mb={3}>
							<ProductivityChart />
						</MDBox>
					</Grid>
				</Grid>
			</MDBox>
			<Footer />
		</DashboardLayout>
	);
}

export default Calendar;
