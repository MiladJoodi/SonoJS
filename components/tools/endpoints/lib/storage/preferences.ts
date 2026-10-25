import type { AppPreferences, ThemePreference } from "@/components/tools/endpoints/types";
import { DEFAULT_TIMEOUT_MS } from "@/components/tools/endpoints/types";

const PREFS_KEY = "endpoints.preferences";

export const defaultPreferences: AppPreferences = {
  theme: "dark",
  timeoutMs: DEFAULT_TIMEOUT_MS,
  sidebarCollapsed: false,
  activeEnvironmentId: null,
  lastCollectionId: null,
};

function normalizeTheme(theme: unknown): ThemePreference {
  return theme === "light" ? "light" : "dark";
}

export function loadPreferences(): AppPreferences {
  if (typeof window === "undefined") return defaultPreferences;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return defaultPreferences;
    const parsed = JSON.parse(raw) as Partial<AppPreferences>;
    return {
      ...defaultPreferences,
      ...parsed,
      theme: normalizeTheme(parsed.theme),
    };
  } catch {
    return defaultPreferences;
  }
}

export function savePreferences(prefs: AppPreferences): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export function resolveTheme(theme: ThemePreference): "dark" | "light" {
  return theme;
}
