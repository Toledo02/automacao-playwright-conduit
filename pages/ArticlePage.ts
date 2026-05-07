import { Locator, Page, expect } from '@playwright/test';

export class ArticlePage {
    readonly page: Page;
    readonly editArticleLink: Locator;
    readonly deleteArticleButton: Locator;
    readonly commentPrompt: Locator;

    constructor(page: Page) {
        this.page = page;
        this.editArticleLink = this.page.getByRole('link', { name: ' Edit Article' }).first();
        this.deleteArticleButton = this.page.getByRole('button', { name: ' Delete Article' }).first();
        this.commentPrompt = this.page.getByText(/sign in or sign up to add comments/i);
    }

    async clickEditArticle() {
        await this.editArticleLink.click();
    }

    async clickDeleteArticle() {
        await this.deleteArticleButton.click();
    }

    async validateArticleContent(expectedTitle: string, expectedBody: string) {
        await expect(this.page.getByRole('heading', { name: expectedTitle })).toBeVisible();
        await expect(this.page.getByText(expectedBody)).toBeVisible();
    }

    async validateArticleVisible() {
        await expect(this.page.getByRole('heading', { level: 1 })).toBeVisible();
    }

    async validateCommentPromptVisible() {
        await expect(this.commentPrompt).toBeVisible();
    }

    async validateOwnerActionsVisible() {
        await expect(this.editArticleLink).toBeVisible();
        await expect(this.deleteArticleButton).toBeVisible();
    }
}
