"use client";

import { useEffect, useRef } from "react";
import { record } from "rrweb";

export function SessionRecorder() {
    const eventsRef = useRef<any[]>([]);
    const recordingIdRef = useRef<string | null>(null);
    const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Start recording
        const stopFn = record({
            emit(event) {
                eventsRef.current.push(event);
            },
            // optional configs
            checkoutEveryNth: 100, // Checkout to reduce memory usage on long sessions? No, rrweb doesn't support this easily for playback.
            // masking logic can go here
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

        return () => {
            if (stopFn) stopFn();
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
    }, []);

    return null;
}
