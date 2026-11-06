import { DocsPageHeader } from "@/components/docs"
import { cn } from "@/lib/utils"

export function LegalPage({
  title,
  description,
  pathname,
  children,
  className,
}: {
  title: string
  description?: string
  pathname: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <article
      className={cn(
        "w-full min-w-0 space-y-3",
        /* Room so short/late TOC targets can scroll under the sticky header. */
        "pb-[min(45vh,22rem)]",
        className
      )}
    >
      <DocsPageHeader
        title={title}
        pathname={pathname}
        description={description}
      />
      <div
        className={cn(
          "max-w-[42rem] space-y-4 text-start text-[15px] leading-relaxed",
          "[&_h2]:scroll-mt-[calc(var(--header-height)+1.25rem)]",
          "[&_h2]:mt-8 [&_h2]:border-b [&_h2]:border-border/50 [&_h2]:pb-2",
          "[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
          "[&_h2:first-child]:mt-0",
          "[&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground",
          "[&_p]:text-foreground/85",
          "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:ps-5 [&_ul]:text-foreground/85",
          "[&_strong]:font-semibold [&_strong]:text-foreground",
          "[&_em]:text-muted-foreground",
          "[&_code]:rounded-md [&_code]:border [&_code]:border-border/70",
          "[&_code]:bg-muted/50 [&_code]:px-1 [&_code]:py-0.5",
          "[&_code]:font-mono [&_code]:text-[0.9em]",
          "[&_a]:cursor-pointer [&_a]:font-medium [&_a]:text-foreground",
          "[&_a]:underline [&_a]:underline-offset-4"
        )}
      >
        {children}
      </div>
    </article>
  )
}
