# TaskManager

TaskManager is a full-stack daily task management app.

- Frontend: React + Vite
- Backend: Express + PostgreSQL + JWT

## Project Structure

```text
TaskManager/
├── server/               # Express API + migrations
├── src/                  # Existing React frontend
├── vite.config.js        # Dev proxy for /api
└── README.md
```

## Backend Quick Start

1. Open backend folder:
   - `cd server`
2. Configure environment:
   - `cp .env.example .env`
3. Install dependencies:
   - `npm install`
4. Run migrations:
   - `npm run migrate:up`
5. Start backend:
   - `npm run dev`

Detailed backend guide: [`server/README.md`](./server/README.md)

## Frontend Quick Start

1. From project root:
   - `npm install`
   - `npm run dev`
2. Frontend runs on `http://localhost:5173`
3. Requests to `/api/*` are proxied to backend at `http://localhost:4000`

## API Testing

Use [`server/docs/api.http`](./server/docs/api.http) for manual endpoint testing.

## Next Frontend Integration Step

Use the handoff checklist in [`src/services/README.md`](./src/services/README.md) to replace localStorage with backend APIs.
