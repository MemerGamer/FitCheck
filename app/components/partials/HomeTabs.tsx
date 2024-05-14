import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../ProfileScreen';
import MembershipsNavigator from './MembershipsNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScannerScreen from '../ScannerScreen';
import UsersNavigator from './UsersNavigator';
import { MembershipProvider } from '../../contexts/MembershipContext';

import baseUrl from '../../contexts/apiContext';

const Tab = createBottomTabNavigator();


function HomeTabs({ setIsAuthenticated, setUserId, userId }: { setIsAuthenticated: (value: boolean) => void; setUserId: (value: string) => void; userId: string }) {
    const [userType, setUserType] = useState('member'); // member, admin
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resp = await fetch(baseUrl + `/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (resp.status === 200) {
                    const respJson = await resp.json();
                    console.log(respJson);
                    setUserData(respJson);
                    setUserType(respJson.userType);
                } else {
                    alert('Something went wrong!');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [userId]);

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
                    <Tab.Screen name="Memberships">
                    {props => <MembershipsNavigator {...props} userId={userId} />}
                        </Tab.Screen>
                    </MembershipProvider>
                    <Tab.Screen name="Profile">
                        {props => <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} user={userData as any} />}
                    </Tab.Screen>
                </Tab.Group>
            )}
        </Tab.Navigator>
    );
}

export default HomeTabs;
