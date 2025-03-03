// Learn more https://docs.expo.io/guides/customizing-metro
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('@storybook/react-native/dist/metro/withStorybook').default} */
const withStorybook = require('@storybook/react-native/metro/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);

module.exports = withStorybook(
  withNativeWind(defaultConfig, { input: './src/global.css' }),
  {
    enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
    configPath: path.resolve(__dirname, './.storybook'),
    onDisabledRemoveStorybook: true,
  },
);
