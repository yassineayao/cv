import { Shell } from "@/components/layout/Shell";
import { Cover } from "@/components/chapters/Cover";
import { ChapterOne } from "@/components/chapters/ChapterOne";
import { ChapterTwo } from "@/components/chapters/ChapterTwo";
import { ChapterThree } from "@/components/chapters/ChapterThree";
import { ChapterFour } from "@/components/chapters/ChapterFour";
import { ChapterFive } from "@/components/chapters/ChapterFive";
import { ChapterSix } from "@/components/chapters/ChapterSix";
import { ChapterSeven } from "@/components/chapters/ChapterSeven";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ChatBot } from "@/components/layout/ChatBot";
import { TourGuide } from "@/components/layout/TourGuide";
import { Settings, Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <TourGuide />
      <ThemeToggle />
      <Link
        href="/admin"
        className="fixed top-4 left-4 z-50 p-2 rounded-full border bg-background/50 backdrop-blur-sm shadow-lg hover:shadow-glow-primary transition-all text-muted-foreground hover:text-primary group"
        title="Admin Dashboard"
        data-tour="admin-link"
      >
        <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
      </Link>
      <a
        href="https://github.com/yassineayao/cv"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 left-16 z-50 p-2 rounded-full border bg-background/50 backdrop-blur-sm shadow-lg hover:shadow-glow-primary transition-all text-muted-foreground hover:text-primary group"
        title="View Source on GitHub"
        data-tour="github-link"
      >
        <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </a>
      <ChatBot />
      <Shell>
        <Cover />
        <ChapterOne />
        <ChapterTwo />
        <ChapterThree />
        <ChapterFour />
        <ChapterFive />
        <ChapterSix />
        <ChapterSeven />
      </Shell>
    </>
  );
}
