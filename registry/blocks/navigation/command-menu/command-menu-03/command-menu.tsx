"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@sonojs/ui/components/command"

type Dept = "Sales" | "Design" | "HR"

type Person = {
  id: string
  name: string
  role: string
  dept: Dept
  initials: string
}

const PEOPLE: Person[] = [
  { id: "1", name: "James Will", role: "People ops", dept: "HR", initials: "JW" },
  { id: "2", name: "Jager Brane", role: "PM", dept: "Sales", initials: "JB" },
  { id: "3", name: "Jane Smith", role: "Engineer", dept: "Design", initials: "JS" },
  { id: "4", name: "Ause Teague", role: "QA", dept: "Design", initials: "AT" },
  { id: "5", name: "Bory Disher", role: "UX engineer", dept: "Design", initials: "BD" },
  { id: "6", name: "Bayson Rue", role: "Developer", dept: "Sales", initials: "BR" },
  { id: "7", name: "Cerie Plaskett", role: "Network", dept: "HR", initials: "CP" },
]

const DEPTS: Dept[] = ["Sales", "Design", "HR"]

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-primary/15 text-primary dark:bg-primary/25">
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  )
}

export default function CommandMenu({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false)
  const [q, setQ] = React.useState("")
  const [filters, setFilters] = React.useState<Dept[]>([])

  const toggle = (d: Dept) =>
    setFilters((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    )

  const hits = PEOPLE.filter((p) => {
    const okDept = filters.length === 0 || filters.includes(p.dept)
    const okQ =
      !q ||
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.role.toLowerCase().includes(q.toLowerCase())
    return okDept && okQ
  })

  const ranked = q
    ? [...hits].sort((a, b) => {
        const aHit = a.name.toLowerCase().startsWith(q.toLowerCase()) ? 0 : 1
        const bHit = b.name.toLowerCase().startsWith(q.toLowerCase()) ? 0 : 1
        return aHit - bHit
      })
    : hits

  return (
    <div
      className={cn(
        "flex min-h-[28rem] w-full flex-1 flex-col bg-canvas",
        className
      )}
      {...props}
    >
      <header className="border-b border-border/70 px-4 py-3 sm:px-6">
        <p className="text-start text-sm font-medium text-foreground">
          People scout
        </p>
        <p className="text-start text-xs text-muted-foreground">
          Search the directory with department filters.
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-10 sm:px-6">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Find people
        </Button>
      </main>

      <CommandDialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) {
            setQ("")
            setFilters([])
          }
        }}
      >
        <Command
          shouldFilter={false}
          className="bg-popover text-popover-foreground"
        >
          <CommandInput
            value={q}
            onValueChange={setQ}
            placeholder="Name or role…"
          />
          <div className="flex flex-wrap gap-1.5 border-b border-border/70 px-3 pb-3">
            {DEPTS.map((d) => {
              const on = filters.includes(d)
              return (
                <button
                  key={d}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(d)}
                  className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Badge variant={on ? "default" : "outline"} className="gap-1">
                    {d}
                    {on ? (
                      <XIcon className="size-3 opacity-70" aria-hidden />
                    ) : null}
                  </Badge>
                </button>
              )
            })}
          </div>
          <CommandList className="max-h-[min(20rem,50dvh)]">
            <CommandEmpty>No people match.</CommandEmpty>
            {ranked.length > 0 ? (
              <CommandGroup
                heading={q ? `Matches (${ranked.length})` : "Directory"}
              >
                {ranked.map((p) => (
                  <PersonRow key={p.id} person={p} q={q} />
                ))}
              </CommandGroup>
            ) : null}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}

function PersonRow({ person, q }: { person: Person; q: string }) {
  return (
    <CommandItem value={person.id} className="cursor-pointer gap-2.5 py-2">
      <Avatar className="size-8 shrink-0">
        <AvatarFallback>{person.initials}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col text-start">
        <span className="text-sm font-medium">
          <Highlight text={person.name} q={q} />
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {person.role} · {person.dept}
        </span>
      </div>
    </CommandItem>
  )
}
