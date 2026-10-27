"use client"

import * as React from "react"
import { BoxIcon, PencilIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Card, CardContent } from "@sonojs/ui/components/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sonojs/ui/components/dialog"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

type Detail = {
  label: string
  value: string
  color: string
}

type MetricCardProps = {
  title: string
  value: string
  limit: string
  percentage: number
  status?: string
  statusColor?: string
  progressColor: string
  details?: Detail[]
  stackedProgress?: boolean
  actionLabel: string
  actionIcon: React.ReactNode
  warningMessage?: string
  onActionClick?: () => void
}

function MetricCard({
  title,
  value,
  limit,
  percentage,
  status,
  statusColor = "text-emerald-700 dark:text-emerald-400",
  progressColor,
  details,
  stackedProgress,
  actionLabel,
  actionIcon,
  warningMessage,
  onActionClick,
}: MetricCardProps) {
  const renderProgressBar = () => {
    if (stackedProgress && details && details.length >= 2) {
      const writes = Number.parseInt(details[0].value.replace(/,/g, ""), 10)
      const reads = Number.parseInt(details[1].value.replace(/,/g, ""), 10)
      const total = writes + reads || 1
      const writesPercentage = (writes / total) * 100
      const readsPercentage = (reads / total) * 100

      return (
        <div
          dir="ltr"
          className="relative h-1 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="absolute inset-y-0 left-0 w-full origin-left bg-emerald-500 transition-transform duration-200 ease-out"
            style={{ transform: `scaleX(${writesPercentage / 100})` }}
          />
          <div
            className="absolute inset-y-0 left-0 w-full origin-left bg-blue-500 transition-transform duration-200 ease-out"
            style={{
              transform: `translateX(${writesPercentage}%) scaleX(${readsPercentage / 100})`,
            }}
          />
        </div>
      )
    }

    return (
      <div
        dir="ltr"
        className="relative h-1 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn(
            "h-full w-full origin-left transition-transform duration-200 ease-out",
            progressColor
          )}
          style={{
            transform: `scaleX(${Math.min(percentage, 100) / 100})`,
          }}
        />
      </div>
    )
  }

  return (
    <Card className="relative overflow-hidden border-border/70 shadow-soft">
      <CardContent className="pb-12 pt-4">
        <h3 className="text-xs font-normal tracking-wide text-muted-foreground uppercase">
          {title}
        </h3>

        <div className="mt-2 flex items-baseline gap-1">
          <div
            dir="ltr"
            className="text-[1.2rem] font-medium leading-none text-foreground tabular-nums"
          >
            {value}
          </div>
          <div
            dir="ltr"
            className="text-xs leading-none text-muted-foreground"
          >
            / {limit}
          </div>
        </div>

        <div className="mt-3">
          {renderProgressBar()}

          {details ? (
            <div className="my-6 mb-2">
              <div className="flex flex-col gap-3">
                {details.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex w-full items-center text-xs leading-none text-muted-foreground"
                  >
                    <div
                      className={cn(
                        "me-1.5 size-2 shrink-0 rounded-full",
                        detail.color
                      )}
                    />
                    <div className="me-1">{detail.label}</div>
                    <div className="h-[9px] flex-1 border-b-2 border-dotted border-border" />
                    <div dir="ltr" className="ms-1 tabular-nums">
                      {detail.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {status ? (
            <div className="pt-2">
              <div className={cn("text-sm", statusColor)}>{status}</div>
            </div>
          ) : null}

          {warningMessage ? (
            <div className="pt-2">
              <div className="text-sm text-amber-700 dark:text-amber-400">
                {warningMessage}
              </div>
            </div>
          ) : null}
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <Button
            type="button"
            variant="ghost"
            className="h-8 w-full justify-start gap-1 rounded-none bg-muted/50 text-primary hover:text-primary"
            onClick={onActionClick}
          >
            {actionIcon}
            <span className="text-xs">{actionLabel}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function BudgetDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [budget, setBudget] = React.useState("150")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update budget</DialogTitle>
          <DialogDescription>
            When your monthly cost reaches the max budget, we email you and
            throttle registry syncs. You will not be charged beyond this budget
            for the workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="usage-based-billing-04-budget">
            Max budget per month
          </Label>
          <Input
            id="usage-based-billing-04-budget"
            type="number"
            inputMode="decimal"
            dir="ltr"
            placeholder="150"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>

        <DialogFooter className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function UsageBasedBilling({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [budgetDialogOpen, setBudgetDialogOpen] = React.useState(false)

  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden bg-white dark:bg-background px-4 py-10 text-foreground sm:px-6 sm:py-12",
        className
      )}
      aria-labelledby="usage-based-billing-04-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6 text-start">
          <h2
            id="usage-based-billing-04-heading"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Workspace usage
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Installs, CDN bandwidth, storage, and monthly cost for your SonoJS
            plan.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="CLI installs"
            value="13.8M"
            limit="Unlimited"
            percentage={67}
            progressColor="bg-blue-500"
            stackedProgress
            details={[
              {
                label: "Adds",
                value: "11,276,493",
                color: "bg-emerald-500",
              },
              {
                label: "Lookups",
                value: "2,548,921",
                color: "bg-blue-500",
              },
            ]}
            actionIcon={<BoxIcon className="size-4" aria-hidden />}
            actionLabel="Upgrade"
          />

          <MetricCard
            title="Bandwidth"
            value="141 GB"
            limit="150 GB"
            percentage={94}
            progressColor="bg-orange-500"
            warningMessage="Overage beyond the plan limit will be billed next cycle."
            actionIcon={<BoxIcon className="size-4" aria-hidden />}
            actionLabel="Upgrade"
          />

          <MetricCard
            title="Storage"
            value="37 GB"
            limit="500 GB"
            percentage={7.4}
            progressColor="bg-emerald-500"
            status="Looking healthy."
            actionIcon={<BoxIcon className="size-4" aria-hidden />}
            actionLabel="Upgrade"
          />

          <MetricCard
            title="Cost"
            value="$73.42"
            limit="$150 Budget"
            percentage={48.95}
            progressColor="bg-emerald-500"
            status="Looking healthy."
            actionIcon={<PencilIcon className="size-4" aria-hidden />}
            actionLabel="Change budget"
            onActionClick={() => setBudgetDialogOpen(true)}
          />
        </div>
      </div>

      <BudgetDialog
        open={budgetDialogOpen}
        onOpenChange={setBudgetDialogOpen}
      />
    </section>
  )
}
