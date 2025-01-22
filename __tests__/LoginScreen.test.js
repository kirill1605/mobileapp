import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';
import { Alert } from 'react-native';

// Мок функции navigation.replace
const mockNavigation = {
    replace: jest.fn(),
};

describe('LoginScreen', () => {
    it('отображает заголовок "Вход в аккаунт"', () => {
        const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
        expect(getByText('Вход в аккаунт')).toBeTruthy();
    });

    it('отображает поля для ввода логина и пароля', () => {
        const { getByPlaceholderText } = render(<LoginScreen navigation={mockNavigation} />);
        expect(getByPlaceholderText('Введите логин')).toBeTruthy();
        expect(getByPlaceholderText('Введите пароль')).toBeTruthy();
    });

    it('обновляет состояние username и password при вводе текста', () => {
        const { getByPlaceholderText } = render(<LoginScreen navigation={mockNavigation} />);
        const usernameInput = getByPlaceholderText('Введите логин');
        const passwordInput = getByPlaceholderText('Введите пароль');

        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'testpassword');

        expect(usernameInput.props.value).toBe('testuser');
        expect(passwordInput.props.value).toBe('testpassword');
    });

    it('вызывает navigation.replace при успешном вводе логина и пароля', () => {
        const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);
        const usernameInput = getByPlaceholderText('Введите логин');
        const passwordInput = getByPlaceholderText('Введите пароль');
        const loginButton = getByText('Войти');

        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'testpassword');
        fireEvent.press(loginButton);

        expect(mockNavigation.replace).toHaveBeenCalledWith('MainTabs');
    });

    it('показывает Alert, если логин или пароль не введены', () => {
        jest.spyOn(Alert, 'alert');

        const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
        const loginButton = getByText('Войти');

        fireEvent.press(loginButton);

        expect(Alert.alert).toHaveBeenCalledWith('Ошибка', 'Введите имя пользователя и пароль');
    });
});