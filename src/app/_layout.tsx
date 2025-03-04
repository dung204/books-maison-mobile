import { useReactQueryDevTools } from '@dev-plugins/react-query';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';
import * as Network from 'expo-network';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { AppState } from 'react-native';

import { Header } from '@/components/layouts/header';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  useEffect(() => {
    onlineManager.setEventListener(setOnline => {
      const eventSubscription = Network.addNetworkStateListener(state => {
        setOnline(!!state.isConnected);
      });
      return eventSubscription.remove;
    });

    const subscription = AppState.addEventListener('change', status =>
      focusManager.setFocused(status === 'active'),
    );

    return () => subscription.remove();
  }, []);

  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ header: () => <Header /> }} />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
              animation: 'fade_from_bottom',
            }}
          />
        </Stack>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
