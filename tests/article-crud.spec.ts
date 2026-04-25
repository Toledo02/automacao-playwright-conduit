import { test, expect } from '../fixtures/page-object';
import type { ArticleDraft, AuthCredentials } from '../pages/page-models';

interface ArticleEditPayload {
  targetArticleSlug: string;
  newTitle: string;
  newBody: string;
}

interface ArticleEditExpected {
  titleShouldChange: boolean;
  bodyShouldContain: string;
}

interface ArticleDeletePayload {
  targetArticleSlug: string;
  confirmDelete: boolean;
}

interface ValidationPayload {
  title: string;
  description: string;
  body: string;
  tags: string[];
}

interface ValidationExpected {
  shouldBlockPublish: boolean;
  errorContainsAny: string[];
}

async function createArticleForFlow(dataHelper: {
  loadPayload<TPayload = Record<string, unknown>>(
    relativePath: string,
    scenarioId: string,
    extraTokens?: Record<string, string | number>
  ): Promise<TPayload>;
}, editorPage: { openNewArticle(): Promise<void>; publishNewArticle(data: ArticleDraft): Promise<void> }, articlePage: { expectArticleLoaded(): Promise<void>; getCurrentArticleSlug(): Promise<string> }) {
  const articleData = await dataHelper.loadPayload<ArticleDraft>(
    'test-data/article/article-create.json',
    'ARTICLE_CREATE_01'
  );

  await editorPage.openNewArticle();
  await editorPage.publishNewArticle(articleData);
  await articlePage.expectArticleLoaded();

  return {
    articleData,
    createdSlug: await articlePage.getCurrentArticleSlug(),
  };
}

test.describe('Article CRUD - CT009 a CT012', () => {
  test.describe.configure({ mode: 'serial' });

  const cleanupSlugs: string[] = [];

  test.beforeEach(async ({ authPage, dataHelper }) => {
    const credentials = await dataHelper.loadPayload<AuthCredentials>(
      'test-data/auth/login-valid.json',
      'AUTH_LOGIN_VALID_01'
    );

    await authPage.signIn(credentials);
    await authPage.expectAuthenticated();
  });

  test.afterEach(async ({ articlePage }) => {
    while (cleanupSlugs.length > 0) {
      const slug = cleanupSlugs.pop();

      if (!slug) {
        continue;
      }

      try {
        await articlePage.openBySlug(slug);

        const canDelete = await articlePage.deleteArticleButton
          .isVisible({ timeout: 2000 })
          .catch(() => false);

        if (canDelete) {
          await articlePage.deleteArticle();
        }
      } catch {
        // Best effort cleanup for articles created during test execution.
      }
    }
  });

  test('CT009 - Criar novo artigo com dados validos', async ({
    editorPage,
    articlePage,
    dataHelper,
    page,
  }) => {
    const { createdSlug } = await createArticleForFlow(dataHelper, editorPage, articlePage);
    cleanupSlugs.push(createdSlug);

    await expect(page).toHaveURL(/\/article\//i);
    await expect(articlePage.editArticleButton).toBeVisible();
    await expect(articlePage.deleteArticleButton).toBeVisible();
  });

  test('CT010 - Editar artigo proprio', async ({ editorPage, articlePage, dataHelper }) => {
    const { createdSlug } = await createArticleForFlow(dataHelper, editorPage, articlePage);
    cleanupSlugs.push(createdSlug);

    const editScenario = await dataHelper.loadScenario<ArticleEditPayload, ArticleEditExpected>(
      'test-data/article/article-update.json',
      'ARTICLE_EDIT_01',
      { createdArticleSlug: createdSlug }
    );

    await articlePage.goToEditArticle();
    await editorPage.updateCurrentArticle({
      title: editScenario.payload.newTitle,
      body: editScenario.payload.newBody,
    });

    await expect.soft(articlePage.articleTitle).toContainText(editScenario.payload.newTitle);
    await expect(articlePage.articleBody).toContainText(
      editScenario.expected?.bodyShouldContain ?? 'atualizado'
    );

    const editedSlug = await articlePage.getCurrentArticleSlug();
    cleanupSlugs.push(editedSlug);
  });

  test('CT011 - Excluir artigo proprio', async ({
    editorPage,
    articlePage,
    dataHelper,
    page,
  }) => {
    const { createdSlug } = await createArticleForFlow(dataHelper, editorPage, articlePage);

    const deleteScenario = await dataHelper.loadScenario<ArticleDeletePayload>(
      'test-data/article/article-update.json',
      'ARTICLE_DELETE_01',
      { createdArticleSlug: createdSlug }
    );

    expect(deleteScenario.payload.targetArticleSlug).toBe(createdSlug);

    const deletedArticleResponsePromise = page.waitForResponse(
      (response) =>
        response.request().method() === 'GET' &&
        response.url().includes(`/api/articles/${createdSlug}`)
    );

    await articlePage.deleteArticle();
    await expect(page).toHaveURL(/\/$/i);

    await articlePage.openBySlug(createdSlug);
    const deletedArticleResponse = await deletedArticleResponsePromise;
    expect(deletedArticleResponse.status()).toBe(404);
  });

  test('CT012 - Validar campos obrigatorios ao publicar artigo', async ({
    editorPage,
    dataHelper,
    page,
  }) => {
    const scenario = await dataHelper.loadScenario<ValidationPayload, ValidationExpected>(
      'test-data/article/article-validation.json',
      'ARTICLE_VALIDATION_01'
    );

    await editorPage.openNewArticle();
    await editorPage.publishNewArticle(scenario.payload);

    const errorMessages = page.locator('ul.error-messages').first();
    await expect(errorMessages).toBeVisible();

    const allErrors = ((await errorMessages.textContent()) ?? '').toLowerCase();
    const expectedTerms = (scenario.expected?.errorContainsAny ?? []).map((term) => term.toLowerCase());

    expect(expectedTerms.some((term) => allErrors.includes(term))).toBeTruthy();
  });
});
