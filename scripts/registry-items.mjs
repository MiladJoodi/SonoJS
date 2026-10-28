/**
 * Source definitions for `npm run registry:build`.
 * UI components: single source = packages/ui (imports rewritten for consumers).
 * Blocks/charts stay under registry/.
 */

import { readFileSync } from "node:fs"

/** @typedef {{ path: string, type: string, target?: string }} RegistryFileDef */
/** @typedef {{
 *   name: string,
 *   type: string,
 *   title: string,
 *   description?: string,
 *   dependencies?: string[],
 *   registryDependencies?: string[],
 *   cssVars?: { light?: Record<string, string>, dark?: Record<string, string> },
 *   files: RegistryFileDef[]
 * }} RegistryItemDef
 */

/** Soft surfaces — install injects these so elevated cards match docs. */
const SOFT_SURFACE_CSS_VARS = {
  light: {
    canvas: "#f3f3f4",
    "border-soft": "color-mix(in oklab, #e4e4e7 70%, transparent)",
    "shadow-soft":
      "0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18)",
    background: "var(--canvas)",
    card: "#ffffff",
  },
  dark: {
    canvas: "#09090b",
    "border-soft": "color-mix(in oklab, #27272a 70%, transparent)",
    "shadow-soft":
      "0 2px 4px -1px rgba(0, 0, 0, 0.24), 0 28px 56px -28px rgba(0, 0, 0, 0.48)",
    background: "var(--canvas)",
    card: "#18181b",
  },
}

/** Social brand icons for auth blocks (`@/registry/icons/*` → block-local `icons/`). */
function authSocialIconFiles(slug, icons) {
  return icons.flatMap((name) => [
    {
      path: `registry/icons/${name}.tsx`,
      type: "registry:component",
      target: `components/blocks/authentication/${slug}/icons/${name}.tsx`,
    },
    {
      path: `registry/icons/${name}.svg`,
      type: "registry:file",
      target: `components/blocks/authentication/${slug}/icons/${name}.svg`,
    },
  ])
}

/** Brand / tool icons for navigation blocks (`@/registry/icons/*` → block-local `icons/`). */
function navBlockIconFiles(slug, icons) {
  return icons.flatMap((name) => [
    {
      path: `registry/icons/${name}.tsx`,
      type: "registry:component",
      target: `components/blocks/navigation/${slug}/icons/${name}.tsx`,
    },
    {
      path: `registry/icons/${name}.svg`,
      type: "registry:file",
      target: `components/blocks/navigation/${slug}/icons/${name}.svg`,
    },
  ])
}

/** Brand icons for marketing blocks (`@/registry/icons/*` → block-local `icons/`). */
function marketingBlockIconFiles(slug, icons) {
  return icons.flatMap((name) => [
    {
      path: `registry/icons/${name}.tsx`,
      type: "registry:component",
      target: `components/blocks/marketing/${slug}/icons/${name}.tsx`,
    },
    {
      path: `registry/icons/${name}.svg`,
      type: "registry:file",
      target: `components/blocks/marketing/${slug}/icons/${name}.svg`,
    },
  ])
}

/** Team marketing block: `team.tsx` + portrait webps shipped with the demo. */
function marketingTeamBlock(slug, description, images) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    files: [
      {
        path: `registry/blocks/marketing/team/${slug}/team.tsx`,
        type: "registry:component",
        target: `components/blocks/marketing/${slug}/team.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/marketing/team/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/marketing/${slug}/images/${file}`,
      })),
    ],
  }
}

/**
 * Pricing marketing block: `pricing.tsx` with inline SVG icons (no image assets).
 * Demo source === install payload after `@sonojs/ui` → `@/components/ui` rewrite.
 */
function marketingPricingBlock(slug, description) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    registryDependencies: ["button"],
    files: [
      {
        path: `registry/blocks/marketing/pricing/${slug}/pricing.tsx`,
        type: "registry:component",
        target: `components/blocks/marketing/${slug}/pricing.tsx`,
      },
    ],
  }
}

function marketingNewsletterBlock(
  slug,
  description,
  {
    images = [],
    registryDependencies = ["button", "input"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    registryDependencies,
    files: [
      {
        path: `registry/blocks/marketing/newsletter/${slug}/newsletter.tsx`,
        type: "registry:component",
        target: `components/blocks/marketing/${slug}/newsletter.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/marketing/newsletter/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/marketing/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Advanced data grid block under Data & Tables. */
function dataTablesAdvancedGridBlock(
  slug,
  description,
  { dependencies, registryDependencies, images = [] } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/data-tables/advanced-data-grid/${slug}/table.tsx`,
        type: "registry:component",
        target: `components/blocks/data-tables/${slug}/table.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/data-tables/advanced-data-grid/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/data-tables/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Billing settings under Payments & Billing. */
function paymentsBillingSettingsBlock(
  slug,
  description,
  {
    registryDependencies = [
      "alert",
      "badge",
      "button",
      "card",
      "separator",
      "table",
    ],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/payments-billing/billing-settings/${slug}/billing-settings.tsx`,
        type: "registry:component",
        target: `components/blocks/payments-billing/${slug}/billing-settings.tsx`,
      },
    ],
  }
}

function paymentsUsageBasedBillingBlock(
  slug,
  description,
  {
    registryDependencies = ["badge", "button", "separator"],
    dependencies = ["lucide-react"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies,
    registryDependencies,
    files: [
      {
        path: `registry/blocks/payments-billing/usage-based-billing/${slug}/usage-based-billing.tsx`,
        type: "registry:component",
        target: `components/blocks/payments-billing/${slug}/usage-based-billing.tsx`,
      },
    ],
  }
}

function paymentsTransferFundsBlock(
  slug,
  description,
  {
    registryDependencies = [
      "badge",
      "button",
      "field",
      "input-group",
      "select",
      "textarea",
    ],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/payments-billing/transfer-funds/${slug}/transfer-funds.tsx`,
        type: "registry:component",
        target: `components/blocks/payments-billing/${slug}/transfer-funds.tsx`,
      },
    ],
  }
}

function paymentsInvoiceBlock(
  slug,
  description,
  {
    registryDependencies = ["badge", "button", "separator", "table"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/payments-billing/invoice/${slug}/invoice.tsx`,
        type: "registry:component",
        target: `components/blocks/payments-billing/${slug}/invoice.tsx`,
      },
    ],
  }
}

/** Cards & wallets under Payments & Billing. */
function paymentsPaymentMethodsBlock(
  slug,
  description,
  {
    registryDependencies = ["badge", "button"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/payments-billing/payment-methods/${slug}/payment-methods.tsx`,
        type: "registry:component",
        target: `components/blocks/payments-billing/${slug}/payment-methods.tsx`,
      },
    ],
  }
}

function feedbackAccessDeniedBlock(
  slug,
  description,
  {
    registryDependencies = ["avatar", "badge", "button", "separator"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/feedback-states/access-denied/${slug}/access-denied.tsx`,
        type: "registry:component",
        target: `components/blocks/feedback-states/${slug}/access-denied.tsx`,
      },
    ],
  }
}

function feedbackNotFoundBlock(
  slug,
  description,
  {
    registryDependencies = ["button", "input-group", "separator"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/feedback-states/not-found/${slug}/not-found.tsx`,
        type: "registry:component",
        target: `components/blocks/feedback-states/${slug}/not-found.tsx`,
      },
    ],
  }
}

function feedbackErrorStateBlock(
  slug,
  description,
  {
    registryDependencies = ["alert", "button", "separator"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/feedback-states/error-state/${slug}/error-state.tsx`,
        type: "registry:component",
        target: `components/blocks/feedback-states/${slug}/error-state.tsx`,
      },
    ],
  }
}

function feedbackRateLimitBlock(
  slug,
  description,
  {
    registryDependencies = ["alert", "badge", "button", "separator"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/feedback-states/rate-limit/${slug}/rate-limit.tsx`,
        type: "registry:component",
        target: `components/blocks/feedback-states/${slug}/rate-limit.tsx`,
      },
    ],
  }
}

function feedbackMaintenanceBlock(
  slug,
  description,
  {
    registryDependencies = ["badge", "button", "input-group"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/feedback-states/maintenance/${slug}/maintenance.tsx`,
        type: "registry:component",
        target: `components/blocks/feedback-states/${slug}/maintenance.tsx`,
      },
    ],
  }
}

function feedbackStatusPageBlock(
  slug,
  description,
  {
    registryDependencies = ["alert", "badge", "button", "card"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/feedback-states/status-page/${slug}/status-page.tsx`,
        type: "registry:component",
        target: `components/blocks/feedback-states/${slug}/status-page.tsx`,
      },
    ],
  }
}

/** Account settings under User & Account. */
function userAccountSettingsBlock(
  slug,
  description,
  {
    registryDependencies = [
      "avatar",
      "badge",
      "button",
      "field",
      "input",
      "select",
      "separator",
      "switch",
      "tabs",
      "textarea",
    ],
    images = ["avatar.webp"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/user-account/account-settings/${slug}/account-settings.tsx`,
        type: "registry:component",
        target: `components/blocks/user-account/${slug}/account-settings.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/user-account/account-settings/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/user-account/${slug}/images/${file}`,
      })),
    ],
  }
}

function userAccountTeamMembersBlock(
  slug,
  description,
  {
    registryDependencies = [
      "avatar",
      "badge",
      "button",
      "dialog",
      "dropdown-menu",
      "field",
      "input",
      "select",
      "table",
    ],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/user-account/team-members/${slug}/team-members.tsx`,
        type: "registry:component",
        target: `components/blocks/user-account/${slug}/team-members.tsx`,
      },
    ],
  }
}

function userAccountRolesAndPermissionsBlock(
  slug,
  description,
  {
    registryDependencies = [
      "badge",
      "button",
      "card",
      "checkbox",
      "table",
      "tooltip",
    ],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/user-account/roles-and-permissions/${slug}/roles-and-permissions.tsx`,
        type: "registry:component",
        target: `components/blocks/user-account/${slug}/roles-and-permissions.tsx`,
      },
    ],
  }
}

