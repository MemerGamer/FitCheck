import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import baseUrl from '../contexts/apiContext';



const LoginScreen = ({ setIsAuthenticated, setUserId, navigation }: { setIsAuthenticated: any, setUserId: any, navigation: any }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log(`Email: ${email}, Password: ${password}`);

        // create http request to url
        const resp = await fetch(baseUrl + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (resp.status === 200) {
            const respJson = await resp.json();
            setUserId(respJson.user_id);
            setIsAuthenticated(true);
        }
        else {
            alert('Something went wrong, make sure your email and password are correct');
        }
    };

    return (
        <View className={`flex-1 justify-center items-center`}>
            <Text className={`text-2xl font-bold mb-4`}>Login</Text>
            <TextInput
                className={`w-64 h-10 border border-gray-300 rounded px-2 mb-2`}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                className={`w-64 h-10 border border-gray-300 rounded px-2 mb-4`}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />

            {/* <Text className={`mt-4 text-blue-500 underline`} onPress={() => { console.log("Uh, oh, password forgor.") }}>Forgot your password?</Text> */}
            <Text className={`mt-4`}>Don't have an account? <Text className='text-blue-500 underline' onPress={() => navigation.navigate("Register")}>Register</Text></Text>
        </View>
    );
};

export default LoginScreen;