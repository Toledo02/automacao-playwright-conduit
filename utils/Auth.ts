import { APIRequestContext, expect } from '@playwright/test';

export async function login(request: APIRequestContext, email: string, password: string) {
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {
                "email": email,
                "password": password
            }
        },
    });
    await expect(response, 'Falha no login via API').toBeOK();
    const responseBody = await response.json();
    return responseBody.user.token;
}
