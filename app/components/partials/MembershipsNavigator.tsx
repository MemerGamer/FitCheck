import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MembershipsScreen from '../MembershipsScreen';
import MembershipCardDetailed from './MembershipCardDetailed';

const MembershipsStack = createStackNavigator();

function MembershipsNavigator() {
    return (
        <MembershipsStack.Navigator initialRouteName='MembershipsList'>
            <MembershipsStack.Screen name="MembershipsList" component={MembershipsScreen} options={{ headerShown: false }} />
            <MembershipsStack.Screen name="MembershipCardDetailed" component={MembershipCardDetailed} />
        </MembershipsStack.Navigator>
    );
}

export default MembershipsNavigator;
