"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { config } from "@/lib/config";
import { ChevronUp } from "lucide-react";

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const sectionTitles = [
    "Cover",
    config.beginning.title,
    config.freelance.title,
    config.skills.title,
    config.currentProject.title,
    config.achievements.title,
    config.education.title,
    config.contactPage.title,
];

export function Shell({ children, className, ...props }: ShellProps) {
    const [activeSection, setActiveSection] = useState(0);
    const totalSections = 8;

    useEffect(() => {
        const handleScroll = (e: Event) => {
            const target = e.target as HTMLDivElement;
            const scrollPercentage = target.scrollTop / (target.scrollHeight - target.clientHeight);
            const section = Math.round(scrollPercentage * (totalSections - 1));
            setActiveSection(section);
        };

        const container = document.querySelector('[data-scroll-container]');
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (index: number) => {
        const container = document.querySelector('[data-scroll-container]');
        if (container) {
            const sectionHeight = container.scrollHeight / totalSections;
            container.scrollTo({
                top: sectionHeight * index,
                behavior: 'smooth'
            });
        }
    };

    const scrollToTop = () => {
        const container = document.querySelector('[data-scroll-container]');
        if (container) {
            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div
            data-scroll-container
            className={cn(
                "h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative",
                "bg-background text-foreground",
                className
            )}
            {...props}
        >
            {/* Navigation Dots with Hover Titles */}
            <div className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-3 z-50 hidden sm:flex">
                {Array.from({ length: totalSections }).map((_, i) => (
                    <div key={i} className="relative group flex items-center justify-end">
                        {/* Title label - appears on hover */}
                        <span className="absolute right-full mr-3 px-3 py-1.5 text-sm font-medium bg-card/95 backdrop-blur border rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 pointer-events-none">
                            {sectionTitles[i]}
                        </span>

                        <button
                            onClick={() => scrollToSection(i)}
                            className={cn(
                                "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 hover:scale-150",
                                activeSection === i
                                    ? "bg-primary w-6 md:w-8 shadow-glow-primary"
                                    : "bg-primary/20 hover:bg-primary/50"
                            )}
                            aria-label={`Go to ${sectionTitles[i]}`}
                        />
                    </div>
                ))}
            </div>

            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-muted/20 z-50">
                <div
                    className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 transition-all duration-300"
                    style={{ width: `${(activeSection / (totalSections - 1)) * 100}%` }}
                />
            </div>

            {/* Mobile Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={cn(
                    "fixed bottom-6 right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-50 transition-all duration-300 sm:hidden",
                    activeSection > 0
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                )}
                aria-label="Scroll to top"
            >
                <ChevronUp className="w-6 h-6" />
            </button>

            {children}
        </div>
    );
}
