
import React from "react";
import Image from "next/image";
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
                <div className="relative w-full max-w-sm aspect-square rounded-xl shadow-2xl border-4 border-white overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                    <Image src="/assets/chapter2.png" alt="Freelance Quests" fill className="object-cover" />
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
