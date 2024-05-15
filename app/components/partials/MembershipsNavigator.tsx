import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MembershipsScreen from '../MembershipsScreen';
import MembershipCardDetailed from './MembershipCardDetailed';

const MembershipsStack = createStackNavigator();

function MembershipsNavigator({ userId, userType }: { userId: string, userType: string }) {
    return (
        <MembershipsStack.Navigator initialRouteName='MembershipsList'>
            <MembershipsStack.Screen name="MembershipsList" options={{ headerShown: false }} >
                {props => <MembershipsScreen {...props} userId={userId} />}
            </MembershipsStack.Screen>
            <MembershipsStack.Screen name="MembershipCardDetailed">
            {props => <MembershipCardDetailed {...props} userId={userId} userType={userType} />}
            </MembershipsStack.Screen>
        </MembershipsStack.Navigator>
    );
}

export default MembershipsNavigator;
