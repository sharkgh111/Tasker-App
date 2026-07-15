import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
     content: [
          "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
          "./storage/framework/views/*.php",
          "./resources/views/**/*.blade.php",
          "./resources/js/**/*.{js,jsx}",
          "./resources/Config/**/*.js",
     ],
     safelist: [
          "bg-main_green_light",
          "bg-succes_light",
          "bg-warning_light",
          "bg-orange-500",
          "bg-danger_light",
          "text-main_lightly",
          "text-succes_light",
          "text-warning_light",
          "text-danger_light",
          "border-main_lightly",
          "border-succes_light",
          "border-warning_light",
          "border-danger_light",
     ],
     theme: {
          extend: {
               fontFamily: {
                    "montserrat-light": ["montserrat-light", "sans-serif"],
                    "montserrat-medium": ["montserrat-medium", "sans-serif"],
                    "montserrat-regular": ["montserrat-regular", "sans-serif"],
                    "montserrat-bold": ["montserrat-bold", "sans-serif"],
               },
               backgroundImage: {
                    "tasker-radial": "radial-gradient(179.1% 154.97% at -22.55% 2.9%, #343667 0%, #888FB3 42.79%, var(--main_green_light, #8B97E2) 63.46%, #343667 100%);",
               },
               colors: {
                    main_green_light: "#8B97E2",
                    main_green_dark: "#343667",
                    main_green_primary: "#6F83AE",
                    danger_light: "#C7424F",
                    warning_light: "#e39f32",
                    main_lightly: "#E5EFFF",
                    succes_light: "#87E747",
               },
          },
     },

     plugins: [forms],
};
