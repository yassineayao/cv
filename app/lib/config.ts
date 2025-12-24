/**
 * Storybook CV Configuration
 * 
 * Edit this file to customize your CV with your personal information.
 * All data displayed in the app is sourced from here.
 */

export const config = {
    // ============================================
    // PERSONAL INFO
    // ============================================
    personal: {
        name: "Yassine",
        fullName: "Yassine Ayaou",
        title: "Full-Stack Developer",
        location: "Taroudant / Remote",
        tagline: "Crafting digital experiences with clean code",
    },

    // ============================================
    // CONTACT & SOCIAL LINKS
    // ============================================
    contact: {
        email: "yassineayaou@gmail.com",
        github: "https://github.com/yassineayao",
        upwork: "https://www.upwork.com/freelancers/~01f9823dc543971585",
        linkedin: "", // Add your LinkedIn URL
        twitter: "", // Add your Twitter/X URL
        portfolio: "", // Add your portfolio URL
        resumeUrl: "/resume.pdf",
    },

    // ============================================
    // CHAPTER 1: THE BEGINNING
    // ============================================
    beginning: {
        title: "The Beginning",
        subtitle: "Self-Learning Adventure",
        startYear: "2018",
        description: "In 2018-2019, I began my journey as a self-taught developer, exploring CRUD apps and REST APIs to understand how the frontend and backend connect.",
        highlights: [
            { label: "Start Year", value: "2018" },
            { label: "First Concept", value: "CRUD" },
        ],
    },

    // ============================================
    // CHAPTER 2: FREELANCE EXPERIENCE
    // ============================================
    freelance: {
        title: "Freelance Quests",
        subtitle: "Independent Problem Solver",
        description: "I worked as a freelancer, handling full-stack projects end-to-end. From API design to frontend implementation, I took ownership of each project, managing deployment with Docker on VPS servers.",
        skills: ["Node.js", "Express", "PostgreSQL", "Next.js", "React", "Tailwind", "Docker"],
    },

    // ============================================
    // CHAPTER 3: SKILLS & TOOLS
    // ============================================
    skills: {
        title: "Skills & Magic",
        subtitle: "Tools of the Trade",
        description: "I craft intuitive UI with Shadcn and Tailwind, handle authentication and forms, and leverage server components and API routes in Next.js App Router.",
        tools: [
            { name: "Shadcn UI", category: "frontend" },
            { name: "Tailwind CSS", category: "frontend" },
            { name: "Next.js App Router", category: "frontend" },
            { name: "Auth.js", category: "backend" },
            { name: "React Hook Form", category: "frontend" },
            { name: "Server Actions", category: "backend" },
            { name: "Expo", category: "mobile" },
        ],
        // Featured skills shown on cover page
        featured: ["Node.js", "Next.js", "PostgreSQL", "Docker"],
    },

    // ============================================
    // CHAPTER 4: CURRENT PROJECT
    // ============================================
    currentProject: {
        title: "Current Adventure",
        projectName: "Tourism Trips App",
        description: "Currently, I am developing a trips management app for a tourism agency. I manage the full product from A to Z, solving scalability challenges via Domain Driven Design.",
        technologies: ["Node.js", "Next.js", "PostgreSQL", "Docker", "Expo"],
    },

    // ============================================
    // CHAPTER 5: ACHIEVEMENTS
    // ============================================
    achievements: {
        title: "Achievements",
        subtitle: "Quests Completed",
        items: [
            "Worked directly with clients, translating vague ideas into robust technical solutions.",
            "Made key architectural decisions solo, ensuring scalability and maintainability.",
            "Maintained long-term relationships and projects after initial delivery.",
        ],
    },

    // ============================================
    // CHAPTER 6: EDUCATION
    // ============================================
    education: {
        title: "Education",
        subtitle: "Knowledge Acquired",
        degree: "Master's Degree in Computer Science",
        university: "Faculty of Sciences, Sidi Mohamed Ben Abdellah University",
        location: "Fez, Morocco",
        year: "2016",
        description: "Combining academic foundations with self-taught agility to solve complex problems.",
    },

    // ============================================
    // CHAPTER 7: CONTACT PAGE
    // ============================================
    contactPage: {
        title: "Let's Connect",
        subtitle: "The Story Continues...",
        description: "Ready for the next chapter? Whether you have a project idea, want to collaborate, or just want to chat about code, I'd love to hear from you.",
        cta: "Let's build something amazing together.",
    },

    // ============================================
    // LANGUAGES (for resume)
    // ============================================
    languages: [
        { name: "Arabic", level: "Native" },
        { name: "English", level: "Professional" },
        { name: "French", level: "Professional" },
    ],

    // ============================================
    // SEO & METADATA
    // ============================================
    seo: {
        title: "Yassine Ayaou | Full-Stack Developer",
        description: "Full-Stack Developer specializing in Node.js, Next.js, and PostgreSQL. Building scalable web applications with clean architecture.",
        keywords: ["Full-Stack Developer", "Node.js", "Next.js", "React", "PostgreSQL", "Docker"],
    },
};

// Type exports for better IDE support
export type Config = typeof config;
