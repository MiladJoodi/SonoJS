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

/**
 * Component gallery thumbs while captures roll out.
 * Keys = docs slug; values = file stem under `public/images/components/`
 * (e.g. `button-default` → `button-default-light.png`).
 */
const COMPONENT_THUMB_STEM: Partial<Record<string, string>> = {
  accordion: "accordion-default",
  alert: "alert-default",
  "alert-dialog": "alert-dialog-default",
  button: "button-default",
  "button-group": "button-group-default",
  calendar: "calendar-basic",
  card: "card-image",
  checkbox: "checkbox-default",
  collapsible: "collapsible-default",
  combobox: "combobox-default",
  command: "command-default",
  "context-menu": "context-menu-default",
  "date-picker": "date-picker-default",
  dialog: "dialog-default",
  drawer: "drawer-default",
  "dropdown-menu": "dropdown-menu-default",
  "electro-border": "electro-border-default",
  field: "field-default",
  "hover-card": "hover-card-default",
  input: "input-default",
  "input-group": "input-group-default",
  "input-otp": "input-otp-default",
  item: "item-default",
  label: "label-default",
  marquee: "marquee-default",
  menubar: "menubar-default",
  "native-select": "native-select-default",
  popover: "popover-default",
  "radio-group": "radio-group-default",
  "rainbow-button": "rainbow-button-default",
  resizable: "resizable-handle",
  "scroll-area": "scroll-area-default",
  select: "select-default",
  separator: "separator-default",
  sheet: "sheet-default",
  slider: "slider-default",
  sortable: "sortable-default",
  switch: "switch-default",
  tabs: "tabs-line",
  textarea: "textarea-default",
  timeline: "timeline-activity",
  toggle: "toggle-with-text",
  "toggle-group": "toggle-group-spacing",
  tooltip: "tooltip-default",
}

/** True when a real PNG thumb pair exists (skip wireframe). */
export function hasComponentThumb(slug: string) {
  return slug in COMPONENT_THUMB_STEM
}

/** Component thumbs: override stem map or `{slug}-light|dark.webp`. */
export function componentThumbSrc(slug: string, theme: "light" | "dark") {
  const stem = COMPONENT_THUMB_STEM[slug]
  if (stem) return `/images/components/${stem}-${theme}.png`
  return `/images/components/${slug}-${theme}.webp`
}
