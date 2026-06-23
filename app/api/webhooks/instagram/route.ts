import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const VERIFY_TOKEN = process.env.INSTAGRAM_VERIFY_TOKEN;

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

/** Meta webhook verification handshake */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Instagram webhook verified");
    return new Response(challenge, { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

/** Receive Instagram DMs, comments, story mentions */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log every event to analytics_events
    const db = supabaseAdmin();
    await db.from("analytics_events").insert({
      event: "message.received",
      properties: body,
    });

    // Process each entry
    for (const entry of body.entry ?? []) {
      for (const messaging of entry.messaging ?? []) {
        const senderId = messaging.sender?.id;
        const text = messaging.message?.text;

        if (senderId && text) {
          console.log(`DM from ${senderId}: ${text}`);
          // TODO: pass to AI pipeline
          // For now: log to analytics_events with structured data
          await db.from("analytics_events").insert({
            event: "dm.received",
            properties: { sender_id: senderId, text, entry_id: entry.id },
          });

          // Send Telegram notification if configured
          await notifyTelegram(`📩 New DM\nFrom: ${senderId}\nMessage: ${text}`);
        }
      }

      // Comments
      for (const change of entry.changes ?? []) {
        if (change.field === "comments") {
          const comment = change.value;
          await db.from("analytics_events").insert({
            event: "comment.received",
            properties: comment,
          });
          await notifyTelegram(
            `💬 New comment on post\nFrom: @${comment.from?.username}\nText: ${comment.text}`
          );
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Instagram webhook error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

async function notifyTelegram(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
  }).catch(() => null);
}
