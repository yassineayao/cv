
import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yassine | Full-Stack Developer",
  description: "Interactive Storybook CV of Yassine, a Full-Stack Developer.",
};

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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          <VisitTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
