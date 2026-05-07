import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly errorMessages: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.signInButton = this.page.getByRole('button', { name: 'Sign in' });
        this.errorMessages = this.page.locator('.error-messages');
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async login(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickSignIn();
    }

    async validateInvalidCredentials() {
        await expect(this.errorMessages).toContainText('email or password is invalid');
    }

    async validateLoginFormVisible() {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
    }
}
