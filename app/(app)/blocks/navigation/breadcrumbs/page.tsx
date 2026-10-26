import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import BasicBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-01/breadcrumbs"
import HomeIconBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-02/breadcrumbs"
import IconTrailBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-03/breadcrumbs"
import SlashIconBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-04/breadcrumbs"
import SlashHomeBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-05/breadcrumbs"
import PillIconBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-06/breadcrumbs"
import BoxedHomeBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-07/breadcrumbs"
import EllipsisBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-08/breadcrumbs"
import SegmentBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-09/breadcrumbs"

const usage = (name: string) => `import Breadcrumbs from "@/components/blocks/navigation/${name}/breadcrumbs"

export default function Page() {
  return <Breadcrumbs />
}`

const previewProps = {
  previewAlign: "center" as const,
  previewClassName: "bg-canvas px-10 py-10",
  previewSize: "compact" as const,
}

function ExampleRule() {
  return (
    <div
      role="separator"
      className="h-px w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 18%, transparent) 0 8px, transparent 8px 16px)",
      }}
    />
  )
}

export default function BlockBreadcrumbsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Breadcrumbs"
        pathname="/blocks/navigation/breadcrumbs"
        description="Trail links for nested pages. Built on the SonoJS Breadcrumb primitive."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="breadcrumbs-01"
          usage={[{ title: "app/page.tsx", code: usage("breadcrumbs-01") }]}
          {...previewProps}
        >
          <BasicBreadcrumbs />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="breadcrumbs-02"
          usage={[{ title: "app/page.tsx", code: usage("breadcrumbs-02") }]}
          {...previewProps}
        >
          <HomeIconBreadcrumbs />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="breadcrumbs-03"
          usage={[{ title: "app/page.tsx", code: usage("breadcrumbs-03") }]}
          {...previewProps}
        >
          <IconTrailBreadcrumbs />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="breadcrumbs-04"
          usage={[{ title: "app/page.tsx", code: usage("breadcrumbs-04") }]}
          {...previewProps}
        >
          <SlashIconBreadcrumbs />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="breadcrumbs-05"
          usage={[{ title: "app/page.tsx", code: usage("breadcrumbs-05") }]}
          {...previewProps}
        >
          <SlashHomeBreadcrumbs />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="breadcrumbs-06"
          usage={[{ title: "app/page.tsx", code: usage("breadcrumbs-06") }]}
          {...previewProps}
        >
          <PillIconBreadcrumbs />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="breadcrumbs-07"
          usage={[{ title: "app/page.tsx", code: usage("breadcrumbs-07") }]}
          {...previewProps}
        >
          <BoxedHomeBreadcrumbs />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="breadcrumbs-08"
          usage={[{ title: "app/page.tsx", code: usage("breadcrumbs-08") }]}
          {...previewProps}
        >
          <EllipsisBreadcrumbs />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="breadcrumbs-09"
          usage={[{ title: "app/page.tsx", code: usage("breadcrumbs-09") }]}
          {...previewProps}
        >
          <SegmentBreadcrumbs />
        </BlockExample>
      </div>
    </article>
  )
}
