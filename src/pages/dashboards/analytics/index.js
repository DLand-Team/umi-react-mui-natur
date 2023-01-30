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
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// Otis Admin PRO React example components
import DashboardLayout from '@/components/LayoutContainers/DashboardLayout';
import DashboardNavbar from '@/components/Navbars/DashboardNavbar';
import Footer from '@/components/Footer';
import ReportsBarChart from '@/components/Charts/BarCharts/ReportsBarChart';
import ReportsLineChart from '@/components/Charts/LineCharts/ReportsLineChart';
import ComplexStatisticsCard from '@/components/Cards/StatisticsCards/ComplexStatisticsCard';
import BookingCard from '@/components/Cards/BookingCard';

// Anaytics dashboard components
import SalesByCountry from 'layouts/dashboards/analytics/components/SalesByCountry';

// Data
import reportsBarChartData from 'layouts/dashboards/analytics/data/reportsBarChartData';
import reportsLineChartData from 'layouts/dashboards/analytics/data/reportsLineChartData';

// Images
import booking1 from '@/assets/images/products/product-1-min.jpg';
import booking2 from '@/assets/images/products/product-2-min.jpg';
import booking3 from '@/assets/images/products/product-3-min.jpg';

function Analytics() {
	const { sales, tasks } = reportsLineChartData;

	// Action buttons for the BookingCard
	const actionButtons = (
		<>
			<Tooltip title="Refresh" placement="bottom">
				<MDTypography
					variant="body1"
					color="primary"
					lineHeight={1}
					sx={{ cursor: 'pointer', mx: 3 }}
				>
					<Icon color="inherit">refresh</Icon>
				</MDTypography>
			</Tooltip>
			<Tooltip title="Edit" placement="bottom">
				<MDTypography variant="body1" color="info" lineHeight={1} sx={{ cursor: 'pointer', mx: 3 }}>
					<Icon color="inherit">edit</Icon>
				</MDTypography>
			</Tooltip>
		</>
	);

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox py={3}>
				<Grid container>
					<SalesByCountry />
				</Grid>
				<MDBox mt={6}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6} lg={4}>
							<MDBox mb={3}>
								<ReportsBarChart
									color="info"
									title="website views"
									description="Last Campaign Performance"
									date="campaign sent 2 days ago"
									chart={reportsBarChartData}
								/>
							</MDBox>
						</Grid>
						<Grid item xs={12} md={6} lg={4}>
							<MDBox mb={3}>
								<ReportsLineChart
									color="success"
									title="daily sales"
									description={
										<>
											(<strong>+15%</strong>) increase in today sales.
										</>
									}
									date="updated 4 min ago"
									chart={sales}
								/>
							</MDBox>
						</Grid>
						<Grid item xs={12} md={6} lg={4}>
							<MDBox mb={3}>
								<ReportsLineChart
									color="dark"
									title="completed tasks"
									description="Last Campaign Performance"
									date="just updated"
									chart={tasks}
								/>
							</MDBox>
						</Grid>
					</Grid>
				</MDBox>
				<MDBox mt={1.5}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6} lg={3}>
							<MDBox mb={1.5}>
								<ComplexStatisticsCard
									color="dark"
									icon="weekend"
									title="Bookings"
									count={281}
									percentage={{
										color: 'success',
										amount: '+55%',
										label: 'than lask week',
									}}
								/>
							</MDBox>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<MDBox mb={1.5}>
								<ComplexStatisticsCard
									icon="leaderboard"
									title="Today's Users"
									count="2,300"
									percentage={{
										color: 'success',
										amount: '+3%',
										label: 'than last month',
									}}
								/>
							</MDBox>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<MDBox mb={1.5}>
								<ComplexStatisticsCard
									color="success"
									icon="store"
									title="Revenue"
									count="34k"
									percentage={{
										color: 'success',
										amount: '+1%',
										label: 'than yesterday',
									}}
								/>
							</MDBox>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<MDBox mb={1.5}>
								<ComplexStatisticsCard
									color="primary"
									icon="person_add"
									title="Followers"
									count="+91"
									percentage={{
										color: 'success',
										amount: '',
										label: 'Just updated',
									}}
								/>
							</MDBox>
						</Grid>
					</Grid>
				</MDBox>
				<MDBox mt={2}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6} lg={4}>
							<MDBox mt={3}>
								<BookingCard
									image={booking1}
									title="Cozy 5 Stars Apartment"
									description='The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.'
									price="$899/night"
									location="Barcelona, Spain"
									action={actionButtons}
								/>
							</MDBox>
						</Grid>
						<Grid item xs={12} md={6} lg={4}>
							<MDBox mt={3}>
								<BookingCard
									image={booking2}
									title="Office Studio"
									description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
									price="$1.119/night"
									location="London, UK"
									action={actionButtons}
								/>
							</MDBox>
						</Grid>
						<Grid item xs={12} md={6} lg={4}>
							<MDBox mt={3}>
								<BookingCard
									image={booking3}
									title="Beautiful Castle"
									description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.'
									price="$459/night"
									location="Milan, Italy"
									action={actionButtons}
								/>
							</MDBox>
						</Grid>
					</Grid>
				</MDBox>
			</MDBox>
			<Footer />
		</DashboardLayout>
	);
}

export default Analytics;
