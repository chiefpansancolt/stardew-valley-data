import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@/types$': '<rootDir>/src/types/index.ts',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/common/(.*)$': '<rootDir>/src/common/$1',
    '^@/modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@/data/(.*)$': '<rootDir>/data/$1',
  },
};

export default config;
