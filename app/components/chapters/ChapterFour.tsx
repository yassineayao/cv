
import React from "react";
import Image from "next/image";
import { StoryCard } from "@/components/ui/story-card";
import { GitBranch, Database, ShieldCheck, Smartphone, Globe, ArrowDown, Users } from "lucide-react";

export function ChapterFour() {
    return (
        <section className="h-screen w-full snap-start flex flex-col md:flex-row items-center justify-center p-8 bg-background relative overflow-hidden">

            <div className="flex-1 max-w-xl p-8 animate-in slide-in-from-left duration-700 z-10">
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Chapter 4</h3>
                    <h2 className="text-4xl font-extrabold mb-4">Current Adventure</h2>
                </div>

                <StoryCard title="Tourism Tips App">
                    <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                        Currently, I am developing a tips management app for a tourism agency.
                        I manage the full product from A to Z, solving scalability challenges via Domain Driven Design.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-sm font-mono text-muted-foreground">
                        <span>#Node.js</span> <span>#Next.js</span> <span>#PostgreSQL</span> <span>#Docker</span> <span>#Expo</span>
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
