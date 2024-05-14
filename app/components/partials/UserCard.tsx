import React from "react";
import { View, Text } from "react-native";

interface UserProps {
    username: string;
}

const UserCard: React.FC<UserProps> = ({ username }) => {
    return (
        <View className="flex flex-col justify-center mt-5 mx-3 bg-white rounded-lg h-12 shadow-lg">
            <Text className="text-2xl mx-3">{username}</Text>
        </View>
    );
};

export default UserCard;