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
import typography from '@/assets/theme/base/typography';

function configs(labels, datasets) {
	return {
		data: {
			labels,
			datasets: [...datasets],
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				y: {
					grid: {
						drawBorder: false,
						display: true,
						drawOnChartArea: true,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: true,
						padding: 10,
						color: '#b2b9bf',
						font: {
							size: 11,
							family: typography.fontFamily,
							style: 'normal',
							lineHeight: 2,
						},
					},
				},
				x: {
					grid: {
						drawBorder: false,
						display: true,
						drawOnChartArea: true,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: true,
						color: '#b2b9bf',
						padding: 10,
						font: {
							size: 11,
							family: typography.fontFamily,
							style: 'normal',
							lineHeight: 2,
						},
					},
				},
			},
		},
	};
}

export default configs;
