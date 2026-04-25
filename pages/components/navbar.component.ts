import { expect, type Locator, type Page } from '@playwright/test';

export class NavbarComponent {
  private readonly page: Page;

  readonly homeLink: Locator;
  readonly signInLink: Locator;
  readonly signUpLink: Locator;
  readonly newArticleLink: Locator;
  readonly settingsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.locator('a.navbar-brand').first();
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
  }

  profileLink(username: string): Locator {
    return this.page.locator('.navbar-nav .nav-link', { hasText: username }).first();
  }

  async goHome(): Promise<void> {
    await this.homeLink.click();
  }

  async goToSignIn(): Promise<void> {
    await this.signInLink.click();
  }

  async goToSignUp(): Promise<void> {
    await this.signUpLink.click();
  }

  async goToNewArticle(): Promise<void> {
    await this.newArticleLink.click();
  }

  async goToSettings(): Promise<void> {
    await this.settingsLink.click();
  }

  async goToProfile(username: string): Promise<void> {
    await this.profileLink(username).click();
  }

  async expectAnonymousView(): Promise<void> {
    await expect(this.signInLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
  }

  async expectAuthenticatedView(username?: string): Promise<void> {
    await expect(this.newArticleLink).toBeVisible();
    await expect(this.settingsLink).toBeVisible();

    if (username) {
      await expect(this.profileLink(username)).toBeVisible();
    }
  }
}
