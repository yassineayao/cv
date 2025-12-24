"use client";

import React, { useState, useEffect } from "react";
import {
    Database,
    RefreshCw,
    Trash2,
    FileText,
    DatabaseZap,
    AlertCircle,
    CheckCircle2,
    ArrowLeft,
    Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Source {
    filename: string;
    count: number;
    sourceType: string;
}

interface Stats {
    pointsCount: number;
    status: string;
}

export default function AdminDashboard() {
    const [sources, setSources] = useState<Source[]>([]);
    const [stats, setStats] = useState<Stats>({ pointsCount: 0, status: "idle" });
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/knowledge');
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setSources(data.sources || []);
            setStats(data.stats || { pointsCount: 0, status: "ok" });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: "Failed to load knowledge base data." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAction = async (action: 'ingest-all' | 'ingest-file' | 'delete' | 'upload', filename?: string, file?: File) => {
        const id = filename ? `${action}-${filename}` : action;
        setActionLoading(id);
        setMessage(null);

        try {
            let res;
            if (action === 'delete') {
                res = await fetch('/api/admin/knowledge', {
                    method: 'DELETE',
                    body: JSON.stringify({ filename }),
                    headers: { 'Content-Type': 'application/json' }
                });
            } else if (action === 'upload' && file) {
                const formData = new FormData();
                formData.append('file', file);
                res = await fetch('/api/admin/knowledge', {
                    method: 'POST',
                    body: formData
                });
            } else {
                res = await fetch('/api/admin/knowledge', {
                    method: 'POST',
                    body: JSON.stringify({ action, filename }),
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setMessage({ type: 'success', text: data.message || "Action completed successfully." });
            await fetchData();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || "Something went wrong." });
        } finally {
            setActionLoading(null);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleAction('upload', undefined, file);
        }
    };

    return (
        <div className="min-h-screen bg-background p-6 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Portfolio
                        </Link>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <DatabaseZap className="text-primary w-8 h-8" />
                            Knowledge Base Admin
                        </h1>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept=".md,.txt"
                            onChange={handleFileUpload}
                            disabled={!!actionLoading}
                        />
                        <Button
                            variant="outline"
                            onClick={() => document.getElementById('file-upload')?.click()}
                            disabled={!!actionLoading}
                            className="flex-1 sm:flex-none"
                        >
                            {actionLoading === 'upload' ? (
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Plus className="w-4 h-4 mr-2" />
                            )}
                            Upload File
                        </Button>
                        <Button
                            onClick={() => handleAction('ingest-all')}
                            disabled={!!actionLoading || loading}
                            className="shadow-glow-primary flex-1 sm:flex-none"
                        >
                            {actionLoading === 'ingest-all' ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                            Sync All
                        </Button>
                    </div>
                </div>

                {/* Info Bar */}
                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={cn(
                                "p-4 rounded-xl flex items-center gap-3 border",
                                message.type === 'success' ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-red-500/10 border-red-500/20 text-red-500"
                            )}
                        >
                            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            <span className="text-sm font-medium">{message.text}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Card className="p-6 flex flex-col items-center justify-center text-center space-y-2 bg-muted/30 border-primary/10 transition-all hover:border-primary/30">
                        <Database className="w-8 h-8 text-primary opacity-80" />
                        <div className="text-2xl font-bold">{stats.pointsCount}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Chunks</div>
                    </Card>
                    <Card className="p-6 flex flex-col items-center justify-center text-center space-y-2 bg-muted/30 border-primary/10 transition-all hover:border-primary/30">
                        <FileText className="w-8 h-8 text-primary opacity-80" />
                        <div className="text-2xl font-bold">{sources.length}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Unique Files</div>
                    </Card>
                    <Card className="p-6 flex flex-col items-center justify-center text-center space-y-2 bg-muted/30 border-primary/10 transition-all hover:border-primary/30">
                        <div className={cn("w-3 h-3 rounded-full animate-pulse", stats.status === 'ok' ? "bg-green-500" : "bg-yellow-500")} />
                        <div className="text-2xl font-bold uppercase tracking-tight">{stats.status}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">DB Status</div>
                    </Card>
                </div>

                {/* Data Table */}
                <Card className="overflow-hidden border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
                    <div className="p-6 border-b bg-muted/20">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <FileText className="w-5 h-5 opacity-70" />
                            Ingested Documents
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/10 text-muted-foreground text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Filename</th>
                                    <th className="px-6 py-4 font-semibold">Type</th>
                                    <th className="px-6 py-4 font-semibold">Chunks</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-50" />
                                            Loading knowledge base...
                                        </td>
                                    </tr>
                                ) : sources.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                                            No documents found in database.
                                        </td>
                                    </tr>
                                ) : (
                                    sources.map((source) => (
                                        <tr key={source.filename} className="hover:bg-muted/10 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-primary opacity-60" />
                                                    <span className="font-medium text-sm">{source.filename}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0 h-5">
                                                    {source.sourceType}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground border">
                                                    {source.count}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-primary hover:bg-primary/10"
                                                        onClick={() => handleAction('ingest-file', source.filename)}
                                                        disabled={!!actionLoading}
                                                        title="Re-ingest"
                                                    >
                                                        {actionLoading === `ingest-file-${source.filename}` ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleAction('delete', source.filename)}
                                                        disabled={!!actionLoading}
                                                        title="Delete from DB"
                                                    >
                                                        {actionLoading === `delete-${source.filename}` ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Footer / Add section */}
                <div className="text-center pt-4">
                    <p className="text-xs text-muted-foreground">
                        Files are automatically pulled from the <code className="bg-muted px-1.5 py-0.5 rounded">public/</code> folder for ingestion.
                    </p>
                </div>
            </div>
        </div>
    );
}
