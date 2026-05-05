import { test as base, expect } from '@playwright/test';
import { ArticlePage } from '../pages/ArticlePage';
import { EditorPage } from '../pages/EditorPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { RegisterPage } from '../pages/RegisterPage';
import { SettingsPage } from '../pages/SettingsPage';

type Pages = {
	articlePage: ArticlePage;
	editorPage: EditorPage;
	homePage: HomePage;
	loginPage: LoginPage;
	profilePage: ProfilePage;
	registerPage: RegisterPage;
	settingsPage: SettingsPage;
};

type PageObjects = {
	pages: Pages;
};

const test = base.extend<PageObjects>({
	pages: async ({ page }, use) => {
		await use({
			articlePage: new ArticlePage(page),
			editorPage: new EditorPage(page),
			homePage: new HomePage(page),
			loginPage: new LoginPage(page),
			profilePage: new ProfilePage(page),
			registerPage: new RegisterPage(page),
			settingsPage: new SettingsPage(page),
		});
	},
});

export { test, expect };
export type { PageObjects, Pages };
