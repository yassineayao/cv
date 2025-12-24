# Storybook CV - Frontend Application

This directory contains the Next.js frontend and API services for the Storybook CV.

## 📖 Project Overview

For the complete project concept, full architecture, and local environment setup instructions, please refer to the **[Root README](../README.md)**.

---

## 🛠 Tech Stack (App Level)

- **Frontend**: Next.js 16 (App Router), Tailwind CSS, Framer Motion, Shadcn UI.
- **AI Integration**: Vercel AI SDK, Google Gemini API.
- **Data Persistence**: Prisma + PostgreSQL.
- **RAG Implementation**: Local Qdrant integration via `app/lib/rag`.

## 🚀 Scripts

From this directory (`/app`), you can run:

- `bun dev`: Starts the development server.
- `bun build`: Builds the application for production.
- `bun lint`: Runs ESLint for code quality checks.
- `bun scripts/ingest-kb.ts`: Ingests the Markdown files from `docs/` into the Qdrant vector database.

## 📂 Internal Directory Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`:
  - `ui/`: Shared UI components (Shadcn).
  - `layout/`: Main PageShell, ChatBot, and TourGuide components.
- `lib/`:
  - `rag/`: Core RAG logic (retrieval, ingestion, hybrid search).
  - `prisma/`: Prisma client and database utilities.
- `prisma/`: Database schema definitions.
- `public/`: Static assets and knowledge base Markdown files.
- `scripts/`: Maintenance and data ingestion scripts.
