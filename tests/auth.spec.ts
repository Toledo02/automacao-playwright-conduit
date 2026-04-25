import { test, expect } from '../fixtures/page-object';
import type { AuthCredentials, RegistrationData } from '../pages/page-models';

interface RegisterExpected {
  redirectPath: string;
  navbarShouldContain: string[];
}

interface InvalidLoginExpected {
  errorContains: string;
}

test.describe('Autenticacao - CT001 a CT004', () => {
  test.describe.configure({ mode: 'serial' });

  test('CT001 - Cadastro com dados validos', async ({ authPage, dataHelper, page }) => {
    const scenario = await dataHelper.loadScenario<RegistrationData, RegisterExpected>(
      'test-data/auth/register-template.json',
      'AUTH_REGISTER_01',
      { runId: `u${dataHelper.runId.slice(-10)}` }
    );

    await authPage.signUp(scenario.payload);
    await authPage.expectAuthenticated(scenario.payload.username);

    await expect(page).toHaveURL(new RegExp(`${scenario.expected?.redirectPath ?? '/'}`));

    for (const linkName of scenario.expected?.navbarShouldContain ?? []) {
      await expect(page.getByRole('link', { name: linkName })).toBeVisible();
    }
  });

  test('CT002 - Login com credenciais validas', async ({ authPage, dataHelper, page }) => {
    const credentials = await dataHelper.loadPayload<AuthCredentials>(
      'test-data/auth/login-valid.json',
      'AUTH_LOGIN_VALID_01'
    );

    await authPage.signIn(credentials);
    await authPage.expectAuthenticated();
    await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible();
  });

  test('CT003 - Login com credenciais invalidas', async ({ authPage, dataHelper }) => {
    const scenario = await dataHelper.loadScenario<AuthCredentials, InvalidLoginExpected>(
      'test-data/auth/login-invalid.json',
      'AUTH_LOGIN_INVALID_01'
    );

    await authPage.openLogin();
    await authPage.login(scenario.payload);
    await authPage.expectAuthErrorContains(scenario.expected?.errorContains ?? 'invalid');
    await authPage.expectAnonymous();
  });

  test('CT004 - Logout de usuario autenticado', async ({ authPage, dataHelper, settingsPage }) => {
    const credentials = await dataHelper.loadPayload<AuthCredentials>(
      'test-data/auth/login-valid.json',
      'AUTH_LOGOUT_01'
    );

    await authPage.signIn(credentials);
    await authPage.expectAuthenticated();

    await settingsPage.open();
    await settingsPage.logout();

    await authPage.expectAnonymous();
  });
});
