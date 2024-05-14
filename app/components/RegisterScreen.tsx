import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import baseUrl from '../contexts/apiContext';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        // Perform registration logic here
        console.log(`Email: ${email}, Username: ${username}, Password: ${password}, Confirm Password: ${confirmPassword}`);

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // create http request to url
        const resp = await fetch(baseUrl + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        })

        if (resp.status === 200) {
            navigation.navigate('Login');
        }
        else {
            alert('Something went wrong, make sure you entered valid data!');
        }
    };

    return (
        <View className={`flex-1 justify-center items-center`}>
            <Text className={`text-2xl font-bold mb-4`}>Register</Text>
            <View className={`w-3/4`}>
                <Text className={`text-lg mb-2`}>Email:</Text>
                <TextInput
                    className={`border border-gray-300 rounded p-2 mb-4`}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Text className={`text-lg mb-2`}>Username:</Text>
                <TextInput
                    className={`border border-gray-300 rounded p-2 mb-4`}
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <Text className={`text-lg mb-2`}>Password:</Text>
                <TextInput
                    className={`border border-gray-300 rounded p-2 mb-4`}
                    placeholder="Enter your password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Text className={`text-lg mb-2`}>Confirm Password:</Text>
                <TextInput
                    className={`border border-gray-300 rounded p-2 mb-4`}
                    placeholder="Confirm your password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <Button title="Register" onPress={handleRegister} />
            </View>
            <Text className={`mt-4`}>Already have an account? <Text className='text-blue-500 underline' onPress={() => navigation.navigate("Login")}>Login</Text></Text>
        </View>
    );
};

export default RegisterScreen;