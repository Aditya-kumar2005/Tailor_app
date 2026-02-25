# Tailor App

Tailor App is a full‑stack CRUD application designed for a tailor business. It includes both a backend API built with Express and MySQL and a frontend SPA using React (Vite + TypeScript). JWT authentication, role‑based authorization, and a responsive UI make it production‑ready for managing customers, orders, inventory, staff, payments, and measurements.

---

## 🔧 Resources required

- **Backend:** Node.js, Express, MySQL (mysql2/promise)
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **State Management:** Redux Toolkit
- **Authentication:** JWT (jsonwebtoken), bcrypt for password hashing
- **HTTP Client:** Axios with request interceptor
- **Development Tools:** Vite, ESLint/Prettier (assumed), npm scripts

---

## 🚀 Features

### Authentication & Authorization
- User registration and login with hashed passwords (bcrypt).
- JWT token issuance and verification (`Authorization: Bearer <token>`).
- Role-based access control (`Admin`, `Staff`, `Customer`).
- Protected API endpoints on the backend (`authenticateToken`, `authorizeRoles`).
- Protected routes and UI logic on the frontend (`ProtectedRoute` component).

### Backend API
- RESTful CRUD endpoints for:
  - **Customers**
  - **Orders**
  - **Inventory**
  - **Payments**
  - **Staff**
  - **Measurements** (including tailor-specific routes)
- Automatic database schema initialization from `schema_mysql.sql`.
- Connection pooling and error handling.
- Middleware for CORS and JSON parsing.

### Frontend Functionality
- Modular components (`Form`, `Table`, `Navbar`, `Sidebar`, etc.).
- Dynamic forms and listings with Redux slices for state.
- Axios client auto-attaches JWT token via interceptor.
- Responsive UI with Tailwind CSS.
- User session persisted in `localStorage` with token and profile.

### Additional Capabilities
- Password reset stub endpoint.
- Role-specific UI navigation and conditional rendering.
- CRUD operations from React pages with client-side validation.
- Tailor measurement section with customer linkage.

---

## 🗂 Project Structure

```
Tailor_app/
├── tailor-backend/           # Express API server
│   ├── server.js            # Main server file (routes, JWT logic)
│   ├── schema_mysql.sql     # Database schema
│   └── package.json         # Backend dependencies
└── src/                     # React frontend
    ├── api.tsx              # Axios instance & services
    ├── components/          # Shared UI components
    ├── pages/               # Feature pages (customers, orders, auth, etc.)
    ├── slices/              # Redux Toolkit slices
    ├── store.tsx            # Redux store configuration
    └── ...                  # other supporting files
```

---

## 🛠 Setup & Usage

1. **Backend**
   ```bash
   cd tailor-backend
   npm install
   npm start      # starts server on port 5000
   ```
   Ensure MySQL is running and credentials in `server.js` or `.env` are correct.

2. **Frontend**
   ```bash
   cd ..             # back to project root
   npm install
   npm run dev       # starts Vite dev server (http://localhost:5175/)
   ```

3. **Environment Variables**
   Create a `.env` file in `tailor-backend` or project root with:
   ```env
   JWT_SECRET=your_secret_here
   JWT_EXPIRES_IN=1h
   ```

---

## 🎯 I learnt more 

- Developed a full-stack web application with secure user authentication (JWT) and role-based authorization.
- Engineered RESTful APIs using Express and MySQL, with schema management and connection pooling.
- Built a TypeScript React frontend featuring state management via Redux and reusable UI components.
- Implemented security best practices: password hashing, token handling, input validation.
- Integrated Axios with an interceptor for seamless token usage across requests.
- Managed development workflow using Vite for fast builds and hot module reloading.

This project demonstrates proficiency in full-stack development, TypeScript, state management, and secure authentication workflows—ideal for showcasing on a resume or portfolio.

---

Feel free to fork, extend, or adapt this application for your own projects or learning purposes.