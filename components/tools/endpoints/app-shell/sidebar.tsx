"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FolderPlus,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { useWorkspace } from "@/components/tools/endpoints/workspace/workspace-provider";
import { ConfirmDialog, PromptDialog } from "@/components/tools/endpoints/dialogs/app-dialogs";
import { methodColorClass } from "@/components/tools/endpoints/lib/http/request";
import { Button } from "@/components/tools/endpoints/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/tools/endpoints/ui/dropdown-menu";
import { Input } from "@/components/tools/endpoints/ui/input";
import { cn } from "@/lib/utils";
import type { Collection, HistoryItem, HttpRequest } from "@/components/tools/endpoints/types";

function groupHistory(items: HistoryItem[]) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const groups: { label: string; items: HistoryItem[] }[] = [
    { label: "Today", items: [] },
    { label: "Yesterday", items: [] },
    { label: "Earlier", items: [] },
  ];

  for (const item of items) {
    if (item.createdAt >= startOfToday.getTime()) groups[0].items.push(item);
    else if (item.createdAt >= startOfYesterday.getTime()) groups[1].items.push(item);
    else groups[2].items.push(item);
  }
  return groups.filter((g) => g.items.length > 0);
}

function RequestRow({
  req,
  isActive,
  collection,
  onLoad,
  onDelete,
  onMove,
}: {
  req: HttpRequest;
  isActive: boolean;
  collection: Collection;
  onLoad: () => void;
  onDelete: () => void;
  onMove: (folderId: string | null) => void;
}) {
  const folders = collection.folders ?? [];
  return (
    <div
      className={cn(
        "group flex min-w-0 items-center rounded-md hover:bg-sidebar-accent",
        isActive && "bg-sidebar-accent",
      )}
    >
      <button
        type="button"
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 px-2 py-1.5 text-start text-xs"
        onClick={onLoad}
      >
        <span
          className={cn(
            "font-mono w-12 shrink-0 font-semibold",
            methodColorClass(req.method),
          )}
        >
          {req.method}
        </span>
        <span className="truncate">{req.name}</span>
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md opacity-0 hover:bg-muted group-hover:opacity-100"
          aria-label="Request menu"
        >
          <MoreHorizontal className="size-3.5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-44">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Move to…</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => onMove(null)}
              disabled={!req.folderId}
            >
              Collection root
            </DropdownMenuItem>
            {folders.map((f) => (
              <DropdownMenuItem
                key={f.id}
                onClick={() => onMove(f.id)}
                disabled={req.folderId === f.id}
              >
                {f.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={onDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        type="button"
        size="icon-xs"
        variant="ghost"
        className="shrink-0 opacity-0 group-hover:opacity-100"
        aria-label="Delete request"
        onClick={onDelete}
      >
        <Trash2 className="size-3" />
      </Button>
    </div>
  );
}

export function Sidebar() {
  const {
    sidebarTab,
    setSidebarTab,
    collections,
    savedRequests,
    history,
    loadRequest,
    loadHistoryItem,
    createCollection,
    renameCollection,
    deleteCollection,
    duplicateCollection,
    deleteSavedRequest,
    clearHistory,
    deleteHistoryItem,
    newRequest,
    addRequestToCollection,
    addFolder,
    renameFolder,
    deleteFolder,
    moveRequestToFolder,
    request,
  } = useWorkspace();

  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [folderCollapsed, setFolderCollapsed] = useState<Record<string, boolean>>({});
  const [newCollectionOpen, setNewCollectionOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<{ id: string; name: string } | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(
    null,
  );
  const [clearHistoryOpen, setClearHistoryOpen] = useState(false);
  const [newFolderTarget, setNewFolderTarget] = useState<{
    collectionId: string;
  } | null>(null);
  const [renameFolderTarget, setRenameFolderTarget] = useState<{
    collectionId: string;
    folderId: string;
    name: string;
  } | null>(null);
  const [deleteFolderTarget, setDeleteFolderTarget] = useState<{
    collectionId: string;
    folderId: string;
    name: string;
  } | null>(null);

  const filteredCollections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return collections;
    return collections.filter((c) => {
      if (c.name.toLowerCase().includes(q)) return true;
      if ((c.folders ?? []).some((f) => f.name.toLowerCase().includes(q))) return true;
      return savedRequests.some(
        (r) =>
          r.collectionId === c.id &&
          (r.name.toLowerCase().includes(q) || r.url.toLowerCase().includes(q)),
      );
    });
  }, [collections, savedRequests, query]);

  const filteredHistory = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return history;
    return history.filter(
      (h) =>
        h.url.toLowerCase().includes(q) ||
        h.method.toLowerCase().includes(q) ||
        String(h.status ?? "").includes(q),
    );
  }, [history, query]);

  return (
    <aside className="flex h-full min-w-0 flex-col overflow-hidden bg-transparent text-foreground">
      <div className="ep-chrome flex items-center gap-1 border-b p-2">
        <div
          role="group"
          aria-label="Sidebar views"
          className="inline-flex h-8 w-full items-center justify-center rounded-lg bg-background/70 p-[3px] text-muted-foreground"
        >
          <button
            type="button"
            aria-pressed={sidebarTab === "collections"}
            className={cn(
              "inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center rounded-md px-1.5 text-xs font-medium transition-all",
              sidebarTab === "collections"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setSidebarTab("collections")}
          >
            Collections
          </button>
          <button
            type="button"
            aria-pressed={sidebarTab === "history"}
            className={cn(
              "inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center rounded-md px-1.5 text-xs font-medium transition-all",
              sidebarTab === "history"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setSidebarTab("history")}
          >
            History
          </button>
        </div>
      </div>

      <div className="border-b border-sidebar-border p-2">
        <Input
          clearable
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter…"
          className="h-8 bg-background text-xs"
          aria-label="Filter sidebar"
        />
      </div>

      <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-2 pb-8">
        {sidebarTab === "collections" ? (
          <div className="space-y-1">
            <div className="mb-2 flex items-center justify-between px-1">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setNewCollectionOpen(true)}
              >
                <FolderPlus className="size-3.5" />
                New
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={newRequest}>
                <Plus className="size-3.5" />
                Request
              </Button>
            </div>

            {filteredCollections.length === 0 ? (
              <p className="px-2 py-6 text-center text-xs text-muted-foreground">
                No collections yet. Create one to save requests.
              </p>
            ) : (
              filteredCollections.map((col) => {
                const open = !collapsed[col.id];
                const reqs = savedRequests.filter((r) => r.collectionId === col.id);
                const folders = [...(col.folders ?? [])].sort((a, b) => a.order - b.order);
                const rootReqs = reqs.filter(
                  (r) => !r.folderId || !folders.some((f) => f.id === r.folderId),
                );
                return (
                  <div key={col.id} className="mb-1">
                    <div className="group flex min-w-0 items-center gap-0.5 rounded-md px-1 hover:bg-sidebar-accent">
                      <button
                        type="button"
                        className="flex min-w-0 flex-1 cursor-pointer items-center gap-1 py-1.5 text-start text-sm"
                        onClick={() =>
                          setCollapsed((prev) => ({ ...prev, [col.id]: !prev[col.id] }))
                        }
                      >
                        {open ? (
                          <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="icon-dir size-3.5 shrink-0 text-muted-foreground" />
                        )}
                        <span className="truncate font-medium">{col.name}</span>
                        <span className="shrink-0 text-[10px] text-muted-foreground">
                          {reqs.length}
                        </span>
                      </button>
                      <Button
                        type="button"
                        size="icon-xs"
                        variant="ghost"
                        className="shrink-0 opacity-0 group-hover:opacity-100"
                        aria-label={`Add request to ${col.name}`}
                        onClick={() => void addRequestToCollection(col.id)}
                      >
                        <Plus className="size-3.5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md opacity-0 hover:bg-muted group-hover:opacity-100"
                          aria-label="Collection menu"
                        >
                          <MoreHorizontal className="size-3.5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => void addRequestToCollection(col.id)}
                          >
                            Add request
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setNewFolderTarget({ collectionId: col.id })}
                          >
                            Add folder
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setRenameTarget({ id: col.id, name: col.name })}
                          >
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => void duplicateCollection(col.id)}>
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setDeleteTarget({ id: col.id, name: col.name })}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {open ? (
                      <div className="ms-2 min-w-0 space-y-0.5 border-s border-sidebar-border/70 ps-1">
                        {folders.map((folder) => {
                          const folderKey = `${col.id}:${folder.id}`;
                          const folderOpen = !folderCollapsed[folderKey];
                          const folderReqs = reqs.filter((r) => r.folderId === folder.id);
                          return (
                            <div key={folder.id}>
                              <div className="group flex min-w-0 items-center gap-0.5 rounded-md px-1 hover:bg-sidebar-accent">
                                <button
                                  type="button"
                                  className="flex min-w-0 flex-1 cursor-pointer items-center gap-1 py-1 text-start text-xs"
                                  onClick={() =>
                                    setFolderCollapsed((prev) => ({
                                      ...prev,
                                      [folderKey]: !prev[folderKey],
                                    }))
                                  }
                                >
                                  {folderOpen ? (
                                    <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="icon-dir size-3 shrink-0 text-muted-foreground" />
                                  )}
                                  <span className="truncate font-medium">{folder.name}</span>
                                  <span className="text-[10px] text-muted-foreground">
                                    {folderReqs.length}
                                  </span>
                                </button>
                                <Button
                                  type="button"
                                  size="icon-xs"
                                  variant="ghost"
                                  className="shrink-0 opacity-0 group-hover:opacity-100"
                                  aria-label={`Add request to ${folder.name}`}
                                  onClick={() =>
                                    void addRequestToCollection(col.id, folder.id)
                                  }
                                >
                                  <Plus className="size-3" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger
                                    className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md opacity-0 hover:bg-muted group-hover:opacity-100"
                                    aria-label="Folder menu"
                                  >
                                    <MoreHorizontal className="size-3" />
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() =>
                                        void addRequestToCollection(col.id, folder.id)
                                      }
                                    >
                                      Add request
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        setRenameFolderTarget({
                                          collectionId: col.id,
                                          folderId: folder.id,
                                          name: folder.name,
                                        })
                                      }
                                    >
                                      Rename
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      variant="destructive"
                                      onClick={() =>
                                        setDeleteFolderTarget({
                                          collectionId: col.id,
                                          folderId: folder.id,
                                          name: folder.name,
                                        })
                                      }
                                    >
                                      Delete folder
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              {folderOpen
                                ? folderReqs.map((req) => (
                                    <div key={req.id} className="ms-3 min-w-0">
                                      <RequestRow
                                        req={req}
                                        collection={col}
                                        isActive={request.id === req.id}
                                        onLoad={() => loadRequest(req)}
                                        onDelete={() => void deleteSavedRequest(req.id)}
                                        onMove={(folderId) =>
                                          void moveRequestToFolder(req.id, folderId)
                                        }
                                      />
                                    </div>
                                  ))
                                : null}
                            </div>
                          );
                        })}
                        {rootReqs.map((req) => (
                          <RequestRow
                            key={req.id}
                            req={req}
                            collection={col}
                            isActive={request.id === req.id}
                            onLoad={() => loadRequest(req)}
                            onDelete={() => void deleteSavedRequest(req.id)}
                            onMove={(folderId) =>
                              void moveRequestToFolder(req.id, folderId)
                            }
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-end px-1">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={history.length === 0}
                onClick={() => setClearHistoryOpen(true)}
              >
                Clear all
              </Button>
            </div>
            {filteredHistory.length === 0 ? (
              <p className="px-2 py-6 text-center text-xs text-muted-foreground">
                Sent requests will appear here.
              </p>
            ) : (
              groupHistory(filteredHistory).map((group) => (
                <div key={group.label} className="space-y-1">
                  <p className="px-2 pt-1 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    {group.label}
                  </p>
                  <ul className="space-y-0.5">
                    {group.items.map((item) => {
                      let pathLabel = item.url;
                      try {
                        const u = new URL(item.url);
                        pathLabel = u.pathname + u.search || "/";
                      } catch {
                        /* keep full url */
                      }
                      return (
                        <li key={item.id}>
                          <div className="group relative flex min-w-0 items-stretch rounded-md hover:bg-[var(--surface-hover)]">
                            <button
                              type="button"
                              className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 px-2 py-2 text-start"
                              onClick={() => loadHistoryItem(item)}
                            >
                              <span
                                className={cn(
                                  "font-mono w-11 shrink-0 text-[11px] font-semibold",
                                  methodColorClass(item.method),
                                )}
                              >
                                {item.method}
                              </span>
                              <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-foreground/90">
                                {pathLabel}
                              </span>
                              <span className="hidden shrink-0 font-mono text-[10px] text-muted-foreground sm:inline">
                                {item.error
                                  ? "err"
                                  : item.status != null
                                    ? String(item.status)
                                    : "—"}
                              </span>
                            </button>
                            <Button
                              type="button"
                              size="icon-xs"
                              variant="ghost"
                              className="my-auto me-1 shrink-0 opacity-0 group-hover:opacity-100"
                              aria-label="Delete history item"
                              onClick={() => void deleteHistoryItem(item.id)}
                            >
                              <Trash2 className="size-3" />
                            </Button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <PromptDialog
        open={newCollectionOpen}
        onOpenChange={setNewCollectionOpen}
        title="New collection"
        defaultValue="New collection"
        confirmLabel="Create"
        onConfirm={(name) => void createCollection(name)}
      />
      <PromptDialog
        open={Boolean(renameTarget)}
        onOpenChange={(open) => {
          if (!open) setRenameTarget(null);
        }}
        title="Rename collection"
        defaultValue={renameTarget?.name ?? ""}
        confirmLabel="Rename"
        onConfirm={(name) => {
          if (renameTarget) void renameCollection(renameTarget.id, name);
        }}
      />
      <PromptDialog
        open={Boolean(newFolderTarget)}
        onOpenChange={(open) => {
          if (!open) setNewFolderTarget(null);
        }}
        title="New folder"
        defaultValue="New folder"
        confirmLabel="Create"
        onConfirm={(name) => {
          if (newFolderTarget) void addFolder(newFolderTarget.collectionId, name);
        }}
      />
      <PromptDialog
        open={Boolean(renameFolderTarget)}
        onOpenChange={(open) => {
          if (!open) setRenameFolderTarget(null);
        }}
        title="Rename folder"
        defaultValue={renameFolderTarget?.name ?? ""}
        confirmLabel="Rename"
        onConfirm={(name) => {
          if (renameFolderTarget) {
            void renameFolder(
              renameFolderTarget.collectionId,
              renameFolderTarget.folderId,
              name,
            );
          }
        }}
      />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete collection?"
        description={
          deleteTarget
            ? `“${deleteTarget.name}” and its saved requests will be removed from this device.`
            : undefined
        }
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          if (deleteTarget) void deleteCollection(deleteTarget.id);
        }}
      />
      <ConfirmDialog
        open={Boolean(deleteFolderTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteFolderTarget(null);
        }}
        title="Delete folder?"
        description={
          deleteFolderTarget
            ? `“${deleteFolderTarget.name}” will be removed. Requests inside move to the collection root.`
            : undefined
        }
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          if (deleteFolderTarget) {
            void deleteFolder(
              deleteFolderTarget.collectionId,
              deleteFolderTarget.folderId,
            );
          }
        }}
      />
      <ConfirmDialog
        open={clearHistoryOpen}
        onOpenChange={setClearHistoryOpen}
        title="Clear history?"
        description="All request history on this device will be permanently removed."
        confirmLabel="Clear all"
        destructive
        onConfirm={() => void clearHistory()}
      />
    </aside>
  );
}
