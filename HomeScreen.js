import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { InterstitialAd } from 'react-native-google-mobile-ads';

const adUnitIdInterstitialAd = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstitialAd, {
  keywords: ['fashion', 'clothing'],
});
const interstitial2 = InterstitialAd.createForAdRequest(adUnitIdInterstitialAd, {
  keywords: ['fashion', 'clothing'],
});
const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    interstitial.load();
    interstitial2.load();
  }, []);

  const handleSubmit = () => {
    if (!name || !username || !whatsapp) {
      // Validate inputs
      alert('Please fill in all fields');
      return;
    }

    setLoading(true); // Set loading state to true

    axios.post('https://shopperlity.online/shopperlity/api/insta_10k_follow/save', {
      name,
      username,
      whatsapp
    }).then(response => {
      // Handle success, display success message and clear form
      // console.log(response.data);
      alert('Account submitted successfully!');
      setName('');
      setUsername('');
      setWhatsapp('');
    }).catch(error => {
      // Handle error, maybe show an error message
      console.error(error);
      alert('An error occurred while submitting the form.');
    }).finally(() => {
      setLoading(false); // Set loading state to false
    });
  };

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.LARGE_BANNER}
      />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={text => setName(text)}
          required // Make input required
        />
        <TextInput
          style={styles.input}
          placeholder="Instagram Username"
          value={username}
          onChangeText={text => setUsername(text)}
          required // Make input required
        />
        <TextInput
          style={styles.input}
          placeholder="WhatsApp Number with country code"
          value={whatsapp}
          onChangeText={text => setWhatsapp(text)}
          keyboardType="numeric" // Set keyboard type to numeric
          required // Make input required
        />
        <Button title="Get 10k Follower"
          disabled={loading} // Disable the button while loading
          onPress={handleSubmit} />
      </View>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.LARGE_BANNER}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </View>
        <View style={styles.button}>
          <Button title="Profile Listing" onPress={() => navigation.navigate('Listing')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 5,
    elevation: 4, // for Android shadow
    shadowColor: '#000000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.2, // for iOS shadow
    shadowRadius: 4, // for iOS shadow
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  button: {
    width: '45%', // Adjusted width to accommodate both buttons
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default HomeScreen;
