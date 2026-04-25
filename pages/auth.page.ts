import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { NavbarComponent } from './components/navbar.component';
import type { AuthCredentials, RegistrationData } from './page-models';

export class AuthPage extends BasePage {
  readonly navbar: NavbarComponent;

  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly signUpButton: Locator;
  readonly errorMessages: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new NavbarComponent(page);

    this.usernameInput = page.getByPlaceholder('Username');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.errorMessages = page.locator('ul.error-messages');
  }

  async openLogin(): Promise<void> {
    await this.goto('/login');
    await this.waitForPageReady();
    await expect(this.signInButton).toBeVisible();
  }

  async openRegister(): Promise<void> {
    await this.goto('/register');
    await this.waitForPageReady();
    await expect(this.signUpButton).toBeVisible();
  }

  async login(credentials: AuthCredentials): Promise<void> {
    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
    await this.signInButton.click();
  }

  async register(data: RegistrationData): Promise<void> {
    await this.usernameInput.fill(data.username);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.signUpButton.click();
  }

  async signIn(credentials: AuthCredentials): Promise<void> {
    await this.openLogin();
    await this.login(credentials);
  }

  async signUp(data: RegistrationData): Promise<void> {
    await this.openRegister();
    await this.register(data);
  }

  async expectAuthErrorContains(message: string): Promise<void> {
    await expect(this.errorMessages).toContainText(message);
  }

  async expectAuthenticated(username?: string): Promise<void> {
    await this.navbar.expectAuthenticatedView(username);
  }

  async expectAnonymous(): Promise<void> {
    await this.navbar.expectAnonymousView();
  }
}
