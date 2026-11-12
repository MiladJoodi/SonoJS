import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { Analytics } from "@vercel/analytics/next"

import { SonoGoogleOneTap } from "@/components/auth/google-one-tap"
import {
  DocsToaster,
  PreviewDirectionProvider,
} from "@/components/docs"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { siteConfig } from "@/lib/config"
import {
  isProductionIndexingEnabled,
  OG_IMAGE,
  twitterHandleFromConfig,
} from "@/lib/seo"
import { PRODUCTION_ORIGIN } from "@/lib/site-origin"

import "./globals.css"

/** Local Geist (not next/font/google) - avoids Turbopack Google Fonts URL flakes. */
const geistSans = GeistSans
const geistMono = GeistMono

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
  // Do not set a root canonical here — Next merges layout metadata onto
  // children, so `canonical: "/"` would force the homepage onto routes that
  // omit their own alternates (e.g. auth callbacks). Homepage uses pageMetadata.
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
    site: twitterHandleFromConfig(),
    creator: twitterHandleFromConfig(),
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
        <ClerkProvider prefetchUI={false}>
          <SonoGoogleOneTap />
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
            {/* Local prod builds have no /_vercel/insights endpoint; keep Analytics on Vercel only. */}
            {process.env.VERCEL ? <Analytics /> : null}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
