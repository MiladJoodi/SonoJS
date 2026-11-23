import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Cyber Monday",
  description:
    "Cyber Monday cipher popup - five looks (cyber, terminal, glitch-card, matrix, chip); decrypt, reveal, claim.",
  path: "/popups/cyber-monday",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "cyber-monday", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

const stage =
  "relative min-h-[640px] w-full overflow-hidden bg-canvas sm:min-h-[720px]"

export default function PopupsCyberMondayDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Cyber Monday"
        pathname="/popups/cyber-monday"
        description="A themed terminal with a locked cipher. Tap Decrypt - glyphs scramble into a promo code, the offer lights up, and Copy / Claim take over. Five chrome looks; same decrypt motion."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Cyber</h2>
            <p className="text-sm text-muted-foreground">
              Ice cyan in light, deep navy neon in dark - decrypt once for Extra
              20% off.
            </p>
          </div>
          <PopupExample
            name="cyber-monday-01"
            usage={[
              { title: "app/page.tsx", code: usage("cyber-monday-01") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Terminal</h2>
            <p className="text-sm text-muted-foreground">
              Phosphor green shell - same decrypt, warmer system-console energy.
            </p>
          </div>
          <PopupExample
            name="cyber-monday-02"
            usage={[
              { title: "app/page.tsx", code: usage("cyber-monday-02") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Glitch card</h2>
            <p className="text-sm text-muted-foreground">
              Magenta glitch chrome - signal noise that settles into one clean
              code.
            </p>
          </div>
          <PopupExample
            name="cyber-monday-03"
            usage={[
              { title: "app/page.tsx", code: usage("cyber-monday-03") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Matrix</h2>
            <p className="text-sm text-muted-foreground">
              Deep green rain stage - pull the code from the cascade.
            </p>
          </div>
          <PopupExample
            name="cyber-monday-04"
            usage={[
              { title: "app/page.tsx", code: usage("cyber-monday-04") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Chip</h2>
            <p className="text-sm text-muted-foreground">
              Warm amber silicon chrome - etched promo on a hot die.
            </p>
          </div>
          <PopupExample
            name="cyber-monday-05"
            usage={[
              { title: "app/page.tsx", code: usage("cyber-monday-05") },
            ]}
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
              type: '"cyber" | "terminal" | "glitch-card" | "matrix" | "chip"',
              defaultValue: '"cyber"',
              description:
                "cyber cyan · terminal phosphor · glitch-card magenta · matrix green · chip amber.",
            },
            {
              name: "code",
              type: "string",
              defaultValue: '"CYBER20"',
              description: "Promo code revealed by the decrypt animation.",
            },
            {
              name: "offer",
              type: "string",
              defaultValue: '"Extra 20% off"',
              description: "Large offer shown after the cipher unlocks.",
            },
            {
              name: "hint",
              type: "string",
              defaultValue: '"Tap decrypt to crack the week’s last code"',
              description: "Copy shown while the terminal is still locked.",
            },
            {
              name: "decryptLabel",
              type: "string",
              defaultValue: '"Decrypt"',
              description: "Primary button label before the code is cracked.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Claim Cyber Monday"',
              description: "Primary button label after decrypt completes.",
            },
            {
              name: "delayMs",
              type: "number",
              defaultValue: "380",
              description: "Auto-open delay in milliseconds.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"absolute"',
              description:
                "Use fixed on live sites; absolute inside a relative demo stage.",
            },
            {
              name: "onDecrypt",
              type: "() => void",
              description: "Fires when the visitor starts the decrypt.",
            },
          ]}
        />
      </section>
    </article>
  )
}
