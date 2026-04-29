import { Locator, Page, expect } from '@playwright/test';

export class ArticlePage {
    readonly page: Page;
    readonly title: Locator;
    readonly body: Locator;
    readonly commentPrompt: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = this.page.locator('div.article-page h1');
        this.body = this.page.locator('div.article-content');
        this.commentPrompt = this.page.getByText(/sign in or sign up to add comments/i);
    }

    async validateArticleDetails() {
        await expect(this.title).toBeVisible();
        await expect(this.body).toBeVisible();
    }

    async validateCommentsSection() {
        await expect(this.commentPrompt).toBeVisible();
    }
}
