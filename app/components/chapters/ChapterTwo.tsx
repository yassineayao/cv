
import React from "react";
import Image from "next/image";
import { StoryCard } from "@/components/ui/story-card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { config } from "@/lib/config";

export function ChapterTwo() {
    return (
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse items-center justify-center p-4 sm:p-8 bg-background relative overflow-hidden overflow-y-auto">

            {/* Background decoration representing islands */}
            <div className="absolute top-10 left-10 opacity-5 hidden sm:block">
                <Globe className="w-32 sm:w-64 h-32 sm:h-64" />
            </div>

            <div className="flex-shrink-0 flex justify-center p-4 sm:p-8 animate-in slide-in-from-right duration-700">
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-xl shadow-2xl border-4 border-white overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                    <Image src="/assets/chapter2.png" alt={config.freelance.title} fill className="object-cover" />
                </div>
            </div>

            <div className="md:flex-1 max-w-xl p-4 sm:p-8 animate-in slide-in-from-left duration-700 delay-200">
                <div className="mb-4 sm:mb-6">
                    <h3 className="text-xs sm:text-sm font-bold text-primary tracking-widest uppercase mb-1 sm:mb-2">Chapter 2</h3>
                    <h2 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4">{config.freelance.title}</h2>
                </div>

                <StoryCard title={config.freelance.subtitle}>
                    <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-2 sm:mb-4">
                        {config.freelance.description}
                    </p>
                </StoryCard>

                <div className="mt-4 sm:mt-8 space-y-2 sm:space-y-4">
                    <h4 className="font-semibold px-1 text-sm sm:text-base">Skill Set</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {config.freelance.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm">{skill}</Badge>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

