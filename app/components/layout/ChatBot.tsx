"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Scroll, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [localInput, setLocalInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const { messages, sendMessage, isLoading } = useChat() as any;

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[90vw] sm:w-[400px] h-[500px] sm:h-[600px] flex flex-col"
                    >
                        <Card className="flex-1 flex flex-col overflow-hidden border-primary/20 shadow-2xl bg-background/95 backdrop-blur-xl">
                            {/* Header */}
                            <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between shadow-lg">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-white/20 rounded-lg">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm leading-none">AI Story Advisor</h3>
                                        <span className="text-[10px] opacity-80 flex items-center gap-1">
                                            <Sparkles className="w-2 h-2" /> Powered by RAG
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleChat}
                                    className="hover:bg-white/20 text-primary-foreground h-8 w-8"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Messages */}
                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/10"
                            >
                                {messages.length === 0 && (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70 px-6">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Scroll className="w-6 h-6 text-primary" />
                                        </div>
                                        <p className="text-sm font-medium">
                                            Welcome! Ask me anything about Yassine&apos;s journey, skills, or projects.
                                        </p>
                                    </div>
                                )}
                                {messages.map((m: any) => (
                                    <div
                                        key={m.id}
                                        className={cn(
                                            "flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                                            m.role === "user" ? "flex-row-reverse" : "flex-row"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm",
                                                m.role === "user" ? "bg-muted" : "bg-primary text-primary-foreground"
                                            )}
                                        >
                                            {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div
                                            className={cn(
                                                "p-3 rounded-2xl max-w-[80%] text-sm shadow-sm",
                                                m.role === "user"
                                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                                    : "bg-muted rounded-tl-none"
                                            )}
                                        >
                                            {m.parts?.map((part: any, i: number) => {
                                                if (part.type === 'text') {
                                                    return <div key={i}>{part.text}</div>;
                                                }
                                                return null;
                                            }) || m.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border bg-primary text-primary-foreground shadow-sm">
                                            <Bot className="w-4 h-4" />
                                        </div>
                                        <div className="bg-muted p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                            <span className="text-xs font-medium text-muted-foreground">Thinking...</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (localInput.trim()) {
                                        sendMessage({ text: localInput });
                                        setLocalInput("");
                                    }
                                }}
                                className="p-4 border-t bg-muted/30 flex items-center gap-2"
                            >
                                <input
                                    value={localInput}
                                    onChange={(e) => setLocalInput(e.target.value)}
                                    placeholder="Message advisor..."
                                    className="flex-1 bg-background border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!localInput.trim() || isLoading}
                                    className="rounded-full shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChat}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
                    isOpen
                        ? "bg-muted text-foreground border border-primary/20"
                        : "bg-primary text-primary-foreground hover:shadow-glow-primary"
                )}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Scroll className="w-6 h-6" />}
            </motion.button>
        </div>
    );
}
