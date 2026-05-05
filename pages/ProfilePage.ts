import { Locator, Page, expect } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly myArticlesTab: Locator;
    readonly articleTitles: Locator;
    readonly profileUsername: Locator;
    readonly profileBio: Locator;
    readonly profileImage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myArticlesTab = this.page.getByRole('link', { name: 'My Articles' });
        this.articleTitles = this.page.locator('.article-preview h1');
        this.profileUsername = this.page.locator('.user-info h4');
        this.profileBio = this.page.locator('.user-info p');
        this.profileImage = this.page.locator('.user-info img');
    }

    async selectMyArticles() {
        await this.myArticlesTab.click();
    }

    async validateArticleNotPresent(title: string) {
        const matchingTitle = this.articleTitles.filter({ hasText: title });
        await expect(matchingTitle).toHaveCount(0);
    }

    async validateProfileInfo(params: { username?: string; bio?: string; imageUrl?: string }) {
        const { username, bio, imageUrl } = params;

        if (username) {
            await expect(this.profileUsername).toHaveText(username);
        }

        if (bio) {
            await expect(this.profileBio).toContainText(bio);
        }

        if (imageUrl) {
            await expect(this.profileImage).toHaveAttribute('src', imageUrl);
        }
    }
}
