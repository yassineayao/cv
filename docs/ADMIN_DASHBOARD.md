# AI Story Advisor: Admin Dashboard

The Admin Dashboard provides a professional and secure interface to manage the knowledge base and monitor user engagement for the AI Story Advisor.

## 🔗 Access & Security
- **URL**: `/admin`
- **Authentication**: Secured via **Auth.js (NextAuth.js v5)** with a **Prisma Adapter** for database-backed sessions.
- **Login Experience**: Features a premium glassmorphism interface with dynamic mesh gradients and secure password handling.

## 🛠️ Key Features

### 1. Knowledge Base Management
A real-time interface for managing vector database content:
- **Database Statistics**: Monitor total chunks, unique files, and connection status.
- **Document List**: Browse ingested files with **Client-side Pagination** for a snappy experience.
- **Preview Content**: View Markdown-rendered document content directly via the **Eye** icon.
- **Management Tools**: Upload new files, re-ingest individual documents, or perform a manual **Sync All** to refresh the entire store.

### 2. User Visit Analytics
A dedicated tab for monitoring traffic and engagement:
- **Real-time Insights**: View total visits and top countries at a glance.
- **Advanced Filtering**: Use the **Server-side Search** to filter logs by IP, path, country, or city across the entire database.
- **High-Performance Pagination**: Uses **Server-side Pagination** to handle high traffic volumes efficiently.
- **Detailed Logs**: Monitor visitor IP, geolocation (country/city), device info, OS, and the specific path visited.

### 3. Chat Logs Management
A comprehensive system to monitor user interactions with the AI Chatbot:
- **User Grouping**: Users are automatically grouped by IP address, providing a consolidated view of returning visitors.
- **Rich Metadata**: For each user, view their Location (Country/City), Device, Browser, and Operating System.
- **Session History**: Click on any user to expand their full list of chat sessions and read conversation transcripts with accurate timestamps.
- **Global Search**: Filter conversations by User IP, Location, or Message Content to find specific interactions.

### 4. Global Theme Consistency
The dashboard (and the login page) are fully synchronized with the portfolio's theme:
- **Theme Sync**: Uses a global `ThemeProvider` to ensure your preference (Light/Dark) persists across navigation and page refreshes.
- **High Contrast UI**: Action buttons and tabs are optimized for maximum visibility in both theme modes.

## 🔄 Workflow: Adding New Knowledge
1. **Direct Upload**:
    - Navigate to `/admin` -> **Knowledge** tab.
    - Click **Upload File** (supports `.md` and `.txt`).
    - The system saves the file to `public/knowledge/` and trigger RAG ingestion automatically.
2. **Bulk Ingestion**:
    - Place new files in the `app/public/knowledge/` directory.
    - Click **Sync All** on the dashboard to ensure the vector database matches the filesystem.

## 🧰 Technical Stack
- **API Endpoints**: 
  - `app/api/admin/knowledge/route.ts` (Document control)
  - `app/api/admin/analytics/route.ts` (Paginated visit logs)
  - `app/api/admin/chat-logs/route.ts` (Chat session retrieval)
- **UI Architecture**: `app/admin/page.tsx` (State-driven tabs, debounced search, uses `ChatBot` architecture for consistency)
- **Database Logic**: Prisma ORM for analytics; Qdrant for vector embeddings.

---
> [!TIP]
> **Performance Tip**: The Analytics table uses debounced server-side filtering (500ms). Simply type in the search box and the dashboard will automatically fetch the filtered results from the database.
