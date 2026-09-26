# Matriz de Cobertura

| Funcionalidade              | Casos de Teste             | Prioridade | Observacao                                        |
| --------------------------- | -------------------------- | ---------- | ------------------------------------------------- |
| Autenticacao (login/logout) | CT001, CT002, CT003        | Alta       | Cobre fluxo feliz e validacao de erro             |
| Feed e navegacao de artigos | CT004, CT005, CT006, CT007 | Alta       | Cobre feed global, feed pessoal, tags e detalhes  |
| CRUD de artigo              | CT008, CT009, CT010, CT011 | Alta       | Cobre criar, editar, excluir e validacoes         |
| Curtir e descurtir artigo   | CT012, CT013               | Media      | Cobre alteracao de estado e contador de favoritos |
| Settings e logout           | CT014, CT015, CT016        | Alta       | Cobre atualizacao de perfil, senha e logout       |

## Rastreamento CT -> automacao

| CT    | Cenario                                    | Arquivo de automacao            | Status          |
| ----- | ------------------------------------------ | ------------------------------- | --------------- |
| CT001 | Login com credenciais validas              | tests/e2e/login.spec.ts         | Automatizado    |
| CT002 | Login com credenciais invalidas            | tests/e2e/login.spec.ts         | Automatizado    |
| CT003 | Logout de usuario autenticado              | tests/e2e/login.spec.ts         | Automatizado    |
| CT004 | Visualizar Global Feed na Home             | tests/e2e/feed-navigation.spec.ts | Automatizado  |
| CT005 | Alternar para Your Feed apos login         | tests/e2e/feed-navigation.spec.ts | Automatizado  |
| CT006 | Filtrar artigos por tag popular            | tests/e2e/feed-navigation.spec.ts | Automatizado  |
| CT007 | Abrir detalhes de artigo a partir do feed  | tests/e2e/feed-navigation.spec.ts | Automatizado  |
| CT008 | Criar novo artigo com dados validos        | tests/e2e/articles-crud.spec.ts | Automatizado    |
| CT009 | Editar artigo proprio                      | tests/e2e/articles-crud.spec.ts | Automatizado    |
| CT010 | Excluir artigo proprio                     | tests/e2e/articles-crud.spec.ts | Automatizado    |
| CT011 | Validar campos obrigatorios ao publicar    | tests/e2e/articles-crud.spec.ts | Automatizado    |
| CT012 | Favoritar artigo no feed                   | -                               | Nao automatizado |
| CT013 | Desfavoritar artigo previamente favoritado | -                               | Nao automatizado |
| CT014 | Atualizar informacoes de perfil em Settings | -                              | Nao automatizado |
| CT015 | Atualizar senha em Settings                | -                               | Nao automatizado |
| CT016 | Logout pela tela de Settings               | tests/e2e/login.spec.ts         | Automatizado (mesmo teste do CT003) |

Os testes automatizados trazem o ID do CT no titulo (ex.: `CT008 - Criar novo artigo com dados validos`), permitindo filtrar a execucao com `--grep "CT008"`.
