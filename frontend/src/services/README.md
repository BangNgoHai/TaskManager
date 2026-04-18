# Frontend Integration Handoff (Next Phase)

## API Base
- During development, call relative paths (`/api/...`).
- Vite proxy is configured to forward `/api` to `http://localhost:4000`.

## Required Frontend Changes
1. Replace localStorage read/write in `src/App.jsx` with HTTP calls.
2. Add auth flow:
   - Register/Login forms
   - Store JWT in memory or localStorage
   - Attach `Authorization: Bearer <token>` to task requests
3. Normalize status values:
   - Frontend should use `PENDING` and `COMPLETED` to match backend.
4. Use backend IDs:
   - Remove `Date.now()` ID generation in frontend.

## Suggested Service Layer
Create a file such as `src/services/api.js` with:
- `register(payload)`
- `login(payload)`
- `getTasks(token)`
- `createTask(payload, token)`
- `updateTask(id, payload, token)`
- `deleteTask(id, token)`
- `updateTaskStatus(id, status, token)`

## API Response Shape
- Auth responses: `{ token, user }`
- List tasks: `{ tasks: Task[] }`
- Single task mutations: `{ task: Task }`
