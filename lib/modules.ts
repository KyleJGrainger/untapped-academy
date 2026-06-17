// All Untapped Academy module content lives here.
// To add or edit content, edit this file. No code changes needed elsewhere.

export type QuizQuestion = {
  q: string;
  options: string[];
  correct: number; // index of correct option
  why: string;     // shown to learner after submission
};

export type Practical = {
  scenario: string;            // shown to the learner
  rubric: string[];            // criteria the AI grader scores against
  exemplar: string;            // good answer used as a reference by the grader
};

export type Module = {
  slug: string;
  number: number;
  title: string;
  tool: string;                // short tool name used in cert
  durationMins: number;
  lead: string;                // hero subheading
  sections: { heading: string; body: string[] }[];
  goodPrompt?: string;         // optional "good vs bad" example pair
  badPrompt?: string;
  rule?: string;               // "Untapped rule" callout
  donts?: string[];
  quiz: QuizQuestion[];
  practical: Practical;
};

export const MODULES: Module[] = [
  // ---------------------------------------------------------------------------
  {
    slug: "claude",
    number: 1,
    title: "Claude for Recruiters",
    tool: "Claude",
    durationMins: 25,
    lead: "Claude is the AI assistant we use the most at Untapped. Done well, it makes you faster and sharper. Done badly, it creates noise — or worse, embarrasses you in front of a client. This module makes sure you fall into the first camp.",
    sections: [
      {
        heading: "What Claude actually is",
        body: [
          "Claude is a large language model from Anthropic. Think of it as a very capable, very fast research assistant who has read most of the internet up to its knowledge cutoff. It's not Google — it reasons and writes, but it doesn't browse the live web (unless you use specific Claude products that have web search enabled).",
          "<strong>Strengths:</strong> drafting, summarising, structuring, rewriting, analysis, role-play prep.",
          "<strong>Limits:</strong> doesn't know about events after its training cutoff, can hallucinate facts, doesn't access your CRM or LinkedIn unless told.",
          "<strong>Where we use it at Untapped:</strong> claude.ai (Pro, for daily work), Claude in Chrome (for browsing-assisted tasks), Cowork (for desktop file work)."
        ]
      },
      {
        heading: "The five jobs we use Claude for",
        body: [
          "Most of your day-to-day Claude use will fall into one of these five buckets. Get comfortable with all of them.",
          "<strong>Outreach drafting.</strong> Paste a candidate's profile, paste the role context, ask for a personalised first message. Then edit.",
          "<strong>CV screening.</strong> Paste a CV + the JD, ask for a fit assessment with specific concerns flagged. Faster than scanning yourself; still verify before you decide.",
          "<strong>Boolean search building.</strong> Describe the ideal candidate in plain English, ask Claude to translate it into a LinkedIn Recruiter / Sourcewhale Boolean string.",
          "<strong>Call prep.</strong> Drop in notes from the last call + your client's recent posts/news, ask for 5 talking points and 3 questions to surface.",
          "<strong>Client comms.</strong> Turn rough call notes into a polished follow-up email in your tone, not Claude's default one."
        ]
      },
      {
        heading: "Good prompts vs bad prompts",
        body: [
          "The single biggest predictor of useful output is the quality of your prompt. The four pillars: <strong>context, specificity, examples, iteration.</strong>"
        ]
      },
      {
        heading: "What NOT to do",
        body: [
          "<strong>Don't paste client PII into public chat.</strong> If it would feel weird to Google it, don't paste it. Use the company Claude account, not your personal one, for anything candidate-specific.",
          "<strong>Don't trust facts blindly.</strong> Names, dates, salary benchmarks, certifications — verify against the CV or LinkedIn before you put them in a message.",
          "<strong>Don't expect it to know yesterday.</strong> Claude's knowledge has a cutoff. For \"did this company just raise\" type questions, use a tool with web search.",
          "<strong>Don't let Claude's voice override yours.</strong> Edit the output until it sounds like you. The em-dash, \"I hope this finds you well,\" \"I wanted to reach out\" — all giveaways. Strip them."
        ]
      }
    ],
    badPrompt: "Write a LinkedIn outreach to Sarah Chen.",
    goodPrompt: "You're helping me draft a LinkedIn message in my voice (warm, direct, no fluff, UK English).\n\nThe recipient: Sarah Chen — Senior Finance Manager at NatWest, 12 yrs experience, posted last week about wanting more strategic work.\n\nThe opportunity: Head of FP&A at a Series B fintech in London, £140k base + equity.\n\nGoal: get a 20-min call. Don't pitch the role yet — open with shared context.\n\n3 versions, please. Max 80 words each.",
    rule: "If your prompt is one sentence and you'd accept the output, you're doing it wrong. Iterate at least twice on anything client-facing.",
    quiz: [
      {
        q: "Which of these is Claude best suited for, right out of the box?",
        options: [
          "Telling you the precise number of senior FP&A roles open in London today",
          "Drafting three versions of a personalised outreach message based on a candidate's profile",
          "Looking up whether a candidate's claimed certification is still valid",
          "Calculating live FX rates for a USD-to-GBP salary conversion"
        ],
        correct: 1,
        why: "Claude's strongest core capability is structured writing — drafting, summarising, rewriting. Live facts and external lookups need a different tool or web-enabled mode."
      },
      {
        q: "A candidate's CV says they led a £40M FX hedging programme at Barclays from 2019–2023. The hiring client wants you to confirm. What's the right Claude use?",
        options: [
          "Ask Claude to verify the candidate's role and claim directly",
          "Ask Claude to help you draft three specific questions to ask the candidate that would surface whether the claim holds up",
          "Paste the CV into Claude and ask for the candidate's salary at the time",
          "Skip Claude — only LinkedIn can verify employment"
        ],
        correct: 1,
        why: "Claude can't verify external facts, but it's excellent at generating probing questions. Use it to prepare you to verify; don't ask it to verify itself."
      },
      {
        q: "Which prompt is most likely to get a great first draft of outreach?",
        options: [
          "\"Write outreach to David\"",
          "\"Write a LinkedIn message to David, a senior backend engineer\"",
          "\"In my voice (warm, direct, no fluff, UK English): draft a LinkedIn message to David Okoye — Senior Backend Engineer at Monzo, 8 yrs experience, posted last week about wanting to build from zero. Role: founding engineer at YC-backed AI startup, £130k + equity. Goal: 20-min call. Open with shared context, don't pitch the role yet. 3 versions, max 80 words each.\"",
          "\"Be creative and draft outreach\""
        ],
        correct: 2,
        why: "Context, specificity, voice, examples of constraints, and iteration target — the four pillars. The third option does all of them; the others miss most."
      },
      {
        q: "Claude tells you a candidate worked at \"FinNova\" from 2018–2024. The CV you uploaded says \"FinNova Solutions, 2019–2023.\" What's your next move?",
        options: [
          "Trust Claude — it has access to more data",
          "Trust the CV — the candidate wrote it themselves",
          "Verify against the source; Claude sometimes hallucinates dates and names",
          "Ignore the discrepancy, the dates are close enough"
        ],
        correct: 2,
        why: "Claude can and does hallucinate names and dates. Always go back to the source (CV, LinkedIn) before putting a fact in front of a client."
      },
      {
        q: "A client just asked if their competitor RoarFin closed their Series B last week. You're using Claude. What's the safest answer?",
        options: [
          "Ask Claude — if the funding round happened, Claude will know",
          "Ask Claude in Chrome with web search enabled, then verify against the source article it cites",
          "Make up a reasonable-sounding number based on the company's stage",
          "Tell the client you don't comment on competitors"
        ],
        correct: 1,
        why: "Claude's base model has a knowledge cutoff and doesn't know about last week. Use a Claude tool with web search (Claude in Chrome), then verify the cited source — never relay it unverified."
      }
    ],
    practical: {
      scenario: "Draft the prompt you would give Claude to generate a personalised LinkedIn outreach for the following candidate. Don't write the message — write the prompt that would produce a great message.\n\nCandidate: David Okoye — Senior Backend Engineer at Monzo, 8 years experience, posted last week about wanting to \"build something from zero.\"\nOpportunity: Founding engineer at a YC-backed AI startup, £130k + meaningful equity.",
      rubric: [
        "Sets a voice or tone (e.g. warm, direct, UK English)",
        "Includes candidate context (name, role, company, tenure)",
        "Includes opportunity context (role, comp, company stage)",
        "States a clear goal (e.g. book a call, get a reply)",
        "Specifies format constraints (word count, multiple versions)",
        "References shared context or the candidate's recent activity"
      ],
      exemplar: "In my voice (warm, direct, no fluff, UK English), draft a LinkedIn message to David Okoye — Senior Backend Engineer at Monzo, 8 yrs experience. He posted last week about wanting to 'build something from zero' — open with shared context referencing that, don't pitch yet. Opportunity: founding engineer at a YC-backed AI startup, £130k + meaningful equity, London/remote. Goal: get a 20-min intro call. 3 versions, max 80 words each, no em-dashes."
    }
  },

  // ---------------------------------------------------------------------------
  {
    slug: "chatgpt",
    number: 2,
    title: "ChatGPT for Recruiters",
    tool: "ChatGPT",
    durationMins: 25,
    lead: "ChatGPT covers a lot of the same ground as Claude, but it has its own strengths — live web search, image generation, and Custom GPTs you can build for repeat workflows. This module is about knowing which AI to reach for, and getting fluent with the ChatGPT-specific features.",
    sections: [
      {
        heading: "Claude vs ChatGPT — when to reach for which",
        body: [
          "Both are excellent. We don't have a religion about which is better; we pick the right tool for the job.",
          "<strong>Reach for Claude when:</strong> the task is long-form writing, careful reasoning, or working with long documents (Claude handles long context exceptionally well). Outreach drafting, call summaries, polished client comms — Claude is our default.",
          "<strong>Reach for ChatGPT when:</strong> you need web search (ChatGPT browses by default on most plans), image generation (DALL-E baked in), or you want to use a Custom GPT someone on the team has already built for a repeat workflow.",
          "<strong>Reach for both:</strong> some associates run the same prompt through both and compare outputs. Worth doing for high-stakes client comms."
        ]
      },
      {
        heading: "Custom GPTs — your highest-leverage move",
        body: [
          "A Custom GPT is a ChatGPT preloaded with your instructions, files, and behaviour. You set it up once and use it forever.",
          "<strong>Why this matters at Untapped:</strong> you can build a \"Candidate Screening GPT\" that always asks for the JD, always returns a structured fit report, and never has to be re-prompted with context. Then you share it with the team.",
          "<strong>Examples we've built:</strong> Briefing Pack GPT (turns rough notes into a client-ready brief), Boolean Builder GPT (natural language → Sourcewhale-ready Boolean), Salary Benchmarking GPT (asks the right questions to triangulate a market rate).",
          "<strong>Set-up takes 10 minutes.</strong> Click 'Create a GPT' in the sidebar, write a system prompt, upload reference docs, test it, share the link. That's it."
        ]
      },
      {
        heading: "Web search and what it changes",
        body: [
          "ChatGPT with browsing (the default on most plans) can actually pull live information. It still hallucinates — verify sources — but it bridges the knowledge-cutoff gap.",
          "<strong>Use it for:</strong> recent funding rounds, fresh news about a target account, today's stock price for a public-company candidate, what your client has posted on LinkedIn this month.",
          "<strong>Don't use it for:</strong> anything you'd put in a client email without checking the source link it gives you."
        ]
      },
      {
        heading: "What NOT to do",
        body: [
          "<strong>Don't paste candidate PII into a personal ChatGPT account.</strong> Use the team account. OpenAI's data usage policy depends on the plan — assume your free / personal plan is being used for training unless you've turned it off.",
          "<strong>Don't trust DALL-E for client-facing imagery.</strong> Useful for sketches and concept art, not for anything that goes into a real branded asset.",
          "<strong>Don't fork your Custom GPT into 20 variations.</strong> One well-designed GPT per workflow. Maintain it like code."
        ]
      }
    ],
    badPrompt: "Build me a GPT for screening candidates.",
    goodPrompt: "System prompt for a Custom GPT called 'Untapped Candidate Screener':\n\nROLE: You are a senior recruitment researcher at Untapped. You screen candidates against a JD and produce a structured fit report.\n\nALWAYS START by asking for: (1) the JD, (2) the CV or LinkedIn profile, (3) any hard must-haves the client specified (location, salary band, visa, start date).\n\nOUTPUT FORMAT:\n• Fit score 1-10 with one-line justification\n• 3 strengths against the JD\n• 3 gaps or risks, with severity (high / medium / low)\n• 3 probing questions to ask in a screening call\n• Recommended next step (move forward / hold / pass)\n\nTONE: Direct, candid, UK English. No fluff. Flag if you don't have enough info rather than guess.",
    rule: "Build one Custom GPT per recurring workflow. Maintain it. Share it. Don't reinvent the prompt every Monday morning.",
    quiz: [
      {
        q: "You need to find out if a client's competitor closed a Series B last week. Which is the best tool?",
        options: [
          "Claude (no web search)",
          "ChatGPT with browsing enabled",
          "Make a guess based on the company's last reported funding stage",
          "Ask the client"
        ],
        correct: 1,
        why: "Live web search is ChatGPT's edge over base Claude. Verify the source it cites before relaying to the client."
      },
      {
        q: "What's the right reason to build a Custom GPT for a workflow at Untapped?",
        options: [
          "You only need to run that workflow once",
          "You run the same workflow at least weekly and want consistent output",
          "It's a one-off creative task that benefits from improv",
          "You want to lock the team into one specific way of working"
        ],
        correct: 1,
        why: "Custom GPTs pay back when the workflow is repeated. One-offs aren't worth the setup overhead. Use them for recurring patterns where consistency matters."
      },
      {
        q: "Where should sensitive candidate data go?",
        options: [
          "Your personal free ChatGPT account",
          "The team's paid ChatGPT account with data-sharing disabled",
          "A friend's account",
          "It doesn't matter, OpenAI never trains on user data"
        ],
        correct: 1,
        why: "Personal/free plans may be used for model training unless you've opted out. The team's enterprise/paid plan has stronger data guarantees. Use it for anything candidate-specific."
      },
      {
        q: "A Custom GPT keeps producing wishy-washy fit reports. What's most likely to fix it?",
        options: [
          "Run it more times until it gets better",
          "Sharpen the system prompt — set explicit output structure, demand specific scores with justifications, and tell it to flag missing info rather than guess",
          "Upload more example CVs",
          "Switch to GPT-4 from GPT-3.5"
        ],
        correct: 1,
        why: "Custom GPT quality is mostly a system-prompt problem. Define the output structure, require concrete scores with reasoning, and explicitly allow it to say 'not enough info' instead of bluffing."
      },
      {
        q: "True or false: ChatGPT's web search means you can skip verifying the source it cites.",
        options: [
          "True — if ChatGPT cited a source, it read the source",
          "False — ChatGPT can hallucinate the contents of the page it browses, or misattribute the source",
          "True — but only for funding announcements",
          "False — but only if the source is a press release"
        ],
        correct: 1,
        why: "Web-search hallucination is real. Always open the cited link and confirm the claim is actually in the source before passing it to a client."
      }
    ],
    practical: {
      scenario: "Write the system prompt for a Custom GPT called 'Untapped JD Polisher'. The GPT takes a rough, client-supplied JD and returns a polished, candidate-facing version that's clear, sells the role, and removes weasel-words.\n\nThe GPT will be used 10+ times a week across the team, so the output needs to be consistent.",
      rubric: [
        "Defines the role/persona clearly (e.g. 'senior recruitment marketer')",
        "Specifies what input the GPT should ask for at the start",
        "Defines a structured output format (sections, headings, length)",
        "States the tone (e.g. direct, UK English, no fluff)",
        "Includes at least one 'guardrail' (e.g. flag missing info, never invent specifics)",
        "Demonstrates the four pillars: context, specificity, examples or constraints, iterability"
      ],
      exemplar: "ROLE: You are a senior recruitment marketer at Untapped. You polish rough client-supplied JDs into candidate-facing versions that are clear, honest, and compelling.\n\nALWAYS START by asking for: (1) the rough JD, (2) the client/company name and one-line description if not in the JD, (3) the must-haves (salary band, location, must-have skills), (4) anything the client explicitly does NOT want to share publicly.\n\nOUTPUT FORMAT (markdown):\n• One-line hook (max 20 words)\n• 'About the role' — 3-4 sentences, plain English, no jargon\n• 'What you'll do' — 5 bullets, action-led\n• 'What you'll bring' — 4-6 bullets, split must-have vs nice-to-have\n• 'The package' — salary band, location, work pattern, equity if applicable\n• 'Process' — what the interview process looks like\n\nTONE: Direct, UK English, warm but professional. No 'rockstar' or 'ninja'. No emoji. No clichés like 'fast-paced environment'.\n\nGUARDRAILS: If a key fact is missing (e.g. salary band), flag it explicitly with [MISSING: salary band] rather than invent one. Never add benefits the client didn't mention."
    }
  },

  // ---------------------------------------------------------------------------
  {
    slug: "sourcewhale",
    number: 3,
    title: "SourceWhale",
    tool: "SourceWhale",
    durationMins: 30,
    lead: "SourceWhale is our primary outreach automation tool. Done well, you run 5-10x more personalised outreach without losing the personalisation. Done badly, you spam your TAM and burn your domains. This module is about doing it well.",
    sections: [
      {
        heading: "What SourceWhale is for",
        body: [
          "SourceWhale lets you run multi-step outreach sequences across email, LinkedIn, and phone — with personalisation tokens, dynamic content, and per-prospect customisation built in.",
          "<strong>Where it sits vs alternatives:</strong> SourceWhale is recruitment-specific. Outreach and Apollo are sales-centric. We use SourceWhale because the templates, fields, and integrations are built for our motion.",
          "<strong>Where it integrates:</strong> Bullhorn, Vincere, JobAdder, LinkedIn (via extension), email (Gmail / Outlook), most modern ATSs.",
          "<strong>Where you'll spend most of your time:</strong> Building sequences, monitoring inbox replies, A/B testing subject lines, watching the bounce rate."
        ]
      },
      {
        heading: "Sequence design — the 4-step we use as default",
        body: [
          "Most of our outbound sequences follow a 4-step pattern. Stick to this until you have a reason not to.",
          "<strong>Step 1 — Day 0, Email.</strong> Short, personal, references shared context. Goal: get a reply, not pitch the role. ≤80 words.",
          "<strong>Step 2 — Day 3, LinkedIn connection request.</strong> No message attached if they have a 'public profile' setting; otherwise a one-liner echoing the email.",
          "<strong>Step 3 — Day 6, Email follow-up.</strong> Different subject line, bump the original message. Don't say 'just following up'. Add one specific reason the role is interesting <strong>for them</strong>.",
          "<strong>Step 4 — Day 10, LinkedIn message (if connected).</strong> Polite final touch. State this is the last time you'll reach out unless they engage."
        ]
      },
      {
        heading: "Personalisation tokens — use them well",
        body: [
          "SourceWhale supports static tokens (first name, company) and dynamic ones (a personalised first line, AI-generated). Both have a place.",
          "<strong>Static tokens are cheap insurance.</strong> Always populate firstName, currentCompany, currentRole, and one custom token like 'sharedSchool' or 'mutualConnection' if relevant.",
          "<strong>Dynamic first lines.</strong> SourceWhale's AI can write the first sentence based on a prospect's LinkedIn profile. It's good. It's not magic. Spot-check 1 in 10.",
          "<strong>Never:</strong> let a token go out empty. {{firstName}} appearing literally in a sent email is one of the worst things you can do to deliverability and reputation."
        ]
      },
      {
        heading: "Deliverability — your domain is your career",
        body: [
          "Bad outreach habits will get your sending domain blacklisted. That ends careers — yours and the firm's. Treat deliverability like a real responsibility.",
          "<strong>Warm up new mailboxes for at least 2 weeks before high-volume sends.</strong>",
          "<strong>Keep daily send volume under your warm-up ceiling.</strong> SourceWhale shows you this in the dashboard.",
          "<strong>Bounce rate above 5% is a red flag.</strong> Above 10% and you need to pause and clean your list.",
          "<strong>Open rate is a vanity metric in 2025+.</strong> Apple Mail Privacy Protection inflates it. Reply rate is the truth."
        ]
      }
    ],
    rule: "Reply rate is the only outreach metric that matters. Anything else is theatre.",
    quiz: [
      {
        q: "What's the goal of step 1 in our default 4-step outbound sequence?",
        options: [
          "Pitch the role in detail with comp range and start date",
          "Get a reply by referencing shared context, not pitch the role",
          "Send the full JD as a PDF attachment",
          "Ask them to book a call directly via Calendly link"
        ],
        correct: 1,
        why: "Step 1 is for the reply, not the close. Shared context — a post they made, a mutual contact, a relevant experience — gets the response. Pitching the role too hard in step 1 tanks reply rates."
      },
      {
        q: "Your sequence has a bounce rate of 12%. What should you do?",
        options: [
          "Keep going — bounces don't really matter",
          "Pause the sequence, clean your list, and run a verification tool before resuming",
          "Switch to a different mailbox and keep sending the same list",
          "Increase send volume to dilute the bounce ratio"
        ],
        correct: 1,
        why: "Above 5% you should worry, above 10% you must stop. Bounces tank deliverability for everyone on your domain. Verify the list (NeverBounce, ZeroBounce, etc.) before resuming."
      },
      {
        q: "You've set up dynamic AI first lines in SourceWhale. What's the right QA approach?",
        options: [
          "Trust them — that's the whole point of AI",
          "Spot-check ~10% before launch, especially for senior candidates or sensitive roles",
          "Review every single one before sending",
          "Disable them entirely and write each by hand"
        ],
          correct: 1,
        why: "Trusting blind is a recipe for an embarrassing send. Reviewing every line defeats the point. 10% spot-check is the right balance — catches systematic issues without removing the leverage."
      },
      {
        q: "True or false: open rate is the best metric for measuring sequence quality.",
        options: [
          "True — high opens = good subject lines = good performance",
          "False — Apple Mail Privacy Protection inflates opens. Reply rate is the metric that matters.",
          "True — but only when paired with click rate",
          "False — only revenue closed matters"
        ],
        correct: 1,
        why: "Apple MPP fires fake opens en masse, making open rate unreliable since iOS 15. Reply rate is the only metric that survives. Closed/won is the lagging measure, but reply rate is the actionable one."
      },
      {
        q: "A prospect replies negatively — 'not looking, please remove me'. What's the right SourceWhale action?",
        options: [
          "Mark them as 'do not contact' in SourceWhale and your CRM, and stop the sequence",
          "Send the next sequence step anyway, in case they change their mind",
          "Wait 30 days and re-add them to the same sequence",
          "Forward the negative reply to the rest of the team for visibility"
        ],
        correct: 0,
        why: "Negative replies need immediate removal from the sequence AND a permanent 'do not contact' flag in the CRM. Anything else risks regulatory issues (GDPR, CAN-SPAM) and certainly reputational ones."
      },
      {
        q: "You're about to send a sequence to 400 prospects on a brand-new sending mailbox. What's wrong?",
        options: [
          "Nothing — 400 is a small volume",
          "The mailbox hasn't been warmed up; high volume on a cold domain will spam-flag you fast",
          "You should send 800 instead to test capacity",
          "The send-time should be midnight for best results"
        ],
        correct: 1,
        why: "New mailboxes need 2+ weeks of warm-up (gradually increasing volume, replies, and engagement) before any meaningful outbound. Skipping this is the fastest way to destroy a domain's reputation."
      }
    ],
    practical: {
      scenario: "Plan a 4-step SourceWhale sequence for this scenario:\n\nRole: Head of Engineering at a Series A climate-tech startup, £160k + equity, hybrid London.\nTarget persona: VP of Engineering or Head of Eng at scale-ups (50-200 person Series B/C), 10+ yrs experience, ideally with a stated interest in climate or impact.\n\nDescribe each step: timing, channel, subject line (if email), the body in 60 words or fewer, and the personalisation token you'd lean on most. Don't write generic — pretend you're writing for one real candidate.",
      rubric: [
        "Four distinct steps with clear timing (e.g. Day 0, Day 3, Day 6, Day 10)",
        "Uses a mix of channels (email + LinkedIn) — not all one channel",
        "Step 1 references shared context or candidate motivation, not the role pitch",
        "Each step has a different subject line or angle (no 'just following up')",
        "Identifies specific personalisation tokens beyond firstName (e.g. company, post, mutual)",
        "Final step is a polite breakup with a clear 'last touch' framing"
      ],
      exemplar: "Step 1 — Day 0, Email. Subject: 'Climate × infra'. Body: 'Saw your post last month on rebuilding the data platform at [Company] — the bit about treating reliability as a product was very on the money. I'm working with a Series A climate-tech founder who's hit that exact wall and is looking for a Head of Eng who's lived it. Worth a 15-min chat? — Kyle' Token: lastPost.\n\nStep 2 — Day 3, LinkedIn connect, no note.\n\nStep 3 — Day 6, Email. Subject: 'On the climate angle —'. Body: 'Quick follow-up: the role I mentioned is at [redacted], Series A, real climate-impact story (saving 4M tonnes CO₂ p.a.), and the founder is ex-Stripe infra. £160k + meaningful equity. If now's not the moment, happy to send a one-pager and you can keep us on the radar.' Token: candidate's stated climate interest if mentioned anywhere.\n\nStep 4 — Day 10, LinkedIn DM. 'Hey [first name] — last note. If the timing's off, no worries; I'll stop here. If even slightly curious, just say 'tell me more' and I'll send a brief. Either way, good building.' Token: firstName."
    }
  },

  // ---------------------------------------------------------------------------
  {
    slug: "crm-ats",
    number: 4,
    title: "CRM & ATS Fundamentals",
    tool: "CRM & ATS",
    durationMins: 35,
    lead: "Your CRM is the second brain of your desk. If it isn't current, you can't be effective and the team can't help you. This module covers what to log, when, and how to keep your data clean enough to actually use.",
    sections: [
      {
        heading: "CRM vs ATS — what's the difference?",
        body: [
          "<strong>CRM (Client Relationship Management):</strong> tracks companies, contacts, deals, conversations. Think Salesforce, HubSpot, Bullhorn's CRM module. Lives at the client/prospect side of the desk.",
          "<strong>ATS (Applicant Tracking System):</strong> tracks candidates through pipelines. Stages, statuses, interview history. Bullhorn, Vincere, JobAdder, Loxo, Crelate are recruitment-native systems that combine both.",
          "<strong>At Untapped:</strong> we use [Your CRM/ATS] as the single source of truth. If it's not in there, it didn't happen."
        ]
      },
      {
        heading: "What you log, every single time",
        body: [
          "<strong>Every candidate interaction.</strong> Call notes, LinkedIn messages, email replies. The next person who picks up this candidate has to know what was said.",
          "<strong>Every client interaction.</strong> Call notes, agreed actions, anything that affects the relationship.",
          "<strong>Every stage change.</strong> Candidate moves from 'sourced' → 'screened' → 'submitted' → 'first interview' → etc. Time-stamped in the CRM, not in your head.",
          "<strong>Every job change.</strong> If you find out a candidate moved company, update their record. Stale data kills future placements."
        ]
      },
      {
        heading: "What good data hygiene looks like",
        body: [
          "<strong>Duplicate records are poison.</strong> Before creating a new contact or candidate, search for them first. Always.",
          "<strong>Stage discipline.</strong> A candidate is only at the stage they're actually at. Don't park them at 'submitted' for 3 weeks if the client never came back.",
          "<strong>Tags and labels exist for a reason.</strong> Use them consistently across the team. \"Hot lead\" should mean the same thing whether Lei tags it or you do.",
          "<strong>Custom fields aren't optional.</strong> If our setup has fields like 'preferred work pattern' or 'visa status', they get filled. That's where the team's leverage lives."
        ]
      },
      {
        heading: "What NOT to do",
        body: [
          "<strong>Don't sit on call notes 'until later'.</strong> Log them within the hour or you'll lose 40% of the detail.",
          "<strong>Don't bulk-import contacts without dedup.</strong> Every bulk import we've done badly has cost us a week of cleanup.",
          "<strong>Don't fork your own tagging system.</strong> If you invent a tag, agree it with the team first.",
          "<strong>Don't use the CRM as a CV-storage dump.</strong> CVs go in the candidate record. Notes go in notes. Don't mix them."
        ]
      }
    ],
    rule: "If it's not in the CRM within 24 hours, assume it doesn't exist. We can't help you on a candidate or deal that lives only in your head.",
    quiz: [
      {
        q: "A candidate calls you with new information about their notice period and salary expectations. What do you do?",
        options: [
          "Remember it — you've got a good memory",
          "Log it in their CRM record within the hour, in the structured fields and in the notes",
          "Email yourself a reminder to update the record later",
          "Tell the client immediately, then forget about updating the record"
        ],
        correct: 1,
        why: "Memory fails. The CRM is the second brain. Structured fields (notice period, comp expectation) for filterability, plus narrative notes for context. Within the hour while detail is fresh."
      },
      {
        q: "You're about to create a candidate record for 'Sarah Chen'. What's the first thing you do?",
        options: [
          "Click 'Create new candidate' and start typing",
          "Search the CRM for 'Sarah Chen' or 's.chen@' to check whether she already exists",
          "Ask the team if anyone has worked with her before",
          "Import her LinkedIn profile via the browser extension immediately"
        ],
        correct: 1,
        why: "Duplicate records are poison — they split notes, lose history, and waste everyone's time. Always search first. If she exists, update the existing record; if not, create."
      },
      {
        q: "A candidate has been at stage 'submitted to client' for 4 weeks with no client response. What's the right move?",
        options: [
          "Leave them there — submitted is submitted",
          "Move them to a 'stalled' or 'on hold' status, chase the client for an answer, and update the candidate so they know where they stand",
          "Withdraw them from the pipeline without telling them",
          "Move them to 'rejected' to clean up the pipeline"
        ],
        correct: 1,
        why: "Stage discipline means stages reflect reality. 4 weeks of no response is not 'submitted', it's stalled. Flag it, chase, communicate. Withdrawing without telling the candidate is a process and reputational failure."
      },
      {
        q: "Your colleague Lei has tagged candidates as 'A-player'. You don't know what criteria she uses. What should you do before applying the same tag?",
        options: [
          "Use the tag however you interpret it — language is flexible",
          "Ask Lei what 'A-player' means in her usage and align so the tag has consistent meaning across the team",
          "Invent your own tag that means what you intended",
          "Stop tagging entirely until there's a written guide"
        ],
        correct: 1,
        why: "Tags are only valuable if they mean the same thing across the team. Two minutes of conversation up front saves hours of confusion later. Document the agreed definition somewhere everyone can find."
      },
      {
        q: "What's the right home for a candidate's CV file?",
        options: [
          "Pasted into the notes field",
          "Attached to the candidate record in the structured 'CV / documents' field, with a date and version label",
          "Stored only on your local computer",
          "Forwarded to the client and never saved on your side"
        ],
        correct: 1,
        why: "CVs go in the structured field, dated and versioned. Pasting CV text into notes ruins searchability and audit trails. Local-only storage means losing the record if you leave or your laptop dies."
      },
      {
        q: "A bulk import dropped 800 new contacts into your CRM, but you didn't run dedup. Two weeks later, you notice 200 of them already existed. What's the cost?",
        options: [
          "Nothing — duplicates are harmless",
          "Split notes, split histories, wasted outreach to existing relationships, broken reporting, and a day to clean up. Real cost.",
          "It only matters for client contacts, not candidates",
          "Just delete the duplicates without checking — it's fine"
        ],
        correct: 1,
        why: "Duplicates fragment the truth. Outreach goes to the same person from multiple records. Reports double-count. Trust in the CRM erodes. Cleanup is slow and error-prone. Always dedup on import."
      }
    ],
    practical: {
      scenario: "You've just finished a 30-minute discovery call with a candidate — Maya Rodriguez, VP of Engineering at a Series B fintech, exploring a Head of Eng role we're recruiting for. You learned: she's open but not actively looking, comp expectation £180k base + equity, 4-week notice, would relocate within UK for the right role, has reservations about another fintech given she's been in fintech for 6 yrs, has a track record building infra teams from 5 → 35 engineers.\n\nDescribe exactly what you'd log in the CRM after this call: which structured fields, what tags, and what would go in the narrative notes. Be specific.",
      rubric: [
        "Updates structured fields (comp expectation, notice period, location preference)",
        "Records candidate motivation / openness state explicitly",
        "Logs the role context and what specifically she'd want or avoid (e.g. not another fintech)",
        "Includes time-relevant notes (notice period, when to recontact)",
        "Uses or proposes appropriate tags (e.g. 'open but passive', 'fintech-fatigued')",
        "Captures objective track-record detail (built infra teams 5→35), not just feel"
      ],
      exemplar: "Structured fields:\n• Comp expectation: £180k base + meaningful equity (logged in 'expected_comp_min' and 'expected_comp_currency' fields)\n• Notice period: 4 weeks\n• Location: London base, open to UK relocation for right role (logged in 'location_pref' field)\n• Visa status: confirmed UK right to work (verified)\n• Activity status: 'open passive' — not actively applying but receptive\n\nTags:\n• 'leadership' • 'platform-eng' • 'fintech-fatigued' (custom tag agreed with team) • 'team-builder'\n\nNarrative notes (in CRM call log):\n'30-min discovery call with Maya, [date]. Currently VP Eng at [client]. Track record: built infra team from 5 to 35 engineers over 4 yrs. Open to new conversations but not actively looking — would need to be a meaningful step up in scope, ownership, or comp (≥£180k base + real equity). Strong reservations about staying in fintech after 6 yrs — she's looking for sector change (climate-tech, deep-tech, or B2B SaaS infra). Would relocate within UK; not interested in fully-remote-only roles, prefers hybrid. Next step: send 2 non-fintech briefs by Friday, follow up Mon if no reply.'\n\nFollow-up flag: re-contact in 2 weeks if no reply on the briefs."
    }
  },

  // ---------------------------------------------------------------------------
  {
    slug: "linkedin-recruiter",
    number: 5,
    title: "LinkedIn Recruiter",
    tool: "LinkedIn Recruiter",
    durationMins: 40,
    lead: "LinkedIn Recruiter is the most expensive tool in your stack and the one you'll use most. This module is about extracting maximum value: Boolean search, projects, InMail strategy, and the things that separate someone billing well from someone burning seats.",
    sections: [
      {
        heading: "Recruiter vs Sales Nav vs Free LinkedIn",
        body: [
          "<strong>Free LinkedIn:</strong> useful for posts and your own network. Search is heavily restricted.",
          "<strong>Sales Navigator:</strong> built for sales — account filters, lead lists, but missing key recruiting filters like years of experience in current role.",
          "<strong>LinkedIn Recruiter:</strong> the full kit — every filter you need, 150+ InMails/month, projects to organise pipelines, recruiter tags, InMail templates. This is what we pay for and what you should be in 80% of your day."
        ]
      },
      {
        heading: "Boolean search — the muscle you must build",
        body: [
          "Boolean is how you turn a vague brief into a precise candidate list. Master the operators and you'll be 3x faster than associates who don't.",
          "<strong>AND / OR / NOT:</strong> the basics. Capitalised. 'engineer AND python NOT manager' = engineers who use Python and aren't managers.",
          "<strong>Quotation marks:</strong> for exact phrases. '\"head of engineering\"' is one phrase, not three separate words.",
          "<strong>Parentheses:</strong> for grouping. '(\"head of engineering\" OR \"VP engineering\") AND (fintech OR climate)' = senior eng leaders in fintech or climate.",
          "<strong>Asterisk wildcard:</strong> doesn't work in LinkedIn Recruiter (despite what some tutorials say). Use OR explicitly: 'develop OR developer OR development'.",
          "<strong>Use these in Title, Keywords, and Company fields separately</strong> — Recruiter applies different weight to each."
        ]
      },
      {
        heading: "Projects, tags, and pipeline discipline",
        body: [
          "<strong>Projects</strong> are how you organise candidates per role. One project = one open job. Don't share projects across roles — pipelines get tangled.",
          "<strong>Stages within a project:</strong> sourced → contacted → replied → interview → submitted → hired (or rejected with reason). Move people through stages as they progress.",
          "<strong>Tags:</strong> use them for cross-role attributes — 'A-list', 'do not contact', 'former Untapped placement', 'fintech-experienced'. Use consistent tag names across the team.",
          "<strong>Hide:</strong> if someone says \"not interested\", hide them from future searches via the 'Not interested' status — don't just close the tab."
        ]
      },
      {
        heading: "InMail strategy — your most expensive currency",
        body: [
          "You get a fixed number of InMail credits per month. Burning them on bad messages is genuinely costly.",
          "<strong>Subject line matters more than the body.</strong> If they don't open, the body is wasted. 'Re: your post on [X]' beats 'Exciting opportunity at [Co]' every time.",
          "<strong>≤120 words.</strong> Mobile-friendly. Three short paragraphs max.",
          "<strong>One ask only.</strong> Either ask for a reply, or ask for a call. Not both.",
          "<strong>InMail Free credit refunds.</strong> If you get a reply (even 'not interested') within 90 days, the credit comes back. That's why 'I'll personalise tomorrow' costs you money you didn't think about."
        ]
      }
    ],
    rule: "Every InMail credit you spend on a generic message is money set on fire. If you're not willing to spend 5 minutes personalising, don't send.",
    quiz: [
      {
        q: "You want to find senior engineering leaders in fintech or climate. Which Boolean is best?",
        options: [
          "head of engineering AND fintech",
          "\"head of engineering\" AND fintech AND climate",
          "(\"head of engineering\" OR \"VP engineering\" OR \"director of engineering\") AND (fintech OR \"climate tech\" OR cleantech)",
          "head of engineering fintech climate"
        ],
        correct: 2,
        why: "You need OR for synonyms (different ways to title the same role, different ways to describe the sector). AND between the two groups. Parentheses to group. The third option does all three correctly."
      },
      {
        q: "True or false: an asterisk (*) wildcard works in LinkedIn Recruiter's keyword search.",
        options: [
          "True — use 'develop*' to match developer, developing, development",
          "False — LinkedIn Recruiter doesn't support wildcards; use OR explicitly with each variant",
          "True — but only in the Title field",
          "False — but you can substitute with a question mark (?)"
        ],
        correct: 1,
        why: "LinkedIn Recruiter dropped wildcard support years ago, despite outdated tutorials still claiming otherwise. Use explicit OR for variants: '(develop OR developer OR development)'."
      },
      {
        q: "You're working two open roles for similar profiles. Should you share a single project across both?",
        options: [
          "Yes — saves time, same pipeline",
          "No — one project per role, otherwise stage tracking gets tangled and submission histories cross-contaminate",
          "Yes — only if the comp is identical",
          "No — only if the roles are at different companies"
        ],
        correct: 1,
        why: "Stages mean different things per role (someone 'submitted' to role A is not 'submitted' to role B). Mixing them in one project destroys reporting and creates submission errors. One project per open role. Always."
      },
      {
        q: "A candidate replies 'thanks but not looking right now'. What happens to your InMail credit?",
        options: [
          "Lost — it was used the moment you sent the message",
          "Refunded automatically because they replied within 90 days, even though they said no",
          "Refunded only if they say yes",
          "Refunded only if you flag the message as a mistake"
        ],
        correct: 1,
        why: "Any reply within 90 days refunds the credit — positive, negative, or neutral. That's why personalising matters: even a 'no' is free to you, and a generic ignored InMail costs the credit forever."
      },
      {
        q: "What's the most important InMail element for open rate?",
        options: [
          "Body length",
          "Subject line — if they don't open, nothing else matters",
          "Whether you attached a JD",
          "The day of the week you send"
        ],
        correct: 1,
        why: "Subject line is the gatekeeper. 'Re: your post on X' or 'Quick question on your work at Y' beats 'Exciting opportunity' every time. Treat it like the most important sentence in the message."
      },
      {
        q: "A candidate's profile says 'not open to opportunities'. What does that mean for InMail?",
        options: [
          "Skip them — they explicitly opted out",
          "Send anyway — InMail bypasses connection requirements, the setting only affects connection-based outreach",
          "It blocks your InMail entirely",
          "It costs 3x the normal credit"
        ],
        correct: 1,
        why: "Open-to-work and not-open-to-work flags don't prevent InMail delivery — they're a signal, not a block. You can still reach them. But the signal matters: assume the bar for a reply is higher, and personalise harder."
      },
      {
        q: "You've sent 50 InMails this month with no replies. What's most likely wrong?",
        options: [
          "LinkedIn is broken",
          "Your targeting and personalisation are off; review your subject lines, opening lines, and the candidate fit",
          "You need to send more InMails — the law of averages will kick in",
          "Recruiter is throttling you"
        ],
        correct: 1,
        why: "0% reply across 50 sends is a process problem, not a volume problem. Audit: are you targeting the right people? Are your subject lines distinct? Is your first line personalised? Are you over-pitching? Fix the diagnosis before you spend another credit."
      },
      {
        q: "Which is the best use of recruiter tags?",
        options: [
          "Inventing one ad-hoc per candidate so each tag is unique",
          "Using a small, agreed set of tags ('a-list', 'fintech-experienced', 'do-not-contact', 'former-placement') consistently across the team",
          "Tagging only the candidates you personally placed",
          "Using free-text comments instead — tags are pointless"
        ],
        correct: 1,
        why: "Tags only work as a shared vocabulary. Agree the list with the team, document what each means, apply consistently. Otherwise you've got 400 unique tags and zero leverage."
      }
    ],
    practical: {
      scenario: "Build a Boolean search string for the following brief, ready to paste into LinkedIn Recruiter's keyword field:\n\nRole: Head of Data Engineering at a Series C climate-tech company.\nMust-haves: 10+ yrs experience, has led a team, has worked with cloud data warehouses (Snowflake / BigQuery / Redshift), has shipped production data pipelines.\nNice-to-haves: climate / energy / sustainability sector experience, AWS or GCP background.\nNo-gos: currently in pure consulting, currently at FAANG (we won't compete on comp).\n\nWrite the Boolean string and one sentence explaining your structure.",
      rubric: [
        "Uses OR for title variants (head of data eng, VP data, director data eng, etc.)",
        "Uses OR for tooling variants (Snowflake, BigQuery, Redshift)",
        "Uses AND to combine title, tooling, and seniority signal",
        "Uses NOT or excludes consulting/FAANG with NOT operator",
        "Wraps phrases in quotation marks where needed (\"data engineering\", \"head of\")",
        "Includes a brief rationale for the structure",
        "Does not use asterisk wildcards (which don't work in LinkedIn Recruiter)"
      ],
      exemplar: "(\"head of data\" OR \"VP data\" OR \"director of data\" OR \"head of data engineering\" OR \"VP data engineering\" OR \"director of data engineering\") AND (snowflake OR bigquery OR redshift OR \"data warehouse\") AND (AWS OR GCP OR cloud) NOT (consulting OR consultant OR Google OR Meta OR Amazon OR Apple OR Netflix OR Microsoft)\n\nRationale: I group title synonyms with OR to catch every reasonable way the target role might be titled; AND-combine with a tooling cluster to filter for data engineers (not generic data roles); use a cloud platform AND to keep the signal strong; and exclude the no-go segments with NOT. I'd then refine in Recruiter filters: 10+ yrs experience, current company size, country, current job seniority = senior/director/VP."
    }
  },

  // ---------------------------------------------------------------------------
  {
    slug: "pin",
    number: 6,
    title: "Pin",
    tool: "Pin",
    durationMins: 25,
    lead: "Pin is an AI-native recruiting platform that combines sourcing, matching, and outreach in one tool. Done well, it gets you from 'open role' to 'first 20 qualified candidates' faster than any other tool we use. This module is about using its AI sensibly — leaning on the leverage without falling for the auto-pilot trap.",
    sections: [
      {
        heading: "What Pin actually does",
        body: [
          "Pin sits where Juicebox, Sourcewhale, and a CV-screening AI used to sit separately — it does all three in one workflow. You describe the role, Pin sources candidates, scores them against your criteria, and drafts personalised outreach.",
          "<strong>Three things Pin does:</strong>",
          "<strong>1. AI sourcing.</strong> You describe the role in natural language; Pin pulls candidates from its own dataset plus integrated sources.",
          "<strong>2. AI matching.</strong> Each candidate gets a fit score against your role's criteria, with reasoning attached.",
          "<strong>3. AI outreach.</strong> Pin drafts personalised first-touch messages based on each candidate's profile — you review and approve.",
          "<strong>Where we use it at Untapped:</strong> as the first move on a new brief, especially when speed matters and the role isn't deeply niche."
        ]
      },
      {
        heading: "Pin vs Juicebox vs SourceWhale — when to reach for which",
        body: [
          "These three overlap. Picking the right one matters.",
          "<strong>Reach for Pin when:</strong> you want one tool to handle sourcing → scoring → outreach for a clear, well-scoped role. Speed-to-first-candidate is the priority.",
          "<strong>Reach for Juicebox when:</strong> the candidate pool is niche or non-obvious (founders, researchers, deep technical talent) and you need to find people by what they've <em>shipped</em>, not what their profile says.",
          "<strong>Reach for SourceWhale when:</strong> you already have a list — from Pin, Juicebox, LinkedIn, or anywhere — and you need sophisticated multi-step sequence management with personalisation tokens.",
          "<strong>The combo we run most often:</strong> Pin to source + score the first 50 candidates → review and shortlist → push the top 20 into SourceWhale for the sequence. Pin's AI outreach is a draft; SourceWhale is the system of record for sequence delivery."
        ]
      },
      {
        heading: "Reading Pin's match scores",
        body: [
          "Pin gives every candidate a fit score against the role. The score is genuinely useful — but it's a starting point, not a verdict.",
          "<strong>High score (90+):</strong> worth a manual review. Pin is usually right at this band — verify and move forward.",
          "<strong>Mid score (70-89):</strong> the interesting zone. Pin is uncertain here; you'll find both gems and misses. Review more carefully.",
          "<strong>Low score (<70):</strong> usually filter out, but skim a few — sometimes Pin downweights a profile because of missing data on the candidate's end, not actual mismatch.",
          "<strong>Always read Pin's reasoning,</strong> not just the score. If the reasoning is shallow ('matches title keyword'), the score is unreliable. If the reasoning cites multiple specific signals, trust it more."
        ]
      },
      {
        heading: "What NOT to do",
        body: [
          "<strong>Don't auto-send Pin's drafted outreach without editing.</strong> Pin's drafts are good first attempts. They are not your voice. Pin reaches a higher reply rate after edits than before.",
          "<strong>Don't skip the manual top-20 review.</strong> Pin's match score is directional. A 5-minute scan of the top 20 catches misclassifications and protects your brand with the candidate.",
          "<strong>Don't bypass the CRM.</strong> Pin is upstream. Every candidate you actually engage gets logged in the CRM with the source ('Pin') tagged. Pin is not your single source of truth — the CRM is.",
          "<strong>Don't run Pin against a weak brief.</strong> If your input role description is vague, Pin's matches will be vague too. Spend 5 minutes writing a precise brief; you'll save 50 minutes downstream."
        ]
      }
    ],
    rule: "Pin gets you to the first qualified candidate list faster than anything else in the stack. The thinking is still yours — the editing, the judgement, the relationship. Pin saves you the grunt work, not the craft.",
    quiz: [
      {
        q: "You've just been briefed on a new role: Senior Product Designer at a Series A consumer fintech, London. What's the right first move with Pin?",
        options: [
          "Type 'product designer' into Pin and click search",
          "Spend 5 minutes writing a precise role description (specific seniority, sector, must-haves, no-gos) before running Pin, so the matching has good inputs",
          "Skip Pin and go straight to LinkedIn Recruiter",
          "Wait for the client to send a full JD before doing anything"
        ],
        correct: 1,
        why: "Pin's match quality is directly proportional to the quality of your input brief. A vague brief = vague matches. 5 minutes of role-precision saves you 50 minutes of reviewing irrelevant candidates."
      },
      {
        q: "Pin returns 80 candidates for your role. The top 20 all have a match score of 85+. What's the right next step?",
        options: [
          "Auto-send Pin's drafted outreach to all 20",
          "Manually review each of the top 20 — read the profile and Pin's reasoning — before approving them for outreach",
          "Trust the score and pick the top 5 randomly",
          "Re-run the search with looser criteria"
        ],
        correct: 1,
        why: "Pin's match score is directional, not definitive. A 5-minute manual review catches false positives that would otherwise burn an outreach credit on the wrong person and risk your brand. The top 20 review is non-negotiable."
      },
      {
        q: "Pin drafts a personalised outreach message for a senior candidate. You read it — it's reasonable but sounds slightly off-voice for Untapped. What do you do?",
        options: [
          "Send it anyway — Pin's voice is fine, candidates won't notice",
          "Edit it until it sounds like Untapped's voice (warm, direct, no fluff) before sending",
          "Reject Pin and write the outreach from scratch in Claude",
          "Send a generic template instead"
        ],
        correct: 1,
        why: "Pin's drafts are a strong starting point but rarely your final voice. Edit until it's yours. Pin saves you the blank page; the voice is still your job."
      },
      {
        q: "When does it make more sense to use Juicebox instead of Pin?",
        options: [
          "Always — Juicebox is better than Pin",
          "When the candidate pool is niche or non-obvious (deep technical roles, founders, researchers) and you need to find people by what they've shipped, not by job title",
          "When the role is junior and high-volume",
          "When you want sequence management"
        ],
        correct: 1,
        why: "Pin is excellent at well-scoped roles in well-indexed talent pools. Juicebox wins when you need to surface candidates by signals (GitHub, papers, talks, blog posts) that Pin's matching doesn't lean on as heavily."
      },
      {
        q: "Pin and your CRM disagree about a candidate's current company — Pin says 'Stripe', CRM says 'Block (ex-Stripe)'. What's the right source of truth?",
        options: [
          "Pin — it's newer data",
          "The CRM — it's our system of record, and we verify and curate the data inside it",
          "Whichever feels right",
          "Ignore both and ask the candidate"
        ],
        correct: 1,
        why: "Pin is upstream. The CRM is the source of truth because we curate and verify it. When they disagree, the CRM wins by default — but flag the discrepancy and check; sometimes Pin spotted a job change first."
      }
    ],
    practical: {
      scenario: "You've been briefed on a new role: Head of Engineering at a Series B fintech in London. Salary band £150-180k. Hybrid, 3 days/week in office. They want someone with 8+ years of experience, ideally has scaled a team from 10 → 40 engineers, no preference on prior fintech experience.\n\nWalk through how you'd run this through Pin: how you'd describe the role to Pin, how you'd handle the match scores, how you'd treat Pin's drafted outreach, and what gets logged in your CRM downstream.",
      rubric: [
        "Writes a precise role description for Pin (seniority, sector, scale signal, must-haves, no-gos) rather than a vague keyword",
        "Manually reviews top candidates rather than trusting match score alone",
        "Reads Pin's reasoning behind scores, not just the number",
        "Edits Pin's drafted outreach before sending (voice, specifics)",
        "Logs engaged candidates in CRM with Pin as source tagged",
        "Considers when to combine Pin with another tool (e.g. SourceWhale for the sequence, Juicebox for the niche misses)"
      ],
      exemplar: "1. Brief Pin precisely: 'Head of Engineering or VP Engineering, 8+ years experience, has scaled an engineering team from ~10 to 30-50 engineers (look for evidence in current/past role descriptions — e.g. \"grew team from\", \"hired 30 engineers\", \"managed 5 EMs\"). Based in London or open to relocating. Industry-agnostic but ideally has shipped a regulated or scaled consumer product. No preference for prior fintech. No-gos: pure consulting backgrounds, FAANG-only career paths.'\n\n2. Pin returns ~60 candidates. I sort by match score and read the top 20 candidates manually — profile, current role, Pin's reasoning. I'm looking for the team-scaling evidence specifically; Pin will sometimes assign a high score on title alone if the scaling signal isn't in the profile text.\n\n3. From the top 20, I shortlist 12 — the ones where Pin's reasoning cites multiple specific signals (team size, tenure pattern, scope progression) rather than just job title matching.\n\n4. Pin drafts personalised outreach for each of the 12. I read every draft and edit for: Untapped voice (warm, direct, UK English, no em-dashes), opening line that references the specific scaling story rather than the role pitch, removal of any generic phrases, max 80 words.\n\n5. Edited messages get pushed into SourceWhale as a 4-step sequence — I don't use Pin for the sequence delivery itself; SourceWhale gives me better deliverability monitoring and sequence-level control.\n\n6. CRM logging: each candidate gets a new record with 'source: Pin' tagged, Pin's match score and reasoning saved to the notes, current role/comp/notice as structured fields where Pin populated them. As they engage, stage moves: sourced → contacted → replied → screened.\n\n7. Fallback: if Pin's 60 doesn't yield 12 strong candidates, I run the same brief through Juicebox to catch anyone Pin missed — particularly engineering leaders with strong GitHub/talks presence who might be under-surfaced by Pin's matching."
    }
  },

  // ---------------------------------------------------------------------------
  {
    slug: "juicebox",
    number: 7,
    title: "Juicebox",
    tool: "Juicebox",
    durationMins: 25,
    lead: "Juicebox is AI-native search across the entire professional web — much broader than LinkedIn. You describe the candidate in plain English; Juicebox returns matches. This module is about when to reach for it and how to write the queries that get great results.",
    sections: [
      {
        heading: "When Juicebox beats LinkedIn Recruiter",
        body: [
          "LinkedIn is the world's biggest professional database, but it's not the only one. Juicebox indexes LinkedIn plus GitHub, personal sites, conference speakers, podcast guests, paper authors, Crunchbase, and more.",
          "<strong>Reach for Juicebox when:</strong> the candidate population isn't well-represented on LinkedIn (deep technical roles, niche industries, founders, researchers), or you need to find people by what they've DONE, not what their profile says.",
          "<strong>Reach for LinkedIn Recruiter when:</strong> the target role is well-represented on LinkedIn and you want the filtering power of Recruiter (years in seat, current company size, etc.)."
        ]
      },
      {
        heading: "Natural-language queries that work",
        body: [
          "Juicebox lets you describe candidates in plain English. The clearer and more specific, the better the results.",
          "<strong>Bad query:</strong> 'senior engineer'",
          "<strong>Good query:</strong> 'Senior backend engineer based in London or Berlin, who has shipped production payment infrastructure at a fintech of 100-500 people, ideally with experience in Rust or Go, and a public technical blog or open-source contributions'",
          "<strong>Why the good query works:</strong> it names the role, location, sector, company size, tooling, AND a signal (blog/OSS) that isn't usually on a LinkedIn profile but Juicebox can find."
        ]
      },
      {
        heading: "Iterate, then export",
        body: [
          "Juicebox results aren't static — refine the query and the list moves. Treat the first result set as a draft.",
          "<strong>Look at the top 10.</strong> If they're roughly the right shape, broaden cautiously. If they're not, tighten the query.",
          "<strong>Export to CSV.</strong> Once you have a good 50-100 candidates, export and bulk-enrich through PIN.",
          "<strong>Don't get lost in the search interface.</strong> Juicebox is good at finding people, less good at organising them. Move them to your CRM and project once they're qualified."
        ]
      },
      {
        heading: "Where Juicebox struggles",
        body: [
          "<strong>Volume roles:</strong> if you need 50 generic Java developers, LinkedIn's filters will get you there faster.",
          "<strong>Strict location filters:</strong> Juicebox's location matching is fuzzier than LinkedIn's.",
          "<strong>Very new graduates:</strong> the AI signal-finding leans on track record. People with thin online footprints get under-surfaced."
        ]
      }
    ],
    rule: "Use Juicebox for the candidates LinkedIn won't surface. Use LinkedIn for everyone else. They're complementary, not interchangeable.",
    quiz: [
      {
        q: "When is Juicebox a better starting point than LinkedIn Recruiter?",
        options: [
          "When you need 100 candidates for a generic mid-level role",
          "When the candidate population is niche (founders, researchers, deep technical roles) or you need to find people by what they've shipped, not what they've titled",
          "When you only have an evening's budget",
          "When the role is junior and the candidate pool is huge"
        ],
        correct: 1,
        why: "Juicebox's edge is the breadth of signal it can search — GitHub, blogs, conference talks, papers, Crunchbase. For volume roles in well-represented markets, LinkedIn Recruiter's filters are still faster."
      },
      {
        q: "Which is the more effective Juicebox query?",
        options: [
          "'senior engineer in fintech'",
          "'Senior backend engineer in London or Berlin who has shipped production payment infrastructure at a fintech of 100-500 people, ideally with Rust or Go experience and public technical writing or open-source contributions'",
          "'engineer'",
          "'someone good at code'"
        ],
        correct: 1,
        why: "The second query is specific on role, location, sector, scale, tooling, AND surfaces signals (blog, OSS) that LinkedIn can't filter on. That's exactly the kind of query that plays to Juicebox's strengths."
      },
      {
        q: "Your first Juicebox query returns 200 results, top 10 look slightly off-target. What's the right move?",
        options: [
          "Use all 200 anyway and let Sourcewhale figure it out",
          "Refine the query based on what the top 10 got wrong — tighten the disqualifying criteria",
          "Switch to a different tool immediately",
          "Wait an hour and re-run the same query"
        ],
        correct: 1,
        why: "Juicebox is iterative. The first result set is a draft. Look at what's off, sharpen the query, re-run. 3-4 iterations usually gets you a clean shortlist."
      },
      {
        q: "Once you have a clean 80-candidate list in Juicebox, what's the next step?",
        options: [
          "Reach out from inside Juicebox one by one",
          "Export to CSV, bulk-enrich contacts through PIN, then push the verified contacts into your CRM/project and start the Sourcewhale sequence",
          "Print the list and review on paper",
          "Forward it to the client to pick from"
        ],
        correct: 1,
        why: "Juicebox is built for discovery, not workflow. Once you have the list, the work moves to the CRM. Enrich, organise, sequence."
      },
      {
        q: "Where does Juicebox tend to struggle?",
        options: [
          "Finding niche technical talent",
          "Finding people with thin online footprints (e.g. very new grads) or doing strict location filtering compared to LinkedIn",
          "Finding founders",
          "Finding senior engineers"
        ],
        correct: 1,
        why: "Juicebox's signal-driven approach rewards people with track records online. New grads, off-grid professionals, or strict-geo searches play to LinkedIn's structured-filter strengths instead."
      }
    ],
    practical: {
      scenario: "Write a Juicebox query for the following brief:\n\nRole: Founding Product Manager at a London-based developer tools startup, pre-seed, building infra for AI agents.\nIdeal candidate: 5-8 years of PM experience, has been an early PM (#1-3 PM hire) at a B2B SaaS company, has technical depth (CS degree or self-taught engineer who moved into product), has demonstrably shipped products developers love (visible in GitHub stars, Hacker News posts, conference talks, or active blog).\n\nWrite the query and explain in one or two sentences why the structure plays to Juicebox's strengths rather than LinkedIn's.",
      rubric: [
        "Specifies the role title and seniority (e.g. founding PM, principal PM)",
        "Specifies the experience pattern (early-PM hire at B2B SaaS)",
        "Specifies the technical background signal (CS, engineering background)",
        "Calls out signals Juicebox can find that LinkedIn can't (GitHub, HN, talks, blog)",
        "Specifies location (London or remote-friendly)",
        "Brief rationale connecting query structure to Juicebox's strengths"
      ],
      exemplar: "Query: Founding or principal product manager, 5-8 years experience, based in London or remote with London overlap, who was one of the first 1-3 PM hires at a B2B SaaS company (dev tools, infra, or API-first product), has a technical background (CS degree, software engineering experience, or has shipped code on GitHub), and has demonstrably shipped products developers love — signals like GitHub stars on a repo they led, Hacker News posts that ranked, conference talks at devtools events (KubeCon, RailsConf, AI Engineer, etc.), or an active technical blog.\n\nWhy this plays to Juicebox: it asks for cross-signal matching that LinkedIn can't filter on — GitHub, HN, talks, blogs. LinkedIn would surface PMs by title and tenure but couldn't tell me which ones developers actually respect. Juicebox can stitch those signals together; LinkedIn cannot."
    }
  },

  // ---------------------------------------------------------------------------
  {
    slug: "clay",
    number: 8,
    title: "Clay",
    tool: "Clay",
    durationMins: 30,
    lead: "Clay is our data-enrichment workhorse. It takes a list of candidates or companies and combines 50+ data sources to give you a complete picture. This module is about thinking in tables and chaining enrichments to extract serious leverage.",
    sections: [
      {
        heading: "What Clay is (and isn't)",
        body: [
          "Clay is a spreadsheet with superpowers. Rows are candidates or companies. Columns can be data fields, enrichment lookups, AI prompts, or workflow actions.",
          "<strong>What makes it different from Excel:</strong> every cell can be a live API call. Want to enrich every row with PIN data, then ask Claude to score each candidate against a JD, then push the top 20 to your CRM? Three columns in Clay.",
          "<strong>What it isn't:</strong> a CRM. Clay is upstream. Use it to build clean lists, then push results to your CRM/Sourcewhale once they're ready for outreach."
        ]
      },
      {
        heading: "The four moves we make in Clay",
        body: [
          "<strong>1. Enrich.</strong> Import a list of LinkedIn URLs or company domains, add enrichment columns (PIN, Apollo, Clearbit) to fill in emails, phones, employee counts, funding stages, etc.",
          "<strong>2. Score.</strong> Add an AI column (Claude or GPT) that reads each row and returns a fit score against your brief. Now you've got a ranked list.",
          "<strong>3. Personalise.</strong> Add another AI column that drafts a personalised first line for outreach based on the enriched data.",
          "<strong>4. Push.</strong> Use Clay's CRM integrations (Bullhorn, HubSpot, Salesforce, Sourcewhale) to send the ranked + personalised list straight into the outreach tool."
        ]
      },
      {
        heading: "Cost discipline",
        body: [
          "Clay's pricing model is credits-per-action. Naïve workflows burn credits fast.",
          "<strong>Filter before you enrich.</strong> Don't enrich 5,000 rows when only 800 match your hard criteria. Filter first, enrich the survivors.",
          "<strong>Use the cheapest enrichment that works.</strong> Some data sources cost 1 credit, others 10. Start with the cheap ones; escalate only if they fail.",
          "<strong>Use waterfall enrichment.</strong> Clay's waterfall feature tries multiple sources in sequence and stops at the first hit. Way more efficient than running every source on every row."
        ]
      },
      {
        heading: "Where it breaks",
        body: [
          "<strong>Garbage in, garbage out.</strong> Clay can't fix a bad input list. If you import 500 rows of mismatched URL formats, the enrichments will fail and you'll have burned credits.",
          "<strong>AI columns aren't free.</strong> Each cell is a real LLM call. A 1,000-row workflow with 3 AI columns = 3,000 LLM calls. Cost-check before you press run.",
          "<strong>Schema sprawl.</strong> Don't add 25 columns 'just in case'. Each one slows the workflow and burns credits. Add what you need; remove what you don't."
        ]
      }
    ],
    rule: "Filter first, enrich the survivors. Most Clay invoices that horrify people are 'enriched 5,000 rows when 500 would have done'.",
    quiz: [
      {
        q: "You have a list of 4,800 LinkedIn URLs scraped from a target ICP. What's the right Clay workflow?",
        options: [
          "Enrich all 4,800 with PIN and Apollo immediately",
          "Filter first (by job title, company size, location) down to the 600-800 that actually match the brief, then enrich",
          "Send all 4,800 to Sourcewhale and let the bounce rate sort them",
          "Manually review all 4,800 in the Clay UI"
        ],
        correct: 1,
        why: "Filter first, enrich the survivors. Enriching 4,800 when 600 match wastes 80%+ of your credits and clutters the downstream workflow. Always tighten before you spend."
      },
      {
        q: "What's the right way to add a 'fit score' against a JD across 600 candidates in Clay?",
        options: [
          "Read each profile manually and score them in your head",
          "Add an AI column (Claude or GPT) with a structured prompt that takes the candidate's enriched data and returns a 1-10 score with one-line reasoning",
          "Export to Excel and use COUNTIFS",
          "Score the first 10 and assume the rest are similar"
        ],
        correct: 1,
        why: "An AI column at row-level scale is exactly what Clay is for. Structured prompt, explicit output format (score + reasoning), then you sort and review the top 20%. Manual is too slow at scale."
      },
      {
        q: "What's the 'waterfall enrichment' feature for?",
        options: [
          "Adding more enrichment sources to every row",
          "Trying multiple data providers in sequence and stopping at the first successful hit — much cheaper than running all providers on every row",
          "Sorting results by score",
          "Exporting data in waterfall order"
        ],
        correct: 1,
        why: "Waterfall = try cheap source first; if it returns nothing, try the next; stop at first hit. Massively reduces credit burn vs running every source on every row in parallel."
      },
      {
        q: "Your Clay workflow has 3 AI columns running on 1,200 rows. What's the cost reality?",
        options: [
          "Negligible — Clay handles AI cheaply",
          "3,600 LLM calls — real money. Cost-check the workflow before running, and consider sampling 50 rows first to validate the prompts",
          "Free — Clay includes unlimited AI",
          "Only the first 100 rows are billed"
        ],
        correct: 1,
        why: "Each AI cell is a real LLM call. 3 columns × 1,200 rows = 3,600 calls. Always sample first to validate the prompt logic, then scale once you know it works."
      },
      {
        q: "What's the right downstream destination for a Clay-enriched, AI-scored, personalised candidate list?",
        options: [
          "Stay in Clay — it's the CRM now",
          "Push the qualified candidates into your CRM and the personalised first-touch data into Sourcewhale for sequence enrollment",
          "Email the CSV to the client",
          "Print and pin to a noticeboard"
        ],
        correct: 1,
        why: "Clay is upstream. Once the list is enriched, scored, and personalised, push to the systems that actually run outreach (Sourcewhale) and track relationships (CRM). Clay isn't where work lives long-term."
      },
      {
        q: "You added a 4th AI column to your Clay workflow 'just to see what it gives'. What happened?",
        options: [
          "It cost nothing and helped",
          "It added another 1,000+ LLM calls and slowed the workflow — schema sprawl is a real cost",
          "Clay rejected it",
          "The other columns automatically merged"
        ],
        correct: 1,
        why: "Every column is a credit cost and a latency cost. 'Just in case' columns are how Clay invoices balloon. Add columns that have a clear job; remove ones that don't."
      }
    ],
    practical: {
      scenario: "Design a Clay workflow for this scenario:\n\nYou have a list of 3,000 LinkedIn URLs of people whose job titles include 'engineering manager' or 'head of engineering'. Your client wants to hire a Head of Eng for a Series B fintech in London, comp band £150-180k.\n\nDescribe the workflow in sequence: filtering, enrichment, scoring, personalisation, and what gets pushed downstream. Be specific about column purpose and order.",
      rubric: [
        "Starts with filtering (location, title, current company size, etc.) before enrichment",
        "Uses waterfall enrichment for contact data rather than running every source",
        "Includes an AI scoring column with a structured prompt and rubric",
        "Includes an AI personalisation column for first-touch messaging",
        "Pushes qualified candidates downstream (CRM and Sourcewhale)",
        "Acknowledges cost discipline (sampling, capping credits, avoiding column sprawl)"
      ],
      exemplar: "Workflow:\n\n1. Import 3,000 LinkedIn URLs to a Clay table.\n\n2. Filter step (no enrichment cost): use Clay's filter on the LinkedIn data already imported — location contains 'London' or 'UK', current company headcount 100-2,000 (fintech-sized), current title contains 'head of engineering' or 'VP engineering' or 'engineering manager'. Survivors: ~700 rows.\n\n3. Enrichment columns (run on the 700):\n   • Column A: Waterfall contact enrichment (PIN → Apollo → Clearbit), pulls work email. Cheap source first.\n   • Column B: Current company funding stage (Crunchbase). Confirms Series B-ish fit.\n   • Column C: Tenure in current role (calculated from LinkedIn data).\n\n4. AI scoring column (run on the 700):\n   • Column D: Claude prompt that takes the row's enriched data + the JD, returns a 1-10 fit score plus one-line reasoning. Structured output. Sample on 30 rows first to validate the prompt; once confident, run on all 700.\n\n5. Sort by fit score, take top 150.\n\n6. AI personalisation column (run only on the top 150 to save cost):\n   • Column E: Claude prompt that drafts a personalised opening line for outreach using the candidate's enriched data — current company, tenure, recent post if available.\n\n7. Push step:\n   • Top 150 candidates → CRM (new candidate records, tagged with this role's project ID).\n   • Same 150 → Sourcewhale (new sequence enrollment, with the personalised first line populated into the sequence's first-line token).\n\nCost discipline: column D and E run only on filtered/qualified subsets, not the full 3,000. Sample-first on column D before scaling. No 'just in case' columns; keep schema lean."
    }
  },
  {
    "slug": "alfa",
    "number": 9,
    "title": "Alfa for Recruiters",
    "tool": "Alfa",
    "durationMins": 25,
    "lead": "Alfa is an end-to-end AI recruiter — sourcing, job ads, screening and evaluation in one platform. This module shows you how to drive it, and where your judgement still has to take over.",
    "sections": [
      {
        "heading": "What Alfa actually is",
        "body": [
          "Alfa (welovealfa.com) isn't a single-point tool like a sourcing plug-in or an outreach sequencer — it runs the <strong>whole pipeline</strong>: sourcing, job advertising, screening, candidate evaluation and two-way ATS sync.",
          "Its AI assistant is called <strong>Lisa</strong> — the part candidates and recruiters interact with. The pitch is simple: hire better people in a fraction of the time, with the repetitive long-tail running in the background.",
          "Used well it's leverage. Used lazily it just ships a weak shortlist faster — so the skill is in <strong>driving</strong> it, not blindly trusting it."
        ]
      },
      {
        "heading": "Sourcing",
        "body": [
          "Alfa scans <strong>over 800 million profiles</strong> to match candidates to a role, then reaches out automatically — filling the pipeline from outbound, inbound, enriched data and past applicants.",
          "Your input is everything: a tight, specific brief in means relevant matches out. Treat the auto-sourced list as a first read of the market, not the finished shortlist."
        ]
      },
      {
        "heading": "Screening — meet Lisa",
        "body": [
          "Candidates can take an <strong>optional audio or video interview with Lisa</strong>. You get a structured summary of their fit before you ever spend a live call on them — the single biggest time-saver.",
          "Because candidates notice it, framing matters: set expectations, keep it human, and never let the AI step be the whole candidate experience."
        ]
      },
      {
        "heading": "The fit score",
        "body": [
          "Alfa returns an evidence-backed <strong>fit score</strong> built from three dimensions: <strong>skills, experience and role fit</strong> (e.g. a candidate at 92 fit).",
          "The score lets you triage a list at a glance. It is a <strong>starting point, not a verdict</strong> — always open the evidence behind a score before you action it, especially for borderline candidates or unusually strong profiles."
        ]
      },
      {
        "heading": "ATS, mobile & compliance",
        "body": [
          "Alfa offers <strong>two-way sync</strong> with Greenhouse, Workday, Lever, Ashby and 70+ other ATSs, so candidates flow into the system your client already runs with no re-keying. The full platform also runs in a mobile app.",
          "It's built to address <strong>NYC Local Law 144, the EU AI Act and GDPR</strong>, and is ISO 27001 certified — but the legal responsibility for fair hiring sits with you, not the tool. Keep a human in the loop and never reject a candidate on a score alone."
        ]
      }
    ],
    "badPrompt": "Find me some good salespeople.",
    "goodPrompt": "Source a SaaS Account Executive, London or remote-UK, 3–5 yrs closing experience, £50–60k base, ideally from a Series B–C software company. Prioritise consistent quota attainment and shortlist 10 with fit-score evidence.",
    "rule": "Alfa does the volume; you make the call. A fit score earns a candidate your attention — it never earns them the offer.",
    "donts": [
      "Don't ship Alfa's auto-generated job ad without editing it for tone and accuracy.",
      "Don't reject or hire on the fit score alone — open the evidence first.",
      "Don't feed it a vague brief and then blame the shortlist.",
      "Don't treat the Lisa screen as the whole candidate experience — stay human."
    ],
    "quiz": [
      {
        "q": "What best describes Alfa?",
        "options": [
          "A job-board aggregator",
          "An end-to-end AI recruiting platform (sourcing, screening, evaluation, ATS sync)",
          "A CRM for managing client relationships",
          "A LinkedIn outreach plug-in"
        ],
        "correct": 1,
        "why": "Alfa runs the whole pipeline rather than one isolated step."
      },
      {
        "q": "Roughly how many profiles does Alfa's sourcing scan?",
        "options": [
          "8 million",
          "80 million",
          "800 million+",
          "8 billion"
        ],
        "correct": 2,
        "why": "Alfa scans over 800 million profiles to find matches and reaches out automatically."
      },
      {
        "q": "What is \"Lisa\" in Alfa?",
        "options": [
          "The billing system",
          "Alfa's AI assistant that runs the audio/video screening interviews",
          "A reporting dashboard",
          "The name of the mobile app only"
        ],
        "correct": 1,
        "why": "Lisa is Alfa's AI recruiter — candidates take an optional audio or video screen with her."
      },
      {
        "q": "Alfa's fit score is built from which three dimensions?",
        "options": [
          "Salary, location, notice period",
          "Skills, experience, role fit",
          "Speed, cost, volume",
          "Education, references, availability"
        ],
        "correct": 1,
        "why": "The evidence-backed score combines skills, experience and role fit."
      },
      {
        "q": "How does Alfa work with a client's existing systems?",
        "options": [
          "Export to CSV only",
          "It replaces the client's ATS entirely",
          "Two-way sync with Greenhouse, Workday, Lever, Ashby and 70+ ATSs",
          "No integrations — it's standalone"
        ],
        "correct": 2,
        "why": "Alfa syncs both ways with 70+ applicant tracking systems."
      },
      {
        "q": "Which statement about the fit score is correct?",
        "options": [
          "A high score means no review is needed",
          "It's a triage starting point — review the evidence and keep a human in the loop",
          "It replaces the screening interview",
          "Reject anyone below a fixed score with no further checks"
        ],
        "correct": 1,
        "why": "A score must never be the sole basis for a decision — both bad practice and a compliance risk (NYC 144 / EU AI Act / GDPR)."
      }
    ],
    "practical": {
      "scenario": "Take a live role you're working (or a realistic mock) and run it through Alfa end to end: write a tight brief, generate and then edit the job ad, run a sourcing search, and trigger (or simulate) a Lisa screen. Produce a shortlist of 3 candidates with their fit scores. For each, write 2–3 lines on whether you agree with the score and what the evidence shows. Finish with a 3–4 sentence reflection: what Alfa saved you, what you'd still do by hand, and one risk you'd watch for.",
      "rubric": [
        "Wrote a specific, well-scoped brief rather than a vague one",
        "Edited the AI-generated job ad rather than shipping it raw",
        "Used the full pipeline (sourcing, screen, evaluation), not just sourcing",
        "Interrogated at least one fit score against its evidence instead of accepting it",
        "Showed awareness that the human and compliance stay in the loop",
        "Wrote in a clear, confident, client-ready voice"
      ],
      "exemplar": "Brief: 'Senior PHP Engineer, remote-UK, 5+ yrs Laravel, fintech preferred, £65–75k — shortlist 8 with evidence.' Alfa surfaced 8; I kept Maya (92 fit — 6 yrs Laravel, two fintechs, strong open-source) and Aaron (88 — ex-payments, Go+PHP) but dropped a 90-fit profile whose score leaned on keyword matches with no shipped fintech work. I edited the auto job ad to fix tone and add the client's mission line. Lisa's screens saved me ~4 first calls; I'd still call all three myself before submitting. Risk to watch: the score over-rewards keyword density, so I always open the evidence and never let it auto-reject anyone."
    }
  }
];

export function getModule(slug: string): Module | undefined {
  return MODULES.find(m => m.slug === slug);
}

export function getNextModule(slug: string): Module | undefined {
  const idx = MODULES.findIndex(m => m.slug === slug);
  return idx >= 0 && idx < MODULES.length - 1 ? MODULES[idx + 1] : undefined;
}
