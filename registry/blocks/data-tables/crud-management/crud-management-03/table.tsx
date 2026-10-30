"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  BoxIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleDollarSignIcon,
  DownloadIcon,
  PrinterIcon,
  RotateCcwIcon,
  SearchIcon,
  TruckIcon,
  XCircleIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@sonojs/ui/components/alert-dialog"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sonojs/ui/components/dialog"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@sonojs/ui/components/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@sonojs/ui/components/tabs"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

type FulfillmentStatus =
  | "pending"
  | "processing"
  | "ready_to_ship"
  | "shipped"
  | "delivered"
  | "cancelled"
type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partially_refunded"
type OrderItem = {
  id: string
  name: string
  sku: string
  image?: string
  qty: number
  unitPrice: number
  refundedQty: number
}
type Order = {
  id: string
  number: string
  customer: {
    name: string
    email: string
    phone: string
    shippingAddress: string
    billingAddress: string
  }
  createdAt: string
  items: OrderItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  paymentStatus: PaymentStatus
  fulfillmentStatus: FulfillmentStatus
  shippingMethod: string
  tracking?: string
  shippedAt?: string
  estimate?: string
  timeline: { id: string; label: string; at: string }[]
  refunds: {
    id: string
    itemId: string
    qty: number
    amount: number
    reason: string
    at: string
  }[]
}

const FULFILLMENT_STAGES: FulfillmentStatus[] = [
  "pending",
  "processing",
  "ready_to_ship",
  "shipped",
  "delivered",
  "cancelled",
]
const PAYMENT_STATUSES: PaymentStatus[] = [
  "pending",
  "paid",
  "failed",
  "partially_refunded",
  "refunded",
]
const NEXT_STATUS: Partial<Record<FulfillmentStatus, FulfillmentStatus>> = {
  pending: "processing",
  processing: "ready_to_ship",
  ready_to_ship: "shipped",
  shipped: "delivered",
}
const STATUS_LABEL: Record<FulfillmentStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  ready_to_ship: "Ready to ship",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
}
const PAYMENT_LABEL: Record<PaymentStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  failed: "Failed",
  refunded: "Refunded",
  partially_refunded: "Partially refunded",
}
const STATUS_STYLE: Record<FulfillmentStatus, string> = {
  pending: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  processing: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  ready_to_ship: "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-400",
  shipped: "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
  delivered: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  cancelled: "border-border/70 bg-muted text-muted-foreground",
}
const PAYMENT_STYLE: Record<PaymentStatus, string> = {
  pending: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  paid: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  failed: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
  refunded: "border-border/70 bg-muted text-muted-foreground",
  partially_refunded: "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-400",
}

function makeOrder(
  input: Omit<Order, "subtotal" | "total" | "refunds"> & { refunds?: Order["refunds"] }
): Order {
  const subtotal = input.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
  return {
    ...input,
    subtotal,
    total: subtotal - input.discount + input.shipping + input.tax,
    refunds: input.refunds ?? [],
  }
}

