# 🌍 Plataforma de Turismo – BoraTur

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)
![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/jwt-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/bcrypt-grey?style=for-the-badge)

<img src="./src/assets/boratur.png" alt="Image" height="150" style="display: block; margin: 40px auto;">

## 🧠 Sobre:

Este repositório contém o desenvolvimento de uma API REST voltada à gestão de empreendimentos turísticos. A plataforma permite o cadastro, consulta, atualização e exclusão (CRUD) de dados relacionados a empresas e serviços turísticos, como hotéis, atrativos turísticos e outros.

## 🖥️ Tecnologias utilizadas:

**Node.js / NestJs**

**PostgreSQL / Prisma (ORM)**

**Docker-Compose / Class-Validator**

**JWT para autenticação / Bcrypyt**

## 📋 Pré-Requisitos:

- Antes de começar, você precisa ter instalado:
- [Node.js](https://nodejs.org/)

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

- [Tutorial Node.Js](https://www.youtube.com/watch?v=-jft_9PlffQ)

- [Tutorial Docker](https://www.youtube.com/watch?v=WrV5N28Uh0o)

## 📦 Instalação:

**Iniciar o Projeto:**

- Clone este repositório no git bash.

```bash
git clone https://github.com/amaralneto10/amotur-squad-1-nestjs.git
```

- Execute no terminal.

```bash
npm i
```

## 👨‍💻 Uso

- Para configurar o ambiente de desenvolvimento e executar o projeto localmente, acesse o [Tutorial](./tutorial.md)

## 📍API Endpoints:

A API fornece os seguintes endpoints:

**POST REGISTER USER**

```markdown
POST /auth/register - Rota de Registro de Turista
```

```json
{
  "name": "Pedro",
  "email": "pedro@gmail.com",
  "phone": "+5588990023665",
  "password": "P123456@"
}
```

**POST REGISTER ADMIN**

```markdown
POST /auth/register-admin - Rota de Registro de Admin
```

```json
{
  "name": "Pedro",
  "email": "pedro@gmail.com",
  "password": "P123456@"
}
```

**POST LOGIN**

```markdown
POST /auth/login - Rota de Login (para admin e turista)
```

```json
{
  "email": "pedro@gmail.com",
  "password": "P123456@"
}
```

**POST CREATE PLACE**

```markdown
POST /places/createPlace - Criar locais
```

```json
{
  "name": "Grills burguer",
  "description": "hamburgueria, a melhor da cidade",
  "address": {
    "logradouro": "Rua Francisco Tomé",
    "numero": 501,
    "bairro": "Centro",
    "complemento": "Vizinho ao milk jhon"
  },
  "latitude": -23.55052,
  "longitude": -46.633308,
  "type": "hamburgueria",
  "rating": 4.5
}
```

**GET ALL PLACES**

```markdown
GET /places/getPlaces - Listar Locais
```

```json
{
  "name": "Grills burguer",
  "description": "hamburgueria, a melhor da cidade",
  "address": {
    "logradouro": "Rua Francisco Tomé",
    "numero": 501,
    "bairro": "Centro",
    "complemento": "Vizinho ao milk jhon"
  },
  "latitude": -23.55052,
  "longitude": -46.633308,
  "type": "hamburgueria",
  "rating": 4.5
}
```

**GET PLACE BY TYPE**

```markdown
GET /places/:type - Filtrar Locais Por Tipo
```

```json
{
  "name": "Grills burguer",
  "description": "hamburgueria, a melhor da cidade",
  "address": {
    "logradouro": "Rua Francisco Tomé",
    "numero": 501,
    "bairro": "Centro",
    "complemento": "Vizinho ao milk jhon"
  },
  "latitude": -23.55052,
  "longitude": -46.633308,
  "type": "hamburgueria",
  "rating": 4.5
}
```

**UPDATE PLACE**

```markdown
PUT /places/:id - Atualizar Local Por Id
```

```json
{
  "name": "Grills Burguer",?
  "description": "hamburgueria, a melhor da cidade",?
  "address": {
    "logradouro": "Rua Francisco Tomé",?
    "numero": 501,?
    "bairro": "Centro",?
    "complemento": "Vizinho ao milk jhon",?
  },
  "latitude": -23.55052,?
  "longitude": -46.633308,?
  "type": "hamburgueria",?
  "rating": 4.7,?
}
```

**DELETE PLACE**

```markdown
DELETE /places/:id - Deletar Local Por Id
```

## 👥 Equipe

| [<img src="https://avatars.githubusercontent.com/u/189528881?v=4"><br><strong>Amaral Neto</strong>](https://github.com/amaralneto10) | [<img src="https://avatars.githubusercontent.com/u/197404558?v=4"><br><strong>Bianca Lucas</strong>](https://github.com/bianca-lucas) | [<img src="https://avatars.githubusercontent.com/u/206602577?v=4"><br><strong>Felipe Carneiro</strong>](https://github.com/felipechaves10) | [<img src="https://avatars.githubusercontent.com/u/206603036?s=400&u=7b60aec9f3fb45a4cc5ddb653cc070bc1f20b869&v=4"><br><strong>Pedro Henrique</strong>](https://github.com/PedroMoreno07) |
| :----------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
