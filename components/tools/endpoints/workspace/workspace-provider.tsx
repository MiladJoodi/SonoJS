"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  AppPreferences,
  AssertionResult,
  Collection,
  CollectionFolder,
  EditorTab,
  Environment,
  HistoryItem,
  HttpRequest,
  ProxyResponsePayload,
} from "@/components/tools/endpoints/types";
import { createEmptyRequest } from "@/components/tools/endpoints/lib/http/request";
import {
  applyAuthToUrl,
  buildAuthHeaders,
  collectEnabledHeaders,
  serializeBody,
} from "@/components/tools/endpoints/lib/http/request";
import { runAssertions } from "@/components/tools/endpoints/lib/http/assertions";
import { createId, createPair } from "@/components/tools/endpoints/lib/id";
import { ProxyClientError, sendViaProxy } from "@/components/tools/endpoints/lib/proxy/client";
import * as db from "@/components/tools/endpoints/lib/storage/db";
import {
  createDefaultSession,
  loadEditorSession,
  saveEditorSession,
} from "@/components/tools/endpoints/lib/storage/session";
import {
  defaultPreferences,
  loadPreferences,
  savePreferences,
} from "@/components/tools/endpoints/lib/storage/preferences";
import {
  buildVariableMap,
  findUnresolvedInStrings,
  resolveVariables,
} from "@/components/tools/endpoints/lib/variables/resolve";

export type SidebarTab = "collections" | "history";

interface WorkspaceContextValue {
  ready: boolean;
  preferences: AppPreferences;
  setPreferences: (patch: Partial<AppPreferences>) => void;
  request: HttpRequest;
  setRequest: (updater: HttpRequest | ((prev: HttpRequest) => HttpRequest)) => void;
  tabs: EditorTab[];
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  closeTab: (tabId: string) => void;
  assertionResults: AssertionResult[] | undefined;
  collections: Collection[];
  savedRequests: HttpRequest[];
  history: HistoryItem[];
  environments: Environment[];
  activeEnvironment: Environment | null;
  response: ProxyResponsePayload | null;
  sending: boolean;
  sendError: { message: string; details?: string } | null;
  unresolvedVars: string[];
  sidebarTab: SidebarTab;
  setSidebarTab: (tab: SidebarTab) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  sendRequest: () => Promise<void>;
  cancelRequest: () => void;
  newRequest: () => void;
  loadRequest: (req: HttpRequest) => void;
  saveRequest: (
    collectionId?: string,
    name?: string,
    options?: { asNew?: boolean },
  ) => Promise<void>;
  /** One-click save to last/default collection — no dialog. */
  quickSaveRequest: () => Promise<void>;
  addRequestToCollection: (
    collectionId: string,
    folderId?: string | null,
  ) => Promise<void>;
  createCollection: (name: string) => Promise<Collection>;
  importBundle: (bundle: {
    collections: Collection[];
    requests: HttpRequest[];
    environments?: Environment[];
  }) => Promise<void>;
  renameCollection: (id: string, name: string) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
  duplicateCollection: (id: string) => Promise<void>;
  deleteSavedRequest: (id: string) => Promise<void>;
  addFolder: (collectionId: string, name: string) => Promise<CollectionFolder>;
  renameFolder: (
    collectionId: string,
    folderId: string,
    name: string,
  ) => Promise<void>;
  deleteFolder: (collectionId: string, folderId: string) => Promise<void>;
  moveRequestToFolder: (
    requestId: string,
    folderId: string | null,
  ) => Promise<void>;
  createEnvironment: (name: string) => Promise<Environment>;
  updateEnvironment: (env: Environment) => Promise<void>;
  deleteEnvironment: (id: string) => Promise<void>;
  setActiveEnvironmentId: (id: string | null) => void;
  clearHistory: () => Promise<void>;
  /** Wipe all local data: collections, requests, history, environments, session. */
  resetWorkspace: () => Promise<void>;
  deleteHistoryItem: (id: string) => Promise<void>;
  loadHistoryItem: (item: HistoryItem) => void;
  applyExampleUrl: (url: string) => void;
  sendSampleUrl: (url: string) => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
}

const HISTORY_BODY_LIMIT = 400_000;
const HISTORY_MAX = 200;

