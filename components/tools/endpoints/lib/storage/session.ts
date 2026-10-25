import type { EditorTab, HttpRequest, ProxyResponsePayload } from "@/components/tools/endpoints/types";
import { createEmptyRequest } from "@/components/tools/endpoints/lib/http/request";
import { createId } from "@/components/tools/endpoints/lib/id";
import * as db from "@/components/tools/endpoints/lib/storage/db";

export interface EditorSession {
  version: 3;
  activeTabId: string;
  tabs: EditorTab[];
}

const SESSION_KEY = "editor.session";
const RESPONSE_PERSIST_LIMIT = 400_000;

function slimResponse(
  response: ProxyResponsePayload | null,
): ProxyResponsePayload | null {
  if (!response) return null;
  if (response.sizeBytes <= RESPONSE_PERSIST_LIMIT) return response;
  return { ...response, body: "", truncated: true };
}

function slimTab(tab: EditorTab): EditorTab {
  return {
    ...tab,
    response: slimResponse(tab.response),
    assertionResults: tab.assertionResults,
  };
}

function tabFromRequest(
  request: HttpRequest,
  response: ProxyResponsePayload | null = null,
  sendError: EditorTab["sendError"] = null,
): EditorTab {
  return {
    id: createId(),
    requestId: request.id,
    request,
    response,
    sendError,
  };
}

export function createDefaultSession(): EditorSession {
  const request = createEmptyRequest({ name: "Untitled" });
  const tab = tabFromRequest(request);
  return {
    version: 3,
    activeTabId: tab.id,
    tabs: [tab],
  };
}

function normalizeTab(raw: Record<string, unknown>): EditorTab | null {
  const request = raw.request;
  if (!request || typeof request !== "object") return null;
  const req = request as HttpRequest;
  const requestId =
    typeof raw.requestId === "string" && raw.requestId
      ? raw.requestId
      : req.id;
  return {
    id: typeof raw.id === "string" && raw.id ? raw.id : createId(),
    requestId,
    request: { ...req, id: requestId },
    response: (raw.response as ProxyResponsePayload | null) ?? null,
    sendError: (raw.sendError as EditorTab["sendError"]) ?? null,
    assertionResults: Array.isArray(raw.assertionResults)
      ? (raw.assertionResults as EditorTab["assertionResults"])
      : undefined,
  };
}

export async function loadEditorSession(): Promise<EditorSession | null> {
  try {
    const stored = await db.getMeta<Record<string, unknown>>(SESSION_KEY);
    if (!stored) return null;

    // Legacy multi-tab session (v1)
    if (stored.version === 1 && Array.isArray(stored.tabs)) {
      const tabs = (stored.tabs as Record<string, unknown>[])
        .map(normalizeTab)
        .filter((t): t is EditorTab => Boolean(t));
      if (tabs.length === 0) return null;
      const activeTabId =
        typeof stored.activeTabId === "string" &&
        tabs.some((t) => t.id === stored.activeTabId)
          ? stored.activeTabId
          : tabs[0].id;
      return { version: 3, activeTabId, tabs };
    }

    // Single-request session (v2)
    if (stored.version === 2 && stored.request && typeof stored.request === "object") {
      const tab = tabFromRequest(
        stored.request as HttpRequest,
        (stored.response as ProxyResponsePayload | null) ?? null,
        (stored.sendError as EditorTab["sendError"]) ?? null,
      );
      return { version: 3, activeTabId: tab.id, tabs: [tab] };
    }

    // Current multi-tab session (v3)
    if (stored.version === 3 && Array.isArray(stored.tabs)) {
      const tabs = (stored.tabs as Record<string, unknown>[])
        .map(normalizeTab)
        .filter((t): t is EditorTab => Boolean(t));
      if (tabs.length === 0) return null;
      const activeTabId =
        typeof stored.activeTabId === "string" &&
        tabs.some((t) => t.id === stored.activeTabId)
          ? stored.activeTabId
          : tabs[0].id;
      return { version: 3, activeTabId, tabs };
    }

    return null;
  } catch {
    return null;
  }
}

export async function saveEditorSession(session: EditorSession): Promise<void> {
  await db.setMeta(SESSION_KEY, {
    version: 3,
    activeTabId: session.activeTabId,
    tabs: session.tabs.map(slimTab),
  });
}
