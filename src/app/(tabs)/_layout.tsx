import { Tabs } from 'expo-router';
import {
  HomeIcon,
  LayoutGridIcon,
  LibraryBigIcon,
  UserIcon,
} from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="authors"
        options={{
          headerShown: false,
          title: 'Authors',
          tabBarIcon: ({ color, size }) => (
            <UserIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          headerShown: false,
          title: 'Books',
          tabBarIcon: ({ color, size }) => (
            <LibraryBigIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          headerShown: false,
          title: 'Categories',
          tabBarIcon: ({ color, size }) => (
            <LayoutGridIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
