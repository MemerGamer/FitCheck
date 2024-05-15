import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import MembershipCard from './partials/MembershipCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import baseUrl from '../contexts/apiContext';

const MembershipsScreen = ({ navigation, userId }: { navigation: any, userId: string }) => {
    const [cardData, setCardData] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const fetchData = async () => {
        const resp = await fetch(baseUrl + '/user/' + userId + '/memberships');
        const json = await resp.json();
        console.log(json);
        setCardData(json);
    };

    useEffect(() => {    
        fetchData();
    }, [userId]);

    const handleCardPress = async (cardId: string) => {
        try {
            const resp = await fetch(baseUrl + '/user/' + userId + '/memberships/' + cardId);
            const json = await resp.json();
            console.log(JSON.stringify(json));

            navigation.navigate('MembershipCardDetailed', {
                id: json.id,
                title: json.name,
                description: json.description,
                availability: `${json.currentEntries}/${json.maxEntries}`,
                accessHours: json.accessHour,
                price: json.price,
                purchaseDate: json.purchaseDate,
                expirationDate: json.expirationDate,
                image: json.barcode
            });
        } catch (error) {
            console.error('Error fetching specific membership data:', error);
        }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchData();
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <SafeAreaView>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {cardData.map((card: any, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleCardPress(card.id)}
                    >
                        <MembershipCard
                            key={index}
                            title={card.name}
                            accessHours={card.accessHour}
                            availability={card.currentEntries + '/' + card.maxEntries}
                            isExpired={card.isExpired}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default MembershipsScreen;