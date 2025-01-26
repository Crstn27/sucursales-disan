
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { colorTheme } from './colorTheme';


export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ colorTheme }>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      
      { children }
    </ThemeProvider>
  )
}
