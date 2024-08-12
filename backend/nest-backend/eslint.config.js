// eslint.config.js

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
// import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  js.configs.recommended,
  // {
  //   files: ['*.ts', '*.tsx'],
  //   languageOptions: {
  //     parser: typescriptParser,
  //     parserOptions: {
  //       project: path.resolve(__dirname, './tsconfig.json'), // 프로젝트의 절대 경로로 tsconfig.json을 지정
  //       tsconfigRootDir: __dirname,
  //       sourceType: 'module',
  //     },
  //   },
  //   plugins: {
  //     '@typescript-eslint': typescriptPlugin,
  //   },
  //   rules: {
  //     '@typescript-eslint/explicit-function-return-type': 'error',
  //     '@typescript-eslint/no-unused-vars': [
  //       'error',
  //       { argsIgnorePattern: '^_' },
  //     ],
  //     '@typescript-eslint/no-explicit-any': 'warn',
  //     '@typescript-eslint/no-inferrable-types': 'off',
  //   },
  // },
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends(
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ),
  ...compat.config({
    root: true,
    extends: ['eslint:recommended'],
    ignorePatterns: ['dist', 'eslint.config.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      sourceType: 'module',
      project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    overrides: [
      {
        files: ['*.ts', '*.js'],
        rules: {
          '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_' },
          ],
          '@typescript-eslint/no-explicit-any': 'off',
          '@typescript-eslint/no-inferrable-types': 'off',
          '@typescript-eslint/no-unsafe-argument': 'off',
          '@typescript-eslint/no-floating-promises': 'off',
          'no-undef': 'off',
          'no-unused-vars': 'off',
        },
      },
    ],
  }),
];
