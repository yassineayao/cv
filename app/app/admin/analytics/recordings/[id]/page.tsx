import { prisma } from "@/lib/prisma";
import { SessionPlayer } from "@/components/analytics/SessionPlayer";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function RecordingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const recording = await prisma.sessionRecording.findUnique({
        where: { id },
        include: {
            events: {
                orderBy: { sequence: "asc" },
            },
        },
    });

    if (!recording) return notFound();

    // Reconstruct events from chunks
    let allEvents: any[] = [];
    try {
        recording.events.forEach((chunk) => {
            const chunkEvents = JSON.parse(chunk.events);
            if (Array.isArray(chunkEvents)) {
                allEvents = allEvents.concat(chunkEvents);
            }
        });
    } catch (e) {
        console.error("Failed to parse events", e);
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Replay Session: {id}</h1>
            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded mb-4">
                <p><strong>Path:</strong> {recording.path}</p>
                <p><strong>User ID:</strong> {recording.userId || "Anonymous"}</p>
                <p><strong>Date:</strong> {recording.createdAt.toLocaleString()}</p>
            </div>

            {allEvents.length > 0 ? (
                <SessionPlayer events={allEvents} />
            ) : (
                <p className="text-red-500">No events found for this recording.</p>
            )}
        </div>
    );
}
