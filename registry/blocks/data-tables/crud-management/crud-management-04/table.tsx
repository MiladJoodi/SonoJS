"use client"

/* eslint-disable @next/next/no-img-element */

import * as React from "react"
import {
  ArchiveIcon,
  CalendarClockIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  DownloadIcon,
  Edit3Icon,
  EyeIcon,
  FileTextIcon,
  MoreHorizontalIcon,
  PlusIcon,
  RotateCcwIcon,
  SearchIcon,
  SendIcon,
  Trash2Icon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@sonojs/ui/components/alert-dialog"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Calendar } from "@sonojs/ui/components/calendar"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@sonojs/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@sonojs/ui/components/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@sonojs/ui/components/popover"
import { ScrollArea } from "@sonojs/ui/components/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@sonojs/ui/components/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@sonojs/ui/components/tabs"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

type ArticleStatus = "draft" | "in_review" | "scheduled" | "published" | "archived"
type Activity = { id: string; label: string; at: string }
type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  body: string
  featuredImage: string
  author: string
  category: string
  tags: string[]
  seoTitle: string
  seoDescription: string
  status: ArticleStatus
  publishedAt?: string
  scheduledAt?: string
  updatedAt: string
  activity: Activity[]
}

const ARTICLE_SVGS = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480"><rect width="800" height="480" fill="#172554"/><circle cx="645" cy="105" r="150" fill="#2563eb" opacity=".7"/><path d="M0 390 210 190l145 126 128-115 317 279H0Z" fill="#60a5fa"/><path d="M0 435 236 254l123 108 92-77 208 195H0Z" fill="#dbeafe" opacity=".9"/><text x="55" y="92" fill="#fff" font-family="Arial" font-size="34" font-weight="700">FIELD NOTES</text></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480"><rect width="800" height="480" fill="#fff7ed"/><rect x="86" y="58" width="628" height="364" rx="26" fill="#fdba74"/><circle cx="248" cy="223" r="100" fill="#ea580c"/><path d="m430 145 205 80-205 110Z" fill="#7c2d12"/><path d="M130 365h540" stroke="#fff7ed" stroke-width="18" stroke-linecap="round"/><text x="120" y="112" fill="#7c2d12" font-family="Arial" font-size="30" font-weight="700">STUDIO / 04</text></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480"><rect width="800" height="480" fill="#052e2b"/><path d="M0 355c120-130 215-75 310-170s190 35 245-35 135-30 245 68v262H0Z" fill="#0f766e"/><path d="M0 405c130-82 230-22 327-91s184 42 271-20 146-20 202 18v168H0Z" fill="#5eead4"/><circle cx="655" cy="94" r="48" fill="#fef3c7"/><text x="48" y="82" fill="#ccfbf1" font-family="Arial" font-size="31" font-weight="700">A BETTER ROUTE</text></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480"><rect width="800" height="480" fill="#2e1065"/><g fill="none" stroke="#a78bfa" stroke-width="3" opacity=".7"><circle cx="400" cy="240" r="185"/><circle cx="400" cy="240" r="130"/><circle cx="400" cy="240" r="74"/></g><path d="M400 72 438 202l126 38-126 38-38 130-38-130-126-38 126-38Z" fill="#f5d0fe"/><circle cx="400" cy="240" r="30" fill="#c026d3"/><text x="50" y="430" fill="#fff" font-family="Arial" font-size="30" font-weight="700">DESIGNING TOMORROW</text></svg>`,
] as const
const FEATURED_IMAGES = ARTICLE_SVGS.map(
  (svg, index) => ({ id: `article-0${index + 1}`, src: `data:image/svg+xml,${encodeURIComponent(svg)}` })
)

const AUTHORS = ["Maya Chen", "Jon Bell", "Priya Nair", "Theo Martin"]
const CATEGORIES = ["Design", "Engineering", "Culture", "Product"]
const STATUS_LABEL: Record<ArticleStatus, string> = {
  draft: "Draft",
  in_review: "In review",
  scheduled: "Scheduled",
  published: "Published",
  archived: "Archived",
}
const STATUS_STYLE: Record<ArticleStatus, string> = {
  draft: "border-transparent bg-slate-500/10 text-slate-700 dark:text-slate-300",
  in_review: "border-transparent bg-amber-500/10 text-amber-700 dark:text-amber-400",
  scheduled: "border-transparent bg-violet-500/10 text-violet-700 dark:text-violet-400",
  published: "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  archived: "border-transparent bg-muted text-muted-foreground",
}

