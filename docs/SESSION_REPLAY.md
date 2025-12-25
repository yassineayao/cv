# Session Replay

The **Session Replay** feature allows administrators to visually replay user interactions on the website. This is powered by [rrweb](https://github.com/rrweb-io/rrweb), which records DOM mutations and events.

## 🚀 How It Works

1.  **Recording**: The `SessionRecorder` component (in `app/components/analytics/SessionRecorder.tsx`) initializes a recording session when a user visits the site.
    - It captures the initial DOM snapshot and subsequent mutations (mouse movements, clicks, scrolls, input changes).
    - Events are buffered and sent to the server in chunks every 5 seconds.
    - **Optimization**: Admin pages (`/admin`) are excluded from recording to prevent capturing sensitive administrative actions.
2.  **Storage**:
    - **`SessionRecording`**: Stores metadata (ID, user ID, path, timestamp).
    - **`SessionEventChunk`**: Stores the actual JSON event data. Chunks are sequenced to ensure correct playback.
3.  **Playback**:
    - The Admin UI (`/admin/analytics/recordings/[id]`) fetches all event chunks for a recording.
    - It reconstructs the full event list and passes it to the `SessionPlayer` component.
    - `rrweb-player` renders the events in an iframe-like container, faithfully reproducing the user's session.

## 🧪 How to Test

1.  **Generate a Recording**:
    - Open the website in a new incognito window (or ensure you are not on an `/admin` path).
    - Navigate around, click buttons, scroll the page.
    - Interact with the site for at least 10-15 seconds to ensure multiple chunks are sent.
    - Close the tab or navigate away to flush remaining events (handled via `navigator.sendBeacon`).

2.  **View the Recording**:
    - Log in as an admin and go to `/admin/analytics/recordings`.
    - You should see your recent session listed.
    - Click **Play**.
    - The player should open and replay your interactions.

## ⚠️ Limitations & Considerations

- **Storage**: DOM recordings can be large. Currently, we do not have an automatic cleanup policy. Monitor database size.
- **Privacy**: Input values are recorded. Ensure you do not add sensitive fields (passwords are typically masked by default in `rrweb`, but be cautious).
- **Styles**: The player attempts to load site styles. If styles change significantly between recording and playback, the replay might look slightly off.
