"use client"

import { useState, type ComponentType } from "react"
import {
  BarChart3Icon,
  CalendarIcon,
  FolderIcon,
  GripVerticalIcon,
  InboxIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@sonojs/ui/components/sortable"
import { cn } from "@sonojs/ui/lib/utils"

interface NavSortItem {
  id: string
  label: string
  icon: ComponentType<{ className?: string }>
  count?: number
  active?: boolean
}

const defaultItems: NavSortItem[] = [
  {
    id: "1",
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    active: true,
  },
  {
    id: "2",
    label: "Inbox",
    icon: InboxIcon,
    count: 5,
  },
  {
    id: "3",
    label: "Projects",
    icon: FolderIcon,
    count: 12,
  },
  {
    id: "4",
    label: "Calendar",
    icon: CalendarIcon,
  },
  {
    id: "5",
    label: "Analytics",
    icon: BarChart3Icon,
  },
  {
    id: "6",
    label: "Settings",
    icon: SettingsIcon,
  },
]

export function SortableNavigation() {
  const [items, setItems] = useState<NavSortItem[]>(defaultItems)

  return (
    <div className="mx-auto w-full max-w-xs px-1 py-2 sm:max-w-[17rem] sm:p-4">
      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card">
        <div className="border-b border-border/60 px-3 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground">
              S
            </div>
            <div className="min-w-0 text-start">
              <p className="truncate text-sm font-semibold leading-tight">
                Sono workspace
              </p>
              <p className="text-[10px] text-muted-foreground">Pin your order</p>
            </div>
          </div>
        </div>

        <div className="px-2 py-2">
          <p className="mb-1.5 px-2 text-start text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Main
          </p>
          <Sortable
            value={items}
            onValueChange={setItems}
            getItemValue={(item) => item.id}
            strategy="vertical"
            className="space-y-0.5"
          >
            {items.map((item) => {
              const Icon = item.icon
              return (
                <SortableItem key={item.id} value={item.id}>
                  <div
                    className={cn(
                      "group flex min-h-10 cursor-pointer items-center gap-0.5 rounded-lg px-1 py-1.5 transition-colors sm:gap-1 sm:px-1.5",
                      item.active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-accent"
                    )}
                  >
                    <SortableItemHandle
                      className={cn(
                        "cursor-grab! flex size-8 shrink-0 items-center justify-center sm:size-auto sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100",
                        item.active
                          ? "text-primary/70 hover:text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <GripVerticalIcon className="size-3.5" />
                    </SortableItemHandle>
                    <Icon
                      className={cn(
                        "size-4 shrink-0",
                        item.active ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <span className="min-w-0 flex-1 truncate text-start text-sm font-medium">
                      {item.label}
                    </span>
                    {item.count != null ? (
                      <Badge
                        variant={item.active ? "default" : "secondary"}
                        className={cn(
                          "h-5 min-w-5 shrink-0 justify-center rounded-full px-1.5 tabular-nums",
                          item.active &&
                            "border-transparent bg-primary/20 text-primary"
                        )}
                      >
                        {item.count}
                      </Badge>
                    ) : null}
                  </div>
                </SortableItem>
              )
            })}
          </Sortable>
        </div>
      </div>
    </div>
  )
}
