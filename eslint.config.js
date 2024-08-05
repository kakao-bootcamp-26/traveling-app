// {
//   "endOfLine": "auto",
//   "singleQuote": false,
//   "tabWidth": 2,
//   "printWidth": 100,
//   "semi": true,
//   "importOrder": [
//     "^@/utils/(.*)$",
//     "^@/api/(.*)$",
//     "^@/hooks/(.*)$",
//     "^@/pages/(.*)$",
//     "^@/components/(.*)$",
//     "^@/styles/(.*)$",
//     "^[./]"
//   ],
//   "importOrderSeparation": true,
//   "importOrderSortSpecifiers": true
// }
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "import/order": "off",
    "prettier/prettier": "error",
    "no-undef": "error",
    "no-unused-vars": "error",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".js"],
    },
    "import/resolver": {
      typescript: "./tsconfig.json",
    },
    "import/external-module-folders": [".yarn"],
  },
  ignorePatterns: ["dist/", "node_modules/", "build/"],
};
