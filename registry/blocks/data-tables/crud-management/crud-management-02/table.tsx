"use client"

import * as React from "react"
import {
  ArchiveIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  DownloadIcon,
  Edit3Icon,
  EyeIcon,
  Grid2X2Icon,
  ListIcon,
  MoreHorizontalIcon,
  PackageIcon,
  PlusIcon,
  RotateCcwIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  Trash2Icon,
  UploadIcon,
  XIcon,
} from "lucide-react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@sonojs/ui/components/alert"
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
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sonojs/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@sonojs/ui/components/sheet"
import { Switch } from "@sonojs/ui/components/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

type ProductStatus = "draft" | "published" | "archived"
type Variant = {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  status: "active" | "disabled"
}
type InventoryEntry = {
  id: string
  at: string
  reason: string
  previous: number
  next: number
}
type Product = {
  id: string
  name: string
  description: string
  slug: string
  images: string[]
  sku: string
  category: "Apparel" | "Accessories" | "Electronics"
  price: number
  compareAt?: number
  cost?: number
  stock: number
  trackInventory: boolean
  lowStockThreshold: number
  status: ProductStatus
  tags: string[]
  variants: Variant[]
  updatedAt: string
  inventoryHistory: InventoryEntry[]
}
type ProductForm = Omit<Product, "id" | "updatedAt" | "inventoryHistory">
type StockFilter = "all" | "in" | "low" | "out"
type ViewMode = "table" | "grid"

const svgImage = (label: string, background: string, accent: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><rect width="640" height="480" rx="36" fill="${background}"/><circle cx="500" cy="105" r="82" fill="${accent}" opacity=".55"/><rect x="82" y="98" width="280" height="216" rx="28" fill="${accent}" opacity=".8"/><text x="82" y="388" fill="#fff" font-family="Arial,sans-serif" font-size="42" font-weight="700">${label}</text></svg>`
  )}`

const PRODUCT_IMAGES = [
  svgImage("Classic Tee", "#1e3a5f", "#38bdf8"),
  svgImage("Canvas Tote", "#4a2c55", "#f0abfc"),
  svgImage("Headphones", "#2f3542", "#a3e635"),
  svgImage("Travel Cap", "#633112", "#fb923c"),
  svgImage("Smart Watch", "#243b2d", "#34d399"),
  svgImage("Leather Belt", "#3f2d24", "#d6a56b"),
]

const now = "2026-10-30T12:00:00Z"
const history = (stock: number): InventoryEntry[] => [
  { id: `hist-${stock}-1`, at: "2026-10-28T09:30:00Z", reason: "Warehouse count", previous: stock + 3, next: stock },
  { id: `hist-${stock}-2`, at: "2026-10-22T15:10:00Z", reason: "Customer order", previous: stock + 5, next: stock + 3 },
]
const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-01", name: "Essential cotton T-shirt", description: "A heavyweight organic cotton tee with a relaxed everyday fit.", slug: "essential-cotton-t-shirt", images: [PRODUCT_IMAGES[0]], sku: "APP-TEE-100", category: "Apparel", price: 34, compareAt: 42, cost: 13, stock: 42, trackInventory: true, lowStockThreshold: 8, status: "published", tags: ["cotton", "bestseller"], updatedAt: now,
    variants: [
      { id: "var-01", name: "Black / S", sku: "APP-TEE-BLK-S", price: 34, stock: 12, status: "active" },
      { id: "var-02", name: "Black / M", sku: "APP-TEE-BLK-M", price: 34, stock: 18, status: "active" },
      { id: "var-03", name: "Blue / L", sku: "APP-TEE-BLU-L", price: 36, stock: 12, status: "active" },
    ], inventoryHistory: history(42),
  },
  { id: "prod-02", name: "Utility canvas tote", description: "Structured canvas carryall with reinforced handles and an inside pocket.", slug: "utility-canvas-tote", images: [PRODUCT_IMAGES[1]], sku: "ACC-TOTE-220", category: "Accessories", price: 48, cost: 19, stock: 5, trackInventory: true, lowStockThreshold: 8, status: "published", tags: ["canvas", "bag"], variants: [], updatedAt: "2026-10-29T10:10:00Z", inventoryHistory: history(5) },
  { id: "prod-03", name: "Studio wireless headphones", description: "Low-latency over-ear headphones with active noise cancellation.", slug: "studio-wireless-headphones", images: [PRODUCT_IMAGES[2]], sku: "ELC-AUD-310", category: "Electronics", price: 249, compareAt: 299, cost: 112, stock: 18, trackInventory: true, lowStockThreshold: 6, status: "published", tags: ["audio", "wireless"], variants: [], updatedAt: "2026-10-27T14:00:00Z", inventoryHistory: history(18) },
  { id: "prod-04", name: "Packable travel cap", description: "A lightweight quick-dry cap that folds flat for travel.", slug: "packable-travel-cap", images: [PRODUCT_IMAGES[3]], sku: "APP-CAP-140", category: "Apparel", price: 28, cost: 9, stock: 0, trackInventory: true, lowStockThreshold: 5, status: "draft", tags: ["travel", "cap"], variants: [], updatedAt: "2026-10-26T11:20:00Z", inventoryHistory: history(0) },
  { id: "prod-05", name: "Pulse smart watch", description: "A compact fitness watch with GPS, sleep tracking, and a seven-day battery.", slug: "pulse-smart-watch", images: [PRODUCT_IMAGES[4]], sku: "ELC-WCH-520", category: "Electronics", price: 179, cost: 76, stock: 3, trackInventory: true, lowStockThreshold: 5, status: "draft", tags: ["fitness", "watch"], variants: [], updatedAt: "2026-10-25T08:40:00Z", inventoryHistory: history(3) },
  { id: "prod-06", name: "Everyday leather belt", description: "Full-grain leather belt finished with a brushed metal buckle.", slug: "everyday-leather-belt", images: [PRODUCT_IMAGES[5]], sku: "ACC-BLT-610", category: "Accessories", price: 58, cost: 21, stock: 24, trackInventory: true, lowStockThreshold: 6, status: "archived", tags: ["leather", "belt"], variants: [], updatedAt: "2026-10-20T13:05:00Z", inventoryHistory: history(24) },
]

