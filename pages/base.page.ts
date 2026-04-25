import { expect, type Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  protected readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.E2E_BASE_URL ?? 'https://conduit.bondaracademy.com';
  }

  protected buildUrl(pathname: string): string {
    if (/^https?:\/\//i.test(pathname)) {
      return pathname;
    }

    const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return new URL(normalizedPath, this.baseUrl).toString();
  }

  async goto(pathname: string): Promise<void> {
    await this.page.goto(this.buildUrl(pathname));
  }

  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectUrlToContain(fragment: string): Promise<void> {
    const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(this.page).toHaveURL(new RegExp(escaped));
  }
}
