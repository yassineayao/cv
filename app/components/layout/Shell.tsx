
import React from "react";
import { cn } from "@/lib/utils";

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Shell({ children, className, ...props }: ShellProps) {
    return (
        <div
            className={cn(
                "h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative",
                "bg-background text-foreground",
                className
            )}
            {...props}
        >
            <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-primary/20 hover:bg-primary transition-colors cursor-pointer" />
                ))}
            </div>
            {children}
        </div>
    );
}
