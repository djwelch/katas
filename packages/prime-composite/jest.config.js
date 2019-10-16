const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  transform: {
    ...tsjPreset.transform
  },
  testMatch: ["**/__tests__/**/?(*.)+(spec|unit).[jt]s?(x)", "**/src/**/?(*.)+(spec|unit).[jt]s?(x)"],
  coverageReporters: ["lcov", "text-summary"],
  collectCoverage: true,
  collectCoverageFrom: ["**/src/**/*.[jt]s?(x)"]
};
