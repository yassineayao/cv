# Deployment & Operations Guide

This guide covers the steps required to deploy and maintain the Storybook CV application using Docker and Prisma.

## 🚀 Quick Start (Docker Compose)

The easiest way to run the application is using Docker Compose.

1. **Configure Environment Variables**:
   Create a `.env` file in the `app/` directory with the following variables:
   ```env
   DATABASE_URL="postgresql://postgres:password@storybook-cv-postgres:5432/storybook_cv"
   AUTH_SECRET="your-secret-key"
   AUTH_TRUST_HOST=true
   GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"
   QDRANT_URL=http://qdrant:6333
   ```

2. **Start the Containers**:
   ```bash
   docker compose up -d --build
   ```

## 🗄️ Database Management

### Automatic Schema Sync
The Docker container is configured to automatically run `npx prisma db push` on startup. This ensures the database schema always matches the Prisma model.

> [!WARNING]
> If a schema change would result in data loss, the automatic sync will fail with a warning in the logs. In such cases, you must handle the sync manually.

### Manual Sync (if needed)
If you need to run the sync manually:

```bash
# From the project root
docker exec -it storybook-cv-app npx prisma db push
```

### Viewing Data
You can use Prisma Studio to browse your database:
```bash
cd app && npx prisma studio
```

## 🛠️ Troubleshooting

### Login 500 (Internal Server Error)
If you encounter a 500 error at `/api/auth/error` when logging in via Docker:

1. **Check Environment Variables**: Ensure `AUTH_SECRET` is correctly set in `app/.env`.
2. **Verify Docker Loading**: Ensure `docker-compose.yml` includes the `env_file` directive:
   ```yaml
   app:
     env_file:
       - ./app/.env
   ```
3. **Database Connectivity**: Ensure the `app` container can reach the `postgres` container using the internal service name defined in `docker-compose.yml`.

### Missing Tables Error
If you see errors like `The table "public.Visit" does not exist`:
- Run the schema sync command: `docker exec -it storybook-cv-app npx prisma db push`.

## 📦 Production Builds

The Dockerfile uses a multi-stage build to produce a lean "standalone" output. This significantly reduces image size by only including the necessary files for production.

- **Builder Stage**: Installs dependencies and runs `next build`.
- **Runner Stage**: Copies `.next/standalone` and `.next/static` to a minimal Alpine-based runner image.
