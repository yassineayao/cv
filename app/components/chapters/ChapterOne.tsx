
import React from "react";
import { StoryCard } from "@/components/ui/story-card";
import { BookOpen, Code, Layers } from "lucide-react";

export function ChapterOne() {
    return (
        <section className="h-screen w-full snap-start flex flex-col md:flex-row items-center justify-center p-8 bg-muted/30 relative">
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-5">
                <BookOpen className="w-96 h-96" />
            </div>

            <div className="flex-1 flex justify-center p-8 animate-in slide-in-from-left duration-700">
                {/* Illustration Placeholder - Using Generic Icons for now */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 bg-primary/10 rounded-full flex items-center justify-center shadow-2xl">
                    <Code className="w-32 h-32 text-primary" />
                    <div className="absolute -bottom-4 -right-4 bg-background p-4 rounded-xl shadow-lg border">
                        <Layers className="w-8 h-8 text-muted-foreground" />
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-xl p-8 animate-in slide-in-from-right duration-700 delay-200">
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Chapter 1</h3>
                    <h2 className="text-4xl font-extrabold mb-4">The Beginning</h2>
                </div>

                <StoryCard title="Self-Learning Adventure">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        In 2018-2019, I began my journey as a self-taught developer, exploring CRUD apps and REST APIs to understand how the frontend and backend connect.
                    </p>
                </StoryCard>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-lg border text-center hover:border-primary transition-colors cursor-default">
                        <span className="block text-2xl font-bold mb-1">2018</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Start Year</span>
                    </div>
                    <div className="bg-card p-4 rounded-lg border text-center hover:border-primary transition-colors cursor-default">
                        <span className="block text-2xl font-bold mb-1">CRUD</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">First Concept</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
