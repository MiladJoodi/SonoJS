"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  InboxIcon,
  MailIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  SearchIcon,
  SendIcon,
  ShieldAlertIcon,
  Trash2Icon,
  UserCheckIcon,
  XCircleIcon,
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
  AlertDialogTrigger,
} from "@sonojs/ui/components/alert-dialog"
import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { ScrollArea } from "@sonojs/ui/components/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

type Priority = "low" | "normal" | "high" | "urgent"
type Status = "open" | "in_progress" | "waiting" | "resolved" | "closed"
type Agent = { id: string; name: string; initials: string }
type Message = {
  id: string
  author: "customer" | "agent" | "system"
  agentName?: string
  body: string
  at: string
  internal: boolean
  unread?: boolean
}
type Ticket = {
  id: string
  subject: string
  customer: { name: string; email: string }
  status: Status
  priority: Priority
  assigneeId: string | null
  category: string
  createdAt: string
  updatedAt: string
  slaDeadline: string
  messages: Message[]
}
type View = "all" | "unassigned" | "mine" | "open" | "waiting" | "resolved" | "priority"
type DeletedTicket = { ticket: Ticket; index: number }

const DEMO_NOW = new Date("2026-10-30T12:00:00Z")
const AGENTS: Agent[] = [
  { id: "a1", name: "Alex Rivera", initials: "AR" },
  { id: "a2", name: "Maya Chen", initials: "MC" },
  { id: "a3", name: "Jordan Lee", initials: "JL" },
]

const SEED_TICKETS: Ticket[] = [
  {
    id: "SUP-1842",
    subject: "Unable to export October invoices",
    customer: { name: "Olivia Martin", email: "olivia@northstar.co" },
    status: "open",
    priority: "urgent",
    assigneeId: null,
    category: "Billing",
    createdAt: "2026-10-30T07:18:00Z",
    updatedAt: "2026-10-30T11:42:00Z",
    slaDeadline: "2026-10-30T11:00:00Z",
    messages: [
      { id: "m-1", author: "customer", body: "Invoice export fails at 80%. We need the file today.", at: "2026-10-30T07:18:00Z", internal: false, unread: true },
    ],
  },
  {
    id: "SUP-1839",
    subject: "SSO redirect loops after login",
    customer: { name: "Noah Williams", email: "noah@atlas.dev" },
    status: "in_progress",
    priority: "high",
    assigneeId: "a1",
    category: "Authentication",
    createdAt: "2026-10-30T05:30:00Z",
    updatedAt: "2026-10-30T10:54:00Z",
    slaDeadline: "2026-10-30T14:30:00Z",
    messages: [
      { id: "m-2", author: "customer", body: "Okta users bounce back to sign-in.", at: "2026-10-30T05:30:00Z", internal: false },
      { id: "m-3", author: "agent", agentName: "Alex Rivera", body: "Reproducing now — checking the callback URL.", at: "2026-10-30T08:12:00Z", internal: false },
      { id: "m-4", author: "agent", agentName: "Alex Rivera", body: "Callback mismatch on the staging tenant.", at: "2026-10-30T10:54:00Z", internal: true },
    ],
  },
  {
    id: "SUP-1835",
    subject: "Webhook deliveries delayed",
    customer: { name: "Priya Shah", email: "priya@relay.io" },
    status: "waiting",
    priority: "normal",
    assigneeId: "a2",
    category: "API",
    createdAt: "2026-10-29T18:20:00Z",
    updatedAt: "2026-10-30T09:25:00Z",
    slaDeadline: "2026-10-31T02:00:00Z",
    messages: [
      { id: "m-5", author: "customer", body: "Events arrive about ten minutes late.", at: "2026-10-29T18:20:00Z", internal: false },
      { id: "m-6", author: "agent", agentName: "Maya Chen", body: "Please send one affected event ID.", at: "2026-10-30T09:25:00Z", internal: false },
    ],
  },
  {
    id: "SUP-1828",
    subject: "Team member cannot access workspace",
    customer: { name: "Ethan Brown", email: "ethan@fieldwork.app" },
    status: "resolved",
    priority: "normal",
    assigneeId: "a1",
    category: "Access",
    createdAt: "2026-10-28T16:10:00Z",
    updatedAt: "2026-10-29T08:15:00Z",
    slaDeadline: "2026-10-29T12:00:00Z",
    messages: [
      { id: "m-7", author: "customer", body: "Invitee sees access denied after accepting.", at: "2026-10-28T16:10:00Z", internal: false },
      { id: "m-8", author: "agent", agentName: "Alex Rivera", body: "Invite used an old email alias — fixed.", at: "2026-10-29T08:15:00Z", internal: false },
    ],
  },
]

