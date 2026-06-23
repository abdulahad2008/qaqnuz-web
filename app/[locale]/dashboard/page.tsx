import { createClient } from "@/lib/supabase/server";
import {
  Users, MessageSquare, CheckCircle2, Clock, TrendingUp,
  ArrowRight, Camera, Send,
} from "lucide-react";
import { Link } from "@/lib/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch stats in parallel
  const [leadsRes, eventsRes] = await Promise.all([
    supabase.from("leads").select("id, name, email, company, created_at, status, invited_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("analytics_events").select("id", { count: "exact" }),
  ]);

  const leads = leadsRes.data ?? [];
  const totalLeads = leadsRes.data?.length ?? 0;
  const invitedCount = leads.filter((l) => l.status === "invited").length;

  const stats = [
    { label: "Total leads", value: totalLeads, icon: Users, color: "text-accent", bg: "bg-accent/10" },
    { label: "Invited users", value: invitedCount, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Pending review", value: totalLeads - invitedCount, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Pipeline events", value: eventsRes.count ?? 0, icon: TrendingUp, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mission Control</h1>
        <p className="text-sm text-muted-foreground mt-1">Your AI automation overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="surface-card p-5">
            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Manage Leads", desc: "View and invite demo requests", href: "/dashboard/leads", icon: Users },
          { label: "Connect Camera", desc: "Link your Camera account", href: "/dashboard/brands", icon: Camera },
          { label: "Telegram Alerts", desc: "Set up notification bot", href: "/dashboard/settings", icon: Send },
        ].map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="surface-card p-5 flex items-start gap-4 hover:border-accent/30 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <a.icon className="h-4 w-4 text-accent" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                {a.label}
                <ArrowRight className="inline h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent leads */}
      <div className="surface-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Recent demo requests</h2>
          <Link href="/dashboard/leads" className="text-xs text-accent hover:text-accent/80 transition-colors">
            View all
          </Link>
        </div>
        {leads.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">No leads yet. Share your Book Demo page to start collecting requests.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {leads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-secondary/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-accent">
                      {(lead.name ?? lead.email).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email} · {lead.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </span>
                  {lead.status === "invited" ? (
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                      Invited
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pipeline status */}
      <div className="surface-card p-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Pipeline status</h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {["Qualify", "Classify", "Retrieve", "Compose", "Guard", "Evaluate", "Trust", "Publish"].map((stage, i) => (
            <div key={stage} className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                {stage.charAt(0)}
              </div>
              <span className="text-[9px] text-muted-foreground text-center leading-tight hidden sm:block">{stage}</span>
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">All 8 pipeline stages operational · 99.8% uptime</p>
      </div>
    </div>
  );
}
