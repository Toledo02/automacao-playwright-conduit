import { Locator, Page, expect } from '@playwright/test';

export class ArticlePage {
    readonly page: Page;
    readonly title: Locator;
    readonly body: Locator;
    readonly meta: Locator;
    readonly commentPrompt: Locator;
    readonly commentForm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = this.page.locator('div.article-page h1');
        this.body = this.page.locator('div.article-content');
        this.meta = this.page.locator('div.article-meta');
        this.commentPrompt = this.page.getByText(/sign in or sign up to add comments/i);
        this.commentForm = this.page.locator('.comment-form');
    }

    async validateArticleDetails() {
        await expect(this.title).toBeVisible();
        await expect(this.body).toBeVisible();
        await expect(this.meta).toBeVisible();
    }

    async validateCommentsSection() {
        await expect(this.commentPrompt.or(this.commentForm)).toBeVisible();
    }
}
