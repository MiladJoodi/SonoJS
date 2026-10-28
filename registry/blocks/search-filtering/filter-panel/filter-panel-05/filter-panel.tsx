"use client"

import * as React from "react"
import { MapPinIcon, RotateCcwIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { Slider } from "@sonojs/ui/components/slider"
import { Switch } from "@sonojs/ui/components/switch"
import { cn } from "@/lib/utils"

const LOCATIONS = [
  "Amsterdam",
  "Berlin",
  "London",
  "Remote EU",
  "New York",
] as const
const EXPERIENCE = ["Junior", "Mid", "Senior", "Lead"] as const
const EMPLOYMENT = ["Full-time", "Contract", "Part-time"] as const

const PREVIEW = [
  { title: "Senior Product Designer", meta: "Amsterdam · Remote" },
  { title: "Frontend Engineer", meta: "Berlin · Full-time" },
  { title: "Design Systems Lead", meta: "Remote EU · Lead" },
] as const

/** Job filter sidebar as hero — muted preview strip, not a job SERP. */
export default function FilterPanel({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [locations, setLocations] = React.useState<Set<string>>(
    () => new Set(["Amsterdam", "Remote EU"])
  )
  const [experience, setExperience] = React.useState<Set<string>>(
    () => new Set()
  )
  const [employment, setEmployment] = React.useState<Set<string>>(
    () => new Set(["Full-time"])
  )
  const [salary, setSalary] = React.useState<[number, number]>([50, 140])
  const [remoteOnly, setRemoteOnly] = React.useState(false)

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    value: string,
    on: boolean
  ) => {
    setter((prev) => {
      const next = new Set(prev)
      if (on) next.add(value)
      else next.delete(value)
      return next
    })
  }

  const clearAll = () => {
    setLocations(new Set())
    setExperience(new Set())
    setEmployment(new Set())
    setSalary([50, 140])
    setRemoteOnly(false)
  }

  const activeCount =
    locations.size +
    experience.size +
    employment.size +
    (remoteOnly ? 1 : 0) +
    (salary[0] > 50 || salary[1] < 140 ? 1 : 0)

  const matchCount = Math.max(
    2,
    12 - activeCount * 2 + (remoteOnly ? 1 : 0)
  )

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-10 text-foreground dark:bg-background",
        className
      )}
      aria-labelledby="filter-panel-05-heading"
      {...props}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-start lg:px-8">
        <aside className="w-full shrink-0 lg:w-72">
          <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
            <div className="flex items-center justify-between gap-2 border-b border-border/70 px-4 py-3.5">
              <div className="flex items-center gap-2 text-start">
                <h1
                  id="filter-panel-05-heading"
                  className="text-sm font-semibold"
                >
                  Job filters
                </h1>
                {activeCount > 0 ? (
                  <Badge variant="secondary">{activeCount}</Badge>
                ) : null}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 cursor-pointer gap-1 px-2 text-xs"
                disabled={activeCount === 0}
                onClick={clearAll}
              >
                <RotateCcwIcon className="size-3.5" aria-hidden />
                Reset
              </Button>
            </div>

            <div className="space-y-5 px-4 py-4">
              <fieldset>
                <legend className="mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  <MapPinIcon className="size-3.5" aria-hidden />
                  Location
                </legend>
                <div className="space-y-2.5">
                  {LOCATIONS.map((loc) => {
                    const id = `fp-05-loc-${loc}`
                    return (
                      <div key={loc} className="flex items-center gap-2.5">
                        <Checkbox
                          id={id}
                          checked={locations.has(loc)}
                          className="cursor-pointer"
                          onCheckedChange={(v) =>
                            toggle(setLocations, loc, v === true)
                          }
                        />
                        <Label
                          htmlFor={id}
                          className="cursor-pointer font-normal"
                        >
                          {loc}
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </fieldset>

              <Separator />

              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Salary (K / yr)
                  </p>
                  <p className="text-xs font-semibold tabular-nums" dir="ltr">
                    ${salary[0]}K – ${salary[1]}K
                  </p>
                </div>
                <Slider
                  min={50}
                  max={140}
                  step={5}
                  value={salary}
                  onValueChange={(value) => {
                    if (value.length >= 2) {
                      setSalary([value[0]!, value[1]!])
                    }
                  }}
                  aria-label="Salary range"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="fp-05-remote" className="cursor-pointer">
                  Remote only
                </Label>
                <Switch
                  id="fp-05-remote"
                  checked={remoteOnly}
                  onCheckedChange={setRemoteOnly}
                  className="cursor-pointer"
                />
              </div>

              <Separator />

              <fieldset>
                <legend className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Experience
                </legend>
                <div className="space-y-2.5">
                  {EXPERIENCE.map((level) => {
                    const id = `fp-05-exp-${level}`
                    return (
                      <div key={level} className="flex items-center gap-2.5">
                        <Checkbox
                          id={id}
                          checked={experience.has(level)}
                          className="cursor-pointer"
                          onCheckedChange={(v) =>
                            toggle(setExperience, level, v === true)
                          }
                        />
                        <Label
                          htmlFor={id}
                          className="cursor-pointer font-normal"
                        >
                          {level}
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </fieldset>

              <Separator />

              <fieldset>
                <legend className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Employment
                </legend>
                <div className="space-y-2.5">
                  {EMPLOYMENT.map((type) => {
                    const id = `fp-05-emp-${type}`
                    return (
                      <div key={type} className="flex items-center gap-2.5">
                        <Checkbox
                          id={id}
                          checked={employment.has(type)}
                          className="cursor-pointer"
                          onCheckedChange={(v) =>
                            toggle(setEmployment, type, v === true)
                          }
                        />
                        <Label
                          htmlFor={id}
                          className="cursor-pointer font-normal"
                        >
                          {type}
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </fieldset>
            </div>

            <div className="border-t border-border/70 p-3">
              <Button type="button" className="w-full cursor-pointer">
                Show {matchCount} jobs
              </Button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 lg:pt-1">
          <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase text-start">
            Preview strip
          </p>
          <ul
            className="space-y-2 rounded-[12px] border border-dashed border-border/70 bg-muted/20 p-3"
            role="list"
            aria-label="Muted job preview"
          >
            {PREVIEW.map((job) => (
              <li
                key={job.title}
                className="rounded-md border border-border/50 bg-card/60 px-3 py-2.5 opacity-70"
              >
                <p className="text-sm font-medium text-start">{job.title}</p>
                <p className="text-xs text-muted-foreground text-start">
                  {job.meta}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground text-start">
            Listings stay muted so the filter panel remains the installable unit.
          </p>
        </div>
      </div>
    </section>
  )
}
