
import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Mail, Globe, ArrowRight } from "lucide-react";

export function ChapterSeven() {
    return (
        <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-8 bg-gradient-to-t from-background to-muted/30 relative overflow-hidden">

            <div className="max-w-3xl text-center space-y-12 animate-in fade-in duration-1000">
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Final Chapter</h3>
                    <h2 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
                        Reach Out to the Hero
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        If you want to see my quests in action or recruit me for a new adventure:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
                    <a href="#" className="group bg-card p-8 rounded-2xl border hover:border-primary/50 transition-all hover:-translate-y-2 flex flex-col items-center gap-4 shadow-lg hover:shadow-primary/10">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Globe className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-lg mb-1">Upwork</h3>
                            <p className="text-sm text-muted-foreground">Hire me for a project</p>
                        </div>
                    </a>

                    <a href="#" className="group bg-card p-8 rounded-2xl border hover:border-primary/50 transition-all hover:-translate-y-2 flex flex-col items-center gap-4 shadow-lg hover:shadow-primary/10">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Github className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-lg mb-1">GitHub</h3>
                            <p className="text-sm text-muted-foreground">View my code quests</p>
                        </div>
                    </a>

                    <a href="mailto:your.email@example.com" className="group bg-card p-8 rounded-2xl border hover:border-primary/50 transition-all hover:-translate-y-2 flex flex-col items-center gap-4 shadow-lg hover:shadow-primary/10">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Mail className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-lg mb-1">Email</h3>
                            <p className="text-sm text-muted-foreground">Send a raven</p>
                        </div>
                    </a>
                </div>

                <div className="pt-8">
                    <Button size="lg" className="rounded-full px-8 text-lg font-bold gap-2 group">
                        Download Resume <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
