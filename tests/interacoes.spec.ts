import { test } from '../fixtures/page-object';
import type { Pages } from '../fixtures/page-object';
import { loginValido } from '../test-data/login.json';

const login = async ({ pages }: { pages: Pages }) => {
    await pages.homePage.navigate();
    await pages.homePage.clickSignIn();
    await pages.loginPage.fillEmail(loginValido.email);
    await pages.loginPage.fillPassword(loginValido.password);
    await pages.loginPage.clickSignIn();
    await pages.homePage.validateLoginSuccess();
};

test.beforeEach(async ({ pages }) => {
    await login({ pages });
});

test.describe('Interacoes', () => {
    test('Favoritar artigo no feed', async ({ pages }) => {
        await pages.homePage.selectGlobalFeed();
        await pages.homePage.validateArticleList();

        if (await pages.homePage.isFirstFavoriteActive()) {
            const countBefore = await pages.homePage.getFirstFavoriteCount();

            await pages.homePage.toggleFirstFavorite();
            await pages.homePage.validateFirstFavoriteInactive();
            await pages.homePage.validateFirstFavoriteCount(countBefore - 1);
        }

        const countBefore = await pages.homePage.getFirstFavoriteCount();

        await pages.homePage.toggleFirstFavorite();
        await pages.homePage.validateFirstFavoriteActive();
        await pages.homePage.validateFirstFavoriteCount(countBefore + 1);
    });

    test('Desfavoritar artigo previamente favoritado', async ({ pages }) => {
        await pages.homePage.selectGlobalFeed();
        await pages.homePage.validateArticleList();

        if (!(await pages.homePage.isFirstFavoriteActive())) {
            const countBefore = await pages.homePage.getFirstFavoriteCount();

            await pages.homePage.toggleFirstFavorite();
            await pages.homePage.validateFirstFavoriteActive();
            await pages.homePage.validateFirstFavoriteCount(countBefore + 1);
        }

        const countBefore = await pages.homePage.getFirstFavoriteCount();

        await pages.homePage.toggleFirstFavorite();
        await pages.homePage.validateFirstFavoriteInactive();
        await pages.homePage.validateFirstFavoriteCount(countBefore - 1);
    });
});
