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

// Otis Admin PRO React Base Styles
import colors from "@/assets/theme/base/colors";
import borders from "@/assets/theme/base/borders";
import boxShadows from "@/assets/theme/base/boxShadows";

// Otis Admin PRO React Helper Function
import rgba from "@/assets/theme/functions/rgba";

const { black, white } = colors;
const { borderWidth, borderRadius } = borders;
const { md } = boxShadows;

export default {
  styleOverrides: {
    root: {
      display: "flex",
      flexDirection: "column" as const,
      position: "relative" as const,
      minWidth: 0,
      wordWrap: "break-word"  as const,
      backgroundColor: white.main,
      backgroundClip: "border-box"  as const,
      border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
      borderRadius: borderRadius.xl,
      boxShadow: md,
      overflow: "visible"  as const,
    },
  },
};
