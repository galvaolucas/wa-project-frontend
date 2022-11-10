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
        blue: '#00ADEF',
        dark: '#252943',
        light_gray: '#EFEFF4',
        gray: '#808080',
        dark_gray: '#707070',
        cool_blue: '#4299FF'
    },
};

const theme = extendTheme(customTheme);

export default theme;