# Untapped Academy

Internal AI training for Untapped associates. Eight modules covering the tools we use daily (Claude, ChatGPT, SourceWhale, CRM & ATS, LinkedIn Recruiter, PIN, Juicebox, Clay), each with a quiz and an AI-graded practical exercise. Pass a module → get a stamp. Pass all eight → become an Untapped Academy Graduate.

Built with Next.js 14 (App Router), TypeScript, Anthropic SDK, and Resend.

---

## What's in here

```
untapped-academy/
├── app/
│   ├── page.tsx               Home / module list (welcomes the associate, captures name + email)
│   ├── modules/[slug]/        Dynamic module page — lesson, quiz, practical, stamp
│   ├── complete/              Final graduate stamp once all 8 modules are done
│   └── api/
│       ├── grade/             Claude API call that grades practical answers against a rubric
│       └── send-stamp/        Resend API call that emails the stamp to the associate
├── components/
│   ├── Quiz.tsx               Multi-choice quiz with retry + explanation per question
│   ├── Practical.tsx          Text-area + AI grader feedback
│   └── Stamp.tsx              Renders the SVG stamp + handles email send
├── lib/
│   ├── modules.ts             ALL CONTENT — edit this file to change lessons, quizzes, practicals
│   ├── progress.ts            localStorage progress tracking
│   └── stamp.ts               SVG stamp generator (works server + client)
└── public/                    Static assets (drop your logo here)
```

---

## Setup (one-time, ~15 minutes)

### 1. Install dependencies

```bash
cd untapped-academy
npm install
```

You'll need Node 18+ installed.

### 2. Get an Anthropic API key

- Go to https://console.anthropic.com
- Sign in with the Untapped team account
- Settings → API Keys → Create Key
- Add ~$10 of credits to start (each practical grading costs roughly $0.01-0.03)

### 3. Set up Resend

- Sign up at https://resend.com (free tier covers 3,000 emails/month)
- Verify a sender domain — ideally `tryuntapped.com` so emails come from `academy@tryuntapped.com`. Resend will give you DNS records to add.
- API Keys → Create API Key

### 4. Create a `.env.local` file

Copy `.env.example` to `.env.local` and fill in:

```
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
FROM_EMAIL=academy@tryuntapped.com
ADMIN_EMAIL=kyle@tryuntapped.com    # optional — BCC's you on every completion
```

### 5. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`. You should see the Academy welcome screen.

---

## Deploying to Vercel (10 minutes)

Vercel is the easiest host because Next.js is theirs. Free tier is enough for the Academy.

### 1. Push to GitHub

```bash
cd untapped-academy
git init
git add .
git commit -m "Initial Untapped Academy"
git branch -M main
# Create a private repo on github.com/your-org/untapped-academy first, then:
git remote add origin git@github.com:your-org/untapped-academy.git
git push -u origin main
```

### 2. Connect Vercel

- Go to https://vercel.com → New Project
- Import the `untapped-academy` repo
- Framework will auto-detect as Next.js — accept defaults

### 3. Add environment variables in Vercel

Project → Settings → Environment Variables. Add the same four values from your `.env.local`:

- `ANTHROPIC_API_KEY`
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `ADMIN_EMAIL` (optional)

### 4. Deploy

Click Deploy. Vercel gives you a URL like `untapped-academy.vercel.app`. To use a custom domain (e.g. `academy.tryuntapped.com`), go to Settings → Domains and follow the prompts to point your DNS at Vercel.

---

## Editing content (no code knowledge needed)

All lesson content, quizzes, and practical scenarios live in **one file**: `lib/modules.ts`.

To change a quiz question, edit the `q`, `options`, `correct` index, or `why` (explanation) field for that question.

To change a lesson section, edit the `heading` or `body` array. HTML is allowed inside body strings (use `<strong>` for emphasis).

To change a practical rubric, edit the `rubric` array — these are the criteria the AI grades against. The `exemplar` field is a strong reference answer used to calibrate the grader.

After saving changes:
- Locally: hot-reload picks them up
- On Vercel: push to GitHub → auto-deploys

---

## Customising the branding

### Logo
The current header uses a yellow "U" mark as a placeholder. To replace:
- Drop your logo SVG into `public/logo.svg`
- In `app/layout.tsx`, replace the `<div className="brand-mark">U</div>` block with `<img src="/logo.svg" alt="Untapped" style={{ height: 36 }} />`

