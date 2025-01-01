import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

type UserPageSearchParams = {
  id: string;
};

export default function UserPage() {
  const { id } = useLocalSearchParams<UserPageSearchParams>();

  return (
    <View>
      <Text>Hello, user {id}</Text>
    </View>
  );
}
