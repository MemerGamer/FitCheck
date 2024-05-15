import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import MembershipCard from './partials/MembershipCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import baseUrl from '../contexts/apiContext';

const MembershipsScreen = ({ navigation, userId }: { navigation: any, userId: string }) => {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(baseUrl + '/user/' + userId + '/memberships');
            const json = await resp.json();
            console.log(json);
            setCardData(json);
        };
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

    return (
        <ScrollView>
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
    );
};

export default MembershipsScreen;