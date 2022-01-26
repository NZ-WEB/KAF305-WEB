import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#718096',
        },
        error: {
            main: red.A400,
        },
        action: {
            main: '#0075FF',
        },
        success: {
            main: '#1A1F37'
        }
    },
});

export default theme;
