# AI Story Advisor: Admin Dashboard

The Admin Dashboard provides a simple and secure (internal) interface to manage the knowledge base that powers the AI Story Advisor.

## 🔗 Access
- **URL**: `/admin`
- **Purpose**: Real-time management of the vector database without using terminal scripts.

## 🛠️ Key Features

### 1. Database Statistics
Monitor the health and scale of your knowledge base:
- **Total Chunks**: Total number of data segments stored in Qdrant.
- **Unique Files**: Number of distinct source documents ingested.
- **DB Status**: Real-time connection status with the Qdrant service.

### 2. Document Management
A detailed list of all documents currently residing in the AI's memory.
- **Upload File**: Directly upload new Markdown (`.md`) or text (`.txt`) files. The system will automatically save them to the `public/` directory and ingest them into the vector database.
- **Sync All**: Scans the `public/` directory and re-ingests all `.md` files. This is useful for initial setup or after bulk updates.
- **Re-ingest (Individual)**: Refresh a specific file from the `public/` folder into the database.
- **Delete**: Completely removes a document and its associated chunks from the vector store.

## 🔄 Workflow: Adding New Knowledge
1. **Via Dashboard (Recommended)**:
    - Navigate to `/admin`.
    - Click **Upload File** and select your document.
    - The file is saved and ingested automatically.
2. **Via Filesystem**:
    - Place a new Markdown file into the `app/public/` directory.
    - Click **Sync All** on the dashboard.

## 🧰 Technical Implementation
- **API Endpoint**: `app/api/admin/knowledge/route.ts`
- **UI Component**: `app/admin/page.tsx`
- **Database Logic**: `lib/rag/vector-store.ts` (extended with `listUniqueSources` and `deleteByFilename`)

---
> [!IMPORTANT]
> This dashboard is intended for development and maintenance. Ensure proper authentication is added if the site is deployed to a public environment where the `/admin` route is exposed.
