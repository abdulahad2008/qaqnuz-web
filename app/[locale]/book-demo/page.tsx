"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, MessageSquare, Users, BarChart3, CalendarDays, ExternalLink } from "lucide-react";
import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Footer } from "@/components/sections/footer";
import { QaqnuzMark } from "@/components/ui/qaqnuz-logo";
import { Link } from "@/lib/navigation";
import { supabase } from "@/lib/supabase/client";

const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL;

function CalendarEmbed({ placeholder }: { placeholder: string }) {
  if (CAL_URL) {
    return (
      <div className="rounded-xl overflow-hidden border border-border" style={{ height: 600 }}>
        <iframe
          src={CAL_URL}
          width="100%"
          height="100%"
          frameBorder="0"
          title="Schedule a demo"
          style={{ border: "none" }}
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-secondary border border-border p-8 flex flex-col items-center justify-center text-center gap-4" style={{ minHeight: 200 }}>
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
        <CalendarDays className="h-6 w-6 text-accent" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground mb-1">{placeholder}</p>
        <p className="text-xs text-muted-foreground">
          Send us a message at{" "}
          <a href="mailto:demo@qaqnuz.uz" className="text-accent hover:underline">
            demo@qaqnuz.uz
          </a>
          {" "}and we'll schedule your demo call.
        </p>
      </div>
      <a
        href="https://t.me/qaqnuz"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 transition-colors font-medium"
      >
        Or message us on Telegram
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}

const FEATURE_ICONS = [MessageSquare, Users, BarChart3];

export default function BookDemoPage() {
  const t = useTranslations("bookDemo");
  const features = t.raw("features") as { title: string; description: string }[];
  const volumeOptions = t.raw("form.volumeOptions") as string[];

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    igHandle: "",
    volume: "",
    email: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (supabase) {
      await supabase.from("leads").insert({
        name: form.name,
        company: form.brand,
        role: form.igHandle,
        message: form.volume,
        email: form.email,
        source: "book-demo",
      });
    }
    setLoading(false);
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
                  <QaqnuzMark className="h-6 w-5" />
                  <span className="font-display italic text-lg text-foreground">QaqnUz</span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                  {t("title")}{" "}
                  <span className="text-accent">{t("titleEmphasis")}</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                  {t("description")}
                </p>

                <div className="space-y-5">
                  {features.map((item, i) => {
                    const Icon = FEATURE_ICONS[i];
                    return (
                      <div key={item.title} className="flex gap-4">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-0.5">{item.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Calendar embed */}
                <div className="mt-10 surface-card p-6">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">{t("calendarLabel")}</p>
                  <CalendarEmbed placeholder={t("calendarPlaceholder")} />
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
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">{t("success.title")}</h2>
                  <p className="text-muted-foreground mb-8">{t("success.description")}</p>
                  <Button variant="secondary" size="md" asChild>
                    <Link href="/">{t("success.backHome")}</Link>
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="surface-card p-8 space-y-5">
                  <h2 className="text-xl font-bold text-foreground mb-6">{t("form.title")}</h2>

                  {(
                    [
                      { name: "name",     label: t("form.name"),     placeholder: t("form.namePlaceholder"),     type: "text"  },
                      { name: "brand",    label: t("form.brand"),    placeholder: t("form.brandPlaceholder"),    type: "text"  },
                      { name: "igHandle", label: t("form.igHandle"), placeholder: t("form.igHandlePlaceholder"), type: "text"  },
                      { name: "email",    label: t("form.email"),    placeholder: t("form.emailPlaceholder"),    type: "email" },
                    ] as const
                  ).map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.name]}
                        onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/60 transition-colors"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {t("form.volume")}
                    </label>
                    <select
                      value={form.volume}
                      onChange={(e) => setForm((prev) => ({ ...prev, volume: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:border-accent/60 transition-colors"
                    >
                      <option value="" disabled>{t("form.volumeDefault")}</option>
                      {volumeOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
                    {t("form.submit")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">{t("form.disclaimer")}</p>
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
