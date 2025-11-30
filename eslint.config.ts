import { tanstackConfig } from '@tanstack/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...tanstackConfig,
  {
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    },
  },
]);
