import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"

import { createToolHandlers, TOOL_DEFINITIONS } from "./tools.mjs"

const DEFAULT_REGISTRY = "https://sonojs.com/r"

/**
 * @param {{ registryUrl?: string }} [opts]
 */
export async function startMcpServer(opts = {}) {
  const registryUrl = opts.registryUrl || DEFAULT_REGISTRY
  const handlers = createToolHandlers({ registryUrl })

  const server = new Server(
    {
      name: "sonojs",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  )

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOL_DEFINITIONS,
  }))

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const name = request.params.name
    const args = request.params.arguments ?? {}
    const handler = handlers[name]
    if (!handler) {
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      }
    }
    return handler(args)
  })

  const transport = new StdioServerTransport()
  await server.connect(transport)
}
