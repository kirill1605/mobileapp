import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username.trim() && password.trim()) {
            navigation.replace('MainTabs');
        } else {
            Alert.alert('Ошибка', 'Введите имя пользователя и пароль');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вход в аккаунт</Text>
            <TextInput
                style={styles.input}
                placeholder="Введите логин"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#FFFFFF"
            />
            <TextInput
                style={styles.input}
                placeholder="Введите пароль"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#FFFFFF"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#303030'
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        fontSize: 18,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 15,
        color: '#FFFFFF',
    },
    button: {
        marginTop: '20',
        width: '100%',
        backgroundColor: '#0B9C62',
        padding: 13,
        borderRadius: 5,
        alignItems: 'center',
        height: 50,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
