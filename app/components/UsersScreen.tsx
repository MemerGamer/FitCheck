import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import UserCard from './partials/UserCard';

const UsersScreen = ({ navigation }: { navigation: any }) => {
    const users = [
        {
            id: 1,
            username: 'user1',
            email: 'user1',
            createdAt: '2021-01-01',
            userType: 'member',
            lastCheckedIn: '2021-01-01',
            profilePicture: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            username: 'user2',
            email: 'user2',
            createdAt: '2021-01-01',
            userType: 'member',
            lastCheckedIn: '2021-01-01',
            profilePicture: 'https://via.placeholder.com/150'
        },
        {
            id: 3,
            username: 'user3',
            email: 'user3',
            createdAt: '2021-01-01',
            userType: 'member',
            lastCheckedIn: '2021-01-01',
            profilePicture: 'https://via.placeholder.com/150'
        },
        {
            id: 4,
            username: 'user4',
            email: 'user4',
            createdAt: '2021-01-01',
            userType: 'member',
            lastCheckedIn: '2021-01-01',
            profilePicture: 'https://via.placeholder.com/150'
        },
        {
            id: 5,
            username: 'user5',
            email: 'user5',
            createdAt: '2021-01-01',
            userType: 'member',
            lastCheckedIn: '2021-01-01',
            profilePicture: 'https://via.placeholder.com/150'
        },
    ];

    // State to hold the search query
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    const updateSearch = (search: string): void => {
        setSearchQuery(search);
        setFilteredUsers(users.filter(user => user.username.toLowerCase().includes(search.toLowerCase())));
    };

    return (
        <View className='flex-1'>
            <SearchBar
                placeholder="Search Users..."
                onChangeText={(text) => updateSearch(text)}
                value={searchQuery}
                containerStyle={{ marginBottom: 20 }}
                inputContainerStyle={{ backgroundColor: 'white' }}
            />
            <ScrollView>
                {filteredUsers.map((user, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('UserProfileScreenStackNavigator', {
                            screen: 'UserProfile',
                            params: { ...user }
                        })}>
                        <UserCard key={index} username={user.username} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

export default UsersScreen;