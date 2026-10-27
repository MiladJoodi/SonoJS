"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FilterIcon,
  FolderOpenIcon,
  PencilIcon,
  PlusIcon,
  PresentationIcon,
  SearchIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

import team1 from "./images/team-1.webp"
import team2 from "./images/team-2.webp"
import team3 from "./images/team-3.webp"
import team4 from "./images/team-4.webp"
import team5 from "./images/team-5.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const AVATARS = [
  assetSrc(team1),
  assetSrc(team2),
  assetSrc(team3),
  assetSrc(team4),
  assetSrc(team5),
] as const

type FileKind = "docx" | "pptx" | "xlsx" | "pdf"

type StatusTone =
  | "completed"
  | "progress"
  | "delayed"
  | "reviewed"
  | "submitted"
  | "archived"
  | "pending"

type FileRow = {
  id: number
  name: string
  size: string
  kind: FileKind
  people: string[]
  extraPeople: number
  department: string
  category: string
  status: { label: string; tone: StatusTone }
  uploadedAt: string
}

const KIND_META: Record<
  FileKind,
  { label: string; icon: typeof FileTextIcon; className: string }
> = {
  docx: {
    label: "DOC",
    icon: FileTextIcon,
    className: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  },
  pptx: {
    label: "PPT",
    icon: PresentationIcon,
    className: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  },
  xlsx: {
    label: "XLS",
    icon: FileSpreadsheetIcon,
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  },
  pdf: {
    label: "PDF",
    icon: FileIcon,
    className: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  },
}

const STATUS_STYLES: Record<StatusTone, string> = {
  completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  progress: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  delayed: "bg-destructive/10 text-destructive",
  reviewed: "bg-primary/10 text-primary",
  submitted: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  archived: "bg-muted text-muted-foreground",
  pending: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
}

const DEFAULT_ROWS: FileRow[] = [
  {
    id: 1,
    name: "File_001.docx",
    size: "14.5 MB",
    kind: "docx",
    people: AVATARS.slice(0, 4),
    extraPeople: 3,
    department: "E-commerce",
    category: "Admin",
    status: { label: "Completed", tone: "completed" },
    uploadedAt: "Apr 4, 2025 · 8:20 pm",
  },
  {
    id: 2,
    name: "File_002.docx",
    size: "8.5 MB",
    kind: "docx",
    people: AVATARS.slice(0, 5),
    extraPeople: 3,
    department: "Finance",
    category: "Member",
    status: { label: "In progress", tone: "progress" },
    uploadedAt: "Mar 12, 2025 · 10:45 am",
  },
  {
    id: 3,
    name: "Presentation.pptx",
    size: "4.5 MB",
    kind: "pptx",
    people: AVATARS.slice(0, 5),
    extraPeople: 3,
    department: "Education",
    category: "Member",
    status: { label: "Delayed", tone: "delayed" },
    uploadedAt: "Apr 1, 2025 · 9:00 am",
  },
  {
    id: 4,
    name: "Invoice_2303.xlsx",
    size: "11.05 MB",
    kind: "xlsx",
    people: AVATARS.slice(0, 3),
    extraPeople: 3,
    department: "Accounting",
    category: "Manager",
    status: { label: "Reviewed", tone: "reviewed" },
    uploadedAt: "Mar 22, 2025 · 4:30 pm",
  },
  {
    id: 5,
    name: "Report_Q4.pdf",
    size: "6.5 MB",
    kind: "pdf",
    people: AVATARS.slice(0, 3),
    extraPeople: 3,
    department: "Marketing",
    category: "Member",
    status: { label: "Submitted", tone: "submitted" },
    uploadedAt: "Apr 10, 2025 · 8:10 am",
  },
  {
    id: 6,
    name: "Summary_2024.pdf",
    size: "7.5 MB",
    kind: "pdf",
    people: AVATARS.slice(0, 4),
    extraPeople: 3,
    department: "Content",
    category: "HR",
    status: { label: "Archived", tone: "archived" },
    uploadedAt: "Mar 17, 2025 · 2:15 pm",
  },
  {
    id: 7,
    name: "Analysis_Report.docx",
    size: "10.5 MB",
    kind: "docx",
    people: AVATARS.slice(0, 5),
    extraPeople: 3,
    department: "Business",
    category: "Admin",
    status: { label: "Submitted", tone: "submitted" },
    uploadedAt: "Mar 28, 2025 · 11:55 am",
  },
  {
    id: 8,
    name: "Launch_Plan.xlsx",
    size: "6.15 MB",
    kind: "xlsx",
    people: AVATARS.slice(0, 4),
    extraPeople: 3,
    department: "Strategy",
    category: "Admin",
    status: { label: "Pending", tone: "pending" },
    uploadedAt: "Mar 28, 2025 · 11:55 am",
  },
]

const PAGES = [1, 2, 3, 4, 5, 6] as const

