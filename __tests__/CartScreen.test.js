import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartScreen from './CartScreen';
import { CartContext } from '../../context/CartContext';

const mockCartItems = [
    { id: 1, productName: 'Product 1', price: 100 },
    { id: 2, productName: 'Product 2', price: 200 },
];

const mockRemoveFromCart = jest.fn();

const renderWithContext = (cartItems = []) => {
    return render(
        <CartContext.Provider value={{ cartItems, removeFromCart: mockRemoveFromCart }}>
            <CartScreen />
        </CartContext.Provider>
    );
};

describe('CartScreen', () => {
    it('отображает сообщение о пустой корзине, если корзина пуста', () => {
        const { getByText } = renderWithContext();
        expect(getByText('Корзина пуста')).toBeTruthy();
    });

    it('отображает список товаров в корзине', () => {
        const { getByText } = renderWithContext(mockCartItems);
        expect(getByText('Product 1')).toBeTruthy();
        expect(getByText('Product 2')).toBeTruthy();
    });

    it('вызывает функцию removeFromCart при нажатии на кнопку удаления', () => {
        const { getAllByText } = renderWithContext(mockCartItems);
        const removeButtons = getAllByText('Удалить');
        fireEvent.press(removeButtons[0]);
        expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
    });
});