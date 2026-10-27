"use client"

import * as React from "react"
import { ChevronsUpDownIcon, PlusIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@sonojs/ui/components/sidebar"
import { useDirection } from "@/hooks/use-direction"
import { getEndSide } from "@/lib/direction"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const { dir } = useDirection()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  const ActiveLogo = activeTeam.logo

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
                <ActiveLogo className="size-4" aria-hidden />
              </div>
              <div className="grid min-w-0 flex-1 text-start text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDownIcon className="ms-auto size-4 shrink-0" aria-hidden />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : getEndSide(dir)}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => {
              const Logo = team.logo
              return (
                <DropdownMenuItem
                  key={team.name}
                  className="gap-2 p-2"
                  onClick={() => setActiveTeam(team)}
                >
                  <div className="flex size-6 items-center justify-center rounded-md border border-border/70">
                    <Logo className="size-3.5 shrink-0" aria-hidden />
                  </div>
                  <span className="min-w-0 flex-1 truncate">{team.name}</span>
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border border-border/70 bg-transparent">
                <PlusIcon className="size-4" aria-hidden />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
