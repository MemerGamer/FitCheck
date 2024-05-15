import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from "react-native-elements";
import baseUrl from '../../contexts/apiContext';



const MembershipCardDetailed = ({ route, userId, userType }: { route: any, userId: string, userType: string }) => {
    const { id, title, description, availability, accessHours, price, purchaseDate, expirationDate, image } = route.params;

    const deleteMembership = async (membershipId: string) => {
        const resp = await fetch(baseUrl + '/memberships/delete/' + membershipId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'UserId': `${userId}`,
                'Keep-Alive': 'true'
            }
        });
        if (resp.ok) {
            alert('Membership deleted successfully');
        } else {
            alert('Failed to delete membership');
        }
    };

    return (
        <ScrollView>
            <View className='flex flex-col self-center m-5 w-96 h-fit bg-white rounded-xl shadow-xl'>
                <Text className='text-2xl font-bold self-center'>{title}</Text>
                <Image source={{ uri: image.trim() }} className='self-center my-5' width={200} height={200} />
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
                    <Text className='self-center'>{new Date(purchaseDate).toLocaleString()}</Text>
                </View>
                <View className='mx-5 my-5 flex flex-row justify-between'>
                    <Text className='self-center font-bold'>Price:</Text>
                    <Text className='self-center'>${price}</Text>
                </View>
                <View className='mx-5 my-5 flex flex-row justify-between'>
                    <Text className='self-center font-bold'>Expiration Date:</Text>
                    <Text className='self-center'>{new Date(expirationDate).toLocaleString()}</Text>
                </View>
            </View>
            <View className='w-96 h-fit self-center m-5 bg-white rounded-xl shadow-xl'>
                <Text className='self-center text-xl font-bold'>Description</Text>
                <Text className='self-center my-5 '>{description}</Text>
            </View>

            {/* if usertype admin show delete and edit button */}
            <View className='w-96 h-fit self-center m-5 bg-white rounded-xl shadow-xl'>
                {userType?.toLowerCase() === 'admin' && <Button disabled title="Edit Membership" />}
                {userType?.toLowerCase() === 'admin' && <Button title="Delete Membership" buttonStyle={{ backgroundColor: 'red', marginVertical: 5 }} onPress={() => deleteMembership(id)} />}
            </View>

        </ScrollView>
    );
};

export default MembershipCardDetailed;
