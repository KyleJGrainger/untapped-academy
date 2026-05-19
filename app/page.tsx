import { MODULES } from "@/lib/modules";
import HomeClient from "./HomeClient";

export default function HomePage() {
  return <HomeClient modules={MODULES.map(m => ({
    slug: m.slug,
    number: m.number,
    title: m.title,
    durationMins: m.durationMins,
    quizCount: m.quiz.length,
    practicalCount: 1,
  }))} />;
}
