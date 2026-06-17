import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateStampSvg, formatDate } from "@/lib/stamp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, tool, certId, variant } = await req.json();

    if (!email || !name || !tool || !certId) {
      return NextResponse.json({ error: "name, email, tool and certId are required" }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL) {
      return NextResponse.json({ error: "Server missing RESEND_API_KEY or FROM_EMAIL" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const date = formatDate();
    const svg = generateStampSvg({ name, tool, date, certId, variant });

    const isGraduate = variant === "graduate";

    const subject = isGraduate
      ? `Your Untapped Academy Graduate stamp`
      : `Your Untapped Academy stamp — ${tool}`;

    const heading = isGraduate
      ? `${name}, you're an Untapped Academy Graduate.`
      : `${name}, you're a verified ${tool} user.`;

    const body = isGraduate
      ? `You've passed all ten Untapped Academy modules. That's the full set: Claude, ChatGPT, SourceWhale, CRM & ATS, LinkedIn Recruiter, PIN, Juicebox, Clay, Alfa, and Granola.\n\nYour Graduate stamp is attached. Add it to your email signature, your LinkedIn 'About' section, or wherever you'd like to wear it.`
      : `You've passed the ${tool} module. Your stamp is attached.\n\nKeep going — there are more modules waiting for you in the Academy.`;

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#101820;font-family:Arial,Helvetica,sans-serif;color:#FFFFFF;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#101820;">
    <tr><td height="6" style="background:linear-gradient(90deg,#5B4FE2 0%,#DA291C 35%,#FF6900 65%,#FFC600 100%);">&nbsp;</td></tr>
    <tr><td style="padding:48px 32px;text-align:center;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:560px;width:100%;">
        <tr><td style="padding-bottom:24px;text-align:left;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="background:#FFC600;color:#101820;width:36px;height:36px;text-align:center;font-weight:700;font-size:18px;font-family:Arial,Helvetica,sans-serif;">U</td>
              <td style="padding-left:14px;font-weight:600;font-size:15px;letter-spacing:0.02em;text-transform:uppercase;">Untapped Academy</td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding-bottom:24px;text-align:left;">
          <div style="color:#FFC600;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;font-weight:500;">${isGraduate ? "Academy complete" : "Module complete"}</div>
        </td></tr>
        <tr><td style="padding-bottom:32px;text-align:left;">
          <h1 style="margin:0;font-size:32px;font-weight:700;letter-spacing:-0.02em;line-height:1.1;color:#FFFFFF;">${heading}</h1>
        </td></tr>
        <tr><td style="padding-bottom:40px;text-align:left;">
          <p style="margin:0;font-size:15px;line-height:1.6;color:#CFD0D2;white-space:pre-wrap;">${body}</p>
        </td></tr>
        <tr><td style="text-align:center;padding-bottom:24px;">
          <p style="margin:0;font-size:13px;color:#707479;">Stamp attached &middot; ${date} &middot; ${certId}</p>
        </td></tr>
        <tr><td style="padding-top:32px;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0;font-size:11px;color:#707479;text-align:center;line-height:1.5;">
            Untapped Academy &middot; Internal training<br/>
            ${process.env.FROM_EMAIL}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const attachmentContent = Buffer.from(svg, "utf-8").toString("base64");
    const filename = `untapped-academy-${tool.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`;

    const sendArgs: any = {
      from: process.env.FROM_EMAIL!,
      to: email,
      subject,
      html,
      attachments: [{
        filename,
        content: attachmentContent
      }]
    };
    if (process.env.ADMIN_EMAIL) {
      sendArgs.bcc = process.env.ADMIN_EMAIL;
    }

    const { data, error } = await resend.emails.send(sendArgs);

    if (error) {
      return NextResponse.json({ error: error.message || "Resend failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e: any) {
    console.error("[/api/send-stamp] error:", e);
    return NextResponse.json({ error: e?.message || "Send failed" }, { status: 500 });
  }
}
