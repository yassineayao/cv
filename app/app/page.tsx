
import { Shell } from "@/components/layout/Shell";
import { Cover } from "@/components/chapters/Cover";
import { ChapterOne } from "@/components/chapters/ChapterOne";
import { ChapterTwo } from "@/components/chapters/ChapterTwo";
import { ChapterThree } from "@/components/chapters/ChapterThree";
import { ChapterFour } from "@/components/chapters/ChapterFour";
import { ChapterFive } from "@/components/chapters/ChapterFive";
import { ChapterSix } from "@/components/chapters/ChapterSix";
import { ChapterSeven } from "@/components/chapters/ChapterSeven";

export default function Home() {
  return (
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
  );
}
