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
  palette: {
    primary: {
      main: appColors.primary.main,
      light: appColors.primary.light,
      dark: appColors.primary.dark,
    },
    background: {
      default: appColors.background.default,
    },
    text: {
      primary: appColors.text.primary,
      secondary: appColors.text.secondary,
    },
  },
  couleurs: appColors,
});

export default theme;
