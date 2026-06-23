import { Camera, Plus, ExternalLink, Settings2, Zap } from "lucide-react";
import { Link } from "@/lib/navigation";

export default function BrandsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Brands</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Instagram accounts connected to your Qaqnuz workspace.
          </p>
        </div>
        <Link
          href="/dashboard/settings"
          className="inline-flex items-center gap-2 text-sm font-semibold bg-accent text-accent-foreground rounded-xl px-4 py-2.5 hover:bg-accent/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Connect account
        </Link>
      </div>

      {/* Empty state */}
      <div className="surface-card p-12 flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
          <Camera className="h-7 w-7 text-accent" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground mb-1">No brands connected yet</h2>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Connect your Instagram Business account to start automating DMs, comments, and story replies.
          </p>
        </div>
        <Link
          href="/dashboard/settings"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
        >
          Go to Settings to connect Instagram
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* How it works */}
      <div className="surface-card p-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">How brand connection works</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { step: "01", icon: Camera, title: "Connect Instagram", desc: "Link your Instagram Business or Creator account via Meta's official API. Requires Read + Message permissions." },
            { step: "02", icon: Settings2, title: "Configure brand", desc: "Upload your brand voice, product catalog, FAQs, pricing, and payment methods (Click, Payme, Uzum, Humo)." },
            { step: "03", icon: Zap, title: "Go live", desc: "Set your Trust Level (L1–L3) and flip the switch. The AI pipeline starts processing messages within seconds." },
          ].map(({ step, icon: Icon, title, desc }) => (
            <div key={step} className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shrink-0">
                {step}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
