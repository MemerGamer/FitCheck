import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MembershipsScreen from '../MembershipsScreen';
import MembershipCardDetailed from './MembershipCardDetailed';

const MembershipsStack = createStackNavigator();

function MembershipsNavigator({ userId }: { userId: string }) {
    return (
        <MembershipsStack.Navigator initialRouteName='MembershipsList'>
            <MembershipsStack.Screen name="MembershipsList" options={{ headerShown: false }} >
                {props => <MembershipsScreen {...props} userId={userId} />}
            </MembershipsStack.Screen>
            <MembershipsStack.Screen name="MembershipCardDetailed" component={MembershipCardDetailed} />
        </MembershipsStack.Navigator>
    );
}

export default MembershipsNavigator;
