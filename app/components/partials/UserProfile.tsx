import { View, Image, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import baseUrl from "../../contexts/apiContext";
const UserProfile = ({ route, navigation, userId }: { route: any; navigation: any, userId: string }) => {
    const { uuid, username, email, creationDate, userType, photo } = route.params;
    const [userMemberships, setUserMemberships] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(baseUrl + '/user/' + uuid + '/memberships');
            const json = await resp.json();
            console.log(json);
            setUserMemberships(json);
        };
        fetchData();
    }, [uuid]);

    const handleCardPress = async (cardId: string) => {
        try {
            const resp = await fetch(baseUrl + '/user/' + uuid + '/memberships/' + cardId);
            const json = await resp.json();

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

    const deleteUser = async (userToDeleteId: string, userId: string) => {
        const resp = await fetch(baseUrl + '/user/delete/' + userToDeleteId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'UserId': `${userId}`,
                'Keep-Alive': 'true'
            }
        });
        if (resp.ok) {
            alert('User deleted successfully');
        } else {
            alert('Failed to delete user');
        }
    };


    return (
        <ScrollView>
            <View className='flex flex-col self-center items-center mt-5 bg-white w-96 h-fit rounded-lg '>
                <View className='flex flex-row justify-center mt-3 w-72'>
                    <Text className=' text-2xl'>{username}</Text>
                </View>
                <Image source={{ uri: photo }} className='rounded-lg mt-5' width={200} height={200} />
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>ID: </Text>
                    <Text className='text-xl'>{uuid.substring(0, 5)}...{uuid.substring(uuid.length - 5)}</Text>
                </View>
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>Email: </Text>
                    <Text className='text-xl'>{email}</Text>
                </View>
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>Created At: </Text>
                    <Text className='text-xl'>{new Date(creationDate).toLocaleString()}</Text>
                </View>
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>User Type: </Text>
                    <Text className='text-xl'>{userType}</Text>
                </View>
            </View>
            <View className="flex flex-col self-center items-center mt-5 bg-white w-96 h-fit rounded-lg ">
                <Text className='text-2xl font-bold mt-5 self-center'>Memberships</Text>
                {userMemberships.map((membership: any, index) => (
                    <TouchableOpacity key={index} onPress={() => handleCardPress(membership.id)}>
                        <View className='flex flex-row justify-between items-center my-5 w-72'>
                            <Text className='text-xl font-bold'>{membership.name}</Text>
                            <Text className='text-xl'>{membership.currentEntries}/{membership.maxEntries}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <View className="flex flex-col mt-5 h-fit w-96 self-center">
                <Button title="Add New Membership" buttonStyle={{ marginVertical: 5 }} onPress={() => navigation.navigate('AddNewMembership', { uuid: uuid })} />
                <Button title="Delete User" buttonStyle={{ marginBottom: 5, backgroundColor: 'red' }} onPress={() => deleteUser(uuid, userId)} />
            </View>
        </ScrollView>
    );
};

export default UserProfile;