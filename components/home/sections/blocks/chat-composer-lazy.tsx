"use client"

import { LazyWhenVisible } from "@/components/home/lazy-when-visible"

function loadHomeChatComposer() {
  return import("./chat-composer")
}

/**
 * Client island: defers the interactive blocks chat demo until near viewport.
 * Owns the dynamic import so RSC never passes a function prop.
 */
export function HomeChatComposerLazy() {
  return (
    <LazyWhenVisible
      loader={loadHomeChatComposer}
      exportName="HomeChatComposer"
      className="flex h-[22rem] w-full overflow-visible pb-5 sm:h-[25rem] sm:pb-6 lg:h-[27rem]"
      placeholder={
        <div
          aria-hidden
          className="h-full w-full rounded-[12px] border border-border/70 bg-card shadow-soft"
        />
      }
    />
  )
}