const SEED_ARTICLES: Article[] = [
  {
    id: "article-101", title: "The quiet systems behind great products", slug: "quiet-systems-behind-great-products",
    excerpt: "How invisible design decisions create products that feel obvious, fast, and trustworthy.",
    body: "The best product systems rarely call attention to themselves. They reduce decisions, preserve context, and make the next step feel inevitable.\n\n**Consistency is a form of care.** When patterns repeat with purpose, people can spend their attention on the work rather than the interface.",
    featuredImage: FEATURED_IMAGES[0].src, author: "Maya Chen", category: "Design", tags: ["systems", "craft"],
    seoTitle: "The quiet systems behind great products", seoDescription: "A field guide to designing calm, coherent product systems.",
    status: "published", publishedAt: "2026-10-24T09:00:00.000Z", updatedAt: "2026-10-24T09:00:00.000Z",
    activity: [{ id: "a1", label: "Published by Maya Chen", at: "2026-10-24T09:00:00.000Z" }],
  },
  {
    id: "article-102", title: "Inside our editorial studio", slug: "inside-our-editorial-studio",
    excerpt: "A practical look at the rituals that move an idea from rough note to useful story.",
    body: "Every story begins with a question worth answering. Our editorial process keeps that question visible from pitch through publication.\n\nWriters and editors share one goal: make each revision **more useful to the reader**.",
    featuredImage: FEATURED_IMAGES[1].src, author: "Jon Bell", category: "Culture", tags: ["editorial", "process"],
    seoTitle: "Inside our editorial studio", seoDescription: "See the editorial process behind our stories.",
    status: "in_review", updatedAt: "2026-10-29T15:20:00.000Z",
    activity: [{ id: "a2", label: "Submitted for review by Jon Bell", at: "2026-10-29T15:20:00.000Z" }],
  },
  {
    id: "article-103", title: "Choosing the better route", slug: "choosing-the-better-route",
    excerpt: "A framework for making technical tradeoffs when every option looks reasonable.",
    body: "Good engineering decisions begin by naming the constraint. Speed, simplicity, reversibility, and scale do not always point in the same direction.\n\nPrefer the route that keeps the next decision open.",
    featuredImage: FEATURED_IMAGES[2].src, author: "Priya Nair", category: "Engineering", tags: ["decisions", "architecture"],
    seoTitle: "Choosing the better technical route", seoDescription: "A practical framework for evaluating technical tradeoffs.",
    status: "scheduled", scheduledAt: "2026-11-04T14:00:00.000Z", updatedAt: "2026-10-28T11:45:00.000Z",
    activity: [{ id: "a3", label: "Scheduled for Nov 4", at: "2026-10-28T11:45:00.000Z" }],
  },
  {
    id: "article-104", title: "Designing tomorrow, carefully", slug: "designing-tomorrow-carefully",
    excerpt: "Why durable product bets combine ambition with a clear path back.",
    body: "Vision matters most when it changes what a team does today. A useful future is specific enough to guide a small decision.\n\nBuild boldly, but keep learning loops short.",
    featuredImage: FEATURED_IMAGES[3].src, author: "Theo Martin", category: "Product", tags: ["strategy", "future"],
    seoTitle: "Designing tomorrow, carefully", seoDescription: "How product teams turn long-term vision into careful action.",
    status: "scheduled", scheduledAt: "2026-11-12T16:30:00.000Z", updatedAt: "2026-10-30T08:15:00.000Z",
    activity: [{ id: "a4", label: "Scheduled for Nov 12", at: "2026-10-30T08:15:00.000Z" }],
  },
  {
    id: "article-105", title: "Notes on sustainable momentum", slug: "notes-on-sustainable-momentum",
    excerpt: "Small operating habits that help creative teams keep quality high without burning out.",
    body: "Momentum is not constant motion. It is the confidence that useful work can continue tomorrow.\n\nProtect focus, write decisions down, and celebrate finished work.",
    featuredImage: FEATURED_IMAGES[0].src, author: "Maya Chen", category: "Culture", tags: ["teams", "practice"],
    seoTitle: "Notes on sustainable momentum", seoDescription: "Operating habits for healthy, high-quality creative teams.",
    status: "draft", updatedAt: "2026-10-30T10:25:00.000Z",
    activity: [{ id: "a5", label: "Draft updated by Maya Chen", at: "2026-10-30T10:25:00.000Z" }],
  },
  {
    id: "article-106", title: "Our 2025 platform retrospective", slug: "2025-platform-retrospective",
    excerpt: "What the platform team learned from a year of foundations, migrations, and measured change.",
    body: "Last year was about foundations. We retired old paths, clarified ownership, and invested in tools that make safe changes routine.",
    featuredImage: FEATURED_IMAGES[2].src, author: "Priya Nair", category: "Engineering", tags: ["platform", "retrospective"],
    seoTitle: "2025 platform retrospective", seoDescription: "Lessons from a year of platform engineering.",
    status: "archived", publishedAt: "2026-01-12T10:00:00.000Z", updatedAt: "2026-09-02T09:00:00.000Z",
    activity: [{ id: "a6", label: "Archived by Priya Nair", at: "2026-09-02T09:00:00.000Z" }],
  },
]

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}
function uniqueSlug(value: string, articles: Article[], ignoreId?: string) {
  const base = slugify(value) || "untitled-article"
  let candidate = base
  let suffix = 2
  while (articles.some((article) => article.id !== ignoreId && article.slug === candidate)) {
    candidate = `${base}-${suffix++}`
  }
  return candidate
}
function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
function formatDate(value?: string, includeTime = false) {
  if (!value) return "—"
  return new Date(value).toLocaleString("en-US", includeTime
    ? { dateStyle: "medium", timeStyle: "short" }
    : { dateStyle: "medium" })
}
function dateKey(value?: string) {
  if (!value) return ""
  const date = new Date(value)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}
