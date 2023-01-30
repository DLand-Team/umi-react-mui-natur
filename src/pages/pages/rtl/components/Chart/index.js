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

import { useRef, useEffect, useState, useMemo } from 'react';

// porp-types is a library for typechecking of props
import PropTypes from 'prop-types';

// react-chartjs-2 components
import { Line } from 'react-chartjs-2';

// @mui material components
import Card from '@mui/material/Card';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// Otis Admin PRO React helper functions
import gradientChartLine from '@/assets/theme/functions/gradientChartLine';

// Chart configurations
import configs from 'layouts/pages/widgets/components/Chart/configs';

// Otis Admin PRO React base styles
import colors from '@/assets/theme/base/colors';

function Chart({ title, count, percentage, chart }) {
	const chartRef = useRef(null);
	const [chartData, setChartData] = useState({});
	const { data, options } = chartData;

	useEffect(() => {
		const chartDatasets = chart.datasets.map((dataset) => ({
			...dataset,
			tension: 0.4,
			pointRadius: 0,
			borderWidth: 2,
			borderColor: colors[dataset.color].main,
			fill: true,
			maxBarThickness: 6,
			backgroundColor: gradientChartLine(
				chartRef.current.children[0],
				colors[dataset.color].main,
				0.02,
			),
		}));

		setChartData(configs(chart.labels, chartDatasets));
	}, [chart]);

	return (
		<Card>
			<MDBox p={2} lineHeight={1}>
				<MDTypography variant="button" textTransform="capitalize" fontWeight="medium" color="text">
					{title}
				</MDTypography>
				<MDTypography variant="h5" fontWeight="bold" color="dark">
					{count}&nbsp;
					<MDTypography variant="button" fontWeight="bold" color={percentage.color}>
						{percentage.label}
					</MDTypography>
				</MDTypography>
			</MDBox>
			{useMemo(
				() => (
					<MDBox ref={chartRef} sx={{ height: '5.375rem' }}>
						<Line data={data} options={options} />
					</MDBox>
				),
				[chartData],
			)}
		</Card>
	);
}

// Typechecking props for the Chart
Chart.propTypes = {
	title: PropTypes.string.isRequired,
	count: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
	percentage: PropTypes.shape({
		color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark']),
		label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	}).isRequired,
	chart: PropTypes.instanceOf(Object).isRequired,
};

export default Chart;
