import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

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
          "bg-main_lightly",
          "bg-main_lightily",
          "text-main_lightly",
          "text-main_lightily",
          "text-succes_light",
          "text-warning_light",
          "text-danger_light",
          "border-main_lightly",
          "border-main_lightily",
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
               colors: {
                    main_green_light: "#C5D5E4",
                    main_green_dark: "#14080E",
                    main_green_primary: "#49475B",
                    danger_light: "#C7424F",
                    warning_light: "#e39f32",
                    main_lightly: "#F1FFFA",
                    main_lightily_alt: "#F1FFFA",
                    succes_light: "#87E747",
               },
          },
     },

     plugins: [forms],
};
