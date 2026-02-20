# Tailor App

Simple Next‑JS/Vite frontend with an Express backend that stores everything in memory.

## Getting started

### Backend

```bash
cd tailor-backend
npm install   # if not already
node server.js
```

Server listens on **http://localhost:5000**. It includes a `/login` endpoint with hardcoded users:

- `admin@example.com` / `admin` (Admin)
- `staff@example.com` / `staff` (Staff)
- `cust@example.com` / `cust` (Customer)

All other data (customers, orders, etc.) is stored in JS arrays and lost when the process exits.

The backend also exposes `/save` for compatibility and CRUD routes for each collection.

### Frontend

```bash
cd Tailor_app
npm install
npm run dev   # starts on http://localhost:5175 (or next free port)
```

Login form sends credentials to the backend and redirects to the dashboard on success. Credentials are persisted to `localStorage` so refreshes keep you signed in.

Protected routes (`/customers`, `/orders`, etc.) require an authenticated user with the appropriate role.

## Notes

The project is intended for demo purposes only. No real authentication is in place and passwords are stored in plaintext in memory.

Feel free to extend with a database, proper auth, or remove the in‑memory stub as needed.
