import { Locator, Page } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = this.page.getByRole('textbox', { name: 'Username' });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.signUpButton = this.page.getByRole('button', { name: 'Sign up' });
    }

    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickSignUp() {
        await this.signUpButton.click();
    }
}
