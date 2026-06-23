import { createClient } from "@/lib/supabase/server";
import { LeadsTable } from "@/components/dashboard/leads-table";

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin =
    user?.user_metadata?.role === "admin" || user?.app_metadata?.role === "admin";

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Leads</h1>
        <p className="text-sm text-muted-foreground mt-1">
          People who submitted the Book Demo form. Grant access to let them sign in.
        </p>
      </div>

      <LeadsTable leads={leads ?? []} isAdmin={isAdmin} />
    </div>
  );
}
