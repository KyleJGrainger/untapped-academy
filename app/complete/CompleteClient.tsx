"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Stamp from "@/components/Stamp";
import { getProgress } from "@/lib/progress";
import { MODULES } from "@/lib/modules";

export default function CompleteClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [allComplete, setAllComplete] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const p = getProgress();
    setName(p.name || "");
    setEmail(p.email || "");
    setAllComplete(MODULES.every(m => p.completed.includes(m.slug)));
    setLoaded(true);
  }, []);

  if (!loaded) return <div className="container"><p style={{ color: "var(--black-40)" }}>Loading…</p></div>;

  if (!allComplete) {
    return (
      <div className="container">
        <div className="eyebrow">Not quite there yet</div>
        <h1 className="smaller">A few modules left to go.</h1>
        <p className="lead">
          The Untapped Academy Graduate stamp unlocks when all eight modules are complete.
          Head back to the module list to pick up where you left off.
        </p>
        <Link href="/" className="btn btn-primary">← Back to modules</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Stamp
        name={name}
        email={email}
        tool="ALL EIGHT TOOLS"
        variant="graduate"
        nextHref="/"
        nextLabel="Back to modules"
      />
    </div>
  );
}
