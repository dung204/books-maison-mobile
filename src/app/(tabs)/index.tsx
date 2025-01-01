import { StyleSheet, Text, View } from 'react-native';

import { envVariables } from '@/common/utils';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text>API_ENDPOINT: {envVariables.API_ENDPOINT}</Text>
      <Text>JWT_ACCESS_SECRET: {envVariables.JWT_ACCESS_SECRET}</Text>
      <Text>JWT_REFRESH_SECRET: {envVariables.JWT_REFRESH_SECRET}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
