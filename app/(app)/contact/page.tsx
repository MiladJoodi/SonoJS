import { ContactForm } from "@/components/contact"
import { siteConfig } from "@/lib/config"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
  path: "/contact",
})

export default function ContactPage() {
  return (
    <main className="flex w-full min-w-0 flex-1 flex-col items-center justify-center bg-canvas px-4 py-12 sm:py-16">
      <ContactForm />
    </main>
  )
}
