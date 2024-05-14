import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Button } from "react-native-elements";

interface Membership {
    id: number;
    name: string;
    duration: number;
}

const EditMemberships = ({memberships}: {memberships: any}) => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');

    const handleAddMembership = () => {
        if (name && duration) {
            const newMembership: Membership = {
                id: memberships.length + 1,
                name,
                duration: parseInt(duration),
            };

            memberships.push(newMembership);
            setName('');
            setDuration('');
        }
    };

    return (
        <View style={styles.container}>
            {memberships.map((membership: any) => (
                <View key={membership.id} className='bg-white my-5 rounded-lg'>
                    <Text className='m-3'>{membership.name}</Text>
                    <Text className='m-3'>Duration: {membership.duration} days</Text>
                    <Button title='Delete' buttonStyle={{width: 96, alignSelf: 'flex-end', marginRight: 10, marginBottom: 10, backgroundColor: 'red'}} onPress={() => console.log('Delete', membership.id)}/>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    membership: {
        marginBottom: 8,        
    },
});

export default EditMemberships;