import Link from "next/link"

import { chartViewHref } from "@/lib/charts-catalog"
import { cn } from "@/lib/utils"

import { chartThumbSrc } from "./thumbs"

const imgClass =
  "size-full object-contain object-center p-2.5 md:p-3 group-hover:scale-110 transition-transform duration-500"

export function ChartExampleCard({
  id,
  title,
  status,
}: {
  id: string
  title: string
  status?: "pending" | "ported"
  loading?: "eager" | "lazy"
}) {
  const pending = status === "pending"

  return (
    <Link
      href={chartViewHref(id)}
      aria-label={pending ? `${title} (pending)` : title}
      className={cn(
        "group flex w-full cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card text-start no-underline outline-none shadow-soft",
        "transition-[border-color,background-color] hover:border-border",
        "focus-visible:ring-2 focus-visible:ring-ring",
        pending && "opacity-80"
      )}
    >
      <div
        aria-hidden
        className="relative aspect-16/10 w-full overflow-hidden bg-muted/35 dark:bg-muted/25"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static public webps */}
        <img
          src={chartThumbSrc(id, "light")}
          alt=""
          className={cn(imgClass, "dark:hidden")}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- static public webps */}
        <img
          src={chartThumbSrc(id, "dark")}
          alt=""
          className={cn(imgClass, "hidden dark:block")}
        />
      </div>
      <div className="bg-card px-2.5 py-2 md:px-3 md:py-2.5">
        <span className="block truncate text-[13px] font-medium text-foreground md:text-sm">
          {title}
          {pending ? " · pending" : ""}
        </span>
      </div>
    </Link>
  )
}
