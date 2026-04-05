# Portfolio (Frontend + Backend)

This repository now runs as a full-stack app:
- Vite React frontend
- Express backend APIs
- MongoDB via Mongoose
- Nodemailer contact delivery
- Activity logging + admin dashboard data APIs

## Environment setup

```bash
cp .env.local.example .env.local
```

Set:
- `MONGODB_URI`
- `EMAIL_USER`
- `EMAIL_PASS`
- `SERVER_PORT` (optional, default `8787`)
- `VITE_API_BASE_URL` (default `http://localhost:8787`)
- `VITE_ADMIN_PASSWORD` (admin page login password)

## Run locally

```bash
npm install
npm run dev
```

This starts both:
- frontend: `http://localhost:8080`
- backend: `http://localhost:8787`

## Available APIs

- `POST /api/contact` → validate, save message to MongoDB, send Gmail email via Nodemailer
- `POST /api/logs` → store visit/click/project logs and update analytics
- `GET /api/admin/summary` → aggregate dashboard data
- `GET /api/health` → backend health check

## Backend structure

```
lib/mongodb.js
models/Contact.js
models/Log.js
models/Analytics.js
server/index.js
server/mailer.js
server/utils/validators.js
```
