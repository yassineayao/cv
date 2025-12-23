
import React from "react";
import Image from "next/image";
import { StoryCard } from "@/components/ui/story-card";
import { BookOpen } from "lucide-react";
import { config } from "@/lib/config";

export function ChapterOne() {
    return (
        <section className="h-screen w-full snap-start flex flex-col md:flex-row items-center justify-center p-8 bg-muted/30 relative overflow-hidden transition-all duration-500">
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-5">
                <BookOpen className="w-96 h-96 animate-pulse-slow" />
            </div>

            <div className="flex-1 flex justify-center p-8 animate-in slide-in-from-left duration-700">
                <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500">
                    <Image src="/assets/chapter1.png" alt={config.beginning.title} fill className="object-cover" />
                </div>
            </div>

            <div className="flex-1 max-w-xl p-8 animate-in slide-in-from-right duration-700 delay-200">
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Chapter 1</h3>
                    <h2 className="text-4xl font-extrabold mb-4 font-serif">{config.beginning.title}</h2>
                </div>

                <StoryCard title={config.beginning.subtitle}>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        {config.beginning.description}
                    </p>
                </StoryCard>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    {config.beginning.highlights.map((highlight) => (
                        <div key={highlight.label} className="bg-card p-4 rounded-lg border text-center hover:border-primary hover:shadow-glow-primary transition-all cursor-default">
                            <span className="block text-2xl font-bold mb-1">{highlight.value}</span>
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">{highlight.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
