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

            <div className="max-w-3xl text-center space-y-6 sm:space-y-12 animate-in fade-in duration-1000 px-2">
                <div className="space-y-2 sm:space-y-4">
                    <h3 className="text-xs sm:text-sm font-bold text-primary tracking-widest uppercase mb-1 sm:mb-2">Final Chapter</h3>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight lg:text-7xl font-serif">
                        {config.contactPage.title}
                    </h2>
                    <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
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


