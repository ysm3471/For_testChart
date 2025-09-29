const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './', // Next.js app 경로
})

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // tsconfig.json의 paths와 맞춰주기
  }, 
}

module.exports = createJestConfig(customJestConfig)
