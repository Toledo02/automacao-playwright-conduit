import { test, expect } from '../../fixtures/page-object';
import { login } from '../../utils/Auth';
import { loginValido } from '../../test-data/login.json';

test('Login via API', async ({ request }) => {
    const token = await login(request, loginValido.email, loginValido.password);

    expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
});
