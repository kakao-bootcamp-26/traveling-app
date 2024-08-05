import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
  recommendedConfig: js.configs.recommended, // optional unless you're using "eslint:recommended"
  allConfig: js.configs.all, // optional unless you're using "eslint:all"
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
        },
      },
    ],
  }),
  ...compat.env({
    es2020: true,
    node: true,
  }),
];
