import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  preset: 'ts-jest',
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/config',
    'src/app.js',
    'tests',
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};

export default config;