const ORDERS: Order[] = [
  makeOrder({
    id: "ord-1048",
    number: "ORD-1048",
    customer: {
      name: "Maya Chen",
      email: "maya.chen@example.com",
      phone: "+1 415 555 0138",
      shippingAddress: "44 Market Street, San Francisco, CA 94105",
      billingAddress: "44 Market Street, San Francisco, CA 94105",
    },
    createdAt: "2026-10-30T08:24:00Z",
    items: [
      { id: "i-1", name: "Canvas weekender", sku: "BAG-CAN-02", qty: 1, unitPrice: 129, refundedQty: 0 },
      { id: "i-2", name: "Packing cubes", sku: "ACC-PC-03", qty: 2, unitPrice: 24, refundedQty: 0 },
    ],
    discount: 15,
    shipping: 0,
    tax: 13.77,
    paymentStatus: "paid",
    fulfillmentStatus: "pending",
    shippingMethod: "UPS Ground",
    estimate: "Nov 4–6",
    timeline: [
      { id: "t-1", label: "Order placed", at: "2026-10-30T08:24:00Z" },
      { id: "t-2", label: "Payment captured · txn_demo_71L8", at: "2026-10-30T08:25:00Z" },
    ],
  }),
  makeOrder({
    id: "ord-1047",
    number: "ORD-1047",
    customer: {
      name: "Noah Williams",
      email: "noah.w@example.com",
      phone: "+1 212 555 0171",
      shippingAddress: "18 Orchard Lane, Brooklyn, NY 11201",
      billingAddress: "18 Orchard Lane, Brooklyn, NY 11201",
    },
    createdAt: "2026-10-29T16:10:00Z",
    items: [
      { id: "i-3", name: "Merino overshirt", sku: "APP-MER-11", qty: 1, unitPrice: 184, refundedQty: 0 },
    ],
    discount: 0,
    shipping: 12,
    tax: 15.68,
    paymentStatus: "paid",
    fulfillmentStatus: "processing",
    shippingMethod: "FedEx 2Day",
    estimate: "Nov 2",
    timeline: [
      { id: "t-3", label: "Order placed", at: "2026-10-29T16:10:00Z" },
      { id: "t-4", label: "Picking started", at: "2026-10-30T07:40:00Z" },
    ],
  }),
  makeOrder({
    id: "ord-1046",
    number: "ORD-1046",
    customer: {
      name: "Aisha Rahman",
      email: "aisha.r@example.com",
      phone: "+44 20 7946 0842",
      shippingAddress: "22 King Street, London SW1Y 6QY, UK",
      billingAddress: "22 King Street, London SW1Y 6QY, UK",
    },
    createdAt: "2026-10-29T11:42:00Z",
    items: [
      { id: "i-4", name: "Desk organizer", sku: "DSK-ORG-04", qty: 2, unitPrice: 58, refundedQty: 0 },
      { id: "i-5", name: "Cable set", sku: "DSK-CAB-02", qty: 1, unitPrice: 22, refundedQty: 0 },
    ],
    discount: 10,
    shipping: 18,
    tax: 11.68,
    paymentStatus: "paid",
    fulfillmentStatus: "ready_to_ship",
    shippingMethod: "DHL Express",
    estimate: "Nov 3",
    timeline: [
      { id: "t-5", label: "Order placed", at: "2026-10-29T11:42:00Z" },
      { id: "t-6", label: "Packed and label requested", at: "2026-10-30T09:18:00Z" },
    ],
  }),
  makeOrder({
    id: "ord-1045",
    number: "ORD-1045",
    customer: {
      name: "Leo Martin",
      email: "leo.martin@example.com",
      phone: "+33 1 84 80 20 26",
      shippingAddress: "7 Rue Cler, 75007 Paris, France",
      billingAddress: "12 Avenue Bosquet, 75007 Paris, France",
    },
    createdAt: "2026-10-28T13:05:00Z",
    items: [
      { id: "i-6", name: "Studio headphones", sku: "AUD-STU-07", qty: 1, unitPrice: 249, refundedQty: 0 },
    ],
    discount: 20,
    shipping: 14,
    tax: 18.32,
    paymentStatus: "paid",
    fulfillmentStatus: "shipped",
    shippingMethod: "DHL Express",
    tracking: "DHL-7719-2048",
    shippedAt: "2026-10-29T14:32:00Z",
    estimate: "Oct 31",
    timeline: [
      { id: "t-7", label: "Order placed", at: "2026-10-28T13:05:00Z" },
      { id: "t-8", label: "Shipped · DHL-7719-2048", at: "2026-10-29T14:32:00Z" },
    ],
  }),
  makeOrder({
    id: "ord-1044",
    number: "ORD-1044",
    customer: {
      name: "Sofia Alvarez",
      email: "sofia.a@example.com",
      phone: "+34 91 555 0190",
      shippingAddress: "Calle de Serrano 55, 28006 Madrid, Spain",
      billingAddress: "Calle de Serrano 55, 28006 Madrid, Spain",
    },
    createdAt: "2026-10-25T09:30:00Z",
    items: [
      { id: "i-7", name: "Stoneware set", sku: "HOM-STN-08", qty: 1, unitPrice: 142, refundedQty: 1 },
      { id: "i-8", name: "Linen napkins", sku: "HOM-LIN-04", qty: 2, unitPrice: 28, refundedQty: 0 },
    ],
    discount: 0,
    shipping: 16,
    tax: 16.05,
    paymentStatus: "partially_refunded",
    fulfillmentStatus: "delivered",
    shippingMethod: "UPS Standard",
    tracking: "UPS-5902-6631",
    shippedAt: "2026-10-26T10:20:00Z",
    estimate: "Delivered Oct 29",
    refunds: [
      { id: "r-1", itemId: "i-7", qty: 1, amount: 142, reason: "Arrived damaged", at: "2026-10-30T07:50:00Z" },
    ],
    timeline: [
      { id: "t-9", label: "Order placed", at: "2026-10-25T09:30:00Z" },
      { id: "t-10", label: "Delivered", at: "2026-10-29T12:02:00Z" },
      { id: "t-11", label: "Demo refund recorded · $142.00", at: "2026-10-30T07:50:00Z" },
    ],
  }),
  makeOrder({
    id: "ord-1043",
    number: "ORD-1043",
    customer: {
      name: "Ethan Brooks",
      email: "ethan.b@example.com",
      phone: "+1 312 555 0166",
      shippingAddress: "600 W Lake Street, Chicago, IL 60661",
      billingAddress: "600 W Lake Street, Chicago, IL 60661",
    },
    createdAt: "2026-10-24T18:17:00Z",
    items: [
      { id: "i-9", name: "Running vest", sku: "OUT-RUN-05", qty: 1, unitPrice: 88, refundedQty: 0 },
    ],
    discount: 8,
    shipping: 7,
    tax: 6.96,
    paymentStatus: "refunded",
    fulfillmentStatus: "cancelled",
    shippingMethod: "USPS Priority",
    timeline: [
      { id: "t-12", label: "Order placed", at: "2026-10-24T18:17:00Z" },
      { id: "t-13", label: "Order cancelled before shipment", at: "2026-10-24T19:03:00Z" },
    ],
  }),
  makeOrder({
    id: "ord-1042",
    number: "ORD-1042",
    customer: {
      name: "Hana Ito",
      email: "hana.ito@example.com",
      phone: "+81 3 5550 1840",
      shippingAddress: "2-8-1 Marunouchi, Chiyoda, Tokyo 100-0005",
      billingAddress: "2-8-1 Marunouchi, Chiyoda, Tokyo 100-0005",
    },
    createdAt: "2026-10-23T06:52:00Z",
    items: [
      { id: "i-10", name: "Travel adapter", sku: "TRV-ADP-01", qty: 2, unitPrice: 36, refundedQty: 0 },
      { id: "i-11", name: "Tech pouch", sku: "TRV-PCH-03", qty: 1, unitPrice: 64, refundedQty: 0 },
    ],
    discount: 0,
    shipping: 21,
    tax: 13.6,
    paymentStatus: "pending",
    fulfillmentStatus: "pending",
    shippingMethod: "International tracked",
    estimate: "Nov 7–10",
    timeline: [{ id: "t-14", label: "Order placed · awaiting payment", at: "2026-10-23T06:52:00Z" }],
  }),
]