const STATUS_LABEL: Record<Status, string> = {
  open: "Open",
  in_progress: "In progress",
  waiting: "Waiting",
  resolved: "Resolved",
  closed: "Closed",
}
const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
}

function agentFor(id: string | null) {
  return AGENTS.find((agent) => agent.id === id)
}

function formatDate(value: string, includeTime = true) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(includeTime ? { hour: "numeric", minute: "2-digit" } : {}),
    timeZone: "UTC",
  }).format(new Date(value))
}

function relativeUpdated(value: string) {
  const minutes = Math.max(0, Math.round((DEMO_NOW.getTime() - new Date(value).getTime()) / 60_000))
  if (minutes < 60) return `${minutes}m`
  if (minutes < 1_440) return `${Math.round(minutes / 60)}h`
  return `${Math.round(minutes / 1_440)}d`
}

function slaFor(ticket: Ticket) {
  const deadline = new Date(ticket.slaDeadline).getTime()
  if (ticket.status === "resolved" || ticket.status === "closed") {
    return new Date(ticket.updatedAt).getTime() <= deadline
      ? { label: "Met", tone: "met" as const }
      : { label: "Breached", tone: "breached" as const }
  }
  const remaining = deadline - DEMO_NOW.getTime()
  if (remaining <= 0) return { label: "Breached", tone: "breached" as const }
  const hours = Math.ceil(remaining / 3_600_000)
  if (remaining < 4 * 3_600_000) return { label: `At risk · ${hours}h`, tone: "risk" as const }
  return { label: `${hours}h remaining`, tone: "remaining" as const }
}

function statusTone(status: Status) {
  if (status === "resolved") return "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
  if (status === "closed") return "border-transparent bg-muted text-muted-foreground"
  if (status === "waiting") return "border-transparent bg-amber-500/10 text-amber-700 dark:text-amber-400"
  if (status === "in_progress") return "border-transparent bg-sky-500/10 text-sky-700 dark:text-sky-400"
  return "border-transparent bg-primary/10 text-primary"
}

function priorityTone(priority: Priority) {
  if (priority === "urgent") return "border-transparent bg-rose-500/10 text-rose-700 dark:text-rose-400"
  if (priority === "high") return "border-transparent bg-orange-500/10 text-orange-700 dark:text-orange-400"
  return "border-border/70 text-muted-foreground"
}

function canTransition(from: Status, to: Status) {
  if (from === to) return true
  if (to === "closed") return true
  if (from === "open") return to === "in_progress"
  if (from === "in_progress") return to === "waiting" || to === "resolved"
  if (from === "waiting") return to === "in_progress"
  if (from === "resolved") return to === "open"
  return from === "closed" && to === "open"
}

