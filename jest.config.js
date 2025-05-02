module.exports = {
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Tell Jest to use Babel for these file types
    },
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy', // Mock CSS files so Jest doesn't throw errors
    },
    testEnvironment: 'jsdom', // Jest environment that simulates the browser for React tests
  };
  