### Fonts
Lettera Text Std is your brand typeface. The current build uses Inter as a web-safe substitute (Lettera isn't freely-hosted). If Untapped has licensed Lettera for web use:
- Self-host the font files under `public/fonts/`
- Add `@font-face` declarations in `app/globals.css`
- Replace `'Inter', Arial, Helvetica, sans-serif` with `'Lettera Text Std', Arial, Helvetica, sans-serif` throughout `app/globals.css` and `lib/stamp.ts`

### Colours
Edit the CSS variables at the top of `app/globals.css`. All four Untapped colours are already defined:
- `--untapped-black: #101820`
- `--untapped-red: #DA291C`
- `--untapped-orange: #FF6900`
- `--untapped-yellow: #FFC600`

### The stamp SVG
The certificate SVG generator lives in `lib/stamp.ts`. Change the design there — it's a single pure function. If you want a totally different stamp shape (square, scroll, etc.), this is the file.

---

## How AI grading works

When an associate submits a practical answer, the app calls `/api/grade`. This route:

1. Looks up the module and its rubric criteria
2. Sends Claude (via the Anthropic API) a structured prompt containing: the scenario, the exemplar answer, the rubric, and the learner's answer
3. Claude returns strict JSON with per-criterion pass/fail + a one-line note + an overall verdict
4. The route returns a score (% of criteria passed) and a pass/fail decision

Threshold is 4 of 6 criteria (66%) by default. Adjust in `app/api/grade/route.ts` if you want stricter or looser grading.

**Cost:** roughly $0.01-0.03 per grading call. Across 10 associates × 8 modules × ~2 attempts = ~$2 in API costs to fully train a team.

---

## How email delivery works

When an associate finishes a module, the stamp page automatically calls `/api/send-stamp` with their name, email, and the tool name. This route:

1. Generates the SVG stamp server-side
2. Sends an HTML email via Resend with the SVG as an attachment
3. BCCs `ADMIN_EMAIL` if set, so you have a record of every completion

The email is Untapped-branded (heatmap gradient bar, yellow "U" mark, dark theme).

---

## Things to know / future work

- **Progress lives in the browser's localStorage.** Switching devices loses progress. For multi-device or shared-team data, swap `lib/progress.ts` for a Supabase / Vercel KV layer.
- **Module 6 (PIN) content is reasonable but generic** — I wrote based on standard contact-enrichment workflows. If PIN at Untapped refers to a specific tool with quirks I haven't captured, edit `lib/modules.ts` for the `pin` module.
- **The AI grader is firm but generous on edge cases.** Watch the first 5-10 associates go through, and if you find the grading too lenient or too strict, tune the system prompt in `app/api/grade/route.ts` (the prompt is the easiest dial).
- **No auth.** Anyone with the URL can access the Academy. For internal-only, restrict at the Vercel edge with Vercel Authentication (Pro plan) or add NextAuth with a magic-link flow. For v1, the URL being unguessable is usually enough.
- **No analytics.** Add Plausible, PostHog, or Vercel Analytics if you want to see drop-off per module.

---

## Quick edits cheat-sheet

| What you want to change | Where |
|---|---|
| Add a 9th module | Append to `MODULES` array in `lib/modules.ts` |
| Change a quiz question | Find module in `lib/modules.ts`, edit the `quiz` array |
| Change the pass threshold | `app/api/grade/route.ts` → `passThreshold` line |
| Change the stamp design | `lib/stamp.ts` — `generateStampSvg` function |
| Change the email body | `app/api/send-stamp/route.ts` → `html` template |
| Change colors | `app/globals.css` → `:root` block |
| Change logo | `app/layout.tsx` → swap the brand-mark div |
| Adjust grading strictness | `app/api/grade/route.ts` → `systemPrompt` |

---

## Support

If something breaks: check the Vercel function logs (Vercel → Project → Logs → Functions). 90% of issues are missing env vars or unverified Resend domains.

If you want to evolve this into something bigger — internal certifications visible on LinkedIn, public-facing courses, a leaderboard, anything — start by tracking which modules associates struggle on. The data tells you where to invest.

---

Built for Untapped &middot; Internal use only
