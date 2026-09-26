import { APIRequestContext, expect } from '@playwright/test';
import { login } from './Auth';
import { loginValido } from '../test-data/login.json';

type ArticleData = {
    title: string;
    about: string;
    body: string;
    tags: string[];
};

export function buildArticleData(articleBase: ArticleData) {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    return {
        title: `${articleBase.title} ${uniqueId}`,
        about: `${articleBase.about} ${uniqueId}`,
        body: `${articleBase.body} ${uniqueId}`,
        tags: articleBase.tags,
    };
};

export function buildUpdatedData(articleUpdate: any) {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    return {
        title: `${articleUpdate.title} ${uniqueId}`,
        about: `${articleUpdate.about} ${uniqueId}`,
        body: `${articleUpdate.body} ${uniqueId}`,
    };
};

const articlesUrl = 'https://conduit-api.bondaracademy.com/api/articles';

async function authHeaders(request: APIRequestContext) {
    const token = await login(request, loginValido.email, loginValido.password);

    return {
        'content-type': 'application/json',
        'Authorization': `Token ${token}`,
    };
}

export function getSlugFromUrl(url: string) {
    return url.split('/article/')[1];
}

export async function createArticleAPI(request: APIRequestContext, article: ArticleData) {
    const payload = {
        article: {
            title: article.title,
            description: article.about,
            body: article.body,
            tagList: article.tags,
        },
    };

    const response = await request.post(`${articlesUrl}/`, {
        headers: await authHeaders(request),
        data: payload,
    });
    await expect(response, 'Falha ao criar artigo via API').toBeOK();

    return await response.json();
}

export async function deleteArticleAPI(request: APIRequestContext, slug: string) {
    return await request.delete(`${articlesUrl}/${slug}`, {
        headers: await authHeaders(request),
    });
}