function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`
}
function renderParagraph(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
      : <React.Fragment key={index}>{part}</React.Fragment>
  )
}
function blankArticle(): Article {
  const now = new Date().toISOString()
  return {
    id: createId("article"), title: "", slug: "", excerpt: "", body: "",
    featuredImage: FEATURED_IMAGES[0].src, author: AUTHORS[0], category: CATEGORIES[0],
    tags: [], seoTitle: "", seoDescription: "", status: "draft", updatedAt: now,
    activity: [{ id: createId("activity"), label: "Draft created", at: now }],
  }
}
function canTransition(from: ArticleStatus, to: ArticleStatus) {
  const allowed: Record<ArticleStatus, ArticleStatus[]> = {
    draft: ["in_review"],
    in_review: ["draft", "scheduled", "published"],
    scheduled: ["published"],
    published: ["draft", "archived"],
    archived: ["draft"],
  }
  return allowed[from].includes(to)
}

function StatusBadge({ status }: { status: ArticleStatus }) {
  return <Badge variant="outline" className={cn("rounded-full", STATUS_STYLE[status])}>{STATUS_LABEL[status]}</Badge>
}

function ReaderArticle({ article }: { article: Article }) {
  return (
    <article className="mx-auto max-w-2xl pb-8 text-start">
      <img src={article.featuredImage} alt="" className="aspect-5/3 w-full rounded-[12px] border border-border/70 object-cover" />
      <div className="mt-7 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>{article.category}</span><span aria-hidden>•</span><span>{article.author}</span>
      </div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{article.title || "Untitled article"}</h1>
      {article.excerpt ? <p className="mt-4 text-lg leading-8 text-muted-foreground">{article.excerpt}</p> : null}
      <Separator className="my-7" />
      <div className="space-y-5 text-base leading-7 text-foreground/90">
        {(article.body || "Start writing to see the reader preview.").split(/\n\s*\n/).map((paragraph, index) => (
          <p key={index}>{renderParagraph(paragraph)}</p>
        ))}
      </div>
      {article.tags.length ? <div className="mt-8 flex flex-wrap gap-2">{article.tags.map((tag) => <Badge key={tag} variant="secondary">#{tag}</Badge>)}</div> : null}
    </article>
  )
}

export default function CrudManagement04({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [articles, setArticles] = React.useState<Article[]>(SEED_ARTICLES)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [authorFilter, setAuthorFilter] = React.useState("all")
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const [updatedAfter, setUpdatedAfter] = React.useState<Date | undefined>()
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [page, setPage] = React.useState(1)
  const [editorOpen, setEditorOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<Article>(() => blankArticle())
  const [slugTouched, setSlugTouched] = React.useState(false)
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [previewArticle, setPreviewArticle] = React.useState<Article | null>(null)
  const [detailArticle, setDetailArticle] = React.useState<Article | null>(null)
  const [deleteArticle, setDeleteArticle] = React.useState<Article | null>(null)
  const [deletedSnapshot, setDeletedSnapshot] = React.useState<{ article: Article; index: number } | null>(null)
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(() => new Date("2026-11-04T12:00:00"))
  const [message, setMessage] = React.useState("")
  const perPage = 5

  const filtered = React.useMemo(() => {
    const needle = search.trim().toLowerCase()
    return articles.filter((article) => {
      const haystack = [article.title, article.author, article.category, article.slug, ...article.tags].join(" ").toLowerCase()
      return (!needle || haystack.includes(needle))
        && (statusFilter === "all" || article.status === statusFilter)
        && (authorFilter === "all" || article.author === authorFilter)
        && (categoryFilter === "all" || article.category === categoryFilter)
        && (!updatedAfter || new Date(article.updatedAt) >= new Date(updatedAfter.getFullYear(), updatedAfter.getMonth(), updatedAfter.getDate()))
    })
  }, [articles, authorFilter, categoryFilter, search, statusFilter, updatedAfter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const visibleArticles = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)
  const allVisibleSelected = visibleArticles.length > 0 && visibleArticles.every((article) => selectedIds.includes(article.id))
  const patchDraft = (patch: Partial<Article>) => setDraft((current) => ({ ...current, ...patch }))
  const openNew = () => {
    setDraft(blankArticle())
    setSlugTouched(false)
    setMessage("")
    setEditorOpen(true)
  }
  const openEdit = (article: Article) => {
    setDraft({ ...article, tags: [...article.tags], activity: [...article.activity] })
    setSlugTouched(true)
    setMessage("")
    setEditorOpen(true)
  }
  const saveArticle = (nextDraft = draft, close = true) => {
    if (!nextDraft.title.trim()) {
      setMessage("Add a title before saving.")
      return false
    }
    if (nextDraft.status === "scheduled" && (!nextDraft.scheduledAt || new Date(nextDraft.scheduledAt).getTime() <= Date.now())) {
      setMessage("Scheduled articles need a future date and time.")
      return false
    }
    const now = new Date().toISOString()
    const exists = articles.some((article) => article.id === nextDraft.id)
    const next: Article = {
      ...nextDraft,
      title: nextDraft.title.trim(),
      slug: uniqueSlug(nextDraft.slug || nextDraft.title, articles, nextDraft.id),
      updatedAt: now,
      activity: exists
        ? [{ id: createId("activity"), label: "Article updated", at: now }, ...nextDraft.activity]
        : nextDraft.activity,
    }
    setArticles((current) => exists
      ? current.map((article) => article.id === next.id ? next : article)
      : [next, ...current])
    setDraft(next)
    setMessage("")
    if (close) setEditorOpen(false)
    return true
  }
  const transition = (article: Article, status: ArticleStatus, scheduledAt?: string) => {
    if (!canTransition(article.status, status)) return
    if (status === "scheduled" && (!scheduledAt || new Date(scheduledAt).getTime() <= Date.now())) {
      if (article.id === draft.id) setMessage("Choose a future date and time before scheduling.")
      return
    }
    const now = new Date().toISOString()
    const verb = status === "in_review" ? "Submitted for review"
      : status === "published" ? "Published"
      : status === "scheduled" ? `Scheduled for ${formatDate(scheduledAt, true)}`
      : status === "archived" ? "Archived"
      : article.status === "published" ? "Unpublished to draft"
      : "Restored to draft"
    const next: Article = {
      ...article, status, updatedAt: now,
      scheduledAt: status === "scheduled" ? scheduledAt : undefined,
      publishedAt: status === "published" ? now : article.publishedAt,
      activity: [{ id: createId("activity"), label: verb, at: now }, ...article.activity],
    }
    setArticles((current) => current.map((item) => item.id === article.id ? next : item))
    if (draft.id === article.id) setDraft(next)
    if (detailArticle?.id === article.id) setDetailArticle(next)
    setMessage("")
  }
  const duplicate = (article: Article) => {
    const now = new Date().toISOString()
    const copy: Article = {
      ...article, id: createId("article"), title: `${article.title} (Copy)`,
      slug: uniqueSlug(`${article.slug}-copy`, articles), status: "draft",
      publishedAt: undefined, scheduledAt: undefined, updatedAt: now,
      activity: [{ id: createId("activity"), label: `Duplicated from “${article.title}”`, at: now }],
    }
    setArticles((current) => [copy, ...current])
  }
  const confirmDelete = () => {
    if (!deleteArticle) return
    const index = articles.findIndex((article) => article.id === deleteArticle.id)
    setDeletedSnapshot({ article: deleteArticle, index })
    setArticles((current) => current.filter((article) => article.id !== deleteArticle.id))
    setSelectedIds((current) => current.filter((id) => id !== deleteArticle.id))
    setDeleteArticle(null)
  }
  const undoDelete = () => {
    if (!deletedSnapshot) return
    setArticles((current) => {
      if (current.some((article) => article.id === deletedSnapshot.article.id)) return current
      const restored = [...current]
      restored.splice(Math.max(0, deletedSnapshot.index), 0, deletedSnapshot.article)
      return restored
    })
    setDeletedSnapshot(null)
  }
  const exportCsv = () => {
    const rows = [
      ["ID", "Title", "Slug", "Author", "Category", "Tags", "Status", "Published", "Scheduled", "Updated"],
      ...filtered.map((article) => [
        article.id, article.title, article.slug, article.author, article.category, article.tags.join("|"),
        STATUS_LABEL[article.status], article.publishedAt || "", article.scheduledAt || "", article.updatedAt,
      ]),
    ]
    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n")
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "editorial-content.csv"
    anchor.click()
    URL.revokeObjectURL(url)
  }
  const showPreview = (article: Article) => {
    setPreviewArticle(article)
    setPreviewOpen(true)
  }
  const renderActions = (article: Article) => (
    <>
      <DropdownMenuLabel>Article actions</DropdownMenuLabel>
      <DropdownMenuItem className="cursor-pointer" onSelect={() => setDetailArticle(article)}><EyeIcon /> View details</DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" onSelect={() => openEdit(article)}><Edit3Icon /> Edit</DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" onSelect={() => showPreview(article)}><FileTextIcon /> Reader preview</DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" onSelect={() => duplicate(article)}><CopyIcon /> Duplicate</DropdownMenuItem>
      <DropdownMenuSeparator />
      {article.status === "draft" ? <DropdownMenuItem className="cursor-pointer" onSelect={() => transition(article, "in_review")}><SendIcon /> Submit review</DropdownMenuItem> : null}
      {article.status === "in_review" ? (
        <>
          <DropdownMenuItem className="cursor-pointer" onSelect={() => transition(article, "published")}><CheckIcon /> Publish now</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onSelect={() => openEdit(article)}><CalendarClockIcon /> Schedule…</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onSelect={() => transition(article, "draft")}><RotateCcwIcon /> Return to draft</DropdownMenuItem>
        </>
      ) : null}
      {article.status === "scheduled" ? <DropdownMenuItem className="cursor-pointer" onSelect={() => transition(article, "published")}><CheckIcon /> Simulate publish</DropdownMenuItem> : null}
      {article.status === "published" ? (
        <>
          <DropdownMenuItem className="cursor-pointer" onSelect={() => transition(article, "draft")}><RotateCcwIcon /> Unpublish</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onSelect={() => transition(article, "archived")}><ArchiveIcon /> Archive</DropdownMenuItem>
        </>
      ) : null}
      {article.status === "archived" ? <DropdownMenuItem className="cursor-pointer" onSelect={() => transition(article, "draft")}><RotateCcwIcon /> Restore</DropdownMenuItem> : null}
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onSelect={() => setDeleteArticle(article)}><Trash2Icon /> Delete</DropdownMenuItem>
    </>
  )

  const scheduledForSelectedDay = articles.filter((article) =>
    article.status === "scheduled" && dateKey(article.scheduledAt) === dateKey(selectedDay?.toISOString())
  )
  const scheduledDays = articles
    .filter((article) => article.status === "scheduled" && article.scheduledAt)
    .map((article) => new Date(article.scheduledAt as string))

  return (
    <div className={cn("w-full min-w-0", className)} {...props}>
      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="space-y-5 border-b border-border/70 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-start">
              <h2 className="text-2xl font-semibold tracking-tight">Content</h2>
              <p className="mt-1 text-sm text-muted-foreground">Create, edit, schedule, publish, and delete articles.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" className="cursor-pointer gap-2" onClick={exportCsv}><DownloadIcon className="size-4" /> Export</Button>
              <Button type="button" className="cursor-pointer gap-2" onClick={openNew}><PlusIcon className="size-4" /> New Article</Button>
            </div>
          </div>
        </div>

        {deletedSnapshot ? (
          <div className="px-4 pt-4 sm:px-6">
            <Alert>
              <RotateCcwIcon className="size-4" />
              <AlertTitle>Article deleted</AlertTitle>
              <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
                <span>“{deletedSnapshot.article.title}” was removed.</span>
                <Button type="button" size="sm" variant="outline" className="cursor-pointer" onClick={undoDelete}>Undo delete</Button>
              </AlertDescription>
            </Alert>
          </div>
        ) : null}

        <Tabs defaultValue="table" className="w-full">
          <div className="px-4 pt-5 sm:px-6">
            <TabsList>
              <TabsTrigger value="table" className="cursor-pointer">Content Table</TabsTrigger>
              <TabsTrigger value="calendar" className="cursor-pointer">Editorial Calendar</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="table" className="mt-0">
            <div className="space-y-3 border-b border-border/70 p-4 sm:p-6">
              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_160px_160px_160px_auto]">
                <div className="relative">
                  <SearchIcon className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search title, tag, or slug…" className="ps-9" aria-label="Search articles" />
                </div>
                <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); setPage(1) }}>
                  <SelectTrigger className="w-full cursor-pointer"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All statuses</SelectItem>{Object.entries(STATUS_LABEL).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={authorFilter} onValueChange={(value) => { setAuthorFilter(value); setPage(1) }}>
                  <SelectTrigger className="w-full cursor-pointer"><SelectValue placeholder="Author" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All authors</SelectItem>{AUTHORS.map((author) => <SelectItem key={author} value={author}>{author}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={(value) => { setCategoryFilter(value); setPage(1) }}>
                  <SelectTrigger className="w-full cursor-pointer"><SelectValue placeholder="Category" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All categories</SelectItem>{CATEGORIES.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}</SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" className="cursor-pointer justify-start gap-2">
                      <CalendarClockIcon className="size-4" /> {updatedAfter ? `Since ${formatDate(updatedAfter.toISOString())}` : "Updated date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-auto p-2">
                    <Calendar mode="single" selected={updatedAfter} onSelect={(value) => { setUpdatedAfter(value); setPage(1) }} />
                    {updatedAfter ? <Button type="button" variant="ghost" size="sm" className="mt-1 w-full cursor-pointer" onClick={() => { setUpdatedAfter(undefined); setPage(1) }}>Clear date</Button> : null}
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-sm text-muted-foreground">{filtered.length} article{filtered.length === 1 ? "" : "s"} found</p>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12">
                      <Checkbox checked={allVisibleSelected} onCheckedChange={(checked) => setSelectedIds((current) => checked
                        ? Array.from(new Set([...current, ...visibleArticles.map((article) => article.id)]))
                        : current.filter((id) => !visibleArticles.some((article) => article.id === id)))} aria-label="Select visible articles" />
                    </TableHead>
                    <TableHead className="min-w-75">Article</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="w-14"><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleArticles.length ? visibleArticles.map((article) => (
                    <TableRow key={article.id} data-state={selectedIds.includes(article.id) ? "selected" : undefined}>
                      <TableCell><Checkbox checked={selectedIds.includes(article.id)} onCheckedChange={(checked) => setSelectedIds((current) => checked ? [...current, article.id] : current.filter((id) => id !== article.id))} aria-label={`Select ${article.title}`} /></TableCell>
                      <TableCell>
                        <button type="button" className="flex cursor-pointer items-center gap-3 text-start" onClick={() => setDetailArticle(article)}>
                          <img src={article.featuredImage} alt="" className="size-14 shrink-0 rounded-lg border border-border/70 object-cover" />
                          <span className="min-w-0">
                            <span className="block max-w-72 truncate font-medium">{article.title}</span>
                            <span className="block max-w-72 truncate text-xs text-muted-foreground">/{article.slug}</span>
                          </span>
                        </button>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{article.author}</TableCell>
                      <TableCell>{article.category}</TableCell>
                      <TableCell><StatusBadge status={article.status} /></TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(article.publishedAt || article.scheduledAt)}</TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(article.updatedAt)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button type="button" variant="ghost" size="icon-sm" className="cursor-pointer" aria-label={`Actions for ${article.title}`}><MoreHorizontalIcon className="size-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-52">{renderActions(article)}</DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow className="hover:bg-transparent"><TableCell colSpan={8} className="h-40 text-center text-muted-foreground">No articles match these filters.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col gap-3 border-t border-border/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</p>
              <Pagination className="mx-0 w-auto">
                <PaginationContent>
                  <PaginationItem><PaginationLink href="#" size="icon" className="cursor-pointer" aria-label="Previous page" aria-disabled={currentPage === 1} onClick={(event) => { event.preventDefault(); setPage(Math.max(1, currentPage - 1)) }}><ChevronLeftIcon className="size-4" /></PaginationLink></PaginationItem>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => <PaginationItem key={number}><PaginationLink href="#" className="cursor-pointer" isActive={currentPage === number} onClick={(event) => { event.preventDefault(); setPage(number) }}>{number}</PaginationLink></PaginationItem>)}
                  <PaginationItem><PaginationLink href="#" size="icon" className="cursor-pointer" aria-label="Next page" aria-disabled={currentPage === totalPages} onClick={(event) => { event.preventDefault(); setPage(Math.min(totalPages, currentPage + 1)) }}><ChevronRightIcon className="size-4" /></PaginationLink></PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-0 p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
              <div className="w-fit rounded-[12px] border border-border/70 bg-background p-2">
                <Calendar mode="single" selected={selectedDay} onSelect={setSelectedDay} modifiers={{ scheduled: scheduledDays }} modifiersClassNames={{ scheduled: "font-semibold text-primary underline decoration-2 underline-offset-4" }} />
              </div>
              <div className="rounded-[12px] border border-border/70 bg-background p-4 text-start sm:p-5">
                <h3 className="font-semibold">{selectedDay ? formatDate(selectedDay.toISOString()) : "Select a date"}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Scheduled stories for this day.</p>
                <div className="mt-5 space-y-3">
                  {scheduledForSelectedDay.length ? scheduledForSelectedDay.map((article) => (
                    <button key={article.id} type="button" className="flex w-full cursor-pointer items-center gap-3 rounded-[12px] border border-border/70 p-3 text-start hover:bg-muted/50" onClick={() => setDetailArticle(article)}>
                      <img src={article.featuredImage} alt="" className="size-16 rounded-lg object-cover" />
                      <span className="min-w-0 flex-1"><span className="block font-medium">{article.title}</span><span className="mt-1 block text-sm text-muted-foreground">{formatDate(article.scheduledAt, true)} · {article.author}</span></span>
                      <StatusBadge status={article.status} />
                    </button>
                  )) : <div className="rounded-[12px] border border-dashed border-border/70 p-8 text-center text-sm text-muted-foreground">Nothing scheduled for this day.</div>}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Sheet open={editorOpen} onOpenChange={setEditorOpen}>
        <SheetContent side="end" className="w-full gap-0 p-0 sm:max-w-3xl">
          <SheetHeader className="border-b border-border/70 px-5 py-4 pe-12">
            <SheetTitle>{articles.some((article) => article.id === draft.id) ? "Edit article" : "New article"}</SheetTitle>
            <SheetDescription>Write, organize, preview, and move this story through publishing.</SheetDescription>
          </SheetHeader>
          <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-7 p-5">
              {message ? <Alert variant="destructive"><AlertTitle>Cannot continue</AlertTitle><AlertDescription>{message}</AlertDescription></Alert> : null}
              <section className="space-y-4">
                <div><h3 className="font-semibold">Content</h3><p className="text-sm text-muted-foreground">The story readers will see.</p></div>
                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel htmlFor="article-title">Title</FieldLabel>
                    <Input id="article-title" value={draft.title} onChange={(event) => {
                      const title = event.target.value
                      patchDraft({ title, ...(!slugTouched ? { slug: slugify(title) } : {}) })
                    }} placeholder="Give the story a clear title" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="article-slug">Slug</FieldLabel>
                    <div className="flex items-center rounded-md border border-border/70 bg-background ps-3 focus-within:ring-2 focus-within:ring-ring/50">
                      <span className="text-sm text-muted-foreground">/</span>
                      <Input id="article-slug" value={draft.slug} onChange={(event) => { setSlugTouched(true); patchDraft({ slug: slugify(event.target.value) }) }} className="border-0 shadow-none focus-visible:ring-0" />
                    </div>
                  </Field>
                  <Field>
                    <div className="flex items-center justify-between gap-3"><FieldLabel htmlFor="article-excerpt">Excerpt</FieldLabel><span className="text-xs text-muted-foreground">{draft.excerpt.length}/180</span></div>
                    <Textarea id="article-excerpt" value={draft.excerpt} maxLength={180} onChange={(event) => patchDraft({ excerpt: event.target.value })} rows={3} placeholder="A short summary for cards and search results" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="article-body">Body</FieldLabel>
                    <Textarea id="article-body" value={draft.body} onChange={(event) => patchDraft({ body: event.target.value })} rows={12} className="font-mono text-sm leading-6" placeholder={"Write paragraphs separated by blank lines.\n\nUse **double asterisks** for bold text."} />
                    <FieldDescription>Plain text with paragraph breaks and light <code>**bold**</code> formatting.</FieldDescription>
                  </Field>
                  <Field>
                    <Label>Featured image</Label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {FEATURED_IMAGES.map((image) => (
                        <button key={image.id} type="button" className={cn("relative cursor-pointer overflow-hidden rounded-[12px] border-2", draft.featuredImage === image.src ? "border-primary" : "border-transparent")} onClick={() => patchDraft({ featuredImage: image.src })} aria-label={`Use featured image ${image.id}`}>
                          <img src={image.src} alt="" className="aspect-5/3 w-full object-cover" />
                          {draft.featuredImage === image.src ? <span className="absolute inset-e-2 top-2 rounded-full bg-primary p-1 text-primary-foreground"><CheckIcon className="size-3" /></span> : null}
                        </button>
                      ))}
                    </div>
                  </Field>
                </FieldGroup>
              </section>
              <Separator />
              <section className="space-y-4">
                <div><h3 className="font-semibold">Organization</h3><p className="text-sm text-muted-foreground">Ownership and discovery metadata.</p></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field><FieldLabel>Author</FieldLabel><Select value={draft.author} onValueChange={(author) => patchDraft({ author })}><SelectTrigger className="w-full cursor-pointer"><SelectValue /></SelectTrigger><SelectContent>{AUTHORS.map((author) => <SelectItem key={author} value={author}>{author}</SelectItem>)}</SelectContent></Select></Field>
                  <Field><FieldLabel>Category</FieldLabel><Select value={draft.category} onValueChange={(category) => patchDraft({ category })}><SelectTrigger className="w-full cursor-pointer"><SelectValue /></SelectTrigger><SelectContent>{CATEGORIES.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}</SelectContent></Select></Field>
                </div>
                <Field><FieldLabel htmlFor="article-tags">Tags</FieldLabel><Input id="article-tags" value={draft.tags.join(", ")} onChange={(event) => patchDraft({ tags: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) })} placeholder="systems, craft, research" /><FieldDescription>Separate tags with commas.</FieldDescription></Field>
              </section>
              <Separator />
              <section className="space-y-4">
                <div><h3 className="font-semibold">SEO</h3><p className="text-sm text-muted-foreground">Search title and result description.</p></div>
                <Field><div className="flex justify-between gap-3"><FieldLabel htmlFor="seo-title">SEO title</FieldLabel><span className={cn("text-xs", draft.seoTitle.length > 60 ? "text-destructive" : "text-muted-foreground")}>{draft.seoTitle.length}/60</span></div><Input id="seo-title" value={draft.seoTitle} maxLength={70} onChange={(event) => patchDraft({ seoTitle: event.target.value })} /></Field>
                <Field><div className="flex justify-between gap-3"><FieldLabel htmlFor="seo-description">SEO description</FieldLabel><span className={cn("text-xs", draft.seoDescription.length > 160 ? "text-destructive" : "text-muted-foreground")}>{draft.seoDescription.length}/160</span></div><Textarea id="seo-description" value={draft.seoDescription} maxLength={180} rows={3} onChange={(event) => patchDraft({ seoDescription: event.target.value })} /></Field>
              </section>
              <Separator />
              <section className="space-y-4">
                <div><h3 className="font-semibold">Publishing</h3><p className="text-sm text-muted-foreground">Current status: <span className="font-medium text-foreground">{STATUS_LABEL[draft.status]}</span></p></div>
                {(draft.status === "in_review" || draft.status === "scheduled") ? <Field><FieldLabel htmlFor="schedule-at">Schedule date and time</FieldLabel><Input id="schedule-at" type="datetime-local" value={draft.scheduledAt ? new Date(new Date(draft.scheduledAt).getTime() - new Date(draft.scheduledAt).getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""} onChange={(event) => patchDraft({ scheduledAt: event.target.value ? new Date(event.target.value).toISOString() : undefined })} /></Field> : null}
                <div className="flex flex-wrap gap-2">
                  {draft.status === "draft" ? <Button type="button" variant="outline" className="cursor-pointer gap-2" onClick={() => { if (saveArticle(draft, false)) transition({ ...draft, slug: uniqueSlug(draft.slug || draft.title, articles, draft.id) }, "in_review") }}><SendIcon className="size-4" /> Submit review</Button> : null}
                  {draft.status === "in_review" ? <>
                    <Button type="button" className="cursor-pointer gap-2" onClick={() => { if (saveArticle(draft, false)) transition(draft, "published") }}><CheckIcon className="size-4" /> Publish now</Button>
                    <Button type="button" variant="outline" className="cursor-pointer gap-2" onClick={() => { if (saveArticle(draft, false)) transition(draft, "scheduled", draft.scheduledAt) }}><CalendarClockIcon className="size-4" /> Schedule</Button>
                    <Button type="button" variant="ghost" className="cursor-pointer" onClick={() => transition(draft, "draft")}>Return to draft</Button>
                  </> : null}
                  {draft.status === "scheduled" ? <Button type="button" className="cursor-pointer gap-2" onClick={() => transition(draft, "published")}><CheckIcon className="size-4" /> Simulate publish</Button> : null}
                  {draft.status === "published" ? <>
                    <Button type="button" variant="outline" className="cursor-pointer" onClick={() => transition(draft, "draft")}>Unpublish</Button>
                    <Button type="button" variant="outline" className="cursor-pointer gap-2" onClick={() => transition(draft, "archived")}><ArchiveIcon className="size-4" /> Archive</Button>
                  </> : null}
                  {draft.status === "archived" ? <Button type="button" variant="outline" className="cursor-pointer gap-2" onClick={() => transition(draft, "draft")}><RotateCcwIcon className="size-4" /> Restore draft</Button> : null}
                </div>
              </section>
            </div>
          </ScrollArea>
          <SheetFooter className="flex-row border-t border-border/70 bg-background p-4">
            <Button type="button" variant="outline" className="cursor-pointer" onClick={() => showPreview(draft)}>Reader Preview</Button>
            <div className="ms-auto flex gap-2">
              <Button type="button" variant="ghost" className="cursor-pointer" onClick={() => setEditorOpen(false)}>Cancel</Button>
              <Button type="button" className="cursor-pointer" onClick={() => saveArticle()}>{draft.status === "draft" ? "Save draft" : "Save changes"}</Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden p-0">
          <DialogHeader className="border-b border-border/70 px-6 py-4 pe-12"><DialogTitle>Reader preview</DialogTitle><DialogDescription>This is how the current article content will read.</DialogDescription></DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-88px)] p-6">{previewArticle ? <ReaderArticle article={previewArticle} /> : null}</ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(detailArticle)} onOpenChange={(open) => !open && setDetailArticle(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden p-0">
          <DialogHeader className="border-b border-border/70 px-6 py-4 pe-12"><DialogTitle>Article details</DialogTitle><DialogDescription>Content metadata and editorial activity.</DialogDescription></DialogHeader>
          {detailArticle ? <ScrollArea className="max-h-[calc(90vh-88px)]">
            <div className="space-y-6 p-6 text-start">
              <img src={detailArticle.featuredImage} alt="" className="aspect-5/2 w-full rounded-[12px] object-cover" />
              <div><div className="mb-2 flex flex-wrap items-center gap-2"><StatusBadge status={detailArticle.status} /><Badge variant="secondary">{detailArticle.category}</Badge></div><h3 className="text-2xl font-semibold">{detailArticle.title}</h3><p className="mt-2 text-muted-foreground">{detailArticle.excerpt}</p></div>
              <div className="grid gap-3 rounded-[12px] border border-border/70 bg-muted/20 p-4 sm:grid-cols-2">
                <div><p className="text-xs text-muted-foreground">Author</p><p className="mt-1 text-sm font-medium">{detailArticle.author}</p></div>
                <div><p className="text-xs text-muted-foreground">Updated</p><p className="mt-1 text-sm font-medium">{formatDate(detailArticle.updatedAt, true)}</p></div>
                <div><p className="text-xs text-muted-foreground">Published</p><p className="mt-1 text-sm font-medium">{formatDate(detailArticle.publishedAt, true)}</p></div>
                <div><p className="text-xs text-muted-foreground">Scheduled</p><p className="mt-1 text-sm font-medium">{formatDate(detailArticle.scheduledAt, true)}</p></div>
              </div>
              <div><h4 className="font-semibold">Activity</h4><div className="mt-3 space-y-3">{detailArticle.activity.map((item) => <div key={item.id} className="flex gap-3"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" /><div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{formatDate(item.at, true)}</p></div></div>)}</div></div>
              <div className="flex flex-wrap gap-2"><Button type="button" className="cursor-pointer" onClick={() => { setDetailArticle(null); openEdit(detailArticle) }}>Edit article</Button><Button type="button" variant="outline" className="cursor-pointer" onClick={() => showPreview(detailArticle)}>Reader preview</Button></div>
            </div>
          </ScrollArea> : null}
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deleteArticle)} onOpenChange={(open) => !open && setDeleteArticle(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete this article?</AlertDialogTitle><AlertDialogDescription>“{deleteArticle?.title}” will be removed from the content table. You can undo this action from the notice that appears afterward.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel><AlertDialogAction className="cursor-pointer bg-destructive text-white hover:bg-destructive/90" onClick={confirmDelete}>Delete article</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
