import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";

export default defineConfig([
     {
          ignores: ["vendor/**", "node_modules/**", "dist/**", "build/**", "**/*.min.js"],
     },
     js.configs.recommended,
     {
          files: ["**/*.{js,mjs,cjs,jsx}"],
          plugins: {
               react: pluginReact,
          },
          settings: {
               react: {
                    version: "detect",
               },
          },
          languageOptions: {
               globals: {
                    ...globals.browser,
                    route: "readonly",
               },
               parserOptions: {
                    ecmaFeatures: { jsx: true },
               },
          },
          rules: {
               "react/prop-types": "off",
               "react/react-in-jsx-scope": "off",
               "react/jsx-uses-react": "off",
               "no-unused-vars": ["error", { varsIgnorePattern: "^React$" }],
          },
     },
     eslintConfigPrettier,
]);
