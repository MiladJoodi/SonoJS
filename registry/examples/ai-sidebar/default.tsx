"use client"

import * as React from "react"

import { AiSidebar } from "@sonojs/ui/components/ai-sidebar"

export function AiSidebarDefault() {
  const [collapsed, setCollapsed] = React.useState(false)
  const [activeChatId, setActiveChatId] = React.useState("chat-1")
  const [groups, setGroups] = React.useState(() => [
    {
      category: "Recents",
      items: [
        { id: "chat-1", title: "CSS Position Concept Reel", pinned: true },
        { id: "chat-2", title: "Cross-posting Monetization Clarity" },
        { id: "chat-3", title: "Flexbox Grid Learning Tool" },
        { id: "chat-4", title: "Professional Video Creation" },
        { id: "chat-5", title: "Shader Compilation Error Fix" },
        { id: "chat-6", title: "Installation Guide" },
      ],
    },
  ])

  return (
    <div className="mx-auto flex h-[36rem] w-full max-w-3xl overflow-hidden rounded-[12px] border border-border/70 bg-canvas">
      <AiSidebar
        brandName="Sono"
        collapsed={collapsed}
        activeChatId={activeChatId}
        chatHistoryGroups={groups}
        user={{ name: "Alex Rivera", email: "alex@example.com", plan: "Free" }}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        onNewChat={() => {
          const id = `chat-${Date.now()}`
          setGroups((prev) => [
            {
              ...prev[0],
              items: [
                { id, title: "Untitled chat" },
                ...prev[0].items,
              ],
            },
          ])
          setActiveChatId(id)
        }}
        onSelectChat={setActiveChatId}
        onPinChat={(id) => {
          setGroups((prev) =>
            prev.map((group) => ({
              ...group,
              items: group.items.map((item) =>
                item.id === id ? { ...item, pinned: !item.pinned } : item
              ),
            }))
          )
        }}
        onRenameChat={(id, title) => {
          setGroups((prev) =>
            prev.map((group) => ({
              ...group,
              items: group.items.map((item) =>
                item.id === id ? { ...item, title } : item
              ),
            }))
          )
        }}
        onDeleteChat={(id) => {
          setGroups((prev) =>
            prev.map((group) => ({
              ...group,
              items: group.items.filter((item) => item.id !== id),
            }))
          )
        }}
      />
      <div className="hidden flex-1 items-center justify-center p-8 text-sm text-muted-foreground sm:flex">
        Chat canvas
      </div>
    </div>
  )
}
