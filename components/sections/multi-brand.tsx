"use client";

import { motion } from "framer-motion";
import { ArrowRight, Inbox, Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";

const brands = [
  { name: "Zara UZ",   category: "Fashion",     color: "#f59e0b", msgs: 247  },
  { name: "Avto Shop", category: "Automotive",  color: "#818cf8", msgs: 134  },
  { name: "BeautyBox", category: "Cosmetics",   color: "#f472b6", msgs: 891  },
  { name: "TechMart",  category: "Electronics", color: "#34d399", msgs: 312  },
  { name: "FoodHub",   category: "Food & Bev",  color: "#fb923c", msgs: 1204 },
  { name: "HomeZone",  category: "Furniture",   color: "#60a5fa", msgs: 88   },
];

const FEATURE_ICONS = [Layers, Inbox] as const;

export function MultiBrand() {
  const t = useTranslations("multiBrand");
  const rawFeatures = t.raw("features") as Array<{ title: string; description: string }>;
  const features = rawFeatures.map((f, i) => ({ ...f, icon: FEATURE_ICONS[i] }));

  return (
    <Section id="multi-brand">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Brand grid + unified inbox */}
          <FadeIn direction="left">
            <div className="relative">
              <div className="grid grid-cols-3 gap-3">
                {brands.map((brand, idx) => (
                  <motion.div
                    key={brand.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="surface-card p-3 flex flex-col items-center text-center gap-2 cursor-default"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                      style={{
                        background: brand.color + "20",
                        border: `1.5px solid ${brand.color}40`,
                      }}
                    >
                      <span style={{ color: brand.color }}>{brand.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground leading-tight">{brand.name}</p>
                      <p className="text-[10px] text-muted-foreground">{brand.category}</p>
                    </div>
                    <div
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                      style={{ color: brand.color, background: `${brand.color}15` }}
                    >
                      {brand.msgs} msgs
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Arrow divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center justify-center my-5 gap-3"
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border" />
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
                  <ArrowRight className="h-4 w-4 text-accent" />
                  <span className="text-xs font-semibold text-foreground">
                    {t("unifiedInbox")}
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border" />
              </motion.div>

              {/* Unified inbox preview */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="surface-card p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Inbox className="h-4 w-4 text-accent" />
                  <span className="text-xs font-semibold text-foreground">
                    {t("allBrandsLabel")}
                  </span>
                  <Badge variant="ember" className="ml-auto text-[10px]">
                    {t("liveLabel")}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {brands.slice(0, 3).map((brand) => (
                    <div
                      key={brand.name}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary"
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold"
                        style={{ background: brand.color + "20", color: brand.color }}
                      >
                        {brand.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-foreground">
                            {brand.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {brand.msgs} msgs
                          </span>
                        </div>
                        <div className="w-24 h-1.5 rounded-full bg-border mt-1">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min(100, (brand.msgs / 1300) * 100)}%`,
                              background: brand.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </FadeIn>

          {/* Right: Copy */}
          <FadeIn direction="right" delay={0.1}>
            <div>
              <SectionHeader
                overline={t("overline")}
                title={
                  <>
                    {t("title")}{" "}
                    <em className="not-italic text-accent">{t("titleEmphasis")}</em>
                  </>
                }
                description={t("description")}
              />

              <div className="space-y-5">
                {features.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
