import type { ReactNode, SVGProps } from "react"

import { cn } from "@sonojs/ui/lib/utils"

import avatarImage from "./tweet-card/images/avatar.jpg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_AVATAR = assetSrc(avatarImage)

const DEFAULT_TEXT = `🚀 Introducing SonoJS! 😍

Build beautiful React UIs faster with: ✨ UI components & blocks 📊 Interactive charts & developer tools 🤖 AI + MCP integration 🌙 Dark mode & RTL/LTR support
Install components directly into your project. Own your code.

🔗 https://Sonojs.com`

export type TweetCardProps = {
  /** Display name. Defaults to SonoJS. */
  name?: string
  /** Handle without `@`. Defaults to `_sonojs`. */
  handle?: string
  /** Profile image URL. Defaults to the bundled @_sonojs avatar. */
  avatar?: string
  /** Tweet body. Defaults to the Introducing SonoJS post. */
  text?: ReactNode
  /** Profile link. */
  profileUrl?: string
  /** Tweet / card link (X logo). */
  href?: string
  /** Show verified badge next to the name. */
  verified?: boolean
  className?: string
} & Omit<React.ComponentProps<"div">, "children">

function XIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("size-5", className)}
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

/** Blue verified seal (same mark as VerifiedBadge). */
function TweetVerifiedBadge({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Verified account"
      className={cn("size-4 shrink-0 text-[#1D9BF0]", className)}
      {...props}
    >
      <title>Verified account</title>
      <path
        fill="currentColor"
        d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.351h6.234l2.972 5.15 5.358-3.086 5.358 3.087 2.972-5.15h6.234v-5.351l5.432-3.137L40 25.359 36.905 20 40 14.641l-5.432-3.137V5.15h-6.234L25.358 0l-5.36 3.094z"
      />
      <path
        fill="#fff"
        d="M26.311 14.538l2.254 2.287-11.43 11.5-6.837-6.93 2.244-2.258 4.587 4.581 9.182-9.18z"
      />
    </svg>
  )
}

function TweetText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g)

  return (
    <p className="whitespace-pre-wrap text-[15px] leading-relaxed tracking-normal text-foreground">
      {parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  )
}

/** Static tweet-style card — props only, no fetch. */
export function TweetCard({
  name = "SonoJS",
  handle = "_sonojs",
  avatar = DEFAULT_AVATAR,
  text = DEFAULT_TEXT,
  profileUrl = "https://x.com/_sonojs",
  href = "https://x.com/_sonojs/status/2115817526479262030",
  verified = true,
  className,
  ...props
}: TweetCardProps) {
  return (
    <div
      data-slot="tweet-card"
      className={cn(
        "relative flex h-fit w-full max-w-lg flex-col gap-4 overflow-hidden rounded-[12px] border border-border/70 bg-card p-5 shadow-soft",
        className
      )}
      {...props}
    >
      <div className="flex flex-row items-start justify-between tracking-normal">
        <div className="flex items-center gap-3">
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- bundled / prop avatar URLs */}
            <img
              src={avatar}
              alt={name}
              width={48}
              height={48}
              className="size-12 overflow-hidden rounded-full border border-border/50 object-cover"
            />
          </a>
          <div className="flex min-w-0 flex-col gap-0.5">
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="flex cursor-pointer items-center gap-1 font-medium whitespace-nowrap text-foreground transition-opacity hover:opacity-80"
            >
              <span className="truncate">{name}</span>
              {verified ? <TweetVerifiedBadge /> : null}
            </a>
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              @{handle}
            </a>
          </div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="sr-only">Open post</span>
          <XIcon className="size-5 transition-transform ease-in-out hover:scale-105" />
        </a>
      </div>

      {typeof text === "string" ? <TweetText text={text} /> : text}
    </div>
  )
}
