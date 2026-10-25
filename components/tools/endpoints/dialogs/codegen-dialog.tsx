"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useWorkspace } from "@/components/tools/endpoints/workspace/workspace-provider";
import {
  CODEGEN_LANGUAGES,
  generateCode,
  type CodegenLanguage,
} from "@/components/tools/endpoints/lib/export/codegen";
import { Button } from "@/components/tools/endpoints/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Textarea } from "@/components/tools/endpoints/ui/textarea";

interface CodegenDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CodegenDialog({ open, onOpenChange }: CodegenDialogProps) {
  const { request } = useWorkspace();
  const [language, setLanguage] = useState<CodegenLanguage>("fetch");

  const code = useMemo(
    () => generateCode(request, language),
    [request, language],
  );

  const languageItems = useMemo(
    () => Object.fromEntries(CODEGEN_LANGUAGES.map((l) => [l.id, l.label])),
    [],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Generate code</DialogTitle>
          <DialogDescription>
            Copy this request as client code. Variables are not resolved — export
            uses the values currently in the editor.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Select
            value={language}
            items={languageItems}
            onValueChange={(value) => {
              if (!value) return;
              setLanguage(value as CodegenLanguage);
            }}
          >
            <SelectTrigger aria-label="Language" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CODEGEN_LANGUAGES.map((l) => (
                <SelectItem key={l.id} value={l.id}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            readOnly
            value={code}
            className="font-mono min-h-[240px] text-xs leading-relaxed"
            aria-label="Generated code"
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(code);
                toast.success("Code copied");
              } catch {
                toast.error("Couldn't copy to clipboard");
              }
            }}
          >
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
