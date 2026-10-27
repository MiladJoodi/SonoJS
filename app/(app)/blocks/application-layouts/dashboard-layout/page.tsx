import type { ReactNode } from "react"

import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import DashboardLayout01 from "@/registry/blocks/application-layouts/dashboard-layout/dashboard-layout-01/dashboard-layout"
import DashboardLayout02 from "@/registry/blocks/application-layouts/dashboard-layout/dashboard-layout-02/dashboard-layout"
import DashboardLayout03 from "@/registry/blocks/application-layouts/dashboard-layout/dashboard-layout-03/dashboard-layout"

const usage = (name: string) => `import DashboardLayout from "@/components/blocks/application-layouts/${name}/dashboard-layout"

export default function Page() {
  return (
    <div className="h-svh w-full">
      <DashboardLayout />
    </div>
  )
}`

const previewProps = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0 overflow-hidden",
}

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative isolate w-full overflow-hidden"
      style={{ height: "min(36rem, 70dvh)" }}
    >
      <div className="absolute inset-0 overflow-hidden">{children}</div>
    </div>
  )
}

export default function BlockDashboardLayoutDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Dashboard Layout"
        pathname="/blocks/application-layouts/dashboard-layout"
        description="Three production shells—analytics overview, ops console, and team workspace—each with a distinct chrome pattern and ready-to-ship content stage."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="dashboard-layout-01"
          usage={[{ title: "app/page.tsx", code: usage("dashboard-layout-01") }]}
          {...previewProps}
        >
          <PreviewShell>
            <DashboardLayout01 />
          </PreviewShell>
        </BlockExample>

        <BlockExample
          name="dashboard-layout-02"
          usage={[{ title: "app/page.tsx", code: usage("dashboard-layout-02") }]}
          {...previewProps}
        >
          <PreviewShell>
            <DashboardLayout02 />
          </PreviewShell>
        </BlockExample>

        <BlockExample
          name="dashboard-layout-03"
          usage={[{ title: "app/page.tsx", code: usage("dashboard-layout-03") }]}
          {...previewProps}
        >
          <PreviewShell>
            <DashboardLayout03 />
          </PreviewShell>
        </BlockExample>
      </div>
    </article>
  )
}
