// FILE: jest.config.js
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterSetup: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg|gltf|glb)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(three|@react-three|framer-motion|react-router|react-router-dom)/)',
  ],
  extensionsToTreatAsEsm: [],
};
