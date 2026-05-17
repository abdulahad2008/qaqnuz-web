"use client";

import { useState } from "react";
import { Camera, Send, CheckCircle2, Copy, ExternalLink, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="surface-card p-6 space-y-5">
      <div className="border-b border-border pb-4">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      {children}
      {desc && <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>}
    </div>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/60 transition-colors font-mono"
    />
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={copy}
      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
    >
      {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

export function SettingsForm({ isAdmin }: { isAdmin: boolean }) {
  const [igToken, setIgToken] = useState("");
  const [igVerifyToken, setIgVerifyToken] = useState("qaqnuz_verify_" + Math.random().toString(36).slice(2, 10));
  const [tgBotToken, setTgBotToken] = useState("");
  const [tgChatId, setTgChatId] = useState("");
  const [saved, setSaved] = useState(false);

  const webhookUrl = typeof window !== "undefined"
    ? `${window.location.origin}/api/webhooks/instagram`
    : "https://qaqnuz.uz/api/webhooks/instagram";

  const tgWebhookUrl = typeof window !== "undefined"
    ? `${window.location.origin}/api/webhooks/telegram`
    : "https://qaqnuz.uz/api/webhooks/telegram";

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">

      {/* ── Camera ─────────────────────────────────────── */}
      <Section
        title="Instagram Integration"
        desc="Connect your Meta Developer App to receive and send Instagram DMs, comments, and story replies via webhook."
      >
        <div className="bg-secondary border border-border rounded-xl p-4 space-y-3">
          <p className="text-xs font-semibold text-foreground">Setup checklist</p>
          {[
            ["Create a Meta Developer App", "https://developers.facebook.com/apps", "Go to developers.facebook.com → Create App → Business type"],
            ["Add Instagram product", null, "App Dashboard → Add Product → Instagram → Set up"],
            ["Set webhook URL", null, "Webhooks → Instagram → Edit → Callback URL below + Verify Token"],
            ["Subscribe to fields", null, "messages, messaging_postbacks, comments, mention"],
            ["Get Page Access Token", "https://developers.facebook.com/tools/explorer", "Graph API Explorer → Generate token → Instagram permissions"],
          ].map(([step, link, detail], i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent/15 text-accent text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-foreground">{step}</p>
                  {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <Field label="Webhook callback URL" desc="Paste this into your Meta App → Webhooks → Callback URL.">
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-sm font-mono text-foreground overflow-x-auto">
              {webhookUrl}
            </div>
            <CopyButton value={webhookUrl} />
          </div>
        </Field>

        <Field label="Verify Token" desc="Paste this into Meta App → Webhooks → Verify Token field.">
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-sm font-mono text-foreground">
              {igVerifyToken}
            </div>
            <CopyButton value={igVerifyToken} />
          </div>
        </Field>

        <Field
          label="Page Access Token"
          desc="Long-lived Page access token from Meta Graph API Explorer. Keep this secret — it's stored server-side."
        >
          <Input
            type="password"
            placeholder="EAABw..."
            value={igToken}
            onChange={(e) => setIgToken(e.target.value)}
            disabled={!isAdmin}
          />
        </Field>

        <div className="flex items-start gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>
            After saving, add <code className="font-mono bg-amber-500/10 px-1 rounded">INSTAGRAM_ACCESS_TOKEN</code> and{" "}
            <code className="font-mono bg-amber-500/10 px-1 rounded">INSTAGRAM_VERIFY_TOKEN</code> to your Vercel environment variables, then redeploy.
          </span>
        </div>
      </Section>

      {/* ── Telegram ──────────────────────────────────────── */}
      <Section
        title="Telegram Notifications"
        desc="Get real-time alerts in Telegram when leads submit the demo form, guardrails trigger, or conversations need review."
      >
        <div className="bg-secondary border border-border rounded-xl p-4 space-y-3">
          <p className="text-xs font-semibold text-foreground">Setup steps</p>
          {[
            ["Create a bot", "https://t.me/BotFather", "Message @BotFather → /newbot → get your Bot Token"],
            ["Get your Chat ID", "https://t.me/userinfobot", "Message @userinfobot to get your personal chat ID, or add the bot to a group"],
            ["Set webhook (auto)", null, `Qaqnuz will register the webhook at ${tgWebhookUrl} automatically on save`],
          ].map(([step, link, detail], i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent/15 text-accent text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-foreground">{step}</p>
                  {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <Field label="Bot Token" desc="From @BotFather — looks like 123456789:AABBccDDeeffGGhhIIjj...">
          <Input
            type="password"
            placeholder="123456789:AABBcc..."
            value={tgBotToken}
            onChange={(e) => setTgBotToken(e.target.value)}
            disabled={!isAdmin}
          />
        </Field>

        <Field label="Chat ID" desc="Your personal chat ID or a group/channel ID where notifications should be sent.">
          <Input
            type="text"
            placeholder="-1001234567890"
            value={tgChatId}
            onChange={(e) => setTgChatId(e.target.value)}
            disabled={!isAdmin}
          />
        </Field>

        <div className="flex items-start gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>
            Add <code className="font-mono bg-amber-500/10 px-1 rounded">TELEGRAM_BOT_TOKEN</code> and{" "}
            <code className="font-mono bg-amber-500/10 px-1 rounded">TELEGRAM_CHAT_ID</code> to Vercel env vars after saving.
          </span>
        </div>
      </Section>

      {/* ── Admin account ─────────────────────────────────── */}
      {isAdmin && (
        <Section
          title="Make yourself admin"
          desc="Run this SQL in the Supabase SQL editor to grant admin role to your account. Replace the email with yours."
        >
          <div className="relative">
            <pre className="bg-secondary border border-border rounded-xl px-5 py-4 text-xs font-mono text-foreground overflow-x-auto leading-relaxed whitespace-pre-wrap">
{`-- Grant admin role to a user
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'
WHERE email = 'your@email.com';`}
            </pre>
            <div className="absolute top-3 right-3">
              <CopyButton value={`UPDATE auth.users\nSET raw_app_meta_data = raw_app_meta_data || '{\"role\": \"admin\"}'\nWHERE email = 'your@email.com';`} />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            After running the SQL, sign out and sign back in. The admin badge will appear in the sidebar and you'll be able to invite leads.
          </p>
        </Section>
      )}

      {isAdmin && (
        <div className="flex justify-end">
          <button
            type="submit"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold rounded-xl px-6 py-3 transition-all",
              saved
                ? "bg-emerald-500 text-white"
                : "bg-accent text-accent-foreground hover:bg-accent/90"
            )}
          >
            {saved ? (
              <><CheckCircle2 className="h-4 w-4" /> Saved!</>
            ) : (
              "Save settings"
            )}
          </button>
        </div>
      )}
    </form>
  );
}
