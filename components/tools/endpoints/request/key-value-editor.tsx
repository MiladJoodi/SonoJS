"use client";

import { GripVertical, Plus, Trash2 } from "lucide-react";
import type { KeyValuePair } from "@/components/tools/endpoints/types";
import { createPair } from "@/components/tools/endpoints/lib/id";
import { Button } from "@/components/tools/endpoints/ui/button";
import { Checkbox } from "@/components/tools/endpoints/ui/checkbox";
import { Input } from "@/components/tools/endpoints/ui/input";
import { cn } from "@/lib/utils";

interface KeyValueEditorProps {
  pairs: KeyValuePair[];
  onChange: (pairs: KeyValuePair[]) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  valueType?: "text" | "password";
  suggestions?: string[];
}

const ROW =
  "grid min-w-0 grid-cols-[1.75rem_minmax(0,1fr)_minmax(0,1fr)_1.75rem_1.75rem] items-center gap-1";

export function KeyValueEditor({
  pairs,
  onChange,
  keyPlaceholder = "Key",
  valuePlaceholder = "Value",
  valueType = "text",
  suggestions,
}: KeyValueEditorProps) {
  const update = (id: string, patch: Partial<KeyValuePair>) => {
    onChange(pairs.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const remove = (id: string) => {
    const next = pairs.filter((p) => p.id !== id);
    onChange(next.length ? next : [createPair()]);
  };

  const add = () => onChange([...pairs, createPair()]);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= pairs.length) return;
    const next = [...pairs];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div className="flex min-w-0 flex-col gap-1.5 overflow-x-hidden">
      <div
        className={cn(
          ROW,
          "px-0.5 text-xs text-muted-foreground",
        )}
      >
        <span />
        <span className="min-w-0 truncate">Key</span>
        <span className="min-w-0 truncate">Value</span>
        <span className="sr-only">Enabled</span>
        <span className="sr-only">Delete</span>
      </div>
      {pairs.map((pair, index) => (
        <div
          key={pair.id}
          className={cn(ROW, !pair.enabled && "opacity-50")}
        >
          <button
            type="button"
            className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label="Reorder"
            onClick={() => move(index, index - 1)}
            onContextMenu={(e) => {
              e.preventDefault();
              move(index, index + 1);
            }}
            title="Click to move up, right-click to move down"
          >
            <GripVertical className="size-3.5" />
          </button>
          <Input
            value={pair.key}
            onChange={(e) => update(pair.id, { key: e.target.value })}
            placeholder={keyPlaceholder}
            className="font-mono h-8 min-w-0 text-xs"
            list={suggestions ? `kv-suggest-${pair.id}` : undefined}
            aria-label="Key"
          />
          {suggestions ? (
            <datalist id={`kv-suggest-${pair.id}`}>
              {suggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          ) : null}
          <Input
            type={valueType}
            value={pair.value}
            onChange={(e) => update(pair.id, { value: e.target.value })}
            placeholder={valuePlaceholder}
            className="font-mono h-8 min-w-0 text-xs"
            aria-label="Value"
          />
          <div className="flex size-7 items-center justify-center">
            <Checkbox
              checked={pair.enabled}
              onCheckedChange={(checked) =>
                update(pair.id, { enabled: Boolean(checked) })
              }
              aria-label="Enabled"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="size-7"
            onClick={() => remove(pair.id)}
            aria-label="Delete row"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      ))}
      <div>
        <Button type="button" variant="ghost" size="sm" onClick={add}>
          <Plus className="size-3.5" />
          Add
        </Button>
      </div>
    </div>
  );
}
