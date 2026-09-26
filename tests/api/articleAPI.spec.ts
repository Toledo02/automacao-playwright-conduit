import { test, expect } from '../../fixtures/page-object';
import { createArticleAPI, buildArticleData, deleteArticleAPI } from '../../utils/Article';
import { articleBase, username } from '../../test-data/article.json';

let createdSlug: string | undefined;

test.afterEach(async ({ request }) => {
    if (createdSlug) {
        await deleteArticleAPI(request, createdSlug);
        createdSlug = undefined;
    }
});

test('Criar e excluir artigo via API', async ({ request }) => {
    const article = buildArticleData(articleBase);
    const response = await createArticleAPI(request, article);
    createdSlug = response.article.slug;

    expect(createdSlug).toBeTruthy();
    expect(response.article).toMatchObject({
        title: article.title,
        description: article.about,
        body: article.body,
        author: { username },
    });
    // A API normaliza a caixa de tags ja existentes (ex.: "qa" -> "QA")
    const tagList = response.article.tagList.map((tag: string) => tag.toLowerCase());
    expect(tagList).toEqual(expect.arrayContaining(article.tags));

    const deleteResponse = await deleteArticleAPI(request, response.article.slug);
    await expect(deleteResponse).toBeOK();
    createdSlug = undefined;
});
