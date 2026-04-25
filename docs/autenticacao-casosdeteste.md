## **CT001: Cadastro com dados validos**

#### **Objetivo**
Validar que um novo usuario consegue criar conta com dados validos e acessa area autenticada.

#### **Pre-condicoes**
- Aplicacao Conduit acessivel
- Usuario ainda nao cadastrado para o email utilizado no teste
- Navegador iniciado sem sessao autenticada

#### **Passos**
| Id | Acao | Resultado Esperado |
| --- | --- | --- |
| 1 | Acessar a pagina de cadastro (/register) | Formulario de cadastro exibido com campos obrigatorios |
| 2 | Preencher username, email e password validos | Campos aceitam os dados sem erro visual |
| 3 | Clicar em Sign up | Requisicao de cadastro enviada com sucesso |
| 4 | Validar a area logada | Usuario redirecionado para Home com opcoes de usuario autenticado |

#### **Resultados**
| Resultado Obtido | Status |
| --- | --- |
| Formulario de cadastro foi exibido com campos obrigatorios | Sucesso |
| Campos aceitaram username, email e password validos | Sucesso |
| Cadastro foi concluido com sucesso | Sucesso |
| Usuario foi redirecionado para Home autenticada | Sucesso |

---
## **CT002: Login com credenciais validas**

#### **Objetivo**
Validar que um usuario existente consegue autenticar com email e senha validos.

#### **Pre-condicoes**
- Usuario previamente cadastrado e ativo
- Aplicacao Conduit acessivel
- Navegador iniciado sem sessao autenticada

#### **Passos**
| Id | Acao | Resultado Esperado |
| --- | --- | --- |
| 1 | Acessar a pagina de login (/login) | Formulario de login exibido |
| 2 | Preencher email e password validos | Campos preenchidos corretamente |
| 3 | Clicar em Sign in | Login processado sem erro |
| 4 | Validar estado autenticado | Navbar exibe opcoes de usuario logado e feed pessoal disponivel |

#### **Resultados**
| Resultado Obtido | Status |
| --- | --- |
| Formulario de login foi exibido | Sucesso |
| Email e senha foram preenchidos corretamente | Sucesso |
| Login foi processado sem erro | Sucesso |
| Usuario ficou autenticado com opcoes de sessao ativa | Sucesso |

---
## **CT003: Login com credenciais invalidas**

#### **Objetivo**
Validar que o sistema bloqueia autenticacao quando a senha informada e invalida.

#### **Pre-condicoes**
- Usuario existente para o email informado
- Aplicacao Conduit acessivel
- Navegador iniciado sem sessao autenticada

#### **Passos**
| Id | Acao | Resultado Esperado |
| --- | --- | --- |
| 1 | Acessar a pagina de login (/login) | Formulario de login exibido |
| 2 | Preencher email valido e password invalida | Campos preenchidos com dados do cenario negativo |
| 3 | Clicar em Sign in | Sistema tenta autenticar e retorna erro |
| 4 | Validar mensagem de falha | Mensagem de credenciais invalidas exibida e usuario permanece deslogado |

#### **Resultados**
| Resultado Obtido | Status |
| --- | --- |
| Formulario de login foi exibido | Sucesso |
| Dados do cenario negativo foram informados | Sucesso |
| Tentativa de login retornou erro esperado | Sucesso |
| Mensagem de falha foi exibida e sessao nao foi criada | Sucesso |

---
## **CT004: Logout de usuario autenticado**

#### **Objetivo**
Validar que um usuario autenticado consegue encerrar sessao pelo fluxo de logout.

#### **Pre-condicoes**
- Usuario autenticado na aplicacao
- Pagina inicial acessivel apos login

#### **Passos**
| Id | Acao | Resultado Esperado |
| --- | --- | --- |
| 1 | Acessar Settings pelo menu superior | Pagina de configuracoes exibida |
| 2 | Clicar em Or click here to logout | Sessao do usuario encerrada |
| 3 | Validar estado nao autenticado | Navbar volta a exibir links Sign in e Sign up |
| 4 | Tentar acessar area privada novamente | Usuario e redirecionado para login ou permanece sem acesso autenticado |

#### **Resultados**
| Resultado Obtido | Status |
| --- | --- |
| Pagina de configuracoes foi exibida corretamente | Sucesso |
| Logout encerrou a sessao do usuario | Sucesso |
| Navbar voltou para estado anonimo | Sucesso |
| Areas privadas ficaram inacessiveis sem nova autenticacao | Sucesso |

---
