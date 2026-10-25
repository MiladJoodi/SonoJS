"use client";

import { useEffect, useState } from "react";
import { useWorkspace } from "@/components/tools/endpoints/workspace/workspace-provider";
import { createPair } from "@/components/tools/endpoints/lib/id";
import { KeyValueEditor } from "@/components/tools/endpoints/request/key-value-editor";
import { ConfirmDialog, PromptDialog } from "@/components/tools/endpoints/dialogs/app-dialogs";
import { Button } from "@/components/tools/endpoints/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tools/endpoints/ui/dialog";
import { Input } from "@/components/tools/endpoints/ui/input";
import type { Environment } from "@/components/tools/endpoints/types";

interface EnvironmentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function cloneEnv(env: Environment): Environment {
  return structuredClone(env);
}

function envsEqual(a: Environment, b: Environment): boolean {
  return (
    a.name === b.name &&
    a.variables.length === b.variables.length &&
    a.variables.every(
      (v, i) =>
        v.id === b.variables[i]?.id &&
        v.key === b.variables[i]?.key &&
        v.value === b.variables[i]?.value &&
        v.enabled === b.variables[i]?.enabled,
    )
  );
}

export function EnvironmentsDialog({ open, onOpenChange }: EnvironmentsDialogProps) {
  const {
    environments,
    createEnvironment,
    updateEnvironment,
    deleteEnvironment,
    setActiveEnvironmentId,
    preferences,
  } = useWorkspace();

  const [newOpen, setNewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Environment | null>(null);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const activeId = preferences.activeEnvironmentId;

  const dirty = Boolean(
    draft &&
      (() => {
        const source = environments.find((e) => e.id === draft.id);
        return source ? !envsEqual(draft, source) : false;
      })(),
  );

  // Keep a selected env when the dialog opens / list changes
  useEffect(() => {
    if (!open) return;
    const preferred =
      (activeId && environments.find((e) => e.id === activeId)?.id) ||
      environments[0]?.id ||
      null;
    setSelectedId((prev) => {
      if (prev && environments.some((e) => e.id === prev)) return prev;
      return preferred;
    });
  }, [open, environments, activeId]);

  // Load draft when opening or switching selection
  useEffect(() => {
    if (!open) {
      setDraft(null);
      setJustSaved(false);
      return;
    }
    const source = environments.find((e) => e.id === selectedId);
    setDraft(source ? cloneEnv(source) : null);
    // Only re-load when the selection changes, not on every live save of other fields
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedId]);

  const selectEnv = async (id: string) => {
    if (id === selectedId) return;
    if (dirty && draft) {
      await updateEnvironment(draft);
    }
    setSelectedId(id);
    setJustSaved(false);
  };

  const saveDraft = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      await updateEnvironment(draft);
      setJustSaved(true);
      window.setTimeout(() => setJustSaved(false), 1500);
    } finally {
      setSaving(false);
    }
  };

  const handleDone = async () => {
    if (dirty && draft) {
      await updateEnvironment(draft);
    }
    onOpenChange(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && dirty && draft) {
      void updateEnvironment(draft).finally(() => onOpenChange(false));
      return;
    }
    onOpenChange(next);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="flex max-h-[min(85vh,100dvh)] w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
          <DialogHeader className="shrink-0 space-y-1.5 border-b border-border/70 px-4 py-4 pe-12">
            <DialogTitle>Environments</DialogTitle>
            <DialogDescription className="text-pretty">
              Choose an active environment. Its variables replace{" "}
              <code className="font-mono rounded bg-muted px-1 py-0.5 text-[11px]">
                {"{{likeThis}}"}
              </code>{" "}
              in URLs, headers, and body.
            </DialogDescription>
          </DialogHeader>

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-4 py-4">
            <div className="flex flex-wrap items-center gap-2">
              {environments.map((env) => {
                const isSelected = env.id === selectedId;
                const isActive = env.id === activeId;
                return (
                  <Button
                    key={env.id}
                    type="button"
                    size="sm"
                    variant={isSelected ? "secondary" : "outline"}
                    onClick={() => void selectEnv(env.id)}
                  >
                    {env.name}
                    {isActive ? " · Active" : ""}
                  </Button>
                );
              })}
              <Button type="button" size="sm" variant="ghost" onClick={() => setNewOpen(true)}>
                New
              </Button>
            </div>

            {draft ? (
              <div className="min-h-0 flex-1 space-y-3 overflow-auto pe-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    value={draft.name}
                    onChange={(e) => {
                      setDraft({ ...draft, name: e.target.value });
                      setJustSaved(false);
                    }}
                    aria-label="Environment name"
                    className="max-w-xs"
                  />
                  {draft.id === activeId ? (
                    <span className="text-xs text-muted-foreground">
                      Used for variable resolution
                    </span>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => setActiveEnvironmentId(draft.id)}
                    >
                      Set as active
                    </Button>
                  )}
                </div>

                <KeyValueEditor
                  pairs={draft.variables}
                  onChange={(variables) => {
                    setDraft({ ...draft, variables });
                    setJustSaved(false);
                  }}
                  keyPlaceholder="Variable"
                  valuePlaceholder="Value"
                />

                <div className="flex justify-between pt-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setDraft({
                        ...draft,
                        variables: [...draft.variables, createPair()],
                      });
                      setJustSaved(false);
                    }}
                  >
                    Add row
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteOpen(true)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Create an environment to store variables like baseUrl and token.
              </p>
            )}
          </div>

          <DialogFooter className="mx-0 mb-0 shrink-0 gap-3 rounded-none border-t border-border/70 bg-muted/40 px-4 py-3 sm:justify-between">
            <p className="min-h-4 self-center text-xs text-muted-foreground">
              {justSaved
                ? "Saved"
                : dirty
                  ? "Unsaved changes"
                  : draft
                    ? "All changes saved"
                    : ""}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={!dirty || saving}
                onClick={() => void saveDraft()}
              >
                {saving ? "Saving…" : "Save"}
              </Button>
              <Button type="button" onClick={() => void handleDone()}>
                Done
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PromptDialog
        open={newOpen}
        onOpenChange={setNewOpen}
        title="New environment"
        defaultValue="Development"
        confirmLabel="Create"
        onConfirm={async (name) => {
          const env = await createEnvironment(name);
          setSelectedId(env.id);
          setDraft(cloneEnv(env));
          setJustSaved(false);
        }}
      />
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete environment?"
        description={
          draft
            ? `“${draft.name}” and its variables will be removed from this device.`
            : undefined
        }
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          if (!draft) return;
          const id = draft.id;
          void deleteEnvironment(id).then(() => {
            setDraft(null);
            setSelectedId(null);
          });
        }}
      />
    </>
  );
}
