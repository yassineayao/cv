
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InteractiveIconProps {
    icon: LucideIcon;
    label: string;
    className?: string;
    onClick?: () => void;
}

export function InteractiveIcon({
    icon: Icon,
    label,
    className,
    onClick,
}: InteractiveIconProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        onClick={onClick}
                        className={cn(
                            "p-3 rounded-full bg-secondary/50 hover:bg-secondary cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-glow",
                            className
                        )}
                    >
                        <Icon className="w-8 h-8 text-primary" />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
