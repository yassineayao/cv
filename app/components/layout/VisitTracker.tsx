"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const track = async () => {
            try {
                await fetch("/api/analytics/track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ path: pathname }),
                });
            } catch (error) {
                // Fail silently to not affect user experience
                console.debug("Analytics failed silently");
            }
        };

        track();
    }, [pathname]);

    return null;
}
