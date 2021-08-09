import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
        light: '#74D0E7',
        main: '#23AFD1',
        dark: '#1B839D',
        contrastText: '#fff',
    },
    secondary: {
        light: '#ffcf33',
        main: '#ffc400',
        dark: '#b28900',
        contrastText: '#fff'
    },
    // error: {},
    // warning: {},
    // info: {},
    // success: {}
  },
});