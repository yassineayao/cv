import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getVisitMetadata } from "@/lib/analytics";

export async function POST(req: NextRequest) {
    try {
        const { path, userId } = await req.json();

        // Get generic visit metadata (IP, location, device)
        const metadata = await getVisitMetadata(path);

        // Construct a descriptive User ID if none provided
        let recordingUserId = userId;
        if (!recordingUserId) {
            const location = [metadata.city, metadata.country].filter(Boolean).join(", ");
            recordingUserId = `${metadata.ip}`;
            if (location) recordingUserId += ` - ${location}`;
            if (metadata.device || metadata.os) recordingUserId += ` (${metadata.device || 'Unknown'} / ${metadata.os || 'Unknown'})`;
        }

        const recording = await prisma.sessionRecording.create({
            data: {
                path,
                userId: recordingUserId,
                // We could link to visit here if we wanted
            },
        });

        return NextResponse.json({ id: recording.id });
    } catch (error) {
        console.error("Failed to start recording:", error);
        return NextResponse.json({ error: "Failed to start recording" }, { status: 500 });
    }
}
