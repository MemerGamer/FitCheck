import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminScreen from '../AdminScreen';
import ProfileScreen from '../ProfileScreen';
import MembershipsNavigator from './MembershipsNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function HomeTabs({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void; }) {
    const [userType, setUserType] = useState('member'); // member, admin

    const userData = {
        id: 1,
        username: 'john_doe',
        email: 'john_doe@gmail.com',
        createdAt: '2021-10-01',
        userType: 'member',
        lastCheckedIn: '2021-10-01',
        profilePicture: 'https://via.placeholder.com/150'
    }


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string | undefined;

                    if (route.name === 'Memberships') {
                        iconName = focused
                            ? 'ticket'
                            : 'ticket-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused
                            ? 'person-circle'
                            : 'person-circle-outline';
                    }
                    else {
                        iconName = 'add'; // Provide a default value here
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
            {userType === 'admin' ? (
                <Tab.Screen name="Admin" component={AdminScreen} />

            ) : (
                <Tab.Group>
                    <Tab.Screen name="Memberships" component={MembershipsNavigator} />
                    <Tab.Screen name="Profile">
                        {props => <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} user={userData} />}
                    </Tab.Screen>
                </Tab.Group>
            )}
        </Tab.Navigator>
    );
}

export default HomeTabs;
