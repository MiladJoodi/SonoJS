"use client"

import * as React from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { MagicCard } from "@sonojs/ui/components/magic-card"

function subscribeDarkClass(onChange: () => void) {
  const root = document.documentElement
  const observer = new MutationObserver(onChange)
  observer.observe(root, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}

function useIsDark() {
  return React.useSyncExternalStore(
    subscribeDarkClass,
    () => document.documentElement.classList.contains("dark"),
    () => true
  )
}

/** Same component users get from `sonojs add magic-card`. */
export function MagicCardOrb() {
  const isDark = useIsDark()

  return (
    <div className="flex w-full justify-center bg-canvas px-6 py-10">
      <Card className="w-full max-w-sm border-none p-0 shadow-none">
        <MagicCard
          mode="orb"
          glowFrom={isDark ? "#ee4f27" : "#E9D5FF"}
          glowTo={isDark ? "#6b21ef" : "#FBCFE8"}
          className="p-0"
        >
          <CardHeader className="border-border border-b p-4 [.border-b]:pb-4">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarImage src="/images/docs/01.webp" alt="Alex Rivera" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <CardTitle>Alex Rivera</CardTitle>
                <CardDescription className="mt-1">
                  Frontend Developer
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 p-4">
            <p className="text-sm font-medium">
              Frontend developer focused on interactive UI and performance.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Passionate about visual presentation and building polished product
              surfaces.
            </p>
          </CardContent>
          <CardFooter className="border-border border-t p-4 [.border-t]:pt-4">
            <Button className="w-full">View profile</Button>
          </CardFooter>
        </MagicCard>
      </Card>
    </div>
  )
}
