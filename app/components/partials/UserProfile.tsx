import { View, Image, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";

const UserProfile = ({ route, navigation }: { route: any; navigation: any }) => {
    const { id, username, email, createdAt, userType, lastCheckedIn, profilePicture } = route.params;

    const userMemberships = [
        {
            title: 'Membership 1',
            content: 'This is the first membership',
            availability: '9/10',
            accessHours: '20:00 - 2:00',
            purchaseDate: '2021-01-01'
        },
        {
            title: 'Membership 2',
            content: 'This is the second membership',
            availability: '8/10',
            accessHours: '20:00 - 2:00',
            purchaseDate: '2021-01-01'
        },
        {
            title: 'Membership 3',
            content: 'This is the third membership',
            availability: '7/10',
            accessHours: '20:00 - 2:00',
            purchaseDate: '2021-01-01'
        },
        {
            title: 'Membership 4',
            content: 'This is the fourth membership',
            availability: '6/10',
            accessHours: '20:00 - 2:00',
            purchaseDate: '2021-01-01'
        },
        {
            title: 'Membership 5',
            content: 'This is the fifth membership',
            availability: '5/10',
            accessHours: '20:00 - 2:00',
            purchaseDate: '2021-01-01'
        },
        {
            title: 'Membership 6',
            content: 'This is the fifth membership',
            availability: '10/10',
            accessHours: '20:00 - 2:00',
            purchaseDate: '2021-01-01'
        },
    ];

    return (
        <ScrollView>
            <View className='flex flex-col self-center items-center mt-5 bg-white w-96 h-fit rounded-lg '>
                <View className='flex flex-row justify-center mt-3 w-72'>
                    <Text className=' text-2xl'>{username}</Text>
                </View>
                <Image source={{ uri: profilePicture }} className='rounded-lg mt-5' width={200} height={200} />
                <View className='flex flex-row justify-between items-center mt-5 w-72'>
                    <Text className='text-xl font-bold'>ID: </Text>
                    <Text className='text-xl'>{id}</Text>
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
                <View className='flex flex-row justify-between items-center my-5 w-72'>
                    <Text className='text-xl font-bold'>Last Checked In: </Text>
                    <Text className='text-xl'>{lastCheckedIn}</Text>
                </View>
            </View>
            <View className="flex flex-col self-center items-center mt-5 bg-white w-96 h-fit rounded-lg ">
                <Text className='text-2xl font-bold mt-5 self-center'>Memberships</Text>
                {userMemberships.map((membership, index) => (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate('MembershipCardDetailed', membership)}>
                        <View className='flex flex-row justify-between items-center my-5 w-72'>
                            <Text className='text-xl font-bold'>{membership.title}</Text>
                            <Text className='text-xl'>{membership.availability}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <View className="flex flex-col mt-5 h-fit w-96 self-center">
                <Button title="Add New Membership" buttonStyle={{ marginVertical: 5}} onPress={() => navigation.navigate('AddNewMembership')} />
                <Button title="Edit Memberships" buttonStyle={{ marginBottom: 5}} onPress={() => navigation.navigate('EditMemberships')} />
                <Button title="Delete User" buttonStyle={{ marginBottom: 5}} onPress={() => navigation.navigate('DeleteUser')} />
            </View>
        </ScrollView>
    );
};

export default UserProfile;