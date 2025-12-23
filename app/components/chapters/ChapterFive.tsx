
import React from "react";
import Image from "next/image";
import { StoryCard } from "@/components/ui/story-card";
import { Star, Award } from "lucide-react";
import { config } from "@/lib/config";

export function ChapterFive() {
    return (
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse items-center justify-center p-8 bg-muted/30 relative overflow-hidden">

            <div className="absolute top-10 right-10 opacity-5">
                <Award className="w-64 h-64" />
            </div>

            <div className="flex-1 flex justify-center p-8 animate-in zoom-in duration-700">
                {/* Visual: Trophy Case Illustration */}
                <div className="relative w-full max-w-sm aspect-[3/4] rounded-t-full rounded-b-lg shadow-2xl border-b-8 border-amber-900 bg-amber-950/20 overflow-hidden">
                    <Image src="/assets/chapter5.png" alt="Trophy Shelf" fill className="object-cover" />
                </div>
            </div>

            <div className="flex-1 max-w-xl p-8 animate-in slide-in-from-left duration-700 delay-200">
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Chapter 5</h3>
                    <h2 className="text-4xl font-extrabold mb-4">{config.achievements.title}</h2>
                </div>

                <StoryCard title={config.achievements.subtitle}>
                    <ul className="space-y-4 text-lg text-muted-foreground">
                        {config.achievements.items.map((achievement, index) => (
                            <li key={index} className="flex gap-3">
                                <Star className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                                <span>{achievement}</span>
                            </li>
                        ))}
                    </ul>
                </StoryCard>
            </div>
        </section>
    );
}
