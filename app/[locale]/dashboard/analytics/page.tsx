import { createClient } from "@/lib/supabase/server";
import { BarChart3, TrendingUp, Zap, Clock } from "lucide-react";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { count: totalEvents } = await supabase
    .from("analytics_events")
    .select("*", { count: "exact", head: true });

  const { count: totalLeads } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pipeline performance and automation metrics.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total conversations", value: "—", icon: BarChart3, note: "Connect Instagram to start" },
          { label: "Automation rate", value: "—", icon: Zap, note: "Target: ≥ 76%" },
          { label: "Avg response time", value: "—", icon: Clock, note: "Target: < 3 min" },
          { label: "Pipeline events", value: totalEvents ?? 0, icon: TrendingUp, note: "All time" },
        ].map((s) => (
          <div key={s.label} className="surface-card p-5">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
              <s.icon className="h-4 w-4 text-accent" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="surface-card p-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-secondary border border-border flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground mb-1">Analytics start when you go live</p>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Connect an Instagram account and process your first messages. Charts for automation rate, response time, CSAT, and cost per reply will appear here.
        </p>
      </div>

      <div className="surface-card p-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Leads over time</h2>
        <div className="flex items-end gap-3 h-24">
          <div className="text-2xl font-bold text-accent">{totalLeads ?? 0}</div>
          <div className="text-sm text-muted-foreground pb-1">demo requests total</div>
        </div>
      </div>
    </div>
  );
}
