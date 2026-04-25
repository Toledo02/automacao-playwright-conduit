import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { FeedComponent } from './components/feed.component';
import { NavbarComponent } from './components/navbar.component';

export class HomePage extends BasePage {
  readonly navbar: NavbarComponent;
  readonly feed: FeedComponent;
  readonly appBanner: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new NavbarComponent(page);
    this.feed = new FeedComponent(page);
    this.appBanner = page.locator('.banner h1', { hasText: 'conduit' });
  }

  async open(): Promise<void> {
    await this.goto('/');
    await this.waitForPageReady();
  }

  async expectHomeLoaded(): Promise<void> {
    await expect(this.appBanner).toBeVisible();
  }

  async openGlobalFeed(): Promise<void> {
    await this.feed.openGlobalFeed();
  }

  async openYourFeed(): Promise<void> {
    await this.feed.openYourFeed();
  }

  async filterByTag(tag: string): Promise<void> {
    await this.feed.selectPopularTag(tag);
  }

  async filterByFirstAvailableTag(): Promise<string> {
    return this.feed.selectFirstAvailableTag();
  }

  async openFirstArticleFromFeed(): Promise<void> {
    await this.feed.openFirstArticle();
  }

  async toggleFavoriteOnFirstFeedArticle(): Promise<void> {
    await this.feed.toggleFavoriteOnFirstArticle();
  }
}
