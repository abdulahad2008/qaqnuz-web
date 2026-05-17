import { SettingsForm } from "@/components/dashboard/settings-form";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = user?.user_metadata?.role === "admin" || user?.app_metadata?.role === "admin";

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure Instagram, Telegram, and workspace settings.
        </p>
      </div>
      <SettingsForm isAdmin={isAdmin} />
    </div>
  );
}
