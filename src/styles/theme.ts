import { extendTheme } from '@chakra-ui/react';

const customTheme = {
    styles: {
        global: {
            body: {
                font: ['Montserrat', 'sans-serif'],
                fontSize: '14px',
            }
        }
    },
    colors: {
        green: '#3DED97',
        blue: '#00ADEF',
        dark: '#252943',
        light_gray: '#EFEFF4',
        gray: '#808080',
        dark_gray: '#707070',
        green_logo: '#EBF7F3',
        app_background: '#FAFAFA',
        cool_blue: '#4299FF'
    },
};

const theme = extendTheme(customTheme);

export default theme;