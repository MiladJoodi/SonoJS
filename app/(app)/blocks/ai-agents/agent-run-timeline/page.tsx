import { AgentRunTimelinePreviewFrame } from "./preview"

export default function AgentRunTimelineDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Agent Run Timeline</h1>
        <p className="text-muted-foreground">
          The plan an agent keeps while it works, one line per step. Steps move
          through in progress, done, and plan changes mid-run.
        </p>
      </header>

      <AgentRunTimelinePreviewFrame />
    </article>
  )
}
