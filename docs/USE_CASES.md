# AI Story Advisor: Use Cases & Interaction Guide

The AI Story Advisor is designed to provide value across several common user interaction patterns. This document outlines how the bot handles different types of inquiries.

## 💼 Case 1: The Hiring Manager
**Goal**: Quick validation of technical skills and experience.

| User Query | AI Strategy | Expected Result |
|------------|-------------|-----------------|
| "What projects has Yassine worked on?" | Retrieve "Professional Experience" and "Current Project" chunks. | Lists the freelance projects and the Tourism Management App. |
| "Does he know Docker?" | Sparse/Keyword search for "Docker". | Confirms usage in production environments and personal projects. |
| "Is he a junior or senior?" | Retrieve "Professional Summary" (5+ years exp). | Clearly states 5+ years of experience, acting with professional confidence. |

## 🤝 Case 2: The Potential Client
**Goal**: Determining project fit and availability.

| User Query | AI Strategy | Expected Result |
|------------|-------------|-----------------|
| "Can you build me a mobile app?" | Retrieve "Core Competencies" (Expo/React Native). | Enthusiastically confirms ability to build cross-platform apps using React Native. |
| "How can I hire you?" | Retrieve "Contact" links (Upwork, GitHub). | Provides direct links to Yassine's Upwork profile and email. |
| "Do you work with international clients?" | Retrieve summary about "autonomous architectural decisions for international clients". | Shares experience working independently with global clients. |

## 🛠️ Case 3: The Technical Peer
**Goal**: Exploring architectural choices and stack depth.

| User Query | AI Strategy | Expected Result |
|------------|-------------|-----------------|
| "What's your preferred tech stack?" | Retrieve "Core Competencies" table. | Highlights Node.js, Next.js, and PostgreSQL as favorites. |
| "How do you handle complex business logic?" | Retrieve "Highlights" of Current Project (Domain Driven Design). | Discusses implementation of DDD for the current tourism project. |

## 🌟 Interaction Tips for Best Results
- **First Person**: Always speak to the bot as if you are talking to Yassine.
- **Specifics**: Asking about specific technologies (e.g., "Prisma", "Tailwind") yields very precise answers due to the **Sparse Index**.
- **Contextual Awareness**: The bot remembers previous messages in the conversation to maintain flow.
- **Rich Formatting**: Responses often include lists, tables, and bold text for easy scanning.
