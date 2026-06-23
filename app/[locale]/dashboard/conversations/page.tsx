import { createClient } from "@/lib/supabase/server";
import { MessageSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default async function ConversationsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("analytics_events")
    .select("*")
    .eq("event", "message.received")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Conversations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Incoming messages from Instagram. Replies pending review appear here.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending review", value: 0, icon: Clock, color: "text-amber-500" },
          { label: "Auto-replied today", value: 0, icon: CheckCircle2, color: "text-emerald-500" },
          { label: "Escalated", value: 0, icon: AlertCircle, color: "text-rose-500" },
        ].map((s) => (
          <div key={s.label} className="surface-card p-4 flex items-center gap-3">
            <s.icon className={`h-5 w-5 shrink-0 ${s.color}`} />
            <div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Queue */}
      <div className="surface-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Review queue</h2>
        </div>
        <div className="px-6 py-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-secondary border border-border flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Queue is empty</p>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
            Once you connect an Instagram account and go live, incoming messages will appear here for review.
          </p>
        </div>
      </div>

      {/* Recent pipeline events */}
      {events && events.length > 0 && (
        <div className="surface-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Recent pipeline events</h2>
          </div>
          <div className="divide-y divide-border">
            {events.map((ev) => (
              <div key={ev.id} className="px-6 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground font-medium">{ev.event}</p>
                  <p className="text-xs text-muted-foreground">
                    {JSON.stringify(ev.properties).slice(0, 80)}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(ev.created_at).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
