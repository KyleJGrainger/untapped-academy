// Pure function — generates a stamp SVG as a string.
// Used in both the client (display + download) and the server (email).

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, c => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;",
    "'": "&apos;", '"': "&quot;"
  })[c]!);
}

export type StampInput = {
  name: string;
  tool: string;          // e.g. "Claude"
  date: string;          // formatted date string e.g. "19 May 2026"
  certId: string;        // e.g. "UA-A8F3X1"
  variant?: "module" | "graduate" | "craft"; // graduate = final all-8-passed cert
};

export function generateStampSvg({
  name,
  tool,
  date,
  certId,
  variant = "module"
}: StampInput): string {
  const isGraduate = variant === "graduate";
  const isCraft = variant === "craft";
  const topLabel = isCraft ? "THE CRAFT OF RECRUITMENT" : isGraduate ? "UNTAPPED · ACADEMY · GRADUATE" : "UNTAPPED · ACADEMY";
  const middleLabel = isGraduate ? "CERTIFIED" : "CERTIFIED";
  const subLabel = isCraft ? "ADVANCED COURSE GRADUATE" : isGraduate ? "IS A FULL UNTAPPED ACADEMY GRADUATE" : "IS A VERIFIED USER OF";
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <defs>
    <linearGradient id="heat" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5B4FE2"/>
      <stop offset="40%" stop-color="#DA291C"/>
      <stop offset="75%" stop-color="#FF6900"/>
      <stop offset="100%" stop-color="#FFC600"/>
    </linearGradient>
    <path id="curveTop" d="M 200,200 m -160,0 a 160,160 0 1,1 320,0" fill="none"/>
    <path id="curveBot" d="M 200,200 m -160,0 a 160,160 0 1,0 320,0" fill="none"/>
  </defs>
  <rect width="400" height="400" fill="#101820"/>
  <circle cx="200" cy="200" r="195" fill="none" stroke="url(#heat)" stroke-width="6"/>
  <circle cx="200" cy="200" r="170" fill="none" stroke="#FFC600" stroke-width="1.5" opacity="0.6"/>
  <text font-family="Inter, Arial, Helvetica, sans-serif" font-size="${isGraduate ? 16 : 20}" font-weight="700" fill="#FFC600" letter-spacing="${isGraduate ? 4 : 6}">
    <textPath href="#curveTop" startOffset="50%" text-anchor="middle">${escapeXml(topLabel)}</textPath>
  </text>
  <text font-family="Inter, Arial, Helvetica, sans-serif" font-size="13" font-weight="500" fill="#9FA1A4" letter-spacing="4">
    <textPath href="#curveBot" startOffset="50%" text-anchor="middle">${escapeXml(date.toUpperCase())} · ${escapeXml(certId)}</textPath>
  </text>
  <text x="200" y="155" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="11" font-weight="500" fill="#FF6900" letter-spacing="4">${middleLabel}</text>
  <text x="200" y="195" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" letter-spacing="-0.5">${escapeXml(name)}</text>
  <text x="200" y="220" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="11" font-weight="500" fill="#9FA1A4" letter-spacing="3">${escapeXml(subLabel)}</text>
  <text x="200" y="252" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#FFC600" letter-spacing="-0.5">${escapeXml(tool)}</text>
  <circle cx="200" cy="278" r="3" fill="#DA291C"/>
  <circle cx="210" cy="278" r="3" fill="#FF6900"/>
  <circle cx="220" cy="278" r="3" fill="#FFC600"/>
  <circle cx="190" cy="278" r="3" fill="#FF6900"/>
  <circle cx="180" cy="278" r="3" fill="#DA291C"/>
</svg>`;
}

export function generateCertId(prefix = "UA"): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${out}`;
}

export function formatDate(d: Date = new Date()): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
