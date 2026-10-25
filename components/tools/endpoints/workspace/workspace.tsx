"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import "./workspace.css";
import { TopBar } from "@/components/tools/endpoints/app-shell/top-bar";
import { Sidebar } from "@/components/tools/endpoints/app-shell/sidebar";
import { RequestBar } from "@/components/tools/endpoints/request/request-bar";
import { RequestConfig } from "@/components/tools/endpoints/request/request-config";
import { ResponseViewer } from "@/components/tools/endpoints/response/response-viewer";
import { RequestTabs } from "@/components/tools/endpoints/workspace/request-tabs";
import { useDirection } from "@/hooks/use-direction";
import { getStartSide } from "@/lib/direction";
import {
  useWorkspace,
  WorkspaceProvider,
} from "@/components/tools/endpoints/workspace/workspace-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/tools/endpoints/ui/sheet";
import { Input } from "@/components/tools/endpoints/ui/input";
import { Button } from "@/components/tools/endpoints/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tools/endpoints/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/tools/endpoints/ui/select";

const ImportCurlDialog = dynamic(
  () =>
    import("@/components/tools/endpoints/dialogs/import-curl-dialog").then(
      (m) => m.ImportCurlDialog,
    ),
  { ssr: false },
);
const ImportCollectionDialog = dynamic(
  () =>
    import("@/components/tools/endpoints/dialogs/import-collection-dialog").then(
      (m) => m.ImportCollectionDialog,
    ),
  { ssr: false },
);
const CodegenDialog = dynamic(
  () =>
    import("@/components/tools/endpoints/dialogs/codegen-dialog").then((m) => m.CodegenDialog),
  { ssr: false },
);
const EnvironmentsDialog = dynamic(
  () =>
    import("@/components/tools/endpoints/dialogs/environments-dialog").then(
      (m) => m.EnvironmentsDialog,
    ),
  { ssr: false },
);
const PromptDialog = dynamic(
  () =>
    import("@/components/tools/endpoints/dialogs/app-dialogs").then((m) => m.PromptDialog),
  { ssr: false },
);

