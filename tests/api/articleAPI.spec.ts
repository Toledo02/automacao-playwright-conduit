import { test } from '../../fixtures/page-object';
import { createArticleAPI, buildArticleData } from '../../utils/Article';
import { articleBase } from '../../test-data/article.json';

test('Criar artigo via API', async ({ request }) => {
    const article = buildArticleData(articleBase);
    const response = await createArticleAPI(request, article);
    await console.log('Artigo criado:', response);
});
