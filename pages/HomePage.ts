import { Locator, Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly signUpButton: Locator;
    readonly newArticleLink: Locator;
    readonly settingsLink: Locator;
    readonly banner: Locator;
    readonly feedToggle: Locator;
    readonly globalFeedTab: Locator;
    readonly yourFeedTab: Locator;
    readonly activeFeedTab: Locator;
    readonly articlePreviews: Locator;
    readonly pagination: Locator;
    readonly popularTagsTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = this.page.getByRole('link', { name: 'Sign in' });
        this.signUpButton = this.page.getByRole('link', { name: 'Sign up' });
        this.newArticleLink = this.page.getByRole('link', { name: 'New Article' });
        this.settingsLink = this.page.getByRole('link', { name: 'Settings' });
        this.banner = this.page.locator('.banner');
        this.feedToggle = this.page.locator('div.feed-toggle');
        this.globalFeedTab = this.page.getByText('Global Feed');
        this.yourFeedTab = this.page.getByText('Your Feed');
        this.activeFeedTab = this.page.locator('.nav-link.active');
        this.articlePreviews = this.page.locator('.article-preview');
        this.pagination = this.page.locator('ul.pagination');
        this.popularTagsTitle = this.page.getByText('Popular Tags');
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

    async clickNewArticle() {
        await this.newArticleLink.click();
    }

    async clickProfile(username: string) {
        await this.page.getByRole('link', { name: username }).click();
    }

    async clickSettings() {
        await this.settingsLink.click();
    }

    async selectGlobalFeed() {
        await this.globalFeedTab.click();
    }

    async selectYourFeed() {
        await this.yourFeedTab.click();
    }

    async selectPopularTag(tagName: string) {
        const tag = this.page.getByText('Popular Tags').locator('..').getByText(` ${tagName} `);
        await expect(tag).toBeVisible();
        await tag.click();
    }

    async openFirstArticle() {
        await this.validateArticleList();
        await this.articlePreviews.first().locator('a.preview-link').click();
    }

    async clickArticle(title: string) {
        const article = this.page.getByRole('heading', { name: title }).locator('..');
        await article.click();
    }

    async validateLoginSuccess(username = 'Toledo02') {
        await expect(this.page.locator('app-layout-header').getByRole('link', { name: username })).toBeVisible();
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
    }

    async validateTagFilterActive(tagName: string) {
        const activeTag = this.page.locator('li').getByText(` ${tagName} `);
        await expect(activeTag).toBeVisible();
    }

    async validateFeedContentLoaded() {
        const feedState = this.articlePreviews.first();

        await expect(feedState).toBeVisible();
        await this.validateArticleList();
    }

    async validateEmptyFeed() {
        await expect(this.page.getByText('No articles are here... yet.')).toBeVisible();
    }

    async validateArticlePresent(title: string) {
        await expect(this.page.getByRole('heading', { name: title })).toBeVisible();
    }
}
