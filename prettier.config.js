module.exports = {
  semi: true,
  useTabs: true,
  quoteProps: "consistent",
  printWidth: 120,
  singleQuote: true,
  arrowParens: "always",
  trailingComma: "all",
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: 'tailwind.config.js',
};
