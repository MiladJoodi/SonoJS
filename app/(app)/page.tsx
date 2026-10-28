import { HomeHero } from "@/components/home"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/lib/config"
import { absoluteUrl, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "SonoJS. Tell your agent. Get the UI.",
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
})

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: absoluteUrl("/"),
  description: siteConfig.description,
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <HomeHero />
    </>
  )
}
