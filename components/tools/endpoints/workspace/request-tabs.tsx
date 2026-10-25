"use client";

import { X } from "lucide-react";
import { useWorkspace } from "@/components/tools/endpoints/workspace/workspace-provider";
import { methodColorClass } from "@/components/tools/endpoints/lib/http/request";
import { cn } from "@/lib/utils";

export function RequestTabs() {
  const { tabs, activeTabId, setActiveTabId, closeTab, newRequest } = useWorkspace();

  if (tabs.length === 0) return null;

  return (
    <div
      className="ep-chrome flex h-9 items-end gap-1 overflow-x-auto border-b px-2"
      role="toolbar"
      aria-label="Open requests"
    >
      {tabs.map((tab) => {
        const active = tab.id === activeTabId;
        const label = tab.request.name || "Untitled";
        return (
          <div
            key={tab.id}
            className={cn(
              "group -mb-px flex h-9 max-w-[12rem] shrink-0 items-center gap-0.5 border-b-2 px-1 text-sm",
              active
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <button
              type="button"
              className="flex min-h-8 min-w-0 flex-1 cursor-pointer items-center gap-1.5 px-1 text-start"
              aria-current={active ? "true" : undefined}
              aria-label={`${tab.request.method} ${label}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              <span
                className={cn(
                  "font-mono shrink-0 text-[10px] font-semibold",
                  methodColorClass(tab.request.method),
                )}
              >
                {tab.request.method}
              </span>
              <span className="truncate">{label}</span>
            </button>
            <button
              type="button"
              className={cn(
                "inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground",
                "opacity-70 sm:opacity-0 sm:group-hover:opacity-70 sm:focus-visible:opacity-70",
                active && "sm:opacity-70",
              )}
              aria-label={`Close ${label}`}
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              <X className="size-3.5" />
            </button>
          </div>
        );
      })}
      <button
        type="button"
        className="mb-0.5 ms-0.5 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label="New request tab"
        onClick={newRequest}
      >
        <span className="text-base leading-none" aria-hidden>
          +
        </span>
      </button>
    </div>
  );
}
