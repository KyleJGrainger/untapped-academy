"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProgress, setIdentity } from "@/lib/progress";

type ModSummary = {
  slug: string; number: number; title: string;
  durationMins: number; quizCount: number; practicalCount: number;
};

export default function HomeClient({ modules }: { modules: ModSummary[] }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [hasIdentity, setHasIdentity] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const p = getProgress();
    setCompleted(p.completed);
    setHasIdentity(Boolean(p.name && p.email));
  }, []);

  const handleStart = () => {
    if (!name.trim() || !email.includes("@")) return;
    setIdentity(name.trim(), email.trim());
    setHasIdentity(true);
  };

  const slugs = modules.map(m => m.slug);
  const currentIdx = (() => {
    for (let i = 0; i < modules.length; i++) {
      if (!completed.includes(modules[i].slug)) return i;
    }
    return modules.length; // all done
  })();
  const allComplete = currentIdx === modules.length;

  if (hasIdentity === null) {
    return <div className="container"><p style={{ color: "var(--black-40)" }}>Loading…</p></div>;
  }

  if (!hasIdentity) {
    return (
      <div className="container">
        <div className="eyebrow">Welcome to Untapped Academy</div>
        <h1>Become a verified <em>AI-fluent</em> recruiter.</h1>
        <p className="lead">
          Every Untapped associate completes this training before working with clients. You&apos;ll cover
          the ten tools we use daily — and prove you can use them well. Pass each module&apos;s quiz
          and practical to earn your Untapped Academy stamp.
        </p>
        <div className="name-input">
          <input
            type="text" placeholder="Your full name"
            value={name} onChange={e => setName(e.target.value)}
          />
          <input
            type="email" placeholder="Your @tryuntapped.com email"
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleStart}
                  disabled={!name.trim() || !email.includes("@")}>
            Start the Academy →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="eyebrow">Untapped Academy</div>
      <h1>Ten tools. Ten modules. <em>One certified recruiter.</em></h1>
      <p className="lead">
        Work through them in order. Each module has a quiz and a practical exercise that an AI grader
        will assess in your voice. Once you pass all ten, you&apos;ll get your full Untapped Academy
        Graduate stamp.
      </p>

      <div className="modules-grid">
        {modules.map((m, i) => {
          const done = completed.includes(m.slug);
          const isCurrent = i === currentIdx;
          const locked = i > currentIdx;
          const classes = `module-card ${done ? "complete" : isCurrent ? "current" : locked ? "locked" : ""}`;
          const Inner = (
            <>
              <div className={`m-badge ${done ? "complete-badge" : isCurrent ? "current-badge" : "locked-badge"}`}>
                {done ? "Complete" : isCurrent ? "Current" : "Locked"}
              </div>
              <div className="m-num">Module {String(m.number).padStart(2, "0")}</div>
              <div className="m-title">{m.title}</div>
              <div className="m-meta">
                {m.durationMins} min &middot; {m.quizCount} quiz &middot; {m.practicalCount} practical
              </div>
            </>
          );
          if (locked) {
            return <div key={m.slug} className={classes}>{Inner}</div>;
          }
          return (
            <Link key={m.slug} href={`/modules/${m.slug}`} className={classes}>
              {Inner}
            </Link>
          );
        })}
      </div>

      {allComplete ? (
        <Link href="/complete" className="btn btn-primary">Claim your Graduate stamp →</Link>
      ) : currentIdx > 0 ? (
        <Link href={`/modules/${modules[currentIdx].slug}`} className="btn btn-primary">
          Continue to Module {String(modules[currentIdx].number).padStart(2, "0")} →
        </Link>
      ) : (
        <Link href={`/modules/${modules[0].slug}`} className="btn btn-primary">
          Start Module 01 →
        </Link>
      )}
    </div>
  );
}
