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
    Bot,
    MessageSquare,
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    User,
    Monitor,
    Globe,
    Clock,
    Smartphone
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
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    stats: {
        totalVisits: number;
        topCountries: { name: string; count: number }[];
    };
}

interface ChatMessage {
    id: string;
    role: string;
    content: string;
    createdAt: string;
}

interface ChatSession {
    id: string;
    createdAt: string;
    updatedAt: string;
    ip: string | null;
    country: string | null;
    city: string | null;
    region: string | null;
    device: string | null;
    browser: string | null;
    os: string | null;
    messages: ChatMessage[];
}

interface ChatLogsData {
    sessions: ChatSession[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'knowledge' | 'analytics' | 'chats'>('knowledge');
    const [sources, setSources] = useState<Source[]>([]);
    const [stats, setStats] = useState<Stats>({ pointsCount: 0, status: "idle" });
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [chatLogs, setChatLogs] = useState<ChatLogsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [analyticsLoading, setAnalyticsLoading] = useState(false);
    const [chatsLoading, setChatsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination state
    const [analyticsPage, setAnalyticsPage] = useState(1);
    const [knowledgePage, setKnowledgePage] = useState(1);
    const [chatPage, setChatPage] = useState(1);
    const itemsPerPage = 8;

    const router = useRouter();

    // Preview state
    const [previewContent, setPreviewContent] = useState<string | null>(null);
    const [previewFilename, setPreviewFilename] = useState<string | null>(null);
    const [previewLoading, setPreviewLoading] = useState(false);

    // Chat logs - selected user state
    const [selectedUserIp, setSelectedUserIp] = useState<string | null>(null);

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

    const fetchAnalytics = async (page = 1, search = searchTerm) => {
        try {
            setAnalyticsLoading(true);
            const res = await fetch(`/api/admin/analytics?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(search)}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setAnalytics(data);
            setAnalyticsPage(page);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: "Failed to load analytics data." });
        } finally {
            setAnalyticsLoading(false);
        }
    };

    const fetchChatLogs = async (page = 1, search = searchTerm) => {
        try {
            setChatsLoading(true);
            const res = await fetch(`/api/admin/chat-logs?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(search)}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setChatLogs(data);
            setChatPage(page);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: "Failed to load chat logs." });
        } finally {
            setChatsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'analytics') {
            const timer = setTimeout(() => {
                fetchAnalytics(1, searchTerm);
            }, 500);
            return () => clearTimeout(timer);
        } else if (activeTab === 'chats') {
            const timer = setTimeout(() => {
                fetchChatLogs(1, searchTerm);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (activeTab === 'knowledge') {
            fetchData();
        } else if (activeTab === 'analytics') {
            fetchAnalytics(1);
        } else if (activeTab === 'chats') {
            fetchChatLogs(1);
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
        await signOut({ redirect: false });
        window.location.href = "/login";
    };

    const Pagination = ({
        currentPage,
        totalPages,
        onPageChange,
        totalItems,
        label
    }: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
        totalItems: number;
        label: string;
    }) => {
        if (totalPages <= 1) return null;

        return (
            <div className="px-6 py-4 border-t bg-muted/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xs text-muted-foreground font-medium">
                    Showing <span className="text-foreground">{Math.min(itemsPerPage * currentPage, totalItems)}</span> of <span className="text-foreground">{totalItems}</span> {label}
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary"
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <div className="flex items-center px-4 h-8 bg-primary/10 rounded-lg border border-primary/20 text-xs font-bold text-primary">
                        Page {currentPage} of {totalPages}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary"
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        );
    };

    const paginatedSources = sources.slice((knowledgePage - 1) * itemsPerPage, knowledgePage * itemsPerPage);

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
                        <div className="bg-muted/50 p-1 rounded-lg flex gap-1 mr-2 border border-border/50">
                            <Button
                                variant={activeTab === 'knowledge' ? 'default' : 'ghost'}
                                size="sm"
                                className={cn(
                                    "h-8 text-xs font-bold transition-all",
                                    activeTab === 'knowledge' ? "shadow-sm" : "text-muted-foreground hover:text-foreground"
                                )}
                                onClick={() => setActiveTab('knowledge')}
                            >
                                Knowledge
                            </Button>
                            <Button
                                variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                                size="sm"
                                className={cn(
                                    "h-8 text-xs font-bold transition-all",
                                    activeTab === 'analytics' ? "shadow-sm" : "text-muted-foreground hover:text-foreground"
                                )}
                                onClick={() => setActiveTab('analytics')}
                            >
                                Analytics
                            </Button>
                            <Button
                                variant={activeTab === 'chats' ? 'default' : 'ghost'}
                                size="sm"
                                className={cn(
                                    "h-8 text-xs font-bold transition-all",
                                    activeTab === 'chats' ? "shadow-sm" : "text-muted-foreground hover:text-foreground"
                                )}
                                onClick={() => setActiveTab('chats')}
                            >
                                Chats
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
                                    className="flex-1 sm:flex-none border-primary/40 bg-primary/5 hover:bg-primary/20 transition-all font-bold"
                                >
                                    {actionLoading === 'upload' ? (
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin text-primary" />
                                    ) : (
                                        <Plus className="w-4 h-4 mr-2 text-primary" />
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
                                variant="secondary"
                                onClick={() => fetchAnalytics(1)}
                                disabled={analyticsLoading}
                                className="flex-1 sm:flex-none bg-primary/20 text-foreground hover:bg-primary/30 border border-primary/30 font-bold transition-all shadow-glow-primary/20"
                            >
                                <RefreshCw className={cn("w-4 h-4 mr-2 text-primary", analyticsLoading && "animate-spin")} />
                                Refresh Status
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

                {activeTab === 'knowledge' && (
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
                                            paginatedSources.map((source) => (
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
                            <Pagination
                                currentPage={knowledgePage}
                                totalPages={Math.ceil(sources.length / itemsPerPage)}
                                onPageChange={setKnowledgePage}
                                totalItems={sources.length}
                                label="documents"
                            />
                        </Card>
                    </>
                )} {activeTab === 'analytics' && (
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
                            <div className="p-6 border-b bg-muted/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Bot className="w-5 h-5 opacity-70" />
                                    Recent Visits Log
                                </h2>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Filter by IP, location, path..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-background border rounded-lg py-2 pl-9 pr-8 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full"
                                        >
                                            <X className="w-3 h-3 text-muted-foreground" />
                                        </button>
                                    )}
                                </div>
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
                                            analytics.visits
                                                .map((visit) => (
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
                                                        <td className="px-6 py-4 hidden md:table-cell whitespace-nowrap overflow-hidden max-w-[120px]">
                                                            <div className="text-xs truncate">{visit.device || "Unknown Device"}</div>
                                                            <div className="text-[10px] text-muted-foreground truncate">{visit.os} / {visit.browser}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-xs truncate max-w-[150px] font-mono group-hover:text-primary transition-colors">
                                                                {visit.path}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {analytics && (
                                <Pagination
                                    currentPage={analyticsPage}
                                    totalPages={analytics.pagination.totalPages}
                                    onPageChange={(page) => fetchAnalytics(page, searchTerm)}
                                    totalItems={analytics.pagination.total}
                                    label="results"
                                />
                            )}
                        </Card>
                    </>
                )}

                {activeTab === 'chats' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Users List */}
                        <Card className="overflow-hidden border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm lg:col-span-1">
                            <div className="p-4 border-b bg-muted/20">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold flex items-center gap-2">
                                        <User className="w-5 h-5 opacity-70" />
                                        Users
                                    </h2>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => fetchChatLogs(chatPage, searchTerm)}
                                        disabled={chatsLoading}
                                        className="h-8 w-8"
                                        title="Refresh Logs"
                                    >
                                        <RefreshCw className={cn("w-4 h-4", chatsLoading && "animate-spin")} />
                                    </Button>
                                </div>
                                <div className="relative mt-3">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Filter users..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-background border rounded-lg py-2 pl-9 pr-8 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full"
                                        >
                                            <X className="w-3 h-3 text-muted-foreground" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="max-h-[600px] overflow-y-auto">
                                {chatsLoading ? (
                                    <div className="p-8 text-center text-muted-foreground italic">
                                        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 opacity-50" />
                                        Loading...
                                    </div>
                                ) : !chatLogs || chatLogs.sessions.length === 0 ? (
                                    <div className="p-8 text-center text-muted-foreground italic">
                                        No users found.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-border/40">
                                        {/* Group sessions by IP to create unique users */}
                                        {Array.from(
                                            chatLogs.sessions.reduce((acc, session) => {
                                                const key = session.ip || 'unknown';
                                                if (!acc.has(key)) {
                                                    acc.set(key, {
                                                        ip: session.ip,
                                                        country: session.country,
                                                        city: session.city,
                                                        device: session.device,
                                                        browser: session.browser,
                                                        os: session.os,
                                                        sessions: [],
                                                        totalMessages: 0,
                                                        lastActive: session.updatedAt
                                                    });
                                                }
                                                const user = acc.get(key)!;
                                                user.sessions.push(session);
                                                user.totalMessages += session.messages.length;
                                                if (new Date(session.updatedAt) > new Date(user.lastActive)) {
                                                    user.lastActive = session.updatedAt;
                                                }
                                                return acc;
                                            }, new Map<string, { ip: string | null; country: string | null; city: string | null; device: string | null; browser: string | null; os: string | null; sessions: ChatSession[]; totalMessages: number; lastActive: string }>())
                                        ).map(([ip, user]) => (
                                            <button
                                                key={ip}
                                                onClick={() => setSelectedUserIp(ip)}
                                                className={cn(
                                                    "w-full p-4 text-left hover:bg-muted/20 transition-colors",
                                                    selectedUserIp === ip && "bg-primary/10 border-l-2 border-primary"
                                                )}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                                                            <span className="font-medium text-sm truncate">
                                                                {user.country || "Unknown"}{user.city && `, ${user.city}`}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground font-mono truncate">
                                                            {user.ip || "No IP"}
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <Smartphone className="w-3 h-3" />
                                                                {user.device || "Unknown"}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Monitor className="w-3 h-3" />
                                                                {user.browser || "Unknown"}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground mt-1">
                                                            {user.os || "Unknown OS"}
                                                        </div>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <Badge variant="secondary" className="text-xs">
                                                            {user.sessions.length} {user.sessions.length === 1 ? 'session' : 'sessions'}
                                                        </Badge>
                                                        <div className="text-[10px] text-muted-foreground mt-1">
                                                            {user.totalMessages} msgs
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {chatLogs && (
                                <Pagination
                                    currentPage={chatPage}
                                    totalPages={chatLogs.pagination.totalPages}
                                    onPageChange={(page) => fetchChatLogs(page, searchTerm)}
                                    totalItems={chatLogs.pagination.total}
                                    label="sessions"
                                />
                            )}
                        </Card>

                        {/* Sessions & Messages */}
                        <Card className="overflow-hidden border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm lg:col-span-2">
                            <div className="p-4 border-b bg-muted/20">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 opacity-70" />
                                    {selectedUserIp ? "Conversations" : "Select a User"}
                                </h2>
                                {selectedUserIp && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Showing sessions for: <span className="font-mono">{selectedUserIp}</span>
                                    </p>
                                )}
                            </div>

                            <div className="max-h-[600px] overflow-y-auto">
                                {!selectedUserIp ? (
                                    <div className="p-12 text-center text-muted-foreground">
                                        <User className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                        <p>Select a user from the list to view their chat sessions.</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-border/40">
                                        {chatLogs?.sessions
                                            .filter(session => session.ip === selectedUserIp)
                                            .map((session) => (
                                                <div key={session.id} className="p-4">
                                                    {/* Session Header */}
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4 text-primary" />
                                                            <span className="text-sm font-medium">
                                                                Session: {new Date(session.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <Badge variant="outline" className="text-xs">
                                                            {session.messages.length} messages
                                                        </Badge>
                                                    </div>

                                                    {/* Messages */}
                                                    <div className="space-y-3 bg-muted/10 p-3 rounded-lg">
                                                        {session.messages.map((msg) => (
                                                            <div key={msg.id} className="flex gap-3">
                                                                {/* Avatar */}
                                                                <div className={cn(
                                                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
                                                                    msg.role === 'user'
                                                                        ? "bg-muted text-foreground"
                                                                        : "bg-primary text-primary-foreground"
                                                                )}>
                                                                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                                                </div>

                                                                {/* Message Content */}
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className={cn(
                                                                            "text-xs font-semibold uppercase",
                                                                            msg.role === 'user' ? "text-foreground" : "text-primary"
                                                                        )}>
                                                                            {msg.role}
                                                                        </span>
                                                                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                                            <Clock className="w-3 h-3" />
                                                                            {new Date(msg.createdAt).toLocaleString()}
                                                                        </span>
                                                                    </div>
                                                                    <div className={cn(
                                                                        "text-sm p-2 rounded-lg",
                                                                        msg.role === 'user'
                                                                            ? "bg-muted/50"
                                                                            : "bg-primary/5 border border-primary/10"
                                                                    )}>
                                                                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
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
        </div >
    );
}