function money(value: number) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value))
}

function csvCell(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`
}

function downloadFile(contents: string, name: string, type: string) {
  const url = URL.createObjectURL(new Blob([contents], { type }))
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = name
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

function downloadOrdersCsv(orders: Order[], name: string) {
  const header = [
    "Order",
    "Created",
    "Customer",
    "Email",
    "Payment",
    "Fulfillment",
    "Items",
    "Subtotal",
    "Discount",
    "Shipping",
    "Tax",
    "Total",
    "Tracking",
  ]
  const rows = orders.map((order) => [
    order.number,
    order.createdAt,
    order.customer.name,
    order.customer.email,
    order.paymentStatus,
    order.fulfillmentStatus,
    order.items.reduce((sum, item) => sum + item.qty, 0),
    order.subtotal.toFixed(2),
    order.discount.toFixed(2),
    order.shipping.toFixed(2),
    order.tax.toFixed(2),
    order.total.toFixed(2),
    order.tracking ?? "",
  ])
  downloadFile(
    [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n"),
    name,
    "text/csv;charset=utf-8"
  )
}

function StatusBadge({ status }: { status: FulfillmentStatus }) {
  return (
    <Badge variant="outline" className={cn("rounded-full", STATUS_STYLE[status])}>
      {STATUS_LABEL[status]}
    </Badge>
  )
}

function PaymentBadge({ status }: { status: PaymentStatus }) {
  return (
    <Badge variant="outline" className={cn("rounded-full", PAYMENT_STYLE[status])}>
      {PAYMENT_LABEL[status]}
    </Badge>
  )
}

function withTimeline(order: Order, label: string, at: string) {
  return {
    ...order,
    timeline: [
      ...order.timeline,
      { id: `timeline-${order.id}-${at}`, label, at },
    ],
  }
}

export default function CrudManagement03({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [orders, setOrders] = React.useState<Order[]>(ORDERS)
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [query, setQuery] = React.useState("")
  const [dateFrom, setDateFrom] = React.useState("")
  const [dateTo, setDateTo] = React.useState("")
  const [payment, setPayment] = React.useState<PaymentStatus | "all">("all")
  const [fulfillment, setFulfillment] = React.useState<FulfillmentStatus | "all">("all")
  const [minAmount, setMinAmount] = React.useState("")
  const [maxAmount, setMaxAmount] = React.useState("")
  const [sort, setSort] = React.useState<"newest" | "oldest" | "highest" | "lowest">("newest")
  const [page, setPage] = React.useState(1)
  const [trackingOpen, setTrackingOpen] = React.useState(false)
  const [tracking, setTracking] = React.useState("")
  const [cancelOpen, setCancelOpen] = React.useState(false)
  const [refundOpen, setRefundOpen] = React.useState(false)
  const [refundItemId, setRefundItemId] = React.useState("")
  const [refundQty, setRefundQty] = React.useState(1)
  const [refundReason, setRefundReason] = React.useState("")
  const pageSize = 5
  const selected = orders.find((order) => order.id === selectedId) ?? null

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    return orders
      .filter((order) => {
        if (
          needle &&
          !`${order.number} ${order.customer.name} ${order.customer.email}`
            .toLowerCase()
            .includes(needle)
        ) return false
        if (dateFrom && order.createdAt.slice(0, 10) < dateFrom) return false
        if (dateTo && order.createdAt.slice(0, 10) > dateTo) return false
        if (payment !== "all" && order.paymentStatus !== payment) return false
        if (fulfillment !== "all" && order.fulfillmentStatus !== fulfillment) return false
        if (minAmount && order.total < Number(minAmount)) return false
        if (maxAmount && order.total > Number(maxAmount)) return false
        return true
      })
      .sort((a, b) => {
        if (sort === "oldest") return +new Date(a.createdAt) - +new Date(b.createdAt)
        if (sort === "highest") return b.total - a.total
        if (sort === "lowest") return a.total - b.total
        return +new Date(b.createdAt) - +new Date(a.createdAt)
      })
  }, [orders, query, dateFrom, dateTo, payment, fulfillment, minAmount, maxAmount, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)

  const updateOrder = (id: string, updater: (order: Order) => Order) => {
    setOrders((current) => current.map((order) => (order.id === id ? updater(order) : order)))
  }

  const advanceOrder = (order: Order) => {
    const next = NEXT_STATUS[order.fulfillmentStatus]
    if (!next || (next === "shipped" && !order.tracking)) return
    const now = new Date().toISOString()
    updateOrder(order.id, (current) => {
      const advanced = {
        ...current,
        fulfillmentStatus: next,
        shippedAt: next === "shipped" ? now : current.shippedAt,
      }
      return withTimeline(advanced, `Fulfillment updated to ${STATUS_LABEL[next]}`, now)
    })
  }

  const saveTracking = () => {
    if (!selected || !tracking.trim()) return
    const now = new Date().toISOString()
    updateOrder(selected.id, (current) => {
      const withTracking = {
        ...current,
        tracking: tracking.trim(),
        fulfillmentStatus:
          current.fulfillmentStatus === "ready_to_ship" ? "shipped" as const : current.fulfillmentStatus,
        shippedAt:
          current.fulfillmentStatus === "ready_to_ship"
            ? now
            : current.shippedAt,
      }
      return withTimeline(
        withTracking,
        current.fulfillmentStatus === "ready_to_ship"
          ? `Shipped · ${tracking.trim()}`
          : `Tracking updated · ${tracking.trim()}`,
        now
      )
    })
    setTrackingOpen(false)
    setTracking("")
  }

  const cancelOrder = () => {
    if (!selected || !["pending", "processing", "ready_to_ship"].includes(selected.fulfillmentStatus)) return
    const now = new Date().toISOString()
    updateOrder(selected.id, (current) =>
      withTimeline({ ...current, fulfillmentStatus: "cancelled" }, "Order cancelled before shipment", now)
    )
    setCancelOpen(false)
  }

  const refundableItem = selected?.items.find((item) => item.id === refundItemId)
  const maxRefundQty = refundableItem ? refundableItem.qty - refundableItem.refundedQty : 0
  const refundableAmount = refundableItem ? refundableItem.unitPrice * Math.min(refundQty, maxRefundQty) : 0
  const canRefund =
    Boolean(selected && refundableItem && maxRefundQty > 0 && refundQty > 0 && refundQty <= maxRefundQty && refundReason.trim()) &&
    selected?.paymentStatus !== "pending" &&
    selected?.paymentStatus !== "failed" &&
    selected?.paymentStatus !== "refunded"

  const confirmRefund = () => {
    if (!selected || !refundableItem || !canRefund) return
    const now = new Date().toISOString()
    updateOrder(selected.id, (current) => {
      const refund = {
        id: `refund-${selected.id}-${now}`,
        itemId: refundableItem.id,
        qty: refundQty,
        amount: refundableItem.unitPrice * refundQty,
        reason: refundReason.trim(),
        at: now,
      }
      const refunds = [...current.refunds, refund]
      const refundedItemValue = refunds.reduce((sum, item) => sum + item.amount, 0)
      const paymentStatus: PaymentStatus =
        refundedItemValue >= current.subtotal ? "refunded" : "partially_refunded"
      return withTimeline(
        {
          ...current,
          paymentStatus,
          refunds,
          items: current.items.map((item) =>
            item.id === refundableItem.id
              ? { ...item, refundedQty: item.refundedQty + refundQty }
              : item
          ),
        },
        `Demo refund recorded · ${money(refund.amount)}`,
        now
      )
    })
    setRefundOpen(false)
    setRefundItemId("")
    setRefundQty(1)
    setRefundReason("")
  }

  const resetFilters = () => {
    setQuery("")
    setDateFrom("")
    setDateTo("")
    setPayment("all")
    setFulfillment("all")
    setMinAmount("")
    setMaxAmount("")
    setSort("newest")
  }

  const openTracking = () => {
    setTracking(selected?.tracking ?? "")
    setTrackingOpen(true)
  }

  return (
    <div className={cn("w-full min-w-0 space-y-5", className)} {...props}>
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-start">
            <h2 className="text-2xl font-semibold tracking-tight">Orders</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Create, update, fulfill, and refund orders.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer gap-2"
            onClick={() => downloadOrdersCsv(filtered, "fulfillment-orders.csv")}
          >
            <DownloadIcon className="size-4" aria-hidden />
            Export CSV
          </Button>
        </header>

        <Tabs defaultValue="table">
          <TabsList className="w-fit">
            <TabsTrigger value="table">Orders table</TabsTrigger>
            <TabsTrigger value="board">Fulfillment board</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="space-y-4">
            <section className="rounded-[12px] border border-border/70 bg-card shadow-soft">
              <div className="space-y-3 border-b border-border/70 p-4">
                <div className="grid gap-3 lg:grid-cols-12">
                  <div className="relative lg:col-span-4">
                    <SearchIcon className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                    <Input
                      value={query}
                      onChange={(event) => {
                        setQuery(event.target.value)
                        setPage(1)
                      }}
                      placeholder="Search order, customer, or email…"
                      className="ps-9"
                      aria-label="Search orders"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 lg:col-span-4">
                    <Input type="date" value={dateFrom} onChange={(event) => { setDateFrom(event.target.value); setPage(1) }} aria-label="Created from" />
                    <Input type="date" value={dateTo} onChange={(event) => { setDateTo(event.target.value); setPage(1) }} aria-label="Created through" />
                  </div>
                  <Select value={payment} onValueChange={(value) => { setPayment(value as PaymentStatus | "all"); setPage(1) }}>
                    <SelectTrigger className="cursor-pointer lg:col-span-2" aria-label="Payment status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All payments</SelectItem>
                      {PAYMENT_STATUSES.map((item) => <SelectItem key={item} value={item}>{PAYMENT_LABEL[item]}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={fulfillment} onValueChange={(value) => { setFulfillment(value as FulfillmentStatus | "all"); setPage(1) }}>
                    <SelectTrigger className="cursor-pointer lg:col-span-2" aria-label="Fulfillment status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All fulfillment</SelectItem>
                      {FULFILLMENT_STAGES.map((item) => <SelectItem key={item} value={item}>{STATUS_LABEL[item]}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="grid grid-cols-2 gap-2 sm:w-64">
                    <Input type="number" min="0" value={minAmount} onChange={(event) => { setMinAmount(event.target.value); setPage(1) }} placeholder="Min $" aria-label="Minimum amount" />
                    <Input type="number" min="0" value={maxAmount} onChange={(event) => { setMaxAmount(event.target.value); setPage(1) }} placeholder="Max $" aria-label="Maximum amount" />
                  </div>
                  <Select value={sort} onValueChange={(value) => { setSort(value as typeof sort); setPage(1) }}>
                    <SelectTrigger className="cursor-pointer sm:w-44" aria-label="Sort orders">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest first</SelectItem>
                      <SelectItem value="oldest">Oldest first</SelectItem>
                      <SelectItem value="highest">Highest amount</SelectItem>
                      <SelectItem value="lowest">Lowest amount</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="ghost" className="cursor-pointer sm:ms-auto" onClick={resetFilters}>
                    Reset filters
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Fulfillment</TableHead>
                      <TableHead className="text-end">Total</TableHead>
                      <TableHead className="text-end">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visible.length === 0 ? (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={7} className="h-36 text-center text-muted-foreground">
                          No orders match these filters.
                        </TableCell>
                      </TableRow>
                    ) : visible.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <button type="button" className="cursor-pointer font-mono text-sm font-medium hover:underline" onClick={() => setSelectedId(order.id)}>
                            {order.number}
                          </button>
                          <p className="mt-0.5 text-xs text-muted-foreground">{order.items.reduce((sum, item) => sum + item.qty, 0)} items</p>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                        <TableCell><PaymentBadge status={order.paymentStatus} /></TableCell>
                        <TableCell><StatusBadge status={order.fulfillmentStatus} /></TableCell>
                        <TableCell className="text-end font-medium tabular-nums">{money(order.total)}</TableCell>
                        <TableCell className="text-end">
                          <Button type="button" size="sm" variant="outline" className="cursor-pointer" onClick={() => setSelectedId(order.id)}>
                            Open
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-col gap-3 border-t border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button type="button" size="icon-sm" variant="outline" className="cursor-pointer disabled:cursor-not-allowed" disabled={page === 1} onClick={() => setPage((value) => value - 1)} aria-label="Previous page">
                    <ChevronLeftIcon className="icon-dir size-4" aria-hidden />
                  </Button>
                  <span className="text-sm tabular-nums">Page {page} of {pageCount}</span>
                  <Button type="button" size="icon-sm" variant="outline" className="cursor-pointer disabled:cursor-not-allowed" disabled={page === pageCount} onClick={() => setPage((value) => value + 1)} aria-label="Next page">
                    <ChevronRightIcon className="icon-dir size-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="board">
            <div className="overflow-x-auto pb-2">
              <div className="grid min-w-280 grid-cols-6 gap-3">
                {FULFILLMENT_STAGES.map((status) => {
                  const stageOrders = orders.filter((order) => order.fulfillmentStatus === status)
                  return (
                    <section key={status} className="min-w-0 rounded-[12px] border border-border/70 bg-muted/30 p-3">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold">{STATUS_LABEL[status]}</h2>
                        <Badge variant="secondary" className="rounded-full">{stageOrders.length}</Badge>
                      </div>
                      <div className="space-y-2">
                        {stageOrders.length === 0 ? (
                          <p className="rounded-[12px] border border-dashed border-border/70 p-4 text-center text-xs text-muted-foreground">No orders</p>
                        ) : stageOrders.map((order) => (
                          <button
                            key={order.id}
                            type="button"
                            className="w-full cursor-pointer rounded-[12px] border border-border/70 bg-card p-3 text-start shadow-sm transition-colors hover:border-primary/40"
                            onClick={() => setSelectedId(order.id)}
                          >
                            <span className="font-mono text-xs font-semibold">{order.number}</span>
                            <span className="mt-2 block text-sm font-medium">{order.customer.name}</span>
                            <span className="mt-1 block text-xs text-muted-foreground">{order.items.length} lines · {order.shippingMethod}</span>
                            <span className="mt-3 flex items-center justify-between gap-2 text-xs">
                              <PaymentBadge status={order.paymentStatus} />
                              <span className="font-semibold tabular-nums">{money(order.total)}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </section>
                  )
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelectedId(null)}>
        <SheetContent side="end" className="w-full overflow-y-auto sm:max-w-2xl">
          {selected && (
            <>
              <SheetHeader className="border-b border-border/70 pe-12">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="text-start">
                    <SheetTitle className="font-mono text-lg">{selected.number}</SheetTitle>
                    <SheetDescription>{formatDate(selected.createdAt)} · {selected.customer.name}</SheetDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={selected.fulfillmentStatus} />
                    <PaymentBadge status={selected.paymentStatus} />
                  </div>
                </div>
              </SheetHeader>

              <div id="order-print-summary" className="space-y-6 p-4 sm:p-6">
                <section className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="font-semibold">Items</h3>
                    <span className="text-sm text-muted-foreground">{selected.items.reduce((sum, item) => sum + item.qty, 0)} units</span>
                  </div>
                  <div className="space-y-4">
                    {selected.items.map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-muted">
                          <BoxIcon className="size-5 text-muted-foreground" aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1 text-start">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.sku} · Qty {item.qty}{item.refundedQty ? ` · ${item.refundedQty} refunded` : ""}</p>
                        </div>
                        <p className="font-medium tabular-nums">{money(item.qty * item.unitPrice)}</p>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <dl className="space-y-2 text-sm">
                    {[
                      ["Subtotal", selected.subtotal],
                      ["Discount", -selected.discount],
                      ["Shipping", selected.shipping],
                      ["Tax", selected.tax],
                    ].map(([label, value]) => (
                      <div key={String(label)} className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">{label}</dt>
                        <dd className="tabular-nums">{money(Number(value))}</dd>
                      </div>
                    ))}
                    <div className="flex justify-between gap-3 border-t border-border/70 pt-2 text-base font-semibold">
                      <dt>Total</dt><dd className="tabular-nums">{money(selected.total)}</dd>
                    </div>
                  </dl>
                </section>

                <div className="grid gap-4 sm:grid-cols-2">
                  <section className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft text-start">
                    <h3 className="mb-3 font-semibold">Customer</h3>
                    <p className="font-medium">{selected.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{selected.customer.email}</p>
                    <p className="text-sm text-muted-foreground">{selected.customer.phone}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ship to</p>
                    <p className="mt-1 text-sm">{selected.customer.shippingAddress}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Bill to</p>
                    <p className="mt-1 text-sm">{selected.customer.billingAddress}</p>
                  </section>
                  <section className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft text-start">
                    <h3 className="mb-3 font-semibold">Payment & fulfillment</h3>
                    <dl className="space-y-3 text-sm">
                      <div><dt className="text-xs text-muted-foreground">Payment</dt><dd className="mt-1"><PaymentBadge status={selected.paymentStatus} /></dd></div>
                      <div><dt className="text-xs text-muted-foreground">Transaction reference</dt><dd className="mt-1 font-mono text-xs">txn_demo_{selected.id.slice(-4)}91</dd></div>
                      <div><dt className="text-xs text-muted-foreground">Shipping method</dt><dd>{selected.shippingMethod}</dd></div>
                      <div><dt className="text-xs text-muted-foreground">Tracking</dt><dd className="font-mono text-xs">{selected.tracking ?? "Not assigned"}</dd></div>
                      <div><dt className="text-xs text-muted-foreground">Estimate</dt><dd>{selected.estimate ?? "Not available"}</dd></div>
                    </dl>
                  </section>
                </div>

                <section className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft text-start">
                  <h3 className="mb-4 font-semibold">Timeline</h3>
                  <ol className="space-y-4">
                    {[...selected.timeline].reverse().map((event) => (
                      <li key={event.id} className="relative ps-6">
                        <span className="absolute inset-s-0 top-1.5 size-2 rounded-full bg-primary" />
                        <p className="text-sm font-medium">{event.label}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(event.at)}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>

              <div className="sticky bottom-0 mt-auto border-t border-border/70 bg-background/95 p-4 backdrop-blur">
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    className="cursor-pointer gap-2 disabled:cursor-not-allowed"
                    disabled={!NEXT_STATUS[selected.fulfillmentStatus] || (selected.fulfillmentStatus === "ready_to_ship" && !selected.tracking)}
                    title={
                      selected.fulfillmentStatus === "ready_to_ship" && !selected.tracking
                        ? "Add tracking before marking shipped"
                        : !NEXT_STATUS[selected.fulfillmentStatus]
                          ? `No next step is available for ${STATUS_LABEL[selected.fulfillmentStatus].toLowerCase()} orders`
                          : `Mark ${STATUS_LABEL[NEXT_STATUS[selected.fulfillmentStatus]!].toLowerCase()}`
                    }
                    onClick={() => advanceOrder(selected)}
                  >
                    {selected.fulfillmentStatus === "shipped" ? <CheckCircle2Icon className="size-4" aria-hidden /> : <ArrowUpIcon className="size-4" aria-hidden />}
                    {NEXT_STATUS[selected.fulfillmentStatus] ? `Mark ${STATUS_LABEL[NEXT_STATUS[selected.fulfillmentStatus]!]}` : "Fulfillment complete"}
                  </Button>
                  <Button type="button" variant="outline" className="cursor-pointer gap-2 disabled:cursor-not-allowed" disabled={!["ready_to_ship", "shipped"].includes(selected.fulfillmentStatus)} title={!["ready_to_ship", "shipped"].includes(selected.fulfillmentStatus) ? "Tracking is available only when an order is ready to ship or shipped" : "Add or update tracking"} onClick={openTracking}>
                    <TruckIcon className="size-4" aria-hidden /> Tracking
                  </Button>
                  <Button type="button" variant="outline" className="cursor-pointer gap-2" onClick={() => window.print()}>
                    <PrinterIcon className="size-4" aria-hidden /> Print
                  </Button>
                  <Button type="button" variant="outline" className="cursor-pointer gap-2" onClick={() => downloadOrdersCsv([selected], `${selected.number.toLowerCase()}.csv`)}>
                    <DownloadIcon className="size-4" aria-hidden /> CSV
                  </Button>
                  <Button type="button" variant="outline" className="cursor-pointer gap-2 disabled:cursor-not-allowed" disabled={!selected.items.some((item) => item.refundedQty < item.qty) || ["pending", "failed", "refunded"].includes(selected.paymentStatus)} title={["pending", "failed", "refunded"].includes(selected.paymentStatus) ? "Only captured, partially refunded payments can be refunded" : "Record a simulated return or refund"} onClick={() => setRefundOpen(true)}>
                    <RotateCcwIcon className="size-4" aria-hidden /> Return / refund
                  </Button>
                  <Button type="button" variant="destructive" className="cursor-pointer gap-2 disabled:cursor-not-allowed" disabled={!["pending", "processing", "ready_to_ship"].includes(selected.fulfillmentStatus)} title={!["pending", "processing", "ready_to_ship"].includes(selected.fulfillmentStatus) ? "Shipped, delivered, and cancelled orders cannot be cancelled" : "Cancel this order"} onClick={() => setCancelOpen(true)}>
                    <XCircleIcon className="size-4" aria-hidden /> Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={trackingOpen} onOpenChange={setTrackingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add tracking</DialogTitle>
            <DialogDescription>
              Saving tracking on a ready-to-ship order marks it shipped.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="tracking-number">Tracking number</Label>
            <Input id="tracking-number" value={tracking} onChange={(event) => setTracking(event.target.value)} placeholder="e.g. UPS-1234-5678" />
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="outline" className="cursor-pointer">Cancel</Button></DialogClose>
            <Button type="button" className="cursor-pointer disabled:cursor-not-allowed" disabled={!tracking.trim()} onClick={saveTracking}>Save tracking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
        <DialogContent style={{ maxWidth: "min(32rem, calc(100% - 2rem))" }}>
          <DialogHeader>
            <DialogTitle>Record return or refund</DialogTitle>
            <DialogDescription>Select an eligible item and quantity.</DialogDescription>
          </DialogHeader>
          <Alert className="border-amber-500/30 bg-amber-500/10">
            <CircleDollarSignIcon aria-hidden />
            <AlertTitle>Demo simulation</AlertTitle>
            <AlertDescription>
              This updates local demo data only. No payment processor is contacted and no real money moves.
            </AlertDescription>
          </Alert>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Eligible item</Label>
              <Select value={refundItemId} onValueChange={(value) => { setRefundItemId(value); setRefundQty(1) }}>
                <SelectTrigger className="cursor-pointer"><SelectValue placeholder="Choose an item" /></SelectTrigger>
                <SelectContent>
                  {selected?.items.filter((item) => item.refundedQty < item.qty).map((item) => (
                    <SelectItem key={item.id} value={item.id}>{item.name} · {item.qty - item.refundedQty} available</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="refund-quantity">Quantity</Label>
              <Input id="refund-quantity" type="number" min="1" max={Math.max(1, maxRefundQty)} value={refundQty} onChange={(event) => setRefundQty(Number(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="refund-reason">Reason</Label>
              <Textarea id="refund-reason" value={refundReason} onChange={(event) => setRefundReason(event.target.value)} placeholder="Describe the return or refund reason…" />
            </div>
            <div className="flex items-center justify-between rounded-[12px] border border-border/70 bg-muted/40 p-3">
              <span className="text-sm text-muted-foreground">Simulated refundable amount</span>
              <span className="font-semibold tabular-nums">{money(refundableAmount)}</span>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="outline" className="cursor-pointer">Cancel</Button></DialogClose>
            <Button type="button" className="cursor-pointer disabled:cursor-not-allowed" disabled={!canRefund} onClick={confirmRefund}>Confirm simulation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel {selected?.number}?</AlertDialogTitle>
            <AlertDialogDescription>
              The order remains in the workspace with a cancelled status and a timeline record. It is not deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Keep order</AlertDialogCancel>
            <AlertDialogAction variant="destructive" className="cursor-pointer" onClick={cancelOrder}>Cancel order</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
