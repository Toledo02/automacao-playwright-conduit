import type { Page } from '@playwright/test';
import { test, expect } from '../fixtures/page-object';
import type { AuthCredentials } from '../pages/page-models';

interface GlobalFeedPayload {
  openPath: string;
  activeTab: string;
}

interface TagFilterPayload {
  preferredTags: string[];
  fallbackMode: string;
}

interface OpenArticlePayload {
  articleSelectionMode: string;
  fallbackSlug: string;
}

async function expectFeedWithArticlesOrEmptyState(page: Page): Promise<void> {
  const emptyState = page.locator('.article-preview', { hasText: 'No articles are here' }).first();

  if (await emptyState.count()) {
    await expect(emptyState).toBeVisible();
    return;
  }

  await expect(page.locator('.article-preview a.preview-link').first()).toBeVisible();
}

async function selectPreferredTagIfVisible(page: Page, preferredTags: string[]): Promise<string | null> {
  for (const tag of preferredTags) {
    const candidate = page.locator('.sidebar .tag-list .tag-pill', { hasText: tag }).first();

    if (await candidate.count()) {
      await candidate.click();
      return tag;
    }
  }

  return null;
}

test.describe('Feed e Navegacao - CT005 a CT008', () => {
  test.describe.configure({ mode: 'serial' });

  test('CT005 - Visualizar Global Feed na Home', async ({ homePage, dataHelper, page }) => {
    const scenario = await dataHelper.loadScenario<GlobalFeedPayload>(
      'test-data/article/feed-tags.json',
      'FEED_GLOBAL_01'
    );

    await homePage.open();
    await homePage.expectHomeLoaded();
    await homePage.openGlobalFeed();

    await expect(page.locator('.feed-toggle .nav-link.active').first()).toContainText(
      scenario.payload.activeTab
    );
    await expectFeedWithArticlesOrEmptyState(page);
  });

  test('CT006 - Alternar para Your Feed apos login', async ({ authPage, homePage, dataHelper, page }) => {
    const credentials = await dataHelper.loadPayload<AuthCredentials>(
      'test-data/auth/login-valid.json',
      'FEED_YOUR_FEED_01'
    );

    await authPage.signIn(credentials);
    await homePage.open();
    await homePage.openYourFeed();

    await expect(page.locator('.feed-toggle .nav-link.active').first()).toContainText('Your Feed');
    await expectFeedWithArticlesOrEmptyState(page);
  });

  test('CT007 - Filtrar artigos por tag popular', async ({ homePage, dataHelper, page }) => {
    const scenario = await dataHelper.loadScenario<TagFilterPayload>(
      'test-data/article/feed-tags.json',
      'FEED_TAG_FILTER_01'
    );

    await homePage.open();
    await homePage.expectHomeLoaded();

    let selectedTag = await selectPreferredTagIfVisible(page, scenario.payload.preferredTags);

    if (!selectedTag) {
      selectedTag = await homePage.filterByFirstAvailableTag();
    }

    await expect(page.locator('.feed-toggle .nav-link.active').first()).toContainText(selectedTag);
    await expectFeedWithArticlesOrEmptyState(page);
  });

  test('CT008 - Abrir detalhes de artigo a partir do feed', async ({
    homePage,
    articlePage,
    dataHelper,
    page,
  }) => {
    const scenario = await dataHelper.loadScenario<OpenArticlePayload>(
      'test-data/article/feed-tags.json',
      'FEED_OPEN_ARTICLE_01'
    );

    await homePage.open();

    const canOpenFromFeed =
      scenario.payload.articleSelectionMode === 'firstVisible' &&
      (await page.locator('.article-preview a.preview-link').count()) > 0;

    if (canOpenFromFeed) {
      await homePage.openFirstArticleFromFeed();
    } else {
      await articlePage.openBySlug(scenario.payload.fallbackSlug);
    }

    await articlePage.expectArticleLoaded();
    await expect(page.locator('.article-page')).toBeVisible();
  });
});
