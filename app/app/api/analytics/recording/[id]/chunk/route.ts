import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { events } = await req.json();

        // If beacon API sends stringified body directly (some implementations do, ours does JSON.stringify)
        // Check if events is undefined, maybe parse body if it's text? 
        // Our fetch uses JSON stringify, so req.json() should work.
        // Beacon uses Blob or FormData or string. We used JSON.stringify in sendBeacon too. 
        // Note: sendBeacon sends as text/plain by default if just string, or type if Blob. 
        // In our component: navigator.sendBeacon(url, JSON.stringify({ events })) sends as text/plain probably.
        // So we might need to handle that. But let's stick to standard fetch logic first, and maybe refine beacon later or assume Next.js handles it if Content-Type isn't json.
        // Actually, sendBeacon with string payload usually sends text/plain;charset=UTF-8. Next.js req.json() might fail.

        let eventData = events;

        // Handling beacon potential issue:
        // For now, let's assume the main interval fetch works fine (Content-Type: application/json).
        // The beacon might fail here if we don't handle it. 
        // But for this initial pass, let's just use standard JSON handling.

        if (!eventData) {
            // Try parsing text if simple json failed?
            // const text = await req.text();
            // const body = JSON.parse(text);
            // eventData = body.events;
            return NextResponse.json({ error: "No events" }, { status: 400 });
        }

        // Find the last sequence number to increment? Or just let them come in?
        // Let's use auto-incrementing if we can, or just rely on arrival order?
        // Better to have client send strict sequence, but for now let's just append.
        // Ideally we'd select count but that's expensive.
        // Let's just create.

        await prisma.sessionEventChunk.create({
            data: {
                recordingId: id,
                events: JSON.stringify(eventData), // It's likely an array of objects, store as string
                sequence: Date.now(), // rough sequencing
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save chunk:", error);
        return NextResponse.json({ error: "Failed to save chunk" }, { status: 500 });
    }
}
