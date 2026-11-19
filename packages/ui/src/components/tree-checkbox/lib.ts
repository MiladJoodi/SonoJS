export type TreeCheckboxNode = {
  id: string
  label: string
  disabled?: boolean
  children?: TreeCheckboxNode[]
}

export type TreeNodeState = "checked" | "indeterminate" | "unchecked"

/** Flatten every node id under `node` (including `node` itself). */
export function getDescendantIds(node: TreeCheckboxNode): string[] {
  const ids = [node.id]
  for (const child of node.children ?? []) {
    ids.push(...getDescendantIds(child))
  }
  return ids
}

/** All ids in a forest (roots included). */
export function collectAllIds(nodes: TreeCheckboxNode[]): string[] {
  return nodes.flatMap((node) => getDescendantIds(node))
}

function findNode(
  nodes: TreeCheckboxNode[],
  id: string
): TreeCheckboxNode | null {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children?.length) {
      const found = findNode(node.children, id)
      if (found) return found
    }
  }
  return null
}

/**
 * Derived checkbox state for a node from the checked id set.
 * Leaves: checked iff id is in `checked`.
 * Parents: all descendants checked → checked; some → indeterminate; none → unchecked.
 */
export function getNodeState(
  node: TreeCheckboxNode,
  checked: ReadonlySet<string>
): TreeNodeState {
  const children = node.children
  if (!children?.length) {
    return checked.has(node.id) ? "checked" : "unchecked"
  }

  let checkedCount = 0
  let indeterminateCount = 0
  for (const child of children) {
    const state = getNodeState(child, checked)
    if (state === "checked") checkedCount++
    else if (state === "indeterminate") indeterminateCount++
  }

  if (checkedCount === children.length) return "checked"
  if (checkedCount > 0 || indeterminateCount > 0) return "indeterminate"
  return "unchecked"
}

/**
 * Expand parent ids into full descendant sets, then sync fully-selected parents.
 * Safe to call on controlled `value` so UI matches cascade rules.
 */
export function normalizeCheckedIds(
  data: TreeCheckboxNode[],
  checked: Iterable<string>
): string[] {
  const next = new Set(checked)
  const expand = (node: TreeCheckboxNode) => {
    if (next.has(node.id) && node.children?.length) {
      for (const id of getDescendantIds(node)) next.add(id)
    }
    for (const child of node.children ?? []) expand(child)
  }
  for (const root of data) expand(root)
  syncAncestors(data, next)
  return [...next]
}

/**
 * Toggle `nodeId` in `checked` with cascade.
 * - Checking: add node + all descendants.
 * - Unchecking: remove node + all descendants.
 * Then sync parents so fully-selected parents stay in the set.
 */
export function toggleNodeInValue(
  data: TreeCheckboxNode[],
  checked: ReadonlySet<string>,
  nodeId: string
): string[] {
  const node = findNode(data, nodeId)
  if (!node) return [...checked]

  const next = new Set(checked)
  const descendants = getDescendantIds(node)
  const currentlyChecked = getNodeState(node, checked) === "checked"

  if (currentlyChecked) {
    for (const id of descendants) next.delete(id)
  } else {
    for (const id of descendants) next.add(id)
  }

  syncAncestors(data, next)
  return [...next]
}

/** Ensure fully-checked parents are in the set; partial parents are not. */
export function syncAncestors(
  nodes: TreeCheckboxNode[],
  checked: Set<string>
) {
  const walk = (node: TreeCheckboxNode) => {
    for (const child of node.children ?? []) walk(child)
    if (!node.children?.length) return
    const state = getNodeState(node, checked)
    if (state === "checked") checked.add(node.id)
    else checked.delete(node.id)
  }
  for (const root of nodes) walk(root)
}

/** Select every node id in the forest. */
export function selectAllIds(nodes: TreeCheckboxNode[]): string[] {
  return collectAllIds(nodes)
}
