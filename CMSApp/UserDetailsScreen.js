// UserDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UserDetailsScreen = ({ route, navigation }) => {
  const { userId, username: initialUsername, email: initialEmail, role: initialRole } = route.params;

  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [role, setRole] = useState(initialRole);

  const handleEdit = async () => {
    try {
      // Implement user update logic here
      console.log(`Updating user with ID: ${userId}`);
      const response = await fetch(`http://192.168.1.141:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, role }),
      });

      if (response.ok) {
        console.log('User updated successfully');
        // You can navigate back or perform other actions upon successful update
      } else {
        console.error('Error updating user');
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error scenarios
    }
  };

  const handleDelete = async () => {
    try {
      // Implement user deletion logic here
      console.log(`Deleting user with ID: ${userId}`);
      const response = await fetch(`http://192.168.1.141:3000/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('User deleted successfully');
        // You can navigate back or perform other actions upon successful deletion
      } else {
        console.error('Error deleting user');
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error scenarios
    }
  };

  const handleSendResetPassword = () => {
    // Implement send reset password logic here
    console.log(`Sending reset password link to user with ID: ${userId}`);
    // You can add your send reset password logic here
  };

  return (
    <View style={styles.container}>
      <Text>{`User ID: ${userId}`}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {/** Add role selection input or button as needed */}
      <Picker
        selectedValue={role}
        style={styles.input}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="User" value="user" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>

      <Button title="Edit" onPress={handleEdit} />
      <Button title="Delete" onPress={handleDelete} />
      <Button title="Send Reset Password Link" onPress={handleSendResetPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    padding: 8,
    width: '100%',
  },
});

export default UserDetailsScreen;
