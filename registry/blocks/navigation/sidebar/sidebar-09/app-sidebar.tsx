"use client"

import * as React from "react"
import {
  ActivityIcon,
  ArchiveIcon,
  BarChart3Icon,
  BellRingIcon,
  BoxesIcon,
  BugIcon,
  Building2Icon,
  ChevronRightIcon,
  CloudIcon,
  DatabaseIcon,
  FileTextIcon,
  FingerprintIcon,
  FolderIcon,
  FoldersIcon,
  GitCommitIcon,
  GitMergeIcon,
  GitPullRequestIcon,
  HexagonIcon,
  HomeIcon,
  KeyIcon,
  LockKeyholeIcon,
  LogOutIcon,
  PackageIcon,
  PackageOpenIcon,
  PlayIcon,
  ScanEyeIcon,
  SettingsIcon,
  ShieldAlertIcon,
  ShieldIcon,
  SparklesIcon,
  StarIcon,
  TargetIcon,
  TerminalIcon,
  UserIcon,
  UserPlusIcon,
  WebhookIcon,
  WorkflowIcon,
  XIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@sonojs/ui/components/sidebar"
import { cn } from "@/lib/utils"

import { TeamSwitcher } from "./team-switcher"

const data = {
  teams: [
    {
      name: "Atlas",
      logo: Building2Icon,
      plan: "Enterprise",
    },
    {
      name: "Nova",
      logo: SparklesIcon,
      plan: "Pro",
    },
    {
      name: "Orbit",
      logo: HexagonIcon,
      plan: "Free",
    },
    {
      name: "Pixel",
      logo: BoxesIcon,
      plan: "Free",
    },
  ],
}

interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  route?: string
  subItems?: {
    id: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    description?: string
    route?: string
  }[]
}

