import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import baseUrl from '../contexts/apiContext';

const AddNewMembershipScreen = ({ route, userId }: { route: any, userId: string }) => {
    const { uuid } = route.params;

    console.log("uuid", uuid);
    const [membershipTypes, setMembershipTypes] = useState([]);
    const [selectedMembership, setSelectedMembership] = useState(null);

    useEffect(() => {
        const fetchMembershipTypes = async () => {
            const response = await fetch(baseUrl + '/memberships', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'UserId': `${userId}`
                }
            });
            const data = await response.json();

            console.log(data);
            setMembershipTypes(data);
        };

        fetchMembershipTypes();
    }, [userId]);

    const handleAddMembership = async () => {
        if (!selectedMembership) {
            alert('Please select a membership type');
            return;
        }

        const resp = await fetch(baseUrl + '/memberships/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'UserId': `${userId}`
            },
            body: JSON.stringify({ UserId: uuid, MembershipId: selectedMembership })
        });

        if (resp.ok) {
            alert('Membership added successfully');
        } else {
            alert('Failed to add membership');
        }
    };

    const renderMembershipDetails = () => {
        if (selectedMembership) {
            const membership: any = membershipTypes.find((item: any) => item.id === selectedMembership);

            if (membership) {
                return (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsTitle}>{membership.name}</Text>
                        <Text style={styles.detailsText}>Access Hours: {membership.accessHour}</Text>
                        <Text style={styles.detailsText}>Description: {membership.description}</Text>
                        <Text style={styles.detailsText}>Max Entries: {membership.maxEntries}</Text>
                        <Text style={styles.detailsText}>Price: ${membership.price}</Text>
                    </View>
                );
            }
        }

        return null;
    };

    return (
        <ScrollView>
            <View>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={membershipTypes}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder="Select membership type"
                    searchPlaceholder="Search..."
                    value={selectedMembership}
                    onChange={(item: any) => {
                        setSelectedMembership(item.id);
                    }}
                />
                {renderMembershipDetails()}
                <Button title="Add Membership" onPress={handleAddMembership} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    detailsContainer: {
        margin: 16,
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detailsText: {
        fontSize: 16,
        marginBottom: 4,
    },
});

export default AddNewMembershipScreen;