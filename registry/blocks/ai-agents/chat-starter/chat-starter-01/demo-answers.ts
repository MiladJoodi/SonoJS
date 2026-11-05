type DemoAnswer = { match: RegExp; reply: string }

const ANSWERS: DemoAnswer[] = [
  {
    match: /starter|what (is|does) this|about this app/i,
    reply:
      "This is the SonoJS chat starter: a Next.js screen with streaming chat and a history rail that lives in the browser. Right now I'm in demo mode, so this answer is canned. Add AI_API_KEY, restart, and the same chat talks to a real model.",
  },
  {
    match: /product update|announcement|release notes|changelog/i,
    reply:
      "Here's a product update in three sentences. This release ships a deployable chat shell with local history, a setup notice when no key is present, and scripted demo replies so the UI can be tried immediately. Install the block as source so you can edit every file. Wire AI_API_KEY for live answers. (Demo mode: canned answer.)",
  },
  {
    match: /names?\b.*\b(app|product|scheduling|startup|company)|name ideas|suggest.*names/i,
    reply:
      "Five names for a scheduling app: Slotwise, Tidemark, Cadence, Dayline, and Meridian. Slotwise says what it does; Cadence and Meridian carry a rhythm; Tidemark and Dayline feel like calendars without saying so. (Demo mode: canned answer.)",
  },
  {
    match: /key|api|openai|anthropic|provider|model/i,
    reply:
      "To connect a real model, add AI_API_KEY to your environment (for local work, put it in .env.local and restart). Until then I'm in demo mode, answering from a short script.",
  },
  {
    match: /hello|hi\b|hey|good (morning|afternoon|evening)/i,
    reply:
      "Hello. I'm the starter's demo assistant, answering from a short script until a model key is added. Try asking what this starter does, or how to connect a key.",
  },
]

const FALLBACK =
  "I'm in demo mode, so I can only answer from a short script, and that question isn't in it. Add AI_API_KEY and restart for a real model. Meanwhile, try: what does this starter do, or how do I connect a key."

export function pickDemoAnswer(prompt: string): string {
  return ANSWERS.find((answer) => answer.match.test(prompt))?.reply ?? FALLBACK
}
