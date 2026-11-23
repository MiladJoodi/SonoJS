import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Decrypt",
  description:
    "Decrypt popup - five looks (cipher, lock dial, cipher tape, keycard, vault slot); access code decrypts column by column.",
  path: "/popups/decrypt",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "decrypt", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

const stage =
  "relative min-h-[420px] w-full overflow-hidden bg-canvas sm:min-h-[560px] md:min-h-[640px]"

export default function PopupsDecryptDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Decrypt"
        pathname="/popups/decrypt"
        description="Dark glass card with accent glow - headline glitch, sweeping scan, access code decrypts column by column. Five chrome looks; same decrypt motion."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Cipher</h2>
            <p className="text-sm text-muted-foreground">
              Lime glass default - glyphs scramble column by column until NIGHT40
              locks in.
            </p>
          </div>
          <PopupExample
            name="decrypt-01"
            usage={[{ title: "app/page.tsx", code: usage("decrypt-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Lock dial</h2>
            <p className="text-sm text-muted-foreground">
              Brass amber chrome - same column decrypt with a warm lock-dial
              stage.
            </p>
          </div>
          <PopupExample
            name="decrypt-02"
            usage={[{ title: "app/page.tsx", code: usage("decrypt-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Cipher tape</h2>
            <p className="text-sm text-muted-foreground">
              Magenta signal chrome - tape-style glow with the same decrypt
              motion.
            </p>
          </div>
          <PopupExample
            name="decrypt-03"
            usage={[{ title: "app/page.tsx", code: usage("decrypt-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Keycard</h2>
            <p className="text-sm text-muted-foreground">
              Cyan keycard chrome - swipe-access energy, same scan and glitch.
            </p>
          </div>
          <PopupExample
            name="decrypt-04"
            usage={[{ title: "app/page.tsx", code: usage("decrypt-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Vault slot</h2>
            <p className="text-sm text-muted-foreground">
              Steel slate chrome - cold vault feel with the same decrypt
              animation.
            </p>
          </div>
          <PopupExample
            name="decrypt-05"
            usage={[{ title: "app/page.tsx", code: usage("decrypt-05") }]}
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
              type: '"cipher" | "lock-dial" | "cipher-tape" | "keycard" | "vault-slot"',
              defaultValue: '"cipher"',
              description:
                "cipher lime · lock-dial brass · cipher-tape magenta · keycard cyan · vault-slot steel.",
            },
            {
              name: "code",
              type: "string",
              defaultValue: '"NIGHT40"',
              description: "Final access code revealed after decrypt.",
            },
            {
              name: "percent",
              type: "string",
              defaultValue: '"40%"',
              description: "Large discount figure on the top-end.",
            },
            {
              name: "eyebrow",
              type: "string",
              description: "Small mono label above the title (look-aware default).",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Shop Cyber Monday"',
              description: "Primary CTA label.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"absolute"',
              description:
                "Use fixed on live sites; absolute inside a relative demo stage.",
            },
            {
              name: "onCta",
              type: "() => void",
              description: "Fires when the shop CTA is clicked.",
            },
          ]}
        />
      </section>
    </article>
  )
}
