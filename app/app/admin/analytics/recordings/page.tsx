import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function RecordingsPage() {
    const recordings = await prisma.sessionRecording.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
    });

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Session Recordings</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <thead>
                        <tr className="bg-zinc-100 dark:bg-zinc-800 text-left">
                            <th className="p-4 border-b">ID</th>
                            <th className="p-4 border-b">Path</th>
                            <th className="p-4 border-b">Created</th>
                            <th className="p-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordings.map((recording) => (
                            <tr key={recording.id} className="border-b dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                <td className="p-4 font-mono text-sm">{recording.id}</td>
                                <td className="p-4">{recording.path}</td>
                                <td className="p-4 text-sm text-zinc-500">
                                    {formatDistanceToNow(recording.createdAt, { addSuffix: true })}
                                </td>
                                <td className="p-4">
                                    <Link
                                        href={`/admin/analytics/recordings/${recording.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Play
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
