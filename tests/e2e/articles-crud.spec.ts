import { test } from '../../fixtures/page-object';
import { buildArticleData, buildUpdatedData, createArticleAPI } from '../../utils/Article';
import { loginValido } from '../../test-data/login.json';
import { articleBase, articleUpdate } from '../../test-data/article.json';

test.describe('Artigos CRUD', () => {
    test('Criar novo artigo com dados validos', async ({ pages }) => {
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
        await pages.articlePage.validateArticleContent(article.title, article.body);
        await pages.articlePage.validateOwnerActionsVisible();
    });

    test('Editar artigo proprio', async ({ pages, request }) => {
        const article = buildArticleData(articleBase);
        await createArticleAPI(request, article);

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
    });

    test('Excluir artigo proprio', async ({ pages, request }) => {
        const article = buildArticleData(articleBase);
        await createArticleAPI(request, article);

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

    test('Validar campos obrigatorios ao publicar artigo', async ({ pages }) => {
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
