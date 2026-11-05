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
import { Lens } from "@sonojs/ui/components/lens"

const IMAGE_SRC =
  "https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export function LensDefault() {
  return (
    <div className="flex w-full justify-center py-4">
      <Card className="relative w-full max-w-md shadow-none">
        <CardHeader>
          <Lens
            zoomFactor={2}
            lensSize={150}
            isStatic={false}
            ariaLabel="Zoom Area"
          >
            <img
              src={IMAGE_SRC}
              alt="Camp destination landscape"
              width={500}
              height={500}
              className="size-full object-cover"
            />
          </Lens>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl">Your next camp</CardTitle>
          <CardDescription>
            See our latest and best camp destinations all across the five
            continents of the globe.
          </CardDescription>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button>Let&apos;s go</Button>
          <Button variant="secondary">Another time</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
