module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/semi": "off",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "curly": "off",
    "no-continue": "off",
    "@typescript-eslint/brace-style": "off"
  }
}