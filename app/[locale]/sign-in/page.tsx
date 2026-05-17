"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, LayoutDashboard, Layers, BarChart3, Sparkles, Eye, EyeOff } from "lucide-react";
import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { QaqnuzMark } from "@/components/ui/qaqnuz-logo";
import { Link } from "@/lib/navigation";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "@/lib/navigation";

const FEATURE_ICONS = [LayoutDashboard, Layers, BarChart3];

export default function SignInPage() {
  const t = useTranslations("signIn");
  const features = t.raw("features") as { title: string; description: string }[];
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setError("Authentication is not configured yet.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (authError) {
      setLoading(false);
      if (authError.message.includes("Invalid login credentials")) {
        setError("Wrong email or password. If you haven't been invited yet, request access below.");
      } else {
        setError(authError.message);
      }
      return;
    }

    router.push("/dashboard");
  }

  return (
    <Section className="pt-32 pb-20 min-h-screen flex items-center">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: value prop */}
          <FadeIn direction="left">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <QaqnuzMark className="h-6 w-5" />
                <span className="font-sans font-semibold text-lg tracking-tight text-foreground">Qaqnuz</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                {t("title")}{" "}
                <span className="text-accent">{t("titleEmphasis")}</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {t("description")}
              </p>

              <div className="space-y-5 mb-10">
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

              <div className="surface-elevated px-5 py-4 flex gap-3 items-start">
                <Sparkles className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {t("earlyAccess.badge")}
                  </span>
                  <p className="text-sm text-muted-foreground mt-0.5">{t("earlyAccess.note")}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: sign-in form */}
          <FadeIn direction="right" delay={0.1}>
            <form onSubmit={handleSubmit} className="surface-card p-8 space-y-5">
              <h2 className="text-xl font-bold text-foreground mb-6">{t("form.title")}</h2>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {t("form.email")}
                </label>
                <input
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("form.password")}
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("form.passwordPlaceholder")}
                    value={form.password}
                    onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <>
                    {t("form.submit")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                {t("form.noAccount")}{" "}
                <Link href="/book-demo" className="text-accent hover:text-accent/80 transition-colors font-medium">
                  {t("form.requestAccess")}
                </Link>
              </p>
            </form>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
