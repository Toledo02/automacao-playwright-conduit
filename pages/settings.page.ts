import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { NavbarComponent } from './components/navbar.component';
import type { ProfileUpdateData } from './page-models';

export class SettingsPage extends BasePage {
  readonly navbar: NavbarComponent;

  readonly imageInput: Locator;
  readonly usernameInput: Locator;
  readonly bioInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly updateSettingsButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new NavbarComponent(page);

    this.imageInput = page.getByPlaceholder('URL of profile picture');
    this.usernameInput = page
      .locator('input[placeholder="Username"], input[placeholder="Your Name"]')
      .first();
    this.bioInput = page.getByPlaceholder('Short bio about you');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page
      .locator('input[placeholder="New Password"], input[placeholder="Password"]')
      .first();
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    this.logoutButton = page.getByRole('button', { name: 'Or click here to logout.' });
  }

  async open(): Promise<void> {
    await this.goto('/settings');
    await this.waitForPageReady();
    await expect(this.updateSettingsButton).toBeVisible();
  }

  async updateProfile(data: ProfileUpdateData): Promise<void> {
    if (data.image !== undefined) {
      await this.imageInput.fill(data.image);
    }

    if (data.username !== undefined) {
      await this.usernameInput.fill(data.username);
    }

    if (data.bio !== undefined) {
      await this.bioInput.fill(data.bio);
    }

    if (data.email !== undefined) {
      await this.emailInput.fill(data.email);
    }

    if (data.password !== undefined) {
      await this.passwordInput.fill(data.password);
    }

    await this.updateSettingsButton.click();
  }

  async updatePassword(newPassword: string): Promise<void> {
    await this.passwordInput.fill(newPassword);
    await this.updateSettingsButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
