import { Slot, router, usePathname } from 'expo-router';
import { ArrowLeftIcon } from 'lucide-react-native';
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { Keyboard, TouchableHighlight } from 'react-native';

import { AppLogo } from '@/components/ui/app-logo';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

type AuthNavigationContextValue = {
  backCount: number;
  setBackCount: Dispatch<SetStateAction<number>>;
};

export const AuthNavigationContext = createContext<AuthNavigationContextValue>({
  backCount: 1,
  setBackCount: () => {},
});

export default function AuthLayout() {
  const [backCount, setBackCount] = useState(1);
  const [gap, setGap] = useState(32);
  const pathname = usePathname();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setGap(16);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setGap(32);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <AuthNavigationContext.Provider value={{ backCount, setBackCount }}>
      <Box className="flex-1 flex-col bg-white">
        <Box className="basis-[60] flex-row items-center px-[14]">
          <TouchableHighlight
            underlayColor="#DDDDDD"
            onPress={() =>
              Array.from({ length: backCount }).forEach(() => router.back())
            }
            className="rounded-full p-[6]"
          >
            <ArrowLeftIcon color="black" size={24} />
          </TouchableHighlight>
        </Box>
        <Box className="flex-1 flex-col items-center justify-around px-[16]">
          <Box className="flex-col items-center" style={{ gap }}>
            <AppLogo className="scale-75" />
            <Text className="text-3xl font-extralight">
              {pathname === '/login'
                ? 'Login to Books Maison'
                : 'Create an account'}
            </Text>
          </Box>
          <Slot />
          <Text className="text-center text-sm">
            Your continued use of this application means you agree to our terms
            of use
          </Text>
        </Box>
      </Box>
    </AuthNavigationContext.Provider>
  );
}
