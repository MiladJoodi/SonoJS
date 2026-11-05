"use client"

import { PlayIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react"

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

export function BorderBeamDual() {
  return (
    <div className="flex w-full justify-center py-4">
      <Card className="relative w-full max-w-[350px] overflow-hidden">
        <CardHeader>
          <CardTitle>Now Playing</CardTitle>
          <CardDescription>Stairway to Heaven - Led Zeppelin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="size-48 rounded-lg bg-linear-to-br from-purple-500 to-pink-500" />
            <div className="h-1 w-full rounded-full bg-secondary">
              <div className="h-full w-1/3 rounded-full bg-primary" />
            </div>
            <div className="flex w-full justify-between text-sm text-muted-foreground">
              <span>2:45</span>
              <span>8:02</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <SkipBackIcon className="size-4" />
          </Button>
          <Button size="icon" className="rounded-full">
            <PlayIcon className="size-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <SkipForwardIcon className="size-4" />
          </Button>
        </CardFooter>
        <BorderBeam
          duration={6}
          size={400}
          className="from-transparent via-red-500 to-transparent"
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          borderWidth={2}
          className="from-transparent via-blue-500 to-transparent"
        />
      </Card>
    </div>
  )
}
