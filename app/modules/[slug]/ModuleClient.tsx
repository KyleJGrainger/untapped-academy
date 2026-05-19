"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Module } from "@/lib/modules";
import Quiz from "@/components/Quiz";
import Practical from "@/components/Practical";
import Stamp from "@/components/Stamp";
import { getProgress, markComplete } from "@/lib/progress";

type Stage = "lesson" | "quiz" | "practical" | "stamp";

export default function ModuleClient({ module, nextSlug }: { module: Module; nextSlug?: string }) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("lesson");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const p = getProgress();
    setName(p.name || "");
    setEmail(p.email || "");
  }, []);

  const handlePass = () => {
    markComplete(module.slug);
    setStage("stamp");
  };

  if (stage === "lesson") {
    return (
      <div className="container">
        <div className="eyebrow">Module {String(module.number).padStart(2, "0")} &middot; {module.title}</div>
        <h1 className="smaller">{module.title.split(" ")[0]} like a senior recruiter.</h1>
        <p className="lead">{module.lead}</p>

        {module.sections.map((s, i) => (
          <div className="lesson-section" key={i}>
            <h2>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              {s.heading}
            </h2>
            {s.body.map((b, j) => (
              <p key={j} dangerouslySetInnerHTML={{ __html: b }} />
            ))}
            {i === 2 && module.goodPrompt && module.badPrompt && (
              <div className="good-bad">
                <div className="gb-card bad">
                  <div className="label">Bad prompt</div>
                  <pre>{module.badPrompt}</pre>
                </div>
                <div className="gb-card good">
                  <div className="label">Good prompt</div>
                  <pre>{module.goodPrompt}</pre>
                </div>
              </div>
            )}
            {i === 2 && module.rule && (
              <div className="callout">
                <strong>Untapped rule</strong>
                <p>{module.rule}</p>
              </div>
            )}
          </div>
        ))}

        <div className="btn-row">
          <Link href="/" className="btn btn-ghost">← Back to modules</Link>
          <button className="btn btn-primary" onClick={() => setStage("quiz")}>Take the quiz →</button>
        </div>
      </div>
    );
  }

  if (stage === "quiz") {
    return (
      <div className="container">
        <div className="eyebrow">Module {String(module.number).padStart(2, "0")} &middot; Knowledge check</div>
        <h2 style={{ fontSize: 36 }}>{module.quiz.length} questions. Get {Math.ceil(module.quiz.length * 0.8)} right to unlock the practical.</h2>
        <p className="lead">If you get any wrong, you&apos;ll see why and can retry.</p>

        <Quiz
          questions={module.quiz}
          passThreshold={Math.ceil(module.quiz.length * 0.8)}
          onPass={() => setStage("practical")}
          onBack={() => setStage("lesson")}
        />
      </div>
    );
  }

  if (stage === "practical") {
    return (
      <div className="container">
        <div className="eyebrow">Module {String(module.number).padStart(2, "0")} &middot; Practical exercise</div>
        <h2 style={{ fontSize: 36 }}>Now show us you can actually use it.</h2>
        <p className="lead">Your answer is graded by Claude against a rubric. You need 4 of 6 criteria to pass.</p>

        <Practical
          moduleSlug={module.slug}
          scenario={module.practical.scenario}
          onPass={handlePass}
          onBack={() => setStage("quiz")}
        />
      </div>
    );
  }

  // stamp
  return (
    <div className="container">
      <Stamp
        name={name}
        tool={module.tool}
        variant="module"
        nextHref={nextSlug ? `/modules/${nextSlug}` : "/complete"}
        nextLabel={nextSlug ? "Next module →" : "Claim your Graduate stamp →"}
        email={email}
      />
    </div>
  );
}
