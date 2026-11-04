import type { LucideIcon } from "lucide-react"
import {
  CloudIcon,
  CpuIcon,
  GlobeIcon,
  LeafIcon,
  RocketIcon,
  ShieldIcon,
  SunIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react"

export type ChainCarouselItem = {
  id: string | number
  name: string
  icon: LucideIcon
  /** Secondary line - description or metric. */
  details?: string
  /** Optional image URL instead of the Lucide icon. */
  logo?: string
}

/** Demo items for docs + install defaults. */
export const DEFAULT_CHAIN_CAROUSEL_ITEMS: ChainCarouselItem[] = [
  {
    id: "1",
    name: "Instant Deployment",
    icon: RocketIcon,
    details: "1.2s avg launch time",
  },
  {
    id: "2",
    name: "Global CDN",
    icon: GlobeIcon,
    details: "Distributed over 50 regions",
  },
  {
    id: "3",
    name: "Sustainable Core",
    icon: LeafIcon,
    details: "100% green energy",
  },
  {
    id: "4",
    name: "Advanced AI Logic",
    icon: CpuIcon,
    details: "High-throughput inference",
  },
  {
    id: "5",
    name: "Real-time Analytics",
    icon: ZapIcon,
    details: "Latency under 10ms",
  },
  {
    id: "6",
    name: "Enterprise Security",
    icon: ShieldIcon,
    details: "ISO 27001 ready",
  },
  {
    id: "7",
    name: "Scalable Database",
    icon: CloudIcon,
    details: "Petabyte ready",
  },
  {
    id: "8",
    name: "Universal SSO",
    icon: SunIcon,
    details: "Major identity providers",
  },
  {
    id: "9",
    name: "Future Proofing",
    icon: TrendingUpIcon,
    details: "Quarterly feature drops",
  },
]
