import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";

export default defineConfig([
   {
      ignores: ["vendor/**", "node_modules/**", "dist/**", "build/**", "**/*.min.js"],
   },
   {
      files: ["**/*.{js,mjs,cjs,jsx}"],
      plugins: { js },
      extends: ["js/recommended"],
      languageOptions: { globals: globals.browser },
   },
   js.configs.recommended,
   pluginReact.configs.flat.recommended,
   eslintConfigPrettier,
]);
