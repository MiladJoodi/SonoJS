/**
 * Unique meta descriptions for docs components and AI pages.
 * Prefer this map over templated copy in componentDocsMetadata / aiDocsMetadata.
 */

export const COMPONENT_META_DESCRIPTIONS: Record<string, string> = {
  accordion:
    "Expandable sections for FAQs and settings. Nested content stays out of the way until opened.",
  alert:
    "Inline status banners for success, warning, and error — keep feedback next to the action.",
  "alert-dialog":
    "Modal confirms for destructive or irreversible actions with clear cancel and continue paths.",
  avatar:
    "User and entity avatars with image, fallback initials, and size variants for lists and headers.",
  badge:
    "Compact labels for status, counts, and categories — solid, outline, and soft styles.",
  breadcrumb:
    "Trail navigation for deep docs and app hierarchies with separators and truncated mid-paths.",
  bubble:
    "Chat-style message bubbles for human and assistant turns in conversational UIs.",
  button:
    "Primary actions in brand blue with outline, secondary, ghost, and destructive variants — comfort density and clear focus rings.",
  "button-group":
    "Grouped actions that share a border and radius — toolbars, segmented controls, and related CTAs.",
  calendar:
    "Month grids and range selection for booking and filters — DayPicker-based with dropdown chrome that matches SonoJS inputs.",
  card:
    "Surface containers for forms, pricing, and feature blocks with header, content, and footer slots.",
  carousel:
    "Horizontal slide galleries with prev/next controls for product media and marketing strips.",
  checkbox:
    "Binary and indeterminate checks for forms and bulk select — accessible hit targets and labels.",
  "clothes-rack":
    "Interactive 3D garment rack for fashion and product storytelling in the browser.",
  "code-block":
    "Syntax-highlighted code panels for docs and product UI — installable source you own.",
  collapsible:
    "Show or hide secondary content without leaving the page — progressive disclosure for dense layouts.",
  combobox:
    "Searchable select for long option lists — typeahead, keyboard navigation, and clear empty states.",
  command:
    "Command palette patterns for quick actions and navigation — fuzzy find across your app.",
  "context-menu":
    "Right-click menus for canvas and list items — shortcuts stay next to the pointer.",
  "data-table":
    "Sortable, filterable tables with selection and pagination for admin and ops views.",
  "date-picker":
    "Popover calendar input for single dates — pairs with form Field and matches control height.",
  dialog:
    "Centered modal overlays for forms and confirmations — focus trap, escape to close, and accessible titles.",
  "dotted-map":
    "SVG dotted world map with markers, staggered dots, pulse rings, and custom overlays.",
  drawer:
    "Edge sheets for mobile filters and details — slide in from the side without losing page context.",
  "dropdown-menu":
    "Action menus anchored to a trigger — nested items, shortcuts, and checkbox/radio rows.",
  "border-beam":
    "Animated light beam that travels along a container border — size, duration, reverse, and spring transitions.",
  "magic-card":
    "Pointer-following spotlight card with gradient border highlight or soft orb glow.",
  "electro-border":
    "Animated energy border accents for hero cards and featured panels.",
  empty:
    "Empty-state layouts with icon, copy, and CTA when lists or searches return nothing.",
  field:
    "Form field primitive that wires label, control, description, and error into one accessible unit.",
  "hover-card":
    "Rich previews on hover for links and avatars — delay-friendly and keyboard dismissible.",
  input:
    "Text fields at the default 46px control height — borders, focus rings, and file/input variants for forms.",
  "input-group":
    "Inputs with leading or trailing addons — icons, buttons, and units in one control.",
  "input-otp":
    "One-time passcode digit slots for MFA and email verification flows.",
  item:
    "List row primitive for settings and menus — media, title, description, and actions.",
  kbd:
    "Keyboard shortcut badges that match your docs and command palette chrome.",
  label:
    "Accessible form labels paired with controls — required markers and peer disabled styles.",
  lens:
    "Hover or static magnifier over images and other content — zoom factor, lens size, and fixed or default positions.",
  marker:
    "Highlight and annotation markers for docs and walkthrough copy.",
  marquee:
    "CSS marquee strips for logos and announcements — pause on hover, RTL-aware direction.",
  menubar:
    "Desktop-style menu bars for complex apps — nested menus and keyboard mnemonics.",
  message:
    "Structured chat messages with role, timestamp, and actions for agent and support UIs.",
  "message-scroller":
    "Auto-scrolling message lists that stick to the latest turn in long conversations.",
  "native-select":
    "Styled native select for simple choices when a full Combobox is more than you need.",
  "navigation-menu":
    "Top-level site navigation with dropdown panels for product and docs hubs.",
  pagination:
    "Page controls for tables and search results — previous, next, and numbered jumps.",
  popover:
    "Non-modal floating panels for filters and lightweight forms anchored to a trigger.",
  "pro-button":
    "Highlighted CTA button for Pro and upgrade moments — stands out from default primary.",
  progress:
    "Linear progress for uploads and multi-step flows — determinate and indeterminate modes.",
  "progressive-blur":
    "Layered backdrop blur fade for scrollable edges — top, bottom, or both with tunable blur levels.",
  "radio-group":
    "Single-choice option sets for forms — clear selected state and keyboard roving focus.",
  "rainbow-button":
    "Gradient-border CTA for launch and marketing moments without leaving the design system.",
  resizable:
    "Drag-to-resize panel groups for IDEs, inboxes, and split workspaces.",
  "scroll-area":
    "Custom scroll containers that keep overflow tidy inside cards and sidebars.",
  select:
    "Dropdown select matching input height and radius — single value with clear trigger labels.",
  separator:
    "Horizontal and vertical rules to divide toolbars, menus, and card sections.",
  sheet:
    "Large side panels for settings and detail views — mobile-friendly alternative to dialogs.",
  "shine-border":
    "Animated shine along a container border — multi-stop or monotone colors with a companion CSS keyframe file.",
  skeleton:
    "Placeholder shimmer for loading lists and cards before data arrives.",
  slider:
    "Range controls for volume, price, and filters — single thumb or dual range.",
  sonner:
    "Toast notifications for success and error feedback — stackable and dismissible.",
  sortable:
    "Drag-and-drop reorder lists for kanban columns, queues, and preference ranking.",
  spinner:
    "Loading indicators for buttons and panels when an action is in flight.",
  switch:
    "On/off toggles for settings — compact thumb and clear pressed state.",
  table:
    "Semantic HTML tables with header, body, and caption styles for dense data.",
  tabs:
    "Tabbed panels to switch views without routing — underline and boxed variants.",
  textarea:
    "Multi-line text input for comments and prompts — resize behavior that fits forms.",
  timeline:
    "Vertical event timelines for activity feeds, onboarding, and order tracking.",
  toggle:
    "Pressable toggle for formatting toolbars and view modes — pressed and off states.",
  "toggle-group":
    "Exclusive or multi-select toggle clusters for filters and editor chrome.",
  tooltip:
    "Short hover hints for icon-only controls — delay and collision-aware placement.",
  "tweet-card":
    "Embed-style tweet cards for social proof and content previews in marketing pages.",
  "verified-badge":
    "Verified checkmarks for profiles and listings — compact trust signals.",
}

