import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UsersScreen from '../UsersScreen';
import UserProfile from './UserProfile';
import UserProfileScreenStackNavigator from './UserProfileScreenStackNavigator';

const UsersStack = createStackNavigator();

function UsersNavigator({ userId, userType }: { userId: string, userType: string }) {
    return (
        <UsersStack.Navigator initialRouteName='UsersList'>
            <UsersStack.Screen name="UsersList" options={{ headerShown: false }} >
                {props => <UsersScreen {...props} userId={userId} />}
            </UsersStack.Screen>
            <UsersStack.Screen name="UserProfileScreenStackNavigator" >
                {props => <UserProfileScreenStackNavigator {...props} userId={userId} userType={userType} />}
            </UsersStack.Screen>
        </UsersStack.Navigator>
    );
}

export default UsersNavigator;
