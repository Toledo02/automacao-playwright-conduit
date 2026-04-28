import { test as base, expect } from '@playwright/test';
import { ArticlePage } from '../pages/ArticlePage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { SettingsPage } from '../pages/SettingsPage';

type Pages = {
	articlePage: ArticlePage;
	homePage: HomePage;
	loginPage: LoginPage;
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
			homePage: new HomePage(page),
			loginPage: new LoginPage(page),
			registerPage: new RegisterPage(page),
			settingsPage: new SettingsPage(page),
		});
	},
});

export { test, expect };
export type { PageObjects, Pages };
