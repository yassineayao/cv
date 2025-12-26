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

        // Cleanup function
        const cleanup = () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
            }
        };
        cleanup();

        // Optimize events if too many
        let playerEvents = events;
        if (events.length > 5000) {
            // Downsample mouse move events (type 3, source 1)
            // Keep:
            // - All non-incremental events (type != 3)
            // - All incremental non-mouse events (type 3, source != 1)
            // - 1 out of every N mouse events
            const mouseMoveRate = events.length > 10000 ? 5 : 2; // Aggressive downsample for huge recordings
            let mouseCount = 0;

            playerEvents = events.filter(e => {
                if (e.type === 3 && e.data?.source === 1) {
                    mouseCount++;
                    return mouseCount % mouseMoveRate === 0;
                }
                return true;
            });
            console.log(`Optimized events: ${events.length} -> ${playerEvents.length}`);
        }

        let currentPlayer: any = null;

        try {
            currentPlayer = new rrwebPlayer({
                target: containerRef.current,
                props: {
                    events: playerEvents,
                    width: 1024,
                    height: 576,
                    autoPlay: true,
                    mouseTail: false,
                    showWarning: false,
                    skipInactive: true,
                },
            });
        } catch (e) {
            console.error("Failed to initialize player", e);
        }

        return () => {
            if (currentPlayer) {
                try {
                    // Try to stop/pause first
                    if (typeof currentPlayer.pause === 'function') currentPlayer.pause();
                    if (typeof currentPlayer.stop === 'function') currentPlayer.stop();

                    // Destroy
                    if (typeof currentPlayer.$destroy === 'function') currentPlayer.$destroy();
                    else if (typeof currentPlayer.destroy === 'function') currentPlayer.destroy();
                } catch (e) {
                    console.warn("Error cleaning up player", e);
                }
            }
            cleanup();
        };
    }, [events]);

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-zinc-900 rounded-lg">
            {events.length > 5000 && (
                <div className="text-yellow-500 mb-2 text-sm">
                    High event count ({events.length}). Playback might be heavy.
                </div>
            )}
            <div ref={containerRef} id="rrweb-player-container" />
        </div>
    );
}
