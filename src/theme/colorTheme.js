import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const colorTheme = createTheme({
    palette: {
        primary: {
            main: '#0f1214'
        },
        secondary: {
            main: '#3f3e4e'
        },
        error: {
            main: red.A400
        },
        custom: {
            main: '#9000e3',
            contrastText: '#ffffff'
        }
    }
})