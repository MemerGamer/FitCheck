import React, { useState } from 'react';
import { View, Text } from 'react-native';

interface CardProps {
    key: number;
    title: string;
    accessHours: string;
    availability: string;
}

const MembershipCard: React.FC<CardProps> = ({ title, accessHours, availability }) => {
    function handleBackgroundColor(availability: string) {
        if (!availability) return 'bg-white'; // Default color if undefined
    
        let used, total;
        try {
            [used, total] = availability.split('/').map(Number);
        } catch (e) {
            console.error("Error parsing availability:", e);
            return 'bg-white'; // Default color on error
        }
    
        const usagePercentage = (used / total) * 100;
        if (usagePercentage >= 80 && usagePercentage < 100) {
            return 'bg-red-600';
        } else if (usagePercentage == 100) {
            return 'bg-gray-400';
        }
        else {
            return 'bg-white';
        }
    }
    
    function handleAvailabilityColor(availability: string) {        
        if (!availability) return 'text-black'; // Default color if undefined
    
        let used, total;
        try {
            [used, total] = availability.split('/').map(Number);
        } catch (e) {
            console.error("Error parsing availability:", e);
            return 'text-black'; // Default color on error
        }
    
        const usagePercentage = (used / total) * 100;
        if (usagePercentage == 100) {
            return 'text-red-600';
        }
        else {
            return 'text-black';
        }
    }

    const bgClass = handleBackgroundColor(availability);
    const textClass = handleAvailabilityColor(availability);

    return (
        <View className={`flex flex-col w-min-screen h-32 m-3 p-2 rounded-lg shadow-xl ${bgClass}`}>
            <Text className='text-2xl font-bold'>{title}</Text>
            <Text className='text-lg'>{accessHours}</Text>
            <Text className={`mt-5 self-end text-lg ${textClass}`}>{availability}</Text>
        </View>
    );
};

export default MembershipCard;