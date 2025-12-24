
import React from "react";
import { StoryCard } from "@/components/ui/story-card";
import { GraduationCap, Library } from "lucide-react";
import { config } from "@/lib/config";

export function ChapterSix() {
    return (
        <section className="h-screen w-full snap-start flex flex-col md:flex-row items-center justify-center p-4 sm:p-8 bg-background relative overflow-hidden overflow-y-auto">

            <div className="absolute bottom-0 left-0 opacity-5 w-full hidden sm:block">
                <Library className="w-full h-32 sm:h-64" />
            </div>

            <div className="md:flex-1 max-w-xl p-4 sm:p-8 animate-in slide-in-from-left duration-700 order-2 md:order-1">
                <div className="mb-4 sm:mb-6">
                    <h3 className="text-xs sm:text-sm font-bold text-primary tracking-widest uppercase mb-1 sm:mb-2">Chapter 6</h3>
                    <h2 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4">{config.education.title}</h2>
                </div>

                <StoryCard title={config.education.subtitle}>
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="bg-primary/10 p-2 sm:p-3 rounded-full shrink-0">
                            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-base sm:text-xl font-bold">{config.education.degree}</h3>
                            <p className="text-muted-foreground text-sm sm:text-lg">{config.education.university}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{config.education.location} | {config.education.year}</p>
                        </div>
                    </div>
                    <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {config.education.description}
                    </p>
                </StoryCard>
            </div>

            <div className="flex-shrink-0 flex justify-center p-4 sm:p-8 animate-in slide-in-from-right duration-700 delay-200 order-1 md:order-2">
                <div className="relative">
                    <div className="absolute -top-6 sm:-top-10 -left-6 sm:-left-10 text-6xl sm:text-9xl font-serif text-primary/5">"</div>
                    <div className="w-44 h-56 sm:w-72 sm:h-96 bg-primary/10 rounded-2xl shadow-2xl skew-y-3 relative overflow-hidden transform transition-all hover:skew-y-0 group border border-primary/20">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity" />
                        <img
                            src="/assets/chapter6.png"
                            alt="Education"
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-2 border border-white/30 rounded-xl z-20 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}

