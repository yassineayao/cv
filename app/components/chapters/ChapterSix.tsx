
import React from "react";
import { StoryCard } from "@/components/ui/story-card";
import { GraduationCap, Library, Book } from "lucide-react";

export function ChapterSix() {
    return (
        <section className="h-screen w-full snap-start flex flex-col md:flex-row items-center justify-center p-8 bg-background relative overflow-hidden">

            <div className="absolute bottom-0 left-0 opacity-5 w-full">
                <Library className="w-full h-64" />
            </div>

            <div className="flex-1 max-w-xl p-8 animate-in slide-in-from-left duration-700">
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Chapter 6</h3>
                    <h2 className="text-4xl font-extrabold mb-4">Education</h2>
                </div>

                <StoryCard title="Knowledge Acquired">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <GraduationCap className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Master’s Degree in Computer Science</h3>
                            <p className="text-muted-foreground text-lg">Faculty of Sciences, Sidi Mohamed Ben Abdellah University</p>
                            <p className="text-sm text-muted-foreground mt-1">Fez, Morocco | 2016</p>
                        </div>
                    </div>
                    <p className="mt-6 text-muted-foreground leading-relaxed">
                        Combining academic foundations with self-taught agility to solve complex problems.
                    </p>
                </StoryCard>
            </div>

            <div className="flex-1 flex justify-center p-8 animate-in slide-in-from-right duration-700 delay-200">
                <div className="relative">
                    <div className="absolute -top-10 -left-10 text-9xl font-serif text-primary/5">"</div>
                    <div className="w-64 h-80 bg-primary/80 rounded-r-3xl rounded-bl-3xl shadow-2xl skew-y-3 flex items-center justify-center relative overlow-hidden transform transition-all hover:skew-y-0">
                        <div className="absolute inset-2 border-2 border-white/20 rounded-r-2xl rounded-bl-2xl"></div>
                        <Book className="w-32 h-32 text-white" />
                    </div>
                </div>
            </div>
        </section>
    );
}
