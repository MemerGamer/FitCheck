import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import MembershipCard from './partials/MembershipCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMemberships } from '../contexts/MembershipContext';

const MembershipsScreen = ({ navigation }: { navigation: any }) => {
    const cardData = [
        {
            id: 1,
            title: 'Membership 1',
            content: 'This is the first membership',
            availability: '9/10',
            accessHours: '20:00 - 2:00',
            purchaseDate: '2021-01-01'
        },
        {
            id: 2,
            title: 'Membership 2',
            content: 'This is the second membership',
            availability: '8/10',
            accessHours: '20:00 - 2:00',
            purchaseDate: '2021-01-01'
        },
        {
            id: 3,
            title: 'Membership 3',
            content: 'This is the third membership',
            availability: '7/10',
            accessHours: '20:00 - 2:00',
            purchaseDate: '2021-01-01'
        },
        {
            id: 4,
            title: 'Membership 4',
            content: 'This is the fourth membership',
            availability: '6/10',
            accessHours: '20:00 - 2:00',
            purchaseDate: '2021-01-01'
        },
        {
            id: 5,
            title: 'Membership 5',
            content: 'This is the fifth membership',
            availability: '5/10',
            accessHours: '20:00 - 2:00',
            purchaseDate: '2021-01-01'
        },
        {
            id: 6,
            title: 'Membership 6',
            content: 'This is the fifth membership',
            availability: '10/10',
            accessHours: '20:00 - 2:00',
            purchaseDate: '2021-01-01'
        },
    ];

    return (
        <ScrollView>
            {cardData.map((card, index) => (
                <TouchableOpacity
                    key={card.id}
                    onPress={() => navigation.navigate('MembershipCardDetailed', card)}>
                    <MembershipCard key={card.id} title={card.title} accessHours={card.accessHours} availability={card.availability}/>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

export default MembershipsScreen;