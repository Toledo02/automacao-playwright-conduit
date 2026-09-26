import { test } from '../../fixtures/page-object';
import { loginInvalido, loginValido } from '../../test-data/login.json';

test.beforeEach(async ({ pages }) => {
    await pages.homePage.navigate();
    await pages.homePage.clickSignIn();
});

test.describe('Autenticacao', () => {
    test('CT001 - Login com credenciais validas', async ({ pages }) => {
        await pages.loginPage.fillEmail(loginValido.email);
        await pages.loginPage.fillPassword(loginValido.password);
        await pages.loginPage.clickSignIn();
        await pages.homePage.validateLoginSuccess();
    });

    test('CT002 - Login com credenciais invalidas', async ({ pages }) => {
        await pages.loginPage.fillEmail(loginInvalido.email);
        await pages.loginPage.fillPassword(loginInvalido.password);
        await pages.loginPage.clickSignIn();
        await pages.loginPage.validateInvalidCredentials();
        await pages.homePage.validateLoggedOutState();
    });
});

test.describe('Logout', () => {
    test('CT003/CT016 - Logout de usuario autenticado', async ({ pages }) => {
        await pages.loginPage.fillEmail(loginValido.email);
        await pages.loginPage.fillPassword(loginValido.password);
        await pages.loginPage.clickSignIn();
        await pages.homePage.validateLoginSuccess();
        await pages.homePage.clickSettings();
        await pages.settingsPage.validateSettingsLoaded();
        await pages.settingsPage.clickLogout();
        await pages.homePage.validateLoggedOutState();
    });
});
