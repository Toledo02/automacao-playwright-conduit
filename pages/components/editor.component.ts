import { expect, type Locator, type Page } from '@playwright/test';
import type { ArticleDraft, ArticleUpdateData } from '../page-models';

export class EditorComponent {
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly bodyInput: Locator;
  readonly tagsInput: Locator;
  readonly publishButton: Locator;

  constructor(private readonly page: Page) {
    this.titleInput = page.getByPlaceholder('Article Title');
    this.descriptionInput = page.getByPlaceholder("What's this article about?");
    this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsInput = page.getByPlaceholder('Enter tags');
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
  }

  async expectEditorReady(): Promise<void> {
    await expect(this.titleInput).toBeVisible();
    await expect(this.publishButton).toBeVisible();
  }

  async fillNewArticle(data: ArticleDraft): Promise<void> {
    await this.titleInput.fill(data.title);
    await this.descriptionInput.fill(data.description);
    await this.bodyInput.fill(data.body);

    if (data.tags && data.tags.length > 0) {
      for (const tag of data.tags) {
        await this.tagsInput.fill(tag);
        await this.tagsInput.press('Enter');
      }
    }
  }

  async updateArticle(data: ArticleUpdateData): Promise<void> {
    if (data.title !== undefined) {
      await this.titleInput.fill(data.title);
    }

    if (data.description !== undefined) {
      await this.descriptionInput.fill(data.description);
    }

    if (data.body !== undefined) {
      await this.bodyInput.fill(data.body);
    }

    if (data.tags && data.tags.length > 0) {
      for (const tag of data.tags) {
        await this.tagsInput.fill(tag);
        await this.tagsInput.press('Enter');
      }
    }
  }

  async publish(): Promise<void> {
    await this.publishButton.click();
  }
}
