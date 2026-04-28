import { Locator, Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly signUpButton: Locator;
    readonly settingsLink: Locator;
    readonly banner: Locator;
    readonly feedToggle: Locator;
    readonly globalFeedTab: Locator;
    readonly yourFeedTab: Locator;
    readonly activeFeedTab: Locator;
    readonly articlePreviews: Locator;
    readonly pagination: Locator;
    readonly popularTagsTitle: Locator;
    readonly popularTags: Locator;
    readonly emptyFeedMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = this.page.getByRole('link', { name: 'Sign in' });
        this.signUpButton = this.page.getByRole('link', { name: 'Sign up' });
        this.settingsLink = this.page.getByRole('link', { name: 'Settings' });
        this.banner = this.page.locator('.banner');
        this.feedToggle = this.page.locator('div.feed-toggle');
        this.globalFeedTab = this.feedToggle.getByRole('link', { name: 'Global Feed' });
        this.yourFeedTab = this.feedToggle.getByRole('link', { name: 'Your Feed' });
        this.activeFeedTab = this.feedToggle.locator('.nav-link.active');
        this.articlePreviews = this.page.locator('.article-preview');
        this.pagination = this.page.locator('ul.pagination');
        this.popularTagsTitle = this.page.getByText('Popular Tags');
        this.popularTags = this.page.locator('.tag-list .tag-pill');
        this.emptyFeedMessage = this.page.getByText('No articles are here... yet.');
    }

    async navigate() {
        await this.page.goto('/');
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async clickSignUp() {
        await this.signUpButton.click();
    }

    async clickSettings() {
        await this.settingsLink.click();
    }

    async validateLoginSuccess() {
        await expect(this.page.getByText('Global Feed')).toBeVisible();
    }

    async validateLoggedOutState() {
        await expect(this.signInButton).toBeVisible();
        await expect(this.signUpButton).toBeVisible();
    }

    async validateHomeLoaded() {
        await expect(this.banner).toBeVisible();
        await expect(this.feedToggle).toBeVisible();
        await expect(this.globalFeedTab).toBeVisible();
    }

    async selectGlobalFeed() {
        await this.globalFeedTab.click();
        await this.validateFeedTabActive('Global Feed');
    }

    async selectYourFeed() {
        await this.yourFeedTab.click();
        await this.validateFeedTabActive('Your Feed');
    }

    async validateFeedTabActive(label: string) {
        await expect(this.activeFeedTab).toContainText(label);
    }

    async validateArticleList() {
        const firstArticle = this.articlePreviews.first();

        await expect(firstArticle).toBeVisible();
        await expect(firstArticle.getByRole('heading')).toBeVisible();
        await expect(firstArticle.locator('p')).toBeVisible();
        await expect(firstArticle.locator('.author')).toBeVisible();
    }

    async validatePaginationOrList() {
        if (await this.pagination.isVisible()) {
            const pageItems = await this.pagination.locator('li').count();
            expect(pageItems).toBeGreaterThan(0);
            return;
        }

        await expect(this.articlePreviews.first()).toBeVisible();
    }

    async validatePopularTagsVisible() {
        await expect(this.popularTagsTitle).toBeVisible();
        await expect(this.popularTags.first()).toBeVisible();
    }

    async selectFirstPopularTag(): Promise<string> {
        const firstTag = this.popularTags.first();

        await expect(firstTag).toBeVisible();
        const tagName = (await firstTag.textContent())?.trim() ?? '';

        await firstTag.click();
        return tagName;
    }

    async validateTagFilterActive(tagName: string) {
        await expect(this.activeFeedTab).toContainText(tagName);
    }

    async validateFeedContentLoaded() {
        const feedState = this.articlePreviews.first().or(this.emptyFeedMessage);

        await expect(feedState).toBeVisible();

        if (await this.articlePreviews.first().isVisible()) {
            await this.validateArticleList();
            return;
        }

        await expect(this.emptyFeedMessage).toBeVisible();
    }

    async openFirstArticle() {
        await this.validateArticleList();
        await this.articlePreviews.first().locator('a.preview-link').click();
    }

}
