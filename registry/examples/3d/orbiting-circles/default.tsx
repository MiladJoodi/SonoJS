"use client"

import {
  GitHubIcon,
  GoogleIcon,
  NextjsIcon,
  NotionIcon,
  OpenAIIcon,
  OrbitingCircles,
  ReactIcon,
  TypescriptIcon,
  VercelIcon,
} from "@sonojs/ui/components/3d/orbiting-circles"

/** Same component users get from `sonojs add orbiting-circles`. */
export function OrbitingCirclesDefault() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={40}>
        <GitHubIcon />
        <GoogleIcon />
        <OpenAIIcon />
        <VercelIcon />
        <NotionIcon />
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        <ReactIcon />
        <NextjsIcon />
        <TypescriptIcon />
        <GitHubIcon />
      </OrbitingCircles>
    </div>
  )
}
