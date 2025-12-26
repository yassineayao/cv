"use client";

import { useEffect, useRef } from "react";
import { record } from "rrweb";

import { usePathname } from "next/navigation";

export function SessionRecorder() {
    const pathname = usePathname();
    const eventsRef = useRef<any[]>([]);
    const recordingIdRef = useRef<string | null>(null);
    const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Start recording
        const stopFn = record({
            emit(event) {
                eventsRef.current.push(event);
            },
            recordCanvas: false,
            sampling: {
                mousemove: 50,
                scroll: 150,
            },
            // optional configs
            checkoutEveryNth: 100,
            maskAllInputs: true,
        });

        // Initialize recording session
        const initSession = async () => {
            // Don't record admin pages
            if (window.location.pathname.startsWith('/admin')) return;

            try {
                const response = await fetch("/api/analytics/recording", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        path: window.location.pathname,
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    recordingIdRef.current = data.id;
                }
            } catch (error) {
                console.error("Failed to start recording session", error);
            }
        };

        if (!recordingIdRef.current) {
            initSession();
        }

        // Periodic save
        saveIntervalRef.current = setInterval(async () => {
            if (eventsRef.current.length > 0 && recordingIdRef.current) {
                const eventsToSend = [...eventsRef.current];
                eventsRef.current = []; // Clear buffer

                try {
                    await fetch(`/api/analytics/recording/${recordingIdRef.current}/chunk`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ events: eventsToSend }),
                    });
                } catch (error) {
                    console.error("Failed to save chunk", error);
                    // Optionally put events back? for now, lossy is arguably better than duplicate or storage explosion
                }
            }
        }, 5000); // 5 seconds

        // Limit session duration (hard stop after 4 mins)
        const hardStopTimeout = setTimeout(() => {
            if (stopFn) stopFn();
            console.log("Recording stopped due to time limit");
        }, 4 * 60 * 1000);

        return () => {
            if (stopFn) stopFn();
            clearTimeout(hardStopTimeout);
            if (saveIntervalRef.current) clearInterval(saveIntervalRef.current);

            // Try to flush remaining events
            if (eventsRef.current.length > 0 && recordingIdRef.current) {
                const eventsToSend = [...eventsRef.current];
                navigator.sendBeacon(
                    `/api/analytics/recording/${recordingIdRef.current}/chunk`,
                    JSON.stringify({ events: eventsToSend })
                );
            }
        };
    }, [pathname]); // Restart on path change

    return null;
}
