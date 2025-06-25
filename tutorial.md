### Preparando o ambiente de desenvolvimento:

- Na raíz do projeto, crie um arquivo chamado `.env` e adicione as variáveis de ambiente disponíveis no arquivo `.env.example` como exemplo.

  ```bash
  DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"
  JWT_SECRET="secret"
  POSTGRES_USER=example_user
  POSTGRES_PASSWORD=example_password
  POSTGRES_DB=example_db
  ```

- Execute o banco de dados PostgreSQL usando Docker. Use o seguinte comando na raíz do projeto:

  ```bash
  docker-compose up -d
  ```

- Execute o Prisma:

  ```bash
  npx prisma migrate dev --name init
  ```

- Execute a API:

  ```bash
  npm run start:dev
  ```

- Entre no Doker Desktop e inicie o Banco de Dados
