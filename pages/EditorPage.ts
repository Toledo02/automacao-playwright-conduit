import { Locator, Page, expect } from '@playwright/test';

export class EditorPage {
    readonly page: Page;
    readonly titleInput: Locator;
    readonly aboutInput: Locator;
    readonly bodyInput: Locator;
    readonly tagsInput: Locator;
    readonly publishButton: Locator;
    readonly errorMessages: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleInput = this.page.getByRole('textbox', { name: 'Article Title' });
        this.aboutInput = this.page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.bodyInput = this.page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.tagsInput = this.page.getByRole('textbox', { name: 'Enter tags' });
        this.publishButton = this.page.getByRole('button', { name: 'Publish Article' });
        this.errorMessages = this.page.locator('.error-messages');
    }

    async navigate() {
        await this.page.goto('/editor');
    }

    async validateEditorLoaded() {
        await expect(this.titleInput).toBeVisible();
        await expect(this.publishButton).toBeVisible();
    }

    async validateEditorPrefilled(expected: string) {
        await expect(this.titleInput).toHaveValue(expected);
    }

    async fillField(fieldName: string, value: string) {
        const field = this.page.getByRole('textbox', { name: fieldName });
        await field.fill(value);
    }

    async addTags(tags: string[]) {
        for (const tag of tags) {
            await this.tagsInput.fill(tag);
            await this.tagsInput.press('Enter');
        }
    }

    async publishArticle() {
        await this.publishButton.click();
    }

    async validateRequiredFieldErrors() {
        await expect(this.errorMessages).toBeVisible();
        await expect(this.errorMessages).toContainText("title can't be blank");
    }
}
