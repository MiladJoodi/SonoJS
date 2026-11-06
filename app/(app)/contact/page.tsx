import type { Metadata } from "next"

import { ContactForm } from "@/components/contact"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <main className="flex w-full min-w-0 flex-1 flex-col items-center justify-center bg-canvas px-4 py-12 sm:py-16">
      <ContactForm />
    </main>
  )
}
