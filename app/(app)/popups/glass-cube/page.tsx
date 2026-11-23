import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Glass Cube",
  description:
    "Glass Cube popup - five looks (cube, shard, ice-block, crystal, display-case). Tap to charge, burst, and keep a store-credit reward.",
  path: "/popups/glass-cube",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "glass-cube", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsGlassCubeDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Glass Cube"
        pathname="/popups/glass-cube"
        description="Tap the glass cube to charge it, burst the rays, then keep the store-credit reward. Five looks - lime cube, rose shard, cyan ice-block, violet crystal, and gold display-case."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Cube</h2>
            <p className="text-sm text-muted-foreground">
              Classic lime glass - charges, bursts, then GOODFIND25 rises on the reward card.
            </p>
          </div>
          <PopupExample
            name="glass-cube-01"
            usage={[
              { title: "app/page.tsx", code: usage("glass-cube-01") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Shard</h2>
            <p className="text-sm text-muted-foreground">
              Rose glass fragments - break open for SHARD20 store credit.
            </p>
          </div>
          <PopupExample
            name="glass-cube-02"
            usage={[
              { title: "app/page.tsx", code: usage("glass-cube-02") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Ice block</h2>
            <p className="text-sm text-muted-foreground">
              Cyan frozen cube - crack the ice for ICE30 store credit.
            </p>
          </div>
          <PopupExample
            name="glass-cube-03"
            usage={[
              { title: "app/page.tsx", code: usage("glass-cube-03") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Crystal</h2>
            <p className="text-sm text-muted-foreground">
              Violet facets - cut the crystal for CRYSTAL28 store credit.
            </p>
          </div>
          <PopupExample
            name="glass-cube-04"
            usage={[
              { title: "app/page.tsx", code: usage("glass-cube-04") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Display case</h2>
            <p className="text-sm text-muted-foreground">
              Gold museum glass - lift the case for CASE35 store credit.
            </p>
          </div>
          <PopupExample
            name="glass-cube-05"
            usage={[
              { title: "app/page.tsx", code: usage("glass-cube-05") },
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
              type: '"cube" | "shard" | "ice-block" | "crystal" | "display-case"',
              defaultValue: '"cube"',
              description:
                "cube lime · shard rose · ice-block cyan · crystal violet · display-case gold.",
            },
            {
              name: "code",
              type: "string",
              defaultValue: '"GOODFIND25"',
              description: "Store-credit code shown on the reward card.",
            },
            {
              name: "rewardAmount",
              type: "string",
              defaultValue: '"$25"',
              description: "Large amount on the reward card.",
            },
            {
              name: "keepLabel",
              type: "string",
              defaultValue: '"Keep my reward"',
              description: "Primary CTA on the reward card.",
            },
            {
              name: "hintLabel",
              type: "string",
              defaultValue: '"Tap the cube to open it"',
              description: "Pill hint shown while the cube is closed.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"fixed"',
              description:
                "Use fixed on live sites; absolute inside a relative demo stage.",
            },
            {
              name: "onOpenCube",
              type: "() => void",
              description: "Fires when the visitor taps the cube.",
            },
            {
              name: "onCta",
              type: "() => void",
              description: "Fires when the visitor clicks Keep my reward.",
            },
          ]}
        />
      </section>
    </article>
  )
}
