import { router } from 'expo-router';
import { LogOutIcon, XIcon } from 'lucide-react-native';
import { Alert, TouchableHighlight } from 'react-native';

import { useAuth } from '@/common/hooks';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export default function UserMenuScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () =>
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
        isPreferred: true,
      },
      {
        text: 'OK',
        onPress: async () => {
          await logout();
          router.back();
        },
      },
    ]);

  return (
    <Box className="flex-1 flex-col bg-white">
      <Box className="basis-[60] flex-row items-center px-[14]">
        <TouchableHighlight
          underlayColor="#DDDDDD"
          className="rounded-full p-[6]"
          onPress={() => router.back()}
        >
          <XIcon color="black" size={24} />
        </TouchableHighlight>
      </Box>
      <Box className="flex-1 flex-col items-center gap-[20] px-[32]">
        <Avatar size="2xl">
          <AvatarFallbackText size="xl">{`${user?.firstName} ${user?.lastName}`}</AvatarFallbackText>
        </Avatar>
        <Box className="flex-col items-center gap-[10] py-[7]">
          <Heading size="2xl">
            {user?.firstName} {user?.lastName}
          </Heading>
          <Text size="lg">{user?.email}</Text>
        </Box>
        <Box className="w-full">
          <Button
            size="xl"
            action="negative"
            className="rounded-t-2xl"
            onPress={handleLogout}
          >
            <LogOutIcon color="white" />
            <ButtonText>Logout</ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
