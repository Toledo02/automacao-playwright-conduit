import { test as base, expect } from '@playwright/test';
import { ArticlePage } from '../pages/article.page';
import { AuthPage } from '../pages/auth.page';
import { EditorPage } from '../pages/editor.page';
import { HomePage } from '../pages/home.page';
import { ProfilePage } from '../pages/profile.page';
import { SettingsPage } from '../pages/settings.page';
import {
	createRunId,
	defaultTokenMap,
	resolveDynamicTokens,
	withRuntimeTokens,
} from '../utils/dynamic-data';
import { readScenario, type TestDataScenario } from '../utils/test-data';

type RuntimeTokens = Record<string, string | number>;

export interface DataHelper {
	runId: string;
	tokens(extraTokens?: RuntimeTokens): Record<string, string>;
	resolve<T>(value: T, extraTokens?: RuntimeTokens): T;
	loadScenario<
		TPayload = Record<string, unknown>,
		TExpected = Record<string, unknown>
	>(
		relativePath: string,
		scenarioId: string,
		extraTokens?: RuntimeTokens
	): Promise<TestDataScenario<TPayload, TExpected>>;
	loadPayload<TPayload = Record<string, unknown>>(
		relativePath: string,
		scenarioId: string,
		extraTokens?: RuntimeTokens
	): Promise<TPayload>;
}

type PageObjectFixtures = {
	authPage: AuthPage;
	homePage: HomePage;
	articlePage: ArticlePage;
	editorPage: EditorPage;
	settingsPage: SettingsPage;
	profilePage: ProfilePage;
};

type CustomFixtures = PageObjectFixtures & {
	runId: string;
	dataHelper: DataHelper;
};

function createDataHelper(runId: string): DataHelper {
	const baseTokens = defaultTokenMap(runId);

	const resolve = <T>(value: T, extraTokens?: RuntimeTokens): T => {
		const runtimeTokens = withRuntimeTokens(baseTokens, extraTokens);
		return resolveDynamicTokens(value, runtimeTokens);
	};

	return {
		runId,
		tokens: (extraTokens?: RuntimeTokens): Record<string, string> =>
			withRuntimeTokens(baseTokens, extraTokens),
		resolve,
		loadScenario: async <
			TPayload = Record<string, unknown>,
			TExpected = Record<string, unknown>
		>(
			relativePath: string,
			scenarioId: string,
			extraTokens?: RuntimeTokens
		): Promise<TestDataScenario<TPayload, TExpected>> => {
			const scenario = await readScenario<TPayload, TExpected>(relativePath, scenarioId);
			return resolve(scenario, extraTokens);
		},
		loadPayload: async <TPayload = Record<string, unknown>>(
			relativePath: string,
			scenarioId: string,
			extraTokens?: RuntimeTokens
		): Promise<TPayload> => {
			const scenario = await readScenario<TPayload>(relativePath, scenarioId);
			return resolve(scenario.payload, extraTokens);
		},
	};
}

export const test = base.extend<CustomFixtures>({
	runId: async ({}, use) => {
		await use(createRunId());
	},
	dataHelper: async ({ runId }, use) => {
		await use(createDataHelper(runId));
	},
	authPage: async ({ page }, use) => {
		await use(new AuthPage(page));
	},
	homePage: async ({ page }, use) => {
		await use(new HomePage(page));
	},
	articlePage: async ({ page }, use) => {
		await use(new ArticlePage(page));
	},
	editorPage: async ({ page }, use) => {
		await use(new EditorPage(page));
	},
	settingsPage: async ({ page }, use) => {
		await use(new SettingsPage(page));
	},
	profilePage: async ({ page }, use) => {
		await use(new ProfilePage(page));
	},
});

export { expect };
