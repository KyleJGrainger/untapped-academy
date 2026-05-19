"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { generateStampSvg, generateCertId, formatDate, StampInput } from "@/lib/stamp";

type Props = {
  name: string;
  email: string;
  tool: string;
  variant: "module" | "graduate";
  nextHref: string;
  nextLabel: string;
};

export default function Stamp({ name, email, tool, variant, nextHref, nextLabel }: Props) {
  const [certId] = useState(() => generateCertId());
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [autoSent, setAutoSent] = useState(false);

  const stampInput: StampInput = useMemo(() => ({
    name: name || "Your Name",
    tool,
    date: formatDate(),
    certId,
    variant
  }), [name, tool, certId, variant]);

  const svg = useMemo(() => generateStampSvg(stampInput), [stampInput]);

  const sendEmail = async () => {
    if (!email) return;
    setEmailState("sending");
    setEmailError(null);
    try {
      const res = await fetch("/api/send-stamp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, tool, certId, variant })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Email send returned ${res.status}`);
      }
      setEmailState("sent");
    } catch (e: any) {
      setEmailState("error");
      setEmailError(e.message || "Email send failed.");
    }
  };

  useEffect(() => {
    if (!autoSent && email && name) {
      setAutoSent(true);
      sendEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadSvg = () => {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `untapped-academy-${tool.toLowerCase().replace(/\s+/g, "-")}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cert-stage">
      <div className="cert-summary">
        <div className="eyebrow">{variant === "graduate" ? "Academy complete" : "Module complete"}</div>
        <h2>
          {variant === "graduate"
            ? "You're an Untapped Academy Graduate."
            : `You're a verified ${tool} user.`}
        </h2>
        <p>
          Your stamp is below — and a signed copy is on its way to{" "}
          <strong style={{ color: "var(--untapped-white)" }}>{email || "your email"}</strong>.
        </p>
      </div>

      <div className="stamp-wrap" dangerouslySetInnerHTML={{ __html: svg }} />

      <div style={{ textAlign: "center", marginBottom: 24, fontSize: 13, color: "var(--black-40)" }}>
        {emailState === "sending" && "Sending stamp to your inbox…"}
        {emailState === "sent" && "✓ Stamp sent to your inbox."}
        {emailState === "error" && (
          <>
            <span style={{ color: "var(--untapped-red)" }}>Email send failed: {emailError}</span>
            <br />
            <button className="btn btn-ghost" style={{ marginTop: 8 }} onClick={sendEmail}>Retry email</button>
          </>
        )}
      </div>

      <div className="btn-row" style={{ justifyContent: "center" }}>
        <button className="btn btn-ghost" onClick={downloadSvg}>Download stamp</button>
        <Link href={nextHref} className="btn btn-primary">{nextLabel}</Link>
      </div>
    </div>
  );
}
