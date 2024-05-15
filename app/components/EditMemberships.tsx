import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Button } from "react-native-elements";
import baseUrl from '../contexts/apiContext';


const EditMemberships = ({ route, navigation, userId }: { route: any, navigation: any, userId: string }) => {
    const { uuid } = route.params;
    console.log("uuid", uuid);
    console.log("userId", userId);
    const [memberships, setMemberships] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(baseUrl + '/user/' + uuid + '/memberships');
            const json = await resp.json();
            console.log(json);
            setMemberships(json);
        };
        fetchData();
    }, [uuid]);


    return (
        <View style={styles.container}>
            {memberships.map((membership: any) => (
                <View key={membership.id} className='bg-white my-5 rounded-lg'>
                    <Text className='m-3'>{membership.name}</Text>
                    <Button title='Delete' buttonStyle={{ width: 96, alignSelf: 'flex-end', marginRight: 10, marginBottom: 10, backgroundColor: 'red' }} onPress={() => console.log('Delete', membership.id)} />
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