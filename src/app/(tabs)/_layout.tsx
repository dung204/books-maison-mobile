import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ headerTitle: 'Home page', title: 'Home' }}
      />
      <Tabs.Screen
        name="users/[id]"
        options={{ headerTitle: 'User page', title: 'User' }}
      />
    </Tabs>
  );
}
