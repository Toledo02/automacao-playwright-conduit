import { test } from '../fixtures/page-object';
import type { Pages } from '../fixtures/page-object';
import { passwordUpdate, profileUpdate, userBase } from '../test-data/settings.json';

type UserData = {
    username: string;
    email: string;
    password: string;
    uniqueId: string;
};

type ProfileUpdateData = {
    username: string;
    bio: string;
    imageUrl: string;
};

const buildUser = (): UserData => {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    return {
        uniqueId,
        username: `${userBase.username}-${uniqueId}`,
        email: `${userBase.username}-${uniqueId}@${userBase.emailDomain}`,
        password: userBase.password,
    };
};

const buildProfileUpdate = (uniqueId: string): ProfileUpdateData => ({
    username: `${profileUpdate.username}-${uniqueId}`,
    bio: `${profileUpdate.bio} ${uniqueId}`,
    imageUrl: profileUpdate.imageUrl,
});

const registerAndLogin = async ({ pages, user }: { pages: Pages; user: UserData }) => {
    await pages.homePage.navigate();
    await pages.homePage.clickSignUp();
    await pages.registerPage.fillUsername(user.username);
    await pages.registerPage.fillEmail(user.email);
    await pages.registerPage.fillPassword(user.password);
    await pages.registerPage.clickSignUp();
    await pages.homePage.validateLoginSuccess(user.username);
};

test.describe('Settings', () => {
    test('Atualizar informacoes de perfil em Settings', async ({ pages }) => {
        const user = buildUser();
        const updatedProfile = buildProfileUpdate(user.uniqueId);

        await registerAndLogin({ pages, user });
        await pages.homePage.clickSettings();
        await pages.settingsPage.validateSettingsLoaded();
        await pages.settingsPage.fillProfileImageUrl(updatedProfile.imageUrl);
        await pages.settingsPage.fillUsername(updatedProfile.username);
        await pages.settingsPage.fillBio(updatedProfile.bio);
        await pages.settingsPage.saveSettings();

        await pages.homePage.clickProfile(updatedProfile.username);
        await pages.profilePage.validateProfileInfo({
            username: updatedProfile.username,
            bio: updatedProfile.bio,
            imageUrl: updatedProfile.imageUrl,
        });
    });

    test('Atualizar senha em Settings', async ({ pages }) => {
        const user = buildUser();

        await registerAndLogin({ pages, user });
        await pages.homePage.clickSettings();
        await pages.settingsPage.validateSettingsLoaded();
        await pages.settingsPage.fillPassword(passwordUpdate.newPassword);
        await pages.settingsPage.saveSettings();
        await pages.settingsPage.clickLogout();
        await pages.homePage.validateLoggedOutState();

        await pages.homePage.clickSignIn();
        await pages.loginPage.fillEmail(user.email);
        await pages.loginPage.fillPassword(passwordUpdate.newPassword);
        await pages.loginPage.clickSignIn();
        await pages.homePage.validateLoginSuccess(user.username);
    });

    test('Logout pela tela de Settings', async ({ pages }) => {
        const user = buildUser();

        await registerAndLogin({ pages, user });
        await pages.homePage.clickSettings();
        await pages.settingsPage.validateSettingsLoaded();
        await pages.settingsPage.clickLogout();
        await pages.homePage.validateLoggedOutState();

        await pages.editorPage.navigate();
        await pages.loginPage.validateLoginFormVisible();
    });
});
