import { Locator, Page, expect } from '@playwright/test';

export class SettingsPage {
    readonly page: Page;
    readonly imageUrlInput: Locator;
    readonly usernameInput: Locator;
    readonly bioInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly updateSettingsButton: Locator;
    readonly logoutButton: Locator;
    readonly settingsHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.settingsHeading = this.page.getByRole('heading', { name: 'Your Settings' });
        this.imageUrlInput = this.page.getByPlaceholder('URL of profile picture');
        this.usernameInput = this.page.getByPlaceholder('Username');
        this.bioInput = this.page.getByPlaceholder('Short bio about you');
        this.emailInput = this.page.getByPlaceholder('Email');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.updateSettingsButton = this.page.getByRole('button', { name: 'Update Settings' });
        this.logoutButton = this.page.getByRole('button', { name: /click here to logout/i });
    }

    async navigate() {
        await this.page.goto('/settings');
    }

    async validateSettingsLoaded() {
        await expect(this.settingsHeading).toBeVisible();
    }

    async fillProfileImageUrl(url: string) {
        await this.imageUrlInput.fill(url);
    }

    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async fillBio(bio: string) {
        await this.bioInput.fill(bio);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async saveSettings() {
        await Promise.all([
            this.page.waitForResponse(
                (response) =>
                    response.url().includes('/api/user') &&
                    response.request().method() === 'PUT' &&
                    response.ok(),
            ),
            this.updateSettingsButton.click(),
        ]);
    }

    async clickLogout() {
        await this.logoutButton.click();
    }
}
