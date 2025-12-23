
import React from "react";
import { Button } from "@/components/ui/button";
import { InteractiveIcon } from "@/components/ui/interactive-icon";
import { Server, Database, LayoutTemplate, Container, Code2 } from "lucide-react";

export function Cover() {
    return (
        <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-8 border-b-2 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
                <Code2 className="absolute top-20 left-20 w-32 h-32 rotate-12" />
                <Database className="absolute bottom-20 right-20 w-40 h-40 -rotate-12" />
            </div>

            <div className="max-w-4xl text-center space-y-8 z-10">
                <div className="space-y-4">
                    <h1 className="text-6xl font-extrabold tracking-tight lg:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 animate-in fade-in zoom-in duration-1000">
                        Yassine
                    </h1>
                    <h2 className="text-3xl font-semibold text-muted-foreground animate-in slide-in-from-bottom duration-1000 delay-200">
                        Full-Stack Developer
                    </h2>
                    <p className="text-xl text-muted-foreground/80 animate-in slide-in-from-bottom duration-1000 delay-300">
                        Taroudant / Remote
                    </p>
                </div>

                <div className="flex gap-6 justify-center animate-in fade-in duration-1000 delay-500">
                    <InteractiveIcon icon={Server} label="Node.js" />
                    <InteractiveIcon icon={LayoutTemplate} label="Next.js" />
                    <InteractiveIcon icon={Database} label="PostgreSQL" />
                    <InteractiveIcon icon={Container} label="Docker" />
                </div>

                <div className="flex gap-4 justify-center pt-8 animate-in fade-in duration-1000 delay-700">
                    <Button size="lg" className="rounded-full px-8 text-lg font-bold">Start the Story</Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 text-lg">Contact Me</Button>
                </div>
            </div>
        </section>
    );
}
