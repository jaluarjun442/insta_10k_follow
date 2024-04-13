import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {useNavigate } from 'react-router-dom';
const SecondScreen = () => {
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handlePress = () => {

    // setShouldNavigate(true);
  };

  // Sample data array
  const data = [
    { id: '1', username: 'User1' },
    { id: '2', username: 'User2' },
    { id: '3', username: 'User3' },
    { id: '4', username: 'User4' },
    { id: '5', username: 'User5' },
    { id: '6', username: 'User6' },
    { id: '7', username: 'User7' },
    { id: '8', username: 'User8' },
    { id: '9', username: 'User9' },
    { id: '10', username: 'User10' },
    { id: '11', username: 'User11' },
    { id: '12', username: 'User12' },
    { id: '13', username: 'User13' },
    { id: '14', username: 'User14' },
    { id: '15', username: 'User15' },
  ];

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.username}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {!shouldNavigate ? (
        <>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Go Back to Home</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Redirected to Home Screen</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 16, // Add padding to ensure items start from the edge
  },
  itemContainer: {
    width: '100%',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  itemText: {
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SecondScreen;
