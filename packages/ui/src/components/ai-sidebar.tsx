"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  ArchiveIcon,
  BotIcon,
  CheckIcon,
  CommandIcon,
  DownloadIcon,
  FolderKanbanIcon,
  ImagesIcon,
  LibraryIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  PanelLeftCloseIcon,
  PanelLeftIcon,
  PencilIcon,
  PinIcon,
  PuzzleIcon,
  SearchIcon,
  SettingsIcon,
  Share2Icon,
  SparklesIcon,
  SquarePenIcon,
  TerminalIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { cn } from "@sonojs/ui/lib/utils"

export type AiSidebarNavItem = {
  id: string
  label: string
  icon: React.ReactNode
  badge?: string
  onClick?: () => void
}

export type AiSidebarChatItem = {
  id: string
  title: string
  timestamp?: string
  pinned?: boolean
  archived?: boolean
}

export type AiSidebarChatGroup = {
  category: string
  items: AiSidebarChatItem[]
}

export type AiSidebarUser = {
  name: string
  email?: string
  avatarUrl?: string
  plan?: string
}

export type AiSidebarChatAction = {
  id: string
  label: string
  icon?: React.ReactNode
  danger?: boolean
  onClick?: (chat: AiSidebarChatItem) => void
}

export type AiSidebarProps = {
  brandName?: string
  brandLogo?: React.ReactNode
  navItems?: AiSidebarNavItem[]
  moreNavItems?: AiSidebarNavItem[]
  chatHistoryGroups?: AiSidebarChatGroup[]
  activeChatId?: string
  user?: AiSidebarUser
  collapsed?: boolean
  searchQuery?: string
  customChatActions?: AiSidebarChatAction[]
  onSearchChange?: (query: string) => void
  onToggleCollapse?: () => void
  onNewChat?: () => void
  onSelectChat?: (chatId: string) => void
  onDeleteChat?: (chatId: string) => void
  onPinChat?: (chatId: string) => void
  onRenameChat?: (chatId: string, newTitle: string) => void
  onShareChat?: (chatId: string) => void
  onArchiveChat?: (chatId: string) => void
  onExportChat?: (chatId: string) => void
  onUpgradeClick?: () => void
  className?: string
}

const DEFAULT_NAV_ITEMS: AiSidebarNavItem[] = [
  { id: "images", label: "Images", icon: <ImagesIcon className="size-4" /> },
  { id: "library", label: "Library", icon: <LibraryIcon className="size-4" /> },
  { id: "plugins", label: "Plugins", icon: <PuzzleIcon className="size-4" /> },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderKanbanIcon className="size-4" />,
  },
  { id: "codex", label: "Codex", icon: <TerminalIcon className="size-4" /> },
]

const DEFAULT_MORE_NAV_ITEMS: AiSidebarNavItem[] = [
  {
    id: "agents",
    label: "Custom agents",
    icon: <SparklesIcon className="size-4" />,
  },
  {
    id: "archived",
    label: "Archived chats",
    icon: <ArchiveIcon className="size-4" />,
  },
  {
    id: "shortcuts",
    label: "Shortcuts",
    icon: <CommandIcon className="size-4" />,
  },
]

const DEFAULT_CHAT_GROUPS: AiSidebarChatGroup[] = [
  {
    category: "Recents",
    items: [
      { id: "chat-1", title: "CSS Position Concept Reel", pinned: true },
      { id: "chat-2", title: "Cross-posting Monetization Clarity" },
      { id: "chat-3", title: "Induction Stove for Cooking" },
      { id: "chat-4", title: "Flexbox Grid Learning Tool" },
      { id: "chat-5", title: "Professional Video Creation" },
      { id: "chat-6", title: "AI Fluid Orb Palette" },
      { id: "chat-7", title: "Carousel Layout Help" },
      { id: "chat-8", title: "Correct Product Hunt Process" },
      { id: "chat-9", title: "Shader Compilation Error Fix" },
      { id: "chat-10", title: "Interactive 3D Shader" },
      { id: "chat-11", title: "Cover Image Request" },
      { id: "chat-12", title: "Installation Guide" },
    ],
  },
]

const DEFAULT_USER: AiSidebarUser = {
  name: "Alex Rivera",
  email: "alex@example.com",
  plan: "Free",
}