const emptyForm = (): ProductForm => ({
  name: "", description: "", slug: "", images: [PRODUCT_IMAGES[0]], sku: "", category: "Apparel", price: 0, compareAt: undefined, cost: undefined, stock: 0, trackInventory: true, lowStockThreshold: 5, status: "draft", tags: [], variants: [],
})
const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
const csvCell = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <Badge variant="outline" className={cn(
      "rounded-full capitalize",
      status === "published" && "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
      status === "draft" && "border-transparent bg-amber-500/10 text-amber-700 dark:text-amber-400",
      status === "archived" && "border-transparent bg-muted text-muted-foreground"
    )}>{status}</Badge>
  )
}

function StockBadge({ product }: { product: Product }) {
  const state = product.stock === 0 ? "Out of stock" : product.stock <= product.lowStockThreshold ? `Low · ${product.stock}` : `${product.stock} in stock`
  return <Badge variant="outline" className={cn("rounded-full", product.stock === 0 ? "border-transparent bg-rose-500/10 text-rose-700 dark:text-rose-400" : product.stock <= product.lowStockThreshold ? "border-transparent bg-amber-500/10 text-amber-700 dark:text-amber-400" : "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400")}>{state}</Badge>
}

function ProductFormFields({ value, onChange, error }: { value: ProductForm; onChange: (next: ProductForm) => void; error: string }) {
  const patch = (next: Partial<ProductForm>) => onChange({ ...value, ...next })
  const addVariant = () => patch({ variants: [...value.variants, { id: `variant-${Date.now()}`, name: "Black / M", sku: `${value.sku || "SKU"}-BLK-M`, price: value.price, stock: 0, status: "active" }] })
  const updateVariant = (id: string, next: Partial<Variant>) => patch({ variants: value.variants.map((variant) => variant.id === id ? { ...variant, ...next } : variant) })
  return (
    <div className="space-y-6">
      {error ? <div className="rounded-[12px] border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div> : null}
      <section className="space-y-3">
        <div><h3 className="font-semibold">Basic information</h3><p className="text-sm text-muted-foreground">Name, description, and storefront identity.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="product-name">Product name</Label><Input id="product-name" value={value.name} onChange={(event) => patch({ name: event.target.value, slug: value.slug || slugify(event.target.value) })} placeholder="Product name" /></div>
          <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="product-description">Description</Label><Textarea id="product-description" value={value.description} onChange={(event) => patch({ description: event.target.value })} placeholder="Describe the product" /></div>
          <div className="space-y-1.5"><Label htmlFor="product-slug">Slug</Label><Input id="product-slug" value={value.slug} onChange={(event) => patch({ slug: slugify(event.target.value) })} /></div>
          <div className="space-y-1.5"><Label htmlFor="product-sku">SKU</Label><Input id="product-sku" value={value.sku} onChange={(event) => patch({ sku: event.target.value.toUpperCase() })} /></div>
        </div>
      </section>
      <section className="space-y-3 border-t border-border/70 pt-5">
        <div><h3 className="font-semibold">Pricing</h3><p className="text-sm text-muted-foreground">Customer price and internal cost.</p></div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1.5"><Label htmlFor="product-price">Price</Label><Input id="product-price" type="number" min="0" step="0.01" value={value.price} onChange={(event) => patch({ price: Number(event.target.value) })} /></div>
          <div className="space-y-1.5"><Label htmlFor="product-compare">Compare at</Label><Input id="product-compare" type="number" min="0" step="0.01" value={value.compareAt ?? ""} onChange={(event) => patch({ compareAt: event.target.value === "" ? undefined : Number(event.target.value) })} /></div>
          <div className="space-y-1.5"><Label htmlFor="product-cost">Cost</Label><Input id="product-cost" type="number" min="0" step="0.01" value={value.cost ?? ""} onChange={(event) => patch({ cost: event.target.value === "" ? undefined : Number(event.target.value) })} /></div>
        </div>
      </section>
      <section className="space-y-3 border-t border-border/70 pt-5">
        <div className="flex items-center justify-between gap-4">
          <div><h3 className="font-semibold">Inventory</h3><p className="text-sm text-muted-foreground">Track quantities and low-stock warnings.</p></div>
          <Switch checked={value.trackInventory} onCheckedChange={(checked) => patch({ trackInventory: checked })} aria-label="Track inventory" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5"><Label htmlFor="product-stock">Stock</Label><Input id="product-stock" type="number" min="0" disabled={!value.trackInventory} value={value.stock} onChange={(event) => patch({ stock: Math.max(0, Number(event.target.value)) })} /></div>
          <div className="space-y-1.5"><Label htmlFor="product-threshold">Low-stock threshold</Label><Input id="product-threshold" type="number" min="0" disabled={!value.trackInventory} value={value.lowStockThreshold} onChange={(event) => patch({ lowStockThreshold: Math.max(0, Number(event.target.value)) })} /></div>
        </div>
      </section>
      <section className="space-y-3 border-t border-border/70 pt-5">
        <div><h3 className="font-semibold">Organization</h3><p className="text-sm text-muted-foreground">Classification and publishing state.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5"><Label>Category</Label><Select value={value.category} onValueChange={(category) => patch({ category: category as Product["category"] })}><SelectTrigger className="w-full cursor-pointer"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Apparel">Apparel</SelectItem><SelectItem value="Accessories">Accessories</SelectItem><SelectItem value="Electronics">Electronics</SelectItem></SelectContent></Select></div>
          <div className="space-y-1.5"><Label>Status</Label><Select value={value.status} onValueChange={(status) => patch({ status: status as ProductStatus })}><SelectTrigger className="w-full cursor-pointer"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="archived">Archived</SelectItem></SelectContent></Select></div>
          <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="product-tags">Tags</Label><Input id="product-tags" value={value.tags.join(", ")} onChange={(event) => patch({ tags: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) })} placeholder="summer, bestseller" /></div>
        </div>
      </section>
      <section className="space-y-3 border-t border-border/70 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-2"><div><h3 className="font-semibold">Variants</h3><p className="text-sm text-muted-foreground">Add size and color combinations when needed.</p></div><Button type="button" variant="outline" size="sm" className="cursor-pointer gap-2" onClick={addVariant}><PlusIcon className="size-4" /> Add variant</Button></div>
        {value.variants.map((variant) => (
          <div key={variant.id} className="grid gap-2 rounded-[12px] border border-border/70 bg-muted/20 p-3 sm:grid-cols-[1fr_1fr_100px_90px_auto]">
            <Input value={variant.name} onChange={(event) => updateVariant(variant.id, { name: event.target.value })} aria-label="Variant size and color" placeholder="Black / M" />
            <Input value={variant.sku} onChange={(event) => updateVariant(variant.id, { sku: event.target.value.toUpperCase() })} aria-label="Variant SKU" placeholder="SKU" />
            <Input type="number" min="0" value={variant.price} onChange={(event) => updateVariant(variant.id, { price: Number(event.target.value) })} aria-label="Variant price" />
            <Input type="number" min="0" value={variant.stock} onChange={(event) => updateVariant(variant.id, { stock: Math.max(0, Number(event.target.value)) })} aria-label="Variant stock" />
            <Button type="button" variant="ghost" size="icon" className="cursor-pointer text-muted-foreground hover:text-destructive" onClick={() => patch({ variants: value.variants.filter((item) => item.id !== variant.id) })} aria-label={`Remove ${variant.name}`}><Trash2Icon className="size-4" /></Button>
          </div>
        ))}
        {!value.variants.length ? <p className="rounded-[12px] border border-dashed border-border/70 p-4 text-center text-sm text-muted-foreground">No variants. This product uses its base SKU and price.</p> : null}
      </section>
    </div>
  )
}