export default function CrudManagement05({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [tickets, setTickets] = React.useState<Ticket[]>(SEED_TICKETS)
  const [activeId, setActiveId] = React.useState(SEED_TICKETS[0].id)
  const [view, setView] = React.useState<View>("all")
  const [search, setSearch] = React.useState("")
  const [priorityFilter, setPriorityFilter] = React.useState<Priority | "all">("all")
  const [statusFilter, setStatusFilter] = React.useState<Status | "all">("all")
  const [selected, setSelected] = React.useState<string[]>([])
  const [mobileDetail, setMobileDetail] = React.useState(false)
  const [composerMode, setComposerMode] = React.useState<"reply" | "note">("reply")
  const [draft, setDraft] = React.useState("")
  const [deleted, setDeleted] = React.useState<DeletedTicket | null>(null)

  const activeTicket = tickets.find((ticket) => ticket.id === activeId) ?? null

  React.useEffect(() => {
    if (!deleted) return
    const timer = window.setTimeout(() => setDeleted(null), 7000)
    return () => window.clearTimeout(timer)
  }, [deleted])

  const matchesView = React.useCallback((ticket: Ticket, target: View) => {
    if (target === "unassigned") return ticket.assigneeId === null
    if (target === "mine") return ticket.assigneeId === "a1"
    if (target === "open") return ticket.status === "open" || ticket.status === "in_progress"
    if (target === "waiting") return ticket.status === "waiting"
    if (target === "resolved") return ticket.status === "resolved"
    if (target === "priority") return ticket.priority === "high" || ticket.priority === "urgent"
    return true
  }, [])

  const visibleTickets = React.useMemo(() => {
    const needle = search.trim().toLowerCase()
    return tickets.filter((ticket) => {
      const messagePreview = ticket.messages.at(-1)?.body ?? ""
      const matchesSearch = !needle || [
        ticket.id,
        ticket.subject,
        ticket.customer.name,
        ticket.customer.email,
        messagePreview,
      ].some((value) => value.toLowerCase().includes(needle))
      return matchesView(ticket, view)
        && matchesSearch
        && (priorityFilter === "all" || ticket.priority === priorityFilter)
        && (statusFilter === "all" || ticket.status === statusFilter)
    })
  }, [matchesView, priorityFilter, search, statusFilter, tickets, view])

  const viewItems: Array<{ id: View; label: string }> = [
    { id: "all", label: "All tickets" },
    { id: "unassigned", label: "Unassigned" },
    { id: "mine", label: "My tickets" },
    { id: "open", label: "Open" },
    { id: "waiting", label: "Pending" },
    { id: "resolved", label: "Resolved" },
    { id: "priority", label: "High priority" },
  ]

  const updateTicket = (id: string, updater: (ticket: Ticket) => Ticket) => {
    setTickets((current) => current.map((ticket) => ticket.id === id ? updater(ticket) : ticket))
  }

  const addSystemMessage = (ticket: Ticket, body: string): Ticket => ({
    ...ticket,
    updatedAt: DEMO_NOW.toISOString(),
    messages: [...ticket.messages, {
      id: `msg-${ticket.id}-${ticket.messages.length + 1}`,
      author: "system",
      body,
      at: DEMO_NOW.toISOString(),
      internal: true,
    }],
  })

  const changeStatus = (id: string, status: Status) => {
    updateTicket(id, (ticket) => canTransition(ticket.status, status)
      ? addSystemMessage({ ...ticket, status }, `Status changed to ${STATUS_LABEL[status]}.`)
      : ticket)
  }

  const assignTicket = (id: string, assigneeId: string | null) => {
    updateTicket(id, (ticket) => {
      const name = agentFor(assigneeId)?.name ?? "Unassigned"
      return addSystemMessage({ ...ticket, assigneeId }, `Assigned to ${name}.`)
    })
  }

  const sendMessage = () => {
    const body = draft.trim()
    if (!activeTicket || !body) return
    updateTicket(activeTicket.id, (ticket) => ({
      ...ticket,
      status: ticket.status === "open" ? "in_progress" : ticket.status,
      updatedAt: DEMO_NOW.toISOString(),
      messages: [...ticket.messages, {
        id: `msg-${ticket.id}-${ticket.messages.length + 1}`,
        author: "agent",
        agentName: "Alex Rivera",
        body,
        at: DEMO_NOW.toISOString(),
        internal: composerMode === "note",
      }],
    }))
    setDraft("")
  }

  const escalate = (id: string) => {
    updateTicket(id, (ticket) => addSystemMessage(
      { ...ticket, priority: ticket.priority === "urgent" ? "urgent" : "high", assigneeId: ticket.assigneeId ?? "a1" },
      "Escalated for priority review by Alex Rivera."
    ))
  }

  const deleteTicket = (id: string) => {
    setTickets((current) => {
      const index = current.findIndex((ticket) => ticket.id === id)
      if (index < 0) return current
      setDeleted({ ticket: current[index], index })
      return current.filter((ticket) => ticket.id !== id)
    })
    setSelected((current) => current.filter((ticketId) => ticketId !== id))
    const remaining = tickets.filter((ticket) => ticket.id !== id)
    setActiveId(remaining[0]?.id ?? "")
    setMobileDetail(false)
  }

  const undoDelete = () => {
    if (!deleted) return
    setTickets((current) => {
      const next = [...current]
      next.splice(Math.min(deleted.index, next.length), 0, deleted.ticket)
      return next
    })
    setActiveId(deleted.ticket.id)
    setDeleted(null)
  }

  const applyBulk = (operation: "resolve" | "status" | "priority" | "assignee", value?: string) => {
    const ids = new Set(selected)
    setTickets((current) => current.map((ticket) => {
      if (!ids.has(ticket.id)) return ticket
      if (operation === "assignee") return addSystemMessage({ ...ticket, assigneeId: value || null }, `Bulk assigned to ${agentFor(value || null)?.name ?? "Unassigned"}.`)
      if (operation === "priority") return addSystemMessage({ ...ticket, priority: value as Priority }, `Bulk priority changed to ${PRIORITY_LABEL[value as Priority]}.`)
      const nextStatus = operation === "resolve" ? "resolved" : value as Status
      return canTransition(ticket.status, nextStatus)
        ? addSystemMessage({ ...ticket, status: nextStatus }, `Bulk status changed to ${STATUS_LABEL[nextStatus]}.`)
        : ticket
    }))
    setSelected([])
  }

  const openTicket = (id: string) => {
    setActiveId(id)
    setMobileDetail(true)
    updateTicket(id, (ticket) => ({
      ...ticket,
      messages: ticket.messages.map((message) => ({ ...message, unread: false })),
    }))
  }

  const allVisibleSelected = visibleTickets.length > 0 && visibleTickets.every((ticket) => selected.includes(ticket.id))

  return (
    <div className={cn("relative w-full min-w-0 space-y-5", className)} {...props}>
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-start">
          <h2 className="text-2xl font-semibold tracking-tight">Tickets</h2>
          <p className="mt-1 text-sm text-muted-foreground">Reply, assign, update status, and delete tickets.</p>
        </div>
      </header>

      {deleted ? (
        <Alert>
          <Trash2Icon aria-hidden />
          <AlertTitle>Ticket deleted</AlertTitle>
          <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
            <span>{deleted.ticket.id} was removed.</span>
            <Button type="button" variant="outline" size="sm" className="cursor-pointer" onClick={undoDelete}>
              Undo
            </Button>
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid h-[min(640px,70svh)] min-h-120 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-[minmax(0,320px)_1fr]">
        <section className={cn("min-h-0 flex-col border-e border-border/70", mobileDetail ? "hidden lg:flex" : "flex")} aria-label="Ticket list">
          <div className="space-y-3 border-b border-border/70 p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="relative min-w-0 flex-1">
                <SearchIcon className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input value={search} onChange={(event) => setSearch(event.target.value)} className="h-10 ps-9" placeholder="Search tickets…" aria-label="Search tickets" />
              </div>
              <Checkbox
                checked={allVisibleSelected ? true : selected.some((id) => visibleTickets.some((ticket) => ticket.id === id)) ? "indeterminate" : false}
                onCheckedChange={(checked) => setSelected(checked === true ? visibleTickets.map((ticket) => ticket.id) : [])}
                aria-label="Select all visible tickets"
              />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Select value={view} onValueChange={(value) => setView(value as View)}>
                <SelectTrigger size="sm" className="w-full cursor-pointer" aria-label="Ticket view"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {viewItems.map((item) => (
                    <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as Status | "all")}>
                <SelectTrigger size="sm" className="w-full cursor-pointer" aria-label="Filter by status"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {(Object.keys(STATUS_LABEL) as Status[]).map((status) => <SelectItem key={status} value={status}>{STATUS_LABEL[status]}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as Priority | "all")}>
                <SelectTrigger size="sm" className="w-full cursor-pointer" aria-label="Filter by priority"><SelectValue placeholder="Priority" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All priorities</SelectItem>
                  {(Object.keys(PRIORITY_LABEL) as Priority[]).map((priority) => <SelectItem key={priority} value={priority}>{PRIORITY_LABEL[priority]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selected.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1 border-b border-border/70 bg-primary/5 p-2">
              <Badge variant="secondary">{selected.length} selected</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button type="button" variant="ghost" size="xs" className="cursor-pointer">Assign <ChevronDownIcon aria-hidden /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onSelect={() => applyBulk("assignee", "")}>Unassigned</DropdownMenuItem>
                  {AGENTS.map((agent) => <DropdownMenuItem key={agent.id} onSelect={() => applyBulk("assignee", agent.id)}>{agent.name}</DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button type="button" variant="ghost" size="xs" className="cursor-pointer">Priority <ChevronDownIcon aria-hidden /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {(Object.keys(PRIORITY_LABEL) as Priority[]).map((priority) => <DropdownMenuItem key={priority} onSelect={() => applyBulk("priority", priority)}>{PRIORITY_LABEL[priority]}</DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button type="button" variant="ghost" size="xs" className="cursor-pointer">Status <ChevronDownIcon aria-hidden /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {(Object.keys(STATUS_LABEL) as Status[]).filter((status) => status !== "closed").map((status) => <DropdownMenuItem key={status} onSelect={() => applyBulk("status", status)}>{STATUS_LABEL[status]}</DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button type="button" variant="ghost" size="xs" className="cursor-pointer" onClick={() => applyBulk("resolve")}>Resolve</Button>
            </div>
          ) : null}

          <ScrollArea className="min-h-0 flex-1">
            {visibleTickets.length ? (
              <ul>
                {visibleTickets.map((ticket) => {
                  const assignee = agentFor(ticket.assigneeId)
                  const preview = ticket.messages.at(-1)?.body ?? ""
                  const unread = ticket.messages.some((message) => message.unread)
                  return (
                    <li key={ticket.id} className="border-b border-border/70 last:border-b-0">
                      <div className={cn("group relative flex cursor-pointer gap-3 p-3 hover:bg-muted/40", activeId === ticket.id && "bg-primary/5")}>
                        <Checkbox
                          checked={selected.includes(ticket.id)}
                          onCheckedChange={(checked) => setSelected((current) => checked === true ? [...current, ticket.id] : current.filter((id) => id !== ticket.id))}
                          onClick={(event) => event.stopPropagation()}
                          aria-label={`Select ${ticket.id}`}
                          className="mt-1"
                        />
                        <button type="button" className="min-w-0 flex-1 cursor-pointer text-start" onClick={() => openTicket(ticket.id)}>
                          <div className="flex items-start gap-2">
                            <Avatar size="sm">
                              <AvatarFallback>{ticket.customer.name.split(" ").map((part) => part[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className={cn("truncate text-sm", unread ? "font-semibold" : "font-medium")}>{ticket.customer.name}</span>
                                {unread ? <span className="size-2 shrink-0 rounded-full bg-primary" aria-label="Unread" /> : null}
                                <span className="ms-auto shrink-0 text-[11px] text-muted-foreground">{relativeUpdated(ticket.updatedAt)}</span>
                              </div>
                              <p className={cn("mt-1 truncate text-sm", unread && "font-medium")}>{ticket.subject}</p>
                              <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{preview}</p>
                              <div className="mt-2 flex flex-wrap items-center gap-1">
                                <Badge variant="outline" className={cn("rounded-full text-[10px]", priorityTone(ticket.priority))}>{PRIORITY_LABEL[ticket.priority]}</Badge>
                                <Badge variant="outline" className={cn("rounded-full text-[10px]", statusTone(ticket.status))}>{STATUS_LABEL[ticket.status]}</Badge>
                                <span className="ms-auto text-[10px] text-muted-foreground">{assignee?.initials ?? "Unassigned"}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="flex h-48 flex-col items-center justify-center px-6 text-center">
                <InboxIcon className="mb-2 size-8 text-muted-foreground" aria-hidden />
                <p className="text-sm font-medium">No tickets found</p>
                <p className="text-xs text-muted-foreground">Try another view or clear a filter.</p>
              </div>
            )}
          </ScrollArea>
        </section>

        <section className={cn("min-h-0 flex-col", mobileDetail ? "flex" : "hidden lg:flex")} aria-label="Ticket detail">
          {activeTicket ? (
            <>
              <header className="flex shrink-0 items-start gap-3 border-b border-border/70 p-3 sm:p-4">
                <Button type="button" variant="ghost" size="icon-sm" className="size-10 cursor-pointer lg:hidden" onClick={() => setMobileDetail(false)} aria-label="Back to tickets">
                  <ArrowLeftIcon className="icon-dir size-4" aria-hidden />
                </Button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">{activeTicket.id}</span>
                    <Badge variant="outline" className={cn("rounded-full", statusTone(activeTicket.status))}>{STATUS_LABEL[activeTicket.status]}</Badge>
                    <SlaBadge ticket={activeTicket} />
                  </div>
                  <h2 className="mt-1 truncate font-semibold sm:text-lg">{activeTicket.subject}</h2>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="outline" size="icon-sm" className="cursor-pointer" aria-label="Ticket actions"><MoreHorizontalIcon aria-hidden /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Ticket actions</DropdownMenuLabel>
                    <DropdownMenuItem onSelect={() => assignTicket(activeTicket.id, "a1")}><UserCheckIcon aria-hidden />Assign to me</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => escalate(activeTicket.id)}><ShieldAlertIcon aria-hidden />Escalate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {activeTicket.status === "resolved" || activeTicket.status === "closed" ? (
                      <DropdownMenuItem onSelect={() => changeStatus(activeTicket.id, "open")}>Reopen</DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onSelect={() => changeStatus(activeTicket.id, "resolved")} disabled={!canTransition(activeTicket.status, "resolved")}>Resolve</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </header>

              <div className="shrink-0 border-b border-border/70 bg-muted/15 p-3 xl:hidden">
                <div className="mb-2 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                  <MailIcon className="size-3.5 shrink-0" aria-hidden />
                  <span className="truncate">{activeTicket.customer.email}</span>
                  <span aria-hidden>·</span>
                  <span className="shrink-0">{activeTicket.category}</span>
                  <span aria-hidden>·</span>
                  <span className="shrink-0">Created {formatDate(activeTicket.createdAt, false)}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={activeTicket.assigneeId ?? "unassigned"} onValueChange={(value) => assignTicket(activeTicket.id, value === "unassigned" ? null : value)}>
                    <SelectTrigger size="sm" className="min-w-36 flex-1 cursor-pointer" aria-label="Assignee"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {AGENTS.map((agent) => <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={activeTicket.priority} onValueChange={(value) => updateTicket(activeTicket.id, (ticket) => addSystemMessage({ ...ticket, priority: value as Priority }, `Priority changed to ${PRIORITY_LABEL[value as Priority]}.`))}>
                    <SelectTrigger size="sm" className="min-w-28 flex-1 cursor-pointer" aria-label="Priority"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(Object.keys(PRIORITY_LABEL) as Priority[]).map((priority) => <SelectItem key={priority} value={priority}>{PRIORITY_LABEL[priority]}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={activeTicket.status} onValueChange={(value) => changeStatus(activeTicket.id, value as Status)}>
                    <SelectTrigger size="sm" className="min-w-32 flex-1 cursor-pointer" aria-label="Status"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(Object.keys(STATUS_LABEL) as Status[]).filter((status) => status !== "closed").map((status) => <SelectItem key={status} value={status} disabled={!canTransition(activeTicket.status, status)}>{STATUS_LABEL[status]}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {activeTicket.status !== "closed" ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button type="button" variant="outline" size="sm" className="cursor-pointer">Close</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Close {activeTicket.id}?</AlertDialogTitle>
                          <AlertDialogDescription>The conversation will be closed. It can only be reopened to Open status.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                          <AlertDialogAction className="cursor-pointer" onClick={() => changeStatus(activeTicket.id, "closed")}>Close ticket</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : null}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" variant="ghost" size="icon-sm" className="cursor-pointer text-destructive hover:text-destructive" aria-label="Delete ticket"><Trash2Icon aria-hidden /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete {activeTicket.id}?</AlertDialogTitle>
                        <AlertDialogDescription>This removes the ticket from the inbox. You will have seven seconds to undo.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" className="cursor-pointer" onClick={() => deleteTicket(activeTicket.id)}>Delete ticket</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <div className="grid min-h-0 flex-1 xl:grid-cols-[minmax(0,1fr)_240px]">
                <div className="flex min-h-0 flex-col">
                  <ScrollArea className="min-h-0 flex-1">
                    <div className="space-y-4 p-4 sm:p-5">
                      {activeTicket.messages.map((message) => {
                        if (message.author === "system") {
                          return (
                            <div key={message.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Separator className="flex-1" />
                              <span>{message.body} · {formatDate(message.at)}</span>
                              <Separator className="flex-1" />
                            </div>
                          )
                        }
                        const customer = message.author === "customer"
                        return (
                          <div key={message.id} className={cn("flex", customer ? "justify-start" : "justify-end")}>
                            <div className={cn(
                              "max-w-[85%] rounded-[12px] border px-3 py-2.5 text-sm",
                              customer ? "border-border/70 bg-muted/40" : "border-primary/20 bg-primary/10",
                              message.internal && "border-amber-500/40 bg-amber-500/10"
                            )}>
                              <div className="mb-1 flex items-center gap-2 text-xs">
                                <span className="font-medium">{customer ? activeTicket.customer.name : message.agentName}</span>
                                {message.internal ? <Badge variant="outline" className="h-5 rounded-full border-amber-500/40 px-1.5 text-[10px] text-amber-700 dark:text-amber-400">Internal</Badge> : null}
                                <span className="text-muted-foreground">{formatDate(message.at)}</span>
                              </div>
                              <p className="whitespace-pre-wrap leading-relaxed">{message.body}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>

                  <div className="shrink-0 border-t border-border/70 p-3 sm:p-4">
                    <div className="mb-2 inline-flex rounded-md bg-muted p-1">
                      <button type="button" className={cn("h-8 cursor-pointer rounded-md px-3 text-xs font-medium", composerMode === "reply" && "bg-card shadow-xs")} onClick={() => setComposerMode("reply")}>
                        Reply
                      </button>
                      <button type="button" className={cn("h-8 cursor-pointer rounded-md px-3 text-xs font-medium", composerMode === "note" && "bg-amber-500/15 text-amber-800 dark:text-amber-300")} onClick={() => setComposerMode("note")}>
                        Internal note
                      </button>
                    </div>
                    <Label htmlFor="crud-management-05-message" className="sr-only">{composerMode === "reply" ? "Reply" : "Internal note"}</Label>
                    <Textarea
                      id="crud-management-05-message"
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder={composerMode === "reply" ? "Write a reply…" : "Add a note for your team…"}
                      className={cn("min-h-20 resize-none", composerMode === "note" && "border-amber-500/40 bg-amber-500/5")}
                      onKeyDown={(event) => {
                        if ((event.metaKey || event.ctrlKey) && event.key === "Enter") sendMessage()
                      }}
                    />
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span className="text-xs text-muted-foreground">Ctrl/⌘ + Enter to send</span>
                      <Button type="button" size="sm" className="cursor-pointer" disabled={!draft.trim()} onClick={sendMessage}>
                        <SendIcon aria-hidden />Send
                      </Button>
                    </div>
                  </div>
                </div>

                <aside className="hidden min-h-0 border-s border-border/70 bg-muted/15 xl:block">
                  <ScrollArea className="h-full">
                    <div className="space-y-5 p-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Customer</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback>{activeTicket.customer.name.split(" ").map((part) => part[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{activeTicket.customer.name}</p>
                            <p className="truncate text-xs text-muted-foreground">{activeTicket.customer.email}</p>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <MetadataSelect label="Assignee" value={activeTicket.assigneeId ?? "unassigned"} onValueChange={(value) => assignTicket(activeTicket.id, value === "unassigned" ? null : value)}>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {AGENTS.map((agent) => <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>)}
                      </MetadataSelect>
                      <MetadataSelect label="Priority" value={activeTicket.priority} onValueChange={(value) => updateTicket(activeTicket.id, (ticket) => addSystemMessage({ ...ticket, priority: value as Priority }, `Priority changed to ${PRIORITY_LABEL[value as Priority]}.`))}>
                        {(Object.keys(PRIORITY_LABEL) as Priority[]).map((priority) => <SelectItem key={priority} value={priority}>{PRIORITY_LABEL[priority]}</SelectItem>)}
                      </MetadataSelect>
                      <MetadataSelect label="Status" value={activeTicket.status} onValueChange={(value) => changeStatus(activeTicket.id, value as Status)}>
                        {(Object.keys(STATUS_LABEL) as Status[]).filter((status) => status !== "closed").map((status) => <SelectItem key={status} value={status} disabled={!canTransition(activeTicket.status, status)}>{STATUS_LABEL[status]}</SelectItem>)}
                      </MetadataSelect>
                      <div>
                        <Label className="text-xs text-muted-foreground">Category</Label>
                        <p className="mt-1 text-sm">{activeTicket.category}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-muted-foreground">Created</Label>
                          <p className="mt-1 text-xs">{formatDate(activeTicket.createdAt, false)}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Updated</Label>
                          <p className="mt-1 text-xs">{formatDate(activeTicket.updatedAt, false)}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">SLA</Label>
                        <div className="mt-1"><SlaBadge ticket={activeTicket} /></div>
                        <p className="mt-1 text-xs text-muted-foreground">Due {formatDate(activeTicket.slaDeadline)}</p>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Button type="button" variant="outline" size="sm" className="w-full cursor-pointer justify-start" onClick={() => assignTicket(activeTicket.id, "a1")}>
                          <UserCheckIcon aria-hidden />Assign to me
                        </Button>
                        <Button type="button" variant="outline" size="sm" className="w-full cursor-pointer justify-start" onClick={() => escalate(activeTicket.id)}>
                          <ShieldAlertIcon aria-hidden />Escalate
                        </Button>
                        {activeTicket.status === "resolved" || activeTicket.status === "closed" ? (
                          <Button type="button" variant="outline" size="sm" className="w-full cursor-pointer justify-start" onClick={() => changeStatus(activeTicket.id, "open")}>Reopen ticket</Button>
                        ) : (
                          <Button type="button" variant="outline" size="sm" className="w-full cursor-pointer justify-start" disabled={!canTransition(activeTicket.status, "resolved")} onClick={() => changeStatus(activeTicket.id, "resolved")}>
                            <CheckCircle2Icon aria-hidden />Resolve
                          </Button>
                        )}
                        {activeTicket.status !== "closed" ? (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button type="button" variant="outline" size="sm" className="w-full cursor-pointer justify-start"><XCircleIcon aria-hidden />Close ticket</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Close {activeTicket.id}?</AlertDialogTitle>
                                <AlertDialogDescription>The conversation will be closed. It can only be reopened to Open status.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                <AlertDialogAction className="cursor-pointer" onClick={() => changeStatus(activeTicket.id, "closed")}>Close ticket</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : null}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button type="button" variant="ghost" size="sm" className="w-full cursor-pointer justify-start text-destructive hover:text-destructive"><Trash2Icon aria-hidden />Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete {activeTicket.id}?</AlertDialogTitle>
                              <AlertDialogDescription>This removes the ticket from the inbox. You will have seven seconds to undo.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                              <AlertDialogAction variant="destructive" className="cursor-pointer" onClick={() => deleteTicket(activeTicket.id)}>Delete ticket</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </ScrollArea>
                </aside>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
              <MessageSquareIcon className="mb-3 size-10 text-muted-foreground" aria-hidden />
              <p className="font-medium">Select a ticket</p>
              <p className="text-sm text-muted-foreground">Choose a conversation from the inbox.</p>
              <Button type="button" variant="outline" size="sm" className="mt-4 cursor-pointer lg:hidden" onClick={() => setMobileDetail(false)}>Back to tickets</Button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function SlaBadge({ ticket }: { ticket: Ticket }) {
  const sla = slaFor(ticket)
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full",
        sla.tone === "met" && "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        sla.tone === "breached" && "border-transparent bg-rose-500/10 text-rose-700 dark:text-rose-400",
        sla.tone === "risk" && "border-transparent bg-amber-500/10 text-amber-700 dark:text-amber-400",
        sla.tone === "remaining" && "border-border/70 text-muted-foreground"
      )}
    >
      {sla.label}
    </Badge>
  )
}

function MetadataSelect({
  label,
  value,
  onValueChange,
  children,
}: {
  label: string
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger size="sm" className="mt-1 w-full cursor-pointer"><SelectValue /></SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  )
}
