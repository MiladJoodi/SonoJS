import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Feedback",
  description:
    "Feedback popup - stars, emoji faces, NPS 0–10, short form, or thumbs up/down.",
  path: "/popups/feedback",
})

const usage = (name: string) =>
  popupUsageSnippet(
    name,
    "feedback",
    `        position="fixed"
        onRate={(score) => {
          // persist rating
          console.log(score)
        }}`
  )

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsFeedbackDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Feedback"
        pathname="/popups/feedback"
        description="Five ways to ask - star row, emoji faces, NPS 0–10, a short text note, or thumbs up / down. Each flips to a thank-you + review CTA."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Stars</h2>
            <p className="text-sm text-muted-foreground">
              Classic 1–5 star row. Hover highlights, one tap rates, then thank-you.
            </p>
          </div>
          <PopupExample
            name="feedback-01"
            usage={[{ title: "app/page.tsx", code: usage("feedback-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Emoji faces</h2>
            <p className="text-sm text-muted-foreground">
              Five faces from terrible to amazing - tap one to score 1–5.
            </p>
          </div>
          <PopupExample
            name="feedback-02"
            usage={[{ title: "app/page.tsx", code: usage("feedback-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">NPS</h2>
            <p className="text-sm text-muted-foreground">
              0–10 recommend score with Not likely / Very likely labels.
            </p>
          </div>
          <PopupExample
            name="feedback-03"
            usage={[{ title: "app/page.tsx", code: usage("feedback-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Short form</h2>
            <p className="text-sm text-muted-foreground">
              Textarea + Send for a one-sentence note, then thank-you.
            </p>
          </div>
          <PopupExample
            name="feedback-04"
            usage={[{ title: "app/page.tsx", code: usage("feedback-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Thumbs</h2>
            <p className="text-sm text-muted-foreground">
              Big Yes / No thumbs - fastest binary feedback.
            </p>
          </div>
          <PopupExample
            name="feedback-05"
            usage={[{ title: "app/page.tsx", code: usage("feedback-05") }]}
            {...shell}
          />
        </section>
      </div>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "look",
              type: '"stars" | "emoji" | "nps" | "form" | "thumbs"',
              defaultValue: '"stars"',
              description:
                "stars = 1–5; emoji = faces; nps = 0–10; form = textarea; thumbs = up/down.",
            },
            {
              name: "onRate",
              type: "(score: number) => void",
              description: "Fires with the selected score (1–5 or mapped NPS).",
            },
            {
              name: "onSubmitText",
              type: "(text: string) => void",
              description: "Form look only - trimmed note before thank-you.",
            },
            {
              name: "reviewHref",
              type: "string",
              defaultValue: '"#"',
              description: "Thank-you review CTA destination.",
            },
            {
              name: "delayMs",
              type: "number",
              defaultValue: "360",
              description: "Auto-open delay when `defaultOpen` is true.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"fixed"',
              description: "`absolute` for framed demos; `fixed` for live sites.",
            },
          ]}
        />
      </section>
    </article>
  )
}
