"use client"

import { useTheme } from "next-themes"

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
import { ShineBorder } from "@sonojs/ui/components/shine-border"

export function ShineBorderMonotone() {
  const { resolvedTheme } = useTheme()
  const shineColor = resolvedTheme === "dark" ? "white" : "black"

  return (
    <div className="flex w-full justify-center py-4">
      <Card className="relative w-full max-w-[350px] overflow-hidden">
        <ShineBorder borderWidth={2} duration={8} shineColor={shineColor} />
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="shine-border-mono-email">Email</Label>
                <Input
                  id="shine-border-mono-email"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shine-border-mono-password">Password</Label>
                <Input id="shine-border-mono-password" type="password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Sign In</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
