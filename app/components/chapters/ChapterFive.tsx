
import React from "react";
import { StoryCard } from "@/components/ui/story-card";
import { Trophy, Scroll, Star, Award, Medal } from "lucide-react";

export function ChapterFive() {
    return (
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse items-center justify-center p-8 bg-muted/30 relative overflow-hidden">

            <div className="absolute top-10 right-10 opacity-5">
                <Award className="w-64 h-64" />
            </div>

            <div className="flex-1 flex justify-center p-8 animate-in zoom-in duration-700">
                {/* Visual: Trophy Case */}
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                    <div className="bg-card p-6 rounded-xl border-2 border-yellow-500/20 shadow-lg flex flex-col items-center gap-2 hover:scale-105 transition-transform">
                        <Trophy className="w-12 h-12 text-yellow-500" />
                        <span className="text-xs font-bold text-center">Client Satisfaction</span>
                        <div className="flex text-yellow-400"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                    </div>
                    <div className="bg-card p-6 rounded-xl border-2 border-primary/20 shadow-lg flex flex-col items-center gap-2 hover:scale-105 transition-transform delay-100">
                        <Scroll className="w-12 h-12 text-primary" />
                        <span className="text-xs font-bold text-center">Architecture</span>
                    </div>
                    <div className="col-span-2 bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-xl border border-primary/20 flex items-center justify-center gap-4 hover:scale-105 transition-transform delay-200">
                        <Medal className="w-16 h-16 text-primary" />
                        <div className="text-left">
                            <div className="font-bold text-lg">Full-Stack Mastery</div>
                            <div className="text-sm text-muted-foreground">End-to-End Delivery</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-xl p-8 animate-in slide-in-from-left duration-700 delay-200">
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Chapter 5</h3>
                    <h2 className="text-4xl font-extrabold mb-4">Achievements</h2>
                </div>

                <StoryCard title="Quests Completed">
                    <ul className="space-y-4 text-lg text-muted-foreground">
                        <li className="flex gap-3">
                            <Star className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                            <span>Worked directly with clients, translating vague ideas into robust technical solutions.</span>
                        </li>
                        <li className="flex gap-3">
                            <Star className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                            <span>Made key architectural decisions solo, ensuring scalability and maintainability.</span>
                        </li>
                        <li className="flex gap-3">
                            <Star className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                            <span>Maintained long-term relationships and projects after initial delivery.</span>
                        </li>
                    </ul>
                </StoryCard>
            </div>
        </section>
    );
}
