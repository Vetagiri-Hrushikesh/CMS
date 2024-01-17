// UserScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserScreen = ({ route }) => {
  const userId = route.params.userId;

  return (
    <View style={styles.container}>
      <Text>Welcome, User {userId}!</Text>
      {/* Add more user-related content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserScreen;
