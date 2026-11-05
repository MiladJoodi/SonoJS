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
import { BorderBeam } from "@sonojs/ui/components/border-beam"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

export function BorderBeamReverse() {
  return (
    <div className="flex w-full justify-center py-4">
      <Card className="relative w-full max-w-[350px] overflow-hidden">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="border-beam-reverse-email">Email</Label>
                <Input
                  id="border-beam-reverse-email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="border-beam-reverse-password">Password</Label>
                <Input
                  id="border-beam-reverse-password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between gap-3">
          <Button variant="outline">Register</Button>
          <Button>Login</Button>
        </CardFooter>
        <BorderBeam
          duration={4}
          size={300}
          reverse
          className="from-transparent via-green-500 to-transparent"
        />
      </Card>
    </div>
  )
}
