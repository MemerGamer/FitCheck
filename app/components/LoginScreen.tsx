import React, { createContext, useContext, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import RegisterScreen from './RegisterScreen';

const LoginScreen = ({ setIsAuthenticated, navigation }: { setIsAuthenticated: (value: boolean) => void; navigation: any }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log(`Username: ${username}, Password: ${password}`);
        // const isSuccess = true; 
        // if (!isSuccess) {
        setIsAuthenticated(true);
        // }
    };

    return (
        <View className={`flex-1 justify-center items-center`}>
            <Text className={`text-2xl font-bold mb-4`}>Login</Text>
            <TextInput
                className={`w-64 h-10 border border-gray-300 rounded px-2 mb-2`}
                placeholder="Username"
                value={username}
                onChangeText={setUserName}
            />
            <TextInput
                className={`w-64 h-10 border border-gray-300 rounded px-2 mb-4`}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />

            <Text className={`mt-4 text-blue-500 underline`} onPress={() => { console.log("Uh, oh, password forgor.") }}>Forgot your password?</Text>
            <Text className={`mt-4`}>Don't have an account? <Text className='text-blue-500 underline' onPress={() => navigation.navigate("Register")}>Register</Text></Text>
        </View>
    );
};

export default LoginScreen;