function makeTab(
  request: HttpRequest,
  extras?: Partial<Pick<EditorTab, "response" | "sendError" | "assertionResults">>,
): EditorTab {
  return {
    id: createId(),
    requestId: request.id,
    request,
    response: extras?.response ?? null,
    sendError: extras?.sendError ?? null,
    assertionResults: extras?.assertionResults,
  };
}

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [preferences, setPreferencesState] = useState<AppPreferences>(defaultPreferences);
  const [boot] = useState(createDefaultSession);
  const [tabs, setTabs] = useState<EditorTab[]>(boot.tabs);
  const [activeTabId, setActiveTabIdState] = useState<string>(boot.activeTabId);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [savedRequests, setSavedRequests] = useState<HttpRequest[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [sending, setSending] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>("collections");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const sendingRef = useRef(false);
  const persistRequestTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistSessionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabsRef = useRef(tabs);
  const activeTabIdRef = useRef(activeTabId);

  useEffect(() => {
    tabsRef.current = tabs;
  }, [tabs]);
  useEffect(() => {
    activeTabIdRef.current = activeTabId;
  }, [activeTabId]);

  const activeTab = useMemo(() => {
    if (tabs.length === 0) return null;
    return tabs.find((t) => t.id === activeTabId) ?? tabs[0] ?? null;
  }, [tabs, activeTabId]);

  const request = activeTab?.request ?? createEmptyRequest({ name: "Untitled" });
  const response = activeTab?.response ?? null;
  const sendError = activeTab?.sendError ?? null;
  const assertionResults = activeTab?.assertionResults;

  const upsertHistoryItem = useCallback(async (item: HistoryItem) => {
    const all = await db.getAll<HistoryItem>("history");
    const match = all.find((h) => h.method === item.method && h.url === item.url);
    const persisted: HistoryItem = match
      ? { ...item, id: match.id, createdAt: Date.now() }
      : { ...item, createdAt: Date.now() };

    if (match) {
      await Promise.all(
        all
          .filter((h) => h.method === item.method && h.url === item.url && h.id !== persisted.id)
          .map((h) => db.remove("history", h.id)),
      );
    }

    await db.put("history", persisted);

    setHistory((prev) => {
      const cleaned = prev.filter(
        (h) => !(h.method === persisted.method && h.url === persisted.url),
      );
      return [persisted, ...cleaned].slice(0, HISTORY_MAX);
    });
  }, []);

  const patchActiveTab = useCallback(
    (patch: Partial<EditorTab> | ((tab: EditorTab) => EditorTab)) => {
      setTabs((prev) => {
        if (prev.length === 0) return prev;
        const id = activeTabIdRef.current;
        const idx = prev.findIndex((t) => t.id === id);
        const targetIdx = idx >= 0 ? idx : 0;
        const current = prev[targetIdx];
        const next =
          typeof patch === "function" ? patch(current) : { ...current, ...patch };
        const copy = [...prev];
        copy[targetIdx] = {
          ...next,
          requestId: next.request.id,
        };
        return copy;
      });
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const prefs = loadPreferences();
      try {
        const [cols, reqs, hist, envs, session] = await Promise.all([
          db.getAll<Collection>("collections"),
          db.getAll<HttpRequest>("requests"),
          db.getAll<HistoryItem>("history"),
          db.getAll<Environment>("environments"),
          loadEditorSession(),
        ]);
        if (cancelled) return;
        setPreferencesState(prefs);
        setCollections(cols.sort((a, b) => a.order - b.order));
        setSavedRequests(reqs);
        setHistory(hist.sort((a, b) => b.createdAt - a.createdAt));
        setEnvironments(envs);

        const hydrated = session ?? createDefaultSession();
        const restoredTabs = hydrated.tabs.map((tab) => {
          const saved = reqs.find((r) => r.id === tab.request.id);
          const requestCopy = saved
            ? structuredClone(saved)
            : structuredClone(tab.request);
          return {
            ...tab,
            requestId: requestCopy.id,
            request: requestCopy,
          };
        });
        setTabs(restoredTabs);
        setActiveTabIdState(
          restoredTabs.some((t) => t.id === hydrated.activeTabId)
            ? hydrated.activeTabId
            : restoredTabs[0]?.id ?? "",
        );
      } catch {
        if (!cancelled) {
          setPreferencesState(prefs);
          const defaults = createDefaultSession();
          setTabs(defaults.tabs);
          setActiveTabIdState(defaults.activeTabId);
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || tabs.length === 0) return;
    if (persistSessionTimer.current) clearTimeout(persistSessionTimer.current);
    persistSessionTimer.current = setTimeout(() => {
      void saveEditorSession({
        version: 3,
        activeTabId,
        tabs,
      });
    }, 350);
    return () => {
      if (persistSessionTimer.current) clearTimeout(persistSessionTimer.current);
    };
  }, [ready, tabs, activeTabId]);

  const setPreferences = useCallback((patch: Partial<AppPreferences>) => {
    setPreferencesState((prev) => {
      const next = { ...prev, ...patch };
      savePreferences(next);
      return next;
    });
  }, []);

  const setActiveTabId = useCallback((id: string) => {
    setActiveTabIdState(id);
  }, []);

  const closeTab = useCallback((tabId: string) => {
    setTabs((prev) => {
      const idx = prev.findIndex((t) => t.id === tabId);
      if (idx < 0) return prev;
      const next = prev.filter((t) => t.id !== tabId);
      if (next.length === 0) {
        const draft = makeTab(createEmptyRequest({ name: "Untitled" }));
        setActiveTabIdState(draft.id);
        return [draft];
      }
      setActiveTabIdState((current) => {
        if (current !== tabId) return current;
        const fallback = next[Math.min(idx, next.length - 1)];
        return fallback.id;
      });
      return next;
    });
  }, []);

  const setRequest = useCallback(
    (updater: HttpRequest | ((prev: HttpRequest) => HttpRequest)) => {
      setTabs((prev) => {
        if (prev.length === 0) {
          const base = createEmptyRequest({ name: "Untitled" });
          const next = typeof updater === "function" ? updater(base) : updater;
          const updated: HttpRequest = { ...next, updatedAt: Date.now() };
          const tab = makeTab(updated);
          queueMicrotask(() => setActiveTabIdState(tab.id));
          return [tab];
        }
        const id = activeTabIdRef.current;
        const idx = prev.findIndex((t) => t.id === id);
        const targetIdx = idx >= 0 ? idx : 0;
        const current = prev[targetIdx];
        const next =
          typeof updater === "function" ? updater(current.request) : updater;
        const updated: HttpRequest = { ...next, updatedAt: Date.now() };

        if (updated.collectionId) {
          queueMicrotask(() => {
            setSavedRequests((list) => {
              const found = list.findIndex((r) => r.id === updated.id);
              if (found >= 0) {
                const copy = [...list];
                copy[found] = updated;
                return copy;
              }
              return [...list, updated];
            });
            setPreferencesState((prefs) => {
              if (prefs.lastCollectionId === updated.collectionId) return prefs;
              const patched = {
                ...prefs,
                lastCollectionId: updated.collectionId ?? null,
              };
              savePreferences(patched);
              return patched;
            });
            if (persistRequestTimer.current) {
              clearTimeout(persistRequestTimer.current);
            }
            persistRequestTimer.current = setTimeout(() => {
              void db.put("requests", updated);
            }, 300);
          });
        }

        const copy = [...prev];
        copy[targetIdx] = {
          ...current,
          requestId: updated.id,
          request: updated,
        };
        return copy;
      });
    },
    [],
  );

  const activeEnvironment = useMemo(() => {
    if (!preferences.activeEnvironmentId) return null;
    return environments.find((e) => e.id === preferences.activeEnvironmentId) ?? null;
  }, [environments, preferences.activeEnvironmentId]);

  const varMap = useMemo(
    () => buildVariableMap(activeEnvironment?.variables ?? []),
    [activeEnvironment],
  );

  const unresolvedVars = useMemo(() => {
    const headerValues = request.headers
      .filter((h) => h.enabled)
      .flatMap((h) => [h.key, h.value]);
    const paramValues = request.params
      .filter((p) => p.enabled)
      .flatMap((p) => [p.key, p.value]);
    const authParts = [
      request.auth.bearerToken ?? "",
      request.auth.basicUsername ?? "",
      request.auth.basicPassword ?? "",
      request.auth.apiKeyName ?? "",
      request.auth.apiKeyValue ?? "",
    ];
    const bodyParts = [
      request.body.json ?? "",
      request.body.raw ?? "",
      ...(request.body.form ?? []).flatMap((p) => [p.key, p.value]),
      ...(request.body.urlencoded ?? []).flatMap((p) => [p.key, p.value]),
    ];
    return findUnresolvedInStrings(
      [request.url, ...headerValues, ...paramValues, ...authParts, ...bodyParts],
      varMap,
    );
  }, [request, varMap]);

  const resolveAll = useCallback(
    (value: string) => resolveVariables(value, varMap).result,
    [varMap],
  );

  /** Open sidebar request: focus existing tab with same request.id, else open new tab. Never duplicate IDB. */
  const loadRequest = useCallback((req: HttpRequest) => {
    const clone = structuredClone(req);
    setTabs((prev) => {
      const existing = prev.find((t) => t.requestId === req.id || t.request.id === req.id);
      if (existing) {
        queueMicrotask(() => setActiveTabIdState(existing.id));
        return prev.map((t) =>
          t.id === existing.id
            ? {
                ...t,
                requestId: clone.id,
                request: clone,
              }
            : t,
        );
      }
      const tab = makeTab(clone);
      queueMicrotask(() => setActiveTabIdState(tab.id));
      return [...prev, tab];
    });
    setMobileSidebarOpen(false);
    setSidebarTab("collections");
  }, []);

  const openSavedAsTab = useCallback((req: HttpRequest) => {
    const clone = structuredClone(req);
    setTabs((prev) => {
      const existing = prev.find((t) => t.requestId === req.id || t.request.id === req.id);
      if (existing) {
        queueMicrotask(() => setActiveTabIdState(existing.id));
        return prev.map((t) =>
          t.id === existing.id
            ? { ...t, requestId: clone.id, request: clone, response: null, sendError: null, assertionResults: undefined }
            : t,
        );
      }
      const tab = makeTab(clone);
      queueMicrotask(() => setActiveTabIdState(tab.id));
      return [...prev, tab];
    });
  }, []);

  const addRequestToCollection = useCallback(
    async (collectionId: string, folderId?: string | null) => {
      const req: HttpRequest = {
        ...createEmptyRequest(),
        name: "Untitled",
        collectionId,
        folderId: folderId ?? undefined,
      };
      await db.put("requests", req);
      setSavedRequests((prev) => [...prev, req]);
      openSavedAsTab(req);
      setMobileSidebarOpen(false);
      setPreferences({ lastCollectionId: collectionId });
      setSidebarTab("collections");
    },
    [setPreferences, openSavedAsTab],
  );

  const newRequest = useCallback(() => {
    const targetId =
      (preferences.lastCollectionId &&
      collections.some((c) => c.id === preferences.lastCollectionId)
        ? preferences.lastCollectionId
        : null) || collections[0]?.id;

    if (targetId) {
      void addRequestToCollection(targetId);
      return;
    }

    const draft = makeTab(createEmptyRequest({ name: "Untitled" }));
    setTabs((prev) => [...prev, draft]);
    setActiveTabIdState(draft.id);
    setMobileSidebarOpen(false);
  }, [preferences.lastCollectionId, collections, addRequestToCollection]);

  const loadHistoryItem = useCallback((item: HistoryItem) => {
    const snapshot = structuredClone(item.requestSnapshot);
    const tab = makeTab(snapshot, {
      response: item.responseSnapshot ?? null,
      sendError: item.error ? { message: item.error } : null,
    });
    setTabs((prev) => {
      const existing = prev.find(
        (t) => t.requestId === snapshot.id || t.request.id === snapshot.id,
      );
      if (existing) {
        queueMicrotask(() => setActiveTabIdState(existing.id));
        return prev.map((t) =>
          t.id === existing.id
            ? {
                ...t,
                requestId: snapshot.id,
                request: snapshot,
                response: item.responseSnapshot ?? null,
                sendError: item.error ? { message: item.error } : null,
                assertionResults: undefined,
              }
            : t,
        );
      }
      queueMicrotask(() => setActiveTabIdState(tab.id));
      return [...prev, tab];
    });
    setMobileSidebarOpen(false);
  }, []);

  const applyExampleUrl = useCallback((url: string) => {
    setRequest((prev) => ({
      ...prev,
      method: "GET",
      url,
      params: [createPair()],
      updatedAt: Date.now(),
    }));
    patchActiveTab({ sendError: null });
  }, [setRequest, patchActiveTab]);

  const sendSampleUrl = useCallback(
    async (url: string) => {
      if (sendingRef.current) return;

      const snapshot = createEmptyRequest({
        method: "GET",
        url,
        name: "Sample request",
        params: [createPair()],
      });

      setRequest((prev) => ({
        ...prev,
        method: "GET",
        url,
        params: [createPair()],
        updatedAt: Date.now(),
      }));
      patchActiveTab({ sendError: null, assertionResults: undefined });

      sendingRef.current = true;
      setSending(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const result = await sendViaProxy(
          {
            method: "GET",
            url,
            headers: {},
            body: null,
            timeoutMs: preferences.timeoutMs,
          },
          controller.signal,
        );
        patchActiveTab((tab) => ({
          ...tab,
          response: result,
          assertionResults: runAssertions(tab.request.assertions, result),
        }));

        const canCacheBody = result.sizeBytes <= HISTORY_BODY_LIMIT;
        const item: HistoryItem = {
          id: createId(),
          method: "GET",
          url,
          requestSnapshot: snapshot,
          status: result.status,
          statusText: result.statusText,
          durationMs: result.durationMs,
          sizeBytes: result.sizeBytes,
          responseSnapshot: canCacheBody
            ? result
            : {
                ...result,
                body: "",
                truncated: true,
              },
          createdAt: Date.now(),
        };
        await upsertHistoryItem(item);
      } catch (e) {
        if (
          (e instanceof DOMException && e.name === "AbortError") ||
          (e instanceof Error && e.name === "AbortError")
        ) {
          return;
        }
        if (e instanceof ProxyClientError) {
          patchActiveTab((tab) => ({
            ...tab,
            sendError: { message: e.message, details: e.details },
            assertionResults: runAssertions(tab.request.assertions, tab.response, {
              sendFailed: true,
            }),
          }));
          const item: HistoryItem = {
            id: createId(),
            method: "GET",
            url,
            requestSnapshot: snapshot,
            error: e.message,
            createdAt: Date.now(),
          };
          await upsertHistoryItem(item);
        } else {
          patchActiveTab({
            sendError: {
              message: "Couldn't connect to the server.",
              details: e instanceof Error ? e.message : undefined,
            },
          });
        }
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
        sendingRef.current = false;
        setSending(false);
      }
    },
    [preferences.timeoutMs, upsertHistoryItem, setRequest, patchActiveTab],
  );

  const cancelRequest = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    sendingRef.current = false;
    setSending(false);
  }, []);

  const sendRequest = useCallback(async () => {
    if (sendingRef.current) return;
    const currentRequest =
      tabsRef.current.find((t) => t.id === activeTabIdRef.current)?.request ?? request;

    if (!currentRequest.url.trim()) {
      patchActiveTab({ sendError: { message: "Enter a URL to send a request." } });
      return;
    }
    if (unresolvedVars.length > 0) {
      patchActiveTab({
        sendError: {
          message: `Unresolved variables: ${unresolvedVars.map((v) => `{{${v}}}`).join(", ")}`,
          details: "Set them in the active environment, or remove them from the request.",
        },
      });
      return;
    }

    sendingRef.current = true;
    setSending(true);
    patchActiveTab({ sendError: null, assertionResults: undefined });

    const resolvedUrl = resolveAll(currentRequest.url);
    const resolvedHeaders = Object.fromEntries(
      Object.entries({
        ...collectEnabledHeaders(
          currentRequest.headers.map((h) => ({
            ...h,
            key: resolveAll(h.key),
            value: resolveAll(h.value),
          })),
        ),
        ...buildAuthHeaders({
          ...currentRequest.auth,
          bearerToken: resolveAll(currentRequest.auth.bearerToken ?? ""),
          basicUsername: resolveAll(currentRequest.auth.basicUsername ?? ""),
          basicPassword: resolveAll(currentRequest.auth.basicPassword ?? ""),
          apiKeyName: resolveAll(currentRequest.auth.apiKeyName ?? ""),
          apiKeyValue: resolveAll(currentRequest.auth.apiKeyValue ?? ""),
        }),
      }),
    );

    const resolvedBody = {
      ...currentRequest.body,
      json: currentRequest.body.json
        ? resolveAll(currentRequest.body.json)
        : currentRequest.body.json,
      raw: currentRequest.body.raw
        ? resolveAll(currentRequest.body.raw)
        : currentRequest.body.raw,
      form: currentRequest.body.form?.map((p) => ({
        ...p,
        key: resolveAll(p.key),
        value: resolveAll(p.value),
      })),
      urlencoded: currentRequest.body.urlencoded?.map((p) => ({
        ...p,
        key: resolveAll(p.key),
        value: resolveAll(p.value),
      })),
    };

    const { body, contentType } = serializeBody(resolvedBody);
    if (
      contentType &&
      !Object.keys(resolvedHeaders).some((k) => k.toLowerCase() === "content-type")
    ) {
      resolvedHeaders["Content-Type"] = contentType;
    }

    const finalUrl = applyAuthToUrl(resolvedUrl, {
      ...currentRequest.auth,
      apiKeyName: resolveAll(currentRequest.auth.apiKeyName ?? ""),
      apiKeyValue: resolveAll(currentRequest.auth.apiKeyValue ?? ""),
    });

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const snapshot = structuredClone(currentRequest);

    try {
      const result = await sendViaProxy(
        {
          method: currentRequest.method,
          url: finalUrl,
          headers: resolvedHeaders,
          body,
          timeoutMs: preferences.timeoutMs,
        },
        controller.signal,
      );
      patchActiveTab((tab) => ({
        ...tab,
        response: result,
        assertionResults: runAssertions(tab.request.assertions, result),
      }));

      const canCacheBody = result.sizeBytes <= HISTORY_BODY_LIMIT;
      const item: HistoryItem = {
        id: createId(),
        method: currentRequest.method,
        url: finalUrl,
        requestSnapshot: snapshot,
        status: result.status,
        statusText: result.statusText,
        durationMs: result.durationMs,
        sizeBytes: result.sizeBytes,
        responseSnapshot: canCacheBody
          ? result
          : {
              ...result,
              body: "",
              truncated: true,
            },
        createdAt: Date.now(),
      };
      await upsertHistoryItem(item);
    } catch (e) {
      if (
        (e instanceof DOMException && e.name === "AbortError") ||
        (e instanceof Error && e.name === "AbortError")
      ) {
        return;
      }
      if (e instanceof ProxyClientError) {
        patchActiveTab((tab) => ({
          ...tab,
          sendError: { message: e.message, details: e.details },
          assertionResults: runAssertions(tab.request.assertions, tab.response, {
            sendFailed: true,
          }),
        }));
        const item: HistoryItem = {
          id: createId(),
          method: currentRequest.method,
          url: finalUrl,
          requestSnapshot: snapshot,
          error: e.message,
          createdAt: Date.now(),
        };
        await upsertHistoryItem(item);
      } else {
        patchActiveTab({
          sendError: {
            message: "Couldn't connect to the server.",
            details: e instanceof Error ? e.message : undefined,
          },
        });
      }
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
      sendingRef.current = false;
      setSending(false);
    }
  }, [
    request,
    unresolvedVars,
    resolveAll,
    preferences.timeoutMs,
    upsertHistoryItem,
    patchActiveTab,
  ]);

  const saveRequest = useCallback(
    async (
      collectionId?: string,
      name?: string,
      options?: { asNew?: boolean },
    ) => {
      const current =
        tabsRef.current.find((t) => t.id === activeTabIdRef.current)?.request ?? request;

      let targetCollectionId = collectionId ?? current.collectionId;
      if (!targetCollectionId) {
        if (collections.length === 0) {
          const col: Collection = {
            id: createId(),
            name: "My Collection",
            folders: [],
            order: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          await db.put("collections", col);
          setCollections([col]);
          targetCollectionId = col.id;
        } else {
          targetCollectionId = collections[0].id;
        }
      }

      // asNew only when explicit, or first save of an unsaved draft (no collectionId yet)
      const asNew = Boolean(options?.asNew) || !current.collectionId;
      const toSave: HttpRequest = {
        ...current,
        id: asNew ? createId() : current.id,
        name: name?.trim() || current.name || "Untitled",
        collectionId: targetCollectionId,
        createdAt: asNew ? Date.now() : current.createdAt,
        updatedAt: Date.now(),
      };
      await db.put("requests", toSave);
      setSavedRequests((prev) => {
        const idx = prev.findIndex((r) => r.id === toSave.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = toSave;
          return copy;
        }
        return [...prev, toSave];
      });
      patchActiveTab((tab) => ({
        ...tab,
        requestId: toSave.id,
        request: toSave,
      }));
      setPreferences({ lastCollectionId: targetCollectionId });
      setSidebarTab("collections");
    },
    [request, collections, setPreferences, patchActiveTab],
  );

  const quickSaveRequest = useCallback(async () => {
    const preferred =
      request.collectionId ||
      (preferences.lastCollectionId &&
      collections.some((c) => c.id === preferences.lastCollectionId)
        ? preferences.lastCollectionId
        : null) ||
      collections[0]?.id;
    await saveRequest(preferred ?? undefined);
  }, [request.collectionId, preferences.lastCollectionId, collections, saveRequest]);

  const createCollection = useCallback(async (name: string) => {
    const col: Collection = {
      id: createId(),
      name: name.trim() || "New collection",
      folders: [],
      order: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await db.put("collections", col);
    setCollections((prev) => [...prev, col]);
    return col;
  }, []);

  const importBundle = useCallback(
    async (bundle: {
      collections: Collection[];
      requests: HttpRequest[];
      environments?: Environment[];
    }) => {
      await Promise.all([
        ...bundle.collections.map((c) => db.put("collections", c)),
        ...bundle.requests.map((r) => db.put("requests", r)),
        ...(bundle.environments ?? []).map((e) => db.put("environments", e)),
      ]);
      setCollections((prev) =>
        [...prev, ...bundle.collections].sort((a, b) => a.order - b.order),
      );
      setSavedRequests((prev) => [...prev, ...bundle.requests]);
      if (bundle.environments?.length) {
        setEnvironments((prev) => [...prev, ...bundle.environments!]);
      }
      if (bundle.collections[0]) {
        setPreferences({ lastCollectionId: bundle.collections[0].id });
      }
      setSidebarTab("collections");
    },
    [setPreferences],
  );

  const renameCollection = useCallback(async (id: string, name: string) => {
    setCollections((prev) => {
      const next = prev.map((c) =>
        c.id === id ? { ...c, name, updatedAt: Date.now() } : c,
      );
      const updated = next.find((c) => c.id === id);
      if (updated) void db.put("collections", updated);
      return next;
    });
  }, []);

  const deleteCollection = useCallback(async (id: string) => {
    await db.remove("collections", id);
    const reqs = savedRequests.filter((r) => r.collectionId === id);
    await Promise.all(reqs.map((r) => db.remove("requests", r.id)));
    setCollections((prev) => prev.filter((c) => c.id !== id));
    setSavedRequests((prev) => prev.filter((r) => r.collectionId !== id));
    setTabs((prev) =>
      prev.map((t) =>
        t.request.collectionId === id
          ? {
              ...t,
              request: { ...t.request, collectionId: undefined, folderId: undefined },
            }
          : t,
      ),
    );
  }, [savedRequests]);

  const duplicateCollection = useCallback(
    async (id: string) => {
      const source = collections.find((c) => c.id === id);
      if (!source) return;
      const folderIdMap = new Map<string, string>();
      const newFolders = (source.folders ?? []).map((f) => {
        const newId = createId();
        folderIdMap.set(f.id, newId);
        return { ...f, id: newId };
      });
      const newCol: Collection = {
        ...source,
        id: createId(),
        name: `${source.name} copy`,
        folders: newFolders,
        order: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await db.put("collections", newCol);
      const copies = savedRequests
        .filter((r) => r.collectionId === id)
        .map((r) => ({
          ...structuredClone(r),
          id: createId(),
          collectionId: newCol.id,
          folderId: r.folderId ? folderIdMap.get(r.folderId) : undefined,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }));
      await Promise.all(copies.map((r) => db.put("requests", r)));
      setCollections((prev) => [...prev, newCol]);
      setSavedRequests((prev) => [...prev, ...copies]);
    },
    [collections, savedRequests],
  );

  const deleteSavedRequest = useCallback(async (id: string) => {
    await db.remove("requests", id);
    setSavedRequests((prev) => prev.filter((r) => r.id !== id));
    setTabs((prev) =>
      prev.map((t) =>
        t.requestId === id || t.request.id === id
          ? {
              ...t,
              request: {
                ...t.request,
                collectionId: undefined,
                folderId: undefined,
              },
            }
          : t,
      ),
    );
  }, []);

  const addFolder = useCallback(async (collectionId: string, name: string) => {
    const folder: CollectionFolder = {
      id: createId(),
      name: name.trim() || "New folder",
      order: Date.now(),
    };
    setCollections((prev) => {
      const next = prev.map((c) => {
        if (c.id !== collectionId) return c;
        const updated: Collection = {
          ...c,
          folders: [...(c.folders ?? []), folder],
          updatedAt: Date.now(),
        };
        void db.put("collections", updated);
        return updated;
      });
      return next;
    });
    return folder;
  }, []);

  const renameFolder = useCallback(
    async (collectionId: string, folderId: string, name: string) => {
      setCollections((prev) =>
        prev.map((c) => {
          if (c.id !== collectionId) return c;
          const updated: Collection = {
            ...c,
            folders: (c.folders ?? []).map((f) =>
              f.id === folderId ? { ...f, name: name.trim() || f.name } : f,
            ),
            updatedAt: Date.now(),
          };
          void db.put("collections", updated);
          return updated;
        }),
      );
    },
    [],
  );

  const deleteFolder = useCallback(
    async (collectionId: string, folderId: string) => {
      setCollections((prev) =>
        prev.map((c) => {
          if (c.id !== collectionId) return c;
          const updated: Collection = {
            ...c,
            folders: (c.folders ?? []).filter((f) => f.id !== folderId),
            updatedAt: Date.now(),
          };
          void db.put("collections", updated);
          return updated;
        }),
      );

      const affected = savedRequests.filter(
        (r) => r.collectionId === collectionId && r.folderId === folderId,
      );
      const cleared = affected.map((r) => ({
        ...r,
        folderId: undefined,
        updatedAt: Date.now(),
      }));
      await Promise.all(cleared.map((r) => db.put("requests", r)));
      setSavedRequests((prev) =>
        prev.map((r) =>
          r.collectionId === collectionId && r.folderId === folderId
            ? { ...r, folderId: undefined, updatedAt: Date.now() }
            : r,
        ),
      );
      setTabs((prev) =>
        prev.map((t) =>
          t.request.collectionId === collectionId && t.request.folderId === folderId
            ? {
                ...t,
                request: { ...t.request, folderId: undefined, updatedAt: Date.now() },
              }
            : t,
        ),
      );
    },
    [savedRequests],
  );

  const moveRequestToFolder = useCallback(
    async (requestId: string, folderId: string | null) => {
      const nextFolderId = folderId ?? undefined;
      let updated: HttpRequest | null = null;
      setSavedRequests((prev) =>
        prev.map((r) => {
          if (r.id !== requestId) return r;
          updated = { ...r, folderId: nextFolderId, updatedAt: Date.now() };
          return updated;
        }),
      );
      setTabs((prev) =>
        prev.map((t) =>
          t.requestId === requestId || t.request.id === requestId
            ? {
                ...t,
                request: {
                  ...t.request,
                  folderId: nextFolderId,
                  updatedAt: Date.now(),
                },
              }
            : t,
        ),
      );
      const fromState = savedRequests.find((r) => r.id === requestId);
      const toPut =
        updated ??
        (fromState
          ? { ...fromState, folderId: nextFolderId, updatedAt: Date.now() }
          : null);
      if (toPut) await db.put("requests", toPut);
    },
    [savedRequests],
  );

  const createEnvironment = useCallback(async (name: string) => {
    const env: Environment = {
      id: createId(),
      name: name.trim() || "New environment",
      variables: [
        createPair("baseUrl", "https://api.example.com"),
        createPair("token", ""),
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await db.put("environments", env);
    setEnvironments((prev) => [...prev, env]);
    setPreferences({ activeEnvironmentId: env.id });
    return env;
  }, [setPreferences]);

  const updateEnvironment = useCallback(async (env: Environment) => {
    const next = { ...env, updatedAt: Date.now() };
    await db.put("environments", next);
    setEnvironments((prev) => prev.map((e) => (e.id === next.id ? next : e)));
  }, []);

  const deleteEnvironment = useCallback(
    async (id: string) => {
      await db.remove("environments", id);
      setEnvironments((prev) => prev.filter((e) => e.id !== id));
      if (preferences.activeEnvironmentId === id) {
        setPreferences({ activeEnvironmentId: null });
      }
    },
    [preferences.activeEnvironmentId, setPreferences],
  );

  const setActiveEnvironmentId = useCallback(
    (id: string | null) => {
      setPreferences({ activeEnvironmentId: id });
    },
    [setPreferences],
  );

  const clearHistory = useCallback(async () => {
    await db.clearStore("history");
    setHistory([]);
  }, []);

  const resetWorkspace = useCallback(async () => {
    abortRef.current?.abort();
    sendingRef.current = false;
    setSending(false);
    if (persistRequestTimer.current) {
      clearTimeout(persistRequestTimer.current);
      persistRequestTimer.current = null;
    }
    if (persistSessionTimer.current) {
      clearTimeout(persistSessionTimer.current);
      persistSessionTimer.current = null;
    }

    const keptTheme = preferences.theme;
    const nextPrefs = { ...defaultPreferences, theme: keptTheme };

    await db.clearAllStores();
    savePreferences(nextPrefs);

    const session = createDefaultSession();
    setCollections([]);
    setSavedRequests([]);
    setHistory([]);
    setEnvironments([]);
    setPreferencesState(nextPrefs);
    setTabs(session.tabs);
    setActiveTabIdState(session.activeTabId);
    setSidebarTab("collections");
    setMobileSidebarOpen(false);

    await saveEditorSession(session);
  }, [preferences.theme]);

  const deleteHistoryItem = useCallback(async (id: string) => {
    await db.remove("history", id);
    setHistory((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const value: WorkspaceContextValue = {
    ready,
    preferences,
    setPreferences,
    request,
    setRequest,
    tabs,
    activeTabId,
    setActiveTabId,
    closeTab,
    assertionResults,
    collections,
    savedRequests,
    history,
    environments,
    activeEnvironment,
    response,
    sending,
    sendError,
    unresolvedVars,
    sidebarTab,
    setSidebarTab,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    sendRequest,
    cancelRequest,
    newRequest,
    loadRequest,
    saveRequest,
    quickSaveRequest,
    addRequestToCollection,
    createCollection,
    importBundle,
    renameCollection,
    deleteCollection,
    duplicateCollection,
    deleteSavedRequest,
    addFolder,
    renameFolder,
    deleteFolder,
    moveRequestToFolder,
    createEnvironment,
    updateEnvironment,
    deleteEnvironment,
    setActiveEnvironmentId,
    clearHistory,
    resetWorkspace,
    deleteHistoryItem,
    loadHistoryItem,
    applyExampleUrl,
    sendSampleUrl,
  };

  return (
    <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
  );
}
