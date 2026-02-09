# AI Coding Guidelines for Filmes API

## Architecture Overview
This is an Express.js REST API for managing films, using Prisma ORM with PostgreSQL. Follows MVC pattern:
- **Routes** (`src/routes/`): Define endpoints, delegate to controllers
- **Controllers** (`src/controllers/`): Handle requests, validate input, call models
- **Models** (`src/models/`): Interact with database via Prisma
- **Utils** (`src/utils/`): Shared utilities like Prisma client

Data flows: Request → Route → Controller (validation) → Model (Prisma query) → Response

## Key Workflows
- **Development**: `npm run dev` (nodemon src/server.js)
- **Database setup**: 
  - Schema changes: `npx prisma migrate dev --name <change>`
  - Generate client: `npx prisma generate`
  - Seed data: `npx prisma db seed`
  - View data: `npx prisma studio`
- **Reset DB** (dev only): `npx prisma migrate reset`

## Conventions & Patterns
- **Modules**: Use ES modules (`import/export`), no CommonJS
- **Validation**: Strict input validation in controllers (e.g., title ≥3 chars, duration 1-300 min, genres from fixed list: Ação, Drama, Comédia, Terror, Romance, Animação, Ficção Científica, Suspense)
- **Queries**: `GET /api/filmes` supports filters via query params (titulo, descricao, duracao, genero, nota, avaliacao)
- **Uniqueness**: No duplicate film titles allowed
- **Error handling**: Controllers catch errors, return 500 with generic message; log to console
- **Prisma usage**: Import client from `../utils/prismaClient.js`; use `findMany` with `where` for filters, `orderBy: { createdAt: 'desc' }`
- **Response format**: Success: `{ message, data? }`; Error: `{ error }`

## Examples
- **Controller validation** (see `src/controllers/filmeController.js`):
  ```javascript
  if (!titulo || titulo.trim().length < 3) {
      return res.status(400).json({ error: 'O título é obrigatório...' });
  }
  ```
- **Model filtering** (see `src/models/filmeModel.js`):
  ```javascript
  if (titulo) where.titulo = { contains: titulo, mode: 'insensitive' };
  ```
- **Route structure** (see `src/routes/filmeRoute.js`):
  ```javascript
  router.post('/filmes', controller.create);
  router.get('/filmes/:id', controller.getById);
  ```

## Notes
- Avaliacao field defaults to true, used for soft-delete pattern
- Timestamps auto-managed by Prisma
- No test suite currently implemented</content>
<parameter name="filePath">c:\Users\AlunoDS\filmes\.github\copilot-instructions.md