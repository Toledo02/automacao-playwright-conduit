import { expect, type Locator, type Page } from '@playwright/test';

export class FeedComponent {
  private readonly page: Page;

  readonly yourFeedTab: Locator;
  readonly globalFeedTab: Locator;
  readonly articlePreviews: Locator;
  readonly popularTagLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yourFeedTab = page.getByRole('link', { name: 'Your Feed' });
    this.globalFeedTab = page.getByRole('link', { name: 'Global Feed' });
    this.articlePreviews = page.locator('.article-preview');
    this.popularTagLinks = page.locator('.sidebar .tag-list .tag-pill');
  }

  async expectFeedLoaded(): Promise<void> {
    await expect(this.articlePreviews.first()).toBeVisible();
  }

  async openYourFeed(): Promise<void> {
    await this.yourFeedTab.click();
  }

  async openGlobalFeed(): Promise<void> {
    await this.globalFeedTab.click();
  }

  async selectPopularTag(tag: string): Promise<void> {
    const tagLink = this.page.locator('.sidebar .tag-list .tag-pill', { hasText: tag }).first();
    await expect(tagLink).toBeVisible();
    await tagLink.click();
  }

  async selectFirstAvailableTag(): Promise<string> {
    const firstTag = this.popularTagLinks.first();
    await expect(firstTag).toBeVisible();

    const selectedTag = (await firstTag.textContent())?.trim() ?? '';
    await firstTag.click();

    return selectedTag;
  }

  async openFirstArticle(): Promise<void> {
    const firstPreview = this.articlePreviews.first();
    await expect(firstPreview).toBeVisible();

    const previewLink = firstPreview.locator('a.preview-link').first();
    await previewLink.click();
  }

  async toggleFavoriteOnFirstArticle(): Promise<void> {
    const button = this.articlePreviews.first().locator('button.btn.btn-sm').first();
    await expect(button).toBeVisible();
    await button.click();
  }
}
