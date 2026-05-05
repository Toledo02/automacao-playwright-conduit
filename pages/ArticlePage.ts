import { Locator, Page, expect } from '@playwright/test';

export class ArticlePage {
    readonly page: Page;
    readonly title: Locator;
    readonly body: Locator;
    readonly authorName: Locator;
    readonly editArticleLink: Locator;
    readonly deleteArticleButton: Locator;
    readonly commentPrompt: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = this.page.locator('div.article-page h1');
        this.body = this.page.locator('div.article-content');
        this.authorName = this.page.locator('.article-meta .author');
        this.editArticleLink = this.page.getByRole('link', { name: /edit article/i });
        this.deleteArticleButton = this.page.getByRole('button', { name: /delete article/i });
        this.commentPrompt = this.page.getByText(/sign in or sign up to add comments/i);
    }

    async validateArticleDetails() {
        await expect(this.title).toBeVisible();
        await expect(this.body).toBeVisible();
    }

    async validateArticleContent(expectedTitle: string, expectedBody: string) {
        await expect(this.title).toHaveText(expectedTitle);
        await expect(this.body).toContainText(expectedBody);
    }

    async validateAuthorVisible() {
        await expect(this.authorName).toBeVisible();
    }

    async validateOwnerActionsVisible() {
        await expect(this.editArticleLink).toBeVisible();
        await expect(this.deleteArticleButton).toBeVisible();
    }

    async clickEditArticle() {
        await this.editArticleLink.click();
    }

    async clickDeleteArticle() {
        await this.deleteArticleButton.click();
    }

    async validateCommentsSection() {
        await expect(this.commentPrompt).toBeVisible();
    }
}
