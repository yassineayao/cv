
import React from "react";
import Image from "next/image";
import { StoryCard } from "@/components/ui/story-card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Box, Wand2, Database, Layout, Server, Lock, Smartphone } from "lucide-react";
import { config } from "@/lib/config";

export function ChapterThree() {
    // Icon mapping for skills
    const iconMap: Record<string, typeof Layout> = {
        "Shadcn UI": Layout,
        "Tailwind CSS": Wand2,
        "Next.js App Router": Server,
        "Auth.js": Lock,
        "React Hook Form": Box,
        "Server Actions": Database,
        "Expo": Smartphone,
    };

    return (
        <section className="h-screen w-full snap-start flex flex-col md:flex-row items-center justify-center p-8 bg-muted/20 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-5">
                <Sparkles className="w-96 h-96 text-yellow-500 animate-pulse" />
            </div>

            <div className="flex-1 flex justify-center p-8 animate-in zoom-in duration-700">
                {/* Visual: Magic Chest */}
                <div className="relative group w-80 h-80">
                    <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border-4 border-amber-500/50">
                        <Image src="/assets/chapter3.png" alt="Skills Chest" fill className="object-cover" />
                    </div>

                    {/* Floating Skills overlay */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-10">
                        {config.skills.tools.map((skill, i) => (
                            <div key={skill.name}
                                className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                                style={{
                                    top: `-${(i + 1) * 30}px`,
                                    left: `${(i % 2 === 0 ? 1 : -1) * (i * 10)}px`,
                                    transitionDelay: `${i * 100}ms`
                                }}>
                                <Badge variant="outline" className="bg-background/80 backdrop-blur border-yellow-500/50 shadow-glow-sm flex gap-2 items-center whitespace-nowrap">
                                    {iconMap[skill.name] && React.createElement(iconMap[skill.name], { className: "w-3 h-3 text-yellow-500" })}
                                    {skill.name}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-xl p-8 animate-in slide-in-from-right duration-700 delay-200">
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Chapter 3</h3>
                    <h2 className="text-4xl font-extrabold mb-4">{config.skills.title}</h2>
                </div>

                <StoryCard title={config.skills.subtitle}>
                    <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                        {config.skills.description}
                    </p>
                </StoryCard>
            </div>
        </section>
    );
}
