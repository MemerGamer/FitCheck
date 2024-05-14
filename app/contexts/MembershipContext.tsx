import React, { createContext, useState, useContext, useEffect } from 'react';
import baseUrl from './apiContext';

// Create the context
const MembershipContext = createContext({});

// Provider component
export const MembershipProvider = ({ children, userId}: {children: any, userId:string}) => {
    const [memberships, setMemberships] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMemberships = async () => {
        setIsLoading(true);
        try {
            // Simulate an API call
            const response = await fetch(`${baseUrl}/user/${userId}/memberships`);
            const data = await response.json();
            setMemberships(data);
        } catch (error) {
            console.error("Failed to fetch memberships:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchMemberships();
    }, []);

    return (
        <MembershipContext.Provider value={{ memberships, isLoading }}>
            {children}
        </MembershipContext.Provider>
    );
};

// Hook to use the membership context
export const useMemberships = () => useContext(MembershipContext);
