import { tanstackConfig } from '@tanstack/eslint-config';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...tanstackConfig,
  reactHooks.configs.flat.recommended,
  {
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    },
  },
]);
