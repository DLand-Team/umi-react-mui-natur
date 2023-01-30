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

// Otis Admin PRO React base styles
import colors from '@/assets/theme/base/colors';

const { white } = colors;

function configs(backgroundColor) {
	return {
		data: {
			labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			datasets: [
				{
					label: 'Visitors',
					tension: 0.5,
					pointRadius: 0,
					borderColor: white.main,
					borderWidth: 2,
					backgroundColor,
					data: [50, 45, 60, 60, 80, 65, 90, 80, 100],
					maxBarThickness: 6,
					fill: true,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false,
				},
			},
			interaction: {
				intersect: false,
				mode: 'index',
			},
			scales: {
				y: {
					grid: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
					},
					ticks: {
						display: false,
					},
				},
				x: {
					grid: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
					},
					ticks: {
						display: false,
					},
				},
			},
		},
	};
}

export default configs;