const sidebarItems: SidebarItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: HomeIcon,
    subItems: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: BarChart3Icon,
        description: "Project overview and activity",
        route: "/overview/dashboard",
      },
      {
        id: "activity",
        label: "Activity",
        icon: ActivityIcon,
        description: "Recent commits and changes",
        route: "/overview/activity",
      },
      {
        id: "insights",
        label: "Insights",
        icon: TargetIcon,
        description: "Code analytics and metrics",
        route: "/overview/insights",
      },
    ],
  },
  {
    id: "repositories",
    label: "Repositories",
    icon: FoldersIcon,
    badge: "12",
    subItems: [
      {
        id: "all-repos",
        label: "All Repositories",
        icon: FolderIcon,
        description: "Browse all your repositories",
        route: "/repositories",
      },
      {
        id: "starred",
        label: "Starred",
        icon: StarIcon,
        description: "Your starred repositories",
        route: "/repositories/starred",
      },
      {
        id: "archived",
        label: "Archived",
        icon: ArchiveIcon,
        description: "Archived repositories",
        route: "/repositories/archived",
      },
    ],
  },
  {
    id: "pull-requests",
    label: "Pull Requests",
    icon: GitPullRequestIcon,
    badge: "3",
    subItems: [
      {
        id: "open-prs",
        label: "Open",
        icon: GitPullRequestIcon,
        description: "Open pull requests",
        route: "/pull-requests/open",
      },
      {
        id: "review-requests",
        label: "Review Requests",
        icon: ScanEyeIcon,
        description: "PRs awaiting your review",
        route: "/pull-requests/review",
      },
      {
        id: "merged",
        label: "Merged",
        icon: GitMergeIcon,
        description: "Recently merged PRs",
        route: "/pull-requests/merged",
      },
    ],
  },
  {
    id: "issues",
    label: "Issues",
    icon: BugIcon,
    badge: "7",
    subItems: [
      {
        id: "open-issues",
        label: "Open Issues",
        icon: BugIcon,
        description: "Active issues and bugs",
        route: "/issues/open",
      },
      {
        id: "assigned",
        label: "Assigned to Me",
        icon: UserPlusIcon,
        description: "Issues assigned to you",
        route: "/issues/assigned",
      },
      {
        id: "created",
        label: "Created by Me",
        icon: GitCommitIcon,
        description: "Issues you've created",
        route: "/issues/created",
      },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    icon: WorkflowIcon,
    subItems: [
      {
        id: "workflows",
        label: "Workflows",
        icon: PlayIcon,
        description: "CI/CD workflows and pipelines",
        route: "/actions/workflows",
      },
      {
        id: "runners",
        label: "Runners",
        icon: TerminalIcon,
        description: "Self-hosted runners",
        route: "/actions/runners",
      },
      {
        id: "deployments",
        label: "Deployments",
        icon: CloudIcon,
        description: "Deployment history",
        route: "/actions/deployments",
      },
    ],
  },
  {
    id: "packages",
    label: "Packages",
    icon: BoxesIcon,
    subItems: [
      {
        id: "published",
        label: "Published",
        icon: PackageOpenIcon,
        description: "Your published packages",
        route: "/packages/published",
      },
      {
        id: "container-registry",
        label: "Container Registry",
        icon: DatabaseIcon,
        description: "Docker images and containers",
        route: "/packages/containers",
      },
      {
        id: "npm-packages",
        label: "npm Packages",
        icon: PackageIcon,
        description: "Node.js packages",
        route: "/packages/npm",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: LockKeyholeIcon,
    badge: "2",
    subItems: [
      {
        id: "alerts",
        label: "Security Alerts",
        icon: ShieldAlertIcon,
        description: "Vulnerability alerts",
        route: "/security/alerts",
      },
      {
        id: "advisories",
        label: "Advisories",
        icon: ShieldIcon,
        description: "Security advisories",
        route: "/security/advisories",
      },
      {
        id: "secrets",
        label: "Secrets",
        icon: FingerprintIcon,
        description: "Repository secrets",
        route: "/security/secrets",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: SettingsIcon,
    subItems: [
      {
        id: "profile",
        label: "Profile",
        icon: UserIcon,
        description: "Your profile settings",
        route: "/settings/profile",
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: BellRingIcon,
        description: "Notification preferences",
        route: "/settings/notifications",
      },
      {
        id: "webhooks",
        label: "Webhooks",
        icon: WebhookIcon,
        description: "Webhook configurations",
        route: "/settings/webhooks",
      },
      {
        id: "api-keys",
        label: "API Keys",
        icon: KeyIcon,
        description: "Personal access tokens",
        route: "/settings/api-keys",
      },
    ],
  },
  {
    id: "docs",
    label: "Documentation",
    icon: FileTextIcon,
    route: "/docs",
  },
]

export function AppSidebar() {
  const [activeItem, setActiveItem] = React.useState<string | null>("overview")
  const [selectedSubItem, setSelectedSubItem] = React.useState<string | null>(
    null
  )

  const activeItemData = sidebarItems.find((item) => item.id === activeItem)
  const showSecondary = Boolean(activeItem && activeItemData?.subItems)

  const handleItemClick = (item: SidebarItem) => {
    if (item.subItems) {
      const isActive = activeItem === item.id
      setActiveItem(isActive ? null : item.id)
      if (isActive) {
        setSelectedSubItem(null)
      }
      return
    }
    setActiveItem(null)
    setSelectedSubItem(null)
  }

  const handleSubItemClick = (subItemId: string) => {
    setSelectedSubItem((prev) => (prev === subItemId ? null : subItemId))
  }

  const closeSecondary = () => {
    setActiveItem(null)
    setSelectedSubItem(null)
  }

  return (
    <div className="relative flex h-full min-h-128 w-full min-w-0 overflow-hidden bg-background rtl:flex-row-reverse">
      <Sidebar
        className={cn(
          "w-full max-w-full shrink-0 border-border/70 md:w-64 md:border-e",
          showSecondary && "hidden md:flex"
        )}
        collapsible="none"
        variant="sidebar"
      >
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.id
                  const chevronIndicator = (
                    <ChevronRightIcon
                      className={cn(
                        "icon-dir size-4 shrink-0 transition-transform",
                        isActive && "rotate-90"
                      )}
                      aria-hidden
                    />
                  )

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        className="h-10 w-full px-3"
                        isActive={isActive}
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <Icon className="size-4 shrink-0" aria-hidden />
                          <span className="truncate">{item.label}</span>
                        </div>
                        <div className="ms-auto flex min-w-fit shrink-0 items-center gap-1">
                          {(item.badge || item.subItems) &&
                            (item.badge ? (
                              <SidebarMenuBadge
                                className={cn(
                                  "static! inset-e-auto top-auto translate-x-0",
                                  "relative flex min-w-fit items-center",
                                  item.subItems && "gap-x-3"
                                )}
                              >
                                {item.badge}
                                {item.subItems ? chevronIndicator : null}
                              </SidebarMenuBadge>
                            ) : (
                              chevronIndicator
                            ))}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="h-12 w-full px-3" size="lg">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Avatar className="size-8 rounded-full">
                    <AvatarFallback className="rounded-full">A</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 text-start">
                    <div className="truncate text-sm font-medium">Alex</div>
                    <div className="truncate text-xs text-muted-foreground">
                      alex@example.com
                    </div>
                  </div>
                </div>
                <LogOutIcon className="size-4 shrink-0" aria-hidden />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {showSecondary && activeItemData?.subItems ? (
        <Sidebar
          className={cn(
            "z-10 w-full max-w-full shrink-0 border-border/70 bg-sidebar",
            "absolute inset-0 md:static md:inset-auto md:w-72 md:border-e",
            "animate-in duration-200 fade-in-0",
            "slide-in-from-left-2 rtl:slide-in-from-right-2",
            "md:slide-in-from-left-2 md:rtl:slide-in-from-right-2"
          )}
          collapsible="none"
          variant="sidebar"
        >
          <SidebarHeader className="flex flex-row items-center justify-between gap-2 border-b border-border/70 px-4">
            <h3 className="min-w-0 truncate font-medium">
              {activeItemData.label}
            </h3>
            <button
              type="button"
              aria-label="Close panel"
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md p-0 hover:bg-sidebar-accent md:size-6"
              onClick={closeSecondary}
            >
              <XIcon className="size-4" aria-hidden />
            </button>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {activeItemData.subItems.map((subItem) => {
                    const SubIcon = subItem.icon
                    const isSelected = selectedSubItem === subItem.id

                    return (
                      <SidebarMenuItem key={subItem.id}>
                        <SidebarMenuButton
                          className="h-auto w-full justify-start gap-3 px-3 py-2.5"
                          isActive={isSelected}
                          onClick={() => handleSubItemClick(subItem.id)}
                        >
                          <SubIcon
                            className="mt-0.5 size-5 shrink-0 self-start"
                            aria-hidden
                          />
                          <div className="min-w-0 flex-1 text-start">
                            <div className="font-medium">{subItem.label}</div>
                            {subItem.description ? (
                              <div className="mt-0.5 text-xs text-muted-foreground wrap-break-word whitespace-normal">
                                {subItem.description}
                              </div>
                            ) : null}
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      ) : null}
    </div>
  )
}
