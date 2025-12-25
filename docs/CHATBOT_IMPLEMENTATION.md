# Chatbot Implementation Guide

This document details the implementation of the AI Chatbot, focusing on the custom client-side logic, session management, and robust logging system.

## 🏗️ Architecture Overview

The Chatbot is built as a custom React component that interacts directly with the Next.js API route. It bypasses the standard `useChat` hook's network layer to ensure reliable session tracking and correct data formatting for the backend.

### Key Components

1.  **Client-Side (`ChatBot.tsx`)**:
    *   Manages UI state (open/close, loading, messages).
    *   Handles Session ID generation and persistence.
    *   Performs direct `fetch` calls to `/api/chat`.
    *   Parses streaming responses manually.
2.  **Server-Side (`/api/chat/route.ts`)**:
    *   Receives messages and Session ID.
    *   Logs session metadata (IP, Location, Device) to PostgreSQL.
    *   Retrieves RAG context.
    *   Streams AI responses using the Vercel AI SDK.
3.  **Database (PostgreSQL)**:
    *   Stores `ChatSession` and `ChatMessage` records.

---

## 🔐 Session Management

To track user conversations across page reloads and visits, we use a persistent Session ID.

*   **Generation**: On component mount, we check `localStorage` for an existing `chatSessionId`. If none exists, we generate a new UUID v4.
*   **Persistence**: The ID is stored in `localStorage` indefinitely.
*   **Transmission**: The `sessionId` is explicitly included in the JSON body of every POST request to `/api/chat`.

```typescript
// ChatBot.tsx (Simplified)
const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('chatSessionId') || uuidv4();
    }
    return '';
});
```

---

## 📡 API Interaction & Streaming

We implemented a custom fetch handler instead of relying on the default `useChat` hook to guarantee that custom body parameters (like `sessionId`) are correctly transmitted.

### The Request
```typescript
const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        messages: updatedMessages,
        sessionId: sessionId // ✅ Critical for logging
    })
});
```

### The Response Parser
The Vercel AI SDK returns a stream of data events. We parse this stream manually to update the UI in real-time.

**Stream Format:**
```
data: {"type":"text-delta","id":"0","delta":"Hello"}
data: {"type":"text-delta","id":"0","delta":" world"}
...
data: [DONE]
```

**Parsing Logic:**
1.  Read the stream chunks.
2.  Split by newlines.
3.  Ignore `[DONE]` markers.
4.  Parse lines starting with `data: `.
5.  Extract text from `text-delta` events.

---

## 💾 Database Logging

Every interaction is logged to the PostgreSQL database via Prisma.

### Schema
*   **ChatSession**:
    *   `id`: UUID
    *   `ip`: User's IP address
    *   `country`, `city`, `region`: Geolocation data
    *   `device`, `browser`, `os`: User agent info
*   **ChatMessage**:
    *   `sessionId`: Foreign key to ChatSession
    *   `role`: 'user' | 'assistant'
    *   `content`: The message text

### Logging Flow
1.  **Upsert Session**: When a request comes in, the API updates the session timestamp or creates a new one if it doesn't exist (using `sessionId` from the client).
2.  **Log User Message**: The user's input is saved immediately.
3.  **Log Assistant Message**: The AI's response is aggregated and saved after the stream completes (via `onFinish` callback).

---

## 📊 Admin Dashboard Integration

The chat logs are exposed in the Admin Dashboard (`/admin`).

*   **Grouped View**: Users are grouped by IP address.
*   **Metadata**: Displays location, device, and OS for each user.
*   **History**: Full conversation history is available, with expandable sessions.
*   **Search**: Filter logs by IP, location, or message content.
