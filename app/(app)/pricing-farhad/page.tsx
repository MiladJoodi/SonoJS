import { PricingFarhadView } from "@/components/pricing/pricing-farhad-view"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Pricing · Farhad",
  description:
    "Private SonoJS pricing for Farhad — Pro Yearly checkout with Monthly and Yearly options.",
  path: "/pricing-farhad",
})

export default function PricingFarhadPage() {
  return <PricingFarhadView />
}
