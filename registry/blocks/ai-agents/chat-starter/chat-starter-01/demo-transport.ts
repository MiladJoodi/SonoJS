import type { ChatTransport, UIMessage, UIMessageChunk } from "ai"

import { pickDemoAnswer } from "./demo-answers"

const THINK_MS = 700
const WORD_MS = 28

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms)
    signal?.addEventListener("abort", () => {
      clearTimeout(timer)
      reject(new DOMException("Aborted", "AbortError"))
    })
  })

function lastUserText(messages: UIMessage[]): string {
  const last = [...messages].reverse().find((message) => message.role === "user")
  return (
    last?.parts
      .filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("\n") ?? ""
  )
}

/** Scripted stream that matches the live `/api/chat` UI-message shape. */
export class DemoTransport implements ChatTransport<UIMessage> {
  async sendMessages({
    messages,
    abortSignal,
  }: {
    messages: UIMessage[]
    abortSignal: AbortSignal | undefined
  }): Promise<ReadableStream<UIMessageChunk>> {
    const reply = pickDemoAnswer(lastUserText(messages))
    const id = `demo-${Date.now()}`
    return new ReadableStream<UIMessageChunk>({
      async start(controller) {
        try {
          controller.enqueue({ type: "start" })
          controller.enqueue({ type: "start-step" })
          await wait(THINK_MS, abortSignal)
          controller.enqueue({ type: "text-start", id })
          const words = reply.split(/(?<=\s)/)
          for (const word of words) {
            await wait(WORD_MS, abortSignal)
            controller.enqueue({ type: "text-delta", id, delta: word })
          }
          controller.enqueue({ type: "text-end", id })
          controller.enqueue({ type: "finish-step" })
          controller.enqueue({ type: "finish" })
        } catch {
          controller.enqueue({ type: "abort" })
        } finally {
          controller.close()
        }
      },
    })
  }

  async reconnectToStream(): Promise<ReadableStream<UIMessageChunk> | null> {
    return null
  }
}

/** Routes `body.demo` sends to the script; everything else to the live transport. */
export class SwitchingTransport implements ChatTransport<UIMessage> {
  constructor(
    private readonly live: ChatTransport<UIMessage>,
    private readonly canned: ChatTransport<UIMessage>
  ) {}

  sendMessages: ChatTransport<UIMessage>["sendMessages"] = (options) => {
    const demo = Boolean(
      (options.body as { demo?: boolean } | undefined)?.demo
    )
    return (demo ? this.canned : this.live).sendMessages(options)
  }

  reconnectToStream: ChatTransport<UIMessage>["reconnectToStream"] = (
    options
  ) => this.live.reconnectToStream(options)
}
