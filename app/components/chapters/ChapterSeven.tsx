"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Mail, Globe, ArrowRight, Download } from "lucide-react";
import { config } from "@/lib/config";

export function ChapterSeven() {
    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = config.contact.resumeUrl;
        link.download = `${config.personal.name}_Resume.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-t from-background to-muted/30 relative overflow-hidden overflow-y-auto">

            <div className="max-w-4xl text-center space-y-6 sm:space-y-10 animate-in fade-in duration-1000 px-4 relative z-10">
                {/* Chapter Image */}
                <div className="flex justify-center mb-4 sm:mb-8">
                    <div className="relative group">
                        <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 text-4xl sm:text-6xl font-serif text-primary/10">"</div>
                        <div className="w-32 h-32 sm:w-48 sm:h-48 bg-primary/5 rounded-3xl shadow-xl rotate-3 relative overflow-hidden transform transition-all hover:rotate-0 group-hover:scale-105 duration-500 border border-primary/10">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10 opacity-40 group-hover:opacity-10 transition-opacity" />
                            <img
                                src="/assets/chapter7.png"
                                alt="Final Chapter"
                                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-2 border border-white/20 rounded-2xl z-20 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2 sm:space-y-4">
                    <h3 className="text-[10px] sm:text-xs font-bold text-primary tracking-[0.3em] uppercase mb-1 sm:mb-2 opacity-80">The Finale</h3>
                    <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight lg:text-8xl font-serif mb-2 sm:mb-4">
                        {config.contactPage.title}
                    </h2>
                    <p className="text-base sm:text-xl text-muted-foreground/80 max-w-2xl mx-auto font-medium">
                        {config.contactPage.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-4xl mx-auto">
                    <a
                        href={config.contact.upwork}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-card p-4 sm:p-8 rounded-xl sm:rounded-2xl border hover:border-primary/50 transition-all hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-row sm:flex-col items-center gap-3 sm:gap-4 shadow-lg hover:shadow-glow-primary"
                    >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                            <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="text-left sm:text-center">
                            <h3 className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1">Upwork</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">Hire me for a project</p>
                        </div>
                    </a>

                    <a
                        href={config.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-card p-4 sm:p-8 rounded-xl sm:rounded-2xl border hover:border-primary/50 transition-all hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-row sm:flex-col items-center gap-3 sm:gap-4 shadow-lg hover:shadow-glow-primary"
                    >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                            <Github className="w-6 h-6 sm:w-8 sm:h-8 text-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="text-left sm:text-center">
                            <h3 className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1">GitHub</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">View my code quests</p>
                        </div>
                    </a>

                    <a
                        href={`mailto:${config.contact.email}`}
                        className="group bg-card p-4 sm:p-8 rounded-xl sm:rounded-2xl border hover:border-primary/50 transition-all hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-row sm:flex-col items-center gap-3 sm:gap-4 shadow-lg hover:shadow-glow-primary"
                    >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="text-left sm:text-center">
                            <h3 className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1">Email</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">Send a raven</p>
                        </div>
                    </a>
                </div>

                <div className="pt-4 sm:pt-8">
                    <Button
                        size="lg"
                        className="rounded-full px-6 sm:px-8 text-base sm:text-lg font-bold gap-2 group shadow-glow-primary hover:shadow-glow transition-all"
                        onClick={handleDownloadResume}
                    >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        Download Resume
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </section>
    );
}


