import { router } from 'expo-router';
import { BellIcon, SearchIcon } from 'lucide-react-native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { useAuth } from '@/common/hooks';
import { AppIcon } from '@/components/ui/app-icon';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';

export function Header() {
  const { user } = useAuth();

  return (
    <Box className="h-[70] flex-row items-center justify-between bg-white px-[16] py-[10] shadow-2xl">
      <AppIcon />
      <Box className="flex-row items-center gap-[16]">
        <SearchIcon color="black" />
        {!user ? (
          <Button
            className="w-[77] rounded-[4]"
            onPress={() => router.push('/login')}
          >
            <ButtonText>Login</ButtonText>
          </Button>
        ) : (
          <>
            <BellIcon color="black" />
            <TouchableWithoutFeedback onPress={() => router.push('/user-menu')}>
              <Avatar size="md">
                <AvatarFallbackText>{`${user.firstName} ${user.lastName}`}</AvatarFallbackText>
              </Avatar>
            </TouchableWithoutFeedback>
          </>
        )}
      </Box>
    </Box>
  );
}
