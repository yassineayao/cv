import { NextRequest, NextResponse } from "next/server";
import { getVisitMetadata } from "@/lib/analytics";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { path } = await req.json();

        // Don't track admin or api paths to keep logs clean
        if (path.startsWith("/admin") || path.startsWith("/api")) {
            return NextResponse.json({ skipped: true });
        }

        const metadata = await getVisitMetadata(path);

        await prisma.visit.create({
            data: {
                ip: metadata.ip,
                userAgent: metadata.userAgent,
                path: metadata.path,
                referer: metadata.referer,
                country: metadata.country,
                city: metadata.city,
                region: metadata.region,
                device: metadata.device,
                browser: metadata.browser,
                os: metadata.os,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Tracking API error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
