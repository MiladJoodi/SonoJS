import {
  HomeBlocksSection,
  HomeChartsSection,
  HomeHero,
  HomeIconsSection,
  HomeMcpSection,
  HomeToolsSection,
} from "@/components/home"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/lib/config"
import { pageMetadata } from "@/lib/seo"
import {
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo-jsonld"

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
      <HomeIconsSection />
      <HomeToolsSection />
      <HomeMcpSection />
    </>
  )
}
