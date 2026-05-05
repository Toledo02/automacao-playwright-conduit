import { Locator, Page, expect } from '@playwright/test';

type EditorPrefill = {
    title: string;
    about?: string;
    body?: string;
};

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
        this.titleInput = this.page.getByPlaceholder('Article Title');
        this.aboutInput = this.page.getByPlaceholder("What's this article about?");
        this.bodyInput = this.page.getByPlaceholder('Write your article (in markdown)');
        this.tagsInput = this.page.getByPlaceholder('Enter tags');
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

    async validateEditorPrefilled(expected: EditorPrefill) {
        await expect(this.titleInput).toHaveValue(expected.title);

        if (expected.about) {
            await expect(this.aboutInput).toHaveValue(expected.about);
        }

        if (expected.body) {
            await expect(this.bodyInput).toHaveValue(expected.body);
        }
    }

    async fillTitle(title: string) {
        await this.titleInput.fill(title);
    }

    async fillAbout(about: string) {
        await this.aboutInput.fill(about);
    }

    async fillBody(body: string) {
        await this.bodyInput.fill(body);
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
        await expect(this.errorMessages).toContainText("body can't be blank");
    }

    async validateStillInEditor() {
        await expect(this.page).toHaveURL(/.*\/editor/);
        await this.validateEditorLoaded();
    }
}
