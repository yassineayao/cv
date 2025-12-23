
import React from "react";
import Image from "next/image";
import { StoryCard } from "@/components/ui/story-card";
import { config } from "@/lib/config";

export function ChapterFour() {
    return (
        <section className="h-screen w-full snap-start flex flex-col md:flex-row items-center justify-center p-8 bg-background relative overflow-hidden">

            <div className="flex-1 max-w-xl p-8 animate-in slide-in-from-left duration-700 z-10">
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Chapter 4</h3>
                    <h2 className="text-4xl font-extrabold mb-4">{config.currentProject.title}</h2>
                </div>

                <StoryCard title={config.currentProject.projectName}>
                    <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                        {config.currentProject.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-sm font-mono text-muted-foreground">
                        {config.currentProject.technologies.map((tech) => (
                            <span key={tech}>#{tech}</span>
                        ))}
                    </div>
                </StoryCard>
            </div>

            <div className="flex-1 flex justify-center p-8 animate-in slide-in-from-right duration-700 delay-200">
                {/* Visual: Architecture Map Illustration */}
                <div className="relative w-full max-w-lg aspect-[4/3] rounded-xl shadow-2xl overflow-hidden border-8 border-amber-900/40 bg-amber-100">
                    <Image src="/assets/chapter4.png" alt="Architecture Map" fill className="object-cover" />
                </div>
            </div>
        </section>
    );
}
