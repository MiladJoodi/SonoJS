"use client"

import Link from "next/link"

import { CountryCitySelect } from "@sonojs/ui/components/country-city-selector"

export function Workspace() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-canvas">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1200px] space-y-4 px-4 py-6 sm:px-6 sm:py-8">
          <header className="space-y-1">
            <h1 className="text-h3 tracking-tight text-foreground">Geo</h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Live country / state / city picker powered by{" "}
              <a
                href="https://www.npmjs.com/package/@sonojs/geo"
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="font-medium text-foreground underline underline-offset-3 hover:text-primary"
              >
                @sonojs/geo
              </a>
              . Same popover + in-panel search as the{" "}
              <Link
                href="/docs/components/country-city-selector"
                className="font-medium text-foreground underline underline-offset-3 hover:text-primary"
              >
                Country &amp; City Selector
              </Link>{" "}
              component. Data loads on demand — light state shards first; cities
              after a state is chosen.
            </p>
          </header>

          <div className="flex w-full justify-center pt-2">
            <CountryCitySelect
              className="w-full max-w-sm"
              includeState
              includeCity
              showFlags
              countryLabel="Country"
              stateLabel="State / province"
              cityLabel="City"
            />
          </div>
        </div>
      </div>
    </div>
  )
}