export default function CrudManagement02({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [products, setProducts] = React.useState<Product[]>(INITIAL_PRODUCTS)
  const [view, setView] = React.useState<ViewMode>("table")
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState("all")
  const [status, setStatus] = React.useState("all")
  const [stockFilter, setStockFilter] = React.useState<StockFilter>("all")
  const [minPrice, setMinPrice] = React.useState("")
  const [maxPrice, setMaxPrice] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [selected, setSelected] = React.useState<Set<string>>(() => new Set())
  const [editorOpen, setEditorOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<ProductForm>(emptyForm)
  const [formError, setFormError] = React.useState("")
  const [detailId, setDetailId] = React.useState<string | null>(null)
  const [deleteIds, setDeleteIds] = React.useState<string[]>([])
  const [undo, setUndo] = React.useState<Product[] | null>(null)
  const [adjustOpen, setAdjustOpen] = React.useState(false)
  const [adjustMode, setAdjustMode] = React.useState<"set" | "change">("change")
  const [adjustValue, setAdjustValue] = React.useState("0")
  const [adjustReason, setAdjustReason] = React.useState("")
  const pageSize = view === "table" ? 5 : 6

  const filtered = React.useMemo(() => products.filter((product) => {
    const needle = search.trim().toLowerCase()
    const matchesSearch = !needle || product.name.toLowerCase().includes(needle) || product.sku.toLowerCase().includes(needle)
    const matchesCategory = category === "all" || product.category === category
    const matchesStatus = status === "all" || product.status === status
    const matchesStock = stockFilter === "all" || (stockFilter === "out" ? product.stock === 0 : stockFilter === "low" ? product.stock > 0 && product.stock <= product.lowStockThreshold : product.stock > product.lowStockThreshold)
    const matchesMin = minPrice === "" || product.price >= Number(minPrice)
    const matchesMax = maxPrice === "" || product.price <= Number(maxPrice)
    return matchesSearch && matchesCategory && matchesStatus && matchesStock && matchesMin && matchesMax
  }), [products, search, category, status, stockFilter, minPrice, maxPrice])
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visibleProducts = filtered.slice((Math.min(page, pageCount) - 1) * pageSize, Math.min(page, pageCount) * pageSize)
  const detail = products.find((product) => product.id === detailId) ?? null
  const activeFilterCount = [category !== "all", status !== "all", stockFilter !== "all", minPrice !== "", maxPrice !== ""].filter(Boolean).length
  const resetPage = () => setPage(1)
  const clearFilters = () => { setSearch(""); setCategory("all"); setStatus("all"); setStockFilter("all"); setMinPrice(""); setMaxPrice(""); setPage(1) }

  const openAdd = () => { setEditingId(null); setForm(emptyForm()); setFormError(""); setEditorOpen(true) }
  const openEdit = (product: Product) => {
    setEditingId(product.id)
    setForm({
      name: product.name,
      description: product.description,
      slug: product.slug,
      images: [...product.images],
      sku: product.sku,
      category: product.category,
      price: product.price,
      compareAt: product.compareAt,
      cost: product.cost,
      stock: product.stock,
      trackInventory: product.trackInventory,
      lowStockThreshold: product.lowStockThreshold,
      status: product.status,
      tags: [...product.tags],
      variants: product.variants.map((variant) => ({ ...variant })),
    })
    setFormError("")
    setEditorOpen(true)
  }
  const saveProduct = () => {
    if (!form.name.trim() || !form.sku.trim()) return setFormError("Product name and SKU are required.")
    if ([form.price, form.compareAt, form.cost].some((value) => value !== undefined && value < 0) || form.variants.some((variant) => variant.price < 0 || variant.stock < 0)) return setFormError("Prices and stock cannot be negative.")
    const allSkus = [form.sku, ...form.variants.map((variant) => variant.sku)].map((sku) => sku.trim().toLowerCase()).filter(Boolean)
    if (new Set(allSkus).size !== allSkus.length || products.some((product) => product.id !== editingId && [product.sku, ...product.variants.map((variant) => variant.sku)].some((sku) => allSkus.includes(sku.toLowerCase())))) return setFormError("Every product and variant SKU must be unique.")
    if (editingId) {
      setProducts((current) => current.map((product) => product.id === editingId ? { ...product, ...form, updatedAt: new Date().toISOString() } : product))
    } else {
      setProducts((current) => [{ ...form, id: `prod-${Date.now()}`, updatedAt: new Date().toISOString(), inventoryHistory: [] }, ...current])
    }
    setEditorOpen(false)
  }
  const updateStatus = (ids: string[], next: ProductStatus) => setProducts((current) => current.map((product) => ids.includes(product.id) ? { ...product, status: next, updatedAt: new Date().toISOString() } : product))
  const duplicate = (product: Product) => {
    const suffix = Date.now().toString().slice(-5)
    setProducts((current) => [{ ...product, id: `prod-${Date.now()}`, name: `${product.name} copy`, slug: `${product.slug}-copy-${suffix}`, sku: `${product.sku}-COPY-${suffix}`, status: "draft", variants: product.variants.map((variant, index) => ({ ...variant, id: `variant-${Date.now()}-${index}`, sku: `${variant.sku}-C${suffix}` })), updatedAt: new Date().toISOString() }, ...current])
  }
  const undoTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const confirmDelete = () => {
    const removed = products.filter((product) => deleteIds.includes(product.id))
    setProducts((current) => current.filter((product) => !deleteIds.includes(product.id)))
    setSelected(new Set()); setDeleteIds([]); setUndo(removed)
    if (undoTimer.current) clearTimeout(undoTimer.current)
    undoTimer.current = setTimeout(() => setUndo(null), 8000)
  }
  const restoreDeleted = () => {
    if (!undo) return
    setProducts((current) => [...undo, ...current])
    setUndo(null)
    if (undoTimer.current) clearTimeout(undoTimer.current)
    undoTimer.current = null
  }
  const exportCsv = (rows: Product[]) => {
    const csv = [["ID", "Name", "SKU", "Category", "Price", "Stock", "Status"], ...rows.map((product) => [product.id, product.name, product.sku, product.category, product.price, product.stock, product.status])].map((row) => row.map(csvCell).join(",")).join("\n")
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "product-catalog.csv"; anchor.click(); URL.revokeObjectURL(url)
  }
  const adjustStock = () => {
    if (!detail || !adjustReason.trim()) return
    const amount = Number(adjustValue)
    const next = adjustMode === "set" ? amount : detail.stock + amount
    if (!Number.isFinite(next) || next < 0) return
    const entry: InventoryEntry = { id: `hist-${detail.id}-${detail.inventoryHistory.length + 1}`, at: new Date().toISOString(), reason: adjustReason, previous: detail.stock, next }
    setProducts((current) => current.map((product) => product.id === detail.id ? { ...product, stock: next, updatedAt: new Date().toISOString(), inventoryHistory: [entry, ...product.inventoryHistory] } : product))
    setAdjustOpen(false); setAdjustValue("0"); setAdjustReason("")
  }
  const toggleSelected = (id: string) => setSelected((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next })
  const selectPage = (checked: boolean) => setSelected((current) => { const next = new Set(current); visibleProducts.forEach((product) => checked ? next.add(product.id) : next.delete(product.id)); return next })

  const ProductActions = ({ product, compact = false }: { product: Product; compact?: boolean }) => (
    <div className="flex items-center gap-1">
      {compact ? <Button type="button" variant="outline" size="sm" className="flex-1 cursor-pointer gap-2" onClick={() => setDetailId(product.id)}><EyeIcon className="size-4" /> View</Button> : null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button type="button" variant="ghost" size="icon-sm" className="cursor-pointer" aria-label={`Actions for ${product.name}`}><MoreHorizontalIcon className="size-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="cursor-pointer" onClick={() => setDetailId(product.id)}><EyeIcon className="size-4" /> View details</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => openEdit(product)}><Edit3Icon className="size-4" /> Edit product</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => duplicate(product)}><CopyIcon className="size-4" /> Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          {product.status === "published" ? <DropdownMenuItem className="cursor-pointer" onClick={() => updateStatus([product.id], "draft")}><RotateCcwIcon className="size-4" /> Unpublish</DropdownMenuItem> : <DropdownMenuItem className="cursor-pointer" onClick={() => updateStatus([product.id], "published")}><UploadIcon className="size-4" /> Publish</DropdownMenuItem>}
          {product.status === "archived" ? <DropdownMenuItem className="cursor-pointer" onClick={() => updateStatus([product.id], "draft")}><RotateCcwIcon className="size-4" /> Restore</DropdownMenuItem> : <DropdownMenuItem className="cursor-pointer" onClick={() => updateStatus([product.id], "archived")}><ArchiveIcon className="size-4" /> Archive</DropdownMenuItem>}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => setDeleteIds([product.id])}><Trash2Icon className="size-4" /> Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <div className={cn("w-full min-w-0 space-y-5", className)} {...props}>
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-start">
            <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
            <p className="mt-1 text-sm text-muted-foreground">Add, edit, duplicate, and delete catalog products.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" className="cursor-pointer gap-2" onClick={openAdd}><PlusIcon className="size-4" /> Add product</Button>
            <Button type="button" variant="outline" className="cursor-pointer gap-2" onClick={() => exportCsv(products)}><DownloadIcon className="size-4" /> Export Products</Button>
          </div>
        </header>

        <section className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="space-y-4 border-b border-border/70 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <SearchIcon className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={search} onChange={(event) => { setSearch(event.target.value); resetPage() }} placeholder="Search products or SKU…" className="ps-9" aria-label="Search products" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select value={category} onValueChange={(value) => { setCategory(value); resetPage() }}><SelectTrigger className="w-40 cursor-pointer"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem><SelectItem value="Apparel">Apparel</SelectItem><SelectItem value="Accessories">Accessories</SelectItem><SelectItem value="Electronics">Electronics</SelectItem></SelectContent></Select>
                <Select value={status} onValueChange={(value) => { setStatus(value); resetPage() }}><SelectTrigger className="w-36 cursor-pointer"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="draft">Draft</SelectItem><SelectItem value="archived">Archived</SelectItem></SelectContent></Select>
                <div className="inline-flex rounded-[12px] border border-border/70 bg-muted/30 p-1">
                  <Button type="button" variant={view === "table" ? "secondary" : "ghost"} size="icon-sm" className="cursor-pointer" onClick={() => { setView("table"); resetPage() }} aria-label="Table view"><ListIcon className="size-4" /></Button>
                  <Button type="button" variant={view === "grid" ? "secondary" : "ghost"} size="icon-sm" className="cursor-pointer" onClick={() => { setView("grid"); resetPage() }} aria-label="Grid view"><Grid2X2Icon className="size-4" /></Button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-end gap-2">
              <div className="space-y-1"><Label className="text-xs text-muted-foreground">Stock</Label><Select value={stockFilter} onValueChange={(value) => { setStockFilter(value as StockFilter); resetPage() }}><SelectTrigger size="sm" className="w-32 cursor-pointer"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Any stock</SelectItem><SelectItem value="in">In stock</SelectItem><SelectItem value="low">Low stock</SelectItem><SelectItem value="out">Out of stock</SelectItem></SelectContent></Select></div>
              <div className="space-y-1"><Label htmlFor="min-price" className="text-xs text-muted-foreground">Min price</Label><Input id="min-price" type="number" min="0" value={minPrice} onChange={(event) => { setMinPrice(event.target.value); resetPage() }} className="h-10 w-28" placeholder="$0" /></div>
              <div className="space-y-1"><Label htmlFor="max-price" className="text-xs text-muted-foreground">Max price</Label><Input id="max-price" type="number" min="0" value={maxPrice} onChange={(event) => { setMaxPrice(event.target.value); resetPage() }} className="h-10 w-28" placeholder="Any" /></div>
              {activeFilterCount ? <Button type="button" variant="ghost" size="sm" className="cursor-pointer gap-1 text-muted-foreground" onClick={clearFilters}><XIcon className="size-4" /> Clear {activeFilterCount}</Button> : <div className="flex h-10 items-center gap-2 text-sm text-muted-foreground"><SlidersHorizontalIcon className="size-4" /> Add filters to narrow results</div>}
            </div>
            {activeFilterCount ? <div className="flex flex-wrap gap-2">{category !== "all" ? <Badge variant="secondary">Category: {category}</Badge> : null}{status !== "all" ? <Badge variant="secondary">Status: {status}</Badge> : null}{stockFilter !== "all" ? <Badge variant="secondary">Stock: {stockFilter}</Badge> : null}{minPrice ? <Badge variant="secondary">From {money(Number(minPrice))}</Badge> : null}{maxPrice ? <Badge variant="secondary">To {money(Number(maxPrice))}</Badge> : null}</div> : null}
          </div>

          {selected.size ? <div className="flex flex-wrap items-center gap-2 border-b border-border/70 bg-primary/5 px-4 py-3"><span className="me-2 text-sm font-medium">{selected.size} selected</span><Button type="button" variant="outline" size="sm" className="cursor-pointer" onClick={() => updateStatus([...selected], "published")}>Publish</Button><Button type="button" variant="outline" size="sm" className="cursor-pointer" onClick={() => updateStatus([...selected], "draft")}>Unpublish</Button><Button type="button" variant="outline" size="sm" className="cursor-pointer" onClick={() => updateStatus([...selected], "archived")}>Archive</Button><Button type="button" variant="outline" size="sm" className="cursor-pointer gap-2" onClick={() => exportCsv(products.filter((product) => selected.has(product.id)))}><DownloadIcon className="size-4" /> Export CSV</Button><Button type="button" variant="ghost" size="sm" className="cursor-pointer text-destructive hover:text-destructive" onClick={() => setDeleteIds([...selected])}>Delete</Button></div> : null}

          {view === "table" ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader><TableRow className="hover:bg-transparent"><TableHead className="w-12"><Checkbox checked={visibleProducts.length > 0 && visibleProducts.every((product) => selected.has(product.id))} onCheckedChange={(checked) => selectPage(checked === true)} aria-label="Select page" /></TableHead><TableHead>Product</TableHead><TableHead>Category</TableHead><TableHead>Price</TableHead><TableHead>Inventory</TableHead><TableHead>Status</TableHead><TableHead className="text-end">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {!visibleProducts.length ? <TableRow className="hover:bg-transparent"><TableCell colSpan={7} className="h-40 text-center"><PackageIcon className="mx-auto mb-2 size-6 text-muted-foreground" /><p className="font-medium">No products found</p><p className="text-sm text-muted-foreground">Try clearing your filters.</p></TableCell></TableRow> : visibleProducts.map((product) => (
                    <TableRow key={product.id} data-state={selected.has(product.id) ? "selected" : undefined}>
                      <TableCell><Checkbox checked={selected.has(product.id)} onCheckedChange={() => toggleSelected(product.id)} aria-label={`Select ${product.name}`} /></TableCell>
                      <TableCell><button type="button" className="flex cursor-pointer items-center gap-3 text-start" onClick={() => setDetailId(product.id)}><img src={product.images[0]} alt="" className="size-12 rounded-lg bg-muted object-cover" /><span><span className="block max-w-56 truncate font-medium">{product.name}</span><span className="block text-xs text-muted-foreground">{product.sku}{product.variants.length ? ` · ${product.variants.length} variants` : ""}</span></span></button></TableCell>
                      <TableCell className="text-muted-foreground">{product.category}</TableCell>
                      <TableCell><span className="font-medium tabular-nums" dir="ltr">{money(product.price)}</span>{product.compareAt ? <span className="ms-2 text-xs text-muted-foreground line-through" dir="ltr">{money(product.compareAt)}</span> : null}</TableCell>
                      <TableCell><StockBadge product={product} /></TableCell>
                      <TableCell><StatusBadge status={product.status} /></TableCell>
                      <TableCell><div className="flex justify-end"><ProductActions product={product} /></div></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProducts.map((product) => <article key={product.id} className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"><div className="relative aspect-4/3 bg-muted"><img src={product.images[0]} alt={product.name} className="size-full object-cover" /><div className="absolute inset-s-3 top-3"><StatusBadge status={product.status} /></div><Checkbox checked={selected.has(product.id)} onCheckedChange={() => toggleSelected(product.id)} className="absolute inset-e-3 top-3 bg-card" aria-label={`Select ${product.name}`} /></div><div className="space-y-3 p-4"><div><p className="text-xs text-muted-foreground">{product.category} · {product.sku}</p><h2 className="mt-1 font-semibold">{product.name}</h2></div><div className="flex items-center justify-between gap-3"><span className="font-semibold tabular-nums" dir="ltr">{money(product.price)}</span><StockBadge product={product} /></div><ProductActions product={product} compact /></div></article>)}
              {!visibleProducts.length ? <div className="col-span-full py-16 text-center text-muted-foreground">No products match these filters.</div> : null}
            </div>
          )}
          <footer className="flex flex-col gap-3 border-t border-border/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Showing {filtered.length ? (Math.min(page, pageCount) - 1) * pageSize + 1 : 0}–{Math.min(Math.min(page, pageCount) * pageSize, filtered.length)} of {filtered.length}</p>
            <div className="flex items-center gap-2"><Button type="button" variant="outline" size="icon-sm" className="cursor-pointer disabled:cursor-not-allowed" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} aria-label="Previous page"><ChevronLeftIcon className="size-4 icon-dir" /></Button><span className="min-w-20 text-center text-sm">Page {Math.min(page, pageCount)} of {pageCount}</span><Button type="button" variant="outline" size="icon-sm" className="cursor-pointer disabled:cursor-not-allowed" disabled={page >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))} aria-label="Next page"><ChevronRightIcon className="size-4 icon-dir" /></Button></div>
          </footer>
        </section>

      {undo ? (
        <Alert>
          <AlertTitle>Products deleted</AlertTitle>
          <AlertDescription>
            {undo.length} product{undo.length > 1 ? "s" : ""} removed from the catalog.
          </AlertDescription>
          <AlertAction>
            <Button type="button" variant="outline" size="sm" className="cursor-pointer gap-2" onClick={restoreDeleted}>
              <RotateCcwIcon className="size-4" /> Undo
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      <Sheet open={editorOpen} onOpenChange={setEditorOpen}>
        <SheetContent side="end" className="w-full overflow-y-auto border-border/70 sm:max-w-2xl">
          <SheetHeader><SheetTitle>{editingId ? "Edit product" : "Add product"}</SheetTitle><SheetDescription>{editingId ? "Update catalog and inventory details." : "Create a new product for your catalog."}</SheetDescription></SheetHeader>
          <div className="px-4"><ProductFormFields value={form} onChange={setForm} error={formError} /></div>
          <SheetFooter className="sticky bottom-0 border-t border-border/70 bg-background"><div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button type="button" variant="outline" className="cursor-pointer" onClick={() => setEditorOpen(false)}>Cancel</Button><Button type="button" className="cursor-pointer" onClick={saveProduct}>{editingId ? "Save changes" : "Add product"}</Button></div></SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={Boolean(detail)} onOpenChange={(open) => !open && setDetailId(null)}>
        <SheetContent side="end" className="w-full overflow-y-auto border-border/70 sm:max-w-xl">
          {detail ? <><SheetHeader><SheetTitle>{detail.name}</SheetTitle><SheetDescription>{detail.sku} · Updated {new Date(detail.updatedAt).toLocaleDateString("en-US", { dateStyle: "medium" })}</SheetDescription></SheetHeader><div className="space-y-6 px-4 pb-6"><img src={detail.images[0]} alt={detail.name} className="aspect-4/3 w-full rounded-[12px] border border-border/70 bg-muted object-cover" /><div className="flex flex-wrap items-center gap-2"><StatusBadge status={detail.status} /><StockBadge product={detail} /><Badge variant="outline">{detail.category}</Badge></div><div><h3 className="font-semibold">Product information</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{detail.description}</p><dl className="mt-3 grid grid-cols-2 gap-3 rounded-[12px] border border-border/70 p-3 text-sm"><div><dt className="text-muted-foreground">Price</dt><dd className="font-medium" dir="ltr">{money(detail.price)}</dd></div><div><dt className="text-muted-foreground">Cost</dt><dd className="font-medium" dir="ltr">{detail.cost !== undefined ? money(detail.cost) : "—"}</dd></div><div><dt className="text-muted-foreground">Slug</dt><dd className="truncate font-medium">{detail.slug}</dd></div><div><dt className="text-muted-foreground">Tags</dt><dd className="font-medium">{detail.tags.join(", ") || "—"}</dd></div></dl></div>{detail.variants.length ? <div><h3 className="mb-2 font-semibold">Variants</h3><div className="space-y-2">{detail.variants.map((variant) => <div key={variant.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-[12px] border border-border/70 p-3 text-sm"><div><p className="font-medium">{variant.name}</p><p className="text-xs text-muted-foreground">{variant.sku}</p></div><span dir="ltr">{money(variant.price)}</span><Badge variant="secondary">{variant.stock}</Badge></div>)}</div></div> : null}<div><div className="mb-2 flex items-center justify-between"><h3 className="font-semibold">Inventory history</h3><Button type="button" variant="outline" size="sm" className="cursor-pointer" onClick={() => setAdjustOpen(true)}>Adjust stock</Button></div><div className="space-y-2">{detail.inventoryHistory.length ? detail.inventoryHistory.map((entry) => <div key={entry.id} className="flex items-center justify-between gap-3 rounded-[12px] border border-border/70 p-3 text-sm"><div><p className="font-medium">{entry.reason}</p><p className="text-xs text-muted-foreground">{new Date(entry.at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</p></div><span className="tabular-nums" dir="ltr">{entry.previous} → {entry.next}</span></div>) : <p className="text-sm text-muted-foreground">No inventory changes yet.</p>}</div></div></div><SheetFooter className="border-t border-border/70"><Button type="button" className="cursor-pointer gap-2" onClick={() => openEdit(detail)}><Edit3Icon className="size-4" /> Edit product</Button></SheetFooter></> : null}
        </SheetContent>
      </Sheet>

      <Dialog open={adjustOpen} onOpenChange={setAdjustOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Adjust inventory</DialogTitle><DialogDescription>Set an exact quantity or apply a positive or negative change.</DialogDescription></DialogHeader>
          <div className="space-y-3"><div className="grid grid-cols-2 gap-2"><Button type="button" variant={adjustMode === "change" ? "default" : "outline"} className="cursor-pointer" onClick={() => setAdjustMode("change")}>Add / subtract</Button><Button type="button" variant={adjustMode === "set" ? "default" : "outline"} className="cursor-pointer" onClick={() => setAdjustMode("set")}>Set quantity</Button></div><div className="space-y-1.5"><Label htmlFor="adjust-value">{adjustMode === "set" ? "New quantity" : "Change"}</Label><Input id="adjust-value" type="number" value={adjustValue} onChange={(event) => setAdjustValue(event.target.value)} /></div><div className="space-y-1.5"><Label htmlFor="adjust-reason">Reason</Label><Input id="adjust-reason" value={adjustReason} onChange={(event) => setAdjustReason(event.target.value)} placeholder="Restock, correction, return…" /></div>{detail && (adjustMode === "set" ? Number(adjustValue) : detail.stock + Number(adjustValue)) < 0 ? <p className="text-sm text-destructive">Inventory cannot be negative.</p> : null}</div>
          <DialogFooter><Button type="button" variant="outline" className="cursor-pointer" onClick={() => setAdjustOpen(false)}>Cancel</Button><Button type="button" className="cursor-pointer" disabled={!adjustReason.trim() || !detail || (adjustMode === "set" ? Number(adjustValue) : detail.stock + Number(adjustValue)) < 0} onClick={adjustStock}>Save adjustment</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteIds.length > 0} onOpenChange={(open) => !open && setDeleteIds([])}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete {deleteIds.length > 1 ? `${deleteIds.length} products` : "product"}?</AlertDialogTitle><AlertDialogDescription>This removes the selected catalog {deleteIds.length > 1 ? "items" : "item"}. You can undo the action afterward.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel><AlertDialogAction variant="destructive" className="cursor-pointer" onClick={confirmDelete}>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