function WorkspaceInner() {
  const {
    ready,
    request,
    setRequest,
    saveRequest,
    quickSaveRequest,
    collections,
    createCollection,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useWorkspace();
  const { dir } = useDirection();

  const [importOpen, setImportOpen] = useState(false);
  const [importCollectionOpen, setImportCollectionOpen] = useState(false);
  const [codegenOpen, setCodegenOpen] = useState(false);
  const [envOpen, setEnvOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [saveCollectionId, setSaveCollectionId] = useState<string>("");
  const [saveAsNew, setSaveAsNew] = useState(false);
  const [newCollectionForSaveOpen, setNewCollectionForSaveOpen] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const collectionItems = useMemo(
    () => Object.fromEntries(collections.map((c) => [c.id, c.name])),
    [collections],
  );

  const handleQuickSave = async () => {
    await quickSaveRequest();
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 1200);
  };

  if (!ready) {
    return (
      <div className="flex h-full min-h-0 flex-1 items-center justify-center text-sm text-muted-foreground">
        Loading workspace…
      </div>
    );
  }

  return (
    <div className="endpoints-workspace flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <style>{`
        .endpoints-workspace {
          --ep-well: var(--background);
          --ep-card: var(--background);
          --ep-header: var(--muted);
          --ep-line: color-mix(in oklab, var(--border) 80%, transparent);
        }
        .dark .endpoints-workspace {
          --ep-well: var(--background);
          --ep-card: var(--card);
          --ep-header: color-mix(in oklab, var(--muted) 40%, var(--card));
          --ep-line: color-mix(in oklab, white 10%, transparent);
        }
        .endpoints-workspace .ep-well { background: var(--ep-well); }
        .endpoints-workspace .ep-panel {
          background: var(--ep-card);
          border: 1px solid var(--ep-line);
          border-radius: var(--radius-surface);
          box-shadow: 0 1px 2px rgb(24 24 27 / 0.04);
        }
        .endpoints-workspace .ep-chrome { background: var(--ep-header); }
        .endpoints-workspace .ep-field {
          background: var(--ep-card);
          border: 1px solid var(--ep-line);
        }
        .endpoints-workspace .ep-field > .relative,
        .endpoints-workspace .ep-field [data-slot="input-clearable"] {
          display: flex;
          height: 100%;
          min-height: 0;
          min-width: 0;
          flex: 1;
          align-items: stretch;
        }
        .endpoints-workspace .ep-field [data-slot="select-trigger"],
        .endpoints-workspace .ep-field [data-slot="input"],
        .endpoints-workspace .ep-field > button {
          height: 100%;
          border-radius: 0;
          box-shadow: none;
        }
        .endpoints-workspace .ep-field [data-slot="select-trigger"],
        .endpoints-workspace .ep-field [data-slot="input"] {
          border: 0;
          background: transparent;
        }
        .endpoints-workspace .ep-field [data-slot="select-trigger"] {
          width: 5.75rem;
          flex-shrink: 0;
          padding-block: 0;
          border-inline-end: 1px solid var(--ep-line);
        }
        .endpoints-workspace .ep-field [data-slot="select-trigger"]:hover {
          background: var(--muted);
        }
        .endpoints-workspace .ep-field [data-slot="select-trigger"]:focus-visible,
        .endpoints-workspace .ep-field [data-slot="input"]:focus-visible {
          outline: none;
          box-shadow: none;
        }
        .endpoints-workspace .ep-field > button {
          border-width: 0;
        }
      `}</style>
      <TopBar
        onImportCurl={() => setImportOpen(true)}
        onImportCollection={() => setImportCollectionOpen(true)}
        onGenerateCode={() => setCodegenOpen(true)}
        onEnvironments={() => setEnvOpen(true)}
        onSave={() => void handleQuickSave()}
      />

      <div className="ep-well flex min-h-0 flex-1 gap-2 p-2">
        <div className="ep-panel hidden w-[260px] shrink-0 overflow-hidden lg:block">
          <Sidebar />
        </div>

        <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <SheetContent side={getStartSide(dir)} className="w-[min(300px,88vw)] max-w-full p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>

        <main className="ep-panel flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <RequestTabs />
          <div className="ep-chrome border-b px-3 py-2.5">
            <div className="mb-2 flex min-w-0 flex-wrap items-center gap-2">
              <Input
                value={request.name}
                onChange={(e) =>
                  setRequest((prev) => ({ ...prev, name: e.target.value }))
                }
                className="h-8 min-w-0 max-w-full flex-1 bg-background px-2.5 text-sm font-medium shadow-none sm:max-w-xs sm:flex-none"
                aria-label="Request name"
              />

              {request.collectionId && collections.length > 0 ? (
                <>
                  <Select
                    value={request.collectionId}
                    items={collectionItems}
                    onValueChange={(value) => {
                      if (!value || value === request.collectionId) return;
                      setRequest((prev) => ({
                        ...prev,
                        collectionId: value,
                        folderId: undefined,
                      }));
                    }}
                  >
                    <SelectTrigger
                      className="h-8 w-full max-w-[11rem] text-xs sm:w-[9.5rem]"
                      aria-label="Collection"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="hidden text-[11px] text-muted-foreground sm:inline">
                    {justSaved ? "Saved" : "Auto-saves"}
                  </span>
                </>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-8 shrink-0 bg-background"
                  onClick={() => void handleQuickSave()}
                >
                  Save
                </Button>
              )}
            </div>
            <RequestBar />
          </div>

          <div className="grid min-h-0 flex-1 grid-rows-[minmax(200px,42%)_minmax(220px,1fr)] lg:grid-rows-1 lg:grid-cols-[minmax(280px,38%)_minmax(0,1fr)]">
            <div className="min-h-0 min-w-0 overflow-x-hidden overflow-y-auto border-b bg-background lg:border-e lg:border-b-0">
              <RequestConfig />
            </div>
            <div className="min-h-0 min-w-0 overflow-hidden bg-background">
              <ResponseViewer />
            </div>
          </div>
        </main>
      </div>

      <ImportCurlDialog open={importOpen} onOpenChange={setImportOpen} />
      <ImportCollectionDialog
        open={importCollectionOpen}
        onOpenChange={setImportCollectionOpen}
      />
      <CodegenDialog open={codegenOpen} onOpenChange={setCodegenOpen} />
      <EnvironmentsDialog open={envOpen} onOpenChange={setEnvOpen} />

      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{saveAsNew ? "Save as new request" : "Save to collection"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Request name"
              aria-label="Request name"
            />
            <Select
              value={saveCollectionId || (collections[0]?.id ?? "new")}
              items={{
                ...Object.fromEntries(collections.map((c) => [c.id, c.name])),
                new: "Create new collection…",
              }}
              onValueChange={(value) => {
                if (!value) return;
                if (value === "new") {
                  setSaveOpen(false);
                  setNewCollectionForSaveOpen(true);
                  return;
                }
                setSaveCollectionId(value);
              }}
            >
              <SelectTrigger aria-label="Collection" className="w-full">
                <SelectValue placeholder="Collection" />
              </SelectTrigger>
              <SelectContent>
                {collections.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
                <SelectItem value="new">Create new collection…</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setSaveOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={async () => {
                let collectionId = saveCollectionId;
                if (!collectionId || collectionId === "new") {
                  if (collections[0]) {
                    collectionId = collections[0].id;
                  } else {
                    setSaveOpen(false);
                    setNewCollectionForSaveOpen(true);
                    return;
                  }
                }
                await saveRequest(collectionId, saveName, { asNew: saveAsNew });
                setSaveOpen(false);
                setJustSaved(true);
                window.setTimeout(() => setJustSaved(false), 1200);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PromptDialog
        open={newCollectionForSaveOpen}
        onOpenChange={setNewCollectionForSaveOpen}
        title="New collection"
        defaultValue="My Collection"
        confirmLabel="Create"
        onConfirm={async (name) => {
          const col = await createCollection(name);
          setSaveCollectionId(col.id);
          await saveRequest(col.id, saveName || request.name || "Untitled", {
            asNew: saveAsNew,
          });
          setJustSaved(true);
          window.setTimeout(() => setJustSaved(false), 1200);
        }}
      />
    </div>
  );
}

export function Workspace() {
  return (
    <WorkspaceProvider>
      <WorkspaceInner />
    </WorkspaceProvider>
  );
}
