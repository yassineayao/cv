"use client";

import { useEffect, useRef } from "react";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

interface SessionPlayerProps {
    events: any[];
}

export function SessionPlayer({ events }: SessionPlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || events.length < 2) return;

        // Clean up previous instance if any (though strict mode might cause double render, rrweb helper usually handles it or we manually clear)
        containerRef.current.innerHTML = "";

        try {
            const player = new rrwebPlayer({
                target: containerRef.current,
                props: {
                    events,
                    width: 1024,
                    height: 576,
                    autoPlay: true,
                },
            });
        } catch (e) {
            console.error("Failed to initialize player", e);
        }
    }, [events]);

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-zinc-900 rounded-lg">
            <div ref={containerRef} id="rrweb-player-container" />
        </div>
    );
}
