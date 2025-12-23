
import React from "react";
import { StoryCard } from "@/components/ui/story-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Rocket, Server, Layout } from "lucide-react";
import { InteractiveIcon } from "@/components/ui/interactive-icon";

export function ChapterTwo() {
    return (
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse items-center justify-center p-8 bg-background relative overflow-hidden">

            {/* Background decoration representing islands */}
            <div className="absolute top-10 left-10 opacity-5">
                <Globe className="w-64 h-64" />
            </div>

            <div className="flex-1 flex justify-center p-8 animate-in slide-in-from-right duration-700">
                {/* Visual: Bridge building or deployment */}
                <div className="relative w-full max-w-sm aspect-square bg-muted/20 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center group overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-1 bg-primary/20 rotate-45 transform translate-y-12"></div>
                        <div className="w-32 h-1 bg-primary/20 -rotate-45 transform -translate-y-12"></div>
                    </div>

                    <div className="z-10 text-center space-y-4">
                        <Rocket className="w-16 h-16 mx-auto text-primary animate-pulse" />
                        <Button variant="default" className="w-full">
                            Deploy <span className="ml-2 font-mono text-xs opacity-70">git push</span>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-xl p-8 animate-in slide-in-from-left duration-700 delay-200">
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Chapter 2</h3>
                    <h2 className="text-4xl font-extrabold mb-4">Freelance Quests</h2>
                </div>

                <StoryCard title="Independent Problem Solver">
                    <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                        I worked as a freelancer, handling full-stack projects end-to-end.
                        From API design to frontend implementation, I took ownership of each project, managing deployment with Docker on VPS servers.
                    </p>
                </StoryCard>

                <div className="mt-8 space-y-4">
                    <h4 className="font-semibold px-1">Skill Set</h4>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="px-3 py-1">Node.js</Badge>
                        <Badge variant="secondary" className="px-3 py-1">Express</Badge>
                        <Badge variant="secondary" className="px-3 py-1">PostgreSQL</Badge>
                        <Badge variant="secondary" className="px-3 py-1">Next.js</Badge>
                        <Badge variant="secondary" className="px-3 py-1">React</Badge>
                        <Badge variant="secondary" className="px-3 py-1">Tailwind</Badge>
                        <Badge variant="secondary" className="px-3 py-1">Docker</Badge>
                    </div>
                </div>
            </div>
        </section>
    );
}
