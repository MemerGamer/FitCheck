import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MembershipCardDetailed from './MembershipCardDetailed';
import AddNewMembershipScreen from '../AddNewMembershipScreen';
import UserProfile from './UserProfile';

const UserProfileStack = createStackNavigator();


function UserProfileScreenStackNavigator({ route, navigation, userId, userType }: { route: any; navigation: any, userId: string, userType: string }) {


    return (
        <UserProfileStack.Navigator initialRouteName='UserProfile' screenOptions={{ headerShown: false }}>
            <UserProfileStack.Screen name="UserProfile">
                {props => <UserProfile {...props} userId={userId} />}
            </UserProfileStack.Screen>
            <UserProfileStack.Screen name='MembershipCardDetailed'>
                {props => <MembershipCardDetailed {...props} userId={userId} userType={userType} />}
            </UserProfileStack.Screen>
            <UserProfileStack.Screen name='AddNewMembership'>
                {props => <AddNewMembershipScreen {...props} userId={userId} />}
            </UserProfileStack.Screen>
        </UserProfileStack.Navigator>
    );
}

export default UserProfileScreenStackNavigator;
