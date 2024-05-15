import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import UserCard from './partials/UserCard';
import baseUrl from '../contexts/apiContext';

const UsersScreen = ({ navigation, userId }: { navigation: any, userId: string }) => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const fetchUsers = async () => {
        console.log(userId);
        const response = await fetch(baseUrl + '/user/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'UserId': `${userId}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setUsers(data);
            setFilteredUsers(data);
        } else {
            console.log('Unauthorized');
            alert('Unauthorized');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchUsers();
            setRefreshing(false);
        }, 1000);
    }, []);

    const handleCardPress = async (userId: string) => {
        try {
            const resp = await fetch(baseUrl + '/user/' + userId);
            const json = await resp.json();
            console.log(JSON.stringify(json));

            navigation.navigate('UserProfileScreenStackNavigator', {
                screen: 'UserProfile',
                params: { ...json }
            });
        } catch (error) {
            console.error('Error fetching specific user data:', error);
        }
    };

    const updateSearch = (search: string): void => {
        setSearchQuery(search);
        setFilteredUsers(users.filter((user: any) => user.username.toLowerCase().includes(search.toLowerCase())));
    };

    return (
        <View className='flex-1'>
            <SearchBar
                placeholder="Search Users..."
                onChangeText={(text: any) => {
                    return updateSearch(text);
                }}
                value={searchQuery}
                containerStyle={{ marginBottom: 20 }}
                inputContainerStyle={{ backgroundColor: 'white' }}
            />
            <SafeAreaView>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                    {filteredUsers.map((user: any, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleCardPress(user.id)}>
                            <UserCard key={index} username={user.username} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default UsersScreen;