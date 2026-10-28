"use client"

import * as React from "react"
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  DownloadIcon,
  FileSpreadsheetIcon,
  Loader2Icon,
  RefreshCwIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

type ExportStatus = "ready" | "processing" | "failed" | "expired"

interface ExportJob {
  id: string
  name: string
  format: string
  records: number
  size: string
  createdAt: string
  status: ExportStatus
}

const INITIAL: ExportJob[] = [
  {
    id: "ex_1",
    name: "Customers · Last 30 days",
    format: "CSV",
    records: 1842,
    size: "2.4 MB",
    createdAt: "Jun 22, 2026 · 14:12",
    status: "ready",
  },
  {
    id: "ex_2",
    name: "Orders · Full dump",
    format: "XLSX",
    records: 12_480,
    size: "—",
    createdAt: "Jun 22, 2026 · 14:18",
    status: "processing",
  },
  {
    id: "ex_3",
    name: "Analytics · Q2",
    format: "JSON",
    records: 0,
    size: "—",
    createdAt: "Jun 21, 2026 · 09:04",
    status: "failed",
  },
  {
    id: "ex_4",
    name: "Invoices · May",
    format: "CSV",
    records: 906,
    size: "890 KB",
    createdAt: "May 31, 2026 · 18:40",
    status: "expired",
  },
]

function statusBadge(status: ExportStatus) {
  switch (status) {
    case "ready":
      return (
        <Badge className="gap-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          <CheckCircle2Icon className="size-3" aria-hidden />
          Ready
        </Badge>
      )
    case "processing":
      return (
        <Badge variant="secondary" className="gap-1">
          <Loader2Icon className="size-3 animate-spin" aria-hidden />
          Processing
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircleIcon className="size-3" aria-hidden />
          Failed
        </Badge>
      )
    default:
      return <Badge variant="outline">Expired</Badge>
  }
}

export default function DataExport({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [jobs, setJobs] = React.useState(INITIAL)

  const retry = (id: string) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id
          ? {
              ...j,
              status: "processing",
              size: "—",
              createdAt: "Just now",
            }
          : j
      )
    )
    window.setTimeout(() => {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === id && j.status === "processing"
            ? {
                ...j,
                status: "ready",
                size: "1.1 MB",
                records: j.records || 420,
                createdAt: "Just now",
              }
            : j
        )
      )
    }, 1600)
  }

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <section
        className="w-full max-w-2xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        aria-labelledby="data-export-04-heading"
      >
        <header className="flex flex-col gap-3 border-b border-border/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="text-start">
            <h1
              id="data-export-04-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Export history
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Downloads expire after 7 days. Retry failed jobs anytime.
            </p>
          </div>
          <Badge variant="secondary">{jobs.length} jobs</Badge>
        </header>

        <ul>
          {jobs.map((job, index) => (
            <li key={job.id}>
              {index > 0 ? <Separator /> : null}
              <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex min-w-0 items-start gap-3 text-start">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
                    <FileSpreadsheetIcon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-semibold">
                        {job.name}
                      </p>
                      {statusBadge(job.status)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {job.format}
                      {job.records > 0 ? (
                        <>
                          {" · "}
                          <span dir="ltr">
                            {job.records.toLocaleString("en-US")} records
                          </span>
                        </>
                      ) : null}
                      {job.size !== "—" ? (
                        <>
                          {" · "}
                          <span dir="ltr">{job.size}</span>
                        </>
                      ) : null}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {job.createdAt}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2 sm:ps-2">
                  {job.status === "ready" ? (
                    <Button
                      type="button"
                      size="sm"
                      className="cursor-pointer gap-1.5"
                    >
                      <DownloadIcon className="size-3.5" aria-hidden />
                      Download
                    </Button>
                  ) : null}
                  {job.status === "failed" ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="cursor-pointer gap-1.5"
                      onClick={() => retry(job.id)}
                    >
                      <RefreshCwIcon className="size-3.5" aria-hidden />
                      Retry
                    </Button>
                  ) : null}
                  {job.status === "processing" ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="cursor-not-allowed gap-1.5"
                      disabled
                    >
                      <Loader2Icon className="size-3.5 animate-spin" aria-hidden />
                      Working…
                    </Button>
                  ) : null}
                  {job.status === "expired" ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="cursor-pointer gap-1.5"
                      onClick={() => retry(job.id)}
                    >
                      <RefreshCwIcon className="size-3.5" aria-hidden />
                      Re-run
                    </Button>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
