module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    '^react(.*)$',
    '^react-native(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
  ],
};
