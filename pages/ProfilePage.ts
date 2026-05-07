import { Locator, Page, expect } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async validateArticleNotPresent(title: string) {
        const matchingTitle = this.page.getByRole('heading', { name: title });
        await expect(matchingTitle).not.toBeVisible();
    }
}
