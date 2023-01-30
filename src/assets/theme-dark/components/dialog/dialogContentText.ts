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
import typography from "@/assets/theme-dark/base/typography";
import colors from "@/assets/theme-dark/base/colors";

// Otis Admin PRO React helper functions
import rgba from "@/assets/theme-dark/functions/rgba";

const { size } = typography;
const { white } = colors;

export default {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: rgba(white.main, 0.8),
    },
  },
};