export default function AdvancedDataGrid({
  rows = DEFAULT_ROWS,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  rows?: FileRow[]
}) {
  const searchId = React.useId()
  const masterId = React.useId()
  const [query, setQuery] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [selected, setSelected] = React.useState<Record<number, boolean>>({})

  const filtered = !query.trim()
    ? rows
    : rows.filter((row) =>
        [
          row.name,
          row.size,
          row.department,
          row.category,
          row.status.label,
          row.uploadedAt,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      )

  const allSelected =
    filtered.length > 0 && filtered.every((row) => selected[row.id])

  const toggleMaster = (checked: boolean) => {
    setSelected((prev) => {
      const next = { ...prev }
      for (const row of filtered) next[row.id] = checked
      return next
    })
  }

  const peopleStack = (row: FileRow) => (
    <div className="flex w-max -space-x-2.5 rtl:space-x-reverse">
      {row.people.map((src, index) => (
        <img
          key={`${row.id}-${index}`}
          src={src}
          alt=""
          className="size-8 rounded-full object-cover ring-2 ring-card"
          loading="lazy"
        />
      ))}
      <span className="flex size-8 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-foreground ring-2 ring-card">
        +{row.extraPeople}
      </span>
    </div>
  )

  const fileActions = (row: FileRow) => (
    <div className="flex gap-1">
      <button
        type="button"
        aria-label={`Edit ${row.name}`}
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <PencilIcon className="size-4" />
      </button>
      <button
        type="button"
        aria-label={`Delete ${row.name}`}
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Trash2Icon className="size-4" />
      </button>
    </div>
  )

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-card px-4 py-8 sm:py-12 md:px-8 md:py-16",
        className
      )}
      aria-label="Shared files vault"
      {...props}
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <div className="mb-6 overflow-hidden rounded-[12px] border border-border/70 shadow-soft">
          <div className="flex flex-col gap-3 border-b border-border/70 bg-muted/40 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center dark:bg-muted/25">
            <div className="flex min-w-0 items-center gap-2">
              <FolderOpenIcon
                className="size-4 shrink-0 text-primary"
                aria-hidden
              />
              <nav
                aria-label="Breadcrumb"
                className="flex min-w-0 flex-wrap items-center gap-1 text-sm"
              >
                <span className="text-muted-foreground">Workspace</span>
                <ChevronRightIcon
                  className="icon-dir size-3.5 shrink-0 text-muted-foreground/60"
                  aria-hidden
                />
                <span className="truncate font-medium text-foreground">
                  Shared files
                </span>
              </nav>
            </div>
            <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground sm:ms-auto">
              <span className="shrink-0">Storage</span>
              <div className="flex h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-background sm:w-32 sm:flex-none">
                <div className="h-full w-[42%] rounded-full bg-primary" />
              </div>
              <span className="shrink-0 font-medium text-foreground tabular-nums">
                48 / 200 GB
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-4 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <form
              className="w-full min-w-0 sm:max-w-sm"
              role="search"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="flex h-[46px] items-center gap-2.5 rounded-md border border-border/70 bg-background px-3 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40">
                <SearchIcon
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <label htmlFor={searchId} className="sr-only">
                  Search files
                </label>
                <input
                  type="search"
                  id={searchId}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search files…"
                  className="min-w-0 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            </form>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2">
              <button
                type="button"
                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-border/70 bg-background px-3 text-sm font-semibold text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <FilterIcon className="size-4 shrink-0" aria-hidden />
                Filters
              </button>
              <button
                type="button"
                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-border/70 bg-background px-3 text-sm font-semibold text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <DownloadIcon className="size-4 shrink-0" aria-hidden />
                Export
              </button>
              <button
                type="button"
                className="col-span-2 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring sm:col-span-1"
              >
                <UploadIcon className="size-4 shrink-0" aria-hidden />
                Upload
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="border-t border-border/70 px-4 py-12 text-center text-sm text-muted-foreground">
              No files match your search.
            </div>
          ) : (
            <>
              <ul className="flex flex-col gap-0 border-t border-border/70 md:hidden">
                {filtered.map((row) => {
                  const isChecked = Boolean(selected[row.id])
                  const meta = KIND_META[row.kind]
                  const Icon = meta.icon
                  return (
                    <li
                      key={row.id}
                      className={cn(
                        "border-b border-border/70 p-4 last:border-b-0",
                        isChecked && "bg-primary/5"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={isChecked}
                          aria-label={`Select ${row.name}`}
                          onCheckedChange={(value) =>
                            setSelected((prev) => ({
                              ...prev,
                              [row.id]: value === true,
                            }))
                          }
                          className="mt-1"
                        />
                        <span
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-[10px]",
                            meta.className
                          )}
                        >
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1 text-start">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-foreground">
                                {row.name}
                              </p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                <span className="font-medium">{meta.label}</span>
                                {" · "}
                                {row.size}
                                {" · "}
                                {row.department}
                              </p>
                            </div>
                            <span
                              className={cn(
                                "inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
                                STATUS_STYLES[row.status.tone]
                              )}
                            >
                              {row.status.label}
                            </span>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                            {peopleStack(row)}
                            {fileActions(row)}
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {row.uploadedAt}
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="hidden overflow-x-auto border-t border-border/70 md:block">
                <table className="w-full min-w-[960px] border-collapse text-start">
                  <thead className="whitespace-nowrap border-b border-border/70 bg-background text-xs font-semibold tracking-wide text-muted-foreground uppercase dark:bg-card">
                    <tr>
                      <th scope="col" className="w-12 py-3 ps-4">
                        <Checkbox
                          id={masterId}
                          checked={allSelected}
                          aria-label="Select all files"
                          onCheckedChange={(value) =>
                            toggleMaster(value === true)
                          }
                        />
                      </th>
                      <th scope="col" className="px-3 py-3 text-start">
                        File
                      </th>
                      <th scope="col" className="px-3 py-3 text-start">
                        Shared with
                      </th>
                      <th scope="col" className="px-3 py-3 text-start">
                        Department
                      </th>
                      <th scope="col" className="px-3 py-3 text-start">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3 text-start">
                        Uploaded
                      </th>
                      <th scope="col" className="px-3 py-3 pe-4 text-end">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70 text-sm">
                    {filtered.map((row) => {
                      const isChecked = Boolean(selected[row.id])
                      const meta = KIND_META[row.kind]
                      const Icon = meta.icon
                      return (
                        <tr
                          key={row.id}
                          className={cn(
                            "transition-colors hover:bg-muted/30",
                            isChecked && "bg-primary/5"
                          )}
                        >
                          <td className="py-3.5 ps-4">
                            <Checkbox
                              checked={isChecked}
                              aria-label={`Select ${row.name}`}
                              onCheckedChange={(value) =>
                                setSelected((prev) => ({
                                  ...prev,
                                  [row.id]: value === true,
                                }))
                              }
                            />
                          </td>
                          <td className="px-3 py-3.5">
                            <div className="flex items-center gap-3">
                              <span
                                className={cn(
                                  "flex size-10 shrink-0 items-center justify-center rounded-[10px]",
                                  meta.className
                                )}
                              >
                                <Icon className="size-5" aria-hidden />
                              </span>
                              <div className="min-w-0 text-start">
                                <p className="truncate font-semibold text-foreground">
                                  {row.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  <span className="font-medium">
                                    {meta.label}
                                  </span>
                                  {" · "}
                                  {row.size}
                                  {" · "}
                                  {row.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3.5">{peopleStack(row)}</td>
                          <td className="px-3 py-3.5 text-muted-foreground">
                            {row.department}
                          </td>
                          <td className="px-3 py-3.5">
                            <span
                              className={cn(
                                "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                                STATUS_STYLES[row.status.tone]
                              )}
                            >
                              {row.status.label}
                            </span>
                          </td>
                          <td className="px-3 py-3.5 whitespace-nowrap text-muted-foreground">
                            {row.uploadedAt}
                          </td>
                          <td className="px-3 py-3.5 pe-4">
                            <div className="flex justify-end">
                              {fileActions(row)}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="flex flex-col gap-3 border-t border-border/70 bg-muted/20 px-4 py-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between dark:bg-muted/10">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground tabular-nums">
                {filtered.length}
              </span>{" "}
              files · page{" "}
              <span className="font-medium text-foreground tabular-nums">
                {page}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground tabular-nums">
                {PAGES.length}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-border/70 bg-background px-3 text-xs font-semibold text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <PlusIcon className="size-3.5" aria-hidden />
                New folder
              </button>
              <nav
                aria-label="Pagination"
                className="flex flex-wrap items-center gap-1"
              >
                <button
                  type="button"
                  aria-label="Previous page"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-border/70 bg-background outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  <ChevronLeftIcon className="icon-dir size-4" />
                </button>
                {PAGES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-current={item === page ? "page" : undefined}
                    onClick={() => setPage(item)}
                    className={cn(
                      "inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      item === page
                        ? "bg-primary text-primary-foreground"
                        : "hidden hover:bg-muted sm:inline-flex"
                    )}
                  >
                    {item}
                  </button>
                ))}
                <span className="px-1 text-sm text-muted-foreground tabular-nums sm:hidden">
                  {page}/{PAGES.length}
                </span>
                <button
                  type="button"
                  aria-label="Next page"
                  onClick={() =>
                    setPage((p) => Math.min(PAGES.length, p + 1))
                  }
                  disabled={page >= PAGES.length}
                  className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-border/70 bg-background outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  <ChevronRightIcon className="icon-dir size-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
