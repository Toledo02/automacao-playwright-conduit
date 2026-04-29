import { test } from '../fixtures/page-object';
import { loginValido } from '../test-data/login.json';

test.beforeEach(async ({ pages }) => {
    await pages.homePage.navigate();
});

test.describe('Feed e Navegacao', () => {
    test('Visualizar Global Feed na Home', async ({ pages }) => {
        await pages.homePage.validateHomeLoaded();
        await pages.homePage.selectGlobalFeed();
        await pages.homePage.validateArticleList();
        await pages.homePage.validatePaginationOrList();
    });

    test('Alternar para Your Feed apos login', async ({ pages }) => {
        await pages.homePage.clickSignIn();
        await pages.loginPage.fillEmail(loginValido.email);
        await pages.loginPage.fillPassword(loginValido.password);
        await pages.loginPage.clickSignIn();
        await pages.homePage.validateLoginSuccess();

        await pages.homePage.selectYourFeed();
        await pages.homePage.validateEmptyFeed();
    });

    test('Filtrar artigos por tag popular', async ({ pages }) => {
        await pages.homePage.validatePopularTagsVisible();
        await pages.homePage.selectPopularTag('Test');
        await pages.homePage.validateTagFilterActive('Test');
        await pages.homePage.validateFeedContentLoaded();
    });

    test('Abrir detalhes de artigo a partir do feed', async ({ pages }) => {
        await pages.homePage.selectGlobalFeed();
        await pages.homePage.openFirstArticle();
        await pages.articlePage.validateArticleDetails();
        await pages.articlePage.validateCommentsSection();
    });
});
