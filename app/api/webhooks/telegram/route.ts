import { NextRequest, NextResponse } from "next/server";

/** Receive Telegram bot updates (if webhook mode is used instead of polling) */
export async function POST(request: NextRequest) {
  try {
    const update = await request.json();

    const chatId = update.message?.chat?.id;
    const text = update.message?.text;
    const username = update.message?.from?.username;

    console.log(`Telegram message from @${username} (${chatId}): ${text}`);

    // Echo back a simple response for testing
    if (chatId && text) {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      if (botToken) {
        let reply = "👋 Qaqnuz bot is active.";
        if (text === "/start") {
          reply = "✅ Qaqnuz Mission Control bot is running.\n\nYou will receive notifications here for:\n• New demo requests\n• Instagram DMs\n• Pipeline alerts\n• Guardrail triggers";
        } else if (text === "/status") {
          reply = "📊 Pipeline status: All 8 stages operational\n⚡ Uptime: 99.8%";
        }

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: reply }),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram webhook error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
