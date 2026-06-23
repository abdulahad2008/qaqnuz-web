"use client";

import { useState } from "react";
import {
  LayoutDashboard, Users, Camera, Settings, LogOut,
  Menu, X, ChevronRight, BarChart3, MessageSquare, Bell,
  Shield, Zap,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { QaqnuzMark } from "@/components/ui/qaqnuz-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Overview",      href: "/dashboard",          icon: LayoutDashboard },
  { label: "Leads",         href: "/dashboard/leads",     icon: Users },
  { label: "Brands",        href: "/dashboard/brands",    icon: Camera },
  { label: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
  { label: "Analytics",     href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings",      href: "/dashboard/settings",  icon: Settings },
];

interface ShellProps {
  children: React.ReactNode;
  user: { email: string; name?: string; isAdmin: boolean };
}

export function DashboardShell({ children, user }: ShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    // Strip locale prefix for comparison
    const stripped = pathname.replace(/^\/(uz|ru|en)/, "");
    if (href === "/dashboard") return stripped === "/dashboard" || stripped === "/dashboard/";
    return stripped.startsWith(href);
  }

  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.href = "/";
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <QaqnuzMark className="h-6 w-5 shrink-0" />
        <span className="font-sans font-semibold text-base tracking-tight text-foreground">
          Qaqnuz
        </span>
        <span className="ml-auto text-[10px] font-semibold text-accent bg-accent/10 rounded-full px-2 py-0.5">
          MC
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon }) => (
          <a
            key={href}
            href={href}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
              isActive(href)
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
            {isActive(href) && <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-60" />}
          </a>
        ))}
      </nav>

      {/* User + sign out */}
      <div className="border-t border-border px-3 py-4 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-accent">
              {(user.name ?? user.email).charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-foreground truncate">{user.name ?? user.email}</p>
            <p className="text-[10px] text-muted-foreground truncate">
              {user.isAdmin ? "Admin" : "Operator"}
            </p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-border bg-background">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-56 bg-background border-r border-border z-10 flex flex-col">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-4 lg:px-6 py-3 border-b border-border bg-background shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-accent" />
            <span>Mission Control</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
            <span className="text-xs text-muted-foreground">Pipeline live</span>
          </div>
          <div className="flex items-center gap-2 ml-3">
            <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
              <Bell className="h-4 w-4" />
            </button>
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
