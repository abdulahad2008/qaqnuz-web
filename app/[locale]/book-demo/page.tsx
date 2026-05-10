"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Flame, MessageSquare, Users, BarChart3 } from "lucide-react";
import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Footer } from "@/components/sections/footer";

const volumeOptions = [
  "Under 500 DMs/month",
  "500–2,000 DMs/month",
  "2,000–10,000 DMs/month",
  "10,000+ DMs/month",
  "Not sure yet",
];

const channels = ["DMs", "Comments", "Story mentions"];

export default function BookDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    igHandle: "",
    volume: "",
    email: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    /* TODO: Wire to your CRM / Cal.com / Calendly API.
       Recommended: Cal.com embed or Savvycal for Uzbekistan timezone support.
       API endpoint: POST /api/book-demo */
    setSubmitted(true);
  }

  return (
    <>
      <Section className="pt-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: value prop */}
            <FadeIn direction="left">
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="relative">
                    <Flame className="h-6 w-6 text-[var(--color-ember-400)]" />
                    <div className="absolute inset-0 blur-sm bg-[var(--color-ember-500)] opacity-40" />
                  </div>
                  <span className="text-lg font-bold text-[var(--color-neutral-50)]">
                    Qaqnuz
                  </span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-neutral-50)] leading-tight mb-6">
                  Book a{" "}
                  <span className="gradient-ember">30-minute demo.</span>
                </h1>
                <p className="text-lg text-[var(--color-neutral-400)] leading-relaxed mb-10">
                  We&apos;ll walk through the full AI pipeline with your Instagram account,
                  your messages, and your brand voice — live. No slides, no hand-waving.
                </p>

                <div className="space-y-5">
                  {[
                    {
                      icon: MessageSquare,
                      title: "Live pipeline demo",
                      desc: "Send a real DM and watch it flow through classify → guard → publish in real time.",
                    },
                    {
                      icon: Users,
                      title: "Brand configuration walkthrough",
                      desc: "We configure your brand voice, guardrails, and trust level during the call.",
                    },
                    {
                      icon: BarChart3,
                      title: "Custom pricing for your volume",
                      desc: "You get a quoted price before the call ends — no follow-up needed.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex gap-4">
                        <div className="w-9 h-9 rounded-lg bg-[rgba(240,125,0,0.1)] flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-[var(--color-ember-400)]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[var(--color-neutral-100)] mb-0.5">
                            {item.title}
                          </p>
                          <p className="text-sm text-[var(--color-neutral-500)] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Calendar embed placeholder */}
                <div className="mt-10 surface-card p-6">
                  <p className="text-sm font-semibold text-[var(--color-neutral-300)] mb-2">
                    Calendar
                  </p>
                  <div className="aspect-[4/3] bg-[var(--color-bg-elevated)] rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.06)]">
                    <div className="text-center">
                      <p className="text-sm text-[var(--color-neutral-500)] mb-1">
                        Calendar embed placeholder
                      </p>
                      <p className="text-xs font-mono text-[var(--color-neutral-700)]">
                        TODO: Embed Cal.com or Calendly widget here.
                        <br />
                        Recommended: Cal.com for custom branding + Uzbekistan TZ.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right: form */}
            <FadeIn direction="right" delay={0.1}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="surface-card p-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[rgba(34,197,94,0.15)] flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-[#4ade80]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-neutral-50)] mb-3">
                    Demo request received!
                  </h2>
                  <p className="text-[var(--color-neutral-400)] mb-8">
                    We&apos;ll confirm your slot within 24 hours. If you need an urgent
                    demo, message us on Telegram.
                  </p>
                  <Button variant="secondary" size="md" asChild>
                    <Link href="/">Back to home</Link>
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="surface-card p-8 space-y-5">
                  <h2 className="text-xl font-bold text-[var(--color-neutral-50)] mb-6">
                    Tell us about your brand
                  </h2>

                  {[
                    { name: "name", label: "Your name", placeholder: "Azizbek Karimov", type: "text" },
                    { name: "brand", label: "Brand name", placeholder: "e.g. BeautyBox UZ", type: "text" },
                    { name: "igHandle", label: "Instagram handle", placeholder: "@yourbrand", type: "text" },
                    { name: "email", label: "Work email", placeholder: "you@brand.uz", type: "email" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-semibold text-[var(--color-neutral-400)] uppercase tracking-wider mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.name as keyof typeof form]}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, [field.name]: e.target.value }))
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-elevated)] border border-[rgba(255,255,255,0.08)] text-[var(--color-neutral-100)] text-sm placeholder:text-[var(--color-neutral-600)] focus:outline-none focus:border-[var(--color-ember-400)] transition-colors"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-neutral-400)] uppercase tracking-wider mb-2">
                      Monthly DM volume
                    </label>
                    <select
                      value={form.volume}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, volume: e.target.value }))
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-elevated)] border border-[rgba(255,255,255,0.08)] text-sm focus:outline-none focus:border-[var(--color-ember-400)] transition-colors"
                      style={{ color: form.volume ? "var(--color-neutral-100)" : "var(--color-neutral-600)" }}
                    >
                      <option value="" disabled>Select volume...</option>
                      {volumeOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[var(--color-bg-elevated)] text-[var(--color-neutral-100)]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-2">
                    Request a demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <p className="text-xs text-[var(--color-neutral-600)] text-center">
                    No commitment. We&apos;ll confirm within 24 hours.
                  </p>
                </form>
              )}
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
