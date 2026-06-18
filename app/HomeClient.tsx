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
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const p = getProgress();
    setCompleted(p.completed);
    setHasIdentity(Boolean(p.name && p.email));
  }, []);

  const handleStart = async () => {
    if (!name.trim() || !email.includes("@") || !passcode.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), passcode: passcode.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error || "That passcode was not right. Please try again.");
        setSubmitting(false);
        return;
      }
      setIdentity(name.trim(), email.trim());
      setHasIdentity(true);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const slugs = modules.map(m => m.slug);
  const aiModules = modules.filter((m) => m.number <= 10);
  const craftModules = modules.filter((m) => m.number > 10);
  const blockIdx = (list: ModSummary[]) => {
    for (let i = 0; i < list.length; i++) {
      if (!completed.includes(list[i].slug)) return i;
    }
    return list.length;
  };
  const aiIdx = blockIdx(aiModules);
  const craftIdx = blockIdx(craftModules);
  const aiComplete = aiIdx === aiModules.length;

  const renderGrid = (list: ModSummary[], curIdx: number) => (
    <div className="modules-grid">
      {list.map((m, i) => {
        const done = completed.includes(m.slug);
        const isCurrent = i === curIdx;
        const locked = i > curIdx;
        const classes = "module-card " + (done ? "complete" : isCurrent ? "current" : locked ? "locked" : "");
        const Inner = (
          <>
            <div className={"m-badge " + (done ? "complete-badge" : isCurrent ? "current-badge" : "locked-badge")}>
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
          <Link key={m.slug} href={"/modules/" + m.slug} className={classes}>
            {Inner}
          </Link>
        );
      })}
    </div>
  );

  if (hasIdentity === null) {
    return <div className="container"><p style={{ color: "var(--black-40)" }}>Loading…</p></div>;
  }

  if (!hasIdentity) {
    return (
      <div className="container">
        <div className="eyebrow">Welcome to Untapped Academy</div>
        <h1>Begin your journey to <em>mastering AI</em> in recruitment.</h1>
        <p className="lead">
          This is where your journey begins. The Untapped Academy is your training ground to become a master of AI, tech and tooling in the recruitment industry — ten modules covering the tools the best desks use every day, each with a quiz and a practical so you can prove you use them well.
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
          <input
            type="password" placeholder="Access passcode"
            value={passcode} onChange={e => setPasscode(e.target.value)}
          />
          {error && <p style={{ color: "var(--untapped-red)", marginTop: 8 }}>{error}</p>}
          <button className="btn btn-primary" onClick={handleStart}
                  disabled={submitting || !name.trim() || !email.includes("@") || !passcode.trim()}>
            {submitting ? "Checking…" : "Start the Academy →"}
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

      {renderGrid(aiModules, aiIdx)}

      {aiComplete ? (
        <Link href="/complete" className="btn btn-primary">Claim your Graduate stamp →</Link>
      ) : aiIdx > 0 ? (
        <Link href={"/modules/" + aiModules[aiIdx].slug} className="btn btn-primary">
          Continue to Module {String(aiModules[aiIdx].number).padStart(2, "0")} →
        </Link>
      ) : (
        <Link href={"/modules/" + aiModules[0].slug} className="btn btn-primary">
          Start Module 01 →
        </Link>
      )}

      {craftModules.length > 0 && (
        <div style={{ marginTop: 56 }}>
          <div className="eyebrow">Advanced track</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: "8px 0 0", letterSpacing: "-0.01em" }}>The Craft of Recruitment</h2>
          <p className="lead">
            Beyond the tools — the human skills that make a great recruiter. Optional, but this is where good becomes exceptional.
          </p>
          {renderGrid(craftModules, craftIdx)}
        </div>
      )}
    </div>
  );
}
