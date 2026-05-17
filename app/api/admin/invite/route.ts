import { createAdminClient, createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Verify the caller is an authenticated admin
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check admin role in user metadata
  const isAdmin =
    user.user_metadata?.role === "admin" ||
    user.app_metadata?.role === "admin";

  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden — admin only" }, { status: 403 });
  }

  const { email, leadId, name } = await request.json();
  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Invite the user — Supabase sends them an email with a magic link
  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { name, role: "operator" },
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback?next=/dashboard`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Mark the lead as invited in the leads table
  if (leadId) {
    await supabase
      .from("leads")
      .update({ invited_at: new Date().toISOString(), status: "invited" })
      .eq("id", leadId);
  }

  return NextResponse.json({ success: true, userId: data.user?.id });
}
