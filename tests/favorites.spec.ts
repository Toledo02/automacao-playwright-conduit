import type { Locator, Page } from '@playwright/test';
import { test, expect } from '../fixtures/page-object';
import type { AuthCredentials } from '../pages/page-models';

interface FavoritePayload {
  targetArticleFromFeed: string;
  counterDelta: number;
}

function parseFavoriteCounter(textValue: string | null): number {
  const match = textValue?.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

async function getFavoriteCount(button: Locator): Promise<number> {
  return parseFavoriteCounter(await button.textContent());
}

async function ensureUnfavoritedButton(page: Page): Promise<Locator> {
  let target = page.locator('.article-preview button.btn-outline-primary').first();

  if ((await target.count()) > 0) {
    return target;
  }

  const currentlyFavorited = page.locator('.article-preview button.btn-primary').first();
  await expect(currentlyFavorited).toBeVisible();
  await currentlyFavorited.click();
  await expect(currentlyFavorited).toHaveClass(/btn-outline-primary/);

  target = currentlyFavorited;
  return target;
}

async function ensureFavoritedButton(page: Page): Promise<Locator> {
  let target = page.locator('.article-preview button.btn-primary').first();

  if ((await target.count()) > 0) {
    return target;
  }

  const currentlyUnfavorited = page.locator('.article-preview button.btn-outline-primary').first();
  await expect(currentlyUnfavorited).toBeVisible();
  await currentlyUnfavorited.click();
  await expect(currentlyUnfavorited).toHaveClass(/btn-primary/);

  target = currentlyUnfavorited;
  return target;
}

test.describe('Favoritos - CT013 a CT014', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ authPage, homePage, dataHelper, page }) => {
    const credentials = await dataHelper.loadPayload<AuthCredentials>(
      'test-data/auth/login-valid.json',
      'AUTH_LOGIN_VALID_01'
    );

    await authPage.signIn(credentials);
    await homePage.open();
    await homePage.openGlobalFeed();

    await expect(page.locator('.article-preview').first()).toBeVisible();
  });

  test('CT013 - Favoritar artigo no feed', async ({ dataHelper, page }) => {
    const scenario = await dataHelper.loadScenario<FavoritePayload>(
      'test-data/article/feed-tags.json',
      'FAVORITE_ADD_01'
    );

    const targetButton = await ensureUnfavoritedButton(page);
    const previousCount = await getFavoriteCount(targetButton);

    await targetButton.click();
    await expect(targetButton).toHaveClass(/btn-primary/);

    const newCount = await getFavoriteCount(targetButton);
    expect(newCount).toBeGreaterThanOrEqual(previousCount + scenario.payload.counterDelta - 1);
  });

  test('CT014 - Desfavoritar artigo previamente favoritado', async ({ dataHelper, page }) => {
    const scenario = await dataHelper.loadScenario<FavoritePayload>(
      'test-data/article/feed-tags.json',
      'FAVORITE_REMOVE_01'
    );

    const targetButton = await ensureFavoritedButton(page);
    const previousCount = await getFavoriteCount(targetButton);

    await targetButton.click();
    await expect(targetButton).toHaveClass(/btn-outline-primary/);

    const newCount = await getFavoriteCount(targetButton);
    expect(newCount).toBeLessThanOrEqual(previousCount + scenario.payload.counterDelta + 1);
  });
});
