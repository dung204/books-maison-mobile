import { registerRootComponent } from 'expo';

if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true') {
  registerRootComponent(require('.storybook').default);
} else {
  require('expo-router/entry');
}
