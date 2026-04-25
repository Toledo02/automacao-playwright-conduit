import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { NavbarComponent } from './components/navbar.component';

export class ArticlePage extends BasePage {
  readonly navbar: NavbarComponent;

  readonly articleTitle: Locator;
  readonly articleBody: Locator;
  readonly editArticleButton: Locator;
  readonly deleteArticleButton: Locator;
  readonly favoriteArticleButton: Locator;
  readonly commentInput: Locator;
  readonly postCommentButton: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new NavbarComponent(page);

    this.articleTitle = page.locator('h1').first();
    this.articleBody = page.locator('.article-content');
    this.editArticleButton = page.getByRole('link', { name: /Edit Article/i }).first();
    this.deleteArticleButton = page.getByRole('button', { name: /Delete Article/i }).first();
    this.favoriteArticleButton = page.locator('button.btn', { hasText: /Favorite Article|Unfavorite Article/i }).first();
    this.commentInput = page.getByPlaceholder('Write a comment...');
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
  }

  async openBySlug(slug: string): Promise<void> {
    await this.goto(`/article/${slug}`);
    await this.waitForPageReady();
  }

  async expectArticleLoaded(): Promise<void> {
    await expect(this.articleTitle).toBeVisible();
    await expect(this.articleBody).toBeVisible();
  }

  async favoriteFromArticlePage(): Promise<void> {
    await expect(this.favoriteArticleButton).toBeVisible();
    await this.favoriteArticleButton.click();
  }

  async deleteArticle(): Promise<void> {
    await expect(this.deleteArticleButton).toBeVisible();
    await this.deleteArticleButton.click();
  }

  async goToEditArticle(): Promise<void> {
    await expect(this.editArticleButton).toBeVisible();
    await this.editArticleButton.click();
  }

  async addComment(comment: string): Promise<void> {
    await this.commentInput.fill(comment);
    await this.postCommentButton.click();
  }

  async expectCommentVisible(comment: string): Promise<void> {
    await expect(this.page.locator('.card-text', { hasText: comment }).first()).toBeVisible();
  }

  async getCurrentArticleSlug(): Promise<string> {
    const match = this.page.url().match(/\/article\/([^/?#]+)/i);

    if (!match || !match[1]) {
      throw new Error(`Could not extract article slug from URL: ${this.page.url()}`);
    }

    return match[1];
  }
}
