describe('LoginScreen Functional', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('отображает экран входа', async () => {
        await expect(element(by.text('Вход в аккаунт'))).toBeVisible();
    });

    it('позволяет ввести логин и пароль', async () => {
        await element(by.placeholderText('Введите логин')).typeText('testuser');
        await element(by.placeholderText('Введите пароль')).typeText('testpassword');

        await expect(element(by.placeholderText('Введите логин'))).toHaveText('testuser');
        await expect(element(by.placeholderText('Введите пароль'))).toHaveText('testpassword');
    });

    it('переходит на главный экран при успешном входе', async () => {
        await element(by.placeholderText('Введите логин')).typeText('testuser');
        await element(by.placeholderText('Введите пароль')).typeText('testpassword');
        await element(by.text('Войти')).tap();

        // Проверка, что произошел переход на главный экран
        await expect(element(by.text('Главный экран'))).toBeVisible();
    });

    it('показывает ошибку, если логин или пароль не введены', async () => {
        await element(by.text('Войти')).tap();

        // Проверка, что Alert отображается
        await expect(element(by.text('Ошибка'))).toBeVisible();
        await expect(element(by.text('Введите имя пользователя и пароль'))).toBeVisible();
    });
});