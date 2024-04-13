import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitIdInterstitialAd = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstitialAd, {
    keywords: ['fashion', 'clothing'],
});
const initialData = [];
const PAGE_SIZE = 10; // Number of items to fetch per page

const ListingScreen = ({ navigation }) => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [isEndReached, setIsEndReached] = useState(false);
    const [loadedPage, setloadedPage] = useState([]);

    useEffect(() => {
        interstitial.load();
        interstitial.addAdEventListener(AdEventType.LOADED, () => {
            // interstitial.show();
        });

        fetchFollowers(); // Fetch initial data
    }, []);

    const fetchFollowers = () => {
        if (!loadedPage.includes(page)) {
            setloadedPage(prevloadedPage => [...prevloadedPage, page]);
            if (isEndReached) return; // Prevent fetching data if end is reached
            setLoading(true);
            axios.get(`https://shopperlity.online/shopperlity/api/insta_10k_follow?page=${page}`)
                .then(response => {
                    const newData = response.data.data;
                    setFollowers(prevData => [...prevData, ...newData]); // Append new data to existing data
                    setLoading(false);
                    // console.log('page', page);
                    setIsEndReached(response.data.last_page === page); // Check if last page is reached
                    setPage(response.data.current_page + 1); // Increment page number
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        }
    };

    const renderItem = ({ item, index }) => {
        if ((index + 1) % 3 === 0 && index !== 0) {
            // Render ad banner after every 3rd item (excluding the first item)
            return (
                <View>
                    <View style={styles.item}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.username}>{item.username}</Text>
                        <Text style={styles.extraInfo}>{item.added} Followers Added - Done</Text>
                    </View>
                    <View style={styles.ad_item}>
                        <BannerAd
                            unitId={adUnitId}
                            size={BannerAdSize.LARGE_BANNER}
                        />
                    </View>
                </View>
            );
        } else {
            // Render regular item
            return (
                <View style={styles.item}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.extraInfo}>{item.added} Followers Added - Done</Text>
                </View>
            );
        }
    };

    const renderFooter = () => {
        if (loading) {
            return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
        } else {
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={followers}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id.toString() + index} // Ensure each key is unique
                contentContainerStyle={styles.list}
                onEndReached={fetchFollowers}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
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
    },
    list: {
        paddingVertical: 10,
    },
    item: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5
    },
    ad_item: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    username: {
        fontStyle: 'italic',
        marginBottom: 5,
    },
    extraInfo: {
        color: 'gray',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    button: {
        width: '45%', // Adjusted width to accommodate both buttons
    },
    loader: {
        marginVertical: 20,
    },
});

export default ListingScreen;
