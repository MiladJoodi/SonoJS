"use client"

import * as React from "react"
import {
  CalendarDaysIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

type OrderStatus = "open" | "fulfilled" | "cancelled"

type Order = {
  id: string
  orderNumber: string
  customer: string
  status: OrderStatus
  amount: number
  createdAt: string
  region: string
}

type Condition =
  | {
      id: string
      field: "customer"
      operator: "contains" | "not_contains"
      value: string
    }
  | {
      id: string
      field: "status"
      operator: "is" | "is_not"
      value: OrderStatus
    }
  | {
      id: string
      field: "amount"
      operator: "gt" | "lt" | "between"
      value: string
      valueEnd?: string
    }

type ConditionField = Condition["field"]

const ORDERS: Order[] = [
  { id: "1", orderNumber: "ORD-1048", customer: "Northwind Labs", status: "fulfilled", amount: 2480, createdAt: "2026-01-08", region: "North America" },
  { id: "2", orderNumber: "ORD-1049", customer: "Acme Retail", status: "open", amount: 890, createdAt: "2026-01-14", region: "Europe" },
  { id: "3", orderNumber: "ORD-1050", customer: "Orbit Media", status: "cancelled", amount: 4120, createdAt: "2026-01-21", region: "Asia Pacific" },
  { id: "4", orderNumber: "ORD-1053", customer: "Brightline Co", status: "open", amount: 3275, createdAt: "2026-02-18", region: "Middle East" },
]

const STATUSES: OrderStatus[] = ["open", "fulfilled", "cancelled"]
const REGIONS = ["North America", "Europe", "Asia Pacific", "Middle East"]

const STATUS_META: Record<
  OrderStatus,
  { label: string; className: string; dot: string }
> = {
  open: {
    label: "Open",
    className:
      "border-transparent bg-blue-500/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  fulfilled: {
    label: "Fulfilled",
    className:
      "border-transparent bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "border-transparent bg-rose-500/10 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
    dot: "bg-rose-500",
  },
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

function statusLabel(status: OrderStatus) {
  return STATUS_META[status].label
}

function matchesCondition(order: Order, condition: Condition) {
  if (condition.field === "customer") {
    const match = order.customer
      .toLowerCase()
      .includes(condition.value.toLowerCase())
    return condition.operator === "contains" ? match : !match
  }

  if (condition.field === "status") {
    return condition.operator === "is"
      ? order.status === condition.value
      : order.status !== condition.value
  }

  const first = Number(condition.value)
  if (!Number.isFinite(first)) return true
  if (condition.operator === "gt") return order.amount > first
  if (condition.operator === "lt") return order.amount < first
  const second = Number(condition.valueEnd)
  return Number.isFinite(second) && order.amount >= first && order.amount <= second
}

function conditionLabel(condition: Condition) {
  if (condition.field === "customer") {
    return `Customer ${condition.operator === "contains" ? "contains" : "does not contain"} “${condition.value}”`
  }
  if (condition.field === "status") {
    return `Status ${condition.operator === "is" ? "is" : "is not"} ${statusLabel(condition.value)}`
  }
  if (condition.operator === "between") {
    return `Amount is between ${formatCurrency(Number(condition.value))} and ${formatCurrency(Number(condition.valueEnd))}`
  }
  return `Amount is ${condition.operator === "gt" ? "greater than" : "less than"} ${formatCurrency(Number(condition.value))}`
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const meta = STATUS_META[status]
  return (
    <Badge
      variant="outline"
      className={cn("h-6 gap-1.5 rounded-full px-2", meta.className)}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </Badge>
  )
}

function FacetPopover<T extends string>({
  label,
  options,
  selected,
  counts,
  onToggle,
}: {
  label: string
  options: readonly T[]
  selected: T[]
  counts: Record<T, number>
  onToggle: (value: T) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="shrink-0 cursor-pointer gap-2"
        >
          {label}
          {selected.length > 0 ? (
            <Badge variant="secondary" className="h-5 rounded-full px-1.5">
              {selected.length}
            </Badge>
          ) : null}
          <ChevronsUpDownIcon
            className="size-3.5 text-muted-foreground"
            aria-hidden
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 p-2">
        <p className="px-2 py-1.5 text-sm font-medium">{label}</p>
        <div className="mt-1 grid gap-1">
          {options.map((option) => {
            const checked = selected.includes(option)
            return (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted/60"
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => onToggle(option)}
                  aria-label={`${checked ? "Remove" : "Add"} ${option} filter`}
                />
                <span className="min-w-0 flex-1">{option}</span>
                <span className="tabular-nums text-muted-foreground">
                  {counts[option]}
                </span>
              </label>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function TableToolbar02({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [query, setQuery] = React.useState("")
  const [statuses, setStatuses] = React.useState<OrderStatus[]>([])
  const [regions, setRegions] = React.useState<string[]>([])
  const [dateFrom, setDateFrom] = React.useState("")
  const [dateTo, setDateTo] = React.useState("")
  const [amountMin, setAmountMin] = React.useState("")
  const [amountMax, setAmountMax] = React.useState("")
  const [conditions, setConditions] = React.useState<Condition[]>([])
  const [conditionOpen, setConditionOpen] = React.useState(false)
  const [field, setField] = React.useState<ConditionField>("customer")
  const [operator, setOperator] = React.useState("contains")
  const [conditionValue, setConditionValue] = React.useState("")
  const [conditionValueEnd, setConditionValueEnd] = React.useState("")

  const statusCounts = Object.fromEntries(
    STATUSES.map((status) => [
      status,
      ORDERS.filter((order) => order.status === status).length,
    ])
  ) as Record<OrderStatus, number>
  const regionCounts = Object.fromEntries(
    REGIONS.map((region) => [
      region,
      ORDERS.filter((order) => order.region === region).length,
    ])
  ) as Record<string, number>

  const rows = ORDERS.filter((order) => {
    const normalizedQuery = query.trim().toLowerCase()
    if (
      normalizedQuery &&
      !order.orderNumber.toLowerCase().includes(normalizedQuery) &&
      !order.customer.toLowerCase().includes(normalizedQuery) &&
      !order.region.toLowerCase().includes(normalizedQuery)
    ) {
      return false
    }
    if (statuses.length > 0 && !statuses.includes(order.status)) return false
    if (regions.length > 0 && !regions.includes(order.region)) return false
    if (dateFrom && order.createdAt < dateFrom) return false
    if (dateTo && order.createdAt > dateTo) return false
    if (amountMin && order.amount < Number(amountMin)) return false
    if (amountMax && order.amount > Number(amountMax)) return false
    return conditions.every((condition) => matchesCondition(order, condition))
  })

  const setConditionField = (nextField: ConditionField) => {
    setField(nextField)
    setOperator(
      nextField === "customer"
        ? "contains"
        : nextField === "status"
          ? "is"
          : "gt"
    )
    setConditionValue("")
    setConditionValueEnd("")
  }

  const canAddCondition =
    conditionValue.trim() !== "" &&
    (field !== "amount" ||
      operator !== "between" ||
      conditionValueEnd.trim() !== "")

  const addCondition = () => {
    if (!canAddCondition) return
    const id = `condition-${Date.now()}`
    let condition: Condition
    if (field === "customer") {
      condition = {
        id,
        field,
        operator: operator as "contains" | "not_contains",
        value: conditionValue.trim(),
      }
    } else if (field === "status") {
      condition = {
        id,
        field,
        operator: operator as "is" | "is_not",
        value: conditionValue as OrderStatus,
      }
    } else {
      condition = {
        id,
        field,
        operator: operator as "gt" | "lt" | "between",
        value: conditionValue,
        valueEnd: operator === "between" ? conditionValueEnd : undefined,
      }
    }
    setConditions((current) => [...current, condition])
    setConditionValue("")
    setConditionValueEnd("")
    setConditionOpen(false)
  }

  const clearAll = () => {
    setQuery("")
    setStatuses([])
    setRegions([])
    setDateFrom("")
    setDateTo("")
    setAmountMin("")
    setAmountMax("")
    setConditions([])
  }

  const filterCount =
    (query.trim() ? 1 : 0) +
    statuses.length +
    regions.length +
    (dateFrom ? 1 : 0) +
    (dateTo ? 1 : 0) +
    (amountMin ? 1 : 0) +
    (amountMax ? 1 : 0) +
    conditions.length

  const chips: { id: string; label: string; clear: () => void }[] = []
  if (query.trim()) {
    chips.push({
      id: "query",
      label: `Search: ${query.trim()}`,
      clear: () => setQuery(""),
    })
  }
  statuses.forEach((status) =>
    chips.push({
      id: `status-${status}`,
      label: `Status: ${statusLabel(status)}`,
      clear: () => setStatuses((current) => current.filter((item) => item !== status)),
    })
  )
  regions.forEach((region) =>
    chips.push({
      id: `region-${region}`,
      label: `Region: ${region}`,
      clear: () => setRegions((current) => current.filter((item) => item !== region)),
    })
  )
  if (dateFrom) {
    chips.push({
      id: "date-from",
      label: `From: ${dateFrom}`,
      clear: () => setDateFrom(""),
    })
  }
  if (dateTo) {
    chips.push({
      id: "date-to",
      label: `To: ${dateTo}`,
      clear: () => setDateTo(""),
    })
  }
  if (amountMin) {
    chips.push({
      id: "amount-min",
      label: `Minimum: ${formatCurrency(Number(amountMin))}`,
      clear: () => setAmountMin(""),
    })
  }
  if (amountMax) {
    chips.push({
      id: "amount-max",
      label: `Maximum: ${formatCurrency(Number(amountMax))}`,
      clear: () => setAmountMax(""),
    })
  }
  conditions.forEach((condition) =>
    chips.push({
      id: condition.id,
      label: conditionLabel(condition),
      clear: () =>
        setConditions((current) =>
          current.filter((item) => item.id !== condition.id)
        ),
    })
  )

  return (
    <div className={cn("w-full min-w-0", className)} {...props}>
      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex flex-col gap-4 border-b border-border/70 p-4 sm:p-5">
          <div className="text-start">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Orders
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Combine facets, ranges, and custom conditions to find orders.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative w-full max-w-md">
              <SearchIcon
                aria-hidden
                className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search orders, customers, or regions…"
                className="ps-9"
                aria-label="Search orders"
              />
            </div>
            <div className="flex min-w-0 flex-nowrap items-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:thin]">
              <FacetPopover
                label="Status"
                options={STATUSES}
                selected={statuses}
                counts={statusCounts}
                onToggle={(status) =>
                  setStatuses((current) =>
                    current.includes(status)
                      ? current.filter((item) => item !== status)
                      : [...current, status]
                  )
                }
              />
              <FacetPopover
                label="Region"
                options={REGIONS}
                selected={regions}
                counts={regionCounts}
                onToggle={(region) =>
                  setRegions((current) =>
                    current.includes(region)
                      ? current.filter((item) => item !== region)
                      : [...current, region]
                  )
                }
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0 cursor-pointer gap-2"
                  >
                    <CalendarDaysIcon className="size-4" aria-hidden />
                    Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-72">
                  <p className="text-sm font-medium">Created date</p>
                  <div className="mt-3 grid gap-3">
                    <label className="grid gap-1.5 text-sm">
                      <span className="text-muted-foreground">From</span>
                      <Input
                        type="date"
                        value={dateFrom}
                        max={dateTo || undefined}
                        onChange={(event) => setDateFrom(event.target.value)}
                      />
                    </label>
                    <label className="grid gap-1.5 text-sm">
                      <span className="text-muted-foreground">To</span>
                      <Input
                        type="date"
                        value={dateTo}
                        min={dateFrom || undefined}
                        onChange={(event) => setDateTo(event.target.value)}
                      />
                    </label>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0 cursor-pointer gap-2"
                  >
                    Amount
                    <ChevronsUpDownIcon
                      className="size-3.5 text-muted-foreground"
                      aria-hidden
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-72">
                  <p className="text-sm font-medium">Amount range</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <label className="grid gap-1.5 text-sm">
                      <span className="text-muted-foreground">Minimum</span>
                      <Input
                        type="number"
                        min="0"
                        inputMode="decimal"
                        value={amountMin}
                        onChange={(event) => setAmountMin(event.target.value)}
                        placeholder="0"
                      />
                    </label>
                    <label className="grid gap-1.5 text-sm">
                      <span className="text-muted-foreground">Maximum</span>
                      <Input
                        type="number"
                        min="0"
                        inputMode="decimal"
                        value={amountMax}
                        onChange={(event) => setAmountMax(event.target.value)}
                        placeholder="10,000"
                      />
                    </label>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover open={conditionOpen} onOpenChange={setConditionOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0 cursor-pointer gap-2"
                  >
                    <PlusIcon className="size-4" aria-hidden />
                    Add filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-80">
                  <p className="text-sm font-medium">Add a condition</p>
                  <div className="mt-3 grid gap-3">
                    <Select
                      value={field}
                      onValueChange={(value) =>
                        setConditionField(value as ConditionField)
                      }
                    >
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                        <SelectItem value="amount">Amount</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={operator} onValueChange={setOperator}>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {field === "customer" ? (
                          <>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="not_contains">
                              Does not contain
                            </SelectItem>
                          </>
                        ) : field === "status" ? (
                          <>
                            <SelectItem value="is">Is</SelectItem>
                            <SelectItem value="is_not">Is not</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="gt">Greater than</SelectItem>
                            <SelectItem value="lt">Less than</SelectItem>
                            <SelectItem value="between">Between</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>

                    {field === "status" ? (
                      <Select
                        value={conditionValue}
                        onValueChange={setConditionValue}
                      >
                        <SelectTrigger className="w-full cursor-pointer">
                          <SelectValue placeholder="Choose a status" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUSES.map((status) => (
                            <SelectItem key={status} value={status}>
                              {statusLabel(status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={field === "amount" ? "number" : "text"}
                        min={field === "amount" ? "0" : undefined}
                        value={conditionValue}
                        onChange={(event) =>
                          setConditionValue(event.target.value)
                        }
                        placeholder={
                          field === "customer"
                            ? "Enter customer text"
                            : "Enter amount"
                        }
                      />
                    )}

                    {field === "amount" && operator === "between" ? (
                      <Input
                        type="number"
                        min="0"
                        value={conditionValueEnd}
                        onChange={(event) =>
                          setConditionValueEnd(event.target.value)
                        }
                        placeholder="Enter maximum amount"
                      />
                    ) : null}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      className="cursor-pointer"
                      onClick={() => setConditionOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="cursor-pointer gap-2"
                      disabled={!canAddCondition}
                      onClick={addCondition}
                    >
                      <CheckIcon className="size-4" aria-hidden />
                      Add condition
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {filterCount > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="shrink-0 cursor-pointer gap-2 text-muted-foreground"
                  onClick={clearAll}
                >
                  Clear all
                  <Badge variant="secondary" className="h-5 rounded-full px-1.5">
                    {filterCount}
                  </Badge>
                </Button>
              ) : null}
            </div>
          </div>

          {chips.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <Badge
                  key={chip.id}
                  variant="secondary"
                  className="h-7 gap-1 rounded-full pe-1 ps-2.5 font-normal"
                >
                  {chip.label}
                  <button
                    type="button"
                    className="inline-flex size-5 cursor-pointer items-center justify-center rounded-full hover:bg-foreground/10"
                    aria-label={`Remove ${chip.label}`}
                    onClick={chip.clear}
                  >
                    <XIcon className="size-3" aria-hidden />
                  </button>
                </Badge>
              ))}
            </div>
          ) : null}
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-215">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-end">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={6}
                    className="h-28 text-center text-muted-foreground"
                  >
                    No orders match these filters.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <span
                        dir="ltr"
                        className="font-medium tabular-nums text-foreground"
                      >
                        {order.orderNumber}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.customer}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.region}
                    </TableCell>
                    <TableCell>
                      <span
                        dir="ltr"
                        className="tabular-nums text-muted-foreground"
                      >
                        {order.createdAt}
                      </span>
                    </TableCell>
                    <TableCell className="text-end">
                      <span dir="ltr" className="tabular-nums font-medium">
                        {formatCurrency(order.amount)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="border-t border-border/70 px-4 py-3 text-sm text-muted-foreground sm:px-5">
          Showing {rows.length} of {ORDERS.length} orders
        </div>
      </div>
    </div>
  )
}
