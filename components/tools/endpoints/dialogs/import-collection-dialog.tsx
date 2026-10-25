"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { useWorkspace } from "@/components/tools/endpoints/workspace/workspace-provider";
import { parseImportJson } from "@/components/tools/endpoints/lib/export/postman";
import { Button } from "@/components/tools/endpoints/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tools/endpoints/ui/dialog";

interface ImportCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportCollectionDialog({
  open,
  onOpenChange,
}: ImportCollectionDialogProps) {
  const { importBundle } = useWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | null) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const text = await file.text();
      const result = parseImportJson(text);
      await importBundle({
        collections: result.collections,
        requests: result.requests,
        environments: result.environments,
      });
      toast.success(
        `Imported “${result.label}” (${result.requests.length} request${
          result.requests.length === 1 ? "" : "s"
        })`,
      );
      onOpenChange(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't import file.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import collection</DialogTitle>
          <DialogDescription>
            Import OpenAPI 3.x JSON, a Postman Collection v2.1, or an API Client
            backup. Requests are added alongside your existing collections.
          </DialogDescription>
        </DialogHeader>

        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => void handleFile(e.target.files?.[0] ?? null)}
        />

        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? "Importing…" : "Choose JSON file…"}
        </Button>

        {error ? (
          <p className="text-xs text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
