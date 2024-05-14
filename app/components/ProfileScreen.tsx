import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

interface UserProps {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    userType: string;
    lastCheckedIn: string;
    profilePicture: string;
}

const ProfileScreen = ({ setIsAuthenticated, user }: { setIsAuthenticated: (value: boolean) => void; user: UserProps }) => {
    const handleLogout = () => {
        setIsAuthenticated(false);
    }

    const { id, username, email, createdAt, userType, lastCheckedIn, profilePicture } = user as UserProps;

    return (
        <ScrollView>
            <View className='flex flex-col justify-start items-center mt-5'>
                <Image source={{ uri: profilePicture }} className='rounded-lg' width={200} height={200} />
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>ID: </Text>
                    <Text className='text-xl'>{id}</Text>
                </View>
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>Username: </Text>
                    <Text className='text-xl'>{username}</Text>
                </View>
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>Email: </Text>
                    <Text className='text-xl'>{email}</Text>
                </View>
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>Created At: </Text>
                    <Text className='text-xl'>{createdAt}</Text>
                </View>
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>User Type: </Text>
                    <Text className='text-xl'>{userType}</Text>
                </View>
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>Last Checked In: </Text>
                    <Text className='text-xl'>{lastCheckedIn}</Text>
                </View>
                <View className='m-5'>
                    <Button title="Logout" onPress={handleLogout} />
                </View>
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;