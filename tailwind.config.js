import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                'montserrat-light': ['montserrat-light', 'sans-serif'],
                'montserrat-medium': ['montserrat-medium', 'sans-serif'],
                'montserrat-regular': ['montserrat-regular', 'sans-serif'],
                'montserrat-bold': ['montserrat-bold', 'sans-serif'],
            },
            colors: {
                main_green_light: '#9FCB98', 
                main_green_dark: '#346739', 
                main_green_primary: '#79AE6F', 
                danger_light: '#C7424F', 
                warning_light: '#F4C95D',
                main_lightly: '#FCFEEC',
                sucess_light: '#87E747' 
            },
        },
    },

    plugins: [forms],
};