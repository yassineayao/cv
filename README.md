# Storybook CV 📖✨

Welcome to the **Storybook CV**, a professional portfolio reimagined as an epic narrative journey. This project transcends the traditional resume by guiding visitors through "chapters" of a developer's career, blending storytelling with modern web technologies and AI-powered interactions.

## 🌟 Concept

The Storybook CV is designed to tell a story. Instead of a static list of skills, it presents a visual and narrative journey:
- **Narrative Chapters**: Each stage of professional growth is a "chapter" with unique illustrations and interactive elements.
- **Visual Storytelling**: Uses Framer Motion for smooth transitions and animations that bring the story to life.
- **The AI Scroll (Advisor)**: A RAG-powered chatbot that knows the developer's journey inside and out, ready to answer any questions.

---

## 🚀 Key Features

### 1. Interactive Chapters
A sequence of scrollable or navigable sections, each representing a milestone:
- **The Beginning**: Self-learning adventure.
- **Freelance Quests**: Independent problem-solving.
- **Skills & Magic**: The "magic chest" of technical expertise.
- **Current Adventure**: In-depth look at ongoing high-impact projects.

### 2. AI Story Advisor (RAG)
An intelligent chatbot integrated into the experience.
- **Knowledge Base**: Fed by detailed Markdown documentation of projects and experiences.
- **Architecture**: Hybrid Search (Dense + Sparse) with Cross-Encoder Reranking for high precision.
- **Privacy**: Local retrieval from Qdrant before processing via Gemini API.

### 3. Admin Dashboard
A internal command center for tracking engagement.
- **Real-time Analytics**: Insights into how visitors interact with the story.
- **Geographic Insights**: Seeing where the "readers" are coming from.
- **High Performance**: Server-side data handling for a snappy admin experience.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Tour Guide**: [React Joyride](https://react-joyride.com/)

### Backend & Database
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Vector DB**: [Qdrant](https://qdrant.tech/) (Dockerized)

### AI Architecture
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Models**: Google Gemini (3-flash-preview / 2.5-flash)
- **Embeddings**: Google `text-embedding-004`
- **Reranking**: local `@xenova/transformers` (TinyBERT)

---

## 📂 Project Structure

```text
.
├── app/                # Next.js frontend and API routes
│   ├── app/            # App Router pages
│   ├── components/     # UI and Layout components
│   ├── lib/            # Business logic (RAG, database, etc.)
│   ├── prisma/         # Database schema
│   └── scripts/        # Ingestion and maintenance scripts
├── docs/               # Detailed project documentation and knowledge base
└── docker-compose.yml  # Local environment setup (Qdrant, etc.)
```

---

## 🚦 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (preferred) or Node.js
- [Docker](https://www.docker.com/)

### Setup

1. **Start Infrastructure**:
   ```bash
   docker-compose up -d
   ```

2. **Install Dependencies**:
   ```bash
   cd app && bun install
   ```

3. **Ingest Knowledge Base** (for the AI Advisor):
   ```bash
   bun scripts/ingest-kb.ts
   ```

4. **Run Development Server**:
   ```bash
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) to start the journey.

---

## 📝 Documentation

For deeper technical dives, see the `docs/` folder:
- [System Overview](docs/OVERVIEW.md)
- [RAG Architecture](docs/rag-system.md)
- [Admin Dashboard](docs/ADMIN_DASHBOARD.md)
