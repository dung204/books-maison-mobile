import { Stack } from 'expo-router';

import { Header } from '@/components/layouts/header';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack>
        <Stack.Screen name="(tabs)" options={{ header: () => <Header /> }} />
      </Stack>
    </GluestackUIProvider>
  );
}
