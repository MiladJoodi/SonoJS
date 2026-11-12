import { PricingView } from "@/components/pricing"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "SonoJS pricing: Free account for public and member access, or Pro Monthly and Pro Yearly for the full library. One payment per period. No automatic renewal.",
  path: "/pricing",
})

export default function PricingPage() {
  return <PricingView />
}
