"use client";

import { useState } from "react";
import { QuizQuestion } from "@/lib/modules";

type Props = {
  questions: QuizQuestion[];
  passThreshold: number;
  onPass: () => void;
  onBack: () => void;
};

export default function Quiz({ questions, passThreshold, onPass, onBack }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = submitted
    ? questions.reduce((sum, q, i) => (answers[i] === q.correct ? sum + 1 : sum), 0)
    : 0;
  const passed = submitted && score >= passThreshold;

  const select = (q: number, opt: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [q]: opt }));
  };

  const submit = () => {
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const retry = () => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {questions.map((q, i) => {
        const userAns = answers[i];
        const isRight = submitted && userAns === q.correct;
        const isWrong = submitted && userAns !== undefined && userAns !== q.correct;
        return (
          <div className="quiz-question" key={i}>
            <div className="q-num">Question {i + 1} of {questions.length}</div>
            <div className="q-text">{q.q}</div>
            <div className="quiz-options">
              {q.options.map((opt, j) => {
                const selected = userAns === j;
                let cls = "quiz-option";
                if (submitted) {
                  if (j === q.correct) cls += " correct";
                  else if (j === userAns) cls += " incorrect";
                } else if (selected) {
                  cls += " selected";
                }
                return (
                  <label className={cls} key={j} onClick={() => select(i, j)}>
                    <input type="radio" name={`q${i}`} checked={selected} readOnly />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
            {submitted && (
              <div className={`quiz-feedback show ${isRight ? "right" : "wrong"}`}>
                <strong>{isRight ? "Correct" : "Not quite"}</strong>
                {q.why}
              </div>
            )}
          </div>
        );
      })}

      {!submitted && (
        <div className="btn-row">
          <button className="btn btn-ghost" onClick={onBack}>← Re-read lesson</button>
          <button className="btn btn-primary" onClick={submit}
                  disabled={Object.keys(answers).length < questions.length}>
            Check answers
          </button>
        </div>
      )}

      {submitted && passed && (
        <>
          <div className="callout" style={{ borderLeftColor: "var(--untapped-yellow)", background: "rgba(255,198,0,0.08)", marginTop: 24 }}>
            <strong style={{ color: "var(--untapped-yellow)" }}>
              {score}/{questions.length} — You passed
            </strong>
            <p>Onwards to the practical.</p>
          </div>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={onPass}>Continue to practical →</button>
          </div>
        </>
      )}

      {submitted && !passed && (
        <>
          <div className="callout" style={{ marginTop: 24 }}>
            <strong>{score}/{questions.length} — Not yet</strong>
            <p>You need {passThreshold} of {questions.length}. Re-read the lesson and try again.</p>
          </div>
          <div className="btn-row">
            <button className="btn btn-ghost" onClick={onBack}>← Re-read lesson</button>
            <button className="btn btn-primary" onClick={retry}>Retry quiz</button>
          </div>
        </>
      )}
    </>
  );
}
