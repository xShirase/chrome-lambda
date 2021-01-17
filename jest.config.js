module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['aws', 'http', '.build', 'types'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 65,
      lines: 70,
      statements: 70,
    },
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  modulePathIgnorePatterns: ['interfaces', 'constants', 'dist', 'fixtures', 'integration_tests'],
  testMatch: ['/**/test/**/(*.)(test|spec).(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
