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

/**
  The gradientChartLine() function helps you to create a gradient color for the chart line
 */

// Otis Admin PRO React helper functions
import rgba from '@/assets/theme/functions/rgba';

function gradientChartLine(chart: HTMLCanvasElement, color: string, opacity = 0.2) {
	const ctx = chart.getContext('2d')!;
	const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
	const primaryColor = rgba(color, opacity).toString();

	gradientStroke.addColorStop(1, primaryColor);
	gradientStroke.addColorStop(0.2, 'rgba(72, 72, 176, 0.0)');
	gradientStroke.addColorStop(0, 'rgba(203, 12, 159, 0)');

	return gradientStroke;
}

export default gradientChartLine;
