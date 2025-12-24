"use client";

import React, { useState, useEffect } from "react";
import Joyride, { CallBackProps, STATUS, Step, Styles } from "react-joyride";
import { useTheme } from "@/components/layout/ThemeProvider";

// Custom styling to match the portfolio theme
const getStyles = (isDark: boolean): Partial<Styles> => ({
    options: {
        arrowColor: isDark ? 'hsl(240 5.9% 10%)' : 'hsl(0 0% 100%)',
        backgroundColor: isDark ? 'hsl(240 5.9% 10%)' : 'hsl(0 0% 100%)',
        overlayColor: 'rgba(0, 0, 0, 0.7)',
        primaryColor: 'hsl(142.1 76.2% 36.3%)', // primary green
        textColor: isDark ? 'hsl(0 0% 98%)' : 'hsl(240 10% 3.9%)',
        zIndex: 10000,
    },
    tooltip: {
        borderRadius: 16,
        padding: 20,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    tooltipContainer: {
        textAlign: 'left',
    },
    tooltipTitle: {
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 8,
    },
    tooltipContent: {
        fontSize: 14,
        lineHeight: 1.6,
    },
    buttonNext: {
        backgroundColor: 'hsl(142.1 76.2% 36.3%)',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        padding: '10px 20px',
    },
    buttonBack: {
        color: isDark ? 'hsl(0 0% 63.9%)' : 'hsl(240 5.9% 46.1%)',
        marginRight: 10,
    },
    buttonSkip: {
        color: isDark ? 'hsl(0 0% 63.9%)' : 'hsl(240 5.9% 46.1%)',
    },
    spotlight: {
        borderRadius: 12,
    },
});

const TOUR_STEPS: Step[] = [
    {
        target: 'body',
        content: 'Welcome to my interactive portfolio! Let me give you a quick tour of the key features.',
        placement: 'center',
        disableBeacon: true,
        title: '👋 Welcome!',
    },
    {
        target: '[data-tour="nav-dots"]',
        content: 'Use these navigation dots to jump between different chapters of my story. Hover over them to see chapter titles.',
        placement: 'left',
        title: '📍 Navigation',
        spotlightPadding: 10,
    },
    {
        target: '[data-tour="theme-toggle"]',
        content: 'Prefer a different look? Toggle between light and dark themes here.',
        placement: 'bottom',
        title: '🌓 Theme Switch',
    },
    {
        target: '[data-tour="chatbot"]',
        content: 'Have questions? Chat with my AI clone! It knows everything about my experience, skills, and projects.',
        placement: 'top',
        title: '🤖 AI Assistant',
    },
    {
        target: '[data-tour="admin-link"]',
        content: 'If you\'re an admin, access the dashboard here to manage the knowledge base and view analytics.',
        placement: 'bottom',
        title: '⚙️ Admin Access',
    },
    {
        target: '[data-tour="github-link"]',
        content: 'Curious about the code? View the full source code of this portfolio on GitHub.',
        placement: 'bottom',
        title: '💻 View Source',
    },
];

const STORAGE_KEY = 'portfolio-tour-completed';

export function TourGuide() {
    const [run, setRun] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);
        // Check if tour was already completed
        const completed = localStorage.getItem(STORAGE_KEY);
        if (!completed) {
            // Small delay to ensure all elements are rendered
            const timer = setTimeout(() => setRun(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleCallback = (data: CallBackProps) => {
        const { status } = data;
        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setRun(false);
            localStorage.setItem(STORAGE_KEY, 'true');
        }
    };

    if (!mounted) return null;

    return (
        <Joyride
            callback={handleCallback}
            continuous
            hideCloseButton
            run={run}
            scrollToFirstStep
            showProgress
            showSkipButton
            steps={TOUR_STEPS}
            styles={getStyles(theme === 'dark')}
            locale={{
                back: 'Back',
                close: 'Close',
                last: 'Finish Tour',
                next: 'Next',
                skip: 'Skip Tour',
            }}
        />
    );
}
