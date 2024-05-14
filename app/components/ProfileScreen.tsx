import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

interface UserProps {
    uuid: string;
    username: string;
    email: string;
    creationDate: string;
    userType: string;
    photo: string;
}

const ProfileScreen = ({ setIsAuthenticated, setUserId, user }: { setIsAuthenticated: (value: boolean) => void; setUserId: (value: string) => void, user: UserProps }) => {
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserId("");
    }

    const { uuid, username, email, creationDate, userType, photo } = user as UserProps;

    return (
        <ScrollView>
            <View className='flex flex-col justify-start items-center mt-5'>
                <Image source={{ uri: photo }} className='rounded-lg' width={200} height={200} />
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>ID: </Text>
                    {/* show first 5 characters of uuid and last 5 characters */}
                    <Text className='text-xl'>{uuid.substring(0, 5)}...{uuid.substring(uuid.length - 5)}</Text>
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
                    <Text className='text-xl font-bold'>User Type: </Text>
                    <Text className='text-xl'>{userType}</Text>
                </View>
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>Created At: </Text>
                    <Text className='text-xl'>{new Date(creationDate).toLocaleString()}</Text>
                </View>
                <View className='m-5'>
                    <Button title="Logout" onPress={handleLogout} />
                </View>
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;