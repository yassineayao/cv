
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InteractiveIcon } from "@/components/ui/interactive-icon";
import { Server, Database, LayoutTemplate, Container, Code2, Sparkles } from "lucide-react";

export function Cover() {
    return (
        <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-8 border-b-2 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
            {/* Enhanced Background with Image */}
            <div className="absolute inset-0 -z-10 opacity-20">
                <Image src="/assets/cover.png" alt="Cover Illustration" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90 backdrop-blur-[2px]"></div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
                <Code2 className="absolute top-20 left-20 w-32 h-32 rotate-12 animate-float" />
                <Database className="absolute bottom-20 right-20 w-40 h-40 -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
                <Sparkles className="absolute top-1/3 right-1/4 w-24 h-24 animate-pulse-slow" />
            </div>

            <div className="max-w-4xl text-center space-y-8 z-10 relative">
                <div className="space-y-4">
                    <h1 className="text-6xl font-extrabold tracking-tight lg:text-9xl text-gradient animate-in fade-in zoom-in duration-1000 font-serif">
                        Yassine
                    </h1>
                    <h2 className="text-3xl font-semibold text-muted-foreground animate-in slide-in-from-bottom duration-1000 delay-200">
                        Full-Stack Developer
                    </h2>
                    <p className="text-xl text-muted-foreground/80 animate-in slide-in-from-bottom duration-1000 delay-300">
                        Taroudant / Remote
                    </p>
                </div>

                <div className="flex gap-6 justify-center animate-in fade-in duration-1000 delay-500 flex-wrap">
                    <div className="animate-float" style={{ animationDelay: '0s' }}>
                        <InteractiveIcon icon={Server} label="Node.js" />
                    </div>
                    <div className="animate-float" style={{ animationDelay: '0.5s' }}>
                        <InteractiveIcon icon={LayoutTemplate} label="Next.js" />
                    </div>
                    <div className="animate-float" style={{ animationDelay: '1s' }}>
                        <InteractiveIcon icon={Database} label="PostgreSQL" />
                    </div>
                    <div className="animate-float" style={{ animationDelay: '1.5s' }}>
                        <InteractiveIcon icon={Container} label="Docker" />
                    </div>
                </div>

                <div className="flex gap-4 justify-center pt-8 animate-in fade-in duration-1000 delay-700">
                    <Button size="lg" className="rounded-full px-8 text-lg font-bold shadow-glow-primary hover:shadow-glow transition-all">
                        Start the Story
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 text-lg hover:bg-primary/10 transition-all">
                        Contact Me
                    </Button>
                </div>
            </div>
        </section>
    );
}
