import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const AddNewMembershipScreen = () => {
    const [membershipName, setMembershipName] = useState('');
    const [accessHours, setAccessHours] = useState('');
    const [expiration, setExpiration] = useState('');
    const [maxEntry, setMaxEntry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const currentEntry = 0;
    
    const validateMaxEntry = (maxEntry: any) => {
        return /^\d+$/.test(maxEntry);
    };
    
    const validatePrice = (price: any) => {
        return /^\d+(\.\d{1,2})?$/.test(price);
    };    

    const handleAddMembership = () => {
        if (!membershipName || !accessHours || !maxEntry || !price) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (!validateMaxEntry(maxEntry)) {
            Alert.alert('Error', 'Invalid Maximum Entry Number. Please use a number');
            return;
        }

        if (!validatePrice(price)) {
            Alert.alert('Error', 'Invalid Price. Please use a number');
            return;
        }

        const newMembership = {
            membershipName,
            accessHours,
            expiration,
            maxEntry,
            description,
            price,
            currentEntry,
        };

        console.log(newMembership);
    };

    return (
        <ScrollView>
            <View>
                <View className='m-2'>
                    <Text className='underline'>Membership Name:</Text>
                    <TextInput value={membershipName} placeholder='Enter Membership Name' onChangeText={setMembershipName} className='bg-white text-black p-2' />
                </View>
                <View className='m-2'>
                    <Text className='underline'>Access Hours:</Text>
                    <TextInput value={accessHours} placeholder='Enter Access Hours e.g., 09:00 - 17:00' onChangeText={setAccessHours} className='bg-white text-black p-2' />
                </View>
                <View className='m-2'>
                    <Text className='underline'>Maximum Entry Number:</Text>
                    <TextInput value={maxEntry} placeholder='Enter Maximum Entry Number' keyboardType='numeric' onChangeText={setMaxEntry} className='bg-white text-black p-2' />
                </View>
                <View className='m-2'>
                    <Text className='underline'>Description:</Text>
                    <TextInput value={description} placeholder='Enter Description' onChangeText={setDescription} className='bg-white text-black p-2' />
                </View>
                <View className='m-2'>
                    <Text className='underline'>Price:</Text>
                    <TextInput value={price} placeholder='Enter Price e.g., 99.99' keyboardType='numeric' onChangeText={setPrice} className='bg-white text-black p-2' />
                </View>
                <Button title="Add Membership" onPress={handleAddMembership} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default AddNewMembershipScreen;