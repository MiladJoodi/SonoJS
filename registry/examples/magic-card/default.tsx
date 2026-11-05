"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
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
export function MagicCardDefault() {
  const isDark = useIsDark()

  return (
    <div className="flex w-full justify-center bg-canvas px-6 py-10">
      <Card className="w-full max-w-sm border-none p-0 shadow-none">
        <MagicCard
          gradientColor={isDark ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardHeader className="border-border border-b p-4 [.border-b]:pb-4">
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="magic-card-email">Email</Label>
                  <Input
                    id="magic-card-email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="magic-card-password">Password</Label>
                  <Input id="magic-card-password" type="password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-border border-t p-4 [.border-t]:pt-4">
            <Button className="w-full">Sign In</Button>
          </CardFooter>
        </MagicCard>
      </Card>
    </div>
  )
}
