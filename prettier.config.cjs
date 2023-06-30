/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  trailingComma: 'es5',
  semi: false,
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
  ],
}

module.exports = config