/** AI chat navigation sidebar with history, search, collapse, and profile footer. */
function AiSidebar({
  brandName = "Sono",
  brandLogo = <BotIcon className="size-5 text-foreground" />,
  navItems = DEFAULT_NAV_ITEMS,
  moreNavItems = DEFAULT_MORE_NAV_ITEMS,
  chatHistoryGroups = DEFAULT_CHAT_GROUPS,
  activeChatId = "chat-1",
  user = DEFAULT_USER,
  collapsed = false,
  searchQuery,
  customChatActions,
  onSearchChange,
  onToggleCollapse,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onPinChat,
  onRenameChat,
  onShareChat,
  onArchiveChat,
  onExportChat,
  onUpgradeClick,
  className,
}: AiSidebarProps) {
  const [internalQuery, setInternalQuery] = React.useState("")
  const [isSearching, setIsSearching] = React.useState(false)
  const [activeChat, setActiveChat] = React.useState(activeChatId)
  const [editingChatId, setEditingChatId] = React.useState<string | null>(null)
  const [editingTitle, setEditingTitle] = React.useState("")
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null)
  const [showMoreNav, setShowMoreNav] = React.useState(false)
  const [showUserMenu, setShowUserMenu] = React.useState(false)
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  const query = searchQuery !== undefined ? searchQuery : internalQuery
  const setQuery = onSearchChange ?? setInternalQuery

  React.useEffect(() => {
    setActiveChat(activeChatId)
  }, [activeChatId])

  React.useEffect(() => {
    if (isSearching) searchInputRef.current?.focus()
  }, [isSearching])

  const filteredGroups = React.useMemo(
    () =>
      chatHistoryGroups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          ),
        }))
        .filter((group) => group.items.length > 0),
    [chatHistoryGroups, query]
  )

  const handleStartRename = (id: string, currentTitle: string) => {
    setEditingChatId(id)
    setEditingTitle(currentTitle)
    setOpenMenuId(null)
  }

  const handleSaveRename = (id: string) => {
    if (editingTitle.trim()) onRenameChat?.(id, editingTitle.trim())
    setEditingChatId(null)
  }

  const handleSelect = (id: string) => {
    setActiveChat(id)
    onSelectChat?.(id)
  }

  const initials = user.name.slice(0, 2).toUpperCase()

  if (collapsed) {
    return (
      <aside
        data-slot="ai-sidebar"
        data-collapsed=""
        className={cn(
          "flex h-full min-h-[36rem] w-16 shrink-0 select-none flex-col items-center justify-between border-e border-border/70 bg-card px-2 py-3 transition-all duration-200",
          className
        )}
      >
        <div className="flex w-full flex-col items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onToggleCollapse}
            className="rounded-xl text-muted-foreground"
            title="Expand sidebar"
            aria-label="Expand sidebar"
          >
            <PanelLeftIcon className="size-5" />
          </Button>

          <Button
            type="button"
            variant="default"
            size="icon-sm"
            onClick={onNewChat}
            className="rounded-xl shadow-xs"
            title="New chat"
            aria-label="New chat"
          >
            <SquarePenIcon className="size-5" />
          </Button>

          <div className="my-1 h-px w-8 bg-border" />

          {navItems.map((item) => (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={item.onClick}
              className="rounded-xl text-muted-foreground"
              title={item.label}
              aria-label={item.label}
            >
              {item.icon}
            </Button>
          ))}
        </div>

        <div className="flex w-full justify-center border-t border-border/70 pt-3">
          <Avatar className="size-9 cursor-pointer ring-2 ring-transparent transition-all hover:ring-border">
            {user.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={user.name} />
            ) : null}
            <AvatarFallback className="bg-foreground text-xs font-semibold text-background">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </aside>
    )
  }

  return (
    <aside
      data-slot="ai-sidebar"
      className={cn(
        "flex h-full min-h-[36rem] w-64 shrink-0 select-none flex-col justify-between border-e border-border/70 bg-card px-3 py-3 text-foreground transition-all duration-200",
        className
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2 text-base font-bold tracking-tight">
            {brandLogo}
            <span>{brandName}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => setIsSearching((v) => !v)}
              className="rounded-lg text-muted-foreground"
              title="Search conversations"
              aria-label="Search conversations"
              aria-pressed={isSearching}
            >
              <SearchIcon className="size-4" />
            </Button>
            {onToggleCollapse ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={onToggleCollapse}
                className="rounded-lg text-muted-foreground"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <PanelLeftCloseIcon className="size-4" />
              </Button>
            ) : null}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isSearching ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden px-1"
            >
              <div className="relative flex items-center">
                <SearchIcon className="pointer-events-none absolute start-2.5 size-3.5 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search chats…"
                  className="h-8 rounded-lg bg-muted/40 ps-8 pe-7 text-xs shadow-none"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute end-2 cursor-pointer text-muted-foreground outline-none hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <Button
          type="button"
          variant="secondary"
          onClick={onNewChat}
          className="h-10 w-full justify-between rounded-xl border border-border/50 px-3 text-xs font-medium shadow-xs"
        >
          <span className="flex items-center gap-2.5">
            <SquarePenIcon className="size-4 text-muted-foreground" />
            <span>New chat</span>
          </span>
          <span
            dir="ltr"
            className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            ⌘N
          </span>
        </Button>

        <div className="relative space-y-0.5 px-1 py-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground/80 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex items-center gap-2.5">
                <span className="text-muted-foreground">{item.icon}</span>
                <span>{item.label}</span>
              </span>
              {item.badge ? (
                <span className="rounded-full bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setShowMoreNav((v) => !v)}
            className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex items-center gap-2.5">
              <MoreHorizontalIcon className="size-4 text-muted-foreground" />
              <span>More</span>
            </span>
          </button>

          {showMoreNav ? (
            <div
              className="absolute inset-x-1 top-full z-50 mt-1 space-y-0.5 rounded-xl border border-border/70 bg-card p-1 shadow-soft"
              onMouseLeave={() => setShowMoreNav(false)}
            >
              {moreNavItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.onClick?.()
                    setShowMoreNav(false)
                  }}
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-start text-xs font-medium text-foreground/80 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="text-muted-foreground">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filteredGroups.map((group) => (
            <div key={group.category} className="space-y-1">
              <div className="px-2 text-[11px] font-semibold tracking-wider text-muted-foreground">
                {group.category}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeChat === item.id
                  const isEditing = editingChatId === item.id
                  const isMenuOpen = openMenuId === item.id

                  if (isEditing) {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-1 px-1 py-1"
                      >
                        <Input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveRename(item.id)
                            if (e.key === "Escape") setEditingChatId(null)
                          }}
                          className="h-7 px-2 py-0 text-xs shadow-none"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveRename(item.id)}
                          className="cursor-pointer rounded p-1 text-emerald-600 outline-none hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-ring dark:text-emerald-400 dark:hover:bg-emerald-950/40"
                          aria-label="Save rename"
                        >
                          <CheckIcon className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingChatId(null)}
                          className="cursor-pointer rounded p-1 text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                          aria-label="Cancel rename"
                        >
                          <XIcon className="size-3.5" />
                        </button>
                      </div>
                    )
                  }

                  return (
                    <div key={item.id} className="group relative">
                      <button
                        type="button"
                        onClick={() => handleSelect(item.id)}
                        className={cn(
                          "flex w-full cursor-pointer items-center justify-between rounded-xl px-2.5 py-1.5 text-start text-xs outline-none transition-colors group-hover:pe-8 focus-visible:ring-2 focus-visible:ring-ring",
                          isActive
                            ? "bg-muted font-semibold text-foreground"
                            : "text-foreground/80 hover:bg-muted/60"
                        )}
                      >
                        <span className="truncate pe-1">{item.title}</span>
                        {item.pinned ? (
                          <PinIcon className="size-3 shrink-0 rotate-45 text-muted-foreground" />
                        ) : null}
                      </button>

                      <div className="absolute end-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenMenuId(isMenuOpen ? null : item.id)
                          }}
                          className="cursor-pointer rounded-md p-1 text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                          aria-label="Chat actions"
                          aria-expanded={isMenuOpen}
                        >
                          <MoreHorizontalIcon className="size-3.5" />
                        </button>
                      </div>

                      {isMenuOpen ? (
                        <div
                          className="absolute end-2 top-8 z-50 w-40 space-y-0.5 rounded-xl border border-border/70 bg-card py-1 text-xs shadow-soft"
                          onMouseLeave={() => setOpenMenuId(null)}
                        >
                          <ChatMenuButton
                            icon={<Share2Icon className="size-3.5" />}
                            label="Share"
                            onClick={() => {
                              onShareChat?.(item.id)
                              setOpenMenuId(null)
                            }}
                          />
                          <ChatMenuButton
                            icon={<PinIcon className="size-3.5" />}
                            label={item.pinned ? "Unpin" : "Pin chat"}
                            onClick={() => {
                              onPinChat?.(item.id)
                              setOpenMenuId(null)
                            }}
                          />
                          <ChatMenuButton
                            icon={<PencilIcon className="size-3.5" />}
                            label="Rename"
                            onClick={() =>
                              handleStartRename(item.id, item.title)
                            }
                          />
                          <ChatMenuButton
                            icon={<ArchiveIcon className="size-3.5" />}
                            label="Archive"
                            onClick={() => {
                              onArchiveChat?.(item.id)
                              setOpenMenuId(null)
                            }}
                          />
                          <ChatMenuButton
                            icon={<DownloadIcon className="size-3.5" />}
                            label="Export chat"
                            onClick={() => {
                              onExportChat?.(item.id)
                              setOpenMenuId(null)
                            }}
                          />
                          {customChatActions?.map((action) => (
                            <ChatMenuButton
                              key={action.id}
                              icon={action.icon}
                              label={action.label}
                              danger={action.danger}
                              onClick={() => {
                                action.onClick?.(item)
                                setOpenMenuId(null)
                              }}
                            />
                          ))}
                          <div className="my-0.5 h-px w-full bg-border" />
                          <ChatMenuButton
                            icon={
                              <Trash2Icon className="size-3.5 text-destructive" />
                            }
                            label="Delete"
                            danger
                            onClick={() => {
                              onDeleteChat?.(item.id)
                              setOpenMenuId(null)
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {filteredGroups.length === 0 ? (
            <div className="px-3 py-6 text-center text-xs text-muted-foreground">
              No chats found for &quot;{query}&quot;
            </div>
          ) : null}
        </div>
      </div>

      <div className="relative border-t border-border/60 pt-2">
        <div className="flex items-center justify-between rounded-xl p-1.5 transition-colors hover:bg-muted/50">
          <button
            type="button"
            onClick={() => setShowUserMenu((v) => !v)}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar className="size-8 shrink-0">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={user.name} />
              ) : null}
              <AvatarFallback className="bg-foreground text-xs font-semibold text-background">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-xs font-semibold">
                {user.name}
              </span>
              <span className="truncate text-[10px] text-muted-foreground">
                {user.plan || "Free"}
              </span>
            </div>
          </button>
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={onUpgradeClick}
            className="h-7 shrink-0 rounded-full px-2.5 text-[11px] font-medium"
          >
            Upgrade
          </Button>
        </div>

        {showUserMenu ? (
          <div
            className="absolute inset-x-0 bottom-full z-50 mb-2 space-y-0.5 rounded-2xl border border-border/70 bg-card p-1 shadow-soft"
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <div className="border-b border-border/60 px-3 py-2">
              <p className="text-xs font-semibold">{user.name}</p>
              <p className="truncate text-[10px] text-muted-foreground">
                {user.email}
              </p>
            </div>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-xs text-foreground/80 outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              <SettingsIcon className="size-3.5 text-muted-foreground" />
              <span>Settings</span>
            </button>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-xs text-foreground/80 outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              <SparklesIcon className="size-3.5 text-muted-foreground" />
              <span>Custom instructions</span>
            </button>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-xs text-destructive outline-none hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogOutIcon className="size-3.5 text-destructive" />
              <span>Log out</span>
            </button>
          </div>
        ) : null}
      </div>
    </aside>
  )
}

function ChatMenuButton({
  icon,
  label,
  danger,
  onClick,
}: {
  icon?: React.ReactNode
  label: string
  danger?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring",
        danger
          ? "font-medium text-destructive hover:bg-destructive/10"
          : "text-foreground/80 hover:bg-muted"
      )}
    >
      <span className={danger ? undefined : "text-muted-foreground"}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  )
}

export { AiSidebar }
