
import React from "react";
import { StoryCard } from "@/components/ui/story-card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Box, Wand2, Database, Layout, Server, Lock, Smartphone } from "lucide-react";

export function ChapterThree() {
    const skills = [
        { name: "Shadcn UI", icon: Layout },
        { name: "Tailwind CSS", icon: Wand2 },
        { name: "Next.js App Router", icon: Server },
        { name: "Auth.js", icon: Lock },
        { name: "React Hook Form", icon: Box },
        { name: "Server Actions", icon: Database },
        { name: "Expo", icon: Smartphone },
    ];

    return (
        <section className="h-screen w-full snap-start flex flex-col md:flex-row items-center justify-center p-8 bg-muted/20 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-5">
                <Sparkles className="w-96 h-96 text-yellow-500 animate-pulse" />
            </div>

            <div className="flex-1 flex justify-center p-8 animate-in zoom-in duration-700">
                {/* Visual: Magic Chest */}
                <div className="relative group">
                    <div className="w-64 h-48 bg-amber-900/80 rounded-lg shadow-2xl flex items-end justify-center pb-4 border-4 border-amber-700 relative overflow-visible transform transition-transform group-hover:scale-105">
                        <div className="absolute -top-10 w-64 h-24 bg-amber-800 rounded-t-full border-4 border-amber-700 origin-bottom transition-transform duration-500 group-hover:-rotate-12 z-10 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-yellow-500 shadow-glow"></div>
                        </div>
                        <div className="text-amber-100 font-serif text-xl tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">SKILLS</div>
                    </div>

                    {/* Floating Skills coming out of chest */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                        {skills.map((skill, i) => (
                            <div key={skill.name}
                                className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                                style={{
                                    top: `-${(i + 1) * 30}px`,
                                    left: `${(i % 2 === 0 ? 1 : -1) * (i * 10)}px`,
                                    transitionDelay: `${i * 100}ms`
                                }}>
                                <Badge variant="outline" className="bg-background/80 backdrop-blur border-yellow-500/50 shadow-glow-sm flex gap-2 items-center whitespace-nowrap">
                                    <skill.icon className="w-3 h-3 text-yellow-500" />
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
                    <h2 className="text-4xl font-extrabold mb-4">Skills & Magic</h2>
                </div>

                <StoryCard title="Tools of the Trade">
                    <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                        I craft intuitive UI with Shadcn and Tailwind, handle authentication and forms, and leverage server components and API routes in Next.js App Router.
                    </p>
                </StoryCard>
            </div>
        </section>
    );
}
