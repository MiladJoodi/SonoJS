/**
 * Optional thumb path overrides while category assets roll out.
 * Default path: `public/images/blocks/{category}-light|dark.webp`.
 */
const BLOCK_CATEGORY_THUMB_OVERRIDE: Partial<
  Record<string, { light: string; dark: string }>
> = {
  "ai-agents": {
    light: "/images/blocks/ai-light.webp",
    dark: "/images/blocks/ai-dark.webp",
  },
  "application-layouts": {
    light: "/images/blocks/layouts-light.webp",
    dark: "/images/blocks/layouts-dark.webp",
  },
  navigation: {
    light: "/images/blocks/navbar-light.webp",
    dark: "/images/blocks/navbar-dark.webp",
  },
  "dashboards-analytics": {
    light: "/images/blocks/dashboards-analytics-light.webp",
    dark: "/images/blocks/dashboards-analytics-dark.webp",
  },
  "data-tables": {
    light: "/images/blocks/data-tables-light.webp",
    dark: "/images/blocks/data-tables-dark.webp",
  },
  marketing: {
    light: "/images/blocks/marketing-light.webp",
    dark: "/images/blocks/marketing-dark.webp",
  },
  authentication: {
    light: "/images/blocks/auth-light.webp",
    dark: "/images/blocks/auth-dark.webp",
  },
  forms: {
    light: "/images/blocks/forms-light.webp",
    dark: "/images/blocks/forms-dark.webp",
  },
  "feedback-states": {
    light: "/images/blocks/feedback-light.webp",
    dark: "/images/blocks/feedback-black.webp",
  },
  "user-account": {
    light: "/images/blocks/user-account-light.webp",
    dark: "/images/blocks/user-account-dark.webp",
  },
  onboarding: {
    light: "/images/blocks/onboarding-light.webp",
    dark: "/images/blocks/onboarding-dark.webp",
  },
  communication: {
    light: "/images/blocks/communication-light.webp",
    dark: "/images/blocks/communication-dark.webp",
  },
  "developer-tools": {
    light: "/images/blocks/developer-tools-light.webp",
    dark: "/images/blocks/developer-tools-dark.webp",
  },
  ecommerce: {
    light: "/images/blocks/ecommerce-light.webp",
    dark: "/images/blocks/ecommerce-dark.webp",
  },
  "search-filtering": {
    light: "/images/blocks/search-filtering-light.webp",
    dark: "/images/blocks/search-filtering-dark.webp",
  },
  "files-media": {
    light: "/images/blocks/files-media-light.webp",
    dark: "/images/blocks/files-media-dark.webp",
  },
  "calendar-scheduling": {
    light: "/images/blocks/calendar-scheduling-light.webp",
    dark: "/images/blocks/calendar-scheduling-dark.webp",
  },
  "content-publishing": {
    light: "/images/blocks/content-publishing-light.webp",
    dark: "/images/blocks/content-publishing-dark.webp",
  },
}

/** True when a real thumb pair exists (skip wireframe). */
export function hasBlockCategoryThumb(category: string) {
  return category in BLOCK_CATEGORY_THUMB_OVERRIDE
}

/** Blocks category thumbs: override map or `{category}-light|dark.webp`. */
export function blockCategoryThumbSrc(
  category: string,
  theme: "light" | "dark"
) {
  const override = BLOCK_CATEGORY_THUMB_OVERRIDE[category]
  if (override) return override[theme]
  return `/images/blocks/${category}-${theme}.webp`
}

/** Component thumbs: `public/images/components/{slug}-light|dark.webp`. */
export function componentThumbSrc(slug: string, theme: "light" | "dark") {
  return `/images/components/${slug}-${theme}.webp`
}
