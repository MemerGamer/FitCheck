import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen: React.FC = () => {
    const [userType, setUserType] = useState('member'); // member, admin

    return (
        <View>
            {userType === 'admin' ? (
                <View >
                    <Text >Welcome to the Home Screen!</Text>
                </View>
            ) : (
                <View >
                    <Text >Welcome to the Home Screen!</Text>
                    <Button title="Logout" onPress={() => setUserType('admin')} />
                </View>
            )}
        </View>
    );
};

export default HomeScreen;