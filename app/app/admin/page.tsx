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
    Plus,
    Eye,
    X,
    LogOut,
    Bot
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Source {
    filename: string;
    count: number;
    sourceType: string;
}

interface Stats {
    pointsCount: number;
    status: string;
}

interface Visit {
    id: string;
    timestamp: string;
    ip: string;
    path: string;
    country: string;
    city: string;
    device: string;
    browser: string;
    os: string;
}

interface AnalyticsData {
    visits: Visit[];
    stats: {
        totalVisits: number;
        topCountries: { name: string; count: number }[];
    };
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'knowledge' | 'analytics'>('knowledge');
    const [sources, setSources] = useState<Source[]>([]);
    const [stats, setStats] = useState<Stats>({ pointsCount: 0, status: "idle" });
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [analyticsLoading, setAnalyticsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    // Preview state
    const [previewContent, setPreviewContent] = useState<string | null>(null);
    const [previewFilename, setPreviewFilename] = useState<string | null>(null);
    const [previewLoading, setPreviewLoading] = useState(false);

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

    const fetchAnalytics = async () => {
        try {
            setAnalyticsLoading(true);
            const res = await fetch('/api/admin/analytics');
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setAnalytics(data);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: "Failed to load analytics data." });
        } finally {
            setAnalyticsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'knowledge') {
            fetchData();
        } else {
            fetchAnalytics();
        }
    }, [activeTab]);

    const handlePreview = async (filename: string) => {
        setPreviewFilename(filename);
        setPreviewLoading(true);
        try {
            const res = await fetch(`/api/admin/knowledge?action=get-content&filename=${filename}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setPreviewContent(data.content);
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || "Failed to load preview." });
        } finally {
            setPreviewLoading(false);
        }
    };

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

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/login" });
    };

    return (
        <div className="min-h-screen bg-background p-6 font-sans relative">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Portfolio
                        </Link>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <DatabaseZap className="text-primary w-8 h-8" />
                            Admin Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
                        <div className="bg-muted p-1 rounded-lg flex gap-1 mr-2">
                            <Button
                                variant={activeTab === 'knowledge' ? 'secondary' : 'ghost'}
                                size="sm"
                                className="h-8 text-xs font-bold"
                                onClick={() => setActiveTab('knowledge')}
                            >
                                Knowledge
                            </Button>
                            <Button
                                variant={activeTab === 'analytics' ? 'secondary' : 'ghost'}
                                size="sm"
                                className="h-8 text-xs font-bold"
                                onClick={() => setActiveTab('analytics')}
                            >
                                Analytics
                            </Button>
                        </div>

                        {activeTab === 'knowledge' && (
                            <>
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
                            </>
                        )}

                        {activeTab === 'analytics' && (
                            <Button
                                variant="outline"
                                onClick={fetchAnalytics}
                                disabled={analyticsLoading}
                                className="flex-1 sm:flex-none"
                            >
                                <RefreshCw className={cn("w-4 h-4 mr-2", analyticsLoading && "animate-spin")} />
                                Refresh
                            </Button>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleLogout}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            title="Log Out"
                        >
                            <LogOut className="w-5 h-5" />
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

                {activeTab === 'knowledge' ? (
                    <>
                        {/* Knowledge Stats */}
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

                        {/* Knowledge Table */}
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
                                            <th className="px-6 py-4 font-semibold hidden md:table-cell">Type</th>
                                            <th className="px-6 py-4 font-semibold hidden sm:table-cell">Chunks</th>
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
                                                    <td className="px-6 py-4 max-w-[150px] sm:max-w-none">
                                                        <div className="flex items-center gap-2 overflow-hidden">
                                                            <FileText className="w-4 h-4 text-primary opacity-60 shrink-0" />
                                                            <span className="font-medium text-sm truncate">{source.filename}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 hidden md:table-cell">
                                                        <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0 h-5">
                                                            {source.sourceType}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 hidden sm:table-cell">
                                                        <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground border">
                                                            {source.count}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-primary hover:bg-primary/10"
                                                                onClick={() => handlePreview(source.filename)}
                                                                title="Preview Content"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
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
                    </>
                ) : (
                    <>
                        {/* Analytics Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <Card className="p-6 flex flex-col items-center justify-center text-center space-y-2 bg-muted/30 border-primary/10 transition-all hover:border-primary/30">
                                <Eye className="w-8 h-8 text-primary opacity-80" />
                                <div className="text-2xl font-bold">{analytics?.stats.totalVisits || 0}</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Visits</div>
                            </Card>
                            <Card className="p-6 flex flex-col items-center justify-center text-center space-y-2 bg-muted/30 border-primary/10 transition-all hover:border-primary/30">
                                <Badge className="mb-1">{analytics?.stats.topCountries[0]?.name || "N/A"}</Badge>
                                <div className="text-2xl font-bold">{analytics?.stats.topCountries[0]?.count || 0}</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Top Country</div>
                            </Card>
                            <Card className="p-6 flex flex-col items-center justify-center text-center space-y-2 bg-muted/30 border-primary/10 transition-all hover:border-primary/30">
                                <Bot className="w-8 h-8 text-primary opacity-80" />
                                <div className="text-2xl font-bold">100%</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Real-time Tracking</div>
                            </Card>
                        </div>

                        {/* Analytics Table */}
                        <Card className="overflow-hidden border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
                            <div className="p-6 border-b bg-muted/20">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Bot className="w-5 h-5 opacity-70" />
                                    Recent Visits Log
                                </h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-muted/10 text-muted-foreground text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Time</th>
                                            <th className="px-6 py-4 font-semibold">IP / Location</th>
                                            <th className="px-6 py-4 font-semibold hidden md:table-cell">Device / OS</th>
                                            <th className="px-6 py-4 font-semibold">Path</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40">
                                        {analyticsLoading ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                                                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-50" />
                                                    Loading analytics...
                                                </td>
                                            </tr>
                                        ) : !analytics || analytics.visits.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                                                    No visit data recorded yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            analytics.visits.map((visit) => (
                                                <tr key={visit.id} className="hover:bg-muted/10 transition-colors">
                                                    <td className="px-6 py-4 text-xs font-mono text-muted-foreground whitespace-nowrap">
                                                        {new Date(visit.timestamp).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium">{visit.ip}</div>
                                                        <div className="text-[10px] text-primary uppercase font-bold tracking-tight">
                                                            {visit.city ? `${visit.city}, ${visit.country}` : visit.country || "Unknown Location"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 hidden md:table-cell">
                                                        <div className="text-xs font-medium uppercase">{visit.device}</div>
                                                        <div className="text-[10px] text-muted-foreground">{visit.browser} / {visit.os}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge variant="outline" className="text-[10px] font-mono">
                                                            {visit.path}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </>
                )}

                {/* Footer / Add section */}
                <div className="text-center pt-4">
                    <p className="text-xs text-muted-foreground">
                        Files are automatically pulled from the <code className="bg-muted px-1.5 py-0.5 rounded">public/knowledge/</code> folder for ingestion.
                    </p>
                </div>
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {(previewContent !== null || previewLoading) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-4xl h-[80vh] bg-card border shadow-2xl rounded-2xl flex flex-col overflow-hidden"
                        >
                            <div className="p-4 border-b flex justify-between items-center bg-muted/20">
                                <div>
                                    <h3 className="font-bold flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-primary" />
                                        {previewFilename}
                                    </h3>
                                    <p className="text-xs text-muted-foreground lowercase">Internal file preview</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setPreviewContent(null);
                                        setPreviewFilename(null);
                                    }}
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-8 prose prose-sm dark:prose-invert max-w-none">
                                {previewLoading ? (
                                    <div className="flex flex-col items-center justify-center h-full opacity-50 italic">
                                        <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                                        Loading content...
                                    </div>
                                ) : (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{previewContent || ""}</ReactMarkdown>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
