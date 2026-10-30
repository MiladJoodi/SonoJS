import { cn } from "@/lib/utils"

import { assetSrc } from "./reviews"

export function ReviewCard({
  img,
  name,
  username,
  body,
  className,
}: {
  img: string | { src: string }
  name: string
  username: string
  body: string
  className?: string
}) {
  return (
    <figure
      className={cn(
        "border-border/70 bg-card relative h-full cursor-pointer overflow-hidden rounded-[12px] border p-3 shadow-soft sm:p-4",
        "hover:bg-muted/50",
        className
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="size-8 shrink-0 rounded-full border border-border/70 object-cover"
          width="32"
          height="32"
          alt={name}
          src={assetSrc(img)}
        />
        <div className="flex min-w-0 flex-col text-start">
          <figcaption
            dir="auto"
            className="text-foreground truncate text-sm font-medium"
          >
            {name}
          </figcaption>
          <p
            dir="auto"
            className="text-muted-foreground truncate text-xs font-medium"
          >
            {username}
          </p>
        </div>
      </div>
      <blockquote
        dir="auto"
        className="text-foreground mt-2 text-start text-sm leading-relaxed break-words whitespace-normal"
      >
        {body}
      </blockquote>
    </figure>
  )
}
