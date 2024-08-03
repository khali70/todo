module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|expo-.*|@expo-.*|@unimodules/.*|unimodules|sentry-expo|native-base))',
  ],
  moduleNameMapper: {
    '^@/(.*)$': './src/*',
  },
};