describe('CatalogScreen Functional', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('отображает индикатор загрузки при запуске', async () => {
        await expect(element(by.id('loader'))).toBeVisible();
    });

    it('отображает список товаров после загрузки', async () => {
        await waitFor(element(by.text('Product 1')))
            .toBeVisible()
            .withTimeout(5000);
        await expect(element(by.text('Product 1'))).toBeVisible();
        await expect(element(by.text('Product 2'))).toBeVisible();
    });

    it('добавляет товар в корзину при нажатии на кнопку', async () => {
        await waitFor(element(by.text('Добавить в корзину')))
            .toBeVisible()
            .withTimeout(5000);
        await element(by.text('Добавить в корзину')).tap();
        // Проверка, что товар добавлен в корзину (например, через состояние или UI)
    });

    it('отображает сообщение "Ничего не найдено", если товаров нет', async () => {
        // Мок пустого списка товаров
        await device.launchApp({ newInstance: true, url: 'mock://empty' });
        await expect(element(by.text('Ничего не найдено'))).toBeVisible();
    });
});