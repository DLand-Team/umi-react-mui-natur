import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { defaultTheme } from "./plugins/mui";

export function rootContainer(container: any) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {container}
    </ThemeProvider>
  );
}
