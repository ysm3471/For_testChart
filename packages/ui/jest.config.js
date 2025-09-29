/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', 
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // ts, tsx 파일 변환
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }, 
  transformIgnorePatterns: [
    "node_modules/(?!@turbotest/ui/)"
  ]
}

