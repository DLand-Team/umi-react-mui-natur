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
  The rgba() function helps you to create a rgba color code, it uses the hexToRgb() function
  to convert the hex code into rgb for using it inside the rgba color format.
 */

// Otis Admin PRO React helper functions
import hexToRgb from '@/assets/theme/functions/hexToRgb';

function rgba(color: string | number, opacity: number | string) {
	return `rgba(${hexToRgb(color)}, ${opacity})`;
}

export default rgba;
