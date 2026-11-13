export type HangingBagLineItem = {
  qty: string
  description: string
  amount: string
}

export type HangingBagItem = {
  id: string
  name: string
  client: string
  lead: string
  start: string
  end: string
  color: string
  ink: string
  status: {
    label: string
    color: string
    angle: number
  }
  lines: HangingBagLineItem[]
}

/** @deprecated Use HangingBagItem */
export type Project = HangingBagItem

export const DEFAULT_HANGING_BAG_ITEMS: HangingBagItem[] = [
  {
    id: "P 1008",
    name: "NORTHWIND REBRAND",
    client: "Northwind Co.",
    lead: "M. Chen",
    start: "03.02",
    end: "04.18",
    color: "#c8e6f5",
    ink: "#1d4ed8",
    status: { label: "94% DONE", color: "#0f766e", angle: -14 },
    lines: [
      { qty: "12", description: "Brand audit", amount: "4,200" },
      { qty: "08", description: "Visual system", amount: "9,800" },
      { qty: "04", description: "Launch kit", amount: "3,150" },
    ],
  },
  {
    id: "P 1012",
    name: "ATELIER PACKAGING",
    client: "Atelier Lune",
    lead: "S. Park",
    start: "02.14",
    end: "03.30",
    color: "#f5e0b0",
    ink: "#b45309",
    status: { label: "RUSH!", color: "#dc2626", angle: -22 },
    lines: [
      { qty: "06", description: "Box prototypes", amount: "2,640" },
      { qty: "18", description: "Label set", amount: "1,980" },
      { qty: "02", description: "Press check", amount: "890" },
    ],
  },
  {
    id: "P 1003",
    name: "SIGNAL DASHBOARD",
    client: "Signal Labs",
    lead: "A. Rivera",
    start: "01.08",
    end: "05.01",
    color: "#e0d0f5",
    ink: "#6d28d9",
    status: { label: "ON HOLD", color: "#7c3aed", angle: -18 },
    lines: [
      { qty: "10", description: "UI frames", amount: "5,400" },
      { qty: "05", description: "Data model", amount: "3,200" },
      { qty: "03", description: "Pilot build", amount: "6,750" },
    ],
  },
  {
    id: "P 1019",
    name: "GREENHOUSE SITE",
    client: "Greenhouse",
    lead: "J. Okonkwo",
    start: "03.20",
    end: "04.28",
    color: "#c5ebd4",
    ink: "#047857",
    status: { label: "88% DONE", color: "#059669", angle: -12 },
    lines: [
      { qty: "14", description: "Page templates", amount: "4,900" },
      { qty: "07", description: "CMS setup", amount: "2,300" },
      { qty: "01", description: "Motion pass", amount: "1,450" },
    ],
  },
  {
    id: "P 1007",
    name: "CORAL COMMERCE",
    client: "Coral Market",
    lead: "L. Novak",
    start: "02.01",
    end: "03.12",
    color: "#f5d0c8",
    ink: "#be123c",
    status: { label: "DONE!", color: "#e11d48", angle: -20 },
    lines: [
      { qty: "09", description: "Checkout flow", amount: "3,780" },
      { qty: "11", description: "Product cards", amount: "2,150" },
      { qty: "04", description: "QA sweep", amount: "960" },
    ],
  },
  {
    id: "P 1021",
    name: "FOUNDRY IDENTITY",
    client: "Foundry Inc.",
    lead: "K. Holm",
    start: "03.05",
    end: "05.20",
    color: "#d8e2c8",
    ink: "#3f6212",
    status: { label: "RUSH!", color: "#ea580c", angle: -16 },
    lines: [
      { qty: "05", description: "Wordmark", amount: "2,200" },
      { qty: "16", description: "Asset pack", amount: "4,100" },
      { qty: "03", description: "Guidelines", amount: "1,870" },
    ],
  },
  {
    id: "P 1015",
    name: "MIST AUDIO APP",
    client: "Mist Audio",
    lead: "T. Nguyen",
    start: "01.22",
    end: "04.02",
    color: "#c8d8f5",
    ink: "#1e40af",
    status: { label: "ON HOLD", color: "#2563eb", angle: -15 },
    lines: [
      { qty: "08", description: "Player UI", amount: "3,540" },
      { qty: "06", description: "Library view", amount: "2,760" },
      { qty: "02", description: "Prototype", amount: "1,200" },
    ],
  },
  {
    id: "P 1024",
    name: "PEACH KITCHEN",
    client: "Peach Co.",
    lead: "R. Silva",
    start: "03.11",
    end: "04.09",
    color: "#f8dcb0",
    ink: "#c2410c",
    status: { label: "71% DONE", color: "#d97706", angle: -19 },
    lines: [
      { qty: "13", description: "Menu boards", amount: "1,980" },
      { qty: "04", description: "Wayfinding", amount: "2,420" },
      { qty: "09", description: "Print suite", amount: "3,310" },
    ],
  },
  {
    id: "P 1001",
    name: "IVORY STUDIO",
    client: "Ivory Co.",
    lead: "E. Brooks",
    start: "02.20",
    end: "04.15",
    color: "#f0dcc8",
    ink: "#92400e",
    status: { label: "DONE!", color: "#b45309", angle: -17 },
    lines: [
      { qty: "07", description: "Space plan", amount: "5,100" },
      { qty: "12", description: "Material board", amount: "2,880" },
      { qty: "03", description: "Signage", amount: "1,640" },
    ],
  },
  {
    id: "P 1028",
    name: "BLUEPRINT CRM",
    client: "Blueprint",
    lead: "N. Adeyemi",
    start: "03.01",
    end: "05.12",
    color: "#c5e0f5",
    ink: "#0369a1",
    status: { label: "RUSH!", color: "#dc2626", angle: -21 },
    lines: [
      { qty: "15", description: "Pipeline UI", amount: "6,200" },
      { qty: "06", description: "Integrations", amount: "4,450" },
      { qty: "02", description: "Handoff", amount: "980" },
    ],
  },
]

/** @deprecated Use DEFAULT_HANGING_BAG_ITEMS */
export const projects = DEFAULT_HANGING_BAG_ITEMS
