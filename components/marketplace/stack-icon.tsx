"use client"

import {
  MARKETPLACE_STACK_LABEL,
  type MarketplaceStack,
} from "@/lib/marketplace-catalog"
import {
  CssIcon,
  HtmlIcon,
  JavascriptIcon,
  NextjsIcon,
  ReactIcon,
  SassIcon,
  TailwindIcon,
  TypescriptIcon,
  ViteIcon,
} from "@/components/icons/brand"
import {
  AuthjsIcon,
  AxiosIcon,
  BunIcon,
  ChartjsIcon,
  ClerkIcon,
  D3Icon,
  DevtoIcon,
  DrizzleIcon,
  GithubIcon,
  GmailIcon,
  IndeedIcon,
  JwtIcon,
  LightweightChartsIcon,
  LinkedinIcon,
  LucideIcon,
  MediumIcon,
  NodejsIcon,
  NpmIcon,
  PrismaIcon,
  ReactQueryIcon,
  ReactRouterIcon,
  ResendIcon,
  SocketioIcon,
  StripeIcon,
  ThreejsIcon,
  VercelIcon,
  VisaIcon,
  ZustandIcon,
} from "@/components/icons/stack"
import { cn } from "@/lib/utils"

const STACK_INITIAL: Record<MarketplaceStack, string> = {
  nextjs: "N",
  react: "R",
  vite: "Vi",
  vercel: "▲",
  bun: "Bu",
  lucide: "Lu",
  tailwind: "Tw",
  typescript: "TS",
  javascript: "JS",
  html: "H",
  css: "C",
  sass: "Sa",
  nodejs: "No",
  d3: "D3",
  threejs: "3",
  reactquery: "RQ",
  zustand: "Zu",
  axios: "Ax",
  reactrouter: "RR",
  socketio: "IO",
  recharts: "Rc",
  chartjs: "Ch",
  lightweightcharts: "LC",
  clerk: "Cl",
  authjs: "Au",
  jwt: "JWT",
  linkedin: "in",
  indeed: "Id",
  github: "GH",
  medium: "M",
  devto: "DEV",
  stripe: "S",
  visa: "Vi",
  resend: "Re",
  drizzle: "Dr",
  prisma: "P",
  npm: "npm",
  gmail: "Gm",
}

/** Brand icons that take className (not MarkProps size). */
function BrandMark({
  Icon,
  size,
  className,
}: {
  Icon: React.ComponentType<React.ComponentProps<"svg">>
  size: number
  className?: string
}) {
  return (
    <Icon
      className={cn("shrink-0", className)}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      aria-hidden
    />
  )
}

export function StackIcon({
  stack,
  size = 20,
  className,
}: {
  stack: MarketplaceStack
  size?: number
  className?: string
}) {
  const label = MARKETPLACE_STACK_LABEL[stack]
  const props = { size, className }

  if (stack === "nextjs")
    return <BrandMark Icon={NextjsIcon} size={size} className={className} />
  if (stack === "react")
    return <BrandMark Icon={ReactIcon} size={size} className={className} />
  if (stack === "vite") return <ViteIcon {...props} />
  if (stack === "vercel") return <VercelIcon {...props} />
  if (stack === "bun") return <BunIcon {...props} />
  if (stack === "lucide") return <LucideIcon {...props} />
  if (stack === "zustand") return <ZustandIcon {...props} />
  if (stack === "axios") return <AxiosIcon {...props} />
  if (stack === "reactrouter") return <ReactRouterIcon {...props} />
  if (stack === "chartjs") return <ChartjsIcon {...props} />
  if (stack === "lightweightcharts")
    return <LightweightChartsIcon {...props} />
  if (stack === "stripe") return <StripeIcon {...props} />
  if (stack === "visa") return <VisaIcon {...props} />
  if (stack === "resend") return <ResendIcon {...props} />
  if (stack === "typescript")
    return (
      <BrandMark Icon={TypescriptIcon} size={size} className={className} />
    )
  if (stack === "javascript") return <JavascriptIcon {...props} />
  if (stack === "tailwind")
    return <BrandMark Icon={TailwindIcon} size={size} className={className} />
  if (stack === "html") return <HtmlIcon {...props} />
  if (stack === "css") return <CssIcon {...props} />
  if (stack === "sass") return <SassIcon {...props} />
  if (stack === "clerk") return <ClerkIcon {...props} />
  if (stack === "authjs") return <AuthjsIcon {...props} />
  if (stack === "jwt") return <JwtIcon {...props} />
  if (stack === "linkedin") return <LinkedinIcon {...props} />
  if (stack === "indeed") return <IndeedIcon {...props} />
  if (stack === "github") return <GithubIcon {...props} />
  if (stack === "medium") return <MediumIcon {...props} />
  if (stack === "devto") return <DevtoIcon {...props} />
  if (stack === "nodejs") return <NodejsIcon {...props} />
  if (stack === "d3") return <D3Icon {...props} />
  if (stack === "threejs") return <ThreejsIcon {...props} />
  if (stack === "reactquery") return <ReactQueryIcon {...props} />
  if (stack === "socketio") return <SocketioIcon {...props} />
  if (stack === "prisma") return <PrismaIcon {...props} />
  if (stack === "drizzle") return <DrizzleIcon {...props} />
  if (stack === "npm") return <NpmIcon {...props} />
  if (stack === "gmail") return <GmailIcon {...props} />

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-sm bg-muted text-[9px] font-bold tracking-tight text-muted-foreground",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden
      title={label}
    >
      {STACK_INITIAL[stack]}
    </span>
  )
}

export function StackChip({
  stack,
  className,
}: {
  stack: MarketplaceStack
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card px-2 py-1 text-xs font-medium text-foreground",
        className
      )}
    >
      <StackIcon stack={stack} size={16} />
      {MARKETPLACE_STACK_LABEL[stack]}
    </span>
  )
}

/** Stack keys that still fall back to letter badges (no SVG mark yet). */
export const STACK_ICONS_NEEDED: MarketplaceStack[] = ["recharts"]
