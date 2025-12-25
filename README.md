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
- **Custom Client**: Robust session tracking and connection stability via a custom fetch implementation.

### 3. Admin Dashboard
A internal command center for tracking engagement.
- **Real-time Analytics**: Insights into how visitors interact with the story.
- **Chat Logs**: Full conversation history grouped by user IP, with rich metadata (Location, Device, OS).
- **Session Replay**: Visual playback of user sessions to understand user behavior and identify issues.
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

1. **Start Application**:
   From the project root:
   ```bash
   docker compose up --build -d
   ```
   *This starts the full stack: Database, Vector DB, and the Next.js Application.*

2. **Ingest Knowledge Base** (First time only):
   ```bash
   bun scripts/ingest-kb.ts
   ```

Open [http://localhost:3000](http://localhost:3000) to start the journey.

---

## 📝 Documentation

For deeper technical dives, see the `docs/` folder:
- [System Overview](docs/OVERVIEW.md)
- [AI Story Advisor](docs/AI_STORY_ADVISOR.md) (Architecture & Features)
- [Chatbot Implementation](docs/CHATBOT_IMPLEMENTATION.md) (Client/Server Deep Dive)
- [RAG Flows](docs/RAG_FLOWS.md) (Data Diagrams)
- [Admin Dashboard](docs/ADMIN_DASHBOARD.md) (Management & Analytics)
- [Session Replay](docs/SESSION_REPLAY.md) (Recording & Playback)
- [RAG Concepts](docs/rag-concepts.md) (Hybrid Search Theory)

---

## 🔮 Future Roadmap

Here are some ideas for future enhancements to take the Storybook CV to the next level:

### AI & RAG
- [ ] **Voice Interface**: Specialized speech-to-text to talk to the advisor.
- [ ] **Multi-modal Support**: Allow the user to upload images for the AI to analyze (e.g., "What do you think of this design?").
- [ ] **Model Switching**: Admin toggle to switch between Gemini, GPT-4, or local LLMs (Ollama) on the fly.

### User Experience
- [ ] **3D Elements**: Integrate Three.js for immersive chapter backgrounds.
- [ ] **Gamification**: Add "achievements" for users who explore all chapters.
- [ ] **Mobile App**: Wrap the experience in a React Native app.

### Admin & Analytics
- [ ] **Export Data**: CSV/JSON export for chat logs and analytics.
- [x] **Session Replay**: Visual replay of how users navigated the site.
- [ ] **Sentiment Analysis**: Auto-tag user messages as positive/neutral/negative.
