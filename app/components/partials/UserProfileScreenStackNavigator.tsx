import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MembershipCardDetailed from './MembershipCardDetailed';
import AddNewMembershipScreen from '../AddNewMembershipScreen';
import EditMemberships from '../EditMemberships';
import UserProfile from './UserProfile';

const UserProfileStack = createStackNavigator();
const memberships = [
    {
        id: 1,
        name: 'Gold Membership',
        duration: 30,
    },
    {
        id: 2,
        name: 'Silver Membership',
        duration: 15,
    },
];

function UserProfileScreenStackNavigator({ route, navigation }: { route: any; navigation: any }) {

    return (
        <UserProfileStack.Navigator initialRouteName='UserProfile' screenOptions={{ headerShown: false }}>
            <UserProfileStack.Screen name="UserProfile" component={UserProfile} />
            <UserProfileStack.Screen name='MembershipCardDetailed' component={MembershipCardDetailed} />
            <UserProfileStack.Screen name='AddNewMembership' component={AddNewMembershipScreen} />
            <UserProfileStack.Screen name="EditMemberships">
                {props => <EditMemberships {...props} memberships={memberships} />}
            </UserProfileStack.Screen>
        </UserProfileStack.Navigator>
    );
}

export default UserProfileScreenStackNavigator;
