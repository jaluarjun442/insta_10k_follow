import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';

const MyForm = () => {
  const [instagramUsername, setInstagramUsername] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://shopperlity.online/submit_10k', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instagramUsername,
          whatsappNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      // Assuming successful submission
      Alert.alert('Success', 'Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'Failed to submit data. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Instagram Username"
        onChangeText={text => setInstagramUsername(text)}
        value={instagramUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="WhatsApp Number (with country code)"
        onChangeText={text => setWhatsappNumber(text)}
        value={whatsappNumber}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyForm;
