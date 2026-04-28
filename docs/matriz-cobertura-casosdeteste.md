# Matriz de Cobertura - Fase 1

| Funcionalidade                         | Casos de Teste             | Prioridade | Observacao                                        |
| -------------------------------------- | -------------------------- | ---------- | ------------------------------------------------- |
| Autenticacao (cadastro, login, logout) | CT001, CT002, CT003, CT004 | Alta       | Cobre fluxo feliz e validacao de erro             |
| Feed e navegacao de artigos            | CT005, CT006, CT007, CT008 | Alta       | Cobre feed global, feed pessoal, tags e detalhes  |
| CRUD de artigo                         | CT009, CT010, CT011, CT012 | Alta       | Cobre criar, editar, excluir e validacoes         |
| Curtir e descurtir artigo              | CT013, CT014               | Media      | Cobre alteracao de estado e contador de favoritos |
| Settings e logout                      | CT015, CT016, CT017        | Alta       | Cobre atualizacao de perfil, senha e logout       |

## Rastreamento inicial CT -> futura automacao

| CT          | Sugestao de arquivo de automacao |
| ----------- | -------------------------------- |
| CT001-CT004 | tests/auth.spec.ts               |
| CT005-CT008 | tests/feed-navigation.spec.ts    |
| CT009-CT012 | tests/article-crud.spec.ts       |
| CT013-CT014 | tests/favorites.spec.ts          |
| CT015-CT017 | tests/settings.spec.ts           |
