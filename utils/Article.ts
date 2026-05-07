import { APIRequestContext } from '@playwright/test';
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

export async function createArticleAPI(request: APIRequestContext, article: ArticleData) {
    const url = 'https://conduit-api.bondaracademy.com/api/articles/';
    const token = await login(request, loginValido.email, loginValido.password);

    const payload = {
        article: {
            title: article.title,
            description: article.about,
            body: article.body,
            tagList: article.tags,
        },
    };

    const response = await request.post(url, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        data: payload,
    });

    return await response.json();
}
