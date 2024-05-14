import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UsersScreen from '../UsersScreen';
import UserProfile from './UserProfile';
import UserProfileScreenStackNavigator from './UserProfileScreenStackNavigator';

const UsersStack = createStackNavigator();

function UsersNavigator() {
    return (
        <UsersStack.Navigator initialRouteName='UsersList'>
            <UsersStack.Screen name="UsersList" component={UsersScreen} options={{ headerShown: false }} />
            <UsersStack.Screen name="UserProfileScreenStackNavigator" component={UserProfileScreenStackNavigator} />
        </UsersStack.Navigator>
    );
}

export default UsersNavigator;
