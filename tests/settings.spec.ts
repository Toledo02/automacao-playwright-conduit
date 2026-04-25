import { test, expect } from '../fixtures/page-object';
import type { AuthCredentials, RegistrationData } from '../pages/page-models';

interface ProfilePayload {
  username: string;
  bio: string;
  image: string;
}

interface PasswordPayload {
  currentPasswordRef: string;
  newPassword: string;
  rollbackPassword: string;
}

async function registerDisposableUser(
  authPage: {
    signUp(data: RegistrationData): Promise<void>;
    expectAuthenticated(username?: string): Promise<void>;
  },
  dataHelper: {
    runId: string;
    loadPayload<TPayload = Record<string, unknown>>(
      relativePath: string,
      scenarioId: string,
      extraTokens?: Record<string, string | number>
    ): Promise<TPayload>;
  },
  suffix: string
): Promise<RegistrationData> {
  const shortRunId = `u${dataHelper.runId.slice(-6)}${suffix}`.slice(0, 12);

  const userData = await dataHelper.loadPayload<RegistrationData>(
    'test-data/auth/register-template.json',
    'AUTH_REGISTER_01',
    { runId: shortRunId }
  );

  await authPage.signUp(userData);
  await authPage.expectAuthenticated(userData.username);

  return userData;
}

test.describe('Settings e Logout - CT015 a CT017', () => {
  test.describe.configure({ mode: 'serial' });

  test('CT015 - Atualizar informacoes de perfil em Settings', async ({
    authPage,
    settingsPage,
    profilePage,
    dataHelper,
    page,
  }) => {
    const disposableUser = await registerDisposableUser(authPage, dataHelper, 'ct015');

    const profileScenario = await dataHelper.loadPayload<ProfilePayload>(
      'test-data/settings/profile-update.json',
      'SETTINGS_PROFILE_01'
    );

    const uniqueUsername = `${profileScenario.username}_${dataHelper.runId.slice(-4)}`;

    await settingsPage.open();
    await settingsPage.updateProfile({
      username: uniqueUsername,
      bio: profileScenario.bio,
      image: profileScenario.image,
    });

    await profilePage.open(uniqueUsername);
    await expect(page.locator('.user-info h4')).toContainText(uniqueUsername);

    // Keep account usable in case this spec is re-run inside the same session.
    await settingsPage.open();
    await settingsPage.updateProfile({ username: disposableUser.username });
  });

  test('CT016 - Atualizar senha em Settings', async ({
    authPage,
    settingsPage,
    dataHelper,
    page,
  }) => {
    const disposableUser = await registerDisposableUser(authPage, dataHelper, 'ct016');

    const passwordScenario = await dataHelper.loadPayload<PasswordPayload>(
      'test-data/settings/password-update.json',
      'SETTINGS_PASSWORD_01'
    );

    await settingsPage.open();
    await settingsPage.updatePassword(passwordScenario.newPassword);
    await settingsPage.logout();

    await authPage.signIn({
      email: disposableUser.email,
      password: passwordScenario.newPassword,
    });

    await authPage.expectAuthenticated(disposableUser.username);

    await settingsPage.open();
    await settingsPage.updatePassword(passwordScenario.rollbackPassword);
    await settingsPage.logout();

    await authPage.signIn({
      email: disposableUser.email,
      password: passwordScenario.rollbackPassword,
    });

    await authPage.expectAuthenticated(disposableUser.username);
    await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible();
  });

  test('CT017 - Logout pela tela de Settings', async ({ authPage, settingsPage, dataHelper }) => {
    const credentials = await dataHelper.loadPayload<AuthCredentials>(
      'test-data/auth/login-valid.json',
      'SETTINGS_LOGOUT_01'
    );

    await authPage.signIn(credentials);
    await settingsPage.open();
    await settingsPage.logout();

    await authPage.expectAnonymous();
  });
});
