# Automação de Testes – Conduit com Playwright

Projeto de portfólio de automação de testes E2E e de API para a aplicação **[Conduit](https://conduit.bondaracademy.com)** (clone do Medium, baseado no projeto RealWorld), utilizando **Playwright + TypeScript** e o padrão **Page Object Model (POM)**.

O repositório contém tanto a **documentação formal dos casos de teste** (CT001–CT017) quanto a **automação** desses cenários.

## O que é testado

| Módulo                   | Casos documentados | Automação                                                   |
| ------------------------ | ------------------ | ----------------------------------------------------------- |
| Autenticação             | CT001 – CT004      | Login válido, login inválido e logout                       |
| Feed e navegação         | CT005 – CT008      | Global Feed, Your Feed, filtro por tag e abertura de artigo |
| CRUD de artigo           | CT009 – CT012      | Criar, editar, excluir e validar campos obrigatórios        |
| Favoritar / desfavoritar | CT013 – CT014      | Apenas documentado                                          |
| Settings e logout        | CT015 – CT017      | Apenas documentado (logout coberto em `login.spec.ts`)      |
| API                      | –                  | Login e criação de artigo via API                           |

A matriz de cobertura completa está em [docs/matriz-cobertura-casosdeteste.md](docs/matriz-cobertura-casosdeteste.md).

## Tecnologias

- [Playwright Test](https://playwright.dev/) `^1.59`
- TypeScript
- Node.js
- Navegadores: Chromium, Firefox e WebKit

## Estrutura do projeto

```
.
├── docs/                  # Casos de teste documentados (CT00X) e matriz de cobertura
├── fixtures/
│   └── page-object.ts     # Fixture customizada que injeta todos os Page Objects em `pages`
├── pages/                 # Page Objects (Home, Login, Editor, Article, Profile, Settings)
├── test-data/             # Massa de dados fixa em JSON (credenciais e artigos)
├── tests/
│   ├── api/               # Testes de API (login e criação de artigo)
│   └── e2e/               # Testes de interface (login, feed, CRUD de artigo)
├── utils/                 # Helpers: autenticação via API e geração/criação de artigos
├── playwright.config.ts   # Configuração do Playwright
└── package.json           # Dependências e scripts
```

### Decisões de arquitetura

- **Page Object Model:** cada página da aplicação tem uma classe em `pages/` com suas ações (`clickSignIn`, `publishArticle`, ...) e validações (`validateLoginSuccess`, ...). Os testes apenas orquestram essas chamadas.
- **Fixture `pages`:** em vez de instanciar os Page Objects em cada teste, a fixture em [fixtures/page-object.ts](fixtures/page-object.ts) os disponibiliza prontos:

  ```ts
  import { test } from '../../fixtures/page-object';

  test('Login com credenciais validas', async ({ pages }) => {
      await pages.homePage.navigate();
      await pages.homePage.clickSignIn();
      await pages.loginPage.login(email, password);
      await pages.homePage.validateLoginSuccess();
  });
  ```

- **Dados híbridos:** credenciais e conteúdo base ficam em JSON (`test-data/`); títulos de artigos recebem um sufixo único (timestamp + aleatório) via `buildArticleData`, evitando conflito entre execuções paralelas.
- **Setup via API:** os testes de edição e exclusão criam o artigo diretamente pela API (`createArticleAPI`), deixando o teste de UI focado apenas no comportamento sob teste e tornando-o mais rápido e estável.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm
- Acesso à internet (os testes rodam contra a aplicação pública `https://conduit.bondaracademy.com` e a API `https://conduit-api.bondaracademy.com`)

## Instalação

```bash
git clone https://github.com/Toledo02/automacao-playwright-conduit
cd automacao-playwright-conduit
npm install
npx playwright install --with-deps
```

O último comando baixa os navegadores usados pelo Playwright.

## Configuração da massa de dados

Os testes usam uma conta já cadastrada no Conduit, definida em [test-data/login.json](test-data/login.json):

```json
{
  "loginValido":   { "email": "...", "password": "..." },
  "loginInvalido": { "email": "...", "password": "senha-incorreta" }
}
```

Para usar sua própria conta:

1. Crie um usuário em https://conduit.bondaracademy.com/register.
2. Atualize `test-data/login.json` com o e-mail e a senha.
3. Atualize o `username` em [test-data/article.json](test-data/article.json) e o valor padrão de `validateLoginSuccess` em [pages/HomePage.ts](pages/HomePage.ts), que verifica o nome do usuário exibido no menu após o login.

## Executando os testes

| Comando                 | Descrição                                         |
| ----------------------- | ------------------------------------------------- |
| `npm test`              | Executa todos os testes nos três navegadores      |
| `npm run test:chromium` | Executa apenas no Chromium                        |
| `npm run test:firefox`  | Executa apenas no Firefox                         |
| `npm run test:webkit`   | Executa apenas no WebKit                          |
| `npm run test:headed`   | Executa com o navegador visível                   |
| `npm run test:ui`       | Abre o modo interativo (UI Mode) do Playwright    |
| `npm run test:debug`    | Executa com o Playwright Inspector para depuração |
| `npm run test:list`     | Lista os testes sem executá-los                   |
| `npm run test:report`   | Abre o relatório HTML da última execução          |

Também é possível rodar um arquivo ou teste específico:

```bash
npx playwright test tests/e2e/login.spec.ts
npx playwright test -g "Excluir artigo proprio" --project=chromium
```

## Relatórios e evidências

Configurados em [playwright.config.ts](playwright.config.ts):

- **Relatório HTML** em `playwright-report/` (abra com `npm run test:report`)
- **Relatório JSON** em `test-results/results.json`
- **Screenshot, vídeo e trace** salvos em `test-results/<nome-do-teste>/` apenas quando um teste falha
- **Retries:** 1 localmente e 2 em CI; em CI a execução usa 1 worker e bloqueia `test.only`

Para inspecionar um trace de falha:

```bash
npx playwright show-trace test-results/<nome-do-teste>/trace.zip
```

## Documentação dos casos de teste

Cada módulo possui um arquivo em `docs/` seguindo o mesmo modelo: objetivo, pré-condições, tabela de passos (Ação / Resultado esperado) e tabela de resultados.

- [Autenticação](docs/autenticacao-casosdeteste.md)
- [Feed e navegação](docs/feed-navegacao-casosdeteste.md)
- [CRUD de artigos](docs/artigos-crud-casosdeteste.md)
- [Interações (favoritos)](docs/interacoes-casosdeteste.md)
- [Settings](docs/settings-casosdeteste.md)
- [Matriz de cobertura](docs/matriz-cobertura-casosdeteste.md)

## Autor

Gustavo Toledo
