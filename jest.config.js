module.exports = {
  testEnvironment: 'node',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [
    "js",
    "jsx",
    "json",
    "node",
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js)x?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'dist/src/**/*.{js,jsx}',
    '!src/**/*.d.ts',
  ],
  moduleNameMapper: {
    "simple-git/promise": "<rootDir>/__mocks__/simple-git/promise.js"
  }
};
