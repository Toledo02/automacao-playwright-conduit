import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { NavbarComponent } from './components/navbar.component';

export class ProfilePage extends BasePage {
  readonly navbar: NavbarComponent;

  readonly myArticlesTab: Locator;
  readonly favoritedArticlesTab: Locator;
  readonly articlePreviewLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new NavbarComponent(page);

    this.myArticlesTab = page.getByRole('link', { name: 'My Articles' });
    this.favoritedArticlesTab = page.getByRole('link', { name: 'Favorited Articles' });
    this.articlePreviewLinks = page.locator('.article-preview h1 a');
  }

  async open(username: string): Promise<void> {
    await this.goto(`/profile/${encodeURIComponent(username)}`);
    await this.waitForPageReady();
  }

  async openMyArticles(): Promise<void> {
    await this.myArticlesTab.click();
  }

  async openFavoritedArticles(): Promise<void> {
    await this.favoritedArticlesTab.click();
  }

  async isArticleVisibleByTitle(title: string): Promise<boolean> {
    return (await this.page.locator('.article-preview h1', { hasText: title }).count()) > 0;
  }

  async openArticleByTitle(title: string): Promise<void> {
    await this.page.locator('.article-preview h1 a', { hasText: title }).first().click();
  }
}
