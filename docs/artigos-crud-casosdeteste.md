## **CT009: Criar novo artigo com dados validos**

#### **Objetivo**
Validar que usuario autenticado consegue publicar um novo artigo com sucesso.

#### **Pre-condicoes**
- Usuario autenticado na aplicacao
- Acesso ao menu New Article disponivel

#### **Passos**
| Id | Acao | Resultado Esperado |
| --- | --- | --- |
| 1 | Clicar em New Article no menu superior | Pagina de editor de artigo exibida |
| 2 | Preencher Title, About, Body e Tags com dados validos | Campos preenchidos sem erro de validacao |
| 3 | Clicar em Publish Article | Artigo e publicado com sucesso |
| 4 | Validar pagina de detalhe do artigo | Titulo, conteudo e dados do autor exibidos |
| 5 | Validar acoes de dono do artigo | Botoes Edit Article e Delete Article ficam visiveis |

#### **Resultados**
| Resultado Obtido | Status |
| --- | --- |
| Editor de artigo foi exibido | Sucesso |
| Campos foram preenchidos com dados validos | Sucesso |
| Artigo foi publicado com sucesso | Sucesso |
| Pagina de detalhe exibiu titulo e conteudo corretos | Sucesso |
| Acoes de dono do artigo foram exibidas | Sucesso |

---
## **CT010: Editar artigo proprio**

#### **Objetivo**
Validar que o autor consegue editar um artigo publicado anteriormente.

#### **Pre-condicoes**
- Usuario autenticado
- Usuario possui ao menos um artigo publicado

#### **Passos**
| Id | Acao | Resultado Esperado |
| --- | --- | --- |
| 1 | Acessar a pagina de detalhe de um artigo proprio | Artigo carregado com acoes de autor |
| 2 | Clicar em Edit Article | Editor aberto com dados atuais do artigo |
| 3 | Alterar titulo e/ou corpo do artigo | Novos valores preenchidos |
| 4 | Clicar em Publish Article para salvar | Alteracoes persistidas |
| 5 | Validar pagina final do artigo | Conteudo atualizado visivel para leitura |

#### **Resultados**
| Resultado Obtido | Status |
| --- | --- |
| Artigo proprio foi carregado com acoes de autor | Sucesso |
| Editor abriu com dados pre-carregados | Sucesso |
| Alteracoes foram inseridas nos campos | Sucesso |
| Salvar publicou versao atualizada do artigo | Sucesso |
| Conteudo atualizado foi exibido na pagina final | Sucesso |

---
## **CT011: Excluir artigo proprio**

#### **Objetivo**
Validar que o autor consegue excluir um artigo proprio e removelo da listagem.

#### **Pre-condicoes**
- Usuario autenticado
- Usuario possui artigo publicado para exclusao

#### **Passos**
| Id | Acao | Resultado Esperado |
| --- | --- | --- |
| 1 | Acessar a pagina de detalhe do artigo proprio | Pagina do artigo carregada |
| 2 | Clicar em Delete Article | Artigo e removido do sistema |
| 3 | Validar redirecionamento apos exclusao | Usuario retorna para Home ou pagina padrao |
| 4 | Procurar artigo removido no perfil/My Articles | Artigo excluido nao aparece mais na lista |

#### **Resultados**
| Resultado Obtido | Status |
| --- | --- |
| Pagina do artigo foi carregada corretamente | Sucesso |
| Exclusao foi executada com sucesso | Sucesso |
| Redirecionamento ocorreu sem erro | Sucesso |
| Artigo nao apareceu mais no perfil do autor | Sucesso |

---
## **CT012: Validar campos obrigatorios ao publicar artigo**

#### **Objetivo**
Validar mensagens de erro quando usuario tenta publicar artigo sem preencher campos obrigatorios.

#### **Pre-condicoes**
- Usuario autenticado
- Acesso ao editor de artigo disponivel

#### **Passos**
| Id | Acao | Resultado Esperado |
| --- | --- | --- |
| 1 | Acessar New Article | Editor de artigo exibido |
| 2 | Deixar campos obrigatorios vazios (ex.: Title e Body) | Campos permanecem sem preenchimento |
| 3 | Clicar em Publish Article | Submissao bloqueada ou retorna erro de validacao |
| 4 | Validar mensagens de erro | Sistema exibe mensagens relacionadas aos campos faltantes |
| 5 | Validar permanencia no editor | Usuario permanece na tela para corrigir dados |

#### **Resultados**
| Resultado Obtido | Status |
| --- | --- |
| Editor de artigo foi exibido | Sucesso |
| Campos obrigatorios ficaram vazios conforme cenario | Sucesso |
| Tentativa de publicacao foi bloqueada/invalidada | Sucesso |
| Mensagens de erro de validacao foram exibidas | Sucesso |
| Usuario permaneceu no editor para correcao | Sucesso |

---
