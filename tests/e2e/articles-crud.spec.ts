import { test } from '../../fixtures/page-object';
import { buildArticleData, buildUpdatedData, createArticleAPI, deleteArticleAPI, getSlugFromUrl } from '../../utils/Article';
import { loginValido } from '../../test-data/login.json';
import { articleBase, articleUpdate } from '../../test-data/article.json';

test.describe('Artigos CRUD', () => {
    let createdSlug: string | undefined;

    test.afterEach(async ({ request }) => {
        if (createdSlug) {
            await deleteArticleAPI(request, createdSlug);
            createdSlug = undefined;
        }
    });

    test('CT008 - Criar novo artigo com dados validos', async ({ page, pages }) => {
        const article = buildArticleData(articleBase);

        await pages.homePage.navigate();
        await pages.homePage.clickSignIn();
        await pages.loginPage.login(loginValido.email, loginValido.password);
        await pages.homePage.validateLoginSuccess();
        await pages.homePage.clickNewArticle();
        await pages.editorPage.validateEditorLoaded();
        await pages.editorPage.fillField('Article Title', article.title);
        await pages.editorPage.fillField('What\'s this article about', article.about);
        await pages.editorPage.fillField('Write your article', article.body);
        await pages.editorPage.addTags(article.tags);
        await pages.editorPage.publishArticle();
        await page.waitForURL(/\/article\//);
        createdSlug = getSlugFromUrl(page.url());
        await pages.articlePage.validateArticleContent(article.title, article.body);
        await pages.articlePage.validateOwnerActionsVisible();
    });

    test('CT009 - Editar artigo proprio', async ({ page, pages, request }) => {
        const article = buildArticleData(articleBase);
        const created = await createArticleAPI(request, article);
        createdSlug = created.article.slug;

        await pages.homePage.navigate();
        await pages.homePage.clickSignIn();
        await pages.loginPage.login(loginValido.email, loginValido.password);
        await pages.homePage.validateLoginSuccess();
        await pages.homePage.validateArticlePresent(article.title);
        await pages.homePage.clickArticle(article.title);
        await pages.articlePage.validateArticleContent(article.title, article.body);
        await pages.articlePage.clickEditArticle();
        await pages.editorPage.validateEditorLoaded();
        await pages.editorPage.validateEditorPrefilled(article.title);

        const updated = buildUpdatedData(articleUpdate);

        await pages.editorPage.fillField('Article Title', updated.title);
        await pages.editorPage.fillField('Write your article', updated.body);
        await pages.editorPage.publishArticle();
        await pages.articlePage.validateArticleContent(updated.title, updated.body);
        createdSlug = getSlugFromUrl(page.url());
    });

    test('CT010 - Excluir artigo proprio', async ({ pages, request }) => {
        const article = buildArticleData(articleBase);
        const created = await createArticleAPI(request, article);
        // Garante a limpeza caso o teste falhe antes da exclusao pela UI
        createdSlug = created.article.slug;

        await pages.homePage.navigate();
        await pages.homePage.clickSignIn();
        await pages.loginPage.login(loginValido.email, loginValido.password);
        await pages.homePage.validateLoginSuccess();
        await pages.homePage.validateArticlePresent(article.title);
        await pages.homePage.clickArticle(article.title);
        await pages.articlePage.validateArticleContent(article.title, article.body);
        await pages.articlePage.clickDeleteArticle();
        await pages.homePage.validateHomeLoaded();
        await pages.profilePage.validateArticleNotPresent(article.title);
    });

    test('CT011 - Validar campos obrigatorios ao publicar artigo', async ({ pages }) => {
        await pages.homePage.navigate();
        await pages.homePage.clickSignIn();
        await pages.loginPage.login(loginValido.email, loginValido.password);
        await pages.homePage.validateLoginSuccess();
        await pages.homePage.clickNewArticle();
        await pages.editorPage.validateEditorLoaded();
        await pages.editorPage.publishArticle();
        await pages.editorPage.validateRequiredFieldErrors();
    });
});
