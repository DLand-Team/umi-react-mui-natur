import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import Loading from './components/Loading';
import Toast from './components/Toast';
import { defaultTheme } from './plugins/mui';

export function rootContainer(container: any) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Toast />
      <Loading />
      {container}
    </ThemeProvider>
  );
}

