"use client"

import * as React from "react"
import { ChevronRightIcon } from "lucide-react"

import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@sonojs/ui/components/collapsible"
import { cn } from "@sonojs/ui/lib/utils"

import {
  getNodeState,
  normalizeCheckedIds,
  toggleNodeInValue,
  type TreeCheckboxNode,
} from "./lib"

export type { TreeCheckboxNode, TreeNodeState } from "./lib"

export type TreeCheckboxProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "children"
> & {
  data: TreeCheckboxNode[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  expanded?: string[]
  defaultExpanded?: string[]
  onExpandedChange?: (expanded: string[]) => void
  disabled?: boolean
}

function TreeCheckbox({
  data,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  expanded: expandedProp,
  defaultExpanded = [],
  onExpandedChange,
  disabled = false,
  className,
  ...props
}: TreeCheckboxProps) {
  const [uncontrolled, setUncontrolled] = React.useState<string[]>(defaultValue)
  const [uncontrolledExpanded, setUncontrolledExpanded] =
    React.useState<string[]>(defaultExpanded)

  const isValueControlled = valueProp !== undefined
  const isExpandedControlled = expandedProp !== undefined
  const rawValue = isValueControlled ? valueProp : uncontrolled
  const value = React.useMemo(
    () => normalizeCheckedIds(data, rawValue),
    [data, rawValue]
  )
  const expanded = isExpandedControlled ? expandedProp : uncontrolledExpanded
  const checkedSet = React.useMemo(() => new Set(value), [value])
  const expandedSet = React.useMemo(() => new Set(expanded), [expanded])

  const setValue = React.useCallback(
    (next: string[]) => {
      const normalized = normalizeCheckedIds(data, next)
      if (!isValueControlled) setUncontrolled(normalized)
      onValueChange?.(normalized)
    },
    [data, isValueControlled, onValueChange]
  )

  const setExpanded = React.useCallback(
    (next: string[]) => {
      if (!isExpandedControlled) setUncontrolledExpanded(next)
      onExpandedChange?.(next)
    },
    [isExpandedControlled, onExpandedChange]
  )

  const toggleExpanded = React.useCallback(
    (id: string, open: boolean) => {
      const next = new Set(expanded)
      if (open) next.add(id)
      else next.delete(id)
      setExpanded([...next])
    },
    [expanded, setExpanded]
  )

  const toggleChecked = React.useCallback(
    (nodeId: string) => {
      if (disabled) return
      setValue(toggleNodeInValue(data, checkedSet, nodeId))
    },
    [checkedSet, data, disabled, setValue]
  )

  return (
    <div
      data-slot="tree-checkbox"
      data-disabled={disabled ? "" : undefined}
      role="tree"
      aria-multiselectable="true"
      className={cn("flex w-full flex-col gap-0.5", className)}
      {...props}
    >
      {data.map((node) => (
        <TreeCheckboxItem
          key={node.id}
          node={node}
          depth={0}
          checkedSet={checkedSet}
          expandedSet={expandedSet}
          disabled={disabled}
          onToggleChecked={toggleChecked}
          onToggleExpanded={toggleExpanded}
        />
      ))}
    </div>
  )
}

function TreeCheckboxItem({
  node,
  depth,
  checkedSet,
  expandedSet,
  disabled,
  onToggleChecked,
  onToggleExpanded,
}: {
  node: TreeCheckboxNode
  depth: number
  checkedSet: ReadonlySet<string>
  expandedSet: ReadonlySet<string>
  disabled: boolean
  onToggleChecked: (id: string) => void
  onToggleExpanded: (id: string, open: boolean) => void
}) {
  const hasChildren = Boolean(node.children?.length)
  const state = getNodeState(node, checkedSet)
  const isOpen = expandedSet.has(node.id)
  const rowDisabled = disabled || Boolean(node.disabled)
  const checkedProp =
    state === "checked"
      ? true
      : state === "indeterminate"
        ? ("indeterminate" as const)
        : false

  const row = (
    <div
      role="treeitem"
      aria-expanded={hasChildren ? isOpen : undefined}
      aria-selected={state === "checked"}
      data-depth={depth}
      className="flex min-h-8 items-center gap-1.5 rounded-md px-1 py-0.5 hover:bg-muted/50"
    >
      {hasChildren ? (
        <CollapsibleTrigger
          type="button"
          aria-label={isOpen ? `Collapse ${node.label}` : `Expand ${node.label}`}
          className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring disabled:pointer-events-none disabled:opacity-50"
          disabled={rowDisabled}
        >
          <ChevronRightIcon
            className={cn(
              "size-3.5 icon-dir transition-transform duration-200",
              isOpen && "rotate-90 rtl:-rotate-90"
            )}
            aria-hidden
          />
        </CollapsibleTrigger>
      ) : (
        <span className="size-6 shrink-0" aria-hidden />
      )}
      <Checkbox
        id={`tree-checkbox-${node.id}`}
        checked={checkedProp}
        disabled={rowDisabled}
        onCheckedChange={() => onToggleChecked(node.id)}
        aria-label={node.label}
      />
      <label
        htmlFor={`tree-checkbox-${node.id}`}
        className={cn(
          "min-w-0 flex-1 cursor-pointer truncate text-sm",
          rowDisabled && "cursor-not-allowed opacity-50"
        )}
      >
        {node.label}
      </label>
    </div>
  )

  if (!hasChildren) {
    return row
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={(open) => onToggleExpanded(node.id, open)}
      disabled={rowDisabled}
    >
      {row}
      <CollapsibleContent>
        <div className="ms-3 flex flex-col gap-0.5 border-s border-border/70 ps-2">
          {node.children!.map((child) => (
            <TreeCheckboxItem
              key={child.id}
              node={child}
              depth={depth + 1}
              checkedSet={checkedSet}
              expandedSet={expandedSet}
              disabled={disabled}
              onToggleChecked={onToggleChecked}
              onToggleExpanded={onToggleExpanded}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { TreeCheckbox }
