import { test } from '../fixtures/page-object';
import { loginInvalido, loginValido } from '../test-data/login.json';

test.beforeEach(async ({ pages }) => {
    await pages.homePage.navigate();
});

test.describe('Autenticacao', () => {
    test('Login com credenciais validas', async ({ pages }) => {
        await pages.homePage.clickSignIn();
        await pages.loginPage.fillEmail(loginValido.email);
        await pages.loginPage.fillPassword(loginValido.password);
        await pages.loginPage.clickSignIn();
        await pages.homePage.validateLoginSuccess();
    });

    test('Login com credenciais invalidas', async ({ pages }) => {
        await pages.homePage.clickSignIn();
        await pages.loginPage.fillEmail(loginInvalido.email);
        await pages.loginPage.fillPassword(loginInvalido.password);
        await pages.loginPage.clickSignIn();
        await pages.loginPage.validateInvalidCredentials();
        await pages.homePage.validateLoggedOutState();
    });

    test('Logout de usuario autenticado', async ({ pages }) => {
        await pages.homePage.clickSignIn();
        await pages.loginPage.fillEmail(loginValido.email);
        await pages.loginPage.fillPassword(loginValido.password);
        await pages.loginPage.clickSignIn();
        await pages.homePage.validateLoginSuccess();

        await pages.homePage.clickSettings();
        await pages.settingsPage.validateLoaded();
        await pages.settingsPage.clickLogout();
        await pages.homePage.validateLoggedOutState();

        await pages.settingsPage.navigate();
        await pages.loginPage.validateLoginFormVisible();
    });
});
