module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/*'],
  moduleNameMapper: {
    '\\.(css|scss|sass|module\\.css)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // ts, tsx 파일 변환
  },
  projects: [
    "<rootDir>/packages/ui",
    "<rootDir>/apps/main",
    "<rootDir>/apps/admin"
  ],
};