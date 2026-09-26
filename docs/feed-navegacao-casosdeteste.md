## **CT004: Visualizar Global Feed na Home**

#### **Objetivo**
Validar que a Home exibe o Global Feed com lista de artigos para usuario nao autenticado.

#### **Pre-condicoes**
- Aplicacao Conduit acessivel
- Navegador iniciado sem sessao autenticada

#### **Passos**
| Id  | Acao                       | Resultado Esperado                                          |
| --- | -------------------------- | ----------------------------------------------------------- |
| 1   | Acessar a Home (/)         | Pagina inicial carregada com banner e abas de feed          |
| 2   | Selecionar aba Global Feed | Aba Global Feed fica ativa                                  |
| 3   | Observar lista de artigos  | Cards de artigos sao exibidos com titulo, descricao e autor |
| 4   | Validar paginacao/listagem | Lista permite navegacao pelos artigos disponiveis           |

#### **Resultados**
| Resultado Obtido                              | Status  |
| --------------------------------------------- | ------- |
| Home foi carregada com componentes principais | Sucesso |
| Aba Global Feed ficou ativa                   | Sucesso |
| Lista de artigos foi exibida com metadados    | Sucesso |
| Navegacao da listagem esteve disponivel       | Sucesso |

---
## **CT005: Alternar para Your Feed apos login**

#### **Objetivo**
Validar que usuario autenticado consegue alternar da aba Global Feed para Your Feed.

#### **Pre-condicoes**
- Usuario autenticado na aplicacao
- Home carregada

#### **Passos**
| Id  | Acao                           | Resultado Esperado                           |
| --- | ------------------------------ | -------------------------------------------- |
| 1   | Acessar a Home apos autenticar | Home exibida em estado autenticado           |
| 2   | Clicar na aba Your Feed        | Aba Your Feed fica ativa                     |
| 3   | Validar conteudo do feed       | Lista corresponde ao feed pessoal do usuario |
| 4   | Voltar para Global Feed        | Sistema permite alternar entre abas sem erro |

#### **Resultados**
| Resultado Obtido                          | Status  |
| ----------------------------------------- | ------- |
| Home em estado autenticado foi exibida    | Sucesso |
| Aba Your Feed ficou ativa apos clique     | Sucesso |
| Conteudo do feed pessoal foi carregado    | Sucesso |
| Alternancia entre abas funcionou sem erro | Sucesso |

---
## **CT006: Filtrar artigos por tag popular**

#### **Objetivo**
Validar que ao selecionar uma tag popular o feed e filtrado para artigos relacionados.

#### **Pre-condicoes**
- Home carregada com secao Popular Tags visivel
- Pelo menos uma tag disponivel

#### **Passos**
| Id  | Acao                                            | Resultado Esperado                                  |
| --- | ----------------------------------------------- | --------------------------------------------------- |
| 1   | Acessar a Home                                  | Secao Popular Tags exibida                          |
| 2   | Clicar em uma tag da lista                      | Aba/tag selecionada fica ativa no feed              |
| 3   | Validar cards retornados                        | Artigos exibidos estao relacionados a tag escolhida |
| 4   | Remover filtro de tag (voltar para Global Feed) | Feed geral volta a ser exibido                      |

#### **Resultados**
| Resultado Obtido                              | Status  |
| --------------------------------------------- | ------- |
| Secao Popular Tags foi exibida                | Sucesso |
| Tag escolhida foi aplicada como filtro        | Sucesso |
| Cards retornados ficaram coerentes com a tag  | Sucesso |
| Feed geral foi restaurado apos remover filtro | Sucesso |

---
## **CT007: Abrir detalhes de artigo a partir do feed**

#### **Objetivo**
Validar que ao selecionar um artigo no feed o usuario acessa a pagina de detalhes corretamente.

#### **Pre-condicoes**
- Home carregada com ao menos um artigo listavel

#### **Passos**
| Id  | Acao                                       | Resultado Esperado                                   |
| --- | ------------------------------------------ | ---------------------------------------------------- |
| 1   | Acessar a Home                             | Feed de artigos exibido                              |
| 2   | Clicar no titulo do artigo ou em Read more | Usuario e direcionado para a pagina do artigo        |
| 3   | Validar conteudo principal                 | Titulo, corpo, autor e metadata do artigo visiveis   |
| 4   | Validar secao de comentarios               | Area de comentarios carregada para leitura/interacao |

#### **Resultados**
| Resultado Obtido                            | Status  |
| ------------------------------------------- | ------- |
| Feed inicial foi exibido corretamente       | Sucesso |
| Navegacao para detalhes do artigo funcionou | Sucesso |
| Conteudo principal do artigo foi exibido    | Sucesso |
| Secao de comentarios foi carregada          | Sucesso |

---
