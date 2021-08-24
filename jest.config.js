module.exports = {
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\js$': 'babel-jest',
  },
}
