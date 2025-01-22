describe('CartScreen Functional', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('должен отображать пустую корзину', async () => {
        await expect(element(by.text('Корзина пуста'))).toBeVisible();
    });

    it('должен добавлять товар в корзину и отображать его', async () => {
        await element(by.id('addToCartButton1')).tap();
        await expect(element(by.text('Product 1'))).toBeVisible();
    });

    it('должен удалять товар из корзины', async () => {
        await element(by.id('addToCartButton1')).tap();
        await expect(element(by.text('Product 1'))).toBeVisible();
        await element(by.id('removeFromCartButton1')).tap();
        await expect(element(by.text('Корзина пуста'))).toBeVisible();
    });
});