export const AI_META_DESCRIPTIONS: Record<string, string> = {
  "agent-activity":
    "Live agent activity feeds that show tools, status, and progress while a run is underway.",
  "agent-activity-2":
    "Alternate agent activity layout for denser run logs and multi-step tool traces.",
  "ai-sidebar":
    "Dockable AI sidebar for chat, context, and actions alongside your main workspace.",
  "approval-card":
    "Human-in-the-loop approval cards for tool calls — review, edit, and confirm before execution.",
  attachment:
    "File and media attachment chips for prompt composers — upload status and remove actions.",
  citations:
    "Source citation lists that link model answers back to docs, URLs, and snippets.",
  "code-block":
    "AI-oriented code blocks with copy and language chrome for streamed assistant replies.",
  "file-diff":
    "Side-by-side and unified diffs for agent file edits — review changes before apply.",
  "fluid-orb":
    "Fluid animated orb for voice and ambient AI presence in product chrome.",
  "image-generation":
    "Image generation panels with prompt, progress, and result gallery for creative agents.",
  "image-generation-2":
    "Second image-generation layout focused on batch previews and variation picks.",
  "inline-citation":
    "Inline citation markers inside streamed markdown — hover for source detail.",
  "loading-states":
    "AI loading patterns for thinking, typing, and tool wait — keep the UI honest mid-run.",
  "mic-selector":
    "Microphone device picker for voice agents — permission-aware and clearly labeled.",
  "model-selector":
    "Model picker for chat composers — provider, capability badges, and quick switch.",
  "open-in-chat":
    "Open-in-chat actions that hand context from a page into an agent conversation.",
  persona:
    "Agent persona cards — avatar, role, and tone settings for multi-agent products.",
  "prompt-input":
    "Prompt composer with send, attachments, and model controls for agent chat UIs.",
  "prompt-input-2":
    "Alternate prompt input layout for multi-line agents and toolbar-heavy composers.",
  queue:
    "Queued agent jobs with status, cancel, and reorder — keep long runs visible.",
  "reasoning-text":
    "Collapsible reasoning traces so users can inspect how an answer was formed.",
  "selection-actions":
    "Floating actions on selected text — rewrite, explain, and send to the agent.",
  "streaming-response":
    "Token-streaming response chrome with stop, regenerate, and copy for live answers.",
  "structured-output":
    "Typed structured output viewers for JSON and schema-bound agent results.",
  "task-list":
    "Streaming agent task log — step reveal, file chips, and a shimmering running title.",
  "task-rows":
    "Checklist-style agent task rows with status dots for multi-step plans.",
  terminal:
    "In-product terminal for agent shell commands — stdout, exit codes, and copy.",
  "thinking-orbs":
    "Animated thinking indicators for model wait states without blocking the layout.",
  "todo-list":
    "Agent todo lists that track planned steps as the run progresses.",
  "tool-approval":
    "Tool approval UI for dangerous commands — show args, risk, and allow or deny.",
  trace:
    "Execution traces for agent runs — spans, timings, and nested tool calls.",
  transcription:
    "Live transcription panels for voice sessions — partials, finals, and speaker hints.",
  "voice-ai-orb":
    "Voice AI orb that reacts to listening and speaking states in realtime UIs.",
  "voice-selector":
    "TTS voice picker for agents — preview samples and persist the chosen voice.",
}

export function componentMetaDescription(slug: string, title: string): string {
  return (
    COMPONENT_META_DESCRIPTIONS[slug] ??
    `${title} docs for React and Tailwind apps — install with the SonoJS CLI and keep the source.`
  )
}

export function aiMetaDescription(slug: string, title: string): string {
  return (
    AI_META_DESCRIPTIONS[slug] ??
    `${title} for AI product UIs — install with the SonoJS CLI and own the React source.`
  )
}
