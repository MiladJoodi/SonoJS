const VAR_PATTERN = /\{\{\s*([a-zA-Z_][\w.-]*)\s*\}\}/g;

export function extractVariables(input: string): string[] {
  const names = new Set<string>();
  for (const match of input.matchAll(VAR_PATTERN)) {
    names.add(match[1]);
  }
  return [...names];
}

export function resolveVariables(
  input: string,
  vars: Record<string, string>,
): { result: string; unresolved: string[] } {
  const unresolved = new Set<string>();
  const result = input.replace(VAR_PATTERN, (_full, name: string) => {
    if (Object.prototype.hasOwnProperty.call(vars, name) && vars[name] !== undefined) {
      return vars[name];
    }
    unresolved.add(name);
    return `{{${name}}}`;
  });
  return { result, unresolved: [...unresolved] };
}

export function buildVariableMap(
  variables: Array<{ key: string; value: string; enabled: boolean }>,
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const v of variables) {
    if (!v.enabled || !v.key.trim()) continue;
    map[v.key.trim()] = v.value;
  }
  return map;
}

export function findUnresolvedInStrings(
  parts: string[],
  vars: Record<string, string>,
): string[] {
  const unresolved = new Set<string>();
  for (const part of parts) {
    const { unresolved: u } = resolveVariables(part, vars);
    for (const name of u) unresolved.add(name);
  }
  return [...unresolved];
}
