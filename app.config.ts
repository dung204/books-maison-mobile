import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Books Maison',
  slug: 'books-maison',
  version: '1.0.0',
  plugins: ['expo-router'],
  scheme: 'booksmaison',
  platforms: ['android', 'ios'],
  githubUrl: 'https://github.com/dung204/books-maison-mobile',
  orientation: 'portrait',
  icon: './src/assets/images/books-maison-mobile-logo-1024x1024.png',
});
