import { PricingView } from "@/components/pricing"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "SonoJS plans: Guest, Free, and Pro — browse public docs, unlock member components, or get the full library.",
  path: "/pricing",
})

export default function PricingPage() {
  return <PricingView />
}
