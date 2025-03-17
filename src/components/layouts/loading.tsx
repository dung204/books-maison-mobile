import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { AppLogo } from '@/components/ui/app-logo';
import { Center } from '@/components/ui/center';

export function Loading() {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSpinner(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Center className="size-full gap-8">
      <AppLogo />
      {showSpinner && <ActivityIndicator size="large" />}
    </Center>
  );
}
