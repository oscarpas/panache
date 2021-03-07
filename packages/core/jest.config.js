module.exports = {
  transformIgnorePatterns: [
    'node_modules/(?!(lodash-es)/)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
  ]
};