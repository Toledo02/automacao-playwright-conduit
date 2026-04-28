## **CT015: Atualizar informacoes de perfil em Settings**

#### **Objetivo**
Validar que usuario autenticado consegue alterar dados de perfil pela tela de configuracoes.

#### **Pre-condicoes**
- Usuario autenticado
- Pagina Settings acessivel

#### **Passos**
| Id  | Acao                                                                    | Resultado Esperado                               |
| --- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| 1   | Acessar Settings pelo menu superior                                     | Tela de configuracoes exibida                    |
| 2   | Alterar campos de perfil (username, bio ou image URL) com dados validos | Campos recebem novos valores                     |
| 3   | Clicar em Update Settings                                               | Alteracoes salvas sem erro                       |
| 4   | Acessar perfil do usuario                                               | Dados atualizados refletidos na pagina de perfil |

#### **Resultados**
| Resultado Obtido                         | Status  |
| ---------------------------------------- | ------- |
| Tela Settings foi exibida                | Sucesso |
| Campos de perfil receberam novos valores | Sucesso |
| Alteracoes foram salvas com sucesso      | Sucesso |
| Perfil exibiu dados atualizados          | Sucesso |

---
## **CT016: Atualizar senha em Settings**

#### **Objetivo**
Validar que usuario autenticado consegue atualizar a senha e utilizar a nova credencial.

#### **Pre-condicoes**
- Usuario autenticado
- Usuario conhece senha atual valida para reteste de login

#### **Passos**
| Id  | Acao                                   | Resultado Esperado                        |
| --- | -------------------------------------- | ----------------------------------------- |
| 1   | Acessar Settings                       | Tela de configuracoes carregada           |
| 2   | Preencher novo valor no campo Password | Campo aceita a nova senha                 |
| 3   | Clicar em Update Settings              | Nova senha salva com sucesso              |
| 4   | Fazer logout                           | Sessao encerrada                          |
| 5   | Realizar login com a nova senha        | Login concluido com credencial atualizada |

#### **Resultados**
| Resultado Obtido                        | Status  |
| --------------------------------------- | ------- |
| Tela de configuracoes foi carregada     | Sucesso |
| Nova senha foi preenchida no formulario | Sucesso |
| Senha foi atualizada com sucesso        | Sucesso |
| Logout encerrou a sessao atual          | Sucesso |
| Login com nova senha foi concluido      | Sucesso |

---
## **CT017: Logout pela tela de Settings**

#### **Objetivo**
Validar que o botao de logout em Settings encerra sessao e retorna o usuario ao estado anonimo.

#### **Pre-condicoes**
- Usuario autenticado
- Pagina Settings acessivel

#### **Passos**
| Id  | Acao                              | Resultado Esperado                     |
| --- | --------------------------------- | -------------------------------------- |
| 1   | Acessar Settings                  | Tela de configuracoes exibida          |
| 2   | Clicar em Or click here to logout | Sessao encerrada                       |
| 3   | Validar navbar em estado anonimo  | Links Sign in e Sign up ficam visiveis |
| 4   | Tentar acessar New Article        | Usuario e impedido sem autenticacao    |

#### **Resultados**
| Resultado Obtido                        | Status  |
| --------------------------------------- | ------- |
| Tela de configuracoes foi exibida       | Sucesso |
| Acao de logout encerrou a sessao        | Sucesso |
| Navbar voltou ao estado anonimo         | Sucesso |
| Acesso a area autenticada foi bloqueado | Sucesso |

---
