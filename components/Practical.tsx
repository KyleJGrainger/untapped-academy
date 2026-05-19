"use client";

import { useState } from "react";

type Props = {
  moduleSlug: string;
  scenario: string;
  onPass: () => void;
  onBack: () => void;
};

type GradeResponse = {
  score: number;        // 0-100
  passedCriteria: number;
  totalCriteria: number;
  verdict: string;
  criteria: { label: string; passed: boolean; note?: string }[];
  passed: boolean;
};

export default function Practical({ moduleSlug, scenario, onPass, onBack }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const grade = async () => {
    if (text.trim().length < 30) {
      setError("That answer is too short to grade — give it more substance and try again.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleSlug, answer: text })
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `Grader returned ${res.status}`);
      }
      const data: GradeResponse = await res.json();
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setError(e.message || "Grading failed — try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="practical-prompt">
        <h3>Your task</h3>
        <p>{scenario}</p>
      </div>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type your answer here…"
        disabled={loading}
      />

      {error && (
        <div className="callout" style={{ marginTop: 16 }}>
          <strong>Hold up</strong>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="ai-feedback" style={{ marginTop: 16 }}>
          <div className="score">{result.score}%</div>
          <div className="verdict">{result.verdict}</div>
          <ul>
            {result.criteria.map((c, i) => (
              <li key={i} className={c.passed ? "pass" : "fail"}>
                {c.label}{c.note ? ` — ${c.note}` : ""}
              </li>
            ))}
          </ul>
          <div className="btn-row">
            {result.passed ? (
              <button className="btn btn-primary" onClick={onPass}>Claim your stamp →</button>
            ) : (
              <button className="btn btn-primary" onClick={() => { setResult(null); }}>
                Refine and resubmit
              </button>
            )}
          </div>
        </div>
      )}

      {!result && (
        <div className="btn-row">
          <button className="btn btn-ghost" onClick={onBack} disabled={loading}>← Back to quiz</button>
          <button className="btn btn-primary" onClick={grade} disabled={loading}>
            {loading ? "Grading…" : "Submit for AI review →"}
          </button>
        </div>
      )}
    </>
  );
}
