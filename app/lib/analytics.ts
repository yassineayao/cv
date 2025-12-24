import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export interface VisitInfo {
    ip: string;
    userAgent: string;
    path: string;
    referer: string;
    country?: string;
    city?: string;
    region?: string;
    device?: string;
    browser?: string;
    os?: string;
}

export async function getVisitMetadata(path: string): Promise<VisitInfo> {
    const headersList = await headers();

    // IP Extraction
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    // User Agent
    const ua = headersList.get("user-agent") || "";
    const referer = headersList.get("referer") || "";

    // Device & Browser Parsing
    const parser = new UAParser(ua);
    const device = parser.getDevice().type || "desktop";
    const browser = `${parser.getBrowser().name || "Unknown"} ${parser.getBrowser().version || ""}`;
    const os = `${parser.getOS().name || "Unknown"} ${parser.getOS().version || ""}`;

    const info: VisitInfo = {
        ip,
        userAgent: ua,
        path,
        referer,
        device,
        browser,
        os,
    };

    // Skip geolocation for local IPs
    if (ip !== "127.0.0.1" && ip !== "::1") {
        try {
            // Free IP Geolocation API (IP-API)
            const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city`);
            const geoData = await geoRes.json();

            if (geoData.status === "success") {
                info.country = geoData.country;
                info.region = geoData.regionName;
                info.city = geoData.city;
            }
        } catch (e) {
            console.error("Geo-tracking error:", e);
        }
    }

    return info;
}
