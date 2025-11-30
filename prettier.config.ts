import { type Config } from 'prettier';

const config: Config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  endOfLine: 'auto',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['<BUILTIN_MODULES>', '<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]', '^.+\\.css$'],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};

export default config;
