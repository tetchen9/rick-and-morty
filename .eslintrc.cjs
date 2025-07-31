module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-next'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'semi': ['error', 'never'],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'indent': ['error', 2],
    'eol-last': ['error', 'always'],
  },
}
