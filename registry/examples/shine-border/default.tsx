"use client"

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

export function ShineBorderDefault() {
  return (
    <div className="flex w-full justify-center py-4">
      <Card className="relative w-full max-w-[350px] overflow-hidden">
        <ShineBorder
          borderWidth={2}
          duration={8}
          shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        />
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
                <Label htmlFor="shine-border-email">Email</Label>
                <Input
                  id="shine-border-email"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shine-border-password">Password</Label>
                <Input id="shine-border-password" type="password" />
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
