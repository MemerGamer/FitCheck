import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../ProfileScreen';
import MembershipsNavigator from './MembershipsNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';
import UsersScreen from '../UsersScreen';
import ScannerScreen from '../ScannerScreen';
import UsersNavigator from './UsersNavigator';
import { MembershipProvider } from '../../contexts/MembershipContext';

const Tab = createBottomTabNavigator();

function HomeTabs({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void; }) {
    const [userType, setUserType] = useState('admin'); // member, admin

    const userData = {
        id: 1,
        username: 'john_doe',
        email: 'john_doe@gmail.com',
        createdAt: '2021-10-01',
        userType: 'admin',
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
                    } else if (route.name === 'Users') {
                        iconName = focused
                            ? 'people'
                            : 'people-outline';
                    } else if (route.name === 'Scanner') {
                        iconName = focused
                            ? 'scan'
                            : 'scan-outline';
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
                <Tab.Group>
                    <Tab.Screen name="Users" component={UsersNavigator} />
                    <Tab.Screen name="Scanner" component={ScannerScreen} />
                    <Tab.Screen name='Profile'>
                        {props => <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} user={userData} />}
                    </Tab.Screen>
                </Tab.Group>

            ) : (
                <Tab.Group>
                    <MembershipProvider>
                        <Tab.Screen name="Memberships" component={MembershipsNavigator} />
                    </MembershipProvider>
                    <Tab.Screen name="Profile">
                        {props => <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} user={userData} />}
                    </Tab.Screen>
                </Tab.Group>
            )}
        </Tab.Navigator>
    );
}

export default HomeTabs;
