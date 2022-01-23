import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#008ad1',
    },
    secondary: {
      main: '#005bd1',
    },
    white: {
      main: '#fff',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
