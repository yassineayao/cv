
import React from "react";
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
                {/* Visual: Architecture Diagram */}
                <div className="relative w-full max-w-md p-6 bg-muted/10 rounded-xl border border-dashed border-primary/20">
                    <div className="absolute -top-3 left-6 px-2 bg-background text-xs font-mono text-muted-foreground">System Architecture</div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                        {/* Mobile App */}
                        <div className="col-span-1 p-3 bg-card rounded shadow-sm border border-border flex flex-col items-center gap-2">
                            <Smartphone className="w-6 h-6 text-primary" />
                            <span className="text-xs font-bold">Expo Mobile</span>
                        </div>
                        {/* Admin Panel */}
                        <div className="col-span-1 p-3 bg-card rounded shadow-sm border border-border flex flex-col items-center gap-2">
                            <Globe className="w-6 h-6 text-primary" />
                            <span className="text-xs font-bold">Next.js Admin</span>
                        </div>

                        {/* Arrows */}
                        <div className="col-span-2 flex justify-center py-2">
                            <ArrowDown className="w-4 h-4 text-muted-foreground animate-bounce" />
                        </div>

                        {/* Backend */}
                        <div className="col-span-2 p-4 bg-primary/5 rounded border border-primary/20 flex flex-col gap-2">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-sm font-bold uppercase tracking-wider">Core API (Node.js)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-2 bg-background rounded text-xs border">DDD Modules</div>
                                <div className="p-2 bg-background rounded text-xs border">Auth Domain</div>
                            </div>
                        </div>

                        {/* Arrows */}
                        <div className="col-span-2 flex justify-center py-2">
                            <ArrowDown className="w-4 h-4 text-muted-foreground" />
                        </div>

                        {/* DB */}
                        <div className="col-span-2 p-3 bg-card rounded shadow-sm border border-border flex items-center justify-center gap-2">
                            <Database className="w-5 h-5 text-blue-500" />
                            <span className="text-xs font-bold">PostgreSQL + Redis</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
