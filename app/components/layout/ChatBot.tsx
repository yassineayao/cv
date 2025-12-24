"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Scroll, X, Send, Bot, User, Loader2, Sparkles, MessageCircle, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

const SUGGESTED_PROMPTS = [
    "What are your main skills?",
    "Tell me about your latest project",
    "What's your tech stack?",
    "Are you available for hire?",
];

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [localInput, setLocalInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { messages, sendMessage, isLoading } = useChat() as any;
    const [showPulse, setShowPulse] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) setShowPulse(false);
    }, [isOpen]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSuggestedPrompt = (prompt: string) => {
        sendMessage({ text: prompt });
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={cn(
                            "mb-4 flex flex-col transition-all duration-300 ease-in-out",
                            isFullScreen
                                ? "fixed inset-4 w-auto h-auto sm:w-auto sm:h-auto max-h-none z-[110]"
                                : "w-[90vw] sm:w-[420px] h-[70vh] sm:h-[600px] max-h-[700px]"
                        )}
                    >
                        <Card className={cn(
                            "flex-1 flex flex-col overflow-hidden border-primary/30 shadow-2xl bg-background/98 backdrop-blur-2xl transition-all duration-300",
                            isFullScreen ? "rounded-2xl" : "rounded-3xl"
                        )}>
                            {/* Header */}
                            <div className="p-4 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground flex items-center justify-between relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50 pointer-events-none" />
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base leading-none">Chat with Yassine</h3>
                                        <span className="text-xs opacity-80 flex items-center gap-1 mt-0.5">
                                            <Sparkles className="w-3 h-3" /> AI-powered clone
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 relative z-10">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsFullScreen(!isFullScreen)}
                                        className="hover:bg-white/20 text-primary-foreground h-9 w-9 rounded-xl hidden sm:flex"
                                        title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                                    >
                                        {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleChat}
                                        className="hover:bg-white/20 text-primary-foreground h-9 w-9 rounded-xl"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/20 to-transparent"
                            >
                                {messages.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-6 px-4"
                                    >
                                        <div className="relative">
                                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                                                <Scroll className="w-8 h-8 text-primary" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                <Sparkles className="w-3 h-3 text-primary-foreground" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold">Hi, I&apos;m Yassine! 👋</p>
                                            <p className="text-xs text-muted-foreground max-w-[250px]">
                                                Ask me about my skills, projects, or experience. I&apos;m here to help!
                                            </p>
                                        </div>

                                        <div className="w-full space-y-2">
                                            <p className="text-xs text-muted-foreground font-medium">Try asking:</p>
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {SUGGESTED_PROMPTS.map((prompt, i) => (
                                                    <motion.button
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        onClick={() => handleSuggestedPrompt(prompt)}
                                                        className="text-xs px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all hover:scale-105 active:scale-95"
                                                    >
                                                        {prompt}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {messages.map((m: any, index: number) => {
                                    const isLastMessage = index === messages.length - 1;
                                    const isAssistantMessage = m.role === "assistant";
                                    const messageText = m.parts?.find((p: any) => p.type === 'text')?.text || m.content || '';
                                    const showTypingInBubble = isLastMessage && isAssistantMessage && isLoading && !messageText;

                                    return (
                                        <motion.div
                                            key={m.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: isLastMessage ? 0.1 : 0 }}
                                            className={cn(
                                                "flex items-end gap-2",
                                                m.role === "user" ? "flex-row-reverse" : "flex-row"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                                    m.role === "user"
                                                        ? "bg-gradient-to-br from-muted to-muted/50 border"
                                                        : "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
                                                )}
                                            >
                                                {m.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                                            </div>
                                            <div
                                                className={cn(
                                                    "px-4 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm",
                                                    m.role === "user"
                                                        ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md"
                                                        : "bg-card border rounded-bl-md"
                                                )}
                                            >
                                                {showTypingInBubble ? (
                                                    // Typing animation inside the bubble
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-muted-foreground font-medium">
                                                            Typing
                                                        </span>
                                                        <div className="flex items-center gap-0.5">
                                                            <motion.span
                                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                                transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                                                                className="text-primary text-lg font-bold leading-none"
                                                            >.</motion.span>
                                                            <motion.span
                                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                                transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                                                                className="text-primary text-lg font-bold leading-none"
                                                            >.</motion.span>
                                                            <motion.span
                                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                                transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                                                                className="text-primary text-lg font-bold leading-none"
                                                            >.</motion.span>
                                                        </div>
                                                    </div>
                                                ) : m.role === "user" ? (
                                                    m.parts?.map((part: any, i: number) => {
                                                        if (part.type === 'text') {
                                                            return <div key={i}>{part.text}</div>;
                                                        }
                                                        return null;
                                                    }) || m.content
                                                ) : (
                                                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-headings:my-2 prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-muted prose-pre:p-2 prose-pre:rounded-lg">
                                                        {m.parts?.map((part: any, i: number) => {
                                                            if (part.type === 'text') {
                                                                return <ReactMarkdown key={i}>{part.text}</ReactMarkdown>;
                                                            }
                                                            return null;
                                                        }) || <ReactMarkdown>{m.content}</ReactMarkdown>}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}

                                {/* Show standalone typing bubble only when loading and no assistant message exists yet */}
                                {isLoading && (messages.length === 0 || messages[messages.length - 1]?.role === "user") && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-end gap-2"
                                    >
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
                                            <Bot className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="bg-card border px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground font-medium">
                                                    Yassine is typing
                                                </span>
                                                <div className="flex items-center gap-0.5">
                                                    <motion.span
                                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                                        transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                                                        className="text-primary text-lg font-bold leading-none"
                                                    >.</motion.span>
                                                    <motion.span
                                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                                        transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                                                        className="text-primary text-lg font-bold leading-none"
                                                    >.</motion.span>
                                                    <motion.span
                                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                                        transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                                                        className="text-primary text-lg font-bold leading-none"
                                                    >.</motion.span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Input */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (localInput.trim() && !isLoading) {
                                        sendMessage({ text: localInput });
                                        setLocalInput("");
                                    }
                                }}
                                className="p-4 border-t bg-card/50 backdrop-blur-sm flex items-center gap-3"
                            >
                                <input
                                    ref={inputRef}
                                    value={localInput}
                                    onChange={(e) => setLocalInput(e.target.value)}
                                    placeholder="Ask me anything..."
                                    disabled={isLoading}
                                    className="flex-1 bg-background border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60 disabled:opacity-50"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!localInput.trim() || isLoading}
                                    className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating button */}
            <div className="relative">
                {showPulse && !isOpen && (
                    <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-primary rounded-full pointer-events-none"
                    />
                )}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleChat}
                    data-tour="chatbot"
                    className={cn(
                        "relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
                        isOpen
                            ? "bg-card text-foreground border border-primary/20"
                            : "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:shadow-glow-primary"
                    )}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                            >
                                <MessageCircle className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
}
