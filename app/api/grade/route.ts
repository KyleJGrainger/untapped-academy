import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getModule } from "@/lib/modules";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type CriterionResult = { label: string; passed: boolean; note?: string };
type GradeResult = {
  score: number;
  passedCriteria: number;
  totalCriteria: number;
  verdict: string;
  criteria: CriterionResult[];
  passed: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const { moduleSlug, answer } = await req.json();
    if (!moduleSlug || !answer) {
      return NextResponse.json({ error: "moduleSlug and answer are required" }, { status: 400 });
    }
    const mod = getModule(moduleSlug);
    if (!mod) return NextResponse.json({ error: "Unknown module" }, { status: 404 });

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "Server missing ANTHROPIC_API_KEY" }, { status: 500 });
    }

    const { practical } = mod;
    const systemPrompt = `You are an experienced recruitment trainer at Untapped, an offshore talent placement firm. You grade associate practical exercises against a specific rubric. You are firm but fair. You write in clear, direct British English with no fluff. You never invent rubric criteria; you only evaluate against the ones provided.

For each criterion, you decide pass or fail and add a one-line note explaining the call. The note must be specific to the learner's answer, not generic.

After scoring, you write a single-sentence verdict that summarises the answer's quality and what to fix if anything.

You return STRICT JSON only, no prose, no markdown fences.`;

    const userPrompt = `MODULE: ${mod.title}

SCENARIO PRESENTED TO LEARNER:
${practical.scenario}

REFERENCE EXEMPLAR (a strong answer — do not require an exact match, just use to calibrate quality):
${practical.exemplar}

RUBRIC CRITERIA (evaluate against these in order):
${practical.rubric.map((c, i) => `${i + 1}. ${c}`).join("\n")}

LEARNER'S ANSWER:
"""
${answer}
"""

Now grade the answer. Return JSON with this exact shape:
{
  "criteria": [
    { "label": "<criterion 1 text verbatim>", "passed": true/false, "note": "<one-line note>" },
    ... one entry per rubric criterion, in order
  ],
  "verdict": "<one-sentence verdict>"
}

Pass criteria require the answer to demonstrate the criterion clearly, not just gesture at it. Be honest — a generous grader makes a useless training tool.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }]
    });

    const text = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map(b => b.text)
      .join("");

    // Pull out JSON if the model wrapped it in fences or added prose
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Grader response was not valid JSON" }, { status: 502 });
    }
    const parsed = JSON.parse(jsonMatch[0]);

    const criteria: CriterionResult[] = (parsed.criteria || []).map((c: any) => ({
      label: String(c.label || ""),
      passed: Boolean(c.passed),
      note: c.note ? String(c.note) : undefined
    }));

    const passedCriteria = criteria.filter(c => c.passed).length;
    const totalCriteria = criteria.length || practical.rubric.length;
    const score = Math.round((passedCriteria / totalCriteria) * 100);
    const passThreshold = Math.ceil(totalCriteria * 0.66); // 4 of 6 by default
    const passed = passedCriteria >= passThreshold;

    const result: GradeResult = {
      score,
      passedCriteria,
      totalCriteria,
      verdict: String(parsed.verdict || ""),
      criteria,
      passed
    };

    return NextResponse.json(result);
  } catch (e: any) {
    console.error("[/api/grade] error:", e);
    return NextResponse.json(
      { error: e?.message || "Grading failed" },
      { status: 500 }
    );
  }
}
