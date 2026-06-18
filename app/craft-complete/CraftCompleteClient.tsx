"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Stamp from "@/components/Stamp";
import { getProgress } from "@/lib/progress";
import { MODULES } from "@/lib/modules";

export default function CraftCompleteClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [allComplete, setAllComplete] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const p = getProgress();
    setName(p.name || "");
    setEmail(p.email || "");
    setAllComplete(MODULES.filter((m) => m.number > 10).every((m) => p.completed.includes(m.slug)));
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div className="container"><p style={{ color: "var(--black-40)" }}>Loading…</p></div>;
  }

  if (!allComplete) {
    return (
      <div className="container">
        <div className="eyebrow">Not quite there yet</div>
        <h1 className="smaller">Finish the Craft of Recruitment block first.</h1>
        <p className="lead">Complete all three craft modules — Sourcing &amp; Boolean Search, Approaching Candidates and Recruitment Fundamentals — to earn your Craft of Recruitment certificate.</p>
        <Link href="/" className="btn btn-primary">← Back to modules</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Stamp
        name={name}
        email={email}
        tool="Untapped Academy"
        variant="craft"
        nextHref="/"
        nextLabel="← Back to modules"
      />
    </div>
  );
}
