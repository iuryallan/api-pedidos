# Desafio Técnico Jitterbit - API de Pedidos

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

Este repositório contém a solução para o desafio técnico da **Jitterbit**. Trata-se de uma API RESTful para o gerenciamento de pedidos e seus respectivos itens, desenvolvida em **Node.js** com **Express** e banco de dados **PostgreSQL**.

## Funcionalidades Implementadas

- **CRUD Completo de Pedidos**: Criação, listagem, busca por ID, atualização e exclusão.
- **Transações no Banco de Dados**: Uso de `BEGIN`, `COMMIT` e `ROLLBACK` para garantir a integridade dos dados ao salvar pedidos e itens simultaneamente.
- **Autenticação JWT (Bônus)**: Fluxo de registro e login de usuários com senhas criptografadas (`bcrypt`). As rotas de pedidos são protegidas por um middleware de autenticação.
- **Documentação Interativa (Bônus)**: Interface gráfica do Swagger implementada para testes rápidos diretamente pelo navegador.
- **Arquitetura Limpa**: Utilização do *Action Pattern* para modularizar Controllers, Services e Repositories, garantindo o princípio da responsabilidade única.

---

## Decisões Arquiteturais e Técnicas

Durante o desenvolvimento desta API, algumas escolhas foram feitas para priorizar a clareza, a demonstração de fundamentos e o escopo do desafio:

### 1. SQL Puro vs. ORM
Optou-se por **não utilizar um ORM** (como Prisma ou Sequelize). O uso do driver nativo `pg` com queries em SQL puro foi uma escolha deliberada para demonstrar domínio prático sobre a linguagem SQL, modelagem relacional e o controle manual de transações (ACID). As queries foram isoladas em arquivos específicos (pasta `queries`) para não poluir a lógica do repositório, mantendo o código limpo e de fácil manutenção. O arquivo de criação das tabelas pode ser consultado em `schema.sql`.

### 2. Autenticação Básica e Escopo
O requisito opcional pedia uma "autenticação básica". Foi implementado um fluxo real de JWT (registro, *hash* de senhas com bcrypt e validação via middleware). 
A decisão de **não vincular os usuários aos pedidos** (através de uma *Foreign Key*) foi intencional. O foco do desafio é a construção de um domínio sólido de pedidos. Criar um vínculo direto transformaria a aplicação em um sistema *multi-tenant*, adicionando uma camada de complexidade estrutural que foge ao escopo avaliado. A abordagem escolhida atende ao requisito de segurança (trancando as rotas da API) mantendo o código aderente aos princípios KISS (*Keep It Simple, Stupid*) e YAGNI (*You Aren't Gonna Need It*).

---

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
- [Node.js](https://nodejs.org/en/) (v16 ou superior)
- [PostgreSQL](https://www.postgresql.org/)

---

## Instalação e Configuração

**1. Clone o repositório**
```bash
git clone https://github.com/iuryallan/api-pedidos.git
```
```bash
cd api-pedidos
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure o Banco de Dados**
Crie um banco de dados no PostgreSQL e execute a query presente no `schema.sql` localizado na raiz do projeto para criar as tabelas necessárias.

**4. Configure as Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto e preencha com a porta que vai rodar o servidor, suas credenciais do PostgreSQL e sua chave JWT. Você pode verificar como fazer isso no arquivo `.env.example` ou abaixo:

```env
PORT=3000

DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome_do_banco

JWT_SECRET=chave_secreta_para_assinatura_do_token
```

---

## Executando a Aplicação

Para iniciar o servidor, execute o comando:

```bash
npm run dev
```

O servidor será iniciado na porta 3000 por padrão.

---

## Documentação (Swagger)

A API possui uma documentação visual e interativa onde é possível testar todos os endpoints.

Com o servidor rodando, acesse no seu navegador: **http://localhost:3000/api-docs**

**Como testar as rotas protegidas no Swagger:**
1. Utilize a rota `POST /register` para criar um usuário.
2. Utilize a rota `POST /login` com as mesmas credenciais para gerar o seu Token JWT.
3. Copie o token retornado.
4. Clique no botão verde **"Authorize"** no topo da página da documentação, cole o token e clique em "Authorize".
5. As rotas de gerenciamento de pedidos agora estarão desbloqueadas para testes.

---

## Estrutura do Projeto

```text
src/
├── config/         # Configuração de conexão com o banco
├── controllers/    # Controladores da API (Action Pattern)
├── middlewares/    # Interceptadores (Validação de Token JWT)
├── queries/        # Instruções SQL isoladas por domínio
├── repositories/   # Comunicação direta com o banco de dados
├── services/       # Regras de Negócio e criptografia
├── utils/          # Funções utilitárias (Data mapper)
├── index.js        # Ponto de entrada da aplicação
├── routes.js       # Definição das rotas do Express
└── swagger.json    # Configuração da documentação interativa
schema.sql          # Script de criação do banco de dados
```