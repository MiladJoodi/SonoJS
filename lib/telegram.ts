/**
 * Send a plain-text message via Telegram Bot API.
 * Requires TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID (server-only).
 */
export async function sendTelegramMessage(
  text: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim()
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim()

  if (!token || !chatId) {
    return { ok: false, error: "Telegram is not configured." }
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`
  let res: Response
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    })
  } catch (err) {
    console.error("[telegram] network", err)
    return { ok: false, error: "Could not reach Telegram." }
  }

  const body = (await res.json().catch(() => null)) as {
    ok?: boolean
    description?: string
  } | null

  if (!res.ok || !body?.ok) {
    console.error("[telegram]", body?.description || res.status)
    return {
      ok: false,
      error: body?.description || "Telegram rejected the message.",
    }
  }

  return { ok: true }
}

export function isTelegramConfigured(): boolean {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN?.trim() &&
      process.env.TELEGRAM_CHAT_ID?.trim()
  )
}
