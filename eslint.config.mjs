import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import pluginPrettier from "eslint-plugin-prettier";
import pluginTypescript from "@typescript-eslint/eslint-plugin";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js, prettier: pluginPrettier },  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"] },
  { files: ["**/*.{ts,tsx}"], plugins: { js, typescript: pluginTypescript, prettier: pluginPrettier },  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"] },
]);
