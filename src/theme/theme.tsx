import { createTheme } from '@mui/material/styles';
import appColors from './colors';

declare module '@mui/material/styles' {
  interface Theme {
    couleurs: typeof appColors;
  }
  interface ThemeOptions {
    couleurs?: typeof appColors;
  }
}

const theme = createTheme({
  couleurs: appColors,
});

export default theme;
