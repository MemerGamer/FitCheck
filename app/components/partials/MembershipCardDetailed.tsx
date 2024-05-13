import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const MembershipCardDetailed = ({ route }: { route: any }) => {
    const { title, description, availability, accessHours, purchaseDate, image } = route.params;

    return (
        <ScrollView>
            <View className='flex flex-col self-center m-5 w-96 h-fit bg-white rounded-xl shadow-xl'>
                <Text className='text-2xl font-bold self-center'>{title}</Text>
                <Image source={{ uri: image }} className='self-center w-72 h-72 my-5' />
                <View className='mx-5 mt-5 flex flex-row justify-between'>
                    <Text className='self-center font-bold'>Access Hours:</Text>
                    <Text className='self-center'>{accessHours}</Text>
                </View>
                <View className='mx-5 mt-5 flex flex-row justify-between'>
                    <Text className='self-center font-bold'>Availability:</Text>
                    <Text className='self-center'>{availability}</Text>
                </View>
                <View className='mx-5 my-5 flex flex-row justify-between'>
                    <Text className='self-center font-bold'>Purchase Date:</Text>
                    <Text className='self-center'>{purchaseDate}</Text>
                </View>
            </View>
            <View className='w-96 h-fit self-center m-5 bg-white rounded-xl shadow-xl'>
                <Text className='self-center text-xl font-bold'>Description</Text>
                <Text className='self-center my-5 '>{description}</Text>
            </View>
        </ScrollView>
    );
};

export default MembershipCardDetailed;
