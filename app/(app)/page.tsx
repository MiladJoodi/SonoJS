import { HomeHero } from "@/components/home/home-hero"
import { HomeBlocksSection } from "@/components/home/sections/blocks"
import { HomeChartsSection } from "@/components/home/sections/charts/section"
import { HomeIconsSection } from "@/components/home/sections/icons/section"
import { HomeMcpSection } from "@/components/home/sections/mcp/section"
import { HomeThreeDSection } from "@/components/home/sections/three-d/section"
import { HomeToolsSection } from "@/components/home/sections/tools/section"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/lib/config"
import { pageMetadata } from "@/lib/seo"
import {
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo-jsonld"

// Sync on `/` — deferred BTF CSS painted unstyled section shells (huge orbit CLS).
import "@/components/home/home-below-fold-style"

export const metadata = pageMetadata({
  title: "SonoJS – From components to complete interfaces. With AI.",
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <HomeHero />
      <HomeBlocksSection />
      <HomeChartsSection />
      <HomeThreeDSection />
      <HomeIconsSection />
      <HomeToolsSection />
      <HomeMcpSection />
    </>
  )
}
