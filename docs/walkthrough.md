# Storybook CV - Walkthrough

This document outlines the features and components implemented for the Storybook CV project.

## Implementation Overview

The project is built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **Framer Motion** for animations. The UI uses **Shadcn UI** components customized with a "New York" style and "Neutral" color theme.

### Key Features

*   **Interactive Storybook Shell:** A scroll-snap based layout (`components/layout/Shell.tsx`) creates a "flipping page" experience.
*   **Smart Navigation:** Fixed navigation dots with active section tracking and smooth scrolling.
*   **Scroll Progress Bar:** Visual indicator at the top showing current position.
*   **Dark Mode Toggle:** Persistent theme switcher with localStorage support.
*   **Response Design:** Fully responsive layout that stacks on mobile and expands on desktop (`md:flex-row`).
*   **Rich Animations:** Floating elements, glow effects, and smooth transitions throughout.
*   **Custom Fonts:** `Playfair Display` for headings (serif) and `Geist Sans` for body text.

## UI Enhancements

*   **Custom Glow Effects:** Added `shadow-glow`, `shadow-glow-sm`, and `shadow-glow-primary` utilities
*   **Floating Animations:** Elements float smoothly with `animate-float` class
*   **Text Gradients:** Gradient text effects with `text-gradient` utility
*   **Hover States:** Interactive cards and buttons with enhanced hover effects
*   **Smooth Transitions:** All sections have polished entrance and exit animations

## Chapters Implemented

1.  **Cover Page:** Interactive introduction with floating tool icons and gradient text.
2.  **Chapter 1: The Beginning:** Narrative with illustrated timeline and hover effects.
3.  **Chapter 2: Freelance Quests:** Visualizes independent work with illustrated bridge.
4.  **Chapter 3: Skills & Magic:** Illustrated chest with floating skill badges on hover.
5.  **Chapter 4: Current Adventure:** Illustrated architecture map of tourism app.
6.  **Chapter 5: Achievements:** Illustrated trophy shelf showcasing accomplishments.
7.  **Chapter 6: Education:** Academic background with stylized book visual.
8.  **Chapter 7: Contact:** Social links with hover animations.

## Verification

### Manual Verification Steps
1.  **Run the app:** `bun run dev`
2.  **Navigation:** Scroll through all 7 chapters. Verify smooth snapping and progress bar.
3.  **Dark Mode:** Toggle theme with button in top-right corner.
4.  **Responsiveness:** Check mobile view in DevTools.
5.  **Interactions:** Hover over cards, icons, and images to see animations.

## Next Steps for User
*   Replace placeholder links in `ChapterSeven.tsx` (Upwork, GitHub, Email).
*   Add actual project images if desired.
*   Customize the resume download link.
*   Generate Islamic Arabic themed illustrations when quota resets.
