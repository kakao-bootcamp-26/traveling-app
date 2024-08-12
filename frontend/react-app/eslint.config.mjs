import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";
// import eslintPluginReactHooks from "eslint-plugin-react-hooks";
// import eslintPluginReact from "eslint-plugin-react";
// import { fixupPluginRules } from "@eslint/compat";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
  recommendedConfig: js.configs.recommended, // optional unless you're using "eslint:recommended"
  allConfig: js.configs.all, // optional unless you're using "eslint:all"
  // plugins: {
  //   react: eslintPluginReact,
  //   "react-hooks": fixupPluginRules(eslintPluginReactHooks),
  // },
});

export default [
  ...compat.config({
    root: true,
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "@typescript-eslint/eslint-plugin"],

    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx", "**/*.jsx", "**/*.js"],
        rules: {
          "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
          "no-unused-vars": "off",
          "@typescript-eslint/no-unused-vars": "warn",
          "react-hooks/exhaustive-deps": "off",
          "@typescript-eslint/no-explicit-any": "off",
        },
      },
    ],
  }),
  ...compat.env({
    es2020: true,
    node: true,
  }),
];
