import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const search = searchParams.get("search") || "";
        const skip = (page - 1) * limit;

        const where = search ? {
            OR: [
                { ip: { contains: search, mode: 'insensitive' as const } },
                { path: { contains: search, mode: 'insensitive' as const } },
                { country: { contains: search, mode: 'insensitive' as const } },
                { city: { contains: search, mode: 'insensitive' as const } }
            ]
        } : {};

        const [visits, filteredCount, totalVisits] = await Promise.all([
            prisma.visit.findMany({
                where,
                orderBy: { timestamp: "desc" },
                skip,
                take: limit,
            }),
            prisma.visit.count({ where }),
            prisma.visit.count()
        ]);

        const totalPages = Math.ceil(filteredCount / limit);

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
            pagination: {
                total: filteredCount,
                page,
                limit,
                totalPages,
            },
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
