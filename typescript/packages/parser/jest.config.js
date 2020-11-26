module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.{js,jsx,ts}', '!**/node_modules/**', '!**/vendor/**'],
  reporters: [
    ["jest-simple-dot-reporter", {"color": true}]
  ]
};
