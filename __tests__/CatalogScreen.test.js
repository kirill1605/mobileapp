import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import CatalogScreen from './CatalogScreen';
import { CartContext } from '../../context/CartContext';

// Мок данных для тестов
const mockProducts = [
    {
        id: 1,
        productName: 'Product 1',
        description: 'Description 1',
        price: 100,
    },
    {
        id: 2,
        productName: 'Product 2',
        description: 'Description 2',
        price: 200,
    },
];

// Мок функции addToCart
const mockAddToCart = jest.fn();

// Мок контекста корзины
const mockCartContext = {
    addToCart: mockAddToCart,
};

// Мок изображений
jest.mock('../../assets/images/product-image1.webp', () => 'mock-image-1');
jest.mock('../../assets/images/product-image2.webp', () => 'mock-image-2');

// Мок данных из API
jest.mock('../../api/data.json', () => mockProducts);

describe('CatalogScreen', () => {
    it('отображает индикатор загрузки, пока данные загружаются', () => {
        const { getByTestId } = render(<CatalogScreen />);
        expect(getByTestId('loader')).toBeTruthy();
    });

    it('отображает список товаров после загрузки данных', async () => {
        const { findByText } = render(<CatalogScreen />);
        const product1 = await findByText('Product 1');
        const product2 = await findByText('Product 2');
        expect(product1).toBeTruthy();
        expect(product2).toBeTruthy();
    });

    it('отображает сообщение "Ничего не найдено", если список товаров пуст', async () => {
        // Мок пустого списка товаров
        jest.mock('../../api/data.json', () => []);

        const { findByText } = render(<CatalogScreen />);
        const noResultsText = await findByText('Ничего не найдено');
        expect(noResultsText).toBeTruthy();
    });

    it('вызывает функцию addToCart при нажатии на кнопку "Добавить в корзину"', async () => {
        const { findByText } = render(
            <CartContext.Provider value={mockCartContext}>
                <CatalogScreen />
            </CartContext.Provider>
        );

        const addButton = await findByText('Добавить в корзину');
        fireEvent.press(addButton);

        expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0]);
    });
});