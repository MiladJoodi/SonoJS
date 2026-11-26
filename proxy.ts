import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { BREADCRUMB_PATH_HEADER } from "@/lib/seo-breadcrumb-labels"

export default clerkMiddleware((_auth, req) => {
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set(BREADCRUMB_PATH_HEADER, req.nextUrl.pathname)
  return NextResponse.next({
    request: { headers: requestHeaders },
  })
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files (unless in search params)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Clerk frontend API
    "/__clerk/(.*)",
  ],
}
