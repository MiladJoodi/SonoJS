/** Infer TypeScript interfaces from JSON — one shared type per shape. */

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function capitalize(name: string): string {
  if (!name) return "Item";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function toSafeIdent(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9_]/g, "_").replace(/^(\d)/, "_$1");
  return cleaned || "field";
}

function mergeTypes(a: string, b: string): string {
  if (a === b) return a;
  if (a === "any") return b;
  if (b === "any") return a;
  if (a === "null") return b.includes("null") ? b : `${b} | null`;
  if (b === "null") return a.includes("null") ? a : `${a} | null`;
  const parts = new Set(
    `${a} | ${b}`
      .split("|")
      .map((p) => p.trim())
      .filter(Boolean),
  );
  return [...parts].sort().join(" | ");
}

function inferPrimitive(value: unknown): string {
  if (value === null) return "null";
  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    default:
      return "any";
  }
}

interface EmitContext {
  /** interface name → body source */
  interfaces: Map<string, string>;
  /** logical name (Address) → emitted interface name (usually same) */
  byLogicalName: Map<string, string>;
}

function ensureInterfaceName(logical: string, ctx: EmitContext): string {
  const base = capitalize(toSafeIdent(logical));
  const existing = ctx.byLogicalName.get(base);
  if (existing) return existing;
  ctx.byLogicalName.set(base, base);
  return base;
}

/** Merge many objects with the same logical name into one interface. */
function inferMergedObject(
  objects: Record<string, unknown>[],
  logicalName: string,
  ctx: EmitContext,
): string {
  const interfaceName = ensureInterfaceName(logicalName, ctx);

  // Already emitted this logical name — reuse (shared type)
  if (ctx.interfaces.has(interfaceName)) {
    // Expand existing interface with any new keys/types from these objects
    // For simplicity: rebuild from union of all objects seen — store samples on ctx
  }

  const allKeys = new Set<string>();
  for (const obj of objects) {
    for (const key of Object.keys(obj)) allKeys.add(key);
  }

  const lines: string[] = [`export interface ${interfaceName} {`];
  if (allKeys.size === 0) {
    lines.push("  [key: string]: any;");
  } else {
    for (const key of [...allKeys].sort()) {
      const values: unknown[] = [];
      let optional = false;
      for (const obj of objects) {
        if (!(key in obj)) {
          optional = true;
          continue;
        }
        values.push(obj[key]);
      }
      const fieldType = inferFromValues(values, capitalize(toSafeIdent(key)), ctx);
      const safeKey = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) ? key : JSON.stringify(key);
      lines.push(`  ${safeKey}${optional ? "?" : ""}: ${fieldType};`);
    }
  }
  lines.push("}");
  ctx.interfaces.set(interfaceName, lines.join("\n"));
  return interfaceName;
}

function inferFromValues(values: unknown[], logicalName: string, ctx: EmitContext): string {
  if (values.length === 0) return "any";

  const hasNull = values.some((v) => v === null);
  const nonNull = values.filter((v) => v !== null && v !== undefined);
  if (nonNull.length === 0) return "null";

  if (nonNull.every(isPlainObject)) {
    const typeName = inferMergedObject(nonNull as Record<string, unknown>[], logicalName, ctx);
    return hasNull ? `${typeName} | null` : typeName;
  }

  if (nonNull.every(Array.isArray)) {
    const flat = (nonNull as unknown[][]).flat();
    const itemName = logicalName.endsWith("s") ? logicalName.slice(0, -1) : `${logicalName}Item`;
    const itemType =
      flat.length === 0 ? "any" : inferFromValues(flat, capitalize(toSafeIdent(itemName)), ctx);
    const arr = `${itemType}[]`;
    return hasNull ? `${arr} | null` : arr;
  }

  // Mixed or primitives
  let t = inferPrimitive(nonNull[0]);
  for (let i = 1; i < nonNull.length; i += 1) {
    const v = nonNull[i];
    if (isPlainObject(v) || Array.isArray(v)) {
      t = mergeTypes(t, "any");
    } else {
      t = mergeTypes(t, inferPrimitive(v));
    }
  }
  if (hasNull) t = mergeTypes(t, "null");
  return t;
}

function inferArray(values: unknown[], name: string, ctx: EmitContext): string {
  if (values.length === 0) return "any[]";
  const itemName = name.endsWith("s") ? name.slice(0, -1) : `${name}Item`;
  // Root arrays often named "Root" → item "RootItem"; "Users" → "User"
  const logical =
    name === "Root" ? "RootItem" : capitalize(toSafeIdent(itemName === "Root" ? "RootItem" : itemName));
  const itemType = inferFromValues(values, logical, ctx);
  return `${itemType}[]`;
}

function inferObject(value: Record<string, unknown>, name: string, ctx: EmitContext): string {
  return inferMergedObject([value], name, ctx);
}

function inferType(value: unknown, name: string, ctx: EmitContext): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return inferArray(value, name, ctx);
  if (isPlainObject(value)) return inferObject(value, name, ctx);
  return inferPrimitive(value);
}

export function jsonToTypeScript(value: unknown, rootName = "Root"): string {
  const ctx: EmitContext = {
    interfaces: new Map(),
    byLogicalName: new Map(),
  };

  if (value === null || value === undefined) {
    return `export type ${capitalize(toSafeIdent(rootName))} = null;`;
  }

  if (!isPlainObject(value) && !Array.isArray(value)) {
    return `export type ${capitalize(toSafeIdent(rootName))} = ${inferPrimitive(value)};`;
  }

  const rootType = inferType(value, rootName, ctx);
  const parts = [...ctx.interfaces.values()];

  const rootIdent = capitalize(toSafeIdent(rootName));
  if (rootType.endsWith("[]") && !ctx.interfaces.has(rootIdent)) {
    parts.unshift(`export type ${rootIdent} = ${rootType};`);
  }

  return parts.join("\n\n") || `export type ${rootIdent} = any;`;
}

export function jsonTextToTypeScript(text: string, rootName = "Root"): string {
  const trimmed = text.trim();
  if (!trimmed) {
    return `export type ${capitalize(toSafeIdent(rootName))} = unknown;`;
  }
  try {
    return jsonToTypeScript(JSON.parse(trimmed) as unknown, rootName);
  } catch {
    return `// Response is not valid JSON\nexport type ${capitalize(toSafeIdent(rootName))} = string;`;
  }
}