/** Public user profile under User & Account. */
function userAccountUserProfileBlock(
  slug,
  description,
  {
    registryDependencies = ["avatar", "badge", "button", "separator", "tabs"],
    images = ["avatar.webp"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/user-account/user-profile/${slug}/user-profile.tsx`,
        type: "registry:component",
        target: `components/blocks/user-account/${slug}/user-profile.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/user-account/user-profile/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/user-account/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Payment form block under Payments & Billing. */
function paymentsBillingPaymentFormBlock(
  slug,
  description,
  {
    dependencies = ["lucide-react"],
    registryDependencies = ["button", "checkbox", "input", "label"],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/payments-billing/payment-form/${slug}/payment-form.tsx`,
        type: "registry:component",
        target: `components/blocks/payments-billing/${slug}/payment-form.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/payments-billing/payment-form/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/payments-billing/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Product details block under E-commerce. */
function ecommerceProductDetailsBlock(
  slug,
  description,
  {
    dependencies = ["lucide-react"],
    registryDependencies = [
      "accordion",
      "button",
      "input",
      "label",
      "separator",
    ],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/ecommerce/product-details/${slug}/product-details.tsx`,
        type: "registry:component",
        target: `components/blocks/ecommerce/${slug}/product-details.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/ecommerce/product-details/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/ecommerce/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Product list / grid: `product-list.tsx` + local product images. */
function ecommerceProductListBlock(
  slug,
  description,
  {
    dependencies = [],
    registryDependencies = ["button"],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/ecommerce/product-list/${slug}/product-list.tsx`,
        type: "registry:component",
        target: `components/blocks/ecommerce/${slug}/product-list.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/ecommerce/product-list/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/ecommerce/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Checkout flow: `checkout.tsx` + local product / payment-mark images. */
function ecommerceCheckoutBlock(
  slug,
  description,
  {
    dependencies = [],
    registryDependencies = [
      "button",
      "checkbox",
      "input",
      "label",
      "radio-group",
    ],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/ecommerce/checkout/${slug}/checkout.tsx`,
        type: "registry:component",
        target: `components/blocks/ecommerce/${slug}/checkout.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/ecommerce/checkout/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/ecommerce/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Shopping cart page: `shopping-cart.tsx` + local product images. */
function ecommerceShoppingCartBlock(
  slug,
  description,
  {
    dependencies = ["lucide-react"],
    registryDependencies = ["button", "input", "label", "separator"],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/ecommerce/shopping-cart/${slug}/shopping-cart.tsx`,
        type: "registry:component",
        target: `components/blocks/ecommerce/${slug}/shopping-cart.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/ecommerce/shopping-cart/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/ecommerce/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Product category grid: `product-categories.tsx` + local category images. */
function ecommerceProductCategoriesBlock(
  slug,
  description,
  {
    dependencies = [],
    registryDependencies = [],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/ecommerce/product-categories/${slug}/product-categories.tsx`,
        type: "registry:component",
        target: `components/blocks/ecommerce/${slug}/product-categories.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/ecommerce/product-categories/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/ecommerce/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Saved wishlist grid: `wishlist.tsx` + local product images. */
function ecommerceWishlistBlock(
  slug,
  description,
  {
    dependencies = ["lucide-react"],
    registryDependencies = ["badge", "button"],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/ecommerce/wishlist/${slug}/wishlist.tsx`,
        type: "registry:component",
        target: `components/blocks/ecommerce/${slug}/wishlist.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/ecommerce/wishlist/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/ecommerce/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Post-checkout confirmation page: `order-confirmation.tsx` + local product images. */
function ecommerceOrderConfirmationBlock(
  slug,
  description,
  {
    dependencies = ["lucide-react"],
    registryDependencies = ["badge", "button", "separator"],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/ecommerce/order-confirmation/${slug}/order-confirmation.tsx`,
        type: "registry:component",
        target: `components/blocks/ecommerce/${slug}/order-confirmation.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/ecommerce/order-confirmation/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/ecommerce/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Order summary / confirmation card: `order-summary.tsx` + local product images. */
function ecommerceOrderSummaryBlock(
  slug,
  description,
  {
    dependencies = [],
    registryDependencies = ["button"],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/ecommerce/order-summary/${slug}/order-summary.tsx`,
        type: "registry:component",
        target: `components/blocks/ecommerce/${slug}/order-summary.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/ecommerce/order-summary/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/ecommerce/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Order tracking page: `order-tracking.tsx` + local product images. */
function ecommerceOrderTrackingBlock(
  slug,
  description,
  {
    dependencies = ["lucide-react"],
    registryDependencies = ["button"],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/ecommerce/order-tracking/${slug}/order-tracking.tsx`,
        type: "registry:component",
        target: `components/blocks/ecommerce/${slug}/order-tracking.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/ecommerce/order-tracking/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/ecommerce/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Order history list: `order-history.tsx` + local product images. */
function ecommerceOrderHistoryBlock(
  slug,
  description,
  {
    dependencies = [],
    registryDependencies = [],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/ecommerce/order-history/${slug}/order-history.tsx`,
        type: "registry:component",
        target: `components/blocks/ecommerce/${slug}/order-history.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/ecommerce/order-history/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/ecommerce/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Product filter sidebar + results: `product-filter.tsx`. */
function ecommerceProductFilterBlock(
  slug,
  description,
  {
    dependencies = [],
    registryDependencies = [],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/ecommerce/product-filter/${slug}/product-filter.tsx`,
        type: "registry:component",
        target: `components/blocks/ecommerce/${slug}/product-filter.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/ecommerce/product-filter/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/ecommerce/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Product review list / cards: `product-review.tsx` + local avatars. */
function ecommerceProductReviewBlock(
  slug,
  description,
  {
    dependencies = [],
    registryDependencies = [],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(dependencies?.length ? { dependencies } : {}),
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    files: [
      {
        path: `registry/blocks/ecommerce/product-review/${slug}/product-review.tsx`,
        type: "registry:component",
        target: `components/blocks/ecommerce/${slug}/product-review.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/ecommerce/product-review/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/ecommerce/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Image gallery block: `gallery.tsx` + local demo images. */
/** Data export panel under Files & Media. */
function filesMediaDataExportBlock(
  slug,
  description,
  {
    registryDependencies = [
      "alert",
      "badge",
      "button",
      "checkbox",
      "label",
      "progress",
      "radio-group",
    ],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/files-media/data-export/${slug}/data-export.tsx`,
        type: "registry:component",
        target: `components/blocks/files-media/${slug}/data-export.tsx`,
      },
    ],
  }
}

function filesMediaFileManagerBlock(
  slug,
  description,
  {
    registryDependencies = [
      "avatar",
      "button",
      "checkbox",
      "dropdown-menu",
      "input",
      "table",
    ],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/files-media/file-manager/${slug}/file-manager.tsx`,
        type: "registry:component",
        target: `components/blocks/files-media/${slug}/file-manager.tsx`,
      },
    ],
  }
}

function filesMediaFileUploadBlock(
  slug,
  description,
  {
    registryDependencies = ["badge", "button", "progress"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/files-media/file-upload/${slug}/file-upload.tsx`,
        type: "registry:component",
        target: `components/blocks/files-media/${slug}/file-upload.tsx`,
      },
    ],
  }
}

function filesMediaMediaGalleryBlock(
  slug,
  description,
  images = [],
  {
    registryDependencies = ["button", "checkbox", "dialog", "label"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/files-media/media-gallery/${slug}/media-gallery.tsx`,
        type: "registry:component",
        target: `components/blocks/files-media/${slug}/media-gallery.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/files-media/media-gallery/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/files-media/${slug}/images/${file}`,
      })),
    ],
  }
}

function filesMediaMediaPlayerBlock(
  slug,
  description,
  media = [],
  {
    registryDependencies = ["button"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/files-media/media-player/${slug}/media-player.tsx`,
        type: "registry:component",
        target: `components/blocks/files-media/${slug}/media-player.tsx`,
      },
      ...media.map((file) => ({
        path: `registry/blocks/files-media/media-player/${slug}/media/${file}`,
        type: "registry:file",
        target: `components/blocks/files-media/${slug}/media/${file}`,
      })),
    ],
  }
}

function filesMediaGalleryBlock(slug, description, images = []) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    files: [
      {
        path: `registry/blocks/files-media/image-gallery/${slug}/gallery.tsx`,
        type: "registry:component",
        target: `components/blocks/files-media/${slug}/gallery.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/files-media/image-gallery/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/files-media/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Content-section marketing block: `content-section.tsx` + local images. */
function marketingContentSectionBlock(
  slug,
  description,
  images = [],
  { registryDependencies, dependencies } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(registryDependencies?.length
      ? { registryDependencies }
      : {}),
    ...(dependencies?.length ? { dependencies } : {}),
    files: [
      {
        path: `registry/blocks/marketing/content-section/${slug}/content-section.tsx`,
        type: "registry:component",
        target: `components/blocks/marketing/${slug}/content-section.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/marketing/content-section/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/marketing/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Application dashboard layout shell: `dashboard-layout.tsx` + local images. */
/** API key management under Developer Tools. */
function developerToolsApiKeysBlock(
  slug,
  description,
  {
    registryDependencies = [
      "alert",
      "badge",
      "button",
      "card",
      "checkbox",
      "dialog",
      "dropdown-menu",
      "input",
      "label",
      "select",
      "table",
    ],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/developer-tools/api-key-management/${slug}/api-keys.tsx`,
        type: "registry:component",
        target: `components/blocks/developer-tools/${slug}/api-keys.tsx`,
      },
    ],
  }
}

/** Webhook management under Developer Tools. */
function developerToolsWebhookManagementBlock(
  slug,
  description,
  {
    registryDependencies = [
      "badge",
      "button",
      "card",
      "checkbox",
      "dropdown-menu",
      "field",
      "input",
      "label",
    ],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/developer-tools/webhook-management/${slug}/webhook-management.tsx`,
        type: "registry:component",
        target: `components/blocks/developer-tools/${slug}/webhook-management.tsx`,
      },
    ],
  }
}

function developerToolsIntegrationsBlock(
  slug,
  description,
  {
    registryDependencies = ["badge", "button", "input-group"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/developer-tools/integrations/${slug}/integrations.tsx`,
        type: "registry:component",
        target: `components/blocks/developer-tools/${slug}/integrations.tsx`,
      },
    ],
  }
}

function developerToolsLogsViewerBlock(
  slug,
  description,
  {
    registryDependencies = ["button", "input-group", "select"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/developer-tools/logs-viewer/${slug}/logs-viewer.tsx`,
        type: "registry:component",
        target: `components/blocks/developer-tools/${slug}/logs-viewer.tsx`,
      },
    ],
  }
}

function communicationNotificationCenterBlock(
  slug,
  description,
  {
    registryDependencies = [
      "avatar",
      "badge",
      "button",
      "dropdown-menu",
      "scroll-area",
      "tabs",
    ],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/communication/notification-center/${slug}/notification-center.tsx`,
        type: "registry:component",
        target: `components/blocks/communication/${slug}/notification-center.tsx`,
      },
    ],
  }
}

function communicationActivityFeedBlock(
  slug,
  description,
  {
    registryDependencies = ["avatar", "badge", "button", "card"],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/communication/activity-feed/${slug}/activity-feed.tsx`,
        type: "registry:component",
        target: `components/blocks/communication/${slug}/activity-feed.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/communication/activity-feed/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/communication/${slug}/images/${file}`,
      })),
    ],
  }
}

function dashboardsAnalyticsDashboardBlock(
  slug,
  description,
  {
    registryDependencies = ["button"],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/dashboards-analytics/analytics-dashboard/${slug}/analytics-dashboard.tsx`,
        type: "registry:component",
        target: `components/blocks/dashboards-analytics/${slug}/analytics-dashboard.tsx`,
      },
    ],
  }
}

function calendarSchedulingCalendarBlock(
  slug,
  description,
  {
    registryDependencies = [
      "avatar",
      "badge",
      "button",
      "calendar",
      "dialog",
      "field",
      "input",
      "select",
      "separator",
    ],
    images = [],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: [
      "lucide-react",
      "date-fns",
      "react-day-picker@^9.14.0",
    ],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/calendar-scheduling/calendar/${slug}/calendar.tsx`,
        type: "registry:component",
        target: `components/blocks/calendar-scheduling/${slug}/calendar.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/calendar-scheduling/calendar/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/calendar-scheduling/${slug}/images/${file}`,
      })),
    ],
  }
}

function onboardingSetupWizardBlock(
  slug,
  description,
  {
    registryDependencies = [
      "badge",
      "button",
      "field",
      "input-group",
      "input-otp",
      "progress",
    ],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/onboarding/setup-wizard/${slug}/setup-wizard.tsx`,
        type: "registry:component",
        target: `components/blocks/onboarding/${slug}/setup-wizard.tsx`,
      },
    ],
  }
}

function searchFilteringSearchResultsBlock(
  slug,
  description,
  {
    registryDependencies = [
      "badge",
      "button",
      "input",
      "input-group",
      "select",
    ],
  } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies,
    files: [
      {
        path: `registry/blocks/search-filtering/search-results/${slug}/search-results.tsx`,
        type: "registry:component",
        target: `components/blocks/search-filtering/${slug}/search-results.tsx`,
      },
    ],
  }
}

function applicationDashboardLayoutBlock(slug, description, images = []) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    files: [
      {
        path: `registry/blocks/application-layouts/dashboard-layout/${slug}/dashboard-layout.tsx`,
        type: "registry:component",
        target: `components/blocks/application-layouts/${slug}/dashboard-layout.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/application-layouts/dashboard-layout/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/application-layouts/${slug}/images/${file}`,
      })),
    ],
  }
}

/** Blog marketing block: `blog.tsx` + local cover images shipped with the demo. */
function marketingBlogBlock(
  slug,
  description,
  images = [],
  { registryDependencies, dependencies } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(registryDependencies?.length
      ? { registryDependencies }
      : {}),
    ...(dependencies?.length ? { dependencies } : {}),
    files: [
      {
        path: `registry/blocks/marketing/blog/${slug}/blog.tsx`,
        type: "registry:component",
        target: `components/blocks/marketing/${slug}/blog.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/marketing/blog/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/marketing/${slug}/images/${file}`,
      })),
    ],
  }
}

function marketingPortfolioBlock(
  slug,
  description,
  images = [],
  { registryDependencies, dependencies } = {}
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    ...(registryDependencies?.length ? { registryDependencies } : {}),
    ...(dependencies?.length ? { dependencies } : {}),
    files: [
      {
        path: `registry/blocks/marketing/portfolio/${slug}/portfolio.tsx`,
        type: "registry:component",
        target: `components/blocks/marketing/${slug}/portfolio.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/marketing/portfolio/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/marketing/${slug}/images/${file}`,
      })),
    ],
  }
}

const PORTFOLIO_IMAGES = [
  "project-design-system.webp",
  "project-fintech.webp",
  "project-analytics.webp",
  "project-workspace.webp",
  "project-logistics.webp",
  "project-fitness.webp",
]

const BLOG_01_IMAGES = [
  "ai-img1.webp",
  "hotel-img.webp",
  "team-image.webp",
  "headphone-img8.webp",
  "hacks-watch.webp",
  "imagination.webp",
]

const BLOG_03_IMAGES = ["team-1.webp", "team-2.webp", "team-3.webp"]

const BLOG_04_IMAGES = [
  "food.webp",
  "food11.webp",
  "food22.webp",
  "food33.webp",
  "food44.webp",
  "food55.webp",
]

const BLOG_07_IMAGES = [
  "imagination.webp",
  "hacks-watch.webp",
  "prediction.webp",
  "team-image.webp",
]

const BLOG_08_IMAGES = [
  "imagination.webp",
  "hacks-watch.webp",
  "prediction.webp",
  "food.webp",
  "food11.webp",
  "food22.webp",
]

const BLOG_09_IMAGES = [
  "imagination.webp",
  "hacks-watch.webp",
  "prediction.webp",
  "food.webp",
]

/** Hero marketing block: `hero.tsx` + local webp/svg assets shipped with the demo. */
function marketingHeroBlock(
  slug,
  description,
  images,
  registryDependencies = ["button"]
) {
  return {
    name: slug,
    type: "registry:block",
    title: slug,
    description,
    cssVars: SOFT_SURFACE_CSS_VARS,
    registryDependencies,
    files: [
      {
        path: `registry/blocks/marketing/hero/${slug}/hero.tsx`,
        type: "registry:component",
        target: `components/blocks/marketing/${slug}/hero.tsx`,
      },
      ...images.map((file) => ({
        path: `registry/blocks/marketing/hero/${slug}/images/${file}`,
        type: "registry:file",
        target: `components/blocks/marketing/${slug}/images/${file}`,
      })),
    ],
  }
}

const TEAM_PORTRAITS_6 = [
  "team-01.webp",
  "team-02.webp",
  "team-03.webp",
  "team-04.webp",
  "team-05.webp",
  "team-06.webp",
]

/** Brand icons for forms blocks (`@/registry/icons/*` → block-local `icons/`). */
function formsBlockIconFiles(slug, icons) {
  return icons.flatMap((name) => [
    {
      path: `registry/icons/${name}.tsx`,
      type: "registry:component",
      target: `components/blocks/forms/${slug}/icons/${name}.tsx`,
    },
    {
      path: `registry/icons/${name}.svg`,
      type: "registry:file",
      target: `components/blocks/forms/${slug}/icons/${name}.svg`,
    },
  ])
}

const megaMenu05ToolIcons = [
  "project-boards",
  "adobe-xd",
  "canva",
  "sketch",
  "photoshop",
  "github",
  "google-meet",
  "slack",
  "microsoft-teams",
  "discord",
  "asana",
  "dropbox",
]

/** @type {RegistryItemDef[]} */
const registryItemsRaw = [
  {
    name: "accordion",
    type: "registry:ui",
    title: "Accordion",
    description:
      "A vertically stacked set of interactive headings that reveal content.",
    dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/accordion.tsx",
        type: "registry:ui",
        target: "components/ui/accordion.tsx",
      },
    ],
  },
  {
    name: "alert",
    type: "registry:ui",
    title: "Alert",
    description:
      "Displays a callout for important messages with optional icon and description.",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/alert.tsx",
        type: "registry:ui",
        target: "components/ui/alert.tsx",
      },
    ],
  },
  {
    name: "alert-dialog",
    type: "registry:ui",
    title: "Alert Dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    registryDependencies: ["button"],
    files: [
      {
        path: "packages/ui/src/components/alert-dialog.tsx",
        type: "registry:ui",
        target: "components/ui/alert-dialog.tsx",
      },
      {
        path: "packages/cli/templates/init/lib/direction.ts",
        type: "registry:lib",
        target: "lib/direction.ts",
      },
      {
        path: "packages/cli/templates/init/hooks/use-direction.tsx",
        type: "registry:lib",
        target: "hooks/use-direction.tsx",
      },
    ],
  },
  {
    name: "avatar",
    type: "registry:ui",
    title: "Avatar",
    description:
      "An image element with a fallback for representing the user.",
    dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/avatar.tsx",
        type: "registry:ui",
        target: "components/ui/avatar.tsx",
      },
    ],
  },
  {
    name: "badge",
    type: "registry:ui",
    title: "Badge",
    description:
      "Small status labels for counts, categories, and inline metadata.",
    dependencies: [
      "radix-ui",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "packages/ui/src/components/badge.tsx",
        type: "registry:ui",
        target: "components/ui/badge.tsx",
      },
    ],
  },
  {
    name: "breadcrumb",
    type: "registry:ui",
    title: "Breadcrumb",
    description:
      "Displays the path to the current resource using a hierarchy of links.",
    dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/breadcrumb.tsx",
        type: "registry:ui",
        target: "components/ui/breadcrumb.tsx",
      },
    ],
  },
  {
    name: "bubble",
    type: "registry:ui",
    title: "Bubble",
    description:
      "Displays conversational content in a message bubble with variants, alignment, and reactions.",
    dependencies: [
      "radix-ui",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "packages/ui/src/components/bubble.tsx",
        type: "registry:ui",
        target: "components/ui/bubble.tsx",
      },
    ],
  },
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    dependencies: [
      "radix-ui",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "packages/ui/src/components/button.tsx",
        type: "registry:ui",
        target: "components/ui/button.tsx",
      },
    ],
  },
  {
    name: "card",
    type: "registry:ui",
    title: "Card",
    description: "Displays a card with header, content, and footer.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/card.tsx",
        type: "registry:ui",
        target: "components/ui/card.tsx",
      },
    ],
  },
  {
    name: "carousel",
    type: "registry:ui",
    title: "Carousel",
    description: "A carousel with motion and swipe built using Embla.",
    dependencies: [
      "embla-carousel-react",
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
    registryDependencies: ["button"],
    files: [
      {
        path: "packages/ui/src/components/carousel.tsx",
        type: "registry:ui",
        target: "components/ui/carousel.tsx",
      },
    ],
  },
  {
    name: "checkbox",
    type: "registry:ui",
    title: "Checkbox",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/checkbox.tsx",
        type: "registry:ui",
        target: "components/ui/checkbox.tsx",
      },
    ],
  },
  {
    name: "collapsible",
    type: "registry:ui",
    title: "Collapsible",
    description:
      "An interactive component which expands and collapses a panel.",
    dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/collapsible.tsx",
        type: "registry:ui",
        target: "components/ui/collapsible.tsx",
      },
    ],
  },
  {
    name: "combobox",
    type: "registry:ui",
    title: "Combobox",
    description: "Autocomplete input with a list of suggestions.",
    dependencies: [
      "@base-ui/react",
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
    registryDependencies: ["button", "input-group"],
    files: [
      {
        path: "packages/ui/src/components/combobox.tsx",
        type: "registry:ui",
        target: "components/ui/combobox.tsx",
      },
    ],
  },
  {
    name: "command",
    type: "registry:ui",
    title: "Command",
    description: "Command menu for search and quick actions.",
    dependencies: ["cmdk", "lucide-react", "clsx", "tailwind-merge"],
    registryDependencies: ["dialog", "input-group"],
    files: [
      {
        path: "packages/ui/src/components/command.tsx",
        type: "registry:ui",
        target: "components/ui/command.tsx",
      },
    ],
  },
  {
    name: "context-menu",
    type: "registry:ui",
    title: "Context Menu",
    description:
      "Displays a menu of actions or options when the user right-clicks an element.",
    dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/context-menu.tsx",
        type: "registry:ui",
        target: "components/ui/context-menu.tsx",
      },
    ],
  },
  {
    name: "dialog",
    type: "registry:ui",
    title: "Dialog",
    description:
      "A window overlaid on the primary content for critical information or actions.",
    dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    registryDependencies: ["button"],
    files: [
      {
        path: "packages/ui/src/components/dialog.tsx",
        type: "registry:ui",
        target: "components/ui/dialog.tsx",
      },
    ],
  },
  {
    name: "drawer",
    type: "registry:ui",
    title: "Drawer",
    description:
      "A panel that slides in from an edge. Prefer direction start/end for RTL-safe sides.",
    dependencies: ["vaul", "sonner", "clsx", "tailwind-merge"],
    // sonner: docs Basic example uses toast(); ships Toaster for layout.
    registryDependencies: ["sonner"],
    files: [
      {
        path: "packages/ui/src/components/drawer.tsx",
        type: "registry:ui",
        target: "components/ui/drawer.tsx",
      },
      {
        path: "packages/cli/templates/init/lib/direction.ts",
        type: "registry:lib",
        target: "lib/direction.ts",
      },
      {
        path: "packages/cli/templates/init/hooks/use-direction.tsx",
        type: "registry:lib",
        target: "hooks/use-direction.tsx",
      },
      {
        path: "packages/ui/src/hooks/use-mobile.ts",
        type: "registry:lib",
        target: "hooks/use-mobile.ts",
      },
    ],
  },
  {
    name: "dropdown-menu",
    type: "registry:ui",
    title: "Dropdown Menu",
    description:
      "Displays a menu of actions triggered by a button — shortcuts, submenus, checkboxes, and radios.",
    dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/dropdown-menu.tsx",
        type: "registry:ui",
        target: "components/ui/dropdown-menu.tsx",
      },
    ],
  },
  {
    name: "empty",
    type: "registry:ui",
    title: "Empty",
    description: "Use to display an empty state when there is no data yet.",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/empty.tsx",
        type: "registry:ui",
        target: "components/ui/empty.tsx",
      },
    ],
  },
  {
    name: "field",
    type: "registry:ui",
    title: "Field",
    description:
      "Combine labels, controls, and help text into accessible form fields.",
    dependencies: [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    registryDependencies: ["label", "separator"],
    files: [
      {
        path: "packages/ui/src/components/field.tsx",
        type: "registry:ui",
        target: "components/ui/field.tsx",
      },
    ],
  },
  {
    name: "hover-card",
    type: "registry:ui",
    title: "Hover Card",
    description:
      "For sighted users to preview content available behind a link.",
    dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/hover-card.tsx",
        type: "registry:ui",
        target: "components/ui/hover-card.tsx",
      },
    ],
  },
  {
    name: "input",
    type: "registry:ui",
    title: "Input",
    description:
      "Displays a form input field or a component that looks like an input field.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/input.tsx",
        type: "registry:ui",
        target: "components/ui/input.tsx",
      },
    ],
  },
  {
    name: "textarea",
    type: "registry:ui",
    title: "Textarea",
    description:
      "Displays a form textarea or a component that looks like a textarea.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/textarea.tsx",
        type: "registry:ui",
        target: "components/ui/textarea.tsx",
      },
    ],
  },
  {
    name: "table",
    type: "registry:ui",
    title: "Table",
    description:
      "A responsive table for displaying tabular data. Pair with TanStack Table for sorting, filtering, and pagination.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/table.tsx",
        type: "registry:ui",
        target: "components/ui/table.tsx",
      },
    ],
  },
  {
    name: "input-group",
    type: "registry:ui",
    title: "Input Group",
    description:
      "Display additional information or actions to an input or textarea.",
    dependencies: [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    registryDependencies: ["button", "input", "textarea"],
    files: [
      {
        path: "packages/ui/src/components/input-group.tsx",
        type: "registry:ui",
        target: "components/ui/input-group.tsx",
      },
    ],
  },
  {
    name: "input-otp",
    type: "registry:ui",
    title: "Input OTP",
    description:
      "Accessible one-time password component with copy-paste functionality.",
    dependencies: ["input-otp", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/input-otp.tsx",
        type: "registry:ui",
        target: "components/ui/input-otp.tsx",
      },
    ],
  },
  {
    name: "item",
    type: "registry:ui",
    title: "Item",
    description:
      "A versatile component for displaying content with media, title, description, and actions.",
    dependencies: [
      "class-variance-authority",
      "radix-ui",
      "clsx",
      "tailwind-merge",
    ],
    registryDependencies: ["separator"],
    files: [
      {
        path: "packages/ui/src/components/item.tsx",
        type: "registry:ui",
        target: "components/ui/item.tsx",
      },
    ],
  },
  {
    name: "kbd",
    type: "registry:ui",
    title: "Kbd",
    description: "Used to display textual user input from keyboard.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/kbd.tsx",
        type: "registry:ui",
        target: "components/ui/kbd.tsx",
      },
    ],
  },
  {
    name: "marker",
    type: "registry:ui",
    title: "Marker",
    description:
      "Displays an inline status, system note, bordered row, or labeled separator in a conversation.",
    dependencies: [
      "class-variance-authority",
      "radix-ui",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "packages/ui/src/components/marker.tsx",
        type: "registry:ui",
        target: "components/ui/marker.tsx",
      },
    ],
  },
  {
    name: "menubar",
    type: "registry:ui",
    title: "Menubar",
    description:
      "A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.",
    dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/menubar.tsx",
        type: "registry:ui",
        target: "components/ui/menubar.tsx",
      },
    ],
  },
  {
    name: "message",
    type: "registry:ui",
    title: "Message",
    description:
      "Displays a message in a conversation, with optional avatar, header, footer, and alignment.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/message.tsx",
        type: "registry:ui",
        target: "components/ui/message.tsx",
      },
    ],
  },
  {
    name: "message-scroller",
    type: "registry:ui",
    title: "Message Scroller",
    description:
      "A chat scroll container that anchors turns, follows streamed responses, and jumps to any message.",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    registryDependencies: ["button"],
    files: [
      {
        path: "packages/ui/src/components/message-scroller.tsx",
        type: "registry:ui",
        target: "components/ui/message-scroller.tsx",
      },
    ],
  },
  {
    name: "native-select",
    type: "registry:ui",
    title: "Native Select",
    description:
      "A styled native HTML select element with consistent design system integration.",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/native-select.tsx",
        type: "registry:ui",
        target: "components/ui/native-select.tsx",
      },
    ],
  },
  {
    name: "navigation-menu",
    type: "registry:ui",
    title: "Navigation Menu",
    description: "A collection of links for navigating websites.",
    dependencies: [
      "radix-ui",
      "class-variance-authority",
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "packages/ui/src/components/navigation-menu.tsx",
        type: "registry:ui",
        target: "components/ui/navigation-menu.tsx",
      },
    ],
  },
  {
    name: "pagination",
    type: "registry:ui",
    title: "Pagination",
    description: "Pagination with page navigation, next and previous links.",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    registryDependencies: ["button"],
    files: [
      {
        path: "packages/ui/src/components/pagination.tsx",
        type: "registry:ui",
        target: "components/ui/pagination.tsx",
      },
    ],
  },
  {
    name: "code-block",
    type: "registry:ui",
    title: "Code Block",
    description:
      "Displays code, terminal output and diffs with an optional header, line numbers and a copy button.",
    dependencies: [
      "class-variance-authority",
      "lucide-react",
      "clsx",
      "tailwind-merge",
      "shiki",
    ],
    registryDependencies: ["button", "use-highlighted-code"],
    files: [
      {
        path: "packages/ui/src/components/code-block.tsx",
        type: "registry:ui",
        target: "components/ui/code-block.tsx",
      },
    ],
  },
  {
    name: "use-highlighted-code",
    type: "registry:hook",
    title: "useHighlightedCode",
    description:
      "Optional Shiki syntax highlighting for Code Block (streaming-friendly).",
    dependencies: ["shiki"],
    files: [
      {
        path: "packages/ui/src/hooks/use-highlighted-code.ts",
        type: "registry:hook",
        target: "hooks/use-highlighted-code.ts",
      },
      {
        path: "packages/ui/src/lib/highlighter.tsx",
        type: "registry:lib",
        target: "lib/highlighter.tsx",
      },
    ],
  },
  {
    name: "label",
    type: "registry:ui",
    title: "Label",
    description: "Renders an accessible label associated with controls.",
    dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/label.tsx",
        type: "registry:ui",
        target: "components/ui/label.tsx",
      },
    ],
  },
  {
    name: "button-group",
    type: "registry:ui",
    title: "Button Group",
    description:
      "A container that groups related buttons together with consistent styling.",
    dependencies: [
      "radix-ui",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    registryDependencies: ["separator"],
    files: [
      {
        path: "packages/ui/src/components/button-group.tsx",
        type: "registry:ui",
        target: "components/ui/button-group.tsx",
      },
    ],
  },
  {
    name: "calendar",
    type: "registry:ui",
    title: "Calendar",
    description:
      "A calendar component that allows users to select a date or a range of dates.",
    dependencies: [
      // v10 changes DayPicker classNames / dropdown DOM — keep on v9 with docs.
      "react-day-picker@^9.14.0",
      "date-fns",
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
    // popover: date-picker docs compose Calendar inside Popover — install with calendar
    registryDependencies: ["button", "popover"],
    files: [
      {
        path: "packages/ui/src/components/calendar.tsx",
        type: "registry:ui",
        target: "components/ui/calendar.tsx",
      },
    ],
  },
  {
    name: "popover",
    type: "registry:ui",
    title: "Popover",
    description: "Displays rich content in a portal, triggered by a button.",
    dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/popover.tsx",
        type: "registry:ui",
        target: "components/ui/popover.tsx",
      },
    ],
  },
  {
    name: "progress",
    type: "registry:ui",
    title: "Progress",
    description:
      "Displays an indicator showing the completion progress of a task.",
    dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/progress.tsx",
        type: "registry:ui",
        target: "components/ui/progress.tsx",
      },
    ],
  },
  {
    name: "radio-group",
    type: "registry:ui",
    title: "Radio Group",
    description:
      "A set of checkable buttons where only one can be selected at a time.",
    dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/radio-group.tsx",
        type: "registry:ui",
        target: "components/ui/radio-group.tsx",
      },
    ],
  },
  {
    name: "resizable",
    type: "registry:ui",
    title: "Resizable",
    description:
      "Accessible resizable panel groups and layouts with keyboard support.",
    dependencies: [
      "react-resizable-panels@^4",
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "packages/ui/src/components/resizable.tsx",
        type: "registry:ui",
        target: "components/ui/resizable.tsx",
      },
    ],
  },
  {
    name: "scroll-area",
    type: "registry:ui",
    title: "Scroll Area",
    description:
      "Augments native scroll functionality for custom, cross-browser styling.",
    dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/scroll-area.tsx",
        type: "registry:ui",
        target: "components/ui/scroll-area.tsx",
      },
    ],
  },
  {
    name: "select",
    type: "registry:ui",
    title: "Select",
    description:
      "Displays a list of options for the user to pick from—triggered by a button.",
    dependencies: ["radix-ui", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/select.tsx",
        type: "registry:ui",
        target: "components/ui/select.tsx",
      },
    ],
  },
  {
    name: "separator",
    type: "registry:ui",
    title: "Separator",
    description: "Visually or semantically separates content.",
    dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/separator.tsx",
        type: "registry:ui",
        target: "components/ui/separator.tsx",
      },
    ],
  },
  {
    name: "sheet",
    type: "registry:ui",
    title: "Sheet",
    description:
      "A panel that slides in from an edge. Prefer side start/end for RTL-safe edges.",
    dependencies: [
      "radix-ui",
      "lucide-react",
      "clsx",
      "tailwind-merge",
      "tw-animate-css",
    ],
    files: [
      {
        path: "packages/ui/src/components/sheet.tsx",
        type: "registry:ui",
        target: "components/ui/sheet.tsx",
      },
      {
        path: "packages/cli/templates/init/lib/direction.ts",
        type: "registry:lib",
        target: "lib/direction.ts",
      },
      {
        path: "packages/cli/templates/init/hooks/use-direction.tsx",
        type: "registry:lib",
        target: "hooks/use-direction.tsx",
      },
    ],
  },
  {
    name: "sidebar",
    type: "registry:ui",
    title: "Sidebar",
    description:
      "A composable application sidebar with mobile sheet, rail, and menu primitives.",
    dependencies: [
      "radix-ui",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
    ],
    registryDependencies: [
      "button",
      "input",
      "separator",
      "sheet",
      "skeleton",
      "tooltip",
    ],
    files: [
      {
        path: "packages/ui/src/components/sidebar.tsx",
        type: "registry:ui",
        target: "components/ui/sidebar.tsx",
      },
      {
        path: "packages/ui/src/hooks/use-mobile.ts",
        type: "registry:hook",
        target: "hooks/use-mobile.ts",
      },
    ],
  },
  {
    name: "skeleton",
    type: "registry:ui",
    title: "Skeleton",
    description: "Use to show a placeholder while content is loading.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/skeleton.tsx",
        type: "registry:ui",
        target: "components/ui/skeleton.tsx",
      },
    ],
  },
  {
    name: "slider",
    type: "registry:ui",
    title: "Slider",
    description:
      "An input where the user selects a value from within a given range.",
    dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/slider.tsx",
        type: "registry:ui",
        target: "components/ui/slider.tsx",
      },
    ],
  },
  {
    name: "switch",
    type: "registry:ui",
    title: "Switch",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/switch.tsx",
        type: "registry:ui",
        target: "components/ui/switch.tsx",
      },
    ],
  },
  {
    name: "tabs",
    type: "registry:ui",
    title: "Tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    dependencies: [
      "radix-ui",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "packages/ui/src/components/tabs.tsx",
        type: "registry:ui",
        target: "components/ui/tabs.tsx",
      },
    ],
  },
  {
    name: "sonner",
    type: "registry:ui",
    title: "Sonner",
    description: "Brief toast notifications for success, errors, and background work.",
    dependencies: ["sonner", "next-themes", "lucide-react"],
    files: [
      {
        path: "packages/ui/src/components/sonner.tsx",
        type: "registry:ui",
        target: "components/ui/sonner.tsx",
      },
      {
        path: "packages/cli/templates/init/lib/direction.ts",
        type: "registry:lib",
        target: "lib/direction.ts",
      },
      {
        path: "packages/cli/templates/init/hooks/use-direction.tsx",
        type: "registry:lib",
        target: "hooks/use-direction.tsx",
      },
    ],
  },
  {
    name: "toggle",
    type: "registry:ui",
    title: "Toggle",
    description: "A two-state button that can be either on or off.",
    dependencies: [
      "radix-ui",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "packages/ui/src/components/toggle.tsx",
        type: "registry:ui",
        target: "components/ui/toggle.tsx",
      },
    ],
  },
  {
    name: "toggle-group",
    type: "registry:ui",
    title: "Toggle Group",
    description: "A set of two-state buttons that can be toggled on or off.",
    dependencies: [
      "radix-ui",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    registryDependencies: ["toggle"],
    files: [
      {
        path: "packages/ui/src/components/toggle-group.tsx",
        type: "registry:ui",
        target: "components/ui/toggle-group.tsx",
      },
    ],
  },
  {
    name: "tooltip",
    type: "registry:ui",
    title: "Tooltip",
    description:
      "A popup that displays information related to an element when it receives focus or hover.",
    dependencies: ["radix-ui", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/tooltip.tsx",
        type: "registry:ui",
        target: "components/ui/tooltip.tsx",
      },
    ],
  },
  {
    name: "trace",
    type: "registry:ui",
    title: "Trace",
    description:
      "Rows for agent steps — reasoning, tool calls, sources, and plans.",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    registryDependencies: ["collapsible"],
    files: [
      {
        path: "packages/ui/src/components/trace.tsx",
        type: "registry:ui",
        target: "components/ui/trace.tsx",
      },
    ],
  },
  {
    name: "attachment",
    type: "registry:ui",
    title: "Attachment",
    description:
      "File and media attachment cards with upload states, sizes, and actions.",
    dependencies: [
      "radix-ui",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
    ],
    registryDependencies: ["button", "spinner"],
    files: [
      {
        path: "packages/ui/src/components/attachment.tsx",
        type: "registry:ui",
        target: "components/ui/attachment.tsx",
      },
    ],
  },
  {
    name: "spinner",
    type: "registry:ui",
    title: "Spinner",
    description: "A loading spinner.",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/spinner.tsx",
        type: "registry:ui",
        target: "components/ui/spinner.tsx",
      },
    ],
  },
  {
    name: "agent-run-timeline",
    type: "registry:block",
    title: "Agent Run Timeline",
    description:
      "A live plan for an agent run: step status, progress, and a review before it starts.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "collapsible", "kbd", "popover"],
    files: [
      {
        path: "registry/blocks/ai-agents/agent-run-timeline/agent-run-timeline.tsx",
        type: "registry:component",
        target: "components/blocks/agent-run-timeline.tsx",
      },
    ],
  },
  {
    name: "chat-composer-01",
    type: "registry:block",
    title: "chat-composer-01",
    description:
      "Hero chat composer - h-13 pill, voice toggle, audio affordance, attach menu, and Enter to send (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "dropdown-menu", "input-group"],
    files: [
      {
        path: "registry/blocks/ai-agents/chat-composer/chat-composer-01/chat-composer.tsx",
        type: "registry:component",
        target:
          "components/blocks/ai-agents/chat-composer-01/chat-composer.tsx",
      },
    ],
  },
  {
    name: "chat-composer-02",
    type: "registry:block",
    title: "chat-composer-02",
    description:
      "Chat composer with model select - MAX badge, prompt chips, image attach, and Enter to send (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "select", "textarea"],
    files: [
      {
        path: "registry/blocks/ai-agents/chat-composer/chat-composer-02/chat-composer.tsx",
        type: "registry:component",
        target:
          "components/blocks/ai-agents/chat-composer-02/chat-composer.tsx",
      },
    ],
  },
  {
    name: "chat-composer-03",
    type: "registry:block",
    title: "chat-composer-03",
    description:
      "Compact agent composer - attach/tools menu, Auto mode, Local/Cloud + agent + performance pills (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "dropdown-menu", "textarea"],
    files: [
      {
        path: "registry/blocks/ai-agents/chat-composer/chat-composer-03/chat-composer.tsx",
        type: "registry:component",
        target:
          "components/blocks/ai-agents/chat-composer-03/chat-composer.tsx",
      },
    ],
  },
  {
    name: "chat-composer-04",
    type: "registry:block",
    title: "chat-composer-04",
    description:
      "Prompt composer with drag-drop file attachments, settings switches, and action chips (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "badge",
      "button",
      "dropdown-menu",
      "label",
      "switch",
      "textarea",
    ],
    files: [
      {
        path: "registry/blocks/ai-agents/chat-composer/chat-composer-04/chat-composer.tsx",
        type: "registry:component",
        target:
          "components/blocks/ai-agents/chat-composer-04/chat-composer.tsx",
      },
    ],
  },
  {
    name: "ai-chat-01",
    type: "registry:block",
    title: "ai-chat-01",
    description:
      "Basic AI chat - message scroller, streaming replies, edit-resend, attach menu, and pill composer (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "bubble",
      "button",
      "dropdown-menu",
      "input-group",
      "message",
      "message-scroller",
      "textarea",
    ],
    files: [
      {
        path: "registry/blocks/ai-agents/ai-chat/ai-chat-01/ai-chat.tsx",
        type: "registry:component",
        target: "components/blocks/ai-agents/ai-chat-01/ai-chat.tsx",
      },
    ],
  },
  {
    name: "ai-chat-02",
    type: "registry:block",
    title: "ai-chat-02",
    description:
      "AI chat with model menu - intelligence levels, model submenu, growing textarea composer, and jump-to-latest (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "bubble",
      "button",
      "dropdown-menu",
      "input-group",
      "message",
      "message-scroller",
      "textarea",
    ],
    files: [
      {
        path: "registry/blocks/ai-agents/ai-chat/ai-chat-02/ai-chat.tsx",
        type: "registry:component",
        target: "components/blocks/ai-agents/ai-chat-02/ai-chat.tsx",
      },
    ],
  },
  {
    name: "ai-chat-03",
    type: "registry:block",
    title: "ai-chat-03",
    description:
      "Card assistant chat - online header, suggestion chips, typing state, and compact prompt footer (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "bubble",
      "button",
      "input-group",
      "message",
      "message-scroller",
    ],
    files: [
      {
        path: "registry/blocks/ai-agents/ai-chat/ai-chat-03/ai-chat.tsx",
        type: "registry:component",
        target: "components/blocks/ai-agents/ai-chat-03/ai-chat.tsx",
      },
    ],
  },
  {
    name: "agent-workspace-01",
    type: "registry:block",
    title: "agent-workspace-01",
    description:
      "Full chat application - sidebar threads, model picker, streaming conversation, composer stop/retry, and command search (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "avatar",
      "bubble",
      "button",
      "command",
      "dropdown-menu",
      "input-group",
      "kbd",
      "message",
      "message-scroller",
      "sidebar",
      "textarea",
    ],
    files: [
      {
        path: "registry/blocks/ai-agents/agent-workspace/agent-workspace-01/agent-workspace.tsx",
        type: "registry:component",
        target:
          "components/blocks/ai-agents/agent-workspace-01/agent-workspace.tsx",
      },
      {
        path: "registry/blocks/ai-agents/agent-workspace/agent-workspace-01/chat-sidebar.tsx",
        type: "registry:component",
        target:
          "components/blocks/ai-agents/agent-workspace-01/chat-sidebar.tsx",
      },
      {
        path: "registry/blocks/ai-agents/agent-workspace/agent-workspace-01/command-menu.tsx",
        type: "registry:component",
        target:
          "components/blocks/ai-agents/agent-workspace-01/command-menu.tsx",
      },
      {
        path: "registry/blocks/ai-agents/agent-workspace/agent-workspace-01/composer.tsx",
        type: "registry:component",
        target: "components/blocks/ai-agents/agent-workspace-01/composer.tsx",
      },
      {
        path: "registry/blocks/ai-agents/agent-workspace/agent-workspace-01/conversation.tsx",
        type: "registry:component",
        target:
          "components/blocks/ai-agents/agent-workspace-01/conversation.tsx",
      },
      {
        path: "registry/blocks/ai-agents/agent-workspace/agent-workspace-01/data.ts",
        type: "registry:file",
        target: "components/blocks/ai-agents/agent-workspace-01/data.ts",
      },
      {
        path: "registry/blocks/ai-agents/agent-workspace/agent-workspace-01/logos.tsx",
        type: "registry:component",
        target: "components/blocks/ai-agents/agent-workspace-01/logos.tsx",
      },
      {
        path: "registry/blocks/ai-agents/agent-workspace/agent-workspace-01/types.ts",
        type: "registry:file",
        target: "components/blocks/ai-agents/agent-workspace-01/types.ts",
      },
    ],
  },
  {
    name: "login-01",
    type: "registry:block",
    title: "login-01",
    description: "A minimal email and password sign-in, with Google and Apple.",
    registryDependencies: ["button", "input", "label", "separator"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-01/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-01/login-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-01/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-01/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-01/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-01/icons/apple.svg",
      },
    ],
  },
  {
    name: "login-02",
    type: "registry:block",
    title: "login-02",
    description:
      "Sign in with Google or Facebook, or with email. Includes remember me and password recovery.",
    registryDependencies: ["button", "checkbox", "input", "label", "separator"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-02/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-02/login-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-02/icons/google.tsx",
      },
      {
        path: "registry/icons/facebook.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-02/icons/facebook.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-02/icons/google.svg",
      },
      {
        path: "registry/icons/facebook.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-02/icons/facebook.svg",
      },
    ],
  },
  {
    name: "login-03",
    type: "registry:block",
    title: "login-03",
    description:
      "Email-first sign-in with a link, plus Google, Facebook, and X. No password.",
    registryDependencies: ["button", "input", "label", "separator"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-03/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-03/login-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-03/icons/google.tsx",
      },
      {
        path: "registry/icons/facebook.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-03/icons/facebook.tsx",
      },
      {
        path: "registry/icons/x.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-03/icons/x.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-03/icons/google.svg",
      },
      {
        path: "registry/icons/facebook.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-03/icons/facebook.svg",
      },
      {
        path: "registry/icons/x.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-03/icons/x.svg",
      },
    ],
  },
  {
    name: "login-04",
    type: "registry:block",
    title: "login-04",
    description:
      "Split sign-in: a rounded photo beside Google, Apple, or email and password.",
    registryDependencies: ["button", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-04/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-04/login-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-04/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-04/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-04/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-04/icons/apple.svg",
      },
      {
        path: "registry/blocks/authentication/login/login-04/images/01.webp",
        type: "registry:file",
        target: "components/blocks/authentication/login-04/images/01.webp",
      },
    ],
  },
  {
    name: "login-05",
    type: "registry:block",
    title: "login-05",
    description:
      "Sign-in with email and password, or Google and Apple, beside a quote on a photo.",
    registryDependencies: ["avatar", "button", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-05/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-05/login-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-05/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-05/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-05/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-05/icons/apple.svg",
      },
      {
        path: "registry/blocks/authentication/login/login-05/images/01.webp",
        type: "registry:file",
        target: "components/blocks/authentication/login-05/images/01.webp",
      },
      {
        path: "registry/blocks/authentication/login/login-05/images/02.webp",
        type: "registry:file",
        target: "components/blocks/authentication/login-05/images/02.webp",
      },
    ],
  },
  {
    name: "login-06",
    type: "registry:block",
    title: "login-06",
    description:
      "Dark workspace sign-in with email and password, plus Google and Apple.",
    registryDependencies: ["button", "input", "label", "separator"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-06/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-06/login-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-06/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-06/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-06/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-06/icons/apple.svg",
      },
    ],
  },
  {
    name: "login-07",
    type: "registry:block",
    title: "login-07",
    description:
      "Glass card sign-in over a full-bleed photo, with Google and Apple.",
    registryDependencies: ["button", "input", "label", "separator"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-07/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-07/login-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-07/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-07/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-07/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-07/icons/apple.svg",
      },
      {
        path: "registry/blocks/authentication/login/login-07/images/bg.webp",
        type: "registry:file",
        target: "components/blocks/authentication/login-07/images/bg.webp",
      },
    ],
  },
  {
    name: "login-08",
    type: "registry:block",
    title: "login-08",
    description:
      "Illustration beside email and password sign-in, with Google and Apple.",
    registryDependencies: ["button", "input", "label", "separator"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-08/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-08/login-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-08/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-08/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-08/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-08/icons/apple.svg",
      },
      {
        path: "registry/blocks/authentication/login/login-08/images/illustration.webp",
        type: "registry:file",
        target: "components/blocks/authentication/login-08/images/illustration.webp",
      },
    ],
  },
  {
    name: "login-09",
    type: "registry:block",
    title: "login-09",
    description:
      "SaaS workspace sign-in with product panel, checklist, Google, and Apple.",
    registryDependencies: ["button", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-09/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-09/login-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-09/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-09/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-09/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-09/icons/apple.svg",
      },
      {
        path: "registry/blocks/authentication/login/login-09/images/product.webp",
        type: "registry:file",
        target: "components/blocks/authentication/login-09/images/product.webp",
      },
    ],
  },
  {
    name: "login-10",
    type: "registry:block",
    title: "login-10",
    description:
      "Centered sign-in with brand mark above the card, remember me, and sign-up link.",
    registryDependencies: ["button", "checkbox", "input", "label"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-10/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-10/login-form.tsx",
      },
      {
        path: "registry/blocks/authentication/login/login-10/logo.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-10/logo.svg",
      },
    ],
  },
  {
    name: "login-11",
    type: "registry:block",
    title: "login-11",
    description:
      "Split sign-in with form card and illustration panel, remember me, and sign-up link.",
    registryDependencies: ["button", "checkbox", "input", "label"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-11/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-11/login-form.tsx",
      },
      {
        path: "registry/blocks/authentication/login/login-11/images/illustration.webp",
        type: "registry:file",
        target:
          "components/blocks/authentication/login-11/images/illustration.webp",
      },
    ],
  },
  {
    name: "login-12",
    type: "registry:block",
    title: "login-12",
    description:
      "Centered welcome-back card with password visibility toggle, remember me, and Google.",
    registryDependencies: ["button", "checkbox", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-12/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-12/login-form.tsx",
      },
      {
        path: "registry/blocks/authentication/login/login-12/logo.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-12/logo.svg",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-12/icons/google.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-12/icons/google.svg",
      },
    ],
  },
  {
    name: "login-13",
    type: "registry:block",
    title: "login-13",
    description:
      "Split card with form, password toggle, Google, and photo panel with overlay copy.",
    registryDependencies: ["button", "checkbox", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-13/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-13/login-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-13/icons/google.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-13/icons/google.svg",
      },
      {
        path: "registry/blocks/authentication/login/login-13/images/team.webp",
        type: "registry:file",
        target: "components/blocks/authentication/login-13/images/team.webp",
      },
      {
        path: "registry/blocks/authentication/login/login-13/logo.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-13/logo.svg",
      },
    ],
  },
  {
    name: "login-14",
    type: "registry:block",
    title: "login-14",
    description:
      "Bleed photo panel with welcome copy beside email sign-in, password toggle, and Google.",
    registryDependencies: ["button", "checkbox", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-14/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-14/login-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-14/icons/google.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-14/icons/google.svg",
      },
      {
        path: "registry/blocks/authentication/login/login-14/images/team.webp",
        type: "registry:file",
        target: "components/blocks/authentication/login-14/images/team.webp",
      },
    ],
  },
  {
    name: "login-15",
    type: "registry:block",
    title: "login-15",
    description:
      "Branded card with illustration beside email sign-in, password toggle, and Google.",
    registryDependencies: ["button", "checkbox", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-15/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-15/login-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-15/icons/google.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-15/icons/google.svg",
      },
      {
        path: "registry/blocks/authentication/login/login-15/images/signin.webp",
        type: "registry:file",
        target: "components/blocks/authentication/login-15/images/signin.webp",
      },
      {
        path: "registry/blocks/authentication/login/login-15/logo.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-15/logo.svg",
      },
    ],
  },
  {
    name: "login-16",
    type: "registry:block",
    title: "login-16",
    description:
      "Gradient marketing panel with floating sign-in card, password toggle, Google, and Apple.",
    registryDependencies: ["button", "checkbox", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/login/login-16/login-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-16/login-form.tsx",
      },
      {
        path: "registry/blocks/authentication/login/login-16/logo-white.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-16/logo-white.svg",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-16/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/login-16/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-16/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/login-16/icons/apple.svg",
      },
    ],
  },
  {
    name: "signup-01",
    type: "registry:block",
    title: "signup-01",
    description: "Minimal name, email, and password sign-up.",
    registryDependencies: ["button", "input", "label"],
    files: [
      {
        path: "registry/blocks/authentication/signup/signup-01/signup-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-01/signup-form.tsx",
      },
    ],
  },
  {
    name: "signup-02",
    type: "registry:block",
    title: "signup-02",
    description:
      "Sign-up with Google or GitHub, or with email and password.",
    registryDependencies: ["button", "input", "label", "separator"],
    files: [
      {
        path: "registry/blocks/authentication/signup/signup-02/signup-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-02/signup-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-02/icons/google.tsx",
      },
      {
        path: "registry/icons/github.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-02/icons/github.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/signup-02/icons/google.svg",
      },
      {
        path: "registry/icons/github.svg",
        type: "registry:file",
        target: "components/blocks/authentication/signup-02/icons/github.svg",
      },
    ],
  },
  {
    name: "signup-03",
    type: "registry:block",
    title: "signup-03",
    description:
      "Split sign-up: a rounded photo beside Google, Apple, or first name, last name, email, and password.",
    registryDependencies: ["button", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/signup/signup-03/signup-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-03/signup-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-03/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-03/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/signup-03/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/signup-03/icons/apple.svg",
      },
      {
        path: "registry/blocks/authentication/signup/signup-03/images/01.webp",
        type: "registry:file",
        target: "components/blocks/authentication/signup-03/images/01.webp",
      },
    ],
  },
  {
    name: "signup-04",
    type: "registry:block",
    title: "signup-04",
    description:
      "Email-first sign-up with Google and Apple, beside a branded panel.",
    registryDependencies: ["button", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/signup/signup-04/signup-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-04/signup-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-04/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-04/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/signup-04/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/signup-04/icons/apple.svg",
      },
    ],
  },
  {
    name: "signup-05",
    type: "registry:block",
    title: "signup-05",
    description:
      "Sign-up with name, email, and password, or Google and Apple, beside a quote on a photo.",
    registryDependencies: ["avatar", "button", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/signup/signup-05/signup-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-05/signup-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-05/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-05/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/signup-05/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/signup-05/icons/apple.svg",
      },
      {
        path: "registry/blocks/authentication/signup/signup-05/images/01.webp",
        type: "registry:file",
        target: "components/blocks/authentication/signup-05/images/01.webp",
      },
      {
        path: "registry/blocks/authentication/signup/signup-05/images/02.webp",
        type: "registry:file",
        target: "components/blocks/authentication/signup-05/images/02.webp",
      },
    ],
  },
  {
    name: "signup-06",
    type: "registry:block",
    title: "signup-06",
    description: "Dark full-bleed sign-up with Google and Apple.",
    registryDependencies: ["button", "input", "label", "separator"],
    files: [
      {
        path: "registry/blocks/authentication/signup/signup-06/signup-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-06/signup-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-06/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-06/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/signup-06/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/signup-06/icons/apple.svg",
      },
    ],
  },
  {
    name: "signup-07",
    type: "registry:block",
    title: "signup-07",
    description: "Multi-step sign-up: account, profile, then done.",
    registryDependencies: ["button", "input", "label"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/signup/signup-07/signup-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-07/signup-form.tsx",
      },
    ],
  },
  {
    name: "signup-08",
    type: "registry:block",
    title: "signup-08",
    description:
      "SaaS workspace sign-up with company fields, Google and Apple, and a product column.",
    registryDependencies: ["button", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/signup/signup-08/signup-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-08/signup-form.tsx",
      },
      {
        path: "registry/icons/google.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-08/icons/google.tsx",
      },
      {
        path: "registry/icons/apple.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/signup-08/icons/apple.tsx",
      },
      {
        path: "registry/icons/google.svg",
        type: "registry:file",
        target: "components/blocks/authentication/signup-08/icons/google.svg",
      },
      {
        path: "registry/icons/apple.svg",
        type: "registry:file",
        target: "components/blocks/authentication/signup-08/icons/apple.svg",
      },
      {
        path: "registry/blocks/authentication/signup/signup-08/images/product.webp",
        type: "registry:file",
        target: "components/blocks/authentication/signup-08/images/product.webp",
      },
    ],
  },
  {
    name: "forgot-password-01",
    type: "registry:block",
    title: "forgot-password-01",
    description: "Minimal forgot password: email and send recovery link.",
    registryDependencies: ["button", "input", "label"],
    files: [
      {
        path: "registry/blocks/authentication/forgot-password/forgot-password-01/forgot-password-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/forgot-password-01/forgot-password-form.tsx",
      },
    ],
  },
  {
    name: "forgot-password-02",
    type: "registry:block",
    title: "forgot-password-02",
    description:
      "Split forgot password: recovery form beside a large key icon panel.",
    registryDependencies: ["button", "input", "label"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/forgot-password/forgot-password-02/forgot-password-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/forgot-password-02/forgot-password-form.tsx",
      },
    ],
  },
  {
    name: "forgot-password-03",
    type: "registry:block",
    title: "forgot-password-03",
    description: "OTP recovery: enter the 6-digit verification code.",
    registryDependencies: ["button", "input-otp", "label"],
    dependencies: ["input-otp"],
    files: [
      {
        path: "registry/blocks/authentication/forgot-password/forgot-password-03/forgot-password-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/forgot-password-03/forgot-password-form.tsx",
      },
    ],
  },
  {
    name: "forgot-password-04",
    type: "registry:block",
    title: "forgot-password-04",
    description:
      "Multi-step recovery: email, verification code, then new password.",
    registryDependencies: ["button", "input", "input-otp", "label"],
    dependencies: ["input-otp", "lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/forgot-password/forgot-password-04/forgot-password-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/forgot-password-04/forgot-password-form.tsx",
      },
    ],
  },
  {
    name: "reset-password-01",
    type: "registry:block",
    title: "reset-password-01",
    description: "Minimal reset password: new password and confirm.",
    registryDependencies: ["button", "input", "label"],
    files: [
      {
        path: "registry/blocks/authentication/reset-password/reset-password-01/reset-password-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/reset-password-01/reset-password-form.tsx",
      },
    ],
  },
  {
    name: "reset-password-02",
    type: "registry:block",
    title: "reset-password-02",
    description: "Reset password with a visible strength meter.",
    registryDependencies: ["button", "input", "label"],
    files: [
      {
        path: "registry/blocks/authentication/reset-password/reset-password-02/reset-password-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/reset-password-02/reset-password-form.tsx",
      },
    ],
  },
  {
    name: "reset-password-03",
    type: "registry:block",
    title: "reset-password-03",
    description:
      "Split reset password: form beside a large key icon panel.",
    registryDependencies: ["button", "input", "label"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/reset-password/reset-password-03/reset-password-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/reset-password-03/reset-password-form.tsx",
      },
    ],
  },
  {
    name: "reset-password-04",
    type: "registry:block",
    title: "reset-password-04",
    description: "Password reset success confirmation card.",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/reset-password/reset-password-04/reset-password-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/reset-password-04/reset-password-form.tsx",
      },
    ],
  },
  {
    name: "otp-verification-01",
    type: "registry:block",
    title: "otp-verification-01",
    description: "Centered 6-digit OTP verification.",
    registryDependencies: ["button", "input-otp", "label"],
    dependencies: ["input-otp"],
    files: [
      {
        path: "registry/blocks/authentication/otp-verification/otp-verification-01/otp-verification-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/otp-verification-01/otp-verification-form.tsx",
      },
    ],
  },
  {
    name: "otp-verification-02",
    type: "registry:block",
    title: "otp-verification-02",
    description: "OTP verification with auto-focus on the first slot.",
    registryDependencies: ["button", "input-otp", "label"],
    dependencies: ["input-otp"],
    files: [
      {
        path: "registry/blocks/authentication/otp-verification/otp-verification-02/otp-verification-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/otp-verification-02/otp-verification-form.tsx",
      },
    ],
  },
  {
    name: "otp-verification-03",
    type: "registry:block",
    title: "otp-verification-03",
    description: "Email verification with a 6-digit OTP.",
    registryDependencies: ["button", "input-otp", "label"],
    dependencies: ["input-otp"],
    files: [
      {
        path: "registry/blocks/authentication/otp-verification/otp-verification-03/otp-verification-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/otp-verification-03/otp-verification-form.tsx",
      },
    ],
  },
  {
    name: "otp-verification-04",
    type: "registry:block",
    title: "otp-verification-04",
    description: "Phone verification with a 6-digit OTP.",
    registryDependencies: ["button", "input-otp", "label"],
    dependencies: ["input-otp"],
    files: [
      {
        path: "registry/blocks/authentication/otp-verification/otp-verification-04/otp-verification-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/otp-verification-04/otp-verification-form.tsx",
      },
    ],
  },
  {
    name: "two-factor-01",
    type: "registry:block",
    title: "two-factor-01",
    description: "Authenticator app 2FA challenge.",
    registryDependencies: ["button", "input-otp", "label"],
    dependencies: ["input-otp", "lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/two-factor/two-factor-01/two-factor-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/two-factor-01/two-factor-form.tsx",
      },
    ],
  },
  {
    name: "two-factor-02",
    type: "registry:block",
    title: "two-factor-02",
    description: "SMS 2FA challenge with a 6-digit code.",
    registryDependencies: ["button", "input-otp", "label"],
    dependencies: ["input-otp", "lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/two-factor/two-factor-02/two-factor-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/two-factor-02/two-factor-form.tsx",
      },
    ],
  },
  {
    name: "two-factor-03",
    type: "registry:block",
    title: "two-factor-03",
    description: "Backup code 2FA challenge.",
    registryDependencies: ["button", "input", "label"],
    files: [
      {
        path: "registry/blocks/authentication/two-factor/two-factor-03/two-factor-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/two-factor-03/two-factor-form.tsx",
      },
    ],
  },
  {
    name: "two-factor-04",
    type: "registry:block",
    title: "two-factor-04",
    description: "Choose a 2FA method: authenticator, SMS, or backup code.",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/two-factor/two-factor-04/two-factor-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/two-factor-04/two-factor-form.tsx",
      },
    ],
  },
  {
    name: "social-login-01",
    type: "registry:block",
    title: "social-login-01",
    description: "Social-only sign-in with labeled provider buttons.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/authentication/social-login/social-login-01/social-login-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/social-login-01/social-login-form.tsx",
      },
      ...authSocialIconFiles("social-login-01", [
        "google",
        "apple",
        "github",
        "facebook",
      ]),
    ],
  },
  {
    name: "social-login-02",
    type: "registry:block",
    title: "social-login-02",
    description: "Social providers plus email magic link.",
    registryDependencies: ["button", "input", "label", "separator"],
    files: [
      {
        path: "registry/blocks/authentication/social-login/social-login-02/social-login-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/social-login-02/social-login-form.tsx",
      },
      ...authSocialIconFiles("social-login-02", ["google", "apple"]),
    ],
  },
  {
    name: "social-login-03",
    type: "registry:block",
    title: "social-login-03",
    description: "Compact social sign-in with icon-only provider buttons.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/authentication/social-login/social-login-03/social-login-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/social-login-03/social-login-form.tsx",
      },
      ...authSocialIconFiles("social-login-03", [
        "google",
        "apple",
        "github",
        "facebook",
        "x",
      ]),
    ],
  },
  {
    name: "social-login-04",
    type: "registry:block",
    title: "social-login-04",
    description:
      "Split social sign-in: providers beside a large users icon panel.",
    registryDependencies: ["button", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/social-login/social-login-04/social-login-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/social-login-04/social-login-form.tsx",
      },
      ...authSocialIconFiles("social-login-04", ["google", "apple"]),
    ],
  },
  {
    name: "passkey-01",
    type: "registry:block",
    title: "passkey-01",
    description: "Passkey-first sign-in.",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/passkey/passkey-01/passkey-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/passkey-01/passkey-form.tsx",
      },
    ],
  },
  {
    name: "passkey-02",
    type: "registry:block",
    title: "passkey-02",
    description: "Passkey sign-in with password fallback.",
    registryDependencies: ["button", "input", "label", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/passkey/passkey-02/passkey-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/passkey-02/passkey-form.tsx",
      },
    ],
  },
  {
    name: "passkey-03",
    type: "registry:block",
    title: "passkey-03",
    description: "Passkey setup / registration steps.",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/authentication/passkey/passkey-03/passkey-form.tsx",
        type: "registry:component",
        target: "components/blocks/authentication/passkey-03/passkey-form.tsx",
      },
    ],
  },
  {
    name: "account-recovery-01",
    type: "registry:block",
    title: "account-recovery-01",
    description: "Recover account by email.",
    registryDependencies: ["button", "input", "label"],
    files: [
      {
        path: "registry/blocks/authentication/account-recovery/account-recovery-01/account-recovery-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/account-recovery-01/account-recovery-form.tsx",
      },
    ],
  },
  {
    name: "account-recovery-02",
    type: "registry:block",
    title: "account-recovery-02",
    description: "Recover account by phone with country dial code.",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "button",
      "input",
      "input-group",
      "label",
      "popover",
    ],
    files: [
      {
        path: "registry/blocks/authentication/account-recovery/account-recovery-02/account-recovery-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/account-recovery-02/account-recovery-form.tsx",
      },
    ],
  },
  {
    name: "account-recovery-03",
    type: "registry:block",
    title: "account-recovery-03",
    description: "Recover account by verifying identity details.",
    dependencies: ["date-fns", "lucide-react"],
    registryDependencies: [
      "button",
      "calendar",
      "input",
      "label",
      "popover",
    ],
    files: [
      {
        path: "registry/blocks/authentication/account-recovery/account-recovery-03/account-recovery-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/account-recovery-03/account-recovery-form.tsx",
      },
    ],
  },
  {
    name: "account-recovery-04",
    type: "registry:block",
    title: "account-recovery-04",
    description: "Recover account with a one-time recovery code.",
    registryDependencies: ["button", "input", "label"],
    files: [
      {
        path: "registry/blocks/authentication/account-recovery/account-recovery-04/account-recovery-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/authentication/account-recovery-04/account-recovery-form.tsx",
      },
    ],
  },
  {
    name: "banner-01",
    type: "registry:block",
    title: "banner-01",
    description:
      "Violet-to-orange gradient strip for free shipping and first-purchase deal.",
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-01/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-01/banner.tsx",
      },
    ],
  },
  {
    name: "banner-02",
    type: "registry:block",
    title: "banner-02",
    description: "Dark gray full-width promo strip with the same deal copy.",
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-02/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-02/banner.tsx",
      },
    ],
  },
  {
    name: "banner-03",
    type: "registry:block",
    title: "banner-03",
    description:
      "Violet-to-orange action strip with Claim Offer CTA and dismiss.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-03/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-03/banner.tsx",
      },
    ],
  },
  {
    name: "banner-04",
    type: "registry:block",
    title: "banner-04",
    description: "Dark action strip with Claim Offer CTA and dismiss.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-04/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-04/banner.tsx",
      },
    ],
  },
  {
    name: "banner-05",
    type: "registry:block",
    title: "banner-05",
    description:
      "Rounded violet-to-orange ticket promo pill with underlined CTA and arrow.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-05/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-05/banner.tsx",
      },
    ],
  },
  {
    name: "banner-06",
    type: "registry:block",
    title: "banner-06",
    description: "Dark ticket promo pill with underlined CTA and arrow.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-06/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-06/banner.tsx",
      },
    ],
  },
  {
    name: "banner-07",
    type: "registry:block",
    title: "banner-07",
    description:
      "Blue-to-purple strip with free shipping, discount, and promo code.",
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-07/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-07/banner.tsx",
      },
    ],
  },
  {
    name: "banner-08",
    type: "registry:block",
    title: "banner-08",
    description: "Indigo-to-white launch-offer strip with pill tag.",
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-08/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-08/banner.tsx",
      },
    ],
  },
  {
    name: "banner-09",
    type: "registry:block",
    title: "banner-09",
    description: "Lime-to-white strip with green New tag.",
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-09/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-09/banner.tsx",
      },
    ],
  },
  {
    name: "banner-10",
    type: "registry:block",
    title: "banner-10",
    description: "Orange gradient strip with Check it out pill CTA.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-10/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-10/banner.tsx",
      },
    ],
  },
  {
    name: "banner-11",
    type: "registry:block",
    title: "banner-11",
    description: "Purple full-width explore link with hover pill.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-11/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-11/banner.tsx",
      },
    ],
  },
  {
    name: "banner-12",
    type: "registry:block",
    title: "banner-12",
    description: "Violet-to-lavender strip with Explore now CTA.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-12/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-12/banner.tsx",
      },
    ],
  },
  {
    name: "banner-13",
    type: "registry:block",
    title: "banner-13",
    description:
      "Lime limited-time deals strip with static D/H/M/S countdown and checkout link.",
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-13/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-13/banner.tsx",
      },
    ],
  },
  {
    name: "banner-14",
    type: "registry:block",
    title: "banner-14",
    description: "Dark financing offer strip with Shop now link.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-14/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-14/banner.tsx",
      },
    ],
  },
  {
    name: "banner-15",
    type: "registry:block",
    title: "banner-15",
    description: "Dark free-shipping bar with sparkles and promo code.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/banner/banner-15/banner.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/banner-15/banner.tsx",
      },
    ],
  },
  {
    name: "cookie-consent-01",
    type: "registry:block",
    title: "cookie-consent-01",
    description:
      "Bottom floating cookie card — Accept / Reject / Manage with preference checkboxes (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["badge", "button", "checkbox", "label"],
    files: [
      {
        path: "registry/blocks/marketing/cookie-consent/cookie-consent-01/cookie-consent.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cookie-consent-01/cookie-consent.tsx",
      },
    ],
  },
  {
    name: "cookie-consent-02",
    type: "registry:block",
    title: "cookie-consent-02",
    description:
      "Full-width bottom cookie strip — Accept all / Reject all / Customize with prefs panel (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["badge", "button", "checkbox", "label"],
    files: [
      {
        path: "registry/blocks/marketing/cookie-consent/cookie-consent-02/cookie-consent.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cookie-consent-02/cookie-consent.tsx",
      },
    ],
  },
  {
    name: "cookie-consent-03",
    type: "registry:block",
    title: "cookie-consent-03",
    description:
      "Center cookie modal with backdrop — Accept all / Reject all / Customize with Switch categories (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "label", "switch"],
    files: [
      {
        path: "registry/blocks/marketing/cookie-consent/cookie-consent-03/cookie-consent.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cookie-consent-03/cookie-consent.tsx",
      },
    ],
  },
  {
    name: "cookie-consent-04",
    type: "registry:block",
    title: "cookie-consent-04",
    description:
      "Dark bottom-end corner cookie card — Accept / Reject / Preferences with Switch toggles (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "label", "switch"],
    files: [
      {
        path: "registry/blocks/marketing/cookie-consent/cookie-consent-04/cookie-consent.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cookie-consent-04/cookie-consent.tsx",
      },
    ],
  },
  {
    name: "jumbotron-01",
    type: "registry:block",
    title: "jumbotron-01",
    description:
      "White promotional card with headline, body copy, shadow-soft, and a primary CTA.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/jumbotron/jumbotron-01/jumbotron.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/jumbotron-01/jumbotron.tsx",
      },
    ],
  },
  {
    name: "jumbotron-02",
    type: "registry:block",
    title: "jumbotron-02",
    description:
      "Split jumbotron with copy, CTA, and a cover image on the trailing side.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/jumbotron/jumbotron-02/jumbotron.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/jumbotron-02/jumbotron.tsx",
      },
      {
        path: "registry/blocks/marketing/jumbotron/jumbotron-02/images/card.webp",
        type: "registry:file",
        target: "components/blocks/marketing/jumbotron-02/images/card.webp",
      },
    ],
  },
  {
    name: "jumbotron-03",
    type: "registry:block",
    title: "jumbotron-03",
    description:
      "Dark split jumbotron with brand accent title, short copy, CTA, and team photo.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/jumbotron/jumbotron-03/jumbotron.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/jumbotron-03/jumbotron.tsx",
      },
      {
        path: "registry/blocks/marketing/jumbotron/jumbotron-03/images/team.webp",
        type: "registry:file",
        target: "components/blocks/marketing/jumbotron-03/images/team.webp",
      },
    ],
  },
  {
    name: "jumbotron-04",
    type: "registry:block",
    title: "jumbotron-04",
    description:
      "Centered photo-background jumbotron with dark overlay, short copy, and CTA.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/jumbotron/jumbotron-04/jumbotron.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/jumbotron-04/jumbotron.tsx",
      },
      {
        path: "registry/blocks/marketing/jumbotron/jumbotron-04/images/bg.webp",
        type: "registry:file",
        target: "components/blocks/marketing/jumbotron-04/images/bg.webp",
      },
    ],
  },
  {
    name: "jumbotron-05",
    type: "registry:block",
    title: "jumbotron-05",
    description:
      "Dark centered jumbotron with short copy and a primary CTA, no image.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/jumbotron/jumbotron-05/jumbotron.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/jumbotron-05/jumbotron.tsx",
      },
    ],
  },
  {
    name: "jumbotron-06",
    type: "registry:block",
    title: "jumbotron-06",
    description:
      "Hero card plus a two-up grid of dark and light support cards with CTAs.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/jumbotron/jumbotron-06/jumbotron.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/jumbotron-06/jumbotron.tsx",
      },
    ],
  },
  {
    name: "jumbotron-07",
    type: "registry:block",
    title: "jumbotron-07",
    description:
      "Centered text jumbotron with primary and outline CTAs, no card chrome.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/jumbotron/jumbotron-07/jumbotron.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/jumbotron-07/jumbotron.tsx",
      },
    ],
  },
  {
    name: "jumbotron-08",
    type: "registry:block",
    title: "jumbotron-08",
    description:
      "Start-edge accent bar on a light card with short copy and a primary CTA.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/jumbotron/jumbotron-08/jumbotron.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/jumbotron-08/jumbotron.tsx",
      },
    ],
  },
  {
    name: "features-01",
    type: "registry:block",
    title: "features-01",
    description:
      "Six feature cards in a responsive grid with icons and learn-more links.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/features/features-01/features.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/features-01/features.tsx",
      },
    ],
  },
  {
    name: "features-02",
    type: "registry:block",
    title: "features-02",
    description:
      "Primary full-bleed features band with centered hover cards.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/features/features-02/features.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/features-02/features.tsx",
      },
    ],
  },
  {
    name: "features-03",
    type: "registry:block",
    title: "features-03",
    description:
      "Muted CTA card beside a two-by-two features grid with primary icon chips.",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/features/features-03/features.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/features-03/features.tsx",
      },
    ],
  },
  {
    name: "features-04",
    type: "registry:block",
    title: "features-04",
    description:
      "Centered features grid with tinted icon chips for six product highlights.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/features/features-04/features.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/features-04/features.tsx",
      },
    ],
  },
  {
    name: "features-05",
    type: "registry:block",
    title: "features-05",
    description:
      "Feature cards with tinted icons and pill Explore actions.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/features/features-05/features.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/features-05/features.tsx",
      },
    ],
  },
  {
    name: "features-06",
    type: "registry:block",
    title: "features-06",
    description:
      "Split features layout with intro copy and a two-by-two muted card grid.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/features/features-06/features.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/features-06/features.tsx",
      },
    ],
  },
  {
    name: "features-07",
    type: "registry:block",
    title: "features-07",
    description:
      "Centered features intro with a three-column grid of muted cards and circular icons.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/features/features-07/features.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/features-07/features.tsx",
      },
    ],
  },
  {
    name: "features-08",
    type: "registry:block",
    title: "features-08",
    description:
      "Muted band features section with tinted icon chips, subtitles, and card dividers.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/features/features-08/features.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/features-08/features.tsx",
      },
    ],
  },
  {
    name: "features-09",
    type: "registry:block",
    title: "features-09",
    description:
      "Split features layout with intro copy, four highlight items, and a photo panel.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/features/features-09/features.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/features-09/features.tsx",
      },
      {
        path: "registry/blocks/marketing/features/features-09/images/social.webp",
        type: "registry:file",
        target: "components/blocks/marketing/features-09/images/social.webp",
      },
    ],
  },
  {
    name: "features-10",
    type: "registry:block",
    title: "features-10",
    description:
      "Services intro column with explore link and a two-by-two digital marketing grid.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/features/features-10/features.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/features-10/features.tsx",
      },
    ],
  },
  {
    name: "features-11",
    type: "registry:block",
    title: "features-11",
    description:
      "Split features layout with solid primary icons, divider, and a media panel.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/features/features-11/features.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/features-11/features.tsx",
      },
      {
        path: "registry/blocks/marketing/features/features-11/images/panel.webp",
        type: "registry:file",
        target: "components/blocks/marketing/features-11/images/panel.webp",
      },
    ],
  },
  {
    name: "bento-grid-01",
    type: "registry:block",
    title: "bento-grid-01",
    description:
      "Product ops bento — installs chart, live team presence, latency, checklist, and command palette (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/blocks/marketing/bento-grid/bento-grid-01/bento-grid.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/bento-grid-01/bento-grid.tsx",
      },
    ],
  },
  {
    name: "bento-grid-02",
    type: "registry:block",
    title: "bento-grid-02",
    description:
      "Editorial design-system bento — dark metric, quote, CLI terminal, and stack chips (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/bento-grid/bento-grid-02/bento-grid.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/bento-grid-02/bento-grid.tsx",
      },
    ],
  },
  {
    name: "how-it-works-01",
    type: "registry:block",
    title: "how-it-works-01",
    description:
      "Editorial zig-zag how-it-works path with terminal, token, dashboard, and checklist artifacts plus a get-started CTA.",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/how-it-works/how-it-works-01/how-it-works.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/how-it-works-01/how-it-works.tsx",
      },
    ],
  },
  {
    name: "how-it-works-02",
    type: "registry:block",
    title: "how-it-works-02",
    description:
      "Interactive booking desk with step rail and panel for service, day, time, and confirmation.",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/how-it-works/how-it-works-02/how-it-works.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/how-it-works-02/how-it-works.tsx",
      },
    ],
  },
  {
    name: "article-layout-01",
    type: "registry:block",
    title: "article-layout-01",
    description:
      "Article layout — hero meta, short prose sections, sticky TOC, author card, and prev/next.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["avatar", "badge", "button", "separator"],
    files: [
      {
        path: "registry/blocks/content-publishing/article-layout/article-layout-01/article-layout.tsx",
        type: "registry:component",
        target: "components/blocks/content-publishing/article-layout-01/article-layout.tsx",
      },
    ],
  },
  {
    name: "author-profile-01",
    type: "registry:block",
    title: "author-profile-01",
    description:
      "Author profile cards — follow toggle, stats, tags, social links, and recent posts grid.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["avatar", "badge", "button"],
    files: [
      {
        path: "registry/blocks/content-publishing/author-profile/author-profile-01/author-profile.tsx",
        type: "registry:component",
        target: "components/blocks/content-publishing/author-profile-01/author-profile.tsx",
      },
    ],
  },
  {
    name: "blog-grid-01",
    type: "registry:block",
    title: "blog-grid-01",
    description:
      "Blog grid with category chips, search, empty state, post cards, and pagination.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "avatar",
      "badge",
      "button",
      "card",
      "empty",
      "input-group",
      "pagination",
    ],
    files: [
      {
        path: "registry/blocks/content-publishing/blog-grid/blog-grid-01/blog-grid.tsx",
        type: "registry:component",
        target: "components/blocks/content-publishing/blog-grid-01/blog-grid.tsx",
      },
    ],
  },
  {
    name: "changelog-01",
    type: "registry:block",
    title: "changelog-01",
    description:
      "Changelog timeline — version cards with added/changed/fixed/removed badges and load-more.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["badge", "button", "card", "separator"],
    files: [
      {
        path: "registry/blocks/content-publishing/changelog/changelog-01/changelog.tsx",
        type: "registry:component",
        target: "components/blocks/content-publishing/changelog-01/changelog.tsx",
      },
    ],
  },
  {
    name: "comments-01",
    type: "registry:block",
    title: "comments-01",
    description:
      "Comments discussion — composer, nested replies, likes, and load-more.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "avatar",
      "badge",
      "button",
      "separator",
      "textarea",
    ],
    files: [
      {
        path: "registry/blocks/communication/comments/comments-01/comments.tsx",
        type: "registry:component",
        target: "components/blocks/communication/comments-01/comments.tsx",
      },
    ],
  },
  {
    name: "reading-progress-01",
    type: "registry:block",
    title: "reading-progress-01",
    description:
      "Article reading progress — sticky primary bar, share actions, back-to-top, and inline percent card.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["avatar", "badge"],
    files: [
      {
        path: "registry/blocks/content-publishing/reading-progress/reading-progress-01/reading-progress.tsx",
        type: "registry:component",
        target:
          "components/blocks/content-publishing/reading-progress-01/reading-progress.tsx",
      },
    ],
  },
  {
    name: "cta-01",
    type: "registry:block",
    title: "cta-01",
    description:
      "Soft elevated card CTA with headline, supporting copy, and a primary Get started button.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/cta/cta-01/cta.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cta-01/cta.tsx",
      },
    ],
  },
  {
    name: "cta-02",
    type: "registry:block",
    title: "cta-02",
    description:
      "Dark asymmetric runway CTA — primary edge accent, invite form, avatar proof, and CLI teaser (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/cta/cta-02/cta.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cta-02/cta.tsx",
      },
    ],
  },
  {
    name: "cta-03",
    type: "registry:block",
    title: "cta-03",
    description:
      "Split CTA with copy and dual actions beside a media panel.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/cta/cta-03/cta.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cta-03/cta.tsx",
      },
      {
        path: "registry/blocks/marketing/cta/cta-03/images/team.webp",
        type: "registry:file",
        target: "components/blocks/marketing/cta-03/images/team.webp",
      },
    ],
  },
  {
    name: "cta-04",
    type: "registry:block",
    title: "cta-04",
    description:
      "Warm peach CTA band with brand-kit copy, primary action, and desktop illustration.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/cta/cta-04/cta.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cta-04/cta.tsx",
      },
      {
        path: "registry/blocks/marketing/cta/cta-04/images/working.webp",
        type: "registry:file",
        target: "components/blocks/marketing/cta-04/images/working.webp",
      },
    ],
  },
  {
    name: "cta-05",
    type: "registry:block",
    title: "cta-05",
    description:
      "Dark purple gradient CTA card with free-guide copy and a light download button.",
    files: [
      {
        path: "registry/blocks/marketing/cta/cta-05/cta.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cta-05/cta.tsx",
      },
    ],
  },
  {
    name: "cta-06",
    type: "registry:block",
    title: "cta-06",
    description:
      "Cyan app-discount CTA with Google Play and App Store buttons plus overlapping phone art.",
    files: [
      {
        path: "registry/blocks/marketing/cta/cta-06/cta.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cta-06/cta.tsx",
      },
      {
        path: "registry/blocks/marketing/cta/cta-06/images/app.webp",
        type: "registry:file",
        target: "components/blocks/marketing/cta-06/images/app.webp",
      },
    ],
  },
  {
    name: "cta-07",
    type: "registry:block",
    title: "cta-07",
    description:
      "Dark split CTA with photo overlay panel, confidence copy, and primary Get started.",
    files: [
      {
        path: "registry/blocks/marketing/cta/cta-07/cta.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cta-07/cta.tsx",
      },
      {
        path: "registry/blocks/marketing/cta/cta-07/images/team.webp",
        type: "registry:file",
        target: "components/blocks/marketing/cta-07/images/team.webp",
      },
    ],
  },
  {
    name: "cta-08",
    type: "registry:block",
    title: "cta-08",
    description:
      "Centered elevated card CTA with design-tools copy and See How It Works.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/cta/cta-08/cta.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cta-08/cta.tsx",
      },
    ],
  },
  {
    name: "cta-09",
    type: "registry:block",
    title: "cta-09",
    description:
      "Purple gradient productivity CTA with dual actions and free-trial footnote.",
    files: [
      {
        path: "registry/blocks/marketing/cta/cta-09/cta.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/cta-09/cta.tsx",
      },
    ],
  },
  {
    name: "stats-01",
    type: "registry:block",
    title: "stats-01",
    description:
      "Full-bleed photo metrics band with overlay and four centered stats.",
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-01/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-01/stats.tsx",
      },
      {
        path: "registry/blocks/marketing/stats/stats-01/images/digital.webp",
        type: "registry:file",
        target: "components/blocks/marketing/stats-01/images/digital.webp",
      },
    ],
  },
  {
    name: "stats-02",
    type: "registry:block",
    title: "stats-02",
    description:
      "Dark split stats band with photo, heading, and two gradient percentages.",
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-02/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-02/stats.tsx",
      },
      {
        path: "registry/blocks/marketing/stats/stats-02/images/media.webp",
        type: "registry:file",
        target: "components/blocks/marketing/stats-02/images/media.webp",
      },
    ],
  },
  {
    name: "stats-03",
    type: "registry:block",
    title: "stats-03",
    description:
      "Dark hero metric panel on canvas with one oversized value and two supporting stat chips.",
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-03/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-03/stats.tsx",
      },
    ],
  },
  {
    name: "stats-04",
    type: "registry:block",
    title: "stats-04",
    description:
      "Featured KPI card with sparkline plus three compact peer metrics, primary-only accents on canvas.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-04/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-04/stats.tsx",
      },
    ],
  },
  {
    name: "stats-05",
    type: "registry:block",
    title: "stats-05",
    description:
      "Four equal progress-ring cards on canvas with primary stroke and shadow-soft surfaces.",
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-05/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-05/stats.tsx",
      },
    ],
  },
  {
    name: "stats-06",
    type: "registry:block",
    title: "stats-06",
    description:
      "Dark achievements band with blur orbs, heading, and three avatar metrics.",
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-06/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-06/stats.tsx",
      },
      {
        path: "registry/blocks/marketing/stats/stats-06/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/stats-06/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/stats/stats-06/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/stats-06/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/stats/stats-06/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/stats-06/images/avatar-3.webp",
      },
    ],
  },
  {
    name: "stats-07",
    type: "registry:block",
    title: "stats-07",
    description:
      "Dark hologram-style KPI cards with scan lines, float motion, and gradient values.",
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-07/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-07/stats.tsx",
      },
    ],
  },
  {
    name: "stats-08",
    type: "registry:block",
    title: "stats-08",
    description:
      "Dark social-proof panel with headline and four metric tiles using primary accent bars.",
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-08/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-08/stats.tsx",
      },
    ],
  },
  {
    name: "stats-09",
    type: "registry:block",
    title: "stats-09",
    description:
      "Dark trusted-creators band with heading and a tight four-cell metrics grid.",
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-09/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-09/stats.tsx",
      },
    ],
  },
  {
    name: "stats-10",
    type: "registry:block",
    title: "stats-10",
    description:
      "Peach achievement cards with orange icons, values, and a centered heading.",
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-10/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-10/stats.tsx",
      },
    ],
  },
  {
    name: "stats-11",
    type: "registry:block",
    title: "stats-11",
    description:
      "Blue metrics card with uptime, funding, features, and a five-star rating panel.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-11/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-11/stats.tsx",
      },
    ],
  },
  {
    name: "stats-12",
    type: "registry:block",
    title: "stats-12",
    description:
      "Tomato (light) / gray (dark) join-us band with heading and three metrics.",
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-12/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-12/stats.tsx",
      },
    ],
  },
  {
    name: "stats-13",
    type: "registry:block",
    title: "stats-13",
    description:
      "Dashboard overview with revenue bar chart and stacked KPI cards, primary accents on canvas.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-13/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-13/stats.tsx",
      },
    ],
  },
  {
    name: "stats-14",
    type: "registry:block",
    title: "stats-14",
    description:
      "Four icon metrics with blue values and desktop column dividers.",
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-14/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-14/stats.tsx",
      },
    ],
  },
  {
    name: "stats-15",
    type: "registry:block",
    title: "stats-15",
    description:
      "Dark split band with startup copy and a two-by-two metrics card grid.",
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-15/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-15/stats.tsx",
      },
    ],
  },
  {
    name: "stats-16",
    type: "registry:block",
    title: "stats-16",
    description:
      "Four-column KPI strip with muted icon tiles and large values in a single elevated card on canvas.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/stats/stats-16/stats.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/stats-16/stats.tsx",
      },
    ],
  },
  {
    name: "faq-01",
    type: "registry:block",
    title: "faq-01",
    description:
      "Centered FAQ list with plus/minus toggles and single-open accordion panels.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-01/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-01/faq.tsx",
      },
    ],
  },
  {
    name: "faq-02",
    type: "registry:block",
    title: "faq-02",
    description:
      "Static FAQ list with green check icons, start-aligned title, and open answers.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-02/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-02/faq.tsx",
      },
    ],
  },
  {
    name: "faq-03",
    type: "registry:block",
    title: "faq-03",
    description:
      "Two-column FAQ with help icons, top border, and inline primary links.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-03/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-03/faq.tsx",
      },
    ],
  },
  {
    name: "faq-04",
    type: "registry:block",
    title: "faq-04",
    description:
      "Split FAQ with intro column and stacked open question answers.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-04/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-04/faq.tsx",
      },
    ],
  },
  {
    name: "faq-05",
    type: "registry:block",
    title: "faq-05",
    description:
      "Multi-open FAQ accordion with muted hover/open surfaces and plus/minus toggles.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-05/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-05/faq.tsx",
      },
    ],
  },
  {
    name: "faq-06",
    type: "registry:block",
    title: "faq-06",
    description:
      "Categorized multi-open FAQ with leading plus/minus toggles and dividers.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-06/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-06/faq.tsx",
      },
    ],
  },
  {
    name: "faq-07",
    type: "registry:block",
    title: "faq-07",
    description:
      "Two-column multi-open FAQ cards with plus/minus toggles and intro copy.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-07/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-07/faq.tsx",
      },
    ],
  },
  {
    name: "faq-08",
    type: "registry:block",
    title: "faq-08",
    description:
      "Single-column multi-open FAQ cards with soft shadow and plus/minus toggles.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-08/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-08/faq.tsx",
      },
    ],
  },
  {
    name: "faq-09",
    type: "registry:block",
    title: "faq-09",
    description:
      "Static two-column FAQ grid with always-visible answers and intro copy.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-09/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-09/faq.tsx",
      },
    ],
  },
  {
    name: "faq-10",
    type: "registry:block",
    title: "faq-10",
    description:
      "Bordered FAQ panel with header and two-column muted answer cards.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-10/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-10/faq.tsx",
      },
    ],
  },
  {
    name: "faq-11",
    type: "registry:block",
    title: "faq-11",
    description:
      "Dark full-bleed FAQ with category tabs and chevron accordion items.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-11/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-11/faq.tsx",
      },
    ],
  },
  {
    name: "faq-12",
    type: "registry:block",
    title: "faq-12",
    description:
      "Centered FAQ with bordered accordion cards, primary open state, and contact CTA.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-12/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-12/faq.tsx",
      },
    ],
  },
  {
    name: "faq-13",
    type: "registry:block",
    title: "faq-13",
    description:
      "Centered FAQ with cyan-primary gradient frame, soft shadow, and arrow toggle accordion.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-13/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-13/faq.tsx",
      },
    ],
  },
  {
    name: "faq-14",
    type: "registry:block",
    title: "faq-14",
    description:
      "Centered FAQ with pill category tabs and rounded cards with plus-circle toggles.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-14/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-14/faq.tsx",
      },
    ],
  },
  {
    name: "faq-15",
    type: "registry:block",
    title: "faq-15",
    description:
      "Two-column FAQ with badge heading and bordered chevron accordion cards.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-15/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-15/faq.tsx",
      },
    ],
  },
  {
    name: "faq-16",
    type: "registry:block",
    title: "faq-16",
    description:
      "Dark rounded FAQ panel with bold accordion cards and contact CTA.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-16/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-16/faq.tsx",
      },
    ],
  },
  {
    name: "faq-17",
    type: "registry:block",
    title: "faq-17",
    description:
      "Light FAQ with underline category tabs and circle-chevron accordion.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-17/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-17/faq.tsx",
      },
    ],
  },
  {
    name: "faq-18",
    type: "registry:block",
    title: "faq-18",
    description:
      "Numbered FAQ cards on a soft primary wash with chevron accordion details.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-18/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-18/faq.tsx",
      },
    ],
  },
  {
    name: "faq-19",
    type: "registry:block",
    title: "faq-19",
    description:
      "Static FAQ card grid with wave edges, badge header, and overlapping icon badges.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-19/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-19/faq.tsx",
      },
    ],
  },
  {
    name: "faq-20",
    type: "registry:block",
    title: "faq-20",
    description:
      "Bold amber FAQ with numbered step rail, oversized accordion type, and show-more CTA.",
    files: [
      {
        path: "registry/blocks/marketing/faq/faq-20/faq.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/faq-20/faq.tsx",
      },
    ],
  },
  {
    name: "data-table-01",
    type: "registry:block",
    title: "data-table-01",
    description:
      "Grouped task table with department sections, assignee avatar stacks, and status badges.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    registryDependencies: ["avatar", "badge", "table"],
    files: [
      {
        path: "registry/blocks/data-tables/data-table/data-table-01/table.tsx",
        type: "registry:component",
        target: "components/blocks/data-tables/data-table-01/table.tsx",
      },
    ],
  },
  {
    name: "data-table-02",
    type: "registry:block",
    title: "data-table-02",
    description:
      "Invoice table with search, status chips, row selection, bulk bar, and customer avatars.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "avatar",
      "badge",
      "button",
      "checkbox",
      "dropdown-menu",
      "input",
      "table",
    ],
    files: [
      {
        path: "registry/blocks/data-tables/data-table/data-table-02/table.tsx",
        type: "registry:component",
        target: "components/blocks/data-tables/data-table-02/table.tsx",
      },
    ],
  },
  {
    name: "data-table-03",
    type: "registry:block",
    title: "data-table-03",
    description:
      "Team access table with search, role filters, sortable headers, and per-row access switches.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "avatar",
      "badge",
      "button",
      "dropdown-menu",
      "input",
      "switch",
      "table",
    ],
    files: [
      {
        path: "registry/blocks/data-tables/data-table/data-table-03/table.tsx",
        type: "registry:component",
        target: "components/blocks/data-tables/data-table-03/table.tsx",
      },
    ],
  },
  dataTablesAdvancedGridBlock(
    "advanced-data-grid-01",
    "Fleet security inventory with KPI strip, status filters, and coverage meters.",
    { dependencies: ["lucide-react"] }
  ),
  dataTablesAdvancedGridBlock(
    "advanced-data-grid-02",
    "Team directory with bulk selection bar, role badges, and hover row actions.",
    {
      dependencies: ["lucide-react"],
      registryDependencies: ["checkbox"],
      images: [
        "team-1.webp",
        "team-2.webp",
        "team-3.webp",
        "team-4.webp",
        "team-5.webp",
        "team-6.webp",
      ],
    }
  ),
  dataTablesAdvancedGridBlock(
    "advanced-data-grid-03",
    "File vault browser with type tiles, storage meter, and shared avatar stacks.",
    {
      dependencies: ["lucide-react"],
      registryDependencies: ["checkbox"],
      images: [
        "team-1.webp",
        "team-2.webp",
        "team-3.webp",
        "team-4.webp",
        "team-5.webp",
      ],
    }
  ),
  dataTablesAdvancedGridBlock(
    "advanced-data-grid-04",
    "Accounts receivable ledger with balances, contact cards, and create-bill CTAs.",
    { dependencies: ["lucide-react"] }
  ),
  {
    name: "row-actions-01",
    type: "registry:block",
    title: "row-actions-01",
    description:
      "Task table with soft muted icon actions — start, pause, complete, view, delete.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    registryDependencies: ["badge", "button", "table", "tooltip"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/data-tables/row-actions/row-actions-01/table.tsx",
        type: "registry:component",
        target: "components/blocks/data-tables/row-actions-01/table.tsx",
      },
    ],
  },
  {
    name: "row-actions-02",
    type: "registry:block",
    title: "row-actions-02",
    description:
      "Invoice table with muted view/copy/download icons and overflow menu (hover reveal).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    registryDependencies: [
      "badge",
      "button",
      "dropdown-menu",
      "table",
      "tooltip",
    ],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/data-tables/row-actions/row-actions-02/table.tsx",
        type: "registry:component",
        target: "components/blocks/data-tables/row-actions-02/table.tsx",
      },
    ],
  },
  {
    name: "row-actions-03",
    type: "registry:block",
    title: "row-actions-03",
    description:
      "Content table with star, edit, and muted overflow menu for archive/delete.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    registryDependencies: [
      "avatar",
      "badge",
      "button",
      "dropdown-menu",
      "table",
    ],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/data-tables/row-actions/row-actions-03/table.tsx",
        type: "registry:component",
        target: "components/blocks/data-tables/row-actions-03/table.tsx",
      },
    ],
  },
  developerToolsApiKeysBlock(
    "api-keys-01",
    "API keys settings — security banner, token table with copy and revoke actions, create-key dialog."
  ),
  developerToolsWebhookManagementBlock(
    "webhook-management-01",
    "Webhooks — add endpoint form, active endpoints list with actions, and recent delivery logs."
  ),
  developerToolsIntegrationsBlock(
    "integrations-01",
    "Integrations grid — search, category chips, connect/disconnect cards, and request CTA (RTL/LTR)."
  ),
  developerToolsLogsViewerBlock(
    "logs-viewer-01",
    "Log viewer - level/service filters, search, live stream, auto-scroll, and density-aware rows (RTL/LTR)."
  ),
  developerToolsApiKeysBlock(
    "api-keys-02",
    "Access tokens — compact list with scopes, dialog create flow, one-time secret reveal.",
    {
      registryDependencies: [
        "alert",
        "badge",
        "button",
        "checkbox",
        "dialog",
        "input",
        "label",
        "select",
      ],
    }
  ),
  communicationNotificationCenterBlock(
    "notification-center-01",
    "Production notification panel — filters, avatars, inline actions, and scrollable inbox."
  ),
  communicationActivityFeedBlock(
    "activity-feed-01",
    "Workspace activity timeline — comment, commit, invite, upload, backup, and security events (RTL/LTR).",
    {
      images: ["sarah.webp", "alex.webp", "david.webp", "maria.webp"],
    }
  ),
  communicationActivityFeedBlock(
    "activity-feed-02",
    "Rich activity timeline — release publish, comment thread, workspace join, and branch merge cards.",
    {
      images: ["sarah.webp", "alex.webp", "david.webp", "maria.webp"],
    }
  ),
  communicationActivityFeedBlock(
    "activity-feed-03",
    "Compact project activity rail — avatar initials, timeline dots, and relative timestamps.",
    {
      registryDependencies: [],
      images: [],
    }
  ),
  dashboardsAnalyticsDashboardBlock(
    "analytics-dashboard-01",
    "Analytics overview — time-range KPIs with sparklines, revenue bars, traffic sources, top pages, and quick stats (RTL/LTR)."
  ),
  {
    name: "crypto-portfolio-01",
    type: "registry:block",
    title: "crypto-portfolio-01",
    description:
      "Production wallet portfolio — balance with 24h PnL, allocation, searchable assets with SVG sparklines, and recent activity.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "avatar",
      "badge",
      "button",
      "card",
      "input",
      "table",
    ],
    files: [
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-01/crypto-portfolio.tsx",
        type: "registry:component",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-01/crypto-portfolio.tsx",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-01/icons/btc.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-01/icons/btc.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-01/icons/eth.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-01/icons/eth.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-01/icons/sol.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-01/icons/sol.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-01/icons/usdc.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-01/icons/usdc.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-01/images/avatar.webp",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-01/images/avatar.webp",
      },
    ],
  },
  {
    name: "crypto-portfolio-02",
    type: "registry:block",
    title: "crypto-portfolio-02",
    description:
      "Dark trading-desk crypto portfolio — live ticker tape, streaming equity sparkline, allocation bars, and flashing position cards.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["avatar", "badge", "button"],
    files: [
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-02/crypto-portfolio.tsx",
        type: "registry:component",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-02/crypto-portfolio.tsx",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-02/icons/btc.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-02/icons/btc.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-02/icons/eth.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-02/icons/eth.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-02/icons/sol.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-02/icons/sol.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-02/icons/usdc.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-02/icons/usdc.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-02/images/avatar.webp",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-02/images/avatar.webp",
      },
    ],
  },
  {
    name: "crypto-portfolio-03",
    type: "registry:block",
    title: "crypto-portfolio-03",
    description:
      "Dark live crypto desk — streaming Recharts area charts for equity, per-asset markets, and stacked BTC/ETH/SOL exposure.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react", "recharts"],
    registryDependencies: ["avatar", "badge", "button", "chart"],
    files: [
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-03/crypto-portfolio.tsx",
        type: "registry:component",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-03/crypto-portfolio.tsx",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-03/icons/btc.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-03/icons/btc.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-03/icons/eth.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-03/icons/eth.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-03/icons/sol.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-03/icons/sol.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-03/icons/usdc.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-03/icons/usdc.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-03/images/avatar.webp",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-03/images/avatar.webp",
      },
    ],
  },
  {
    name: "crypto-portfolio-04",
    type: "registry:block",
    title: "crypto-portfolio-04",
    description:
      "Bitcoin-orange / coffee portfolio — cream shell in light, dark coffee shell in dark, with warm equity and allocation.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["avatar", "badge", "button"],
    files: [
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-04/crypto-portfolio.tsx",
        type: "registry:component",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-04/crypto-portfolio.tsx",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-04/icons/btc.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-04/icons/btc.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-04/icons/eth.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-04/icons/eth.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-04/icons/sol.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-04/icons/sol.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-04/icons/usdc.svg",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-04/icons/usdc.svg",
      },
      {
        path: "registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-04/images/avatar.webp",
        type: "registry:file",
        target:
          "components/blocks/dashboards-analytics/crypto-portfolio-04/images/avatar.webp",
      },
    ],
  },
  {
    name: "kpi-cards-01",
    type: "registry:block",
    title: "kpi-cards-01",
    description:
      "KPI cards grid — four metric cards with trend badges and sparklines.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["badge", "card"],
    files: [
      {
        path: "registry/blocks/dashboards-analytics/kpi-cards/kpi-cards-01/kpi-cards.tsx",
        type: "registry:component",
        target:
          "components/blocks/dashboards-analytics/kpi-cards-01/kpi-cards.tsx",
      },
    ],
  },
  {
    name: "kpi-cards-02",
    type: "registry:block",
    title: "kpi-cards-02",
    description:
      "Regional KPI strip — status dots, revenue totals, and segmented goal meters.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "registry/blocks/dashboards-analytics/kpi-cards/kpi-cards-02/kpi-cards.tsx",
        type: "registry:component",
        target:
          "components/blocks/dashboards-analytics/kpi-cards-02/kpi-cards.tsx",
      },
    ],
  },
  {
    name: "kpi-cards-03",
    type: "registry:block",
    title: "kpi-cards-03",
    description:
      "Department budget cards — radial progress gauges with spend vs plan and view links.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react", "recharts"],
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "registry/blocks/dashboards-analytics/kpi-cards/kpi-cards-03/kpi-cards.tsx",
        type: "registry:component",
        target:
          "components/blocks/dashboards-analytics/kpi-cards-03/kpi-cards.tsx",
      },
    ],
  },
  {
    name: "kpi-cards-04",
    type: "registry:block",
    title: "kpi-cards-04",
    description:
      "Product trend cards — area sparklines for registry installs, docs traffic, and CLI downloads.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["recharts"],
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "registry/blocks/dashboards-analytics/kpi-cards/kpi-cards-04/kpi-cards.tsx",
        type: "registry:component",
        target:
          "components/blocks/dashboards-analytics/kpi-cards-04/kpi-cards.tsx",
      },
    ],
  },
  calendarSchedulingCalendarBlock(
    "calendar-01",
    "Production calendar — month picker with event dots, day agenda, attendees, and create-event dialog (RTL/LTR).",
    {
      images: ["sarah.webp", "alex.webp", "david.webp", "maria.webp"],
    }
  ),
  onboardingSetupWizardBlock(
    "setup-wizard-01",
    "Four-step onboarding — account, email OTP, experience, and launch."
  ),
  {
    name: "workspace-setup-01",
    type: "registry:block",
    title: "workspace-setup-01",
    description:
      "Create workspace — name, work email, URL slug, role, team size, country, and terms.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: [],
    registryDependencies: [
      "button",
      "checkbox",
      "field",
      "input",
      "input-group",
      "select",
      "separator",
    ],
    files: [
      {
        path: "registry/blocks/onboarding/workspace-setup/workspace-setup-01/workspace-setup.tsx",
        type: "registry:component",
        target:
          "components/blocks/onboarding/workspace-setup-01/workspace-setup.tsx",
      },
    ],
  },
  {
    name: "workspace-setup-02",
    type: "registry:block",
    title: "workspace-setup-02",
    description:
      "Create workspace — organization, region, and selectable Creator/Team/Agency plan cards.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "badge",
      "button",
      "card",
      "field",
      "input",
      "radio-group",
      "select",
      "separator",
    ],
    files: [
      {
        path: "registry/blocks/onboarding/workspace-setup/workspace-setup-02/workspace-setup.tsx",
        type: "registry:component",
        target:
          "components/blocks/onboarding/workspace-setup-02/workspace-setup.tsx",
      },
    ],
  },
  {
    name: "progress-checklist-01",
    type: "registry:block",
    title: "progress-checklist-01",
    description:
      "Onboarding progress checklist — expandable steps, circular progress, dismiss and feedback menu.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "button",
      "collapsible",
      "dropdown-menu",
    ],
    files: [
      {
        path: "registry/blocks/onboarding/progress-checklist/progress-checklist-01/progress-checklist.tsx",
        type: "registry:component",
        target:
          "components/blocks/onboarding/progress-checklist-01/progress-checklist.tsx",
      },
    ],
  },
  {
    name: "progress-checklist-02",
    type: "registry:block",
    title: "progress-checklist-02",
    description:
      "Sequential onboarding cards — numbered steps, progress bar, and one active CTA at a time.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/onboarding/progress-checklist/progress-checklist-02/progress-checklist.tsx",
        type: "registry:component",
        target:
          "components/blocks/onboarding/progress-checklist-02/progress-checklist.tsx",
      },
    ],
  },
  {
    name: "progress-checklist-03",
    type: "registry:block",
    title: "progress-checklist-03",
    description:
      "Workspace launch checklist — clickable steps with Progress bar and help footer.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["progress"],
    files: [
      {
        path: "registry/blocks/onboarding/progress-checklist/progress-checklist-03/progress-checklist.tsx",
        type: "registry:component",
        target:
          "components/blocks/onboarding/progress-checklist-03/progress-checklist.tsx",
      },
    ],
  },
  {
    name: "progress-checklist-04",
    type: "registry:block",
    title: "progress-checklist-04",
    description:
      "Quick-start accordion — sequential setup steps with icon panels and complete CTAs.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["accordion", "button"],
    files: [
      {
        path: "registry/blocks/onboarding/progress-checklist/progress-checklist-04/progress-checklist.tsx",
        type: "registry:component",
        target:
          "components/blocks/onboarding/progress-checklist-04/progress-checklist.tsx",
      },
    ],
  },
  {
    name: "progress-checklist-05",
    type: "registry:block",
    title: "progress-checklist-05",
    description:
      "Deployment progress timeline — done, in-progress, and upcoming steps with a vertical rail.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "registry/blocks/onboarding/progress-checklist/progress-checklist-05/progress-checklist.tsx",
        type: "registry:component",
        target:
          "components/blocks/onboarding/progress-checklist-05/progress-checklist.tsx",
      },
    ],
  },
  {
    name: "data-import-01",
    type: "registry:block",
    title: "data-import-01",
    description:
      "Design system migration — animated step Progress bars, rerun control, and logs accordion.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["accordion", "button", "progress"],
    files: [
      {
        path: "registry/blocks/onboarding/data-import/data-import-01/data-import.tsx",
        type: "registry:component",
        target:
          "components/blocks/onboarding/data-import-01/data-import.tsx",
      },
    ],
  },
  searchFilteringSearchResultsBlock(
    "search-results-01",
    "Search results page — query bar, type sidebar, sort, pagination, and empty state."
  ),
  {
    name: "filter-panel-01",
    type: "registry:block",
    title: "filter-panel-01",
    description:
      "Report filter panel — date range, multi-select dimensions, dual-thumb sliders, and saved presets.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "badge",
      "button",
      "card",
      "input",
      "label",
      "popover",
      "slider",
    ],
    files: [
      {
        path: "registry/blocks/search-filtering/filter-panel/filter-panel-01/filter-panel.tsx",
        type: "registry:component",
        target:
          "components/blocks/search-filtering/filter-panel-01/filter-panel.tsx",
      },
    ],
  },
  {
    name: "billing-history-01",
    type: "registry:block",
    title: "billing-history-01",
    description:
      "Transaction history — search and status/type filters, paginated table, and empty state.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: [
      "avatar",
      "badge",
      "button",
      "card",
      "empty",
      "input-group",
      "select",
      "table",
    ],
    files: [
      {
        path: "registry/blocks/payments-billing/billing-history/billing-history-01/billing-history.tsx",
        type: "registry:component",
        target:
          "components/blocks/payments-billing/billing-history-01/billing-history.tsx",
      },
    ],
  },
  paymentsBillingSettingsBlock(
    "billing-settings-01",
    "Billing settings — plan card, payment method, invoice history table, and card-expiry alert."
  ),
  paymentsBillingSettingsBlock(
    "billing-settings-02",
    "Compact billing panel — plan, payment method, and invoice list in one surface.",
    {
      registryDependencies: ["badge", "button", "separator"],
    }
  ),
  paymentsUsageBasedBillingBlock(
    "usage-based-billing-01",
    "Plan & usage — Pro summary with quota meters, status badges, and Enterprise CTA."
  ),
  paymentsUsageBasedBillingBlock(
    "usage-based-billing-02",
    "Plan overview — radial capacity gauges for workspaces, blocks, registry items, and storage.",
    {
      registryDependencies: ["card", "chart"],
      dependencies: ["lucide-react", "recharts"],
    }
  ),
  paymentsUsageBasedBillingBlock(
    "usage-based-billing-03",
    "Usage meters — Progress bars for installs, credits, storage, and API calls.",
    {
      registryDependencies: ["card", "progress"],
      dependencies: [],
    }
  ),
  paymentsUsageBasedBillingBlock(
    "usage-based-billing-04",
    "Workspace usage cards — stacked bars, warnings, upgrade actions, and budget dialog.",
    {
      registryDependencies: [
        "button",
        "card",
        "dialog",
        "input",
        "label",
      ],
      dependencies: ["lucide-react"],
    }
  ),
  paymentsUsageBasedBillingBlock(
    "usage-based-billing-05",
    "30-day usage list — mini donut gauges, alternating rows, and upgrade CTA.",
    {
      registryDependencies: ["button", "card", "chart"],
      dependencies: ["recharts"],
    }
  ),
  paymentsUsageBasedBillingBlock(
    "usage-based-billing-06",
    "Storage breakdown — segmented bar for components, assets, docs media, themes, and free space.",
    {
      registryDependencies: ["card"],
      dependencies: [],
    }
  ),
  paymentsUsageBasedBillingBlock(
    "usage-based-billing-07",
    "Monthly usage cost card — trend badge, compute/storage/bandwidth bar, and settings link.",
    {
      registryDependencies: ["badge", "card"],
      dependencies: [],
    }
  ),
  paymentsTransferFundsBlock(
    "transfer-funds-01",
    "Transfer funds — details, review, and success steps with account and recipient select."
  ),
  paymentsInvoiceBlock(
    "invoice-01",
    "Invoice receipt — line items, totals, paid badge, and print / download actions."
  ),
  paymentsPaymentMethodsBlock(
    "payment-methods-01",
    "Cards & wallets — main/euro balances, physical card with reveal, and recent activity list."
  ),
  feedbackAccessDeniedBlock(
    "access-denied-01",
    "Access denied gate — locked resource card, signed-in identity, request access and switch account."
  ),
  feedbackNotFoundBlock(
    "not-found-01",
    "Not found — search field, suggested destinations, and home / back actions."
  ),
  feedbackErrorStateBlock(
    "error-state-01",
    "Server error — incident card with alert, trace id, retry, and support link."
  ),
  feedbackRateLimitBlock(
    "rate-limit-01",
    "Rate limit 429 — cooldown meter, usage details, retry, and Pro upgrade CTA."
  ),
  feedbackMaintenanceBlock(
    "maintenance-01",
    "Maintenance — phase rail, ETA, systems board, and notify bar."
  ),
  {
    name: "empty-state-01",
    type: "registry:block",
    title: "empty-state-01",
    description:
      "Empty state gallery — no results, empty inbox, access restricted, and create-first patterns.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["badge", "button", "empty"],
    files: [
      {
        path: "registry/blocks/feedback-states/empty-state/empty-state-01/empty-state.tsx",
        type: "registry:component",
        target: "components/blocks/feedback-states/empty-state-01/empty-state.tsx",
      },
    ],
  },
  feedbackStatusPageBlock(
    "status-page-01",
    "Public status page - incident alert, KPIs, service cards with uptime bars, history, and regional health (RTL/LTR)."
  ),
  userAccountSettingsBlock(
    "account-settings-01",
    "Account settings — profile, notifications, security, and appearance tabs."
  ),
  userAccountSettingsBlock(
    "account-settings-02",
    "Account & workspace settings — stacked sections for profile, workspace defaults, and email digest.",
    {
      registryDependencies: [
        "button",
        "field",
        "input",
        "radio-group",
        "select",
        "separator",
        "textarea",
      ],
      images: [],
    }
  ),
  userAccountSettingsBlock(
    "account-settings-03",
    "Account & workspace settings — stacked sections with team and usage alert checkboxes.",
    {
      registryDependencies: [
        "button",
        "checkbox",
        "field",
        "input",
        "select",
        "separator",
        "textarea",
      ],
      images: [],
    }
  ),
  userAccountTeamMembersBlock(
    "team-members-01",
    "Team members table — invite dialog, roles, status badges, and row actions."
  ),
  userAccountRolesAndPermissionsBlock(
    "roles-and-permissions-01",
    "RBAC matrix - role columns, resource groups, checkboxes, tooltips, discard/save dirty state (RTL/LTR)."
  ),
  userAccountUserProfileBlock(
    "user-profile-01",
    "Public profile — cover banner, follow actions, sidebar stats/skills, and repos/activity/starred tabs."
  ),
  paymentsBillingPaymentFormBlock(
    "payment-form-01",
    "Card-terminal checkout — dark amount header, visual card mock, method tiles, PayPal and bank panels."
  ),
  paymentsBillingPaymentFormBlock(
    "payment-form-02",
    "Commerce checkout — step crumbs, method radios with brand marks, sticky order receipt and ship/delivery.",
    {
      registryDependencies: ["button", "input", "label", "radio-group", "separator"],
      images: [
        "visa.webp",
        "american-express.webp",
        "master.webp",
        "paypal.webp",
      ],
    }
  ),
  paymentsBillingPaymentFormBlock(
    "payment-form-03",
    "SaaS upgrade — primary plan banner with feature checklist, segmented methods, invoice bank details."
  ),
  paymentsBillingPaymentFormBlock(
    "payment-form-04",
    "Editorial subscription — dark typographic plan rail, quiet card form, brand strip and terms gate.",
    {
      images: ["visa.webp", "american-express.webp", "master.webp"],
    }
  ),
  ecommerceProductListBlock(
    "product-list-01",
    "Lookbook drop — portrait covers, index badges, hover Quick add (RTL/LTR).",
    {
      images: [
        "product-1.webp",
        "product-2.webp",
        "product-3.webp",
        "product-4.webp",
        "product-5.webp",
        "product-6.webp",
      ],
    }
  ),
  ecommerceProductListBlock(
    "product-list-02",
    "Spec desk laptops — dark product stages, rating chips, From + Specs CTA (RTL/LTR).",
    {
      images: [
        "laptop-1.webp",
        "laptop-2.webp",
        "laptop-3.webp",
        "laptop-4.webp",
        "laptop-5.webp",
        "laptop-6.webp",
      ],
    }
  ),
  ecommerceProductListBlock(
    "product-list-03",
    "Runway rail footwear — split media/copy cards, colorway dots, cart + wishlist (RTL/LTR).",
    {
      images: [
        "shoe-1.webp",
        "shoe-2.webp",
        "shoe-3.webp",
        "shoe-4.webp",
        "shoe-5.webp",
        "shoe-6.webp",
        "shoe-7.webp",
      ],
    }
  ),
  ecommerceProductListBlock(
    "product-list-04",
    "Atelier markdowns — discount ribbons, frosted price sheets over covers, dual CTAs (RTL/LTR).",
    {
      images: [
        "fashion-1.webp",
        "fashion-2.webp",
        "fashion-3.webp",
        "fashion-4.webp",
        "fashion-5.webp",
        "fashion-6.webp",
        "fashion-7.webp",
        "fashion-9.webp",
      ],
    }
  ),
  ecommerceProductListBlock(
    "product-list-05",
    "Cover stories — full-bleed fashion with glass hover capsules for wishlist + cart (RTL/LTR).",
    {
      registryDependencies: [],
      images: [
        "fashion-1.webp",
        "fashion-2.webp",
        "fashion-3.webp",
        "fashion-4.webp",
        "fashion-5.webp",
        "fashion-6.webp",
        "fashion-7.webp",
        "fashion-9.webp",
      ],
    }
  ),
  ecommerceProductListBlock(
    "product-list-06",
    "Apothecary hot list — warm product wells, MRP chips, bag + save for later (RTL/LTR).",
    {
      images: [
        "sunscreen-1.webp",
        "sunscreen-2.webp",
        "sunscreen-3.webp",
        "sunscreen-4.webp",
        "sunscreen-5.webp",
        "sunscreen-6.webp",
        "aloederm-1.webp",
        "aloederm-2.webp",
      ],
    }
  ),
  ecommerceProductListBlock(
    "product-list-07",
    "Pharmacy shelf — dense five-up grid, % badges, flush wishlist + Add to Bag bar (RTL/LTR).",
    {
      registryDependencies: [],
      images: [
        "sunscreen-1.webp",
        "sunscreen-2.webp",
        "sunscreen-3.webp",
        "sunscreen-4.webp",
        "sunscreen-5.webp",
        "sunscreen-6.webp",
        "aloederm-1.webp",
        "aloederm-2.webp",
        "face-body-1.webp",
        "face-body-2.webp",
      ],
    }
  ),
  ecommerceProductListBlock(
    "product-list-08",
    "Category spotlights — pedestal pods, dim-on-hover stage, rising frosted info plate (RTL/LTR).",
    {
      registryDependencies: [],
      images: [
        "sunglass-white.webp",
        "echo-elegance.webp",
        "laptop-acer.webp",
        "coffee-irish.webp",
        "coffee-mocha.webp",
        "sunglass-black.webp",
        "sneakers.webp",
        "laptop-asus.webp",
      ],
    }
  ),
  ecommerceProductListBlock(
    "product-list-09",
    "Ranked ticker — numbered trending tiles on muted board with live chip (RTL/LTR).",
    {
      registryDependencies: [],
      images: [
        "watch-1.webp",
        "echo-elegance.webp",
        "laptop-acer.webp",
        "watch-4.webp",
        "coffee-mocha.webp",
        "watch-7.webp",
        "watch-8.webp",
        "laptop-asus.webp",
        "watch-3.webp",
        "watch-5.webp",
      ],
    }
  ),
  ecommerceProductListBlock(
    "product-list-10",
    "Concierge watch rows — soft cards with spec meta and directional chevron (RTL/LTR).",
    {
      registryDependencies: [],
      images: [
        "watch-1.webp",
        "watch-2.webp",
        "watch-3.webp",
        "watch-4.webp",
        "watch-5.webp",
        "watch-6.webp",
        "watch-7.webp",
        "watch-8.webp",
      ],
    }
  ),
  ecommerceProductListBlock(
    "product-list-11",
    "Museum pedestals — borderless watch gallery with soft shadow ellipses (RTL/LTR).",
    {
      registryDependencies: [],
      images: [
        "watch-1.webp",
        "watch-2.webp",
        "watch-3.webp",
        "watch-4.webp",
        "watch-5.webp",
        "watch-7.webp",
        "watch-8.webp",
      ],
    }
  ),
  ecommerceCheckoutBlock(
    "checkout-01",
    "Fixed sidebar checkout — sticky muted bag with promo and totals left, delivery grid and Card/PayPal tiles right (RTL/LTR).",
    {
      images: [
        "sweater.webp",
        "tshirt.webp",
        "jacket.webp",
        "sneakers.webp",
        "visa.webp",
        "amex.webp",
        "mastercard.webp",
        "paypal.webp",
      ],
    }
  ),
  ecommerceCheckoutBlock(
    "checkout-02",
    "Two-column checkout — delivery and payment form left, interactive bag with qty steppers and live totals right (RTL/LTR).",
    {
      images: [
        "sneakers.webp",
        "watch.webp",
        "tshirt.webp",
        "visa.webp",
        "amex.webp",
        "mastercard.webp",
        "paypal.webp",
      ],
    }
  ),
  ecommerceCheckoutBlock(
    "checkout-03",
    "Stepper checkout — Cart → Checkout → Order progress, form and promo left, sticky summary with Pay now right (RTL/LTR).",
    {
      images: ["visa.webp", "amex.webp", "mastercard.webp", "paypal.webp"],
    }
  ),
  ecommerceCheckoutBlock(
    "checkout-04",
    "Payment-form checkout — interactive bag left, delivery and payment right with card fields when Card is selected (RTL/LTR).",
    {
      images: [
        "sneakers.webp",
        "watch.webp",
        "tshirt.webp",
        "visa.webp",
        "amex.webp",
        "mastercard.webp",
        "paypal.webp",
      ],
    }
  ),
  ecommerceCheckoutBlock(
    "checkout-05",
    "Vertical-fields checkout — stacked form left, muted summary first on mobile, always-stacked card fields (RTL/LTR).",
    {
      images: [
        "sneakers.webp",
        "watch.webp",
        "tshirt.webp",
        "visa.webp",
        "amex.webp",
        "mastercard.webp",
        "paypal.webp",
      ],
    }
  ),
  ecommerceCheckoutBlock(
    "checkout-06",
    "One-column checkout — max-width stack with Checkout header, bag, muted totals, then two-column delivery and card grids (RTL/LTR).",
    {
      images: [
        "sneakers.webp",
        "watch.webp",
        "tshirt.webp",
        "visa.webp",
        "amex.webp",
        "mastercard.webp",
        "paypal.webp",
      ],
    }
  ),
  ecommerceCheckoutBlock(
    "checkout-07",
    "Modal checkout — Open trigger, Dialog with totals strip, two-column fields, and Cancel / Pay footer (RTL/LTR).",
    {
      registryDependencies: [
        "button",
        "checkbox",
        "dialog",
        "input",
        "label",
        "radio-group",
      ],
      images: ["visa.webp", "amex.webp", "mastercard.webp", "paypal.webp"],
    }
  ),
  ecommerceCheckoutBlock(
    "checkout-08",
    "Drawer checkout — Open trigger, end-edge Sheet titled Shopping cart with stacked delivery/card fields and Pay CTA (RTL/LTR).",
    {
      registryDependencies: [
        "button",
        "checkbox",
        "input",
        "label",
        "radio-group",
        "sheet",
      ],
      images: ["visa.webp", "amex.webp", "mastercard.webp", "paypal.webp"],
    }
  ),
  ecommerceCheckoutBlock(
    "checkout-09",
    "Multi-step checkout — Shipping → Payment → Review stepper, address and method cards, sticky order summary (RTL/LTR).",
    {
      dependencies: ["lucide-react"],
      registryDependencies: [
        "button",
        "card",
        "checkbox",
        "field",
        "input",
        "label",
        "radio-group",
      ],
      images: ["watch.webp", "wallet.webp"],
    }
  ),
  ecommerceOrderConfirmationBlock(
    "order-confirmation-01",
    "Order confirmation — success header with copyable order ID, delivery timeline, shipping/payment cards, and totals (RTL/LTR).",
    {
      images: ["headphones.webp", "keyboard.webp", "mouse.webp"],
    }
  ),
  ecommerceOrderSummaryBlock(
    "order-summary-01",
    "Boutique receipt ticket — success stamp header, order pipeline, ships-to card, compact line items, and invoice CTA (RTL/LTR).",
    {
      images: ["watch.webp", "sneaker.webp"],
    }
  ),
  ecommerceOrderSummaryBlock(
    "order-summary-02",
    "Fulfillment desk board — pipeline scrubber, status-colored chips per SKU, and settlement totals card (RTL/LTR).",
    {
      registryDependencies: [],
      images: ["sunglass.webp", "sneaker.webp", "watch.webp"],
    }
  ),
  ecommerceOrderSummaryBlock(
    "order-summary-03",
    "Commerce success masthead — arrival chip, meta tiles with Mastercard mark, bag list, sticky Track order card (RTL/LTR).",
    {
      images: [
        "sneaker.webp",
        "watch.webp",
        "watch-alt.webp",
        "mastercard.webp",
      ],
    }
  ),
  ecommerceOrderSummaryBlock(
    "order-summary-04",
    "Split atelier sheet — muted start rail for shipping/billing + numbered magazine piece list (RTL/LTR).",
    {
      images: ["sneaker.webp", "watch.webp", "watch-alt.webp"],
    }
  ),
  ecommerceOrderSummaryBlock(
    "order-summary-05",
    "Account order console — order ID badge, compact line cards, and pencil-edit customer/shipping panels (RTL/LTR).",
    {
      registryDependencies: [],
      images: ["watch.webp", "watch-alt.webp"],
    }
  ),
  ecommerceOrderSummaryBlock(
    "order-summary-06",
    "Invoice document — numbered info tiles, SKU line sheet with Qty/Amount columns, and total-due footer (RTL/LTR).",
    {
      registryDependencies: [],
      images: ["laptop.webp", "watch.webp", "sunscreen.webp"],
    }
  ),
  ecommerceProductDetailsBlock(
    "product-details-01",
    "PDP with sticky vertical-thumb gallery, size picker, wishlist/cart, pincode check, accordion details, and reviews.",
    {
      dependencies: [],
      images: [
        "fashion-1.webp",
        "fashion-2.webp",
        "fashion-3.webp",
        "fashion-4.webp",
        "avatar.webp",
      ],
    }
  ),
  ecommerceProductDetailsBlock(
    "product-details-02",
    "Beauty PDP — sticky main image over horizontal thumbs, qty stepper, cart/buy CTAs, pincode, and perk tiles.",
    {
      registryDependencies: ["button", "input", "label", "separator"],
      images: [
        "product-1.webp",
        "product-2.webp",
        "product-3.webp",
        "product-4.webp",
        "product-5.webp",
        "product-6.webp",
      ],
    }
  ),
  ecommerceProductDetailsBlock(
    "product-details-03",
    "Fashion PDP — sticky full-size 2×2 mosaic gallery, size/color pickers, wishlist/cart, pincode, and review.",
    {
      dependencies: [],
      registryDependencies: ["button", "input", "separator"],
      images: [
        "fashion-1.webp",
        "fashion-2.webp",
        "fashion-3.webp",
        "fashion-4.webp",
        "avatar.webp",
      ],
    }
  ),
  ecommerceProductDetailsBlock(
    "product-details-04",
    "Apparel PDP — sticky masonry mosaic gallery, size/color pickers, wishlist/cart, delivery, description, and reviews.",
    {
      dependencies: [],
      registryDependencies: ["button", "input"],
      images: [
        "product-1.webp",
        "product-2.webp",
        "product-3.webp",
        "product-4.webp",
        "product-5.webp",
        "avatar.webp",
      ],
    }
  ),
  ecommerceProductDetailsBlock(
    "product-details-05",
    "Laptop PDP — bordered card chrome, sticky gallery with horizontal thumbs, color swatches, and specs list.",
    {
      dependencies: [],
      registryDependencies: ["button", "input", "label", "separator"],
      images: [
        "laptop-1.webp",
        "laptop-2.webp",
        "laptop-3.webp",
        "laptop-4.webp",
      ],
    }
  ),
  ecommerceProductDetailsBlock(
    "product-details-06",
    "Sneakers PDP — title-first layout, mosaic hero with side angles, size/color pickers, delivery, description, and reviews.",
    {
      dependencies: [],
      registryDependencies: ["button", "input"],
      images: [
        "sneaker-main.webp",
        "sneaker-2.webp",
        "sneaker-3.webp",
        "avatar.webp",
      ],
    }
  ),
  ecommerceProductDetailsBlock(
    "product-details-07",
    "Eyewear PDP — gallery thumbs, likes/share, colors, features checklist, and description.",
    {
      registryDependencies: ["button", "input", "separator"],
      images: [
        "glass-1.webp",
        "glass-2.webp",
        "glass-3.webp",
        "glass-4.webp",
        "glass-5.webp",
        "glass-6.webp",
      ],
    }
  ),
  ecommerceProductDetailsBlock(
    "product-details-08",
    "Tee PDP — sticky gallery with end-edge vertical thumbs, size grid, pincode, accordion details, and reviews.",
    {
      dependencies: [],
      registryDependencies: ["accordion", "button", "input", "separator"],
      images: [
        "tee-1.webp",
        "tee-2.webp",
        "tee-3.webp",
        "tee-4.webp",
        "avatar.webp",
      ],
    }
  ),
  ecommerceProductDetailsBlock(
    "product-details-09",
    "Headphones PDP — carousel gallery with thumbs, color/edition pickers, qty CTAs, trust badges, and Description/Specs/Reviews tabs (RTL/LTR).",
    {
      registryDependencies: [
        "avatar",
        "badge",
        "breadcrumb",
        "button",
        "separator",
        "tabs",
      ],
      images: [
        "headphones-1.webp",
        "headphones-2.webp",
        "headphones-3.webp",
        "headphones-4.webp",
      ],
    }
  ),
  ecommerceShoppingCartBlock(
    "shopping-cart-01",
    "Classic bag with free-shipping progress, bordered line items, and sticky order-details card.",
    {
      images: ["sneaker.webp", "watch.webp", "sunglass.webp"],
    }
  ),
  ecommerceShoppingCartBlock(
    "shopping-cart-02",
    "Split rail cart with size chips, divided rows, and full-height summary column.",
    {
      images: [
        "sneaker.webp",
        "watch.webp",
        "watch-alt.webp",
        "watch-2.webp",
      ],
    }
  ),
  ecommerceShoppingCartBlock(
    "shopping-cart-03",
    "Stacked product cards with color swatches, save/remove actions, and payment logos.",
    {
      images: [
        "watch-1.webp",
        "watch-5.webp",
        "sunglass.webp",
        "mastercard.webp",
        "visa.webp",
        "amex.webp",
      ],
    }
  ),
  ecommerceShoppingCartBlock(
    "shopping-cart-04",
    "Configured device cards with spec checklists, warranty note, quote + checkout CTAs.",
    {
      registryDependencies: ["button"],
      images: [
        "laptop-1.webp",
        "laptop-2.webp",
        "mastercard.webp",
        "visa.webp",
        "amex.webp",
      ],
    }
  ),
  ecommerceShoppingCartBlock(
    "shopping-cart-05",
    "Skincare table cart with receipt-style sticky sidebar and promo field.",
    {
      images: [
        "product-1.webp",
        "product-2.webp",
        "product-3.webp",
        "product-4.webp",
        "product-5.webp",
      ],
    }
  ),
  ecommerceShoppingCartBlock(
    "shopping-cart-06",
    "Sale fashion rows with % badges, compare-at prices, wishlist, and border-start summary.",
    {
      images: ["tee-1.webp", "tee-2.webp", "tee-3.webp", "tee-4.webp"],
    }
  ),
  ecommerceShoppingCartBlock(
    "shopping-cart-07",
    "End-edge Drawer bag with item list, dashed totals panel, and dual footer actions.",
    {
      registryDependencies: ["button", "drawer"],
      images: [
        "tshirt.webp",
        "sweater.webp",
        "echo-elegance.webp",
        "watch.webp",
      ],
    }
  ),
  ecommerceShoppingCartBlock(
    "shopping-cart-08",
    "End-edge Drawer cart with free-shipping progress, size selects, and sticky checkout footer.",
    {
      registryDependencies: ["button", "drawer"],
      images: ["sneaker.webp", "watch-1.webp", "watch-2.webp", "watch-3.webp"],
    }
  ),
  ecommerceShoppingCartBlock(
    "shopping-cart-09",
    "Framed spreadsheet cart with size badges, unit meta, and end-aligned totals.",
    {
      registryDependencies: ["button"],
      images: ["sunscreen.webp", "sweater.webp", "tshirt.webp", "sneaker.webp"],
    }
  ),
  ecommerceShoppingCartBlock(
    "shopping-cart-10",
    "Interactive cart — qty steppers, remove, promo code, sticky order summary with free shipping over $100 (RTL/LTR).",
    {
      registryDependencies: [
        "badge",
        "button",
        "input-group",
        "separator",
      ],
      images: ["headphones.webp", "keyboard.webp", "mouse.webp"],
    }
  ),
  ecommerceWishlistBlock(
    "wishlist-01",
    "Wishlist grid — savings header, share/add-all, discount badges, out-of-stock cards, and empty state (RTL/LTR).",
    {
      images: [
        "headphones.webp",
        "desktop-set.webp",
        "workspace.webp",
        "desk-essentials.webp",
      ],
    }
  ),
  ecommerceOrderHistoryBlock(
    "order-history-01",
    "Account order timeline with status dots, soft cards, and filter select.",
    {
      dependencies: ["lucide-react"],
      images: [
        "tshirt.webp",
        "echo-elegance.webp",
        "watch.webp",
        "sunscreen.webp",
      ],
    }
  ),
  ecommerceOrderHistoryBlock(
    "order-history-02",
    "Action-forward purchase cards with Buy again / Cancel stack and View.",
    {
      registryDependencies: ["button"],
      dependencies: ["lucide-react"],
      images: [
        "tshirt.webp",
        "echo-elegance.webp",
        "watch.webp",
        "sunscreen.webp",
      ],
    }
  ),
  ecommerceOrderHistoryBlock(
    "order-history-03",
    "Shipment board with search toolbar, filter chips, item grids, and reorder actions.",
    {
      registryDependencies: ["button"],
      dependencies: ["lucide-react"],
      images: [
        "tshirt.webp",
        "echo-elegance.webp",
        "watch.webp",
        "sunscreen.webp",
        "facewash.webp",
        "sweater.webp",
      ],
    }
  ),
  ecommerceOrderHistoryBlock(
    "order-history-04",
    "Dark invoice header groups with packing-slip line items and status pills.",
    {
      registryDependencies: ["button"],
      dependencies: ["lucide-react"],
      images: [
        "tshirt.webp",
        "echo-elegance.webp",
        "watch.webp",
        "sunscreen.webp",
      ],
    }
  ),
  ecommerceOrderHistoryBlock(
    "order-history-05",
    "Segmented order console with count tabs and product data table.",
    {
      registryDependencies: ["button"],
      images: [
        "tshirt.webp",
        "echo-elegance.webp",
        "watch.webp",
        "sunscreen.webp",
      ],
    }
  ),
  ecommerceOrderHistoryBlock(
    "order-history-06",
    "Ops ledger spreadsheet with search, status radios, zebra rows, and pagination.",
    {
      dependencies: ["lucide-react"],
    }
  ),
  ecommerceOrderHistoryBlock(
    "order-history-07",
    "Centered delivery dossier with meta strip, delivered badges, and buy-again links.",
    {
      registryDependencies: ["button", "separator"],
      dependencies: ["lucide-react"],
      images: ["tshirt.webp", "sneaker.webp"],
    }
  ),
  ecommerceOrderHistoryBlock(
    "order-history-08",
    "Merchant command center with KPI cards, avatar table, and segmented filters.",
    {
      registryDependencies: ["button"],
      dependencies: ["lucide-react"],
    }
  ),
  ecommerceProductFilterBlock(
    "product-filter-01",
    "Filter sidebar with brand search, size chips, dual price slider, color swatches, and product grid.",
    {
      registryDependencies: ["checkbox", "label", "separator", "slider"],
      dependencies: ["lucide-react"],
    }
  ),
  ecommerceProductFilterBlock(
    "product-filter-02",
    "Collapsible filter rail with price slider, category/brand search, sizes, colors, and recent searches.",
    {
      registryDependencies: ["checkbox", "collapsible", "label", "slider"],
      dependencies: ["lucide-react"],
    }
  ),
  ecommerceProductFilterBlock(
    "product-filter-03",
    "Full filter panel — audience radios, category/brand/color search, sizes, price, and discount.",
    {
      registryDependencies: ["checkbox", "label", "separator", "slider"],
      dependencies: ["lucide-react"],
    }
  ),
  ecommerceProductFilterBlock(
    "product-filter-04",
    "End-edge Drawer filter with category/brand search, sizes, price slider, colors, and Apply/Close.",
    {
      registryDependencies: [
        "button",
        "checkbox",
        "drawer",
        "label",
        "separator",
        "slider",
      ],
      dependencies: ["lucide-react"],
    }
  ),
  ecommerceProductReviewBlock(
    "product-review-01",
    "Stacked customer reviews with verified badges, star ratings, and dates.",
    {
      dependencies: ["lucide-react"],
      images: [
        "avatar-01.webp",
        "avatar-02.webp",
        "avatar-03.webp",
        "avatar-04.webp",
      ],
    }
  ),
  ecommerceProductReviewBlock(
    "product-review-02",
    "Split review rows — buyer profile beside content on desktop, stacked on mobile.",
    {
      dependencies: ["lucide-react"],
      images: [
        "avatar-01.webp",
        "avatar-02.webp",
        "avatar-03.webp",
        "avatar-04.webp",
      ],
    }
  ),
  ecommerceProductReviewBlock(
    "product-review-03",
    "Review section with score bars, customer image strip, and photo-attached reviews.",
    {
      dependencies: ["lucide-react"],
      images: [
        "avatar-01.webp",
        "avatar-02.webp",
        "avatar-03.webp",
        "avatar-04.webp",
        "photo-01.webp",
        "photo-02.webp",
        "photo-03.webp",
        "photo-04.webp",
        "photo-05.webp",
      ],
    }
  ),
  ecommerceProductReviewBlock(
    "product-review-04",
    "Masonry review cards with rating summary, native star filter, and helpful votes.",
    {
      dependencies: ["lucide-react"],
      images: [
        "avatar-01.webp",
        "avatar-02.webp",
        "avatar-03.webp",
        "avatar-04.webp",
        "avatar-05.webp",
        "avatar-06.webp",
      ],
    }
  ),
  ecommerceProductReviewBlock(
    "product-review-05",
    "Two-column reviews — rating summary and write CTA beside images and review list.",
    {
      dependencies: ["lucide-react"],
      images: [
        "avatar-01.webp",
        "avatar-02.webp",
        "avatar-03.webp",
        "avatar-04.webp",
        "photo-01.webp",
        "photo-02.webp",
        "photo-03.webp",
        "photo-04.webp",
        "photo-05.webp",
      ],
    }
  ),
  ecommerceOrderTrackingBlock(
    "order-tracking-01",
    "Order tracking page — status steps, product lines, and billing summary with invoice CTA (RTL/LTR).",
    {
      images: ["sneaker.webp", "watch.webp"],
    }
  ),
  ecommerceOrderTrackingBlock(
    "order-tracking-02",
    "Order tracking split — products and billing left, vertical shipment timeline on the end edge (RTL/LTR).",
    {
      registryDependencies: [],
      images: ["sneaker.webp", "watch.webp"],
    }
  ),
  ecommerceOrderTrackingBlock(
    "order-tracking-03",
    "Order tracking pipeline — responsive step rail, products, delivery info, and billing with invoice CTA (RTL/LTR).",
    {
      images: ["sneaker.webp", "watch.webp"],
    }
  ),
  ecommerceOrderTrackingBlock(
    "order-tracking-04",
    "Order details card — summary meta, responsive tracking rail, line items with color, and end-aligned billing (RTL/LTR).",
    {
      images: ["sneaker.webp", "watch.webp", "watch-silver.webp"],
    }
  ),
  ecommerceOrderTrackingBlock(
    "order-tracking-05",
    "Order tracking split — products, billing, and vertical timeline with customer info aside (RTL/LTR).",
    {
      images: ["sneaker.webp", "watch.webp", "watch-silver.webp"],
    }
  ),
  ecommerceOrderTrackingBlock(
    "order-tracking-06",
    "Compact order tracking — purchase summary, pricing, items with reorder, and three-step delivery rail (RTL/LTR).",
    {
      images: ["sneaker.webp"],
    }
  ),
  ecommerceOrderTrackingBlock(
    "order-tracking-07",
    "Order tracking overview — meta row, responsive step rail, product grid, and end-aligned billing (RTL/LTR).",
    {
      registryDependencies: [],
      images: ["sneaker.webp", "watch.webp", "watch-silver.webp"],
    }
  ),
  ecommerceProductCategoriesBlock(
    "product-categories-01",
    "Lookbook orbit — numbered circular fashion tiles with offer captions and View all (RTL/LTR).",
    {
      dependencies: ["lucide-react"],
      images: [
        "ethnic.webp",
        "festive.webp",
        "casual.webp",
        "streetwear.webp",
        "winter.webp",
        "summer.webp",
      ],
    }
  ),
  ecommerceProductCategoriesBlock(
    "product-categories-02",
    "Poster wall — dark campaign grid with tall product posters and hover name captions (RTL/LTR).",
    {
      images: [
        "sunglass-1.webp",
        "sneakers.webp",
        "laptop-1.webp",
        "coffee.webp",
        "mug.webp",
        "sunglass-2.webp",
        "fashion.webp",
        "laptop-2.webp",
      ],
    }
  ),
  ecommerceProductCategoriesBlock(
    "product-categories-03",
    "Apothecary tray — muted shell with SKU-tagged beauty cards in a soft grid (RTL/LTR).",
    {
      images: [
        "hair-brush.webp",
        "body-lotion.webp",
        "nail-polish.webp",
        "body-butter.webp",
        "lipstick.webp",
        "eye-primer.webp",
        "dry-shampoo.webp",
        "face-wash.webp",
        "skin-glow.webp",
        "face-primer.webp",
      ],
    }
  ),
  ecommerceProductCategoriesBlock(
    "product-categories-04",
    "Spotlight triptych — cinematic promo tiles with gradient overlays and Shop now CTAs (RTL/LTR).",
    {
      dependencies: ["lucide-react"],
      images: ["face-wash.webp", "skin-glow.webp", "face-primer.webp"],
    }
  ),
  ecommerceProductCategoriesBlock(
    "product-categories-05",
    "Lookbook index — editorial fashion portraits with index chips and primary rule header (RTL/LTR).",
    {
      images: [
        "ethnic.webp",
        "festive.webp",
        "casual.webp",
        "street.webp",
        "budget.webp",
        "summer.webp",
        "deals.webp",
        "refresh.webp",
        "best.webp",
        "winter.webp",
      ],
    }
  ),
  ecommerceProductCategoriesBlock(
    "product-categories-06",
    "Offer desk — ticket-tagged promo cards with season copy and Explore links (RTL/LTR).",
    {
      dependencies: ["lucide-react"],
      images: [
        "ethnic.webp",
        "festive.webp",
        "casual.webp",
        "street.webp",
        "picks.webp",
      ],
    }
  ),
  ecommerceProductCategoriesBlock(
    "product-categories-07",
    "Wellness shelf — snap-scroll beauty rail with chevron scrubbers (RTL/LTR).",
    {
      dependencies: ["lucide-react"],
      registryDependencies: ["button"],
      images: [
        "sunscreen.webp",
        "face-wash.webp",
        "skin-glow.webp",
        "dry-shampoo.webp",
        "body-butter.webp",
        "face-primer.webp",
        "body-lotion.webp",
      ],
    }
  ),
  ecommerceProductCategoriesBlock(
    "product-categories-08",
    "Marketplace hubs — four department boards with browse actions and 2×2 product tiles (RTL/LTR).",
    {
      dependencies: ["lucide-react"],
      images: [
        "watch-1.webp",
        "laptop-1.webp",
        "sunglass.webp",
        "sunscreen-a.webp",
        "food-1.webp",
        "coffee.webp",
        "food-2.webp",
        "burger.webp",
        "laptop-2.webp",
        "watch-2.webp",
        "desktop.webp",
        "laptop-3.webp",
        "sunscreen-b.webp",
        "sun-cream.webp",
        "organic.webp",
      ],
    }
  ),
  filesMediaDataExportBlock(
    "data-export-01",
    "Data export panel — format cards, collapsible field groups, progress, and success state."
  ),
  filesMediaDataExportBlock(
    "data-export-02",
    "Minimal export dialog — format, date range, headers checkbox, and Export.",
    {
      registryDependencies: ["button", "checkbox", "label", "select"],
    }
  ),
  filesMediaFileManagerBlock(
    "file-manager-01",
    "Drive-style file manager — sidebar nav, breadcrumbs, storage meter, and grid or list views."
  ),
  filesMediaFileUploadBlock(
    "file-upload-01",
    "Drag-and-drop upload zone with type badges, per-file progress, and clear / upload actions."
  ),
  filesMediaMediaGalleryBlock(
    "media-gallery-01",
    "Media asset gallery — tag filters, masonry or list, multi-select, and lightbox preview.",
    [
      "gallery-1.webp",
      "gallery-2.webp",
      "gallery-3.webp",
      "gallery-4.webp",
      "gallery-5.webp",
      "gallery-6.webp",
      "gallery-7.webp",
      "gallery-8.webp",
      "gallery-9.webp",
      "gallery-10.webp",
      "gallery-11.webp",
      "gallery-12.webp",
    ]
  ),
  filesMediaMediaPlayerBlock(
    "media-player-01",
    "Video showcase — local silent nature film, copy panel, metadata, and play CTA.",
    ["flower.mp4"]
  ),
  filesMediaGalleryBlock(
    "gallery-01",
    "Responsive 2×3 image gallery grid with rounded frames, soft shadow, and local demo photos.",
    [
      "gallery-1.webp",
      "gallery-2.webp",
      "gallery-3.webp",
      "gallery-4.webp",
      "gallery-5.webp",
      "gallery-6.webp",
      "gallery-7.webp",
      "gallery-8.webp",
      "gallery-9.webp",
    ]
  ),
  filesMediaGalleryBlock(
    "gallery-02",
    "Masonry image gallery with column layout, hover zoom, soft frames, and local demo photos.",
    [
      "valeriia.webp",
      "gallery-2.webp",
      "gallery-1.webp",
      "body-motion.webp",
      "face-cream.webp",
      "gallery-6.webp",
      "headphones.webp",
      "gallery-8.webp",
      "sunscreen.webp",
      "green-tshirt.webp",
      "cream.webp",
    ]
  ),
  filesMediaGalleryBlock(
    "gallery-03",
    "Two-column image gallery grid with equal tiles, soft frames, and local demo photos.",
    [
      "gallery-1.webp",
      "gallery-2.webp",
      "gallery-3.webp",
      "gallery-4.webp",
      "gallery-5.webp",
      "gallery-6.webp",
    ]
  ),
  filesMediaGalleryBlock(
    "gallery-04",
    "Full-bleed category gallery with hover primary scrim and image zoom.",
    [
      "dry-shampoo.webp",
      "eye-primer.webp",
      "face-primer.webp",
      "face-wash.webp",
      "hair-brush.webp",
      "lipstick.webp",
    ]
  ),
  filesMediaGalleryBlock(
    "gallery-05",
    "People intro split with primary CTA and masonry photo column grid.",
    [
      "fashion-5.webp",
      "fashion-7.webp",
      "fashion-1.webp",
      "dry-shampoo.webp",
      "fashion-10.webp",
      "fashion-6.webp",
      "fashion-9.webp",
      "fashion-8.webp",
      "lipstick.webp",
    ]
  ),
  filesMediaGalleryBlock(
    "gallery-06",
    "Featured asymmetric gallery: one-third / two-thirds top row plus equal bottom trio.",
    [
      "gallery-1.webp",
      "furniture.webp",
      "gallery-6.webp",
      "gallery-4.webp",
      "gallery-5.webp",
    ]
  ),
  filesMediaGalleryBlock(
    "gallery-07",
    "Featured hero tile beside a 2×2 image grid with soft frames and hover zoom.",
    [
      "gallery-1.webp",
      "gallery-2.webp",
      "gallery-6.webp",
      "gallery-4.webp",
      "gallery-5.webp",
    ]
  ),
  filesMediaGalleryBlock(
    "gallery-08",
    "Three-row gallery: asymmetric 3/6, equal pair, then mirrored 6/3 bands.",
    [
      "gallery-1.webp",
      "furniture.webp",
      "gallery-6.webp",
      "gallery-4.webp",
      "real-estate.webp",
      "gallery-5.webp",
    ]
  ),
  filesMediaGalleryBlock(
    "gallery-09",
    "Interactive featured image with selectable thumbnail strip and active indicator.",
    [
      "gallery-8.webp",
      "gallery-4.webp",
      "gallery-5.webp",
      "gallery-6.webp",
      "gallery-7.webp",
    ]
  ),
  filesMediaGalleryBlock(
    "gallery-10",
    "Interactive featured image with vertical thumbnail sidebar and active indicator.",
    [
      "gallery-8.webp",
      "gallery-4.webp",
      "gallery-5.webp",
      "gallery-6.webp",
      "gallery-7.webp",
    ]
  ),
  {
    name: "testimonials-01",
    type: "registry:block",
    title: "testimonials-01",
    description:
      "Centered customer quote with rating stars, avatar, and short testimonial copy.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-01/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-01/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-01/images/avatar.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-01/images/avatar.webp",
      },
    ],
  },
  {
    name: "testimonials-02",
    type: "registry:block",
    title: "testimonials-02",
    description:
      "Three-column client quotes with large avatars, star ratings, and short copy.",
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-02/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-02/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-02/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-02/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-02/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-02/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-02/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-02/images/avatar-3.webp",
      },
    ],
  },
  {
    name: "testimonials-03",
    type: "registry:block",
    title: "testimonials-03",
    description:
      "Stacked testimonials with avatar, role, and quote in a two-column row.",
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-03/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-03/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-03/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-03/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-03/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-03/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-03/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-03/images/avatar-3.webp",
      },
    ],
  },
  {
    name: "testimonials-04",
    type: "registry:block",
    title: "testimonials-04",
    description:
      "Two-column testimonials with intro on the start edge and stacked quotes with dividers.",
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-04/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-04/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-04/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-04/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-04/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-04/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-04/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-04/images/avatar-3.webp",
      },
    ],
  },
  {
    name: "testimonials-05",
    type: "registry:block",
    title: "testimonials-05",
    description:
      "Masonry card wall of client quotes with gold star ratings and avatar captions.",
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-05/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-05/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-05/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-05/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-05/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-05/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-05/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-05/images/avatar-3.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-05/images/avatar-4.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-05/images/avatar-4.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-05/images/avatar-5.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-05/images/avatar-5.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-05/images/avatar-6.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-05/images/avatar-6.webp",
      },
    ],
  },
  {
    name: "testimonials-06",
    type: "registry:block",
    title: "testimonials-06",
    description:
      "Dark panel grid of client quotes with large avatars, gold stars, and scores.",
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-06/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-06/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-06/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-06/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-06/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-06/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-06/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-06/images/avatar-3.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-06/images/avatar-4.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-06/images/avatar-4.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-06/images/avatar-5.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-06/images/avatar-5.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-06/images/avatar-6.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-06/images/avatar-6.webp",
      },
    ],
  },
  {
    name: "testimonials-07",
    type: "registry:block",
    title: "testimonials-07",
    description:
      "Split testimonials with intro on the start edge and a masonry card column.",
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-07/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-07/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-07/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-07/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-07/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-07/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-07/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-07/images/avatar-3.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-07/images/avatar-4.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-07/images/avatar-4.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-07/images/avatar-5.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-07/images/avatar-5.webp",
      },
    ],
  },
  {
    name: "testimonials-08",
    type: "registry:block",
    title: "testimonials-08",
    description:
      "Horizontal testimonial carousel with overlapping avatars, gold stars, and prev/next controls.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-08/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-08/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-08/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-08/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-08/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-08/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-08/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-08/images/avatar-3.webp",
      },
    ],
  },
  {
    name: "testimonials-09",
    type: "registry:block",
    title: "testimonials-09",
    description:
      "Centered quote cards with overlapping avatars, gold stars, and soft elevation.",
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-09/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-09/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-09/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-09/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-09/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-09/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-09/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-09/images/avatar-3.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-09/images/avatar-4.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-09/images/avatar-4.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-09/images/avatar-5.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-09/images/avatar-5.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-09/images/avatar-6.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-09/images/avatar-6.webp",
      },
    ],
  },
  {
    name: "testimonials-10",
    type: "registry:block",
    title: "testimonials-10",
    description:
      "Muted section with a masonry wall of quote cards, gold stars, and avatar captions.",
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-10/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-10/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-10/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-10/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-10/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-10/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-10/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-10/images/avatar-3.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-10/images/avatar-4.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-10/images/avatar-4.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-10/images/avatar-5.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-10/images/avatar-5.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-10/images/avatar-6.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-10/images/avatar-6.webp",
      },
    ],
  },
  {
    name: "testimonials-11",
    type: "registry:block",
    title: "testimonials-11",
    description:
      "Centered avatar cards in a three-column grid with gold star ratings.",
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-11/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-11/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-11/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-11/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-11/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-11/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-11/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-11/images/avatar-3.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-11/images/avatar-4.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-11/images/avatar-4.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-11/images/avatar-5.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-11/images/avatar-5.webp",
      },
    ],
  },
  {
    name: "testimonials-12",
    type: "registry:block",
    title: "testimonials-12",
    description:
      "Centered single-slide testimonial carousel with gold stars and side controls.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-12/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-12/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-12/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-12/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-12/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-12/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-12/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-12/images/avatar-3.webp",
      },
    ],
  },
  {
    name: "testimonials-13",
    type: "registry:block",
    title: "testimonials-13",
    description:
      "Photo and quote carousel with primary offset shadow, gold stars, and prev/next controls.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-13/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-13/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-13/images/photo-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-13/images/photo-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-13/images/photo-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-13/images/photo-2.webp",
      },
    ],
  },
  {
    name: "testimonials-14",
    type: "registry:block",
    title: "testimonials-14",
    description:
      "Spotlight desk with a customer rail and quote stage, outcome chips, and previous/next controls.",
    registryDependencies: ["avatar", "button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/testimonials/testimonials-14/testimonial.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/testimonials-14/testimonial.tsx",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-14/images/avatar-1.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-14/images/avatar-1.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-14/images/avatar-2.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-14/images/avatar-2.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-14/images/avatar-3.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-14/images/avatar-3.webp",
      },
      {
        path: "registry/blocks/marketing/testimonials/testimonials-14/images/avatar-4.webp",
        type: "registry:file",
        target: "components/blocks/marketing/testimonials-14/images/avatar-4.webp",
      },
    ],
  },
  {
    name: "application-form-01",
    type: "registry:block",
    title: "application-form-01",
    description:
      "Early-access application — contact, company, use case, and selectable plan cards.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: [],
    registryDependencies: [
      "button",
      "field",
      "input",
      "radio-group",
      "select",
      "separator",
    ],
    files: [
      {
        path: "registry/blocks/forms/application-form/application-form-01/application-form.tsx",
        type: "registry:component",
        target:
          "components/blocks/forms/application-form-01/application-form.tsx",
      },
    ],
  },
  {
    name: "contact-form-01",
    type: "registry:block",
    title: "contact-form-01",
    description:
      "Elevated contact card with two-column fields and message CTA.",
    registryDependencies: ["button", "input", "label", "textarea"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/forms/contact-form/contact-form-01/contact-form.tsx",
        type: "registry:component",
        target: "components/blocks/forms/contact-form-01/contact-form.tsx",
      },
    ],
  },
  {
    name: "contact-form-02",
    type: "registry:block",
    title: "contact-form-02",
    description:
      "Elevated form beside four contact detail cards (office, phone, chat, fax).",
    registryDependencies: ["button", "input", "label", "textarea"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/forms/contact-form/contact-form-02/contact-form.tsx",
        type: "registry:component",
        target: "components/blocks/forms/contact-form-02/contact-form.tsx",
      },
    ],
  },
  {
    name: "contact-form-03",
    type: "registry:block",
    title: "contact-form-03",
    description:
      "Four contact detail cards above an elevated compact contact form.",
    registryDependencies: ["button", "input", "label", "textarea"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/forms/contact-form/contact-form-03/contact-form.tsx",
        type: "registry:component",
        target: "components/blocks/forms/contact-form-03/contact-form.tsx",
      },
    ],
  },
  {
    name: "contact-form-04",
    type: "registry:block",
    title: "contact-form-04",
    description:
      "Centered elevated contact form with four detail cards underneath.",
    registryDependencies: ["button", "input", "label", "textarea"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/forms/contact-form/contact-form-04/contact-form.tsx",
        type: "registry:component",
        target: "components/blocks/forms/contact-form-04/contact-form.tsx",
      },
    ],
  },
  {
    name: "contact-form-05",
    type: "registry:block",
    title: "contact-form-05",
    description:
      "Split Let's Talk layout with email card, Facebook/LinkedIn/X icons, and form.",
    registryDependencies: ["button", "input", "label", "textarea"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/forms/contact-form/contact-form-05/contact-form.tsx",
        type: "registry:component",
        target: "components/blocks/forms/contact-form-05/contact-form.tsx",
      },
      ...formsBlockIconFiles("contact-form-05", [
        "facebook",
        "linkedin",
        "x",
      ]),
    ],
  },
  {
    name: "contact-form-06",
    type: "registry:block",
    title: "contact-form-06",
    description:
      "Centered contact form card beside a rounded team photo panel.",
    registryDependencies: ["button", "input", "label", "textarea"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/forms/contact-form/contact-form-06/contact-form.tsx",
        type: "registry:component",
        target: "components/blocks/forms/contact-form-06/contact-form.tsx",
      },
      {
        path: "registry/blocks/forms/contact-form/contact-form-06/images/team.webp",
        type: "registry:file",
        target: "components/blocks/forms/contact-form-06/images/team.webp",
      },
    ],
  },
  {
    name: "contact-form-07",
    type: "registry:block",
    title: "contact-form-07",
    description:
      "Primary info panel with social icons beside a two-column contact form.",
    registryDependencies: ["button", "input", "label", "textarea"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/forms/contact-form/contact-form-07/contact-form.tsx",
        type: "registry:component",
        target: "components/blocks/forms/contact-form-07/contact-form.tsx",
      },
      ...formsBlockIconFiles("contact-form-07", [
        "facebook",
        "linkedin",
        "x",
      ]),
    ],
  },
  {
    name: "contact-form-08",
    type: "registry:block",
    title: "contact-form-08",
    description:
      "Elevated form with detail cards and an embedded office map.",
    registryDependencies: ["button", "input", "label", "textarea"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/forms/contact-form/contact-form-08/contact-form.tsx",
        type: "registry:component",
        target: "components/blocks/forms/contact-form-08/contact-form.tsx",
      },
    ],
  },
  {
    name: "contact-form-09",
    type: "registry:block",
    title: "contact-form-09",
    description:
      "Muted stage with centered form card and three contact detail cards.",
    registryDependencies: ["button", "input", "label", "textarea"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/forms/contact-form/contact-form-09/contact-form.tsx",
        type: "registry:component",
        target: "components/blocks/forms/contact-form-09/contact-form.tsx",
      },
    ],
  },
  {
    name: "contact-form-10",
    type: "registry:block",
    title: "contact-form-10",
    description:
      "Full-height split page with local team photo panel and contact form.",
    registryDependencies: ["button", "input", "label", "textarea"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/forms/contact-form/contact-form-10/contact-form.tsx",
        type: "registry:component",
        target: "components/blocks/forms/contact-form-10/contact-form.tsx",
      },
      {
        path: "registry/blocks/forms/contact-form/contact-form-10/images/team.webp",
        type: "registry:file",
        target: "components/blocks/forms/contact-form-10/images/team.webp",
      },
    ],
  },
  {
    name: "contact-form-11",
    type: "registry:block",
    title: "contact-form-11",
    description:
      "Get In Touch form card beside an embedded office map.",
    registryDependencies: ["button", "input", "label", "textarea"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/forms/contact-form/contact-form-11/contact-form.tsx",
        type: "registry:component",
        target: "components/blocks/forms/contact-form-11/contact-form.tsx",
      },
    ],
  },
  {
    name: "contact-form-12",
    type: "registry:block",
    title: "contact-form-12",
    description:
      "Get in touch form with contact information and hours-of-operation cards.",
    registryDependencies: ["button", "input", "label", "textarea"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/forms/contact-form/contact-form-12/contact-form.tsx",
        type: "registry:component",
        target: "components/blocks/forms/contact-form-12/contact-form.tsx",
      },
    ],
  },
  {
    name: "footer-01",
    type: "registry:block",
    title: "footer-01",
    description:
      "Four-column marketing footer with quick links, services, platforms, and company.",
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-01/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-01/footer.tsx",
      },
    ],
  },
  {
    name: "footer-02",
    type: "registry:block",
    title: "footer-02",
    description:
      "Marketing footer with logo, social icons, useful links, and information.",
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-02/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-02/footer.tsx",
      },
      {
        path: "registry/blocks/marketing/footer/footer-02/logo.svg",
        type: "registry:file",
        target: "components/blocks/marketing/footer-02/logo.svg",
      },
      ...marketingBlockIconFiles("footer-02", [
        "facebook",
        "linkedin",
        "x",
        "github",
      ]),
    ],
  },
  {
    name: "footer-03",
    type: "registry:block",
    title: "footer-03",
    description:
      "Dark marketing footer with resources, policies, social icons, and signup CTA.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-03/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-03/footer.tsx",
      },
      ...marketingBlockIconFiles("footer-03", [
        "facebook",
        "linkedin",
        "x",
      ]),
    ],
  },
  {
    name: "footer-04",
    type: "registry:block",
    title: "footer-04",
    description:
      "Muted footer with brand blurb, social icons, four link columns, and legal bar.",
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-04/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-04/footer.tsx",
      },
      {
        path: "registry/blocks/marketing/footer/footer-04/logo.svg",
        type: "registry:file",
        target: "components/blocks/marketing/footer-04/logo.svg",
      },
      ...marketingBlockIconFiles("footer-04", [
        "facebook",
        "linkedin",
        "x",
        "github",
      ]),
    ],
  },
  {
    name: "footer-05",
    type: "registry:block",
    title: "footer-05",
    description:
      "Gradient dark footer with logo, social icons, three link columns, and legal bar.",
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-05/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-05/footer.tsx",
      },
      {
        path: "registry/blocks/marketing/footer/footer-05/logo.svg",
        type: "registry:file",
        target: "components/blocks/marketing/footer-05/logo.svg",
      },
      ...marketingBlockIconFiles("footer-05", [
        "facebook",
        "linkedin",
        "x",
        "github",
      ]),
    ],
  },
  {
    name: "footer-06",
    type: "registry:block",
    title: "footer-06",
    description:
      "Store-style footer with stacked link groups, audience columns, and centered legal links.",
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-06/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-06/footer.tsx",
      },
    ],
  },
  {
    name: "footer-07",
    type: "registry:block",
    title: "footer-07",
    description:
      "Dark contact footer with address, social icons, link columns, and newsletter signup.",
    registryDependencies: ["button", "input"],
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-07/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-07/footer.tsx",
      },
      {
        path: "registry/blocks/marketing/footer/footer-07/logo.svg",
        type: "registry:file",
        target: "components/blocks/marketing/footer-07/logo.svg",
      },
      ...marketingBlockIconFiles("footer-07", [
        "facebook",
        "linkedin",
        "x",
        "github",
      ]),
    ],
  },
  {
    name: "footer-08",
    type: "registry:block",
    title: "footer-08",
    description:
      "Centered dark footer with legal links, social icons, and copyright.",
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-08/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-08/footer.tsx",
      },
      ...marketingBlockIconFiles("footer-08", [
        "facebook",
        "linkedin",
        "x",
        "github",
      ]),
    ],
  },
  {
    name: "footer-09",
    type: "registry:block",
    title: "footer-09",
    description:
      "Minimal centered footer with brand mark, family line, and social icons.",
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-09/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-09/footer.tsx",
      },
      ...marketingBlockIconFiles("footer-09", [
        "google",
        "x",
        "github",
        "slack",
      ]),
    ],
  },
  {
    name: "footer-10",
    type: "registry:block",
    title: "footer-10",
    description:
      "Newsletter footer with brand mark, five link columns, social icons, and legal bar.",
    registryDependencies: ["button", "input"],
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-10/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-10/footer.tsx",
      },
      ...marketingBlockIconFiles("footer-10", [
        "facebook",
        "instagram",
        "x",
        "github",
        "dribbble",
      ]),
    ],
  },
  {
    name: "footer-11",
    type: "registry:block",
    title: "footer-11",
    description:
      "Split footer with photo panel, phone hours, social icons, and link columns.",
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-11/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-11/footer.tsx",
      },
      {
        path: "registry/blocks/marketing/footer/footer-11/images/panel.webp",
        type: "registry:file",
        target: "components/blocks/marketing/footer-11/images/panel.webp",
      },
      ...marketingBlockIconFiles("footer-11", [
        "facebook",
        "instagram",
        "x",
        "github",
        "dribbble",
      ]),
    ],
  },
  {
    name: "footer-12",
    type: "registry:block",
    title: "footer-12",
    description:
      "Centered newsletter pill, social icons, three link columns, and credit line.",
    registryDependencies: ["button", "input"],
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-12/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-12/footer.tsx",
      },
      ...marketingBlockIconFiles("footer-12", [
        "facebook",
        "instagram",
        "x",
        "github",
        "dribbble",
      ]),
    ],
  },
  {
    name: "footer-13",
    type: "registry:block",
    title: "footer-13",
    description:
      "Centered muted footer with brand mark, blurb, nav links, and social icons.",
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-13/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-13/footer.tsx",
      },
      {
        path: "registry/blocks/marketing/footer/footer-13/logo.svg",
        type: "registry:file",
        target: "components/blocks/marketing/footer-13/logo.svg",
      },
      ...marketingBlockIconFiles("footer-13", [
        "facebook",
        "instagram",
        "x",
        "github",
        "dribbble",
      ]),
    ],
  },
  {
    name: "footer-14",
    type: "registry:block",
    title: "footer-14",
    description:
      "Brand blurb and socials with About, Services, Helpful Links (live chat), Contact, and legal bar.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-14/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-14/footer.tsx",
      },
      {
        path: "registry/blocks/marketing/footer/footer-14/logo.svg",
        type: "registry:file",
        target: "components/blocks/marketing/footer-14/logo.svg",
      },
      ...marketingBlockIconFiles("footer-14", [
        "facebook",
        "instagram",
        "x",
        "github",
        "dribbble",
      ]),
    ],
  },
  {
    name: "footer-15",
    type: "registry:block",
    title: "footer-15",
    description:
      "Career CTA banner with four link columns, Live Chat indicator, socials, and brand bar.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-15/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-15/footer.tsx",
      },
      {
        path: "registry/blocks/marketing/footer/footer-15/logo.svg",
        type: "registry:file",
        target: "components/blocks/marketing/footer-15/logo.svg",
      },
      ...marketingBlockIconFiles("footer-15", [
        "facebook",
        "instagram",
        "x",
        "github",
        "dribbble",
      ]),
    ],
  },
  {
    name: "footer-16",
    type: "registry:block",
    title: "footer-16",
    description:
      "Brand blurb and socials with Company, Support, newsletter signup, and legal bar.",
    registryDependencies: ["button", "input"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/footer/footer-16/footer.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/footer-16/footer.tsx",
      },
      {
        path: "registry/blocks/marketing/footer/footer-16/logo.svg",
        type: "registry:file",
        target: "components/blocks/marketing/footer-16/logo.svg",
      },
      ...marketingBlockIconFiles("footer-16", [
        "instagram",
        "facebook",
        "x",
        "linkedin",
      ]),
    ],
  },
  {
    name: "rating-01",
    type: "registry:block",
    title: "rating-01",
    description: "Read-only five-star rating row with filled and empty stars.",
    files: [
      {
        path: "registry/blocks/ecommerce/reviews-and-ratings/rating-01/rating.tsx",
        type: "registry:component",
        target: "components/blocks/ecommerce/rating-01/rating.tsx",
      },
    ],
  },
  {
    name: "rating-02",
    type: "registry:block",
    title: "rating-02",
    description:
      "Read-only star rating with a numeric score label beside the stars.",
    files: [
      {
        path: "registry/blocks/ecommerce/reviews-and-ratings/rating-02/rating.tsx",
        type: "registry:component",
        target: "components/blocks/ecommerce/rating-02/rating.tsx",
      },
    ],
  },
  {
    name: "rating-03",
    type: "registry:block",
    title: "rating-03",
    description:
      "Dark pill rating with an overlapping yellow score badge and star row.",
    files: [
      {
        path: "registry/blocks/ecommerce/reviews-and-ratings/rating-03/rating.tsx",
        type: "registry:component",
        target: "components/blocks/ecommerce/rating-03/rating.tsx",
      },
    ],
  },
  {
    name: "rating-04",
    type: "registry:block",
    title: "rating-04",
    description:
      "Average score card with star row and per-star distribution bars.",
    files: [
      {
        path: "registry/blocks/ecommerce/reviews-and-ratings/rating-04/rating.tsx",
        type: "registry:component",
        target: "components/blocks/ecommerce/rating-04/rating.tsx",
      },
    ],
  },
  {
    name: "rating-05",
    type: "registry:block",
    title: "rating-05",
    description:
      "Dark review card with avatar header, star row, quote, and date.",
    files: [
      {
        path: "registry/blocks/ecommerce/reviews-and-ratings/rating-05/rating.tsx",
        type: "registry:component",
        target: "components/blocks/ecommerce/rating-05/rating.tsx",
      },
      {
        path: "registry/blocks/ecommerce/reviews-and-ratings/rating-05/avatar.webp",
        type: "registry:file",
        target: "components/blocks/ecommerce/rating-05/avatar.webp",
      },
    ],
  },
  {
    name: "rating-06",
    type: "registry:block",
    title: "rating-06",
    description:
      "Summary score with distribution bars and a sample review list item.",
    files: [
      {
        path: "registry/blocks/ecommerce/reviews-and-ratings/rating-06/rating.tsx",
        type: "registry:component",
        target: "components/blocks/ecommerce/rating-06/rating.tsx",
      },
      {
        path: "registry/blocks/ecommerce/reviews-and-ratings/rating-06/avatar.webp",
        type: "registry:file",
        target: "components/blocks/ecommerce/rating-06/avatar.webp",
      },
    ],
  },
  {
    name: "rating-07",
    type: "registry:block",
    title: "rating-07",
    description: "Stacked review list with avatars, stars, and timestamps.",
    files: [
      {
        path: "registry/blocks/ecommerce/reviews-and-ratings/rating-07/rating.tsx",
        type: "registry:component",
        target: "components/blocks/ecommerce/rating-07/rating.tsx",
      },
      {
        path: "registry/blocks/ecommerce/reviews-and-ratings/rating-07/avatar-01.webp",
        type: "registry:file",
        target: "components/blocks/ecommerce/rating-07/avatar-01.webp",
      },
      {
        path: "registry/blocks/ecommerce/reviews-and-ratings/rating-07/avatar-02.webp",
        type: "registry:file",
        target: "components/blocks/ecommerce/rating-07/avatar-02.webp",
      },
    ],
  },
  {
    name: "rating-08",
    type: "registry:block",
    title: "rating-08",
    description:
      "Score card with distribution bars and a Write a review action.",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/ecommerce/reviews-and-ratings/rating-08/rating.tsx",
        type: "registry:component",
        target: "components/blocks/ecommerce/rating-08/rating.tsx",
      },
    ],
  },
  marketingHeroBlock(
    "hero-01",
    "Split hero with primary radial wash, dual CTAs, brand logos, and KPI dashboard image.",
    [
      "brand-logo-1.webp",
      "brand-logo-2.webp",
      "brand-logo-3.webp",
      "brand-logo-4.webp",
      "kpi-dashboard.webp",
    ]
  ),
  marketingHeroBlock(
    "hero-02",
    "Centered productivity hero with gradient backdrop, responsive nav Sheet, dual CTAs, and KPI image.",
    ["bg-gradient.webp", "logo.svg", "kpi-img-3.webp"],
    ["button", "sheet"]
  ),
  marketingHeroBlock(
    "hero-03",
    "Centered productivity hero with eyebrow badge, nav Get started CTA, Sheet menu, and AI dashboard image.",
    ["logo.svg", "ai-dashboard.webp"],
    ["button", "sheet"]
  ),
  marketingHeroBlock(
    "hero-04",
    "Pill floating nav on primary wash backdrop, Get started CTA, Sheet menu, and KPI dashboard image.",
    ["logo.svg", "kpis-dashboard-img.webp"],
    ["button", "sheet"]
  ),
  marketingHeroBlock(
    "hero-05",
    "Split hero with eyebrow, dual CTAs, avatar social proof, and mobile app image.",
    [
      "logo.svg",
      "team-1.webp",
      "team-2.webp",
      "team-3.webp",
      "mobile-app-img-5.webp",
    ],
    ["button", "sheet"]
  ),
  marketingHeroBlock(
    "hero-06",
    "Split brand hero with stats row, dual CTAs, and two-column product gallery.",
    [
      "logo.svg",
      "face-primer-category.webp",
      "product6.webp",
      "product2.webp",
      "skin-glow-category.webp",
    ],
    ["button", "sheet"]
  ),
  marketingHeroBlock(
    "hero-07",
    "Full-bleed photo hero with dark overlay, light nav, dual CTAs, and avatar social proof.",
    [
      "logo.svg",
      "logo-white.svg",
      "real-estate-img.webp",
      "team-1.webp",
      "team-2.webp",
      "team-3.webp",
    ],
    ["button", "sheet"]
  ),
  marketingHeroBlock(
    "hero-08",
    "Split hero with full-bleed photo column, Sign up nav, dual CTAs, and avatar social proof.",
    [
      "logo.svg",
      "real-estate-img.webp",
      "team-1.webp",
      "team-2.webp",
      "team-3.webp",
    ],
    ["button", "sheet"]
  ),
  marketingHeroBlock(
    "hero-09",
    "Image-left split hero with accented headline and dual CTAs — no navigation chrome.",
    ["mobile-app-img-3.webp"],
    ["button"]
  ),
  marketingHeroBlock(
    "hero-10",
    "Centered marketing hero with primary radial wash, search pill, dual CTAs, and avatar social proof.",
    ["logo.svg", "team-1.webp", "team-2.webp", "team-3.webp"],
    ["button", "sheet"]
  ),
  {
    name: "hero-11",
    type: "registry:block",
    title: "hero-11",
    description:
      "Source & Stage hero — marketing copy with Design/Source toggle, live invite form over a code sheet (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["badge", "button", "field", "input"],
    files: [
      {
        path: "registry/blocks/marketing/hero/hero-11/hero.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/hero-11/hero.tsx",
      },
    ],
  },
  {
    name: "hero-12",
    type: "registry:block",
    title: "hero-12",
    description:
      "Full-bleed video background hero — muted looping film, dark scrim, dual CTAs, and feature stats.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/hero/hero-12/hero.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/hero-12/hero.tsx",
      },
      {
        path: "registry/blocks/marketing/hero/hero-12/media/flower.mp4",
        type: "registry:file",
        target: "components/blocks/marketing/hero-12/media/flower.mp4",
      },
    ],
  },
  marketingNewsletterBlock(
    "newsletter-01",
    "Centered newsletter signup with email Input, Subscribe Button, and short supporting copy."
  ),
  marketingNewsletterBlock(
    "newsletter-02",
    "Card newsletter with mail illustration, secret-deals copy, and email Input plus Subscribe."
  ),
  marketingNewsletterBlock(
    "newsletter-03",
    "Full-bleed muted band with combined email field and Subscribe Button in one control.",
    { registryDependencies: ["button"] }
  ),
  marketingNewsletterBlock(
    "newsletter-04",
    "Split muted panel — copy on the start side, email Input and Subscribe on the end."
  ),
  marketingNewsletterBlock(
    "newsletter-05",
    "Soft rounded card with mail illustration, centered copy, and combined subscribe control.",
    { registryDependencies: ["button"] }
  ),
  marketingNewsletterBlock(
    "newsletter-06",
    "Full-bleed photo newsletter with dark overlay, light copy, and combined subscribe control.",
    {
      images: ["real-estate-img.webp"],
      registryDependencies: ["button"],
    }
  ),
  marketingNewsletterBlock(
    "newsletter-07",
    "Dark split newsletter with subscribe form and two perk cards plus unsubscribe footnote.",
    { registryDependencies: ["button"] }
  ),
  marketingNewsletterBlock(
    "newsletter-08",
    "Primary gradient band with overlapping card form (email Input + Subscribe) hanging below."
  ),
  marketingNewsletterBlock(
    "newsletter-09",
    "Start-aligned muted panel with Newsletter headline, copy, and email Input plus Subscribe."
  ),
  marketingNewsletterBlock(
    "newsletter-10",
    "Newsletter popup dialog — teaser stage, email subscribe form, and success state.",
    {
      registryDependencies: ["button", "dialog", "input", "label"],
    }
  ),
  marketingBlogBlock(
    "blog-01",
    "Latest posts header with a responsive 1/2/3-column card grid and local cover images.",
    BLOG_01_IMAGES
  ),
  marketingBlogBlock(
    "blog-02",
    "Centered Latest posts intro with padded card grid, cover images, date, and author meta.",
    BLOG_01_IMAGES
  ),
  marketingBlogBlock(
    "blog-03",
    "Editorial stacked essay list with date, hover title, author avatar, and arrow cue.",
    BLOG_03_IMAGES,
    { dependencies: ["lucide-react"] }
  ),
  marketingBlogBlock(
    "blog-04",
    "Minimal food story grid with cover images, date meta, and Read more arrow link.",
    BLOG_04_IMAGES,
    { dependencies: ["lucide-react"] }
  ),
  marketingBlogBlock(
    "blog-05",
    "Food card grid with hover zoom covers and primary date badge on the image corner.",
    BLOG_04_IMAGES
  ),
  marketingBlogBlock(
    "blog-06",
    "Tall cinematic covers with frosted glass meta panel and always-visible excerpt.",
    BLOG_04_IMAGES
  ),
  marketingBlogBlock(
    "blog-07",
    "Two-column horizontal post cards with cover thumb, date, author, and excerpt.",
    BLOG_07_IMAGES
  ),
  marketingBlogBlock(
    "blog-08",
    "Tall cover tiles with dark scrim, hover zoom, and bottom gradient title meta.",
    BLOG_08_IMAGES
  ),
  marketingBlogBlock(
    "blog-09",
    "Two-by-two wide cover tiles with dark scrim and bottom gradient title meta.",
    BLOG_09_IMAGES
  ),
  marketingBlogBlock(
    "blog-10",
    "Premium padded food cards with cover, date meta, and text See more link.",
    BLOG_04_IMAGES,
    { dependencies: ["lucide-react"] }
  ),
  marketingPortfolioBlock(
    "portfolio-01",
    "Featured case plus filtered project grid — primary-only badges, static filters, and a hard-stop closing CTA.",
    PORTFOLIO_IMAGES,
    {
      registryDependencies: ["badge", "button"],
      dependencies: ["lucide-react"],
    }
  ),
  marketingPortfolioBlock(
    "portfolio-02",
    "Case spotlight — filter chips, project rail (col-span-4), and detail stage (col-span-8).",
    PORTFOLIO_IMAGES,
    {
      registryDependencies: ["badge", "button"],
      dependencies: ["lucide-react"],
    }
  ),
  marketingPortfolioBlock(
    "portfolio-03",
    "Light kinetic studio — cream canvas with dark mode, marquee, magnetic featured cover, and orbiting thumbs.",
    PORTFOLIO_IMAGES,
    { dependencies: ["lucide-react"] }
  ),
  marketingPortfolioBlock(
    "portfolio-04",
    "Dark neon showreel — wide cover with a six-column thumbnail strip underneath.",
    PORTFOLIO_IMAGES,
    { dependencies: ["lucide-react"] }
  ),
  {
    name: "social-links-01",
    type: "registry:block",
    title: "social-links-01",
    description:
      "Creative social / link-in-bio page — glass profile card, tone-colored link stack, and soft atmosphere.",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["avatar", "badge"],
    files: [
      {
        path: "registry/blocks/marketing/social-links/social-links-01/social-links.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/social-links-01/social-links.tsx",
      },
    ],
  },
  {
    name: "social-links-02",
    type: "registry:block",
    title: "social-links-02",
    description:
      "Dark cinematic link-in-bio — cover photo, portrait, 2×2 destination grid, and Sono logo mark (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/marketing/social-links/social-links-02/social-links.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/social-links-02/social-links.tsx",
      },
      {
        path: "registry/blocks/marketing/social-links/social-links-02/images/logo.svg",
        type: "registry:file",
        target: "components/blocks/marketing/social-links-02/images/logo.svg",
      },
      {
        path: "registry/blocks/marketing/social-links/social-links-02/images/cover.webp",
        type: "registry:file",
        target: "components/blocks/marketing/social-links-02/images/cover.webp",
      },
      {
        path: "registry/blocks/marketing/social-links/social-links-02/images/portrait.webp",
        type: "registry:file",
        target: "components/blocks/marketing/social-links-02/images/portrait.webp",
      },
    ],
  },
  {
    name: "social-links-03",
    type: "registry:block",
    title: "social-links-03",
    description:
      "Split magazine social card — cover panel, portrait header, link stack, and Sono logo (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/social-links/social-links-03/social-links.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/social-links-03/social-links.tsx",
      },
      {
        path: "registry/blocks/marketing/social-links/social-links-03/images/logo.svg",
        type: "registry:file",
        target: "components/blocks/marketing/social-links-03/images/logo.svg",
      },
      {
        path: "registry/blocks/marketing/social-links/social-links-03/images/cover.webp",
        type: "registry:file",
        target: "components/blocks/marketing/social-links-03/images/cover.webp",
      },
      {
        path: "registry/blocks/marketing/social-links/social-links-03/images/portrait.webp",
        type: "registry:file",
        target: "components/blocks/marketing/social-links-03/images/portrait.webp",
      },
    ],
  },
  {
    name: "social-links-04",
    type: "registry:block",
    title: "social-links-04",
    description:
      "Simple SonoJS-site social card — logo wordmark, muted nav-style links, and primary Get started (RTL/LTR).",
    cssVars: SOFT_SURFACE_CSS_VARS,
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/blocks/marketing/social-links/social-links-04/social-links.tsx",
        type: "registry:component",
        target: "components/blocks/marketing/social-links-04/social-links.tsx",
      },
      {
        path: "registry/blocks/marketing/social-links/social-links-04/images/logo.svg",
        type: "registry:file",
        target: "components/blocks/marketing/social-links-04/images/logo.svg",
      },
    ],
  },
  marketingContentSectionBlock(
    "content-section-01",
    "Editorial analytics split: accent rail copy, metric chips, and framed KPI dashboard media.",
    ["kpis-dashboard.webp"]
  ),
  marketingContentSectionBlock(
    "content-section-02",
    "Creative workspace: soft checklist rows, dual CTAs, and elevated illustration panel.",
    ["insights-illus.webp"],
    {
      registryDependencies: ["button"],
      dependencies: ["lucide-react"],
    }
  ),
  marketingContentSectionBlock(
    "content-section-03",
    "Numbered why-choose cards with gradient accent bars and hover lift."
  ),
  marketingContentSectionBlock(
    "content-section-04",
    "Premium bento: dark featured tile spanning two columns plus numbered feature cards.",
    [],
    { dependencies: ["lucide-react"] }
  ),
  marketingContentSectionBlock(
    "content-section-05",
    "Alternating full-bleed story bands with step badges and media frames.",
    ["insights-illus.webp", "kpi-img-3.webp"],
    {
      registryDependencies: ["button"],
      dependencies: ["lucide-react"],
    }
  ),
  marketingContentSectionBlock(
    "content-section-06",
    "Magazine header split with vertical rule, then soft icon feature cards.",
    [],
    { dependencies: ["lucide-react"] }
  ),
  marketingContentSectionBlock(
    "content-section-07",
    "Playbook story cards with cover media, tags, and outline CTAs.",
    ["digital-img-1.webp", "digital-img-4.webp"],
    {
      registryDependencies: ["button"],
      dependencies: ["lucide-react"],
    }
  ),
  marketingContentSectionBlock(
    "content-section-08",
    "Asymmetric intro with numbered hover feature grid and colorful SVG marks."
  ),
  marketingContentSectionBlock(
    "content-section-09",
    "Cinematic dark story: full-bleed hero fade, polaroid corner, lightbulb callout.",
    ["portrait-corner.jpg", "hero-portrait.jpg"],
    { dependencies: ["lucide-react"] }
  ),
  marketingContentSectionBlock(
    "content-section-10",
    "Display typography intro with framed widget, pencil mark, and underlined CTA.",
    ["widget.png", "icon-orange-pencil.svg"]
  ),
  marketingContentSectionBlock(
    "content-section-11",
    "Sticky dark editorial: violet glow, accent rail, and framed robot illustration.",
    ["image-robot.png"]
  ),
  marketingContentSectionBlock(
    "content-section-12",
    "Soft violet product hero with live pill, checklist card, and overlapping media stack.",
    ["black-red-lines.svg", "frame-apps-avatar.png", "join-box.png"]
  ),
  applicationDashboardLayoutBlock(
    "dashboard-layout-01",
    "Sono Studio analytics shell: sectioned drawer sidebar, sticky search header, KPI grid, traffic panels, and local logo/avatar (RTL/LTR).",
    ["logo.svg", "avatar.webp"]
  ),
  applicationDashboardLayoutBlock(
    "dashboard-layout-02",
    "Sono Console ops board: primary accordion sidebar, nested links, sticky header search, sidebar user card, and local logo/avatars (RTL/LTR).",
    ["logo.svg", "avatar.webp", "avatar-sidebar.webp"]
  ),
  applicationDashboardLayoutBlock(
    "dashboard-layout-03",
    "Sono Workspace team table: flat sidebar with in-nav search, sticky notifications header, filters, data table, and local logo/avatars (RTL/LTR).",
    ["logo.svg", "avatar.webp", "avatar-sidebar.webp"]
  ),
  marketingTeamBlock(
    "team-01",
    "Premium portrait grid with eyebrow, 4:5 photo cards, and soft hover lift.",
    TEAM_PORTRAITS_6
  ),
  marketingTeamBlock(
    "team-02",
    "Editorial team cards with bio plus inline LinkedIn / X icons and local portraits.",
    TEAM_PORTRAITS_6
  ),
  marketingTeamBlock(
    "team-03",
    "Cinematic full-bleed portrait cards with gradient overlay and name/role.",
    TEAM_PORTRAITS_6
  ),
  marketingTeamBlock(
    "team-04",
    "Dense gallery grid (up to four columns) with photo tiles, names, and roles.",
    TEAM_PORTRAITS_6
  ),
  marketingTeamBlock(
    "team-05",
    "Minimal circular avatar grid with generous spacing and local portraits.",
    TEAM_PORTRAITS_6
  ),
  marketingTeamBlock(
    "team-06",
    "Floating avatar cards with overlapping photos and LinkedIn / X links.",
    TEAM_PORTRAITS_6
  ),
  marketingTeamBlock(
    "team-07",
    "Muted roster band with horizontal avatar + name/role rows (RTL-aware flex).",
    TEAM_PORTRAITS_6
  ),
  marketingTeamBlock(
    "team-08",
    "Interactive circular portrait cards with hover scale and local images.",
    TEAM_PORTRAITS_6
  ),
  marketingTeamBlock(
    "team-09",
    "Editorial split cards with photo, bio, and inline LinkedIn / X icons.",
    ["team-01.webp", "team-03.webp", "team-04.webp", "team-05.webp"]
  ),
  marketingTeamBlock(
    "team-10",
    "Location cards with photo and floating name/role panel (logical end edge).",
    TEAM_PORTRAITS_6
  ),
  marketingPricingBlock(
    "pricing-01",
    "Premium three-tier cards with atmospheric header, Popular lift, inline checks, and CTAs."
  ),
  marketingPricingBlock(
    "pricing-02",
    "Billing toggle with yearly savings hint, include/exclude checklist, and featured Popular card."
  ),
  marketingPricingBlock(
    "pricing-03",
    "Scrollable comparison table with Popular column accent, check/cross cells, and plan CTAs."
  ),
  marketingPricingBlock(
    "pricing-04",
    "Two-plan cinematic stack with zinc-950 featured panel (theme-stable) and recommended badge."
  ),
  marketingPricingBlock(
    "pricing-05",
    "Soft rounded cards with monthly/yearly toggle, free-months chip, and hairline dividers."
  ),
  marketingPricingBlock(
    "pricing-06",
    "Center spotlight plan with scale, Best value badge, billing toggle, and inline checks."
  ),
  marketingPricingBlock(
    "pricing-07",
    "Categorized feature matrix with Popular column, free/paid plans, and inline check/cross icons."
  ),
  marketingPricingBlock(
    "pricing-08",
    "Three pricing cards plus a categorized comparison table with inline SVG icons."
  ),
  marketingPricingBlock(
    "pricing-09",
    "Three-up pricing with solid primary featured card, white CTA, and soft glow accents."
  ),
  marketingPricingBlock(
    "pricing-10",
    "Four-column pricing with dark billing toggle, Best seller zinc panel, and yearly savings chip."
  ),
  {
    name: "mega-menu-01",
    type: "registry:block",
    title: "mega-menu-01",
    description:
      "Services mega menu with four category columns, promo image, and Sign up.",
    registryDependencies: ["button", "collapsible", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mega-menu/mega-menu-01/mega-menu.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/mega-menu-01/mega-menu.tsx",
      },
      {
        path: "registry/blocks/navigation/mega-menu/mega-menu-01/promo.webp",
        type: "registry:file",
        target: "components/blocks/navigation/mega-menu-01/promo.webp",
      },
    ],
  },
  {
    name: "mega-menu-02",
    type: "registry:block",
    title: "mega-menu-02",
    description:
      "Institute Services mega dropdown with three CSS columns for governance, research, and training.",
    registryDependencies: ["button", "collapsible", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mega-menu/mega-menu-02/mega-menu.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/mega-menu-02/mega-menu.tsx",
      },
    ],
  },
  {
    name: "mega-menu-03",
    type: "registry:block",
    title: "mega-menu-03",
    description:
      "Products mega menu with five striped apparel and gadgets columns.",
    registryDependencies: ["button", "collapsible", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mega-menu/mega-menu-03/mega-menu.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/mega-menu-03/mega-menu.tsx",
      },
    ],
  },
  {
    name: "mega-menu-04",
    type: "registry:block",
    title: "mega-menu-04",
    description:
      "Features mega menu with icon cards, descriptions, and a release promo panel.",
    registryDependencies: ["button", "collapsible", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mega-menu/mega-menu-04/mega-menu.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/mega-menu-04/mega-menu.tsx",
      },
      {
        path: "registry/blocks/navigation/mega-menu/mega-menu-04/promo.webp",
        type: "registry:file",
        target: "components/blocks/navigation/mega-menu-04/promo.webp",
      },
    ],
  },
  {
    name: "mega-menu-05",
    type: "registry:block",
    title: "mega-menu-05",
    description:
      "Tools mega menu with brand app cards and a release promo panel.",
    registryDependencies: ["button", "collapsible", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mega-menu/mega-menu-05/mega-menu.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/mega-menu-05/mega-menu.tsx",
      },
      {
        path: "registry/blocks/navigation/mega-menu/mega-menu-05/promo.webp",
        type: "registry:file",
        target: "components/blocks/navigation/mega-menu-05/promo.webp",
      },
      ...navBlockIconFiles("mega-menu-05", megaMenu05ToolIcons),
    ],
  },
  {
    name: "mega-menu-06",
    type: "registry:block",
    title: "mega-menu-06",
    description:
      "Company mega menu with icon links in a compact three-column panel, Login, and Sign Up.",
    registryDependencies: ["button", "collapsible", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mega-menu/mega-menu-06/mega-menu.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/mega-menu-06/mega-menu.tsx",
      },
      {
        path: "registry/blocks/navigation/mega-menu/mega-menu-06/logo.svg",
        type: "registry:file",
        target: "components/blocks/navigation/mega-menu-06/logo.svg",
      },
    ],
  },
  {
    name: "command-menu-01",
    type: "registry:block",
    title: "command-menu-01",
    description:
      "Embedded Quick create command palette for documents, tasks, projects, and AI draft.",
    registryDependencies: ["command"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/command-menu/command-menu-01/command-menu.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/command-menu-01/command-menu.tsx",
      },
    ],
  },
  {
    name: "command-menu-02",
    type: "registry:block",
    title: "command-menu-02",
    description:
      "Global ⌘K app launcher with Go to / Actions groups and a keyboard hint footer.",
    registryDependencies: ["badge", "button", "command", "kbd"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/command-menu/command-menu-02/command-menu.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/command-menu-02/command-menu.tsx",
      },
    ],
  },
  {
    name: "command-menu-03",
    type: "registry:block",
    title: "command-menu-03",
    description:
      "People scout command dialog with department filter chips and match highlighting.",
    registryDependencies: ["avatar", "badge", "button", "command"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/command-menu/command-menu-03/command-menu.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/command-menu-03/command-menu.tsx",
      },
    ],
  },
  {
    name: "command-menu-04",
    type: "registry:block",
    title: "command-menu-04",
    description:
      "IDE-style jump-to-file command dialog with path rows and extension badges.",
    registryDependencies: ["badge", "button", "command", "kbd"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/command-menu/command-menu-04/command-menu.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/command-menu-04/command-menu.tsx",
      },
    ],
  },
  {
    name: "command-menu-05",
    type: "registry:block",
    title: "command-menu-05",
    description:
      "Split-pane integration studio with list, detail panel, enable switch, and mobile back.",
    registryDependencies: ["button", "command", "switch"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/command-menu/command-menu-05/command-menu.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/command-menu-05/command-menu.tsx",
      },
    ],
  },
  {
    name: "command-menu-06",
    type: "registry:block",
    title: "command-menu-06",
    description:
      "Slash studio command dialog for AI generate and editor insert actions.",
    registryDependencies: ["button", "command"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/command-menu/command-menu-06/command-menu.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/command-menu-06/command-menu.tsx",
      },
    ],
  },
  {
    name: "sidebar-01",
    type: "registry:block",
    title: "sidebar-01",
    description:
      "Simple sidebar with brand mark, Dashboard, and Information, Income, and Actions sections.",
    registryDependencies: [],
    dependencies: [],
    files: [
      {
        path: "registry/blocks/navigation/sidebar/sidebar-01/sidebar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/sidebar-01/sidebar.tsx",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-01/logo.svg",
        type: "registry:file",
        target: "components/blocks/navigation/sidebar-01/logo.svg",
      },
    ],
  },
  {
    name: "sidebar-02",
    type: "registry:block",
    title: "sidebar-02",
    description:
      "Sectioned sidebar with brand mark and Lucide icons beside Dashboard and nav links.",
    registryDependencies: [],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/sidebar/sidebar-02/sidebar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/sidebar-02/sidebar.tsx",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-02/logo.svg",
        type: "registry:file",
        target: "components/blocks/navigation/sidebar-02/logo.svg",
      },
    ],
  },
  {
    name: "sidebar-03",
    type: "registry:block",
    title: "sidebar-03",
    description:
      "Flat icon sidebar with brand mark and a user profile footer at the bottom.",
    registryDependencies: ["avatar"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/sidebar/sidebar-03/sidebar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/sidebar-03/sidebar.tsx",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-03/logo.svg",
        type: "registry:file",
        target: "components/blocks/navigation/sidebar-03/logo.svg",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-03/avatar.webp",
        type: "registry:file",
        target: "components/blocks/navigation/sidebar-03/avatar.webp",
      },
    ],
  },
  {
    name: "sidebar-04",
    type: "registry:block",
    title: "sidebar-04",
    description:
      "Sidebar with brand mark, Dashboard, and collapsible Information, Income, and Actions groups.",
    registryDependencies: ["collapsible"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/sidebar/sidebar-04/sidebar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/sidebar-04/sidebar.tsx",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-04/logo.svg",
        type: "registry:file",
        target: "components/blocks/navigation/sidebar-04/logo.svg",
      },
    ],
  },
  {
    name: "sidebar-05",
    type: "registry:block",
    title: "sidebar-05",
    description:
      "Sidebar with brand mark, Insights and Shared sections, collapse control, and user footer.",
    registryDependencies: ["avatar", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/sidebar/sidebar-05/sidebar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/sidebar-05/sidebar.tsx",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-05/logo.svg",
        type: "registry:file",
        target: "components/blocks/navigation/sidebar-05/logo.svg",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-05/avatar.webp",
        type: "registry:file",
        target: "components/blocks/navigation/sidebar-05/avatar.webp",
      },
    ],
  },
  {
    name: "sidebar-06",
    type: "registry:block",
    title: "sidebar-06",
    description:
      "Flat icon sidebar with brand mark, end-edge active accent, collapse control, and user footer.",
    registryDependencies: ["avatar", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/sidebar/sidebar-06/sidebar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/sidebar-06/sidebar.tsx",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-06/logo.svg",
        type: "registry:file",
        target: "components/blocks/navigation/sidebar-06/logo.svg",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-06/avatar.webp",
        type: "registry:file",
        target: "components/blocks/navigation/sidebar-06/avatar.webp",
      },
    ],
  },
  {
    name: "sidebar-07",
    type: "registry:block",
    title: "sidebar-07",
    description:
      "Sidebar with user initials header, search field, icon nav, and count badges.",
    registryDependencies: ["input-group"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/sidebar/sidebar-07/sidebar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/sidebar-07/sidebar.tsx",
      },
    ],
  },
  {
    name: "sidebar-08",
    type: "registry:block",
    title: "sidebar-08",
    description:
      "Card-surface sidebar with badges, stacked chat avatars, and collapsible Information and Income groups.",
    registryDependencies: ["avatar", "collapsible", "separator"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/sidebar/sidebar-08/sidebar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/sidebar-08/sidebar.tsx",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-08/chat-1.webp",
        type: "registry:file",
        target: "components/blocks/navigation/sidebar-08/chat-1.webp",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-08/chat-2.webp",
        type: "registry:file",
        target: "components/blocks/navigation/sidebar-08/chat-2.webp",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-08/chat-3.webp",
        type: "registry:file",
        target: "components/blocks/navigation/sidebar-08/chat-3.webp",
      },
    ],
  },
  {
    name: "sidebar-09",
    type: "registry:block",
    title: "sidebar-09",
    description:
      "Dual-rail app sidebar with team switcher, nested section panel, badges, and account footer.",
    registryDependencies: ["avatar", "dropdown-menu", "sidebar"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/sidebar/sidebar-09/sidebar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/sidebar-09/sidebar.tsx",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-09/app-sidebar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/sidebar-09/app-sidebar.tsx",
      },
      {
        path: "registry/blocks/navigation/sidebar/sidebar-09/team-switcher.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/sidebar-09/team-switcher.tsx",
      },
    ],
  },
  {
    name: "breadcrumbs-01",
    type: "registry:block",
    title: "breadcrumbs-01",
    description:
      "Centered breadcrumb trail: Home, Profile, and the current Edit page.",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "registry/blocks/navigation/breadcrumbs/breadcrumbs-01/breadcrumbs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/breadcrumbs-01/breadcrumbs.tsx",
      },
    ],
  },
  {
    name: "breadcrumbs-02",
    type: "registry:block",
    title: "breadcrumbs-02",
    description:
      "Centered breadcrumb with a home icon on the first link, then Profile and Edit.",
    registryDependencies: ["breadcrumb"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/breadcrumbs/breadcrumbs-02/breadcrumbs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/breadcrumbs-02/breadcrumbs.tsx",
      },
    ],
  },
  {
    name: "breadcrumbs-03",
    type: "registry:block",
    title: "breadcrumbs-03",
    description:
      "Centered breadcrumb with icons on every step: Home, Profile, and Edit.",
    registryDependencies: ["breadcrumb"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/breadcrumbs/breadcrumbs-03/breadcrumbs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/breadcrumbs-03/breadcrumbs.tsx",
      },
    ],
  },
  {
    name: "breadcrumbs-04",
    type: "registry:block",
    title: "breadcrumbs-04",
    description:
      "Centered icon breadcrumb using slash separators instead of chevrons.",
    registryDependencies: ["breadcrumb"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/breadcrumbs/breadcrumbs-04/breadcrumbs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/breadcrumbs-04/breadcrumbs.tsx",
      },
    ],
  },
  {
    name: "breadcrumbs-05",
    type: "registry:block",
    title: "breadcrumbs-05",
    description:
      "Centered breadcrumb with home icon and slash separators for Profile and Edit.",
    registryDependencies: ["breadcrumb"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/breadcrumbs/breadcrumbs-05/breadcrumbs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/breadcrumbs-05/breadcrumbs.tsx",
      },
    ],
  },
  {
    name: "breadcrumbs-06",
    type: "registry:block",
    title: "breadcrumbs-06",
    description:
      "Pill breadcrumb with icons, slash separators, and a filled current page chip.",
    registryDependencies: ["breadcrumb"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/breadcrumbs/breadcrumbs-06/breadcrumbs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/breadcrumbs-06/breadcrumbs.tsx",
      },
    ],
  },
  {
    name: "breadcrumbs-07",
    type: "registry:block",
    title: "breadcrumbs-07",
    description:
      "Compact bordered breadcrumb panel with home icon and chevron trail.",
    registryDependencies: ["breadcrumb"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/breadcrumbs/breadcrumbs-07/breadcrumbs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/breadcrumbs-07/breadcrumbs.tsx",
      },
    ],
  },
  {
    name: "breadcrumbs-08",
    type: "registry:block",
    title: "breadcrumbs-08",
    description:
      "Breadcrumb with home icon, collapsed ellipsis dropdown, Profile, and Edit.",
    registryDependencies: ["breadcrumb", "button", "dropdown-menu"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/breadcrumbs/breadcrumbs-08/breadcrumbs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/breadcrumbs-08/breadcrumbs.tsx",
      },
    ],
  },
  {
    name: "breadcrumbs-09",
    type: "registry:block",
    title: "breadcrumbs-09",
    description:
      "Overlapping pill segments ending in a primary current-page chip.",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "registry/blocks/navigation/breadcrumbs/breadcrumbs-09/breadcrumbs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/breadcrumbs-09/breadcrumbs.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-01",
    type: "registry:block",
    title: "mobile-navigation-01",
    description:
      "Classic edge-to-edge tab bar with Home, Search, Bag, and Profile labels.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-01/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-01/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-02",
    type: "registry:block",
    title: "mobile-navigation-02",
    description:
      "Soft muted tab bar with a filled pill on the active item.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-02/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-02/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-03",
    type: "registry:block",
    title: "mobile-navigation-03",
    description:
      "Five media tabs with a sliding primary indicator under the active item.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-03/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-03/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-04",
    type: "registry:block",
    title: "mobile-navigation-04",
    description:
      "Floating rounded dock with labeled tabs and a center create action.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-04/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-04/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-05",
    type: "registry:block",
    title: "mobile-navigation-05",
    description:
      "Full-width tabs with unread badges on Mail and Alerts.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-05/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-05/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-06",
    type: "registry:block",
    title: "mobile-navigation-06",
    description:
      "Frosted floating dock with a sliding active pill and visible labels.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-06/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-06/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-07",
    type: "registry:block",
    title: "mobile-navigation-07",
    description:
      "Bottom tab bar with a raised center create FAB and labeled side items.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-07/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-07/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-08",
    type: "registry:block",
    title: "mobile-navigation-08",
    description:
      "Compact pill dock that expands the active tab to show its label.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-08/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-08/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-09",
    type: "registry:block",
    title: "mobile-navigation-09",
    description:
      "Workspace tabs with a top primary accent on the active item.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-09/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-09/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-10",
    type: "registry:block",
    title: "mobile-navigation-10",
    description:
      "Productivity dock with badges, center compose, and online profile avatar.",
    registryDependencies: ["avatar"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-10/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-10/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-11",
    type: "registry:block",
    title: "mobile-navigation-11",
    description:
      "Blur chrome tab bar with filled active glyphs, labels, and home indicator.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-11/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-11/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-12",
    type: "registry:block",
    title: "mobile-navigation-12",
    description:
      "Morphing dock where the active tab blooms into a labeled primary droplet.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-12/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-12/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-13",
    type: "registry:block",
    title: "mobile-navigation-13",
    description:
      "Floating primary pill bar with a bottom overflow sheet for secondary destinations.",
    registryDependencies: ["sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-13/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-13/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "mobile-navigation-14",
    type: "registry:block",
    title: "mobile-navigation-14",
    description:
      "Live status capsule above a compact tab bar that morphs with the active tab.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/mobile-navigation/mobile-navigation-14/mobile-navigation.tsx",
        type: "registry:component",
        target:
          "components/blocks/navigation/mobile-navigation-14/mobile-navigation.tsx",
      },
    ],
  },
  {
    name: "tabs-01",
    type: "registry:block",
    title: "tabs-01",
    description:
      "Product card with underline tabs for Overview, Features, Pricing, and FAQ.",
    registryDependencies: ["tabs"],
    files: [
      {
        path: "registry/blocks/navigation/tabs/tabs-01/tabs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/tabs-01/tabs.tsx",
      },
    ],
  },
  {
    name: "tabs-02",
    type: "registry:block",
    title: "tabs-02",
    description:
      "Account settings underline tabs with forms for General, Security, Notifications, and Billing.",
    registryDependencies: ["tabs", "button", "input", "label"],
    files: [
      {
        path: "registry/blocks/navigation/tabs/tabs-02/tabs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/tabs-02/tabs.tsx",
      },
    ],
  },
  {
    name: "tabs-03",
    type: "registry:block",
    title: "tabs-03",
    description:
      "Project folder tabs for Design, Code, Assets, and History.",
    registryDependencies: ["tabs"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/tabs/tabs-03/tabs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/tabs-03/tabs.tsx",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-03/images/hero.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-03/images/hero.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-03/images/pricing.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-03/images/pricing.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-03/images/footer.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-03/images/footer.webp",
      },
    ],
  },
  {
    name: "tabs-04",
    type: "registry:block",
    title: "tabs-04",
    description:
      "Analytics underline tabs with icon labels and metric panels.",
    registryDependencies: ["tabs"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/tabs/tabs-04/tabs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/tabs-04/tabs.tsx",
      },
    ],
  },
  {
    name: "tabs-05",
    type: "registry:block",
    title: "tabs-05",
    description:
      "Billing cycle segmented control with Monthly, Yearly, and Lifetime plan cards.",
    registryDependencies: ["tabs", "button"],
    files: [
      {
        path: "registry/blocks/navigation/tabs/tabs-05/tabs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/tabs-05/tabs.tsx",
      },
    ],
  },
  {
    name: "tabs-06",
    type: "registry:block",
    title: "tabs-06",
    description:
      "Design editor inspector with icon-only segmented tools and property panels.",
    registryDependencies: ["tabs", "label"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/tabs/tabs-06/tabs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/tabs-06/tabs.tsx",
      },
    ],
  },
  {
    name: "tabs-07",
    type: "registry:block",
    title: "tabs-07",
    description:
      "Inbox soft-pill filters with threaded message lists.",
    registryDependencies: ["tabs", "avatar"],
    files: [
      {
        path: "registry/blocks/navigation/tabs/tabs-07/tabs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/tabs-07/tabs.tsx",
      },
    ],
  },
  {
    name: "tabs-08",
    type: "registry:block",
    title: "tabs-08",
    description:
      "Fulfillment queue with underline status tabs, counts, and order rows.",
    registryDependencies: ["tabs", "button", "avatar"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/tabs/tabs-08/tabs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/tabs-08/tabs.tsx",
      },
    ],
  },
  {
    name: "tabs-09",
    type: "registry:block",
    title: "tabs-09",
    description:
      "Storefront collection with underline category tabs and product cards.",
    registryDependencies: ["tabs", "button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/tabs/tabs-09/tabs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/tabs-09/tabs.tsx",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-09/images/lamp.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-09/images/lamp.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-09/images/mugs.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-09/images/mugs.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-09/images/throw.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-09/images/throw.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-09/images/table.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-09/images/table.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-09/images/bowl.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-09/images/bowl.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-09/images/cushion.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-09/images/cushion.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-09/images/tray.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-09/images/tray.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-09/images/tote.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-09/images/tote.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-09/images/candles.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-09/images/candles.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-09/images/bundle.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-09/images/bundle.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-09/images/care-kit.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-09/images/care-kit.webp",
      },
      {
        path: "registry/blocks/navigation/tabs/tabs-09/images/gift-card.webp",
        type: "registry:file",
        target: "components/blocks/navigation/tabs-09/images/gift-card.webp",
      },
    ],
  },
  {
    name: "tabs-10",
    type: "registry:block",
    title: "tabs-10",
    description:
      "Full-width workspace switcher for Home, Projects, Team, and Reports.",
    registryDependencies: ["tabs", "button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/tabs/tabs-10/tabs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/tabs-10/tabs.tsx",
      },
    ],
  },
  {
    name: "tabs-11",
    type: "registry:block",
    title: "tabs-11",
    description:
      "CRM card shell with top-accent tabs for Leads, Deals, Contacts, Activities, and Reports.",
    registryDependencies: ["tabs", "button"],
    files: [
      {
        path: "registry/blocks/navigation/tabs/tabs-11/tabs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/tabs-11/tabs.tsx",
      },
    ],
  },
  {
    name: "tabs-12",
    type: "registry:block",
    title: "tabs-12",
    description:
      "Vertical settings navigation with profile forms, integrations, and danger zone.",
    registryDependencies: ["tabs", "button", "input", "label"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/tabs/tabs-12/tabs.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/tabs-12/tabs.tsx",
      },
    ],
  },
  {
    name: "navbar-01",
    type: "registry:block",
    title: "navbar-01",
    description: "Minimal navbar: logo, links, and one CTA.",
    registryDependencies: ["button", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/navbar/navbar-01/navbar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/navbar-01/navbar.tsx",
      },
    ],
  },
  {
    name: "navbar-02",
    type: "registry:block",
    title: "navbar-02",
    description:
      "SaaS navbar with product links, docs search shortcut, Changelog badge, and Start free trial.",
    registryDependencies: ["badge", "button", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/navbar/navbar-02/navbar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/navbar-02/navbar.tsx",
      },
    ],
  },
  {
    name: "navbar-03",
    type: "registry:block",
    title: "navbar-03",
    description:
      "Marketing navbar with brand on the start edge, centered links, and auth actions on the end.",
    registryDependencies: ["button", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/navbar/navbar-03/navbar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/navbar-03/navbar.tsx",
      },
    ],
  },
  {
    name: "navbar-04",
    type: "registry:block",
    title: "navbar-04",
    description: "Transparent navbar over a short hero.",
    registryDependencies: ["button", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/navbar/navbar-04/navbar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/navbar-04/navbar.tsx",
      },
    ],
  },
  {
    name: "navbar-05",
    type: "registry:block",
    title: "navbar-05",
    description:
      "Mega menu navbar with cascading Product, Solutions, and Resources panels.",
    registryDependencies: ["button", "navigation-menu", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/navbar/navbar-05/navbar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/navbar-05/navbar.tsx",
      },
    ],
  },
  {
    name: "navbar-06",
    type: "registry:block",
    title: "navbar-06",
    description:
      "E-commerce navbar with search, matching icon actions, and nested category mega menus.",
    registryDependencies: [
      "badge",
      "button",
      "dropdown-menu",
      "input",
      "navigation-menu",
    ],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/navbar/navbar-06/navbar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/navbar-06/navbar.tsx",
      },
    ],
  },
  {
    name: "navbar-07",
    type: "registry:block",
    title: "navbar-07",
    description: "Sticky navbar that stays pinned while the page scrolls.",
    registryDependencies: ["button", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/navbar/navbar-07/navbar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/navbar-07/navbar.tsx",
      },
    ],
  },
  {
    name: "navbar-08",
    type: "registry:block",
    title: "navbar-08",
    description:
      "Marketing navbar with end-aligned links, Resources mega menu, and auth actions.",
    registryDependencies: ["button", "navigation-menu", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/navbar/navbar-08/navbar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/navbar-08/navbar.tsx",
      },
      {
        path: "registry/blocks/navigation/navbar/navbar-08/story.webp",
        type: "registry:file",
        target: "components/blocks/navigation/navbar-08/story.webp",
      },
    ],
  },
  {
    name: "navbar-09",
    type: "registry:block",
    title: "navbar-09",
    description:
      "Marketing navbar with medium Resources mega — About, Support, Partners, and Customer stories panel.",
    registryDependencies: ["button", "navigation-menu", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/navbar/navbar-09/navbar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/navbar-09/navbar.tsx",
      },
      {
        path: "registry/blocks/navigation/navbar/navbar-09/story.webp",
        type: "registry:file",
        target: "components/blocks/navigation/navbar-09/story.webp",
      },
    ],
  },
  {
    name: "navbar-10",
    type: "registry:block",
    title: "navbar-10",
    description:
      "Marketing navbar with compact Resources menu — Data, Team hiring badge, and Blog.",
    registryDependencies: ["badge", "button", "navigation-menu", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/navbar/navbar-10/navbar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/navbar-10/navbar.tsx",
      },
    ],
  },
  {
    name: "navbar-11",
    type: "registry:block",
    title: "navbar-11",
    description:
      "Marketing navbar with start-aligned links and a nested Dropdown submenu.",
    registryDependencies: ["button", "dropdown-menu", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/navbar/navbar-11/navbar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/navbar-11/navbar.tsx",
      },
    ],
  },
  {
    name: "navbar-12",
    type: "registry:block",
    title: "navbar-12",
    description:
      "Marketing navbar with mobile Menu sheet, nested Dropdown, and a separate offcanvas panel.",
    registryDependencies: ["button", "dropdown-menu", "sheet"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/navigation/navbar/navbar-12/navbar.tsx",
        type: "registry:component",
        target: "components/blocks/navigation/navbar-12/navbar.tsx",
      },
    ],
  },
  {
    name: "chart",
    type: "registry:ui",
    title: "Chart",
    description:
      "Recharts helpers — ChartContainer, tooltip, legend, and theme CSS variables.",
    dependencies: ["recharts", "clsx", "tailwind-merge"],
    files: [
      {
        path: "packages/ui/src/components/chart.tsx",
        type: "registry:ui",
        target: "components/ui/chart.tsx",
      },
    ],
  },
  {
    name: "chart-mock-data",
    type: "registry:lib",
    title: "Chart mock data",
    description:
      "Recharts-compatible generateMockData (LCG) for gallery demos.",
    files: [
      {
        path: "registry/charts/_lib/chart-mock-data.ts",
        type: "registry:lib",
        target: "components/charts/_lib/chart-mock-data.ts",
      },
    ],
  },
  {
    name: "chart-styles",
    type: "registry:lib",
    title: "Chart styles",
    description:
      "Locked dual series (navy × orange), bar/line/area stage sizing, neon glow helpers, useChartDir, viewport + reduced-motion hooks.",
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
        "chart-mute": "#52525b",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
        "chart-mute": "#d4d4d8",
      },
    },
    files: [
      {
        path: "registry/charts/_lib/chart-styles.ts",
        type: "registry:lib",
        target: "components/charts/_lib/chart-styles.ts",
      },
      {
        path: "registry/charts/_lib/use-chart-dir.ts",
        type: "registry:lib",
        target: "components/charts/_lib/use-chart-dir.ts",
      },
      {
        path: "registry/charts/_lib/use-narrow-viewport.ts",
        type: "registry:lib",
        target: "components/charts/_lib/use-narrow-viewport.ts",
      },
      {
        path: "registry/charts/_lib/use-prefers-reduced-motion.ts",
        type: "registry:lib",
        target: "components/charts/_lib/use-prefers-reduced-motion.ts",
      },
      {
        path: "registry/charts/_lib/use-market-neon.ts",
        type: "registry:lib",
        target: "components/charts/_lib/use-market-neon.ts",
      },
      {
        path: "registry/charts/_lib/pie-tooltip.tsx",
        type: "registry:lib",
        target: "components/charts/_lib/pie-tooltip.tsx",
      },
      {
        path: "registry/charts/_lib/treemap-tooltip.tsx",
        type: "registry:lib",
        target: "components/charts/_lib/treemap-tooltip.tsx",
      },
    ],
  },
  {
    name: "stock-shared",
    type: "registry:lib",
    title: "Stock shared",
    description:
      "Candlestick, OHLC, Renko shapes, MarketCandle generators, and stock chart helpers (semantic up/down).",
    dependencies: ["recharts"],
    registryDependencies: ["chart-mock-data"],
    files: [
      {
        path: "registry/charts/_lib/stock-shared.tsx",
        type: "registry:lib",
        target: "components/charts/_lib/stock-shared.tsx",
      },
    ],
  },
  {
    name: "heatmap-shared",
    type: "registry:lib",
    title: "Heatmap shared",
    description:
      "Calendar and matrix SVG heatmap helpers — EN/Gregorian, RTL-aware layout.",
    registryDependencies: ["chart-styles"],
    files: [
      {
        path: "registry/charts/_lib/heatmap-shared.tsx",
        type: "registry:lib",
        target: "components/charts/_lib/heatmap-shared.tsx",
      },
    ],
  },
  {
    name: "sunburst-shared",
    type: "registry:lib",
    title: "Sunburst shared",
    description:
      "Sunburst tree colorize, name labels, and center disc — EN, locked palette shades.",
    registryDependencies: ["chart-styles"],
    files: [
      {
        path: "registry/charts/_lib/sunburst-shared.tsx",
        type: "registry:lib",
        target: "components/charts/_lib/sunburst-shared.tsx",
      },
    ],
  },
  {
    name: "gauge-shared",
    type: "registry:lib",
    title: "Gauge shared",
    description:
      "react-gauge-chart helpers — fixed stage, soft traffic ramp, English percent labels.",
    // lodash: peer of react-gauge-chart (undeclared) — required for lodash/isEqual
    dependencies: ["react-gauge-chart", "lodash"],
    registryDependencies: ["chart-styles"],
    files: [
      {
        path: "registry/charts/_lib/gauge-shared.tsx",
        type: "registry:lib",
        target: "components/charts/_lib/gauge-shared.tsx",
      },
      {
        path: "registry/charts/_lib/react-gauge-chart.d.ts",
        type: "registry:lib",
        target: "components/charts/_lib/react-gauge-chart.d.ts",
      },
    ],
  },
  {
    name: "hc-gauge-shared",
    type: "registry:lib",
    title: "Hc Gauge shared",
    description:
      "Highcharts gauge / solidgauge helpers — soft dial chrome, English labels, client mount.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["chart-styles"],
    files: [
      {
        path: "registry/charts/_lib/hc-gauge-shared.tsx",
        type: "registry:lib",
        target: "components/charts/_lib/hc-gauge-shared.tsx",
      },
    ],
  },
  {
    name: "simple-bar-chart",
    type: "registry:chart",
    title: "Simple Bar Chart",
    description:
      "Canonical grouped bar — Desktop×Mobile H1 2026, navy×orange, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/simple-bar-chart.tsx",
        type: "registry:component",
        target: "components/charts/simple-bar-chart.tsx",
      },
    ],
  },
  {
    name: "area-chart",
    type: "registry:chart",
    title: "Area Chart",
    description:
      "Dual overlapping monotone areas with neon glow (style-vega) — Desktop×Mobile H1 2026, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/area-chart.tsx",
        type: "registry:component",
        target: "components/charts/area-chart.tsx",
      },
    ],
  },
  {
    name: "stacked-area-chart",
    type: "registry:chart",
    title: "Stacked Area Chart",
    description:
      "Three stacked monotone areas with neon glow (style-vega) — Desktop×Mobile×Tablet, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/stacked-area-chart.tsx",
        type: "registry:component",
        target: "components/charts/stacked-area-chart.tsx",
      },
    ],
  },
  {
    name: "area-chart-range",
    type: "registry:chart",
    title: "Area Chart Range",
    description:
      "Single-series low–high temperature band with neon glow (style-vega) — metric tracks high, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/area-chart-range.tsx",
        type: "registry:component",
        target: "components/charts/area-chart-range.tsx",
      },
    ],
  },
  {
    name: "area-chart-connect-nulls",
    type: "registry:chart",
    title: "Area Chart Connect Nulls",
    description:
      "Single neon area — gap at nulls vs connectNulls bridge, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/area-chart-connect-nulls.tsx",
        type: "registry:component",
        target: "components/charts/area-chart-connect-nulls.tsx",
      },
    ],
  },
  {
    name: "cardinal-area-chart",
    type: "registry:chart",
    title: "Cardinal Area Chart",
    description:
      "Side-by-side monotone vs natural area curves with neon glow (style-vega) — metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/cardinal-area-chart.tsx",
        type: "registry:component",
        target: "components/charts/cardinal-area-chart.tsx",
      },
    ],
  },
  {
    name: "percent-area-chart",
    type: "registry:chart",
    title: "Percent Area Chart",
    description:
      "100% stacked areas with neon glow (style-vega) — Desktop×Mobile×Tablet share scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/percent-area-chart.tsx",
        type: "registry:component",
        target: "components/charts/percent-area-chart.tsx",
      },
    ],
  },
  {
    name: "synchronized-area-chart",
    type: "registry:chart",
    title: "Synchronized Area Chart",
    description:
      "Three syncId area panels with neon glow (style-vega) — Desktop, Mobile + Brush, Total; metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/synchronized-area-chart.tsx",
        type: "registry:component",
        target: "components/charts/synchronized-area-chart.tsx",
      },
    ],
  },
  {
    name: "tiny-area-chart",
    type: "registry:chart",
    title: "Tiny Area Chart",
    description:
      "Compact single-series area sparkline with neon glow (style-vega) — locked header chrome, no axes, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/tiny-area-chart.tsx",
        type: "registry:component",
        target: "components/charts/tiny-area-chart.tsx",
      },
    ],
  },
  {
    name: "area-chart-fill-by-value",
    type: "registry:chart",
    title: "Area Chart Fill By Value",
    description:
      "Single area fill split at y=0 with neon up/down (style-vega) — metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/area-chart-fill-by-value.tsx",
        type: "registry:component",
        target: "components/charts/area-chart-fill-by-value.tsx",
      },
    ],
  },
  {
    name: "area-chart-custom-animation",
    type: "registry:chart",
    title: "Area Chart Custom Animation",
    description:
      "Single neon area with custom 900ms entrance animation — metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/area-chart-custom-animation.tsx",
        type: "registry:component",
        target: "components/charts/area-chart-custom-animation.tsx",
      },
    ],
  },
  {
    name: "range-area-chart-custom-animation",
    type: "registry:chart",
    title: "Range Area Chart Custom Animation",
    description:
      "Neon [low, high] range area with custom 1200ms entrance animation — metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/range-area-chart-custom-animation.tsx",
        type: "registry:component",
        target: "components/charts/range-area-chart-custom-animation.tsx",
      },
    ],
  },
  {
    name: "area-chart-with-custom-events",
    type: "registry:chart",
    title: "Area Chart With Custom Events",
    description:
      "Neon step area with chart-root pointer events via getRelativeCoordinate — live event panel, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "chart-mock-data"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/area-chart-with-custom-events.tsx",
        type: "registry:component",
        target: "components/charts/area-chart-with-custom-events.tsx",
      },
    ],
  },
  {
    name: "prevent-right-click",
    type: "registry:chart",
    title: "Prevent Right Click",
    description:
      "Neon monotone area with onContextMenu preventDefault — metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "chart-mock-data"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/prevent-right-click.tsx",
        type: "registry:component",
        target: "components/charts/prevent-right-click.tsx",
      },
    ],
  },
  {
    name: "area-interactive",
    type: "registry:chart",
    title: "Area Interactive",
    description:
      "Toggle Store/Online period totals with neon glow (style-vega), then scrub a daily monotone area — RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/area-interactive.tsx",
        type: "registry:component",
        target: "components/charts/area-interactive.tsx",
      },
    ],
  },
  {
    name: "area-step",
    type: "registry:chart",
    title: "Area Step",
    description:
      "Single neon step area (type=step) — Store H1 2026, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/area-step.tsx",
        type: "registry:component",
        target: "components/charts/area-step.tsx",
      },
    ],
  },
  {
    name: "area-gradient",
    type: "registry:chart",
    title: "Area Gradient",
    description:
      "Stacked Store×Online natural areas with neon glow gradients (style-vega) — metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/area-gradient.tsx",
        type: "registry:component",
        target: "components/charts/area-gradient.tsx",
      },
    ],
  },
  {
    name: "market-cards",
    type: "registry:chart",
    title: "Market Cards",
    description:
      "Neon SVG area sparkline cards — 30-day up, KWD down, gold flat (style-vega glow); RTL-aware.",
    dependencies: [],
    registryDependencies: ["chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
        "chart-mute": "#52525b",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
        "chart-mute": "#d4d4d8",
      },
    },
    files: [
      {
        path: "registry/charts/area/market-cards.tsx",
        type: "registry:component",
        target: "components/charts/market-cards.tsx",
      },
    ],
  },
  {
    name: "chart-area-default",
    type: "registry:chart",
    title: "Area Default",
    description:
      "Classic single-series natural Store area — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/area/chart-area-default.tsx",
        type: "registry:component",
        target: "components/charts/chart-area-default.tsx",
      },
    ],
  },
  {
    name: "chart-area-linear",
    type: "registry:chart",
    title: "Area Linear",
    description:
      "Classic single-series linear Store area — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/area/chart-area-linear.tsx",
        type: "registry:component",
        target: "components/charts/chart-area-linear.tsx",
      },
    ],
  },
  {
    name: "chart-area-step",
    type: "registry:chart",
    title: "Area Step",
    description:
      "Classic single-series step Store area — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/area/chart-area-step.tsx",
        type: "registry:component",
        target: "components/charts/chart-area-step.tsx",
      },
    ],
  },
  {
    name: "chart-area-legend",
    type: "registry:chart",
    title: "Area Legend",
    description:
      "Classic stacked Desktop×Mobile natural areas with ChartLegend — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/area/chart-area-legend.tsx",
        type: "registry:component",
        target: "components/charts/chart-area-legend.tsx",
      },
    ],
  },
  {
    name: "chart-area-stacked",
    type: "registry:chart",
    title: "Area Stacked",
    description:
      "Classic stacked Desktop×Mobile natural areas — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/area/chart-area-stacked.tsx",
        type: "registry:component",
        target: "components/charts/chart-area-stacked.tsx",
      },
    ],
  },
  {
    name: "chart-area-stacked-expand",
    type: "registry:chart",
    title: "Area Stacked Expand",
    description:
      "Classic 100% stacked Desktop×Mobile natural areas (stackOffset expand) — locked chrome, share scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/area/chart-area-stacked-expand.tsx",
        type: "registry:component",
        target: "components/charts/chart-area-stacked-expand.tsx",
      },
    ],
  },
  {
    name: "chart-area-icons",
    type: "registry:chart",
    title: "Area Icons",
    description:
      "Classic stacked Desktop×Mobile natural areas with ChartLegend Lucide icons — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts", "lucide-react"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/area/chart-area-icons.tsx",
        type: "registry:component",
        target: "components/charts/chart-area-icons.tsx",
      },
    ],
  },
  {
    name: "chart-area-gradient",
    type: "registry:chart",
    title: "Area Gradient",
    description:
      "Classic stacked Store×Online natural areas with neon glow gradients (style-vega) — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/area/chart-area-gradient.tsx",
        type: "registry:component",
        target: "components/charts/chart-area-gradient.tsx",
      },
    ],
  },
  {
    name: "chart-area-axes",
    type: "registry:chart",
    title: "Area Axes",
    description:
      "Classic stacked Store×Online natural areas with sparse Y-axis (tickCount 3) — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/area/chart-area-axes.tsx",
        type: "registry:component",
        target: "components/charts/chart-area-axes.tsx",
      },
    ],
  },
  {
    name: "two-level-pie-chart",
    type: "registry:chart",
    title: "Two Level Pie Chart",
    description:
      "Nested region×channel pies — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/two-level-pie-chart.tsx",
        type: "registry:component",
        target: "components/charts/two-level-pie-chart.tsx",
      },
    ],
  },
  {
    name: "straight-angle-pie-chart",
    type: "registry:chart",
    title: "Straight Angle Pie Chart",
    description:
      "Half-pie (180→0) province share — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/straight-angle-pie-chart.tsx",
        type: "registry:component",
        target: "components/charts/straight-angle-pie-chart.tsx",
      },
    ],
  },
  {
    name: "custom-active-shape-pie-chart",
    type: "registry:chart",
    title: "Custom Active Shape Pie Chart",
    description:
      "Donut with expanded active sector and callout — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
      },
    },
    files: [
      {
        path: "registry/charts/pie/custom-active-shape-pie-chart.tsx",
        type: "registry:component",
        target: "components/charts/custom-active-shape-pie-chart.tsx",
      },
    ],
  },
  {
    name: "pie-chart-with-customized-label",
    type: "registry:chart",
    title: "Pie Chart With Customized Label",
    description:
      "Full pie with mid-slice percent labels — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
      },
    },
    files: [
      {
        path: "registry/charts/pie/pie-chart-with-customized-label.tsx",
        type: "registry:component",
        target: "components/charts/pie-chart-with-customized-label.tsx",
      },
    ],
  },
  {
    name: "pie-chart-with-padding-angle",
    type: "registry:chart",
    title: "Pie Chart With Padding Angle",
    description:
      "Thin rounded donut with slice gaps — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
      },
    },
    files: [
      {
        path: "registry/charts/pie/pie-chart-with-padding-angle.tsx",
        type: "registry:component",
        target: "components/charts/pie-chart-with-padding-angle.tsx",
      },
    ],
  },
  {
    name: "pie-chart-in-grid",
    type: "registry:chart",
    title: "Pie Chart In Grid",
    description:
      "CSS Grid of responsive donuts — layout teaching demo, RTL-aware chrome.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
      },
    },
    files: [
      {
        path: "registry/charts/pie/pie-chart-in-grid.tsx",
        type: "registry:component",
        target: "components/charts/pie-chart-in-grid.tsx",
      },
    ],
  },
  {
    name: "pie-with-gradient",
    type: "registry:chart",
    title: "Pie With Gradient",
    description:
      "Gradient donut with channel cards — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
      },
    },
    files: [
      {
        path: "registry/charts/pie/pie-with-gradient.tsx",
        type: "registry:component",
        target: "components/charts/pie-with-gradient.tsx",
      },
    ],
  },
  {
    name: "pie-donut-text",
    type: "registry:chart",
    title: "Pie Donut Text",
    description:
      "Donut with centered ring-total text — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/pie-donut-text.tsx",
        type: "registry:component",
        target: "components/charts/pie-donut-text.tsx",
      },
    ],
  },
  {
    name: "pie-interactive",
    type: "registry:chart",
    title: "Pie Interactive",
    description:
      "Month Select drives active donut sector — locked chrome, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "select"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/pie-interactive.tsx",
        type: "registry:component",
        target: "components/charts/pie-interactive.tsx",
      },
    ],
  },
  {
    name: "pie-stacked",
    type: "registry:chart",
    title: "Pie Stacked",
    description:
      "Nested Store×Online month rings — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/pie-stacked.tsx",
        type: "registry:component",
        target: "components/charts/pie-stacked.tsx",
      },
    ],
  },
  {
    name: "chart-pie-simple",
    type: "registry:chart",
    title: "Pie Simple",
    description:
      "Classic full pie of province sales share — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/chart-pie-simple.tsx",
        type: "registry:component",
        target: "components/charts/chart-pie-simple.tsx",
      },
    ],
  },
  {
    name: "chart-pie-separator-none",
    type: "registry:chart",
    title: "Pie Separator None",
    description:
      "Full pie with no slice separators — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/chart-pie-separator-none.tsx",
        type: "registry:component",
        target: "components/charts/chart-pie-separator-none.tsx",
      },
    ],
  },
  {
    name: "chart-pie-label",
    type: "registry:chart",
    title: "Pie Label",
    description:
      "Full pie with always-on value labels — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/chart-pie-label.tsx",
        type: "registry:component",
        target: "components/charts/chart-pie-label.tsx",
      },
    ],
  },
  {
    name: "chart-pie-label-custom",
    type: "registry:chart",
    title: "Pie Label Custom",
    description:
      "Full pie with custom value labels (no leader lines) — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/chart-pie-label-custom.tsx",
        type: "registry:component",
        target: "components/charts/chart-pie-label-custom.tsx",
      },
    ],
  },
  {
    name: "chart-pie-label-list",
    type: "registry:chart",
    title: "Pie Label List",
    description:
      "Full pie with on-slice province names via LabelList — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/chart-pie-label-list.tsx",
        type: "registry:component",
        target: "components/charts/chart-pie-label-list.tsx",
      },
    ],
  },
  {
    name: "chart-pie-legend",
    type: "registry:chart",
    title: "Pie Legend",
    description:
      "Full pie with wrapped ChartLegend — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/chart-pie-legend.tsx",
        type: "registry:component",
        target: "components/charts/chart-pie-legend.tsx",
      },
    ],
  },
  {
    name: "chart-pie-donut",
    type: "registry:chart",
    title: "Pie Donut",
    description:
      "Payment-method donut — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/chart-pie-donut.tsx",
        type: "registry:component",
        target: "components/charts/chart-pie-donut.tsx",
      },
    ],
  },
  {
    name: "chart-pie-donut-active",
    type: "registry:chart",
    title: "Pie Donut Active",
    description:
      "Donut with expanded active sector — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/chart-pie-donut-active.tsx",
        type: "registry:component",
        target: "components/charts/chart-pie-donut-active.tsx",
      },
    ],
  },
  {
    name: "chart-pie-donut-text",
    type: "registry:chart",
    title: "Pie Donut Text",
    description:
      "Classic donut with centered ring-total text — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/chart-pie-donut-text.tsx",
        type: "registry:component",
        target: "components/charts/chart-pie-donut-text.tsx",
      },
    ],
  },
  {
    name: "chart-radial-simple",
    type: "registry:chart",
    title: "Radial Simple",
    description:
      "Classic concentric radial bars of region sales — locked chrome, ring scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/radial/chart-radial-simple.tsx",
        type: "registry:component",
        target: "components/charts/chart-radial-simple.tsx",
      },
    ],
  },
  {
    name: "chart-radial-label",
    type: "registry:chart",
    title: "Radial Label",
    description:
      "Classic radial bars with inside-start name labels — locked chrome, ring scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/radial/chart-radial-label.tsx",
        type: "registry:component",
        target: "components/charts/chart-radial-label.tsx",
      },
    ],
  },
  {
    name: "chart-radial-grid",
    type: "registry:chart",
    title: "Radial Grid",
    description:
      "Classic radial bars with circular PolarGrid — locked chrome, ring scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/radial/chart-radial-grid.tsx",
        type: "registry:component",
        target: "components/charts/chart-radial-grid.tsx",
      },
    ],
  },
  {
    name: "chart-radial-text",
    type: "registry:chart",
    title: "Radial Text",
    description:
      "Classic partial radial ring with centered value text — locked chrome, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/radial/chart-radial-text.tsx",
        type: "registry:component",
        target: "components/charts/chart-radial-text.tsx",
      },
    ],
  },
  {
    name: "chart-radial-shape",
    type: "registry:chart",
    title: "Radial Shape",
    description:
      "Classic short radial arc with PolarGrid shape and centered value — locked chrome, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/radial/chart-radial-shape.tsx",
        type: "registry:component",
        target: "components/charts/chart-radial-shape.tsx",
      },
    ],
  },
  {
    name: "chart-radial-stacked",
    type: "registry:chart",
    title: "Radial Stacked",
    description:
      "Classic semicircle stacked Store×Online radial — locked navy×orange, centered total, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/radial/chart-radial-stacked.tsx",
        type: "registry:component",
        target: "components/charts/chart-radial-stacked.tsx",
      },
    ],
  },
  {
    name: "chart-pie-stacked",
    type: "registry:chart",
    title: "Pie Stacked",
    description:
      "Classic nested Store×Online month rings — locked chrome, ring scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/chart-pie-stacked.tsx",
        type: "registry:component",
        target: "components/charts/chart-pie-stacked.tsx",
      },
    ],
  },
  {
    name: "chart-pie-interactive",
    type: "registry:chart",
    title: "Pie Interactive",
    description:
      "Classic month Select drives active donut sector — locked chrome, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "select"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/pie/chart-pie-interactive.tsx",
        type: "registry:component",
        target: "components/charts/chart-pie-interactive.tsx",
      },
    ],
  },
  {
    name: "simple-line-chart",
    type: "registry:chart",
    title: "Simple Line Chart",
    description:
      "Dual monotone lines — Desktop×Mobile H1 2026, navy×orange, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/simple-line-chart.tsx",
        type: "registry:component",
        target: "components/charts/simple-line-chart.tsx",
      },
    ],
  },
  {
    name: "dashed-line-chart",
    type: "registry:chart",
    title: "Dashed Line Chart",
    description:
      "Dual dashed monotone lines — Desktop×Mobile H1 2026, navy×orange, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/dashed-line-chart.tsx",
        type: "registry:component",
        target: "components/charts/dashed-line-chart.tsx",
      },
    ],
  },
  {
    name: "vertical-line-chart",
    type: "registry:chart",
    title: "Vertical Line Chart",
    description:
      "Dual linear lines, layout=vertical — Desktop×Mobile H1 2026, navy×orange, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/vertical-line-chart.tsx",
        type: "registry:component",
        target: "components/charts/vertical-line-chart.tsx",
      },
    ],
  },
  {
    name: "line-chart-connect-nulls",
    type: "registry:chart",
    title: "Line Chart Connect Nulls",
    description:
      "Stacked gap vs connectNulls monotone lines — Desktop H1 2026 with a missing month, navy, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/line/line-chart-connect-nulls.tsx",
        type: "registry:component",
        target: "components/charts/line-chart-connect-nulls.tsx",
      },
    ],
  },
  {
    name: "line-chart-with-reference-lines",
    type: "registry:chart",
    title: "Line Chart With Reference Lines",
    description:
      "Dual monotone lines with month + value ReferenceLines — Desktop×Mobile H1 2026, navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/line-chart-with-reference-lines.tsx",
        type: "registry:component",
        target: "components/charts/line-chart-with-reference-lines.tsx",
      },
    ],
  },
  {
    name: "customized-label-line-chart",
    type: "registry:chart",
    title: "Customized Label Line Chart",
    description:
      "Dual monotone lines with alternating Desktop point labels and angled X ticks — navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/customized-label-line-chart.tsx",
        type: "registry:component",
        target: "components/charts/customized-label-line-chart.tsx",
      },
    ],
  },
  {
    name: "highlight-and-zoom-line-chart",
    type: "registry:chart",
    title: "Highlight And Zoom Line Chart",
    description:
      "Drag-to-zoom dual-axis Cost×Impressions lines with ReferenceArea highlight — navy×orange, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/highlight-and-zoom-line-chart.tsx",
        type: "registry:component",
        target: "components/charts/highlight-and-zoom-line-chart.tsx",
      },
    ],
  },
  {
    name: "line-chart-axis-interval",
    type: "registry:chart",
    title: "Line Chart Axis Interval",
    description:
      "Stacked Desktop×Mobile lines comparing Recharts axis interval presets — navy×orange, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "chart-mock-data"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/line-chart-axis-interval.tsx",
        type: "registry:component",
        target: "components/charts/line-chart-axis-interval.tsx",
      },
    ],
  },
  {
    name: "biaxial-line-chart",
    type: "registry:chart",
    title: "Biaxial Line Chart",
    description:
      "Dual Y-axis monotone lines — revenue×orders independent scales, navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/biaxial-line-chart.tsx",
        type: "registry:component",
        target: "components/charts/biaxial-line-chart.tsx",
      },
    ],
  },
  {
    name: "line-chart-with-x-axis-padding",
    type: "registry:chart",
    title: "Line Chart With X Axis Padding",
    description:
      "Dual monotone lines with XAxis padding — Desktop×Mobile H1 2026, navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/line-chart-with-x-axis-padding.tsx",
        type: "registry:component",
        target: "components/charts/line-chart-with-x-axis-padding.tsx",
      },
    ],
  },
  {
    name: "customized-dot-line-chart",
    type: "registry:chart",
    title: "Customized Dot Line Chart",
    description:
      "Dual monotone lines with smile/frown Desktop dots by threshold — navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
      },
    },
    files: [
      {
        path: "registry/charts/line/customized-dot-line-chart.tsx",
        type: "registry:component",
        target: "components/charts/customized-dot-line-chart.tsx",
      },
    ],
  },
  {
    name: "synchronized-line-chart",
    type: "registry:chart",
    title: "Synchronized Line Chart",
    description:
      "Three syncId panels — Desktop line, Mobile line + Brush, Total area; navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
      },
    },
    files: [
      {
        path: "registry/charts/line/synchronized-line-chart.tsx",
        type: "registry:component",
        target: "components/charts/synchronized-line-chart.tsx",
      },
    ],
  },
  {
    name: "synchronized-different-data",
    type: "registry:chart",
    title: "Synchronized Different Data",
    description:
      "Two syncId panels with different densities — closestDate syncMethod (±2 days), navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/synchronized-different-data.tsx",
        type: "registry:component",
        target: "components/charts/synchronized-different-data.tsx",
      },
    ],
  },
  {
    name: "line-chart-custom-shape",
    type: "registry:chart",
    title: "Line Chart Custom Shape",
    description:
      "Dual monotone lines with opacity-fade entrance shape — Desktop×Mobile H1 2026, navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/line-chart-custom-shape.tsx",
        type: "registry:component",
        target: "components/charts/line-chart-custom-shape.tsx",
      },
    ],
  },
  {
    name: "line-chart-has-multi-series",
    type: "registry:chart",
    title: "Line Chart Has Multi Series",
    description:
      "Overlapping multi-series lines (each Line owns partial categories) — New York×Chicago×Austin, navy×orange×amber, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
      },
    },
    files: [
      {
        path: "registry/charts/line/line-chart-has-multi-series.tsx",
        type: "registry:component",
        target: "components/charts/line-chart-has-multi-series.tsx",
      },
    ],
  },
  {
    name: "line-chart-negative-values-with-reference-lines",
    type: "registry:chart",
    title: "Line Chart Negative Values With Reference Lines",
    description:
      "Numeric X/Y path crossing the origin with zero ReferenceLines — navy, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/line/line-chart-negative-values-with-reference-lines.tsx",
        type: "registry:component",
        target:
          "components/charts/line-chart-negative-values-with-reference-lines.tsx",
      },
    ],
  },
  {
    name: "compare-two-lines",
    type: "registry:chart",
    title: "Compare Two Lines",
    description:
      "Hover-compare portfolio vs reinvestment (+ principal) — navy×orange gradients, delta ReferenceLine, metric header, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/compare-two-lines.tsx",
        type: "registry:component",
        target: "components/charts/compare-two-lines.tsx",
      },
    ],
  },
  {
    name: "dynamic-z-index-line-chart",
    type: "registry:chart",
    title: "Dynamic Z Index Line Chart",
    description:
      "Three monotone lines; legend hover dims a series and raises its z-index — navy×orange×amber, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
      },
    },
    files: [
      {
        path: "registry/charts/line/dynamic-z-index-line-chart.tsx",
        type: "registry:component",
        target: "components/charts/dynamic-z-index-line-chart.tsx",
      },
    ],
  },
  {
    name: "tiny-line-chart",
    type: "registry:chart",
    title: "Tiny Line Chart",
    description:
      "Compact single-series sparkline — locked header chrome, no axes, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/line/tiny-line-chart.tsx",
        type: "registry:component",
        target: "components/charts/tiny-line-chart.tsx",
      },
    ],
  },
  {
    name: "animated-time-series",
    type: "registry:chart",
    title: "Animated Time Series",
    description:
      "Sliding six-month window over a dual-series year — navy×orange, metric scrubber, pauses on scrub / reduced-motion.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/animated-time-series.tsx",
        type: "registry:component",
        target: "components/charts/animated-time-series.tsx",
      },
    ],
  },
  {
    name: "line-interactive",
    type: "registry:chart",
    title: "Line Interactive",
    description:
      "Toggle Store/Online period totals, then scrub a daily monotone line — navy×orange locked chrome, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/line-interactive.tsx",
        type: "registry:component",
        target: "components/charts/line-interactive.tsx",
      },
    ],
  },
  {
    name: "line-step",
    type: "registry:chart",
    title: "Line Step",
    description:
      "Dual step lines (type=step) — Desktop×Mobile H1 2026, navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/line-step.tsx",
        type: "registry:component",
        target: "components/charts/line-step.tsx",
      },
    ],
  },
  {
    name: "line-default",
    type: "registry:chart",
    title: "Line Default",
    description:
      "Classic single-series natural Store line — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/line/line-default.tsx",
        type: "registry:component",
        target: "components/charts/line-default.tsx",
      },
    ],
  },
  {
    name: "line-dots-colors",
    type: "registry:chart",
    title: "Line Dots Colors",
    description:
      "Natural sales line with per-region colored dots — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/line/line-dots-colors.tsx",
        type: "registry:component",
        target: "components/charts/line-dots-colors.tsx",
      },
    ],
  },
  {
    name: "line-label-custom",
    type: "registry:chart",
    title: "Line Label Custom",
    description:
      "Natural sales line with always-on region tip labels — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/line/line-label-custom.tsx",
        type: "registry:component",
        target: "components/charts/line-label-custom.tsx",
      },
    ],
  },
  {
    name: "line-bar-area-composed-chart",
    type: "registry:chart",
    title: "Line Bar Area Composed Chart",
    description:
      "Composed Area(orders) + Bar(online) + Line(store) — navy×orange×amber, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
      },
    },
    files: [
      {
        path: "registry/charts/composed/line-bar-area-composed-chart.tsx",
        type: "registry:component",
        target: "components/charts/line-bar-area-composed-chart.tsx",
      },
    ],
  },
  {
    name: "same-data-composed-chart",
    type: "registry:chart",
    title: "Same Data Composed Chart",
    description:
      "Composed Bar + trend Line on one sales series — navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/composed/same-data-composed-chart.tsx",
        type: "registry:component",
        target: "components/charts/same-data-composed-chart.tsx",
      },
    ],
  },
  {
    name: "vertical-composed-chart",
    type: "registry:chart",
    title: "Vertical Composed Chart",
    description:
      "Vertical layout sales bars with target line — navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/composed/vertical-composed-chart.tsx",
        type: "registry:component",
        target: "components/charts/vertical-composed-chart.tsx",
      },
    ],
  },
  {
    name: "composed-chart-with-axis-labels",
    type: "registry:chart",
    title: "Composed Chart With Axis Labels",
    description:
      "Dual-axis revenue/cost/margin composed chart with axis labels — navy×orange×amber, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
      },
    },
    files: [
      {
        path: "registry/charts/composed/composed-chart-with-axis-labels.tsx",
        type: "registry:component",
        target: "components/charts/composed-chart-with-axis-labels.tsx",
      },
    ],
  },
  {
    name: "scatter-and-line-of-best-fit",
    type: "registry:chart",
    title: "Scatter And Line Of Best Fit",
    description:
      "Ad spend vs sales scatter with dashed OLS fit — navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/composed/scatter-and-line-of-best-fit.tsx",
        type: "registry:component",
        target: "components/charts/scatter-and-line-of-best-fit.tsx",
      },
    ],
  },
  {
    name: "banded-chart",
    type: "registry:chart",
    title: "Banded Chart",
    description:
      "Confidence band Area + actual sales Line — navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/composed/banded-chart.tsx",
        type: "registry:component",
        target: "components/charts/banded-chart.tsx",
      },
    ],
  },
  {
    name: "target-price-chart",
    type: "registry:chart",
    title: "Target Price Chart",
    description:
      "Share price, consensus range, dashed analyst target — navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/composed/target-price-chart.tsx",
        type: "registry:component",
        target: "components/charts/target-price-chart.tsx",
      },
    ],
  },
  {
    name: "asset-returns",
    type: "registry:chart",
    title: "Asset Returns",
    description:
      "Horizontal asset return % bars with lookback tabs and max/min stats — navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts", "lucide-react"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/stock/asset-returns.tsx",
        type: "registry:component",
        target: "components/charts/asset-returns.tsx",
      },
    ],
  },
  {
    name: "monthly-savings",
    type: "registry:chart",
    title: "Monthly Savings",
    description:
      "Compound monthly balance by savings channel with rounded-top bars — navy×orange, metric scrubber, RTL-aware.",
    dependencies: ["recharts", "lucide-react"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/stock/monthly-savings.tsx",
        type: "registry:component",
        target: "components/charts/monthly-savings.tsx",
      },
    ],
  },
  {
    name: "candlestick",
    type: "registry:chart",
    title: "Candlestick",
    description:
      "OHLC candlesticks with custom wick/body shape — semantic up/down, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/candlestick.tsx",
        type: "registry:component",
        target: "components/charts/candlestick.tsx",
      },
    ],
  },
  {
    name: "candlestick-dashboard",
    type: "registry:chart",
    title: "Candlestick Dashboard",
    description:
      "Symbol KPI card + OHLC candles + volume strip — semantic up/down, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/candlestick-dashboard.tsx",
        type: "registry:component",
        target: "components/charts/candlestick-dashboard.tsx",
      },
    ],
  },
  {
    name: "candlestick-bar",
    type: "registry:chart",
    title: "Candlestick Bar",
    description:
      "Synced OHLC candles + signed change bars with Brush — semantic up/down, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/candlestick-bar.tsx",
        type: "registry:component",
        target: "components/charts/candlestick-bar.tsx",
      },
    ],
  },
  {
    name: "candlestick-category",
    type: "registry:chart",
    title: "Candlestick Category",
    description:
      "Category-axis OHLC candles with dashed news ReferenceLine — semantic up/down, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/candlestick-category.tsx",
        type: "registry:component",
        target: "components/charts/candlestick-category.tsx",
      },
    ],
  },
  {
    name: "candlestick-line",
    type: "registry:chart",
    title: "Candlestick Line",
    description:
      "OHLC candles with SMA overlay line — semantic up/down + orange SMA, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/candlestick-line.tsx",
        type: "registry:component",
        target: "components/charts/candlestick-line.tsx",
      },
    ],
  },
  {
    name: "sparklines",
    type: "registry:chart",
    title: "Sparklines",
    description:
      "KPI area spark cards + watchlist trend/volume minis — navy×orange×amber, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/sparklines.tsx",
        type: "registry:component",
        target: "components/charts/sparklines.tsx",
      },
    ],
  },
  {
    name: "stock-ohlc",
    type: "registry:chart",
    title: "Stock Ohlc",
    description:
      "Classic OHLC bars (H–L stem, open/close ticks) — semantic up/down, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/stock-ohlc.tsx",
        type: "registry:component",
        target: "components/charts/stock-ohlc.tsx",
      },
    ],
  },
  {
    name: "stock-line",
    type: "registry:chart",
    title: "Stock Line",
    description:
      "Close-price area with gradient fill + symbol card — navy stroke, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/stock-line.tsx",
        type: "registry:component",
        target: "components/charts/stock-line.tsx",
      },
    ],
  },
  {
    name: "stock-column",
    type: "registry:chart",
    title: "Stock Column",
    description:
      "Close as columns tinted bullish/bearish per bar — semantic up/down, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/stock-column.tsx",
        type: "registry:component",
        target: "components/charts/stock-column.tsx",
      },
    ],
  },
  {
    name: "stock-with-volume",
    type: "registry:chart",
    title: "Stock With Volume",
    description:
      "Synced OHLC candles + volume strip tinted by direction — semantic up/down, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/stock-with-volume.tsx",
        type: "registry:component",
        target: "components/charts/stock-with-volume.tsx",
      },
    ],
  },
  {
    name: "stock-multi-series",
    type: "registry:chart",
    title: "Stock Multi Series",
    description:
      "Indexed multi-ticker relative returns — navy×orange×amber lines, summary cards, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: [
      "chart",
      "chart-styles",
      "chart-mock-data",
      "stock-shared",
    ],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/stock-multi-series.tsx",
        type: "registry:component",
        target: "components/charts/stock-multi-series.tsx",
      },
    ],
  },
  {
    name: "stock-trendline",
    type: "registry:chart",
    title: "Stock Trendline",
    description:
      "Close price + dashed SMA overlay — navy×orange, symbol card, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/stock-trendline.tsx",
        type: "registry:component",
        target: "components/charts/stock-trendline.tsx",
      },
    ],
  },
  {
    name: "kpi-area-charts",
    type: "registry:chart",
    title: "KPI Area Charts",
    description:
      "KPI mini areas + hero dual series + stacked/share variants — navy×orange×amber, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/kpi-area-charts.tsx",
        type: "registry:component",
        target: "components/charts/kpi-area-charts.tsx",
      },
    ],
  },
  {
    name: "realtime-mountain-chart",
    type: "registry:chart",
    title: "Realtime Mountain Chart",
    description:
      "Live mountain area with pulsing tip + play/pause — semantic up/down stroke, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/realtime-mountain-chart.tsx",
        type: "registry:component",
        target: "components/charts/realtime-mountain-chart.tsx",
      },
    ],
  },
  {
    name: "realtime-candlestick",
    type: "registry:chart",
    title: "Realtime Candlestick",
    description:
      "Live forming OHLC candles + volume strip, sticky Y domain, play/pause — semantic up/down, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/realtime-candlestick.tsx",
        type: "registry:component",
        target: "components/charts/realtime-candlestick.tsx",
      },
    ],
  },
  {
    name: "heikin-ashi",
    type: "registry:chart",
    title: "Heikin Ashi",
    description:
      "Smoothed Heikin Ashi candles via toHeikinAshi — semantic up/down, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/heikin-ashi.tsx",
        type: "registry:component",
        target: "components/charts/heikin-ashi.tsx",
      },
    ],
  },
  {
    name: "renko-chart",
    type: "registry:chart",
    title: "Renko Chart",
    description:
      "Fixed brick-size Renko bricks via toRenko — semantic up/down, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: [
      "chart",
      "chart-styles",
      "chart-mock-data",
      "stock-shared",
    ],
    cssVars: {
      light: {
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/renko-chart.tsx",
        type: "registry:component",
        target: "components/charts/renko-chart.tsx",
      },
    ],
  },
  {
    name: "volume-profile",
    type: "registry:chart",
    title: "Volume Profile",
    description:
      "Horizontal volume-by-price bins with POC highlight — semantic up/down, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/volume-profile.tsx",
        type: "registry:component",
        target: "components/charts/volume-profile.tsx",
      },
    ],
  },
  {
    name: "order-book-depth",
    type: "registry:chart",
    title: "Order Book Depth",
    description:
      "Cumulative bid/ask step areas around mid — semantic up/down, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: [
      "chart",
      "chart-styles",
      "chart-mock-data",
      "stock-shared",
    ],
    cssVars: {
      light: {
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/order-book-depth.tsx",
        type: "registry:component",
        target: "components/charts/order-book-depth.tsx",
      },
    ],
  },
  {
    name: "drawdown-chart",
    type: "registry:chart",
    title: "Drawdown Chart",
    description:
      "Equity line + underwater drawdown area — dual synced panels, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/drawdown-chart.tsx",
        type: "registry:component",
        target: "components/charts/drawdown-chart.tsx",
      },
    ],
  },
  {
    name: "bollinger-bands",
    type: "registry:chart",
    title: "Bollinger Bands",
    description:
      "Close + SMA mid + ±σ band fill — stacked envelope, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: [
      "chart",
      "chart-styles",
      "chart-mock-data",
      "stock-shared",
    ],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#d97706",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/bollinger-bands.tsx",
        type: "registry:component",
        target: "components/charts/bollinger-bands.tsx",
      },
    ],
  },
  {
    name: "candlestick-indicators",
    type: "registry:chart",
    title: "Candlestick Indicators",
    description:
      "OHLC + RSI(14) + MACD(12,26,9) synced panels — metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#d97706",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/candlestick-indicators.tsx",
        type: "registry:component",
        target: "components/charts/candlestick-indicators.tsx",
      },
    ],
  },
  {
    name: "multi-timeframe",
    type: "registry:chart",
    title: "Multi Timeframe",
    description:
      "Daily / weekly / monthly close lines from one series — metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "stock-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#d97706",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/stock/multi-timeframe.tsx",
        type: "registry:component",
        target: "components/charts/multi-timeframe.tsx",
      },
    ],
  },
  {
    name: "heatmap-calendar",
    type: "registry:chart",
    title: "Heatmap Calendar",
    description:
      "Year of daily activity — Sunday-start SVG grid, navy intensity, holiday accents, RTL-aware.",
    registryDependencies: ["heatmap-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/heatmap/heatmap-calendar.tsx",
        type: "registry:component",
        target: "components/charts/heatmap-calendar.tsx",
      },
    ],
  },
  {
    name: "heatmap-calendar-emerald",
    type: "registry:chart",
    title: "Heatmap Calendar Emerald",
    description:
      "Sunday-start calendar heatmap with soft green (`--chart-up`) intensity — RTL-aware.",
    registryDependencies: ["heatmap-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-up": "#0d9488",
      },
      dark: {
        "chart-up": "#2dd4bf",
      },
    },
    files: [
      {
        path: "registry/charts/heatmap/heatmap-calendar-emerald.tsx",
        type: "registry:component",
        target: "components/charts/heatmap-calendar-emerald.tsx",
      },
    ],
  },
  {
    name: "heatmap-matrix",
    type: "registry:chart",
    title: "Heatmap Matrix",
    description:
      "Day × hour SVG intensity grid — navy `--chart-1`, floating tip, RTL-aware.",
    registryDependencies: ["heatmap-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/heatmap/heatmap-matrix.tsx",
        type: "registry:component",
        target: "components/charts/heatmap-matrix.tsx",
      },
    ],
  },
  {
    name: "heatmap-matrix-values",
    type: "registry:chart",
    title: "Heatmap Matrix Values",
    description:
      "Day × hour SVG grid with in-cell values — soft green `--chart-up`, RTL-aware.",
    registryDependencies: ["heatmap-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-up": "#0d9488",
      },
      dark: {
        "chart-up": "#2dd4bf",
      },
    },
    files: [
      {
        path: "registry/charts/heatmap/heatmap-matrix-values.tsx",
        type: "registry:component",
        target: "components/charts/heatmap-matrix-values.tsx",
      },
    ],
  },
  {
    name: "bundle-size-treemap",
    type: "registry:chart",
    title: "Bundle Size Treemap",
    description:
      "Client JS bundle weight by package group — flat Treemap, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/treemap/bundle-size-treemap.tsx",
        type: "registry:component",
        target: "components/charts/bundle-size-treemap.tsx",
      },
    ],
  },
  {
    name: "simple-treemap",
    type: "registry:chart",
    title: "Simple Treemap",
    description:
      "Flat module-size treemap (classic baseline) — metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/treemap/simple-treemap.tsx",
        type: "registry:component",
        target: "components/charts/simple-treemap.tsx",
      },
    ],
  },
  {
    name: "custom-content-treemap",
    type: "registry:chart",
    title: "Custom Content Treemap",
    description:
      "Custom Treemap content — group fill, rank, and label; leaf strokes; metric scrubber.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/treemap/custom-content-treemap.tsx",
        type: "registry:component",
        target: "components/charts/custom-content-treemap.tsx",
      },
    ],
  },
  {
    name: "nested-treemap",
    type: "registry:chart",
    title: "Nested Treemap",
    description:
      "Nest drill-down treemap with breadcrumb — click groups to zoom; metric scrubber.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/treemap/nested-treemap.tsx",
        type: "registry:component",
        target: "components/charts/nested-treemap.tsx",
      },
    ],
  },
  {
    name: "treemap-with-padding-and-gaps",
    type: "registry:chart",
    title: "Treemap With Padding And Gaps",
    description:
      "Flat treemap teaching nodeInset + nodeGap — same data as Simple, metric scrubber.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/treemap/treemap-with-padding-and-gaps.tsx",
        type: "registry:component",
        target: "components/charts/treemap-with-padding-and-gaps.tsx",
      },
    ],
  },
  {
    name: "treemap-content",
    type: "registry:chart",
    title: "Treemap Content",
    description:
      "Treemap content as a React element (cloneElement) — centered leaf labels, metric scrubber.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/treemap/treemap-content.tsx",
        type: "registry:component",
        target: "components/charts/treemap-content.tsx",
      },
    ],
  },
  {
    name: "bundle-size-sunburst",
    type: "registry:chart",
    title: "Bundle Size Sunburst",
    description:
      "Tree-shaken client JS bundle (bytes) by group — Sunburst rings, metric scrubber, center disc.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "sunburst-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/sunburst/bundle-size-sunburst.tsx",
        type: "registry:component",
        target: "components/charts/bundle-size-sunburst.tsx",
      },
    ],
  },
  {
    name: "sunburst-chart",
    type: "registry:chart",
    title: "Sunburst Chart",
    description:
      "Regional sales share by channel — nested Sunburst rings, metric scrubber, center disc.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "sunburst-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/sunburst/sunburst-chart.tsx",
        type: "registry:component",
        target: "components/charts/sunburst-chart.tsx",
      },
    ],
  },
  {
    name: "sunburst-chart-theme-colors",
    type: "registry:chart",
    title: "Sunburst Chart Theme Colors",
    description:
      "Org headcount by team — nested Sunburst with locked theme palette shades, metric scrubber, center disc.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles", "sunburst-shared"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/sunburst/sunburst-chart-theme-colors.tsx",
        type: "registry:component",
        target: "components/charts/sunburst-chart-theme-colors.tsx",
      },
    ],
  },
  {
    name: "gauge-default",
    type: "registry:chart",
    title: "Gauge Default",
    description:
      "Vivid traffic gauge (emerald / amber / rose) — light/dark pairs, English metric header.",
    dependencies: ["react-gauge-chart", "lodash"],
    registryDependencies: ["gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#10B981",
        "chart-2": "#F59E0B",
        "chart-3": "#F43F5E",
      },
      dark: {
        "chart-1": "#34D399",
        "chart-2": "#FBBF24",
        "chart-3": "#FB7185",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/gauge-default.tsx",
        type: "registry:component",
        target: "components/charts/gauge-default.tsx",
      },
    ],
  },
  {
    name: "gauge-levels",
    type: "registry:chart",
    title: "Gauge Levels",
    description:
      "20 soft traffic bands with needle at 86% — fixed stage, English metric header.",
    dependencies: ["react-gauge-chart", "lodash"],
    registryDependencies: ["gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#6cb87a",
        "chart-2": "#d4b45a",
        "chart-3": "#d96b5c",
      },
      dark: {
        "chart-1": "#6cb87a",
        "chart-2": "#d4b45a",
        "chart-3": "#d96b5c",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/gauge-levels.tsx",
        type: "registry:component",
        target: "components/charts/gauge-levels.tsx",
      },
    ],
  },
  {
    name: "gauge-custom-colors",
    type: "registry:chart",
    title: "Gauge Custom Colors",
    description:
      "Rose → sand gauge with thicker arc at 37% — fixed stage, English metric header.",
    dependencies: ["react-gauge-chart", "lodash"],
    registryDependencies: ["gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#d97986",
        "chart-2": "#c4a574",
      },
      dark: {
        "chart-1": "#d97986",
        "chart-2": "#c4a574",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/gauge-custom-colors.tsx",
        type: "registry:component",
        target: "components/charts/gauge-custom-colors.tsx",
      },
    ],
  },
  {
    name: "gauge-corner-radius",
    type: "registry:chart",
    title: "Gauge Corner Radius",
    description:
      "Ten traffic bands with rounded corners and wider gaps — fixed stage, English metric header.",
    dependencies: ["react-gauge-chart", "lodash"],
    registryDependencies: ["gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#6cb87a",
        "chart-2": "#d4b45a",
        "chart-3": "#d96b5c",
      },
      dark: {
        "chart-1": "#6cb87a",
        "chart-2": "#d4b45a",
        "chart-3": "#d96b5c",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/gauge-corner-radius.tsx",
        type: "registry:component",
        target: "components/charts/gauge-corner-radius.tsx",
      },
    ],
  },
  {
    name: "gauge-custom-arcs",
    type: "registry:chart",
    title: "Gauge Custom Arcs",
    description:
      "Uneven traffic arcs (30/50/20) at 37% — fixed stage, English metric header.",
    dependencies: ["react-gauge-chart", "lodash"],
    registryDependencies: ["gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#6cb87a",
        "chart-2": "#d4b45a",
        "chart-3": "#d96b5c",
      },
      dark: {
        "chart-1": "#6cb87a",
        "chart-2": "#d4b45a",
        "chart-3": "#d96b5c",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/gauge-custom-arcs.tsx",
        type: "registry:component",
        target: "components/charts/gauge-custom-arcs.tsx",
      },
    ],
  },
  {
    name: "gauge-no-animation",
    type: "registry:chart",
    title: "Gauge No Animation",
    description:
      "Fifteen traffic bands at 56% with needle animation off — fixed stage, English metric header.",
    dependencies: ["react-gauge-chart", "lodash"],
    registryDependencies: ["gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#6cb87a",
        "chart-2": "#d4b45a",
        "chart-3": "#d96b5c",
      },
      dark: {
        "chart-1": "#6cb87a",
        "chart-2": "#d4b45a",
        "chart-3": "#d96b5c",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/gauge-no-animation.tsx",
        type: "registry:component",
        target: "components/charts/gauge-no-animation.tsx",
      },
    ],
  },
  {
    name: "hc-gauge-default",
    type: "registry:chart",
    title: "Hc Gauge Default",
    description:
      "Highcharts dial with soft traffic plotBands — English metric header.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["hc-gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#6cb87a",
        "chart-2": "#d4b45a",
        "chart-3": "#d96b5c",
      },
      dark: {
        "chart-1": "#6cb87a",
        "chart-2": "#d4b45a",
        "chart-3": "#d96b5c",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/hc-gauge-default.tsx",
        type: "registry:component",
        target: "components/charts/hc-gauge-default.tsx",
      },
    ],
  },
  {
    name: "hc-gauge-rounded-ends",
    type: "registry:chart",
    title: "Hc Gauge Rounded Ends",
    description:
      "Highcharts dial with rounded pane and dial tips — soft blue bands, English metric header.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["hc-gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#9bbfd4",
        "chart-2": "#6ea1c7",
        "chart-3": "#4a7a9a",
      },
      dark: {
        "chart-1": "#9bbfd4",
        "chart-2": "#6ea1c7",
        "chart-3": "#4a7a9a",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/hc-gauge-rounded-ends.tsx",
        type: "registry:component",
        target: "components/charts/hc-gauge-rounded-ends.tsx",
      },
    ],
  },
  {
    name: "hc-gauge-thin-ring",
    type: "registry:chart",
    title: "Hc Gauge Thin Ring",
    description:
      "Highcharts thin outer ring bands — soft violet/slate, English metric header.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["hc-gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#b8a8c8",
        "chart-2": "#8b9dc3",
      },
      dark: {
        "chart-1": "#b8a8c8",
        "chart-2": "#8b9dc3",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/hc-gauge-thin-ring.tsx",
        type: "registry:component",
        target: "components/charts/hc-gauge-thin-ring.tsx",
      },
    ],
  },
  {
    name: "hc-gauge-semicircle",
    type: "registry:chart",
    title: "Hc Gauge Semicircle",
    description:
      "Highcharts half-dial speedometer — soft gold to red bands, English metric header.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["hc-gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#d4b45a",
        "chart-2": "#c88860",
        "chart-3": "#d96b5c",
      },
      dark: {
        "chart-1": "#d4b45a",
        "chart-2": "#c88860",
        "chart-3": "#d96b5c",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/hc-gauge-semicircle.tsx",
        type: "registry:component",
        target: "components/charts/hc-gauge-semicircle.tsx",
      },
    ],
  },
  {
    name: "hc-gauge-custom-pivot",
    type: "registry:chart",
    title: "Hc Gauge Custom Pivot",
    description:
      "Highcharts dial with large hollow pivot — soft teal bands, English metric header.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["hc-gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#7eb8a0",
        "chart-2": "#4a9e88",
      },
      dark: {
        "chart-1": "#7eb8a0",
        "chart-2": "#4a9e88",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/hc-gauge-custom-pivot.tsx",
        type: "registry:component",
        target: "components/charts/hc-gauge-custom-pivot.tsx",
      },
    ],
  },
  {
    name: "hc-gauge-combo",
    type: "registry:chart",
    title: "Hc Gauge Combo",
    description:
      "Highcharts solidgauge + dial on one value — soft teal/blue/violet, English metric header.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["hc-gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#7eb8a0",
        "chart-2": "#6ea1c7",
        "chart-3": "#8b9dc3",
      },
      dark: {
        "chart-1": "#7eb8a0",
        "chart-2": "#6ea1c7",
        "chart-3": "#8b9dc3",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/hc-gauge-combo.tsx",
        type: "registry:component",
        target: "components/charts/hc-gauge-combo.tsx",
      },
    ],
  },
  {
    name: "hc-gauge-fuel",
    type: "registry:chart",
    title: "Hc Gauge Fuel",
    description:
      "Highcharts semicircle fuel solidgauge — soft rose/gold/green stops, English metric header.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["hc-gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#d96b5c",
        "chart-2": "#d4b45a",
        "chart-3": "#6cb87a",
      },
      dark: {
        "chart-1": "#d96b5c",
        "chart-2": "#d4b45a",
        "chart-3": "#6cb87a",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/hc-gauge-fuel.tsx",
        type: "registry:component",
        target: "components/charts/hc-gauge-fuel.tsx",
      },
    ],
  },
  {
    name: "hc-gauge-activity",
    type: "registry:chart",
    title: "Hc Gauge Activity",
    description:
      "Highcharts 360° activity ring — soft pink→rose gradient, English metric header.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["hc-gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#c86b8f",
        "chart-2": "#d97986",
      },
      dark: {
        "chart-1": "#c86b8f",
        "chart-2": "#d97986",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/hc-gauge-activity.tsx",
        type: "registry:component",
        target: "components/charts/hc-gauge-activity.tsx",
      },
    ],
  },
  {
    name: "hc-gauge-kpi",
    type: "registry:chart",
    title: "Hc Gauge Kpi",
    description:
      "Highcharts triple nested KPI rings — Conversion/Engagement/Retention, English metric header.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["hc-gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#5aa8d4",
        "chart-2": "#6b66b8",
        "chart-3": "#5cb88a",
      },
      dark: {
        "chart-1": "#5aa8d4",
        "chart-2": "#6b66b8",
        "chart-3": "#5cb88a",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/hc-gauge-kpi.tsx",
        type: "registry:component",
        target: "components/charts/hc-gauge-kpi.tsx",
      },
    ],
  },
  {
    name: "hc-gauge-rounded-bands",
    type: "registry:chart",
    title: "Hc Gauge Rounded Bands",
    description:
      "Highcharts dial with individually rounded plotBands — teal / amber / rose, English metric header.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["hc-gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#0D9488",
        "chart-2": "#D97706",
        "chart-3": "#E11D48",
      },
      dark: {
        "chart-1": "#2DD4BF",
        "chart-2": "#FBBF24",
        "chart-3": "#FB7185",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/hc-gauge-rounded-bands.tsx",
        type: "registry:component",
        target: "components/charts/hc-gauge-rounded-bands.tsx",
      },
    ],
  },
  {
    name: "hc-gauge-threshold",
    type: "registry:chart",
    title: "Hc Gauge Threshold",
    description:
      "Highcharts solidgauge with zero threshold — red below / green above, English metric header.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["hc-gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#d96b5c",
        "chart-2": "#6cb87a",
      },
      dark: {
        "chart-1": "#d96b5c",
        "chart-2": "#6cb87a",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/hc-gauge-threshold.tsx",
        type: "registry:component",
        target: "components/charts/hc-gauge-threshold.tsx",
      },
    ],
  },
  {
    name: "hc-gauge-custom-dial",
    type: "registry:chart",
    title: "Hc Gauge Custom Dial",
    description:
      "Highcharts solidgauge arc with circular dot dial — soft blue accent, English metric header.",
    dependencies: ["highcharts", "highcharts-react-official"],
    registryDependencies: ["hc-gauge-shared", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#5aa8d4",
      },
      dark: {
        "chart-1": "#5aa8d4",
      },
    },
    files: [
      {
        path: "registry/charts/gauge/hc-gauge-custom-dial.tsx",
        type: "registry:component",
        target: "components/charts/hc-gauge-custom-dial.tsx",
      },
    ],
  },
  {
    name: "stacked-bar-chart",
    type: "registry:chart",
    title: "Stacked Bar Chart",
    description:
      "Stacked Desktop+Mobile H1 2026 — navy×orange locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/stacked-bar-chart.tsx",
        type: "registry:component",
        target: "components/charts/stacked-bar-chart.tsx",
      },
    ],
  },
  {
    name: "box-plot",
    type: "registry:chart",
    title: "Box Plot",
    description:
      "IQR box + median + whiskers + outliers by category — navy×orange locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/box-plot.tsx",
        type: "registry:component",
        target: "components/charts/box-plot.tsx",
      },
    ],
  },
  {
    name: "waterfall",
    type: "registry:chart",
    title: "Waterfall",
    description:
      "P&L bridge with floating range bars — increase/decrease/total fills, locked chrome scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/bar/waterfall.tsx",
        type: "registry:component",
        target: "components/charts/waterfall.tsx",
      },
    ],
  },
  {
    name: "mix-bar-chart",
    type: "registry:chart",
    title: "Mix Bar Chart",
    description:
      "Store+Online stacked beside Orders — navy×orange×amber, legend focus/lock, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
      },
    },
    files: [
      {
        path: "registry/charts/bar/mix-bar-chart.tsx",
        type: "registry:component",
        target: "components/charts/mix-bar-chart.tsx",
      },
    ],
  },
  {
    name: "positive-and-negative-bar-chart",
    type: "registry:chart",
    title: "Positive And Negative Bar Chart",
    description:
      "Grouped Online×Store bars that cross zero — signed Y ticks, zero reference line, locked chrome scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/bar/positive-and-negative-bar-chart.tsx",
        type: "registry:component",
        target: "components/charts/positive-and-negative-bar-chart.tsx",
      },
    ],
  },
  {
    name: "bar-chart-with-customized-event",
    type: "registry:chart",
    title: "Bar Chart With Customized Event",
    description:
      "Click a month to drive chips + detail panel — average reference line, locked chrome, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-chart-with-customized-event.tsx",
        type: "registry:component",
        target: "components/charts/bar-chart-with-customized-event.tsx",
      },
    ],
  },
  {
    name: "bar-chart-has-background",
    type: "registry:chart",
    title: "Bar Chart Has Background",
    description:
      "Grouped Desktop×Mobile with a muted background track on Desktop — locked chrome scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-chart-has-background.tsx",
        type: "registry:component",
        target: "components/charts/bar-chart-has-background.tsx",
      },
    ],
  },
  {
    name: "ranged-stacked-bar-chart",
    type: "registry:chart",
    title: "Ranged Stacked Bar Chart",
    description:
      "Prep/Pack/Ship minute ranges via BarStack — navy×orange×amber, locked chrome scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
      },
    },
    files: [
      {
        path: "registry/charts/bar/ranged-stacked-bar-chart.tsx",
        type: "registry:component",
        target: "components/charts/ranged-stacked-bar-chart.tsx",
      },
    ],
  },
  {
    name: "tiny-bar-chart",
    type: "registry:chart",
    title: "Tiny Bar Chart",
    description:
      "Compact single-series sparkline bars — locked header chrome, no axes, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/bar/tiny-bar-chart.tsx",
        type: "registry:component",
        target: "components/charts/tiny-bar-chart.tsx",
      },
    ],
  },
  {
    name: "bar-active",
    type: "registry:chart",
    title: "Bar Active",
    description:
      "Per-category fills with a dashed featured bar outline — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-active.tsx",
        type: "registry:component",
        target: "components/charts/bar-active.tsx",
      },
    ],
  },
  {
    name: "population-pyramid",
    type: "registry:chart",
    title: "Population Pyramid",
    description:
      "Horizontal Male×Female by age — navy×orange locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/population-pyramid.tsx",
        type: "registry:component",
        target: "components/charts/population-pyramid.tsx",
      },
    ],
  },
  {
    name: "timeline",
    type: "registry:chart",
    title: "Timeline",
    description:
      "Horizontal ranged cycles per test — semantic outcome colors, locked chrome scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/timeline.tsx",
        type: "registry:component",
        target: "components/charts/timeline.tsx",
      },
    ],
  },
  {
    name: "animated-bar-width",
    type: "registry:chart",
    title: "Animated Bar Width",
    description:
      "Single-series bars that expand on scrub — navy locked chrome, metric header, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/animated-bar-width.tsx",
        type: "registry:component",
        target: "components/charts/animated-bar-width.tsx",
      },
    ],
  },
  {
    name: "animated-bar-time-series",
    type: "registry:chart",
    title: "Animated Bar Time Series",
    description:
      "Sliding window over a longer series — navy locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/animated-bar-time-series.tsx",
        type: "registry:component",
        target: "components/charts/animated-bar-time-series.tsx",
      },
    ],
  },
  {
    name: "custom-shape-bar-chart",
    type: "registry:chart",
    title: "Custom Shape Bar Chart",
    description:
      "Bevelled custom bar paths by category — locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/bar/custom-shape-bar-chart.tsx",
        type: "registry:component",
        target: "components/charts/custom-shape-bar-chart.tsx",
      },
    ],
  },
  {
    name: "brush-bar-chart",
    type: "registry:chart",
    title: "Brush Bar Chart",
    description:
      "Bipolar dual-series with range brush — navy locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/brush-bar-chart.tsx",
        type: "registry:component",
        target: "components/charts/brush-bar-chart.tsx",
      },
    ],
  },
  {
    name: "biaxial-bar-chart",
    type: "registry:chart",
    title: "Biaxial Bar Chart",
    description:
      "Dual Y-axes with independent scales — navy locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/biaxial-bar-chart.tsx",
        type: "registry:component",
        target: "components/charts/biaxial-bar-chart.tsx",
      },
    ],
  },
  {
    name: "bar-chart-with-label-background",
    type: "registry:chart",
    title: "Bar Chart With Label Background",
    description:
      "Stacked bars with inside segment labels — navy locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-chart-with-label-background.tsx",
        type: "registry:component",
        target: "components/charts/bar-chart-with-label-background.tsx",
      },
    ],
  },
  {
    name: "bar-chart-range",
    type: "registry:chart",
    title: "Bar Chart Range",
    description:
      "Ranged [low, high] bars — navy locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-chart-range.tsx",
        type: "registry:component",
        target: "components/charts/bar-chart-range.tsx",
      },
    ],
  },
  {
    name: "stacked-bar-chart-with-horizontal-line",
    type: "registry:chart",
    title: "Stacked Bar Chart With Horizontal Line",
    description:
      "Three-stack sales with dashed target line — locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
      },
    },
    files: [
      {
        path: "registry/charts/bar/stacked-bar-chart-with-horizontal-line.tsx",
        type: "registry:component",
        target: "components/charts/stacked-bar-chart-with-horizontal-line.tsx",
      },
    ],
  },
  {
    name: "bar-default",
    type: "registry:chart",
    title: "Bar Default",
    description:
      "Single-series monthly store bars — navy locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-default.tsx",
        type: "registry:component",
        target: "components/charts/bar-default.tsx",
      },
    ],
  },
  {
    name: "bar-multiple",
    type: "registry:chart",
    title: "Bar Multiple",
    description:
      "Grouped Desktop + Mobile bars — navy×orange locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-multiple.tsx",
        type: "registry:component",
        target: "components/charts/bar-multiple.tsx",
      },
    ],
  },
  {
    name: "bar-stacked",
    type: "registry:chart",
    title: "Bar Stacked",
    description:
      "Stacked Desktop + Mobile bars — navy×orange locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-stacked.tsx",
        type: "registry:component",
        target: "components/charts/bar-stacked.tsx",
      },
    ],
  },
  {
    name: "bar-label",
    type: "registry:chart",
    title: "Bar Label",
    description:
      "Single-series bars with always-on top labels — navy locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-label.tsx",
        type: "registry:component",
        target: "components/charts/bar-label.tsx",
      },
    ],
  },
  {
    name: "bar-label-custom",
    type: "registry:chart",
    title: "Bar Label Custom",
    description:
      "Horizontal Store bars with always-on tip labels — navy locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-label-custom.tsx",
        type: "registry:component",
        target: "components/charts/bar-label-custom.tsx",
      },
    ],
  },
  {
    name: "bar-interactive",
    type: "registry:chart",
    title: "Bar Interactive",
    description:
      "Toggle Store/Online period totals, then scrub daily bars — navy×orange locked chrome, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-interactive.tsx",
        type: "registry:component",
        target: "components/charts/bar-interactive.tsx",
      },
    ],
  },
  {
    name: "bar-horizontal",
    type: "registry:chart",
    title: "Bar Horizontal",
    description:
      "Horizontal single-series bars — navy locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-horizontal.tsx",
        type: "registry:component",
        target: "components/charts/bar-horizontal.tsx",
      },
    ],
  },
  {
    name: "bar-mixed",
    type: "registry:chart",
    title: "Bar Mixed",
    description:
      "Horizontal bars with per-category colors — locked chrome, metric header scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-mixed.tsx",
        type: "registry:component",
        target: "components/charts/bar-mixed.tsx",
      },
    ],
  },
  {
    name: "bar-negative",
    type: "registry:chart",
    title: "Bar Negative",
    description:
      "Single-series signed bars with navy gains / orange losses and a zero line — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/bar/bar-negative.tsx",
        type: "registry:component",
        target: "components/charts/bar-negative.tsx",
      },
    ],
  },
  {
    name: "simple-radial-bar-chart",
    type: "registry:chart",
    title: "Simple Radial Bar Chart",
    description:
      "Concentric age-band radial bars — locked chrome, ring scrubber, RTL-aware plot island.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/radial-bar/simple-radial-bar-chart.tsx",
        type: "registry:component",
        target: "components/charts/simple-radial-bar-chart.tsx",
      },
    ],
  },
  {
    name: "radial-bar-chart-click-to-focus-legend",
    type: "registry:chart",
    title: "Radial Bar Chart Click To Focus Legend",
    description:
      "Concentric radial bars with click-to-focus legend — dim siblings, locked chrome, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/radial-bar/radial-bar-chart-click-to-focus-legend.tsx",
        type: "registry:component",
        target: "components/charts/radial-bar-chart-click-to-focus-legend.tsx",
      },
    ],
  },
  {
    name: "radial-text",
    type: "registry:chart",
    title: "Radial Text",
    description:
      "Single progress ring with centered value Label — locked chrome, RTL-aware plot island.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/radial-bar/radial-text.tsx",
        type: "registry:component",
        target: "components/charts/radial-text.tsx",
      },
    ],
  },
  {
    name: "radial-shape",
    type: "registry:chart",
    title: "Radial Shape",
    description:
      "Thick square-ended radial arc over a thin muted track with center Label — locked chrome, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/radial-bar/radial-shape.tsx",
        type: "registry:component",
        target: "components/charts/radial-shape.tsx",
      },
    ],
  },
  {
    name: "radial-stacked",
    type: "registry:chart",
    title: "Radial Stacked",
    description:
      "Half-ring Desktop×Mobile stacked RadialBars with center total — locked chrome, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/radial-bar/radial-stacked.tsx",
        type: "registry:component",
        target: "components/charts/radial-stacked.tsx",
      },
    ],
  },
  {
    name: "simple-scatter-chart",
    type: "registry:chart",
    title: "Simple Scatter Chart",
    description:
      "Dual-series height×weight scatter — locked navy×orange chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/scatter/simple-scatter-chart.tsx",
        type: "registry:component",
        target: "components/charts/simple-scatter-chart.tsx",
      },
    ],
  },
  {
    name: "joint-line-scatter-chart",
    type: "registry:chart",
    title: "Joint Line Scatter Chart",
    description:
      "Dual-series scatter with joint connecting lines — locked navy×orange chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/scatter/joint-line-scatter-chart.tsx",
        type: "registry:component",
        target: "components/charts/joint-line-scatter-chart.tsx",
      },
    ],
  },
  {
    name: "bubble-chart",
    type: "registry:chart",
    title: "Bubble Chart",
    description:
      "Dual-series bubble scatter with ZAxis sizing — locked navy×orange chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/scatter/bubble-chart.tsx",
        type: "registry:component",
        target: "components/charts/bubble-chart.tsx",
      },
    ],
  },
  {
    name: "custom-animation",
    type: "registry:chart",
    title: "Custom Animation",
    description:
      "Scatter dataset swap with animationInterpolateFn (crossfade / staggered / pop) — locked chrome, scrub, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/scatter/custom-animation.tsx",
        type: "registry:component",
        target: "components/charts/custom-animation.tsx",
      },
    ],
  },
  {
    name: "scatter-chart-with-labels",
    type: "registry:chart",
    title: "Scatter Chart With Labels",
    description:
      "Bubble scatter with always-on LabelList names — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
      },
      dark: {
        "chart-1": "#3b82f6",
      },
    },
    files: [
      {
        path: "registry/charts/scatter/scatter-chart-with-labels.tsx",
        type: "registry:component",
        target: "components/charts/scatter-chart-with-labels.tsx",
      },
    ],
  },
  {
    name: "multiple-y-axes-scatter-chart",
    type: "registry:chart",
    title: "Multiple Y Axes Scatter Chart",
    description:
      "Dual-series scatter with independent Y axes — locked navy×orange chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
      },
    },
    files: [
      {
        path: "registry/charts/scatter/multiple-y-axes-scatter-chart.tsx",
        type: "registry:component",
        target: "components/charts/multiple-y-axes-scatter-chart.tsx",
      },
    ],
  },
  {
    name: "scatter-chart-with-cells",
    type: "registry:chart",
    title: "Scatter Chart With Cells",
    description:
      "Per-point chart tokens + Symbols via shape (modern Cell) — locked chrome, scrub, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/scatter/scatter-chart-with-cells.tsx",
        type: "registry:component",
        target: "components/charts/scatter-chart-with-cells.tsx",
      },
    ],
  },
  {
    name: "scatter-chart-performance",
    type: "registry:chart",
    title: "Scatter Chart Performance",
    description:
      "Many Scatter series × many points stress demo — animation off, series-level scrub, pass/fail tint, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-up": "#16a34a",
        "chart-down": "#e11d48",
      },
      dark: {
        "chart-up": "#4ade80",
        "chart-down": "#f25f70",
      },
    },
    files: [
      {
        path: "registry/charts/scatter/scatter-chart-performance.tsx",
        type: "registry:component",
        target: "components/charts/scatter-chart-performance.tsx",
      },
    ],
  },
  {
    name: "area-responsive-container",
    type: "registry:chart",
    title: "Area Responsive Container",
    description:
      "Fluid ChartContainer area stage with min-month and target ReferenceLines — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/responsive/area-responsive-container.tsx",
        type: "registry:component",
        target: "components/charts/area-responsive-container.tsx",
      },
    ],
  },
  {
    name: "composed-responsive-container",
    type: "registry:chart",
    title: "Composed Responsive Container",
    description:
      "Fluid ChartContainer composed stage — orders area, online bars, store line — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/responsive/composed-responsive-container.tsx",
        type: "registry:component",
        target: "components/charts/composed-responsive-container.tsx",
      },
    ],
  },
  {
    name: "pie-responsive-container",
    type: "registry:chart",
    title: "Pie Responsive Container",
    description:
      "Fluid square ChartContainer pie stage with value labels and legend — locked chrome, slice scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-3": "#f59e0b",
        "chart-4": "#6366f1",
        "chart-5": "#e11d48",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-3": "#fbbf24",
        "chart-4": "#818cf8",
        "chart-5": "#fb7185",
      },
    },
    files: [
      {
        path: "registry/charts/responsive/pie-responsive-container.tsx",
        type: "registry:component",
        target: "components/charts/pie-responsive-container.tsx",
      },
    ],
  },
  {
    name: "legend-effect-opacity",
    type: "registry:chart",
    title: "Legend Effect Opacity",
    description:
      "Dual Online×Store lines — hover a legend item to dim the other series; locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/legend/legend-effect-opacity.tsx",
        type: "registry:component",
        target: "components/charts/legend-effect-opacity.tsx",
      },
    ],
  },
  {
    name: "legend-position",
    type: "registry:chart",
    title: "Legend Position",
    description:
      "Dual Online×Store lines with top-aligned ChartLegend — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/legend/legend-position.tsx",
        type: "registry:component",
        target: "components/charts/legend-position.tsx",
      },
    ],
  },
  {
    name: "legend-styles",
    type: "registry:chart",
    title: "Legend Styles",
    description:
      "Dual Store×Online bars with custom card legend and period totals — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/legend/legend-styles.tsx",
        type: "registry:component",
        target: "components/charts/legend-styles.tsx",
      },
    ],
  },
  {
    name: "custom-content-of-tooltip",
    type: "registry:chart",
    title: "Custom Content Of Tooltip",
    description:
      "Dual Online x Store bars with a fully custom tooltip panel (intro + series) - locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/tooltip/custom-content-of-tooltip.tsx",
        type: "registry:component",
        target: "components/charts/custom-content-of-tooltip.tsx",
      },
    ],
  },
  {
    name: "tooltip-styles",
    type: "registry:chart",
    title: "Tooltip Styles",
    description:
      "Dual Online x Store bars teaching Recharts tip chrome (contentStyle, itemStyle, labelStyle) - locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/tooltip/tooltip-styles.tsx",
        type: "registry:component",
        target: "components/charts/tooltip-styles.tsx",
      },
    ],
  },
  {
    name: "tooltip-advanced",
    type: "registry:chart",
    title: "Tooltip Advanced",
    description:
      "Stacked Delivery x Pickup bars with an advanced tip formatter (swatch, unit, total) - locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/tooltip/tooltip-advanced.tsx",
        type: "registry:component",
        target: "components/charts/tooltip-advanced.tsx",
      },
    ],
  },
  {
    name: "chart-tooltip-default",
    type: "registry:chart",
    title: "Tooltip Default",
    description:
      "Stacked Delivery x Pickup bars with default ChartTooltipContent and a long-date labelFormatter - locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/tooltip/chart-tooltip-default.tsx",
        type: "registry:component",
        target: "components/charts/chart-tooltip-default.tsx",
      },
    ],
  },
  {
    name: "chart-tooltip-indicator-line",
    type: "registry:chart",
    title: "Tooltip Indicator Line",
    description:
      "Stacked Delivery x Pickup bars with ChartTooltipContent indicator=line and a long-date labelFormatter - locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/tooltip/chart-tooltip-indicator-line.tsx",
        type: "registry:component",
        target: "components/charts/chart-tooltip-indicator-line.tsx",
      },
    ],
  },
  {
    name: "chart-tooltip-indicator-none",
    type: "registry:chart",
    title: "Tooltip Indicator None",
    description:
      "Stacked Delivery x Pickup bars with ChartTooltipContent hideIndicator and a long-date labelFormatter - locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/tooltip/chart-tooltip-indicator-none.tsx",
        type: "registry:component",
        target: "components/charts/chart-tooltip-indicator-none.tsx",
      },
    ],
  },
  {
    name: "chart-tooltip-label-custom",
    type: "registry:chart",
    title: "Tooltip Label Custom",
    description:
      "Stacked Delivery x Pickup bars with ChartTooltipContent labelKey=activities (tip title from chartConfig) and indicator=line - locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/tooltip/chart-tooltip-label-custom.tsx",
        type: "registry:component",
        target: "components/charts/chart-tooltip-label-custom.tsx",
      },
    ],
  },
  {
    name: "chart-tooltip-label-formatter",
    type: "registry:chart",
    title: "Tooltip Label Formatter",
    description:
      "Stacked Delivery x Pickup bars teaching ChartTooltipContent long-date labelFormatter - locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/tooltip/chart-tooltip-label-formatter.tsx",
        type: "registry:component",
        target: "components/charts/chart-tooltip-label-formatter.tsx",
      },
    ],
  },
  {
    name: "chart-tooltip-label-none",
    type: "registry:chart",
    title: "Tooltip Label None",
    description:
      "Stacked Delivery x Pickup bars with ChartTooltipContent hideLabel and hideIndicator - locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/tooltip/chart-tooltip-label-none.tsx",
        type: "registry:component",
        target: "components/charts/chart-tooltip-label-none.tsx",
      },
    ],
  },
  {
    name: "chart-tooltip-formatter",
    type: "registry:chart",
    title: "Tooltip Formatter",
    description:
      "Stacked Delivery x Pickup bars with ChartTooltipContent custom value formatter (kcal) and hideLabel - locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/tooltip/chart-tooltip-formatter.tsx",
        type: "registry:component",
        target: "components/charts/chart-tooltip-formatter.tsx",
      },
    ],
  },
  {
    name: "chart-tooltip-icons",
    type: "registry:chart",
    title: "Tooltip Icons",
    description:
      "Stacked Delivery x Pickup bars with ChartTooltipContent series icons (Footprints / Waves) and hideLabel - locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts", "lucide-react"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/tooltip/chart-tooltip-icons.tsx",
        type: "registry:component",
        target: "components/charts/chart-tooltip-icons.tsx",
      },
    ],
  },
  {
    name: "chart-tooltip-advanced",
    type: "registry:chart",
    title: "Tooltip Advanced",
    description:
      "Classic stacked Delivery x Pickup with ChartTooltipContent formatter (swatch, kcal, Total) - locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/tooltip/chart-tooltip-advanced.tsx",
        type: "registry:component",
        target: "components/charts/chart-tooltip-advanced.tsx",
      },
    ],
  },
  {
    name: "simple-radar-chart",
    type: "registry:chart",
    title: "Simple Radar Chart",
    description:
      "Single-series skill radar polygon — locked chrome, metric scrubber, RTL-aware polar island.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/simple-radar-chart.tsx",
        type: "registry:component",
        target: "components/charts/simple-radar-chart.tsx",
      },
    ],
  },
  {
    name: "specified-domain-radar-chart",
    type: "registry:chart",
    title: "Specified Domain Radar Chart",
    description:
      "Dual Alex×Sara radar with PolarRadiusAxis domain [0, 150] — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/specified-domain-radar-chart.tsx",
        type: "registry:component",
        target: "components/charts/specified-domain-radar-chart.tsx",
      },
    ],
  },
  {
    name: "range-radar-chart-custom-animation",
    type: "registry:chart",
    title: "Range Radar Chart Custom Animation",
    description:
      "Ceiling radar polygon with 1.6s entrance tween — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/range-radar-chart-custom-animation.tsx",
        type: "registry:component",
        target: "components/charts/range-radar-chart-custom-animation.tsx",
      },
    ],
  },
  {
    name: "radar-lines-only",
    type: "registry:chart",
    title: "Radar Lines Only",
    description:
      "Dual Store×Online stroke-only radar (no fill, no radial spokes) — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/radar-lines-only.tsx",
        type: "registry:component",
        target: "components/charts/radar-lines-only.tsx",
      },
    ],
  },
  {
    name: "radar-icons",
    type: "registry:chart",
    title: "Radar Icons",
    description:
      "Dual Store×Online radar with Lucide icons in chartConfig (ChartLegendContent) — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts", "lucide-react"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/radar-icons.tsx",
        type: "registry:component",
        target: "components/charts/radar-icons.tsx",
      },
    ],
  },
  {
    name: "radar-multiple",
    type: "registry:chart",
    title: "Radar Multiple",
    description:
      "Dual overlapping Store×Online filled radar polygons — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/radar-multiple.tsx",
        type: "registry:component",
        target: "components/charts/radar-multiple.tsx",
      },
    ],
  },
  {
    name: "chart-radar-default",
    type: "registry:chart",
    title: "Radar Default",
    description:
      "Classic single Store radar with default ChartTooltipContent — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-default.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-default.tsx",
      },
    ],
  },
  {
    name: "chart-radar-dots",
    type: "registry:chart",
    title: "Radar Dots",
    description:
      "Classic single Store radar with solid vertex dots — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-dots.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-dots.tsx",
      },
    ],
  },
  {
    name: "chart-radar-lines-only",
    type: "registry:chart",
    title: "Radar Lines Only",
    description:
      "Classic dual Store×Online stroke-only radar (no fill, no radial spokes) — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-lines-only.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-lines-only.tsx",
      },
    ],
  },
  {
    name: "chart-radar-label-custom",
    type: "registry:chart",
    title: "Radar Label Custom",
    description:
      "Classic dual Store×Online radar with custom angle ticks (values + month) — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-label-custom.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-label-custom.tsx",
      },
    ],
  },
  {
    name: "chart-radar-grid-custom",
    type: "registry:chart",
    title: "Radar Grid Custom",
    description:
      "Classic single Store radar with custom PolarGrid (no radial spokes, single ring) — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-grid-custom.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-grid-custom.tsx",
      },
    ],
  },
  {
    name: "chart-radar-grid-none",
    type: "registry:chart",
    title: "Radar Grid None",
    description:
      "Classic single Store radar with no PolarGrid and vertex dots — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-grid-none.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-grid-none.tsx",
      },
    ],
  },
  {
    name: "chart-radar-grid-circle",
    type: "registry:chart",
    title: "Radar Grid Circle",
    description:
      "Classic single Store radar with circular PolarGrid and vertex dots — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-grid-circle.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-grid-circle.tsx",
      },
    ],
  },
  {
    name: "chart-radar-grid-circle-no-lines",
    type: "registry:chart",
    title: "Radar Grid Circle No Lines",
    description:
      "Classic single Store radar with circular PolarGrid, no radial spokes, and vertex dots — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-grid-circle-no-lines.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-grid-circle-no-lines.tsx",
      },
    ],
  },
  {
    name: "chart-radar-grid-circle-fill",
    type: "registry:chart",
    title: "Radar Grid Circle Fill",
    description:
      "Classic single Store radar with circular PolarGrid tinted by series fill — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-grid-circle-fill.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-grid-circle-fill.tsx",
      },
    ],
  },
  {
    name: "chart-radar-grid-fill",
    type: "registry:chart",
    title: "Radar Grid Fill",
    description:
      "Classic single Store radar with polygon PolarGrid tinted by series fill — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-grid-fill.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-grid-fill.tsx",
      },
    ],
  },
  {
    name: "chart-radar-multiple",
    type: "registry:chart",
    title: "Radar Multiple",
    description:
      "Classic dual Store×Online overlapping filled radar — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-multiple.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-multiple.tsx",
      },
    ],
  },
  {
    name: "chart-radar-legend",
    type: "registry:chart",
    title: "Radar Legend",
    description:
      "Classic dual Store×Online radar with ChartLegend — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-legend.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-legend.tsx",
      },
    ],
  },
  {
    name: "chart-radar-icons",
    type: "registry:chart",
    title: "Radar Icons",
    description:
      "Classic dual Store×Online radar with Lucide icons in chartConfig — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts", "lucide-react"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-icons.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-icons.tsx",
      },
    ],
  },
  {
    name: "chart-radar-radius",
    type: "registry:chart",
    title: "Radar Radius",
    description:
      "Classic dual Store×Online radar with PolarRadiusAxis (no angle axis) — locked chrome, metric scrubber, RTL-aware.",
    dependencies: ["recharts"],
    registryDependencies: ["chart", "chart-styles"],
    cssVars: {
      light: {
        "chart-1": "#1e3a8a",
        "chart-2": "#ea580c",
        "chart-up": "#16a34a",
      },
      dark: {
        "chart-1": "#3b82f6",
        "chart-2": "#f97316",
        "chart-up": "#4ade80",
      },
    },
    files: [
      {
        path: "registry/charts/radar/chart-radar-radius.tsx",
        type: "registry:component",
        target: "components/charts/chart-radar-radius.tsx",
      },
    ],
  },
]

/** True when block source uses elevated card / soft shadow / canvas chrome. */
function blockSourceNeedsSoftSurface(item) {
  if (item.type !== "registry:block") return false
  if (item.cssVars?.light?.canvas && item.cssVars?.light?.card) return false
  for (const file of item.files ?? []) {
    if (!file.path?.endsWith(".tsx")) continue
    try {
      const src = readFileSync(file.path, "utf8")
      if (
        src.includes("bg-card") ||
        src.includes("shadow-soft") ||
        src.includes("bg-canvas")
      ) {
        return true
      }
    } catch {
      /* missing source — skip */
    }
  }
  return false
}

function withSoftSurfaceCssVars(item) {
  if (!blockSourceNeedsSoftSurface(item)) return item
  return {
    ...item,
    cssVars: {
      light: { ...SOFT_SURFACE_CSS_VARS.light, ...(item.cssVars?.light ?? {}) },
      dark: { ...SOFT_SURFACE_CSS_VARS.dark, ...(item.cssVars?.dark ?? {}) },
    },
  }
}

export const registryItems = registryItemsRaw.map(withSoftSurfaceCssVars)
