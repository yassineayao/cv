
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yassine | Full-Stack Developer",
  description: "Interactive Storybook CV of Yassine, a Full-Stack Developer.",
};

import { SessionRecorder } from "@/components/analytics/SessionRecorder";
import { VisitTracker } from "@/components/layout/VisitTracker";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased font-sans"
      >
        <ThemeProvider>
          <VisitTracker />
          <SessionRecorder />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
