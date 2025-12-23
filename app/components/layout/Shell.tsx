"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

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
            {/* Navigation Dots */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
                {Array.from({ length: totalSections }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToSection(i)}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-150",
                            activeSection === i
                                ? "bg-primary w-8 shadow-glow-primary"
                                : "bg-primary/20 hover:bg-primary/50"
                        )}
                        aria-label={`Go to section ${i + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-muted/20 z-50">
                <div
                    className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 transition-all duration-300"
                    style={{ width: `${(activeSection / (totalSections - 1)) * 100}%` }}
                />
            </div>

            {children}
        </div>
    );
}
