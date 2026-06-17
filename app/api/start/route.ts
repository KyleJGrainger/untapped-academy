import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, passcode } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 });
    }

    const expected = process.env.ACADEMY_PASSCODE;
    if (expected && (passcode || "").trim() !== expected) {
      return NextResponse.json({ ok: false, error: "That passcode was not right." }, { status: 401 });
    }

    // Best-effort: tell the team someone has started (never blocks entry)
    try {
      if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const to = process.env.ADMIN_EMAIL || "kyle@tryuntapped.com";
        const when = new Date().toUTCString();
        await resend.emails.send({
          from: process.env.FROM_EMAIL,
          to,
          subject: `Academy started: ${name}`,
          html: `<p><strong>${name}</strong> has started the Untapped Academy.</p><p>Email: ${email}<br/>Started: ${when}</p>`,
        });
      }
    } catch (e) {
      console.error("[/api/start] notify failed:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("[/api/start] error:", e);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
