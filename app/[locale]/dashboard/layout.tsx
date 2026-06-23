import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "@/components/dashboard/shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const isAdmin =
    user.user_metadata?.role === "admin" ||
    user.app_metadata?.role === "admin";

  return (
    <DashboardShell user={{ email: user.email!, name: user.user_metadata?.name, isAdmin }}>
      {children}
    </DashboardShell>
  );
}
