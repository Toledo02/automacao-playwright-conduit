import { type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { EditorComponent } from './components/editor.component';
import { NavbarComponent } from './components/navbar.component';
import type { ArticleDraft, ArticleUpdateData } from './page-models';

export class EditorPage extends BasePage {
  readonly navbar: NavbarComponent;
  readonly editor: EditorComponent;

  constructor(page: Page) {
    super(page);
    this.navbar = new NavbarComponent(page);
    this.editor = new EditorComponent(page);
  }

  async openNewArticle(): Promise<void> {
    await this.goto('/editor');
    await this.waitForPageReady();
    await this.editor.expectEditorReady();
  }

  async publishNewArticle(data: ArticleDraft): Promise<void> {
    await this.editor.fillNewArticle(data);
    await this.editor.publish();
  }

  async updateCurrentArticle(data: ArticleUpdateData): Promise<void> {
    await this.editor.updateArticle(data);
    await this.editor.publish();
  }
}
