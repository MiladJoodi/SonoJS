import {
  buildAddCommand,
  indexItems,
  loadRegistryIndex,
  loadRegistryItem,
  searchIndexItems,
  summarizeItem,
} from "./registry.mjs"

function textResult(payload) {
  const text =
    typeof payload === "string" ? payload : JSON.stringify(payload, null, 2)
  return {
    content: [{ type: "text", text }],
  }
}

function errorResult(message) {
  return {
    content: [{ type: "text", text: message }],
    isError: true,
  }
}

export function createToolHandlers({ registryUrl }) {
  return {
    async list_components() {
      try {
        const index = await loadRegistryIndex(registryUrl)
        return textResult({
          registry: registryUrl,
          count: (index.items ?? []).length,
          items: indexItems(index),
        })
      } catch (err) {
        return errorResult(err instanceof Error ? err.message : String(err))
      }
    },

    async search_components({ query }) {
      try {
        const index = await loadRegistryIndex(registryUrl)
        const items = searchIndexItems(index, query)
        return textResult({
          registry: registryUrl,
          query: query ?? "",
          count: items.length,
          items,
        })
      } catch (err) {
        return errorResult(err instanceof Error ? err.message : String(err))
      }
    },

    async get_component({ name }) {
      if (!name || typeof name !== "string") {
        return errorResult("name is required")
      }
      try {
        const item = await loadRegistryItem(name, registryUrl)
        return textResult({
          registry: registryUrl,
          ...summarizeItem(item),
        })
      } catch (err) {
        return errorResult(err instanceof Error ? err.message : String(err))
      }
    },

    async get_add_command({ name }) {
      if (!name || typeof name !== "string") {
        return errorResult("name is required")
      }
      try {
        const item = await loadRegistryItem(name, registryUrl)
        const summary = summarizeItem(item)
        const { command, alsoNeeds } = buildAddCommand(name, {
          registryDeps: summary.registryDependencies,
          npmDeps: summary.dependencies,
        })
        return textResult({
          name,
          command,
          alsoNeeds,
          registryDependencies: summary.registryDependencies,
          dependencies: summary.dependencies,
          hint: alsoNeeds
            ? `Run \`${command}\`. Also needs: ${alsoNeeds}`
            : `Run \`${command}\``,
        })
      } catch (err) {
        return errorResult(err instanceof Error ? err.message : String(err))
      }
    },
  }
}

export const TOOL_DEFINITIONS = [
  {
    name: "list_components",
    description:
      "List all installable SonoJS registry items (components, blocks, charts) with name, title, description, and type.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "search_components",
    description:
      "Search the SonoJS registry by name, title, description, or type. Case-insensitive substring match.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query (e.g. button, login, chart)",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    name: "get_component",
    description:
      "Fetch a single registry item by name: summary, registryDependencies, npm dependencies, and file list. Does not write files.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Registry item name (e.g. button, calendar, login-01)",
        },
      },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    name: "get_add_command",
    description:
      "Return the exact `npx @sonojs/ui@latest add <name>` command plus an Also-needs style hint for nested registry items and npm packages. Does not install or write files — the agent or user should run the command.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Registry item name to install",
        },
      },
      required: ["name"],
      additionalProperties: false,
    },
  },
]
