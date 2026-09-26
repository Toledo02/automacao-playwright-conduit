## **CT001: Login com credenciais validas**

#### **Objetivo**
Validar que um usuario existente consegue autenticar com email e senha validos.

#### **Pre-condicoes**
- Usuario previamente cadastrado e ativo
- Aplicacao Conduit acessivel
- Navegador iniciado sem sessao autenticada

#### **Passos**
| Id  | Acao                               | Resultado Esperado                                              |
| --- | ---------------------------------- | --------------------------------------------------------------- |
| 1   | Acessar a pagina de login (/login) | Formulario de login exibido                                     |
| 2   | Preencher email e password validos | Campos preenchidos corretamente                                 |
| 3   | Clicar em Sign in                  | Login processado sem erro                                       |
| 4   | Validar estado autenticado         | Navbar exibe opcoes de usuario logado e feed pessoal disponivel |

#### **Resultados**
| Resultado Obtido                                     | Status  |
| ---------------------------------------------------- | ------- |
| Formulario de login foi exibido                      | Sucesso |
| Email e senha foram preenchidos corretamente         | Sucesso |
| Login foi processado sem erro                        | Sucesso |
| Usuario ficou autenticado com opcoes de sessao ativa | Sucesso |

---
## **CT002: Login com credenciais invalidas**

#### **Objetivo**
Validar que o sistema bloqueia autenticacao quando a senha informada e invalida.

#### **Pre-condicoes**
- Usuario existente para o email informado
- Aplicacao Conduit acessivel
- Navegador iniciado sem sessao autenticada

#### **Passos**
| Id  | Acao                                       | Resultado Esperado                                                      |
| --- | ------------------------------------------ | ----------------------------------------------------------------------- |
| 1   | Acessar a pagina de login (/login)         | Formulario de login exibido                                             |
| 2   | Preencher email valido e password invalida | Campos preenchidos com dados do cenario negativo                        |
| 3   | Clicar em Sign in                          | Sistema tenta autenticar e retorna erro                                 |
| 4   | Validar mensagem de falha                  | Mensagem de credenciais invalidas exibida e usuario permanece deslogado |

#### **Resultados**
| Resultado Obtido                                      | Status  |
| ----------------------------------------------------- | ------- |
| Formulario de login foi exibido                       | Sucesso |
| Dados do cenario negativo foram informados            | Sucesso |
| Tentativa de login retornou erro esperado             | Sucesso |
| Mensagem de falha foi exibida e sessao nao foi criada | Sucesso |

---
## **CT003: Logout de usuario autenticado**

#### **Objetivo**
Validar que um usuario autenticado consegue encerrar sessao pelo fluxo de logout.

#### **Pre-condicoes**
- Usuario autenticado na aplicacao
- Pagina inicial acessivel apos login

#### **Passos**
| Id  | Acao                                  | Resultado Esperado                                                     |
| --- | ------------------------------------- | ---------------------------------------------------------------------- |
| 1   | Acessar Settings pelo menu superior   | Pagina de configuracoes exibida                                        |
| 2   | Clicar em Or click here to logout     | Sessao do usuario encerrada                                            |
| 3   | Validar estado nao autenticado        | Navbar volta a exibir links Sign in e Sign up                          |
| 4   | Tentar acessar area privada novamente | Usuario e redirecionado para login ou permanece sem acesso autenticado |

#### **Resultados**
| Resultado Obtido                                          | Status  |
| --------------------------------------------------------- | ------- |
| Pagina de configuracoes foi exibida corretamente          | Sucesso |
| Logout encerrou a sessao do usuario                       | Sucesso |
| Navbar voltou para estado anonimo                         | Sucesso |
| Areas privadas ficaram inacessiveis sem nova autenticacao | Sucesso |

---
