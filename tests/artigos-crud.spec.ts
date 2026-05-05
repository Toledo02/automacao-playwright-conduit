import { test } from '../fixtures/page-object';
import type { Pages } from '../fixtures/page-object';
import { loginValido } from '../test-data/login.json';
import { articleBase, articleUpdate } from '../test-data/article.json';

const username = 'Toledo02';

type ArticleData = {
    title: string;
    about: string;
    body: string;
    tags: string[];
};

const buildArticleData = (): ArticleData => {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    return {
        title: `${articleBase.title} ${uniqueId}`,
        about: articleBase.about,
        body: `${articleBase.body} ${uniqueId}`,
        tags: articleBase.tags,
    };
};

const buildUpdatedData = () => {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    return {
        title: `${articleUpdate.title} ${uniqueId}`,
        body: `${articleUpdate.body} ${uniqueId}`,
    };
};

const login = async ({ pages }: { pages: Pages }) => {
    await pages.homePage.navigate();
    await pages.homePage.clickSignIn();
    await pages.loginPage.fillEmail(loginValido.email);
    await pages.loginPage.fillPassword(loginValido.password);
    await pages.loginPage.clickSignIn();
    await pages.homePage.validateLoginSuccess();
};

const createArticle = async ({ pages }: { pages: Pages }, article: ArticleData) => {
    await pages.homePage.clickNewArticle();
    await pages.editorPage.validateEditorLoaded();
    await pages.editorPage.fillTitle(article.title);
    await pages.editorPage.fillAbout(article.about);
    await pages.editorPage.fillBody(article.body);
    await pages.editorPage.addTags(article.tags);
    await pages.editorPage.publishArticle();
    await pages.articlePage.validateArticleContent(article.title, article.body);
};

test.beforeEach(async ({ pages }) => {
    await login({ pages });
});

test.describe('Artigos CRUD', () => {
    test('Criar novo artigo com dados validos', async ({ pages }) => {
        const article = buildArticleData();

        await createArticle({ pages }, article);
        await pages.articlePage.validateAuthorVisible();
        await pages.articlePage.validateOwnerActionsVisible();
    });

    test('Editar artigo proprio', async ({ pages }) => {
        const article = buildArticleData();

        await createArticle({ pages }, article);
        await pages.articlePage.clickEditArticle();
        await pages.editorPage.validateEditorLoaded();
        await pages.editorPage.validateEditorPrefilled({
            title: article.title,
            about: article.about,
            body: article.body,
        });

        const updated = buildUpdatedData();

        await pages.editorPage.fillTitle(updated.title);
        await pages.editorPage.fillBody(updated.body);
        await pages.editorPage.publishArticle();
        await pages.articlePage.validateArticleContent(updated.title, updated.body);
    });

    test('Excluir artigo proprio', async ({ pages }) => {
        const article = buildArticleData();

        await createArticle({ pages }, article);
        await pages.articlePage.clickDeleteArticle();
        await pages.homePage.validateHomeLoaded();
        await pages.homePage.clickProfile(username);
        await pages.profilePage.selectMyArticles();
        await pages.profilePage.validateArticleNotPresent(article.title);
    });

    test('Validar campos obrigatorios ao publicar artigo', async ({ pages }) => {
        await pages.homePage.clickNewArticle();
        await pages.editorPage.validateEditorLoaded();
        await pages.editorPage.publishArticle();
        await pages.editorPage.validateRequiredFieldErrors();
        await pages.editorPage.validateStillInEditor();
    });
});
