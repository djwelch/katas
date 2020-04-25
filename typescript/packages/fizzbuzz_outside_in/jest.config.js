module.exports = {
  preset: 'ts-jest',
  testMatch: ["**/__tests__/**/?(*.)+(spec|unit).[jt]s?(x)", "**/src/**/?(*.)+(spec|unit).[jt]s?(x)"],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.{js,jsx,ts}', '!**/node_modules/**', '!**/vendor/**']
};
