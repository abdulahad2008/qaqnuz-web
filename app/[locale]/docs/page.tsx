"use client";

import { useState } from "react";
import {
  BookOpen, Terminal, Code2, Zap, ChevronRight, ArrowRight,
  CheckCircle2, Settings, Shield, BarChart3, MessageSquare,
  Users, Bell, Key, Webhook, Database, GitBranch, Lock,
  Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import { Footer } from "@/components/sections/footer";
import { cn } from "@/lib/utils";

/* ─── Sidebar structure ──────────────────────────────────────── */
const SECTIONS = [
  {
    group: "Getting Started",
    icon: BookOpen,
    id: "getting-started",
    items: [
      { id: "overview",       label: "Overview" },
      { id: "onboarding",     label: "Brand onboarding" },
      { id: "trust-levels",   label: "Trust levels" },
      { id: "first-reply",    label: "Your first AI reply" },
    ],
  },
  {
    group: "Mission Control",
    icon: Terminal,
    id: "mission-control",
    items: [
      { id: "inbox",     label: "Inbox" },
      { id: "brands",    label: "Brands" },
      { id: "queue",     label: "Review Queue" },
      { id: "analytics", label: "Analytics" },
      { id: "monitor",   label: "Monitor" },
    ],
  },
  {
    group: "AI Pipeline",
    icon: Zap,
    id: "pipeline",
    items: [
      { id: "pipeline-overview", label: "Pipeline overview" },
      { id: "qualify",           label: "Stage 1 — Qualify" },
      { id: "classify",          label: "Stage 2 — Classify" },
      { id: "retrieve",          label: "Stage 3 — Retrieve" },
      { id: "compose",           label: "Stage 4 — Compose" },
      { id: "guard",             label: "Stage 5 — Guard" },
      { id: "evaluate",          label: "Stage 6 — Evaluate" },
      { id: "trust",             label: "Stage 7 — Trust" },
      { id: "publish",           label: "Stage 8 — Publish" },
    ],
  },
  {
    group: "API Reference",
    icon: Code2,
    id: "api",
    items: [
      { id: "api-overview",   label: "Overview" },
      { id: "authentication", label: "Authentication" },
      { id: "webhooks",       label: "Webhooks" },
      { id: "endpoints",      label: "Endpoints" },
    ],
  },
];

/* ─── Code block component ───────────────────────────────────── */
function Code({ children, lang = "bash" }: { children: string; lang?: string }) {
  return (
    <pre className="bg-secondary border border-border rounded-xl px-5 py-4 text-sm font-mono text-foreground overflow-x-auto my-4">
      <code>{children}</code>
    </pre>
  );
}

function InlineCode({ children }: { children: string }) {
  return (
    <code className="bg-secondary border border-border rounded px-1.5 py-0.5 text-xs font-mono text-accent">
      {children}
    </code>
  );
}

function Callout({ type = "info", children }: { type?: "info" | "warning" | "tip"; children: React.ReactNode }) {
  const styles = {
    info:    "bg-accent/5 border-accent/20 text-foreground",
    warning: "bg-amber-500/5 border-amber-500/20 text-foreground",
    tip:     "bg-emerald-500/5 border-emerald-500/20 text-foreground",
  };
  const labels = { info: "Note", warning: "Warning", tip: "Tip" };
  const labelColors = { info: "text-accent", warning: "text-amber-600 dark:text-amber-400", tip: "text-emerald-600 dark:text-emerald-400" };
  return (
    <div className={cn("border rounded-xl px-5 py-4 my-4 text-sm leading-relaxed", styles[type])}>
      <span className={cn("font-semibold mr-1", labelColors[type])}>{labels[type]}:</span>
      {children}
    </div>
  );
}

/* ─── Section heading helpers ────────────────────────────────── */
function H1({ id, children }: { id?: string; children: React.ReactNode }) {
  return <h1 id={id} className="text-3xl font-bold text-foreground mb-4 scroll-mt-20">{children}</h1>;
}
function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return <h2 id={id} className="text-xl font-bold text-foreground mt-12 mb-3 pb-2 border-b border-border scroll-mt-20">{children}</h2>;
}
function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return <h3 id={id} className="text-base font-semibold text-foreground mt-6 mb-2 scroll-mt-20">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground leading-relaxed mb-3">{children}</p>;
}
function Li({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-2 text-sm text-muted-foreground mb-1.5"><ChevronRight className="h-4 w-4 text-accent shrink-0 mt-0.5" /><span>{children}</span></li>;
}

/* ─── Main docs content ──────────────────────────────────────── */
function DocsContent() {
  return (
    <div className="max-w-3xl">

      {/* ── GETTING STARTED ──────────────────────────────────── */}
      <div id="getting-started" className="scroll-mt-20 mb-2">
        <div className="flex items-center gap-3 mb-6 pt-2">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-accent font-semibold uppercase tracking-wider">Getting Started</p>
          </div>
        </div>
      </div>

      <H1 id="overview">Welcome to Qaqnuz</H1>
      <P>
        Qaqnuz is an AI-powered Instagram automation platform built for Uzbekistan's top brands.
        It runs every DM, comment, and story reply through an 8-stage AI pipeline with human oversight
        at every step — so your brand always sounds like your brand.
      </P>
      <P>
        This documentation covers brand onboarding, the Mission Control dashboard, the AI pipeline,
        and the developer API.
      </P>

      <Callout type="tip">
        New to Qaqnuz? Start with <strong>Brand onboarding</strong> below, then configure your Trust Level before going live.
      </Callout>

      <H2 id="onboarding">Brand onboarding</H2>
      <P>Each brand you manage in Qaqnuz goes through a 4-step onboarding process:</P>
      <ol className="list-none mb-4 space-y-2">
        {[
          ["Connect Instagram", "Link your Instagram Business or Creator account via the official Meta API. Qaqnuz needs Read + Respond permissions on messages and comments."],
          ["Build your brand profile", "Upload your brand voice, product catalog, FAQs, pricing, delivery policies, and payment methods (Click, Payme, Uzum, Humo). The AI uses this as its knowledge base."],
          ["Set Trust Level", "Choose L1 (all drafts reviewed), L2 (FAQs auto-published, complex queued), or L3 (full automation with guardrails). You can change this at any time."],
          ["Go live", "Flip the toggle in Mission Control → Brands. The pipeline starts processing incoming messages within seconds."],
        ].map(([title, desc], i) => (
          <li key={i} className="flex gap-4 text-sm">
            <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
            <div>
              <span className="font-semibold text-foreground">{title} — </span>
              <span className="text-muted-foreground">{desc}</span>
            </div>
          </li>
        ))}
      </ol>

      <H2 id="trust-levels">Trust levels</H2>
      <P>
        Trust levels control how much the AI can publish without human review. You set the level
        per brand and can change it at any time.
      </P>

      <div className="grid sm:grid-cols-3 gap-3 my-4">
        {[
          { level: "L1", name: "Review all", color: "border-muted-foreground/30 bg-secondary/50", desc: "Every AI-composed reply goes to your Review Queue before publishing. Full control, highest safety." },
          { level: "L2", name: "Smart auto", color: "border-accent/30 bg-accent/5", desc: "FAQ-type responses publish immediately. Anything outside your knowledge base or over a confidence threshold goes to the queue." },
          { level: "L3", name: "Full auto", color: "border-emerald-500/30 bg-emerald-500/5", desc: "All replies publish automatically. The 9 guardrails still run; only safety-flagged messages are held for review." },
        ].map(({ level, name, color, desc }) => (
          <div key={level} className={cn("surface-card p-4 border-2", color)}>
            <div className="text-lg font-bold text-foreground mb-0.5">{level}</div>
            <div className="text-xs font-semibold text-accent mb-2">{name}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <H2 id="first-reply">Your first AI reply</H2>
      <P>Once your brand is live, here's what happens when a customer sends a DM:</P>
      <ol className="list-none space-y-1.5 mb-4">
        {[
          "Message arrives → pipeline starts within 200ms",
          "Qualify stage checks if it's spam/bot/irrelevant",
          "Classify stage identifies intent (price inquiry, order status, complaint…)",
          "Retrieve stage pulls relevant facts from your brand knowledge base",
          "Compose stage writes the reply in your brand voice",
          "Guard stage runs 9 safety checks",
          "Evaluate stage scores quality and confidence",
          "Trust stage routes: auto-publish (L2/L3) or send to Review Queue (L1)",
          "Publish stage sends the reply via the Instagram API",
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-accent font-mono text-xs mt-0.5">{String(i + 1).padStart(2, "0")}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      {/* ── MISSION CONTROL ──────────────────────────────────── */}
      <div id="mission-control" className="scroll-mt-20 mt-16 mb-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Terminal className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-accent font-semibold uppercase tracking-wider">Mission Control</p>
          </div>
        </div>
      </div>

      <H1>Mission Control dashboard</H1>
      <P>
        Mission Control is the operator workspace where you review queued replies, monitor pipeline
        health, manage brands, and analyze performance.
      </P>

      <H2 id="inbox">Inbox</H2>
      <P>
        The Inbox shows all active conversations across all your brands. Each row displays the
        customer handle, the brand they contacted, the AI's latest draft, and the current status.
      </P>
      <ul className="list-none mb-4">
        <Li><strong className="text-foreground">Auto-replied</strong> — the AI published a reply autonomously (L2/L3 brands).</Li>
        <Li><strong className="text-foreground">Pending review</strong> — the reply is in your queue, waiting for approval.</Li>
        <Li><strong className="text-foreground">Escalated</strong> — the pipeline flagged this conversation for immediate human attention.</Li>
        <Li><strong className="text-foreground">Taken over</strong> — an operator is handling this conversation manually.</Li>
      </ul>
      <Callout type="info">
        Click any conversation row to open the full thread, see the AI's reasoning at each pipeline stage, and approve, edit, or reject the draft.
      </Callout>

      <H2 id="brands">Brands</H2>
      <P>The Brands panel lists all Instagram accounts connected to your workspace.</P>
      <ul className="list-none mb-4">
        <Li>Toggle a brand live/paused without disconnecting it.</Li>
        <Li>Set or change the Trust Level per brand.</Li>
        <Li>Update the brand knowledge base (FAQs, catalog, policies).</Li>
        <Li>View per-brand stats: DMs/day, auto-rate, avg response time.</Li>
      </ul>

      <H2 id="queue">Review Queue</H2>
      <P>
        The Queue shows all AI-composed replies waiting for human approval. For each item you can:
      </P>
      <ul className="list-none mb-4">
        <Li><strong className="text-foreground">Approve</strong> — publish the reply as-is.</Li>
        <Li><strong className="text-foreground">Edit & Approve</strong> — modify the text before publishing.</Li>
        <Li><strong className="text-foreground">Reject</strong> — discard the draft; the conversation stays open.</Li>
        <Li><strong className="text-foreground">Take Over</strong> — claim the conversation and handle it manually.</Li>
      </ul>
      <P>
        Each queued item shows the AI's confidence score, the pipeline stage it was held at, and
        the reason for review (low confidence, policy flag, escalation keyword, etc.).
      </P>

      <H2 id="analytics">Analytics</H2>
      <P>The Analytics panel tracks these key metrics:</P>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
        {[
          ["Automation rate", "% of conversations handled without human edits"],
          ["Avg response time", "Time from message received to reply sent"],
          ["CSAT score", "Customer satisfaction rating (1–5)"],
          ["Queue volume", "Replies awaiting human review"],
          ["Guardrail hits", "Messages blocked by safety checks"],
          ["Cost per reply", "Compute cost per AI-handled message"],
        ].map(([title, desc]) => (
          <div key={title} className="surface-card p-3">
            <p className="text-xs font-semibold text-foreground mb-0.5">{title}</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <H2 id="monitor">Monitor</H2>
      <P>
        The Monitor panel shows real-time pipeline health. It displays per-stage latency,
        error rates, queue depth, and the status of all 9 AMT (Automated Message Triage) services.
      </P>
      <Callout type="warning">
        If any service shows <strong>Degraded</strong> or <strong>Down</strong> status, new messages
        are held in the queue until the service recovers. You'll receive an email and Telegram notification.
      </Callout>

      {/* ── AI PIPELINE ──────────────────────────────────────── */}
      <div id="pipeline" className="scroll-mt-20 mt-16 mb-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-accent font-semibold uppercase tracking-wider">AI Pipeline</p>
          </div>
        </div>
      </div>

      <H1>AI Pipeline</H1>
      <P>
        Every message processed by Qaqnuz passes through 8 sequential stages. Each stage adds
        context, applies checks, and passes a structured payload to the next stage.
      </P>

      <H2 id="pipeline-overview">Pipeline overview</H2>
      <div className="flex flex-wrap gap-1.5 my-4">
        {["Qualify","Classify","Retrieve","Compose","Guard","Evaluate","Trust","Publish"].map((s, i) => (
          <div key={s} className="flex items-center gap-1">
            <span className="bg-accent text-accent-foreground text-xs font-bold rounded px-2 py-0.5">{i+1}</span>
            <span className="text-sm text-foreground font-medium">{s}</span>
            {i < 7 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
          </div>
        ))}
      </div>
      <P>Total pipeline latency target: under 2 seconds end-to-end for standard messages.</P>

      <H2 id="qualify">Stage 1 — Qualify</H2>
      <P>
        Determines whether the incoming message is worth processing. Filters out spam, bot messages,
        gibberish, duplicate messages, and content outside the brand's defined scope.
      </P>
      <ul className="list-none mb-4">
        <Li>Spam / bot detection (pattern matching + ML classifier)</Li>
        <Li>Language detection — routes non-Uzbek/Russian messages to escalation</Li>
        <Li>Duplicate detection — deduplicates messages sent multiple times</Li>
        <Li>Out-of-scope detection — marks messages for human review if they fall outside the brand topic</Li>
      </ul>

      <H2 id="classify">Stage 2 — Classify</H2>
      <P>
        Identifies the intent and entity structure of the message. Classification is used to route
        the message to the correct response template and knowledge base section.
      </P>
      <ul className="list-none mb-4">
        <Li>Intent: price inquiry, availability, order status, complaint, compliment, return, custom order, general question</Li>
        <Li>Entity extraction: product name, SKU, size, color, quantity, delivery location</Li>
        <Li>Sentiment: positive, neutral, negative (used for priority routing)</Li>
        <Li>Urgency: normal, high, critical (complaints and payment issues are always high)</Li>
      </ul>

      <H2 id="retrieve">Stage 3 — Retrieve</H2>
      <P>
        Pulls the most relevant facts from the brand's knowledge base using semantic search.
        The retrieved context is injected into the prompt for Stage 4.
      </P>
      <ul className="list-none mb-4">
        <Li>Vector search over product catalog, FAQs, policies</Li>
        <Li>Payment method lookup (Click, Payme, Uzum, Humo links/instructions)</Li>
        <Li>Order status lookup (if CRM integration is active)</Li>
        <Li>Confidence score: if retrieval confidence &lt; 0.65, the message is flagged for human review</Li>
      </ul>

      <H2 id="compose">Stage 4 — Compose</H2>
      <P>
        Generates the reply using Claude Opus 4.7 with a brand-specific system prompt.
        The compose stage uses the classification, retrieved context, and full conversation
        history to write a reply in the brand's voice.
      </P>
      <Code lang="text">{`System prompt structure:
- Brand identity & voice (tone, vocabulary, formality)
- Product knowledge (injected from Retrieve stage)
- Conversation history (last 10 messages)
- Reply constraints (max length, emoji policy, CTA rules)
- Current date/time and brand timezone`}</Code>

      <H2 id="guard">Stage 5 — Guard</H2>
      <P>Nine safety guardrails run in parallel before a reply can proceed:</P>
      <div className="grid sm:grid-cols-2 gap-2 my-4">
        {[
          ["Price accuracy", "Quoted price matches catalog ± 0%"],
          ["Policy compliance", "No promises outside brand policy"],
          ["Harmful content", "No offensive, discriminatory, or harmful text"],
          ["PII protection", "No customer personal data repeated back"],
          ["Brand voice", "Matches brand tone profile (cosine sim > 0.85)"],
          ["Factual grounding", "All claims traceable to knowledge base"],
          ["Legal safety", "No unverifiable health/legal/financial claims"],
          ["Competitor mentions", "No accidental competitor product mentions"],
          ["Escalation keywords", "Detects legal threats, media escalation, etc."],
        ].map(([title, desc]) => (
          <div key={title} className="flex items-start gap-2 surface-card p-3">
            <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-foreground">{title}</p>
              <p className="text-[11px] text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <P>If any guardrail fails, the message is held in the Review Queue with a detailed failure reason.</P>

      <H2 id="evaluate">Stage 6 — Evaluate</H2>
      <P>
        Scores the composed reply across 4 dimensions. If the aggregate score falls below the
        brand's configured threshold, the message is routed to the queue.
      </P>
      <ul className="list-none mb-4">
        <Li><strong className="text-foreground">Helpfulness</strong> — does the reply actually answer the question?</Li>
        <Li><strong className="text-foreground">Accuracy</strong> — are all facts correct and grounded?</Li>
        <Li><strong className="text-foreground">Brand alignment</strong> — does it sound like the brand?</Li>
        <Li><strong className="text-foreground">Completeness</strong> — does it handle all entities in the message?</Li>
      </ul>

      <H2 id="trust">Stage 7 — Trust</H2>
      <P>
        Routes the reply based on the brand's Trust Level and the aggregate score from Stage 6.
      </P>
      <Code>{`L1 brand:  → always route to Review Queue
L2 brand:  score ≥ 0.90 AND all guardrails pass → auto-publish
           score <  0.90 OR any guardrail warn   → Review Queue
L3 brand:  all guardrails pass                  → auto-publish
           any guardrail fail                    → Review Queue`}</Code>

      <H2 id="publish">Stage 8 — Publish</H2>
      <P>
        Sends the approved reply via the Instagram Graph API. Handles rate limiting, retry logic
        (3 attempts with exponential backoff), and delivery confirmation.
      </P>
      <ul className="list-none mb-4">
        <Li>DMs: send via <InlineCode>POST /me/messages</InlineCode></Li>
        <Li>{"Comments: reply via POST /{comment_id}/replies"}</Li>
        <Li>Stories: send DM response to story mention</Li>
        <Li>Delivery receipt stored in <InlineCode>analytics_events</InlineCode> table</Li>
      </ul>

      {/* ── API REFERENCE ────────────────────────────────────── */}
      <div id="api" className="scroll-mt-20 mt-16 mb-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Code2 className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-accent font-semibold uppercase tracking-wider">API Reference</p>
          </div>
        </div>
      </div>

      <H1>API Reference</H1>
      <P>
        The Qaqnuz API lets you push custom events, sync your product catalog, query conversation
        history, and receive real-time webhooks for pipeline events.
      </P>

      <Callout type="info">
        The API is available on Growth and Enterprise plans. Contact us to get your API key.
      </Callout>

      <H2 id="api-overview">Base URL</H2>
      <Code>{`https://api.qaqnuz.uz/v1`}</Code>
      <P>All requests must include an <InlineCode>Authorization: Bearer YOUR_API_KEY</InlineCode> header.
      Responses are JSON. Timestamps are ISO 8601 UTC.</P>

      <H2 id="authentication">Authentication</H2>
      <H3>Get an API key</H3>
      <P>
        API keys are issued per workspace. Generate one in Mission Control → Settings → API Keys.
        Keys are prefixed <InlineCode>qn_live_</InlineCode> for production and <InlineCode>qn_test_</InlineCode> for sandbox.
      </P>
      <Code>{`curl https://api.qaqnuz.uz/v1/brands \\
  -H "Authorization: Bearer qn_live_xxxxxxxxxxxx"`}</Code>

      <H2 id="webhooks">Webhooks</H2>
      <P>
        Register a webhook URL in Mission Control → Settings → Webhooks to receive real-time
        events. Qaqnuz signs every request with an <InlineCode>X-Qaqnuz-Signature</InlineCode> header
        (HMAC-SHA256 of the raw body using your webhook secret).
      </P>
      <H3>Event types</H3>
      <div className="my-4 surface-card overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-4 py-2.5 font-semibold text-foreground">Event</th>
              <th className="text-left px-4 py-2.5 font-semibold text-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["message.received",   "New DM, comment, or story mention arrived"],
              ["reply.auto_sent",    "Pipeline auto-published a reply"],
              ["reply.queued",       "Reply held in Review Queue"],
              ["reply.approved",     "Operator approved a queued reply"],
              ["reply.rejected",     "Operator rejected a queued reply"],
              ["guardrail.triggered","A safety guardrail blocked a reply"],
              ["brand.paused",       "A brand was paused (manual or auto)"],
            ].map(([event, desc], i) => (
              <tr key={event} className={cn("border-b border-border/50 last:border-0", i % 2 === 1 ? "bg-secondary/30" : "")}>
                <td className="px-4 py-2.5"><InlineCode>{event}</InlineCode></td>
                <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2 id="endpoints">Endpoints</H2>
      <H3>List brands</H3>
      <Code>{`GET /v1/brands

Response:
{
  "brands": [
    {
      "id": "brand_abc123",
      "name": "KadrBeauty",
      "ig_username": "kadrbeauty",
      "trust_level": "L2",
      "status": "live",
      "stats": { "dms_today": 142, "auto_rate": 0.82 }
    }
  ]
}`}</Code>

      <H3>Get conversations</H3>
      <Code>{`GET /v1/brands/:brand_id/conversations?status=pending&limit=20

Response:
{
  "conversations": [
    {
      "id": "conv_xyz",
      "customer_handle": "@aziza_m",
      "last_message": "Narxi qancha?",
      "status": "pending_review",
      "draft_reply": "Assalomu alaykum! ...",
      "confidence": 0.87,
      "created_at": "2026-05-12T10:34:00Z"
    }
  ]
}`}</Code>

      <H3>Push catalog update</H3>
      <Code>{`POST /v1/brands/:brand_id/catalog

Body:
{
  "products": [
    {
      "sku": "DRESS-001",
      "name": "Lola Kuz Ko'ylagi",
      "price_uzs": 320000,
      "available": true,
      "description": "...",
      "tags": ["dress", "autumn", "size-S", "size-M", "size-L"]
    }
  ]
}

Response: { "updated": 1, "indexed": true }`}</Code>

      {/* Bottom CTA */}
      <div className="mt-16 surface-card p-8 text-center">
        <p className="text-sm font-semibold text-foreground mb-1">Need help with your integration?</p>
        <p className="text-sm text-muted-foreground mb-5">
          Reach out to our team — we'll help you get set up.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="md" asChild>
            <Link href="/book-demo">
              Book a call <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="secondary" size="md" asChild>
            <a href="mailto:hello@qaqnuz.uz">Email us</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Page component ─────────────────────────────────────────── */
export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen pt-16 bg-background">
        {/* Mobile nav toggle */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="w-12 h-12 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile sidebar drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)} />
            <div className="relative w-72 bg-background border-r border-border h-full overflow-y-auto pt-20 pb-8 px-4 z-10">
              <Sidebar activeSection={activeSection} setActiveSection={(id) => { setActiveSection(id); setMobileNavOpen(false); }} />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 pt-10 pb-20">
            <div className="sticky top-20">
              <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 pt-10 pb-20 min-w-0">
            <DocsContent />
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ─── Sidebar component ──────────────────────────────────────── */
function Sidebar({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (id: string) => void;
}) {
  function scrollTo(id: string) {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="space-y-6">
      {SECTIONS.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.group}>
            <button
              onClick={() => scrollTo(section.id)}
              className="flex items-center gap-2 mb-2 w-full text-left"
            >
              <Icon className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                {section.group}
              </span>
            </button>
            <ul className="space-y-0.5 pl-5">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      "w-full text-left text-sm py-1 px-2 rounded-lg transition-colors",
                      activeSection === item.id
                        ? "text-accent font-medium bg-accent/8"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
