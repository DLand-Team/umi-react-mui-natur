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

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// Otis Admin PRO React example components
import DashboardLayout from '@/components/LayoutContainers/DashboardLayout';
import DashboardNavbar from '@/components/Navbars/DashboardNavbar';
import Footer from '@/components/Footer';
import DefaultLineChart from '@/components/Charts/LineCharts/DefaultLineChart';
import GradientLineChart from '@/components/Charts/LineCharts/GradientLineChart';
import VerticalBarChart from '@/components/Charts/BarCharts/VerticalBarChart';
import HorizontalBarChart from '@/components/Charts/BarCharts/HorizontalBarChart';
import MixedChart from '@/components/Charts/MixedChart';
import BubbleChart from '@/components/Charts/BubbleChart';
import DefaultDoughnutChart from '@/components/Charts/DoughnutCharts/DefaultDoughnutChart';
import PieChart from '@/components/Charts/PieChart';
import RadarChart from '@/components/Charts/RadarChart';
import PolarChart from '@/components/Charts/PolarChart';

// Data
import defaultLineChartData from 'layouts/pages/charts/data/defaultLineChartData';
import gradientLineChartData from 'layouts/pages/charts/data/gradientLineChartData';
import verticalBarChartData from 'layouts/pages/charts/data/verticalBarChartData';
import horizontalBarChartData from 'layouts/pages/charts/data/horizontalBarChartData';
import mixedChartData from 'layouts/pages/charts/data/mixedChartData';
import bubbleChartData from 'layouts/pages/charts/data/bubbleChartData';
import defaultDoughnutChartData from 'layouts/pages/charts/data/defaultDoughnutChartData';
import pieChartData from 'layouts/pages/charts/data/pieChartData';
import radarChartData from 'layouts/pages/charts/data/radarChartData';
import polarChartData from 'layouts/pages/charts/data/polarChartData';

function Charts() {
	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox my={3}>
				<MDBox mb={3}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6} sx={{ lineHeight: 0 }}>
							<MDTypography variant="h5">Charts</MDTypography>
							<MDTypography variant="button" color="text">
								Charts on this page use Chart.js - Simple yet flexible JavaScript charting for
								designers & developers.
							</MDTypography>
						</Grid>
					</Grid>
				</MDBox>
				<MDBox mb={6}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<DefaultLineChart
								icon={{ component: 'insights' }}
								title="Line chart"
								description="Product insights"
								chart={defaultLineChartData}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<GradientLineChart
								icon={{ component: 'show_chart' }}
								title="Line chart with gradient"
								description="Visits from devices"
								chart={gradientLineChartData}
							/>
						</Grid>
					</Grid>
				</MDBox>
				<MDBox mb={6}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<VerticalBarChart
								icon={{ color: 'dark', component: 'leaderboard' }}
								title="Bar chart"
								description="Sales related to age average"
								chart={verticalBarChartData}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<HorizontalBarChart
								icon={{ color: 'dark', component: 'splitscreen' }}
								title="Bar chart horizontal"
								description="Sales related to age average"
								chart={horizontalBarChartData}
							/>
						</Grid>
					</Grid>
				</MDBox>
				<MDBox mb={6}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<MixedChart
								icon={{ color: 'primary', component: 'auto_graph' }}
								title="Mixed chart"
								description="Analytics Insights"
								height="19.75rem"
								chart={mixedChartData}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<BubbleChart
								icon={{ color: 'primary', component: 'multiline_chart' }}
								title="Bubble chart"
								description="Users divided by regions"
								chart={bubbleChartData}
							/>
						</Grid>
					</Grid>
				</MDBox>
				<MDBox mb={6}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<DefaultDoughnutChart
								icon={{ color: 'success', component: 'donut_small' }}
								title="Doughnut chart"
								description="Affiliates program"
								chart={defaultDoughnutChartData}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<PieChart
								icon={{ color: 'success', component: 'donut_small' }}
								title="Pie chart"
								description="Analytics Insights"
								chart={pieChartData}
							/>
						</Grid>
					</Grid>
				</MDBox>
				<MDBox mb={3}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<RadarChart
								icon={{ color: 'warning', component: 'data_saver_on' }}
								title="Radar chart"
								description="Sciences score"
								chart={radarChartData}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<PolarChart
								icon={{ color: 'warning', component: 'scatter_plot' }}
								title="Polar chart"
								description="Analytics Insights"
								chart={polarChartData}
							/>
						</Grid>
					</Grid>
				</MDBox>
			</MDBox>
			<Footer />
		</DashboardLayout>
	);
}

export default Charts;
