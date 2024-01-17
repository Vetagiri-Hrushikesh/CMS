// AdminScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const AdminScreen = ({ route, navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data for admin
    fetch('http://192.168.1.141:3000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleUserPress = (userId, username, email) => {
    // Navigate to UserDetailsScreen with user details
    navigation.navigate('UserDetails', { userId, username, email });
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, Admin!</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUserPress(item.user_id, item.username, item.email)}>
            <Card style={styles.card}>
              <Card.Content>
                <Title>{`User ID: ${item.user_id}`}</Title>
                <Paragraph>{`Username: ${item.username}`}</Paragraph>
                <Paragraph>{`Email: ${item.email}`}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
});

export default AdminScreen;
