import { Locator, Page, expect } from '@playwright/test';

export class SettingsPage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly settingsHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.settingsHeading = this.page.getByRole('heading', { name: 'Your Settings' });
        this.logoutButton = this.page.getByRole('button', { name: /click here to logout/i });
    }

    async validateSettingsLoaded() {
        await expect(this.settingsHeading).toBeVisible();
    }

    async clickLogout() {
        await this.logoutButton.click();
    }
}
