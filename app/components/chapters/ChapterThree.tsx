
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
        <section className="h-screen w-full snap-start flex flex-col md:flex-row items-center justify-center p-4 sm:p-8 bg-muted/20 relative overflow-hidden overflow-y-auto">

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-5">
                <Sparkles className="w-48 sm:w-96 h-48 sm:h-96 text-yellow-500 animate-pulse" />
            </div>

            <div className="flex-shrink-0 flex justify-center p-4 sm:p-8 animate-in zoom-in duration-700">
                {/* Visual: Magic Chest */}
                <div className="relative group w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
                    <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border-4 border-amber-500/50">
                        <Image src="/assets/chapter3.png" alt="Skills Chest" fill className="object-cover" />
                    </div>

                    {/* Floating Skills overlay - hidden on mobile, shown on hover on desktop */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-10 hidden sm:block">
                        {config.skills.tools.map((skill, i) => (
                            <div key={skill.name}
                                className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                                style={{
                                    top: `-${(i + 1) * 25}px`,
                                    left: `${(i % 2 === 0 ? 1 : -1) * (i * 8)}px`,
                                    transitionDelay: `${i * 100}ms`
                                }}>
                                <Badge variant="outline" className="bg-background/80 backdrop-blur border-yellow-500/50 shadow-glow-sm flex gap-1.5 items-center whitespace-nowrap text-xs">
                                    {iconMap[skill.name] && React.createElement(iconMap[skill.name], { className: "w-3 h-3 text-yellow-500" })}
                                    {skill.name}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="md:flex-1 max-w-xl p-4 sm:p-8 animate-in slide-in-from-right duration-700 delay-200">
                <div className="mb-4 sm:mb-6">
                    <h3 className="text-xs sm:text-sm font-bold text-primary tracking-widest uppercase mb-1 sm:mb-2">Chapter 3</h3>
                    <h2 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4">{config.skills.title}</h2>
                </div>

                <StoryCard title={config.skills.subtitle}>
                    <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-2 sm:mb-4">
                        {config.skills.description}
                    </p>
                </StoryCard>

                {/* Mobile-friendly skill badges */}
                <div className="mt-4 sm:hidden flex flex-wrap gap-1.5">
                    {config.skills.tools.map((skill) => (
                        <Badge key={skill.name} variant="outline" className="text-xs px-2 py-0.5">
                            {skill.name}
                        </Badge>
                    ))}
                </div>
            </div>
        </section>
    );
}

