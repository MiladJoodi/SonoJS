"use client";

import { useState } from "react";
import { useWorkspace } from "@/components/tools/endpoints/workspace/workspace-provider";
import { Button } from "@/components/tools/endpoints/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tools/endpoints/ui/dialog";
import { Textarea } from "@/components/tools/endpoints/ui/textarea";

const parseCurlLazy = async (text: string) => {
  const { parseCurl } = await import("@/components/tools/endpoints/lib/parser/curl");
  return parseCurl(text);
};

interface ImportCurlDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportCurlDialog({ open, onOpenChange }: ImportCurlDialogProps) {
  const { loadRequest } = useWorkspace();
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import cURL</DialogTitle>
          <DialogDescription>
            Paste a cURL command. Common flags like -X, -H, -d, and -u are supported.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`curl https://api.example.com/users \\\n  -H "Authorization: Bearer token"`}
          className="font-mono min-h-[160px] text-xs"
          aria-label="cURL command"
        />
        {error ? (
          <p className="text-xs text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={async () => {
              try {
                const req = await parseCurlLazy(text);
                loadRequest(req);
                setText("");
                setError(null);
                onOpenChange(false);
              } catch (e) {
                setError(e instanceof Error ? e.message : "Couldn't parse cURL.");
              }
            }}
          >
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
