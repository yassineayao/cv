
import React from "react";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface StoryCardProps extends React.ComponentProps<typeof Card> {
    title?: string;
    description?: string;
}

export function StoryCard({
    title,
    description,
    children,
    className,
    ...props
}: StoryCardProps) {
    return (
        <Card
            className={cn(
                "bg-card/80 backdrop-blur-sm shadow-lg border-primary/20",
                className
            )}
            {...props}
        >
            {(title || description) && (
                <CardHeader>
                    <CardTitle className="text-2xl font-serif">{title}</CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}
            <CardContent className="prose dark:prose-invert">
                {children}
            </CardContent>
        </Card>
    );
}
