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

/* eslint-disable no-dupe-keys */
// Otis Admin PRO React base styles
import colors from '@/assets/theme/base/colors';

const { gradients, dark } = colors;

function configs(labels, datasets) {
	const backgroundColors = [];

	if (datasets.backgroundColors) {
		datasets.backgroundColors.forEach((color) =>
			gradients[color]
				? backgroundColors.push(gradients[color].state)
				: backgroundColors.push(dark.main),
		);
	} else {
		backgroundColors.push(dark.main);
	}

	return {
		data: {
			labels,
			datasets: [
				{
					label: datasets.label,
					backgroundColor: backgroundColors,
					data: datasets.data,
				},
			],
		},
		options: {
			plugins: {
				legend: {
					display: false,
				},
			},
		},
	};
}

export default configs;
