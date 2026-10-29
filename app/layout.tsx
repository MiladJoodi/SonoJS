import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import {
  DocsToaster,
  PreviewDirectionProvider,
} from "@/components/docs"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { siteConfig } from "@/lib/config"
import { isProductionIndexingEnabled, OG_IMAGE } from "@/lib/seo"
import { PRODUCTION_ORIGIN } from "@/lib/site-origin"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-sono-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const geistMono = Geist_Mono({
  variable: "--font-sono-mono",
  subsets: ["latin"],
})

const indexing = isProductionIndexingEnabled()

const ogImages = [
  {
    url: OG_IMAGE.url,
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    type: OG_IMAGE.type,
    alt: OG_IMAGE.alt,
  },
]

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_ORIGIN),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: PRODUCTION_ORIGIN,
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [OG_IMAGE.url],
  },
  robots: indexing
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="style-vega flex min-h-full flex-col font-sans text-body">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PreviewDirectionProvider>
            <TooltipProvider delayDuration={400}>
              {children}
              <DocsToaster />
            </TooltipProvider>
          </PreviewDirectionProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
