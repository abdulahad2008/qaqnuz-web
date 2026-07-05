"use client";

import { useState } from "react";
import { UserPlus, Mail, Phone, CheckCircle2, Clock, Search, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  created_at: string;
  name: string;
  phone?: string;
  email?: string;
  company: string;
  role: string;
  message: string;
  source: string;
  status?: string;
  invited_at?: string;
}

export function LeadsTable({ leads, isAdmin }: { leads: Lead[]; isAdmin: boolean }) {
  const [search, setSearch] = useState("");
  const [inviting, setInviting] = useState<string | null>(null);
  const [invited, setInvited] = useState<Set<string>>(
    new Set(leads.filter((l) => l.status === "invited").map((l) => l.id))
  );
  const [error, setError] = useState<string | null>(null);

  const filtered = leads.filter(
    (l) =>
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.email?.toLowerCase().includes(search.toLowerCase()) ||
      l.company?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleInvite(lead: Lead) {
    setInviting(lead.id);
    setError(null);
    try {
      const res = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: lead.email, leadId: lead.id, name: lead.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setInvited((prev) => new Set([...prev, lead.id]));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send invite");
    } finally {
      setInviting(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* Search + stats */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, brand…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/60 transition-colors"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{leads.length}</span> total ·{" "}
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{invited.size}</span> invited
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {!isAdmin && (
        <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
          You need admin privileges to invite users. Contact your workspace admin.
        </div>
      )}

      {/* Table */}
      <div className="surface-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {leads.length === 0
                ? "No leads yet. Book Demo form submissions will appear here."
                : "No leads match your search."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Person
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Brand
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    IG Handle
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Volume
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  {isAdmin && (
                    <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((lead) => {
                  const isInvited = invited.has(lead.id);
                  const isLoading = inviting === lead.id;
                  return (
                    <tr
                      key={lead.id}
                      className={cn(
                        "hover:bg-secondary/30 transition-colors",
                        isInvited && "opacity-75"
                      )}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-accent">
                              {(lead.name ?? lead.phone ?? lead.email ?? "?").charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{lead.name}</p>
                            {lead.phone ? (
                              <a
                                href={`tel:${lead.phone}`}
                                className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
                              >
                                <Phone className="h-3 w-3" />
                                {lead.phone}
                              </a>
                            ) : lead.email ? (
                              <a
                                href={`mailto:${lead.email}`}
                                className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
                              >
                                <Mail className="h-3 w-3" />
                                {lead.email}
                              </a>
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">
                        {lead.company}
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        {lead.role ? (
                          <a
                            href={`https://instagram.com/${lead.role.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-accent hover:text-accent/80 transition-colors text-xs"
                          >
                            {lead.role}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground text-xs hidden lg:table-cell">
                        {lead.message}
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4">
                        {isInvited ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Invited
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-1">
                            <Clock className="h-3 w-3" />
                            Pending
                          </span>
                        )}
                      </td>
                      {isAdmin && (
                        <td className="px-5 py-4 text-right">
                          {!isInvited && (
                            <button
                              onClick={() => handleInvite(lead)}
                              disabled={isLoading}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-accent text-accent-foreground rounded-lg px-3 py-1.5 hover:bg-accent/90 transition-colors disabled:opacity-60"
                            >
                              {isLoading ? (
                                <span className="w-3.5 h-3.5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                              ) : (
                                <UserPlus className="h-3.5 w-3.5" />
                              )}
                              {isLoading ? "Sending…" : "Grant Access"}
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info box */}
      <div className="text-xs text-muted-foreground bg-secondary border border-border rounded-xl px-4 py-3 leading-relaxed">
        <strong className="text-foreground">How Grant Access works:</strong> Clicking the button sends a Supabase invite email to the lead. They click the link, set a password, and can sign in immediately. You can revoke access at any time from the Supabase dashboard → Authentication → Users.
      </div>
    </div>
  );
}
