import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const visits = await prisma.visit.findMany({
            orderBy: { timestamp: "desc" },
            take: 100,
        });

        const totalVisits = await prisma.visit.count();

        // Simple aggregate for countries
        const countryStats = await prisma.visit.groupBy({
            by: ['country'],
            _count: {
                country: true
            },
            where: {
                country: { not: null }
            },
            orderBy: {
                _count: {
                    country: 'desc'
                }
            },
            take: 5
        });

        return NextResponse.json({
            visits,
            stats: {
                totalVisits,
                topCountries: countryStats.map((c: any) => ({ name: c.country, count: c._count.country }))
            }
        });
    } catch (error) {
        console.error("Admin Analytics API error:", error);
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
    }
}
