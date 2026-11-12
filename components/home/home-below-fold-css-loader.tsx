"use client"

import * as React from "react"

import { scheduleHomeBelowFoldCss } from "@/components/home/home-below-fold-css"

/** Mount on the homepage only — starts deferred BTF CSS after first paint. */
export function HomeBelowFoldCssLoader() {
  React.useEffect(() => {
    scheduleHomeBelowFoldCss()
  }, [])

  return null
}
