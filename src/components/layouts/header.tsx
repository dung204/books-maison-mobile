import { SearchIcon } from 'lucide-react-native';

import { AppIcon } from '@/components/ui/app-icon';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';

export function Header() {
  return (
    <Box className="h-[70] flex-row items-center justify-between bg-white px-[16] py-[10] shadow-2xl">
      <AppIcon />
      <Box className="flex-row items-center gap-[16]">
        <SearchIcon color="black" />
        <Button className="w-[77] rounded-[4]">
          <ButtonText>Login</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
