## **CT013: Favoritar artigo no feed**

#### **Objetivo**
Validar que usuario autenticado consegue favoritar artigo pelo feed e atualizar contador.

#### **Pre-condicoes**
- Usuario autenticado
- Existe ao menos um artigo nao favoritado no feed

#### **Passos**
| Id  | Acao                                    | Resultado Esperado                                 |
| --- | --------------------------------------- | -------------------------------------------------- |
| 1   | Acessar a Home com sessao autenticada   | Feed de artigos carregado                          |
| 2   | Identificar artigo ainda nao favoritado | Botao de favorito aparece em estado inativo        |
| 3   | Clicar no botao de favorito do artigo   | Artigo e marcado como favoritado                   |
| 4   | Validar feedback visual e contador      | Botao muda para estado ativo e contador incrementa |

#### **Resultados**
| Resultado Obtido                           | Status  |
| ------------------------------------------ | ------- |
| Feed autenticado foi carregado             | Sucesso |
| Artigo nao favoritado foi identificado     | Sucesso |
| Acao de favoritar foi executada            | Sucesso |
| Estado visual e contador foram atualizados | Sucesso |

---
## **CT014: Desfavoritar artigo previamente favoritado**

#### **Objetivo**
Validar que usuario autenticado consegue remover favorito de artigo e decrementar contador.

#### **Pre-condicoes**
- Usuario autenticado
- Existe ao menos um artigo favoritado pelo usuario

#### **Passos**
| Id  | Acao                                        | Resultado Esperado                |
| --- | ------------------------------------------- | --------------------------------- |
| 1   | Acessar feed ou pagina do artigo favoritado | Artigo exibido com favorito ativo |
| 2   | Clicar novamente no botao de favorito       | Favorito e removido               |
| 3   | Validar estado final do botao               | Botao retorna ao estado inativo   |
| 4   | Validar contador de favoritos               | Contador decrementa em 1 unidade  |

#### **Resultados**
| Resultado Obtido                           | Status  |
| ------------------------------------------ | ------- |
| Artigo favoritado foi exibido corretamente | Sucesso |
| Remocao de favorito foi executada          | Sucesso |
| Botao voltou ao estado inativo             | Sucesso |
| Contador foi decrementado em 1             | Sucesso |

---
