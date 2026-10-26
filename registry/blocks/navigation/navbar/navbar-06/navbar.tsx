"use client"

import { SearchIcon, ShoppingBagIcon, UserIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Input } from "@sonojs/ui/components/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@sonojs/ui/components/navigation-menu"

const womenColumns = [
  {
    heading: "Clothing",
    items: [
      { label: "Dresses", href: "#" },
      { label: "Tops", href: "#" },
      { label: "Pants", href: "#" },
      { label: "Outerwear", href: "#" },
    ],
  },
  {
    heading: "Shoes",
    items: [
      { label: "Sneakers", href: "#" },
      { label: "Boots", href: "#" },
      { label: "Sandals", href: "#" },
      { label: "Heels", href: "#" },
    ],
  },
  {
    heading: "Accessories",
    items: [
      { label: "Bags", href: "#" },
      { label: "Jewelry", href: "#" },
      { label: "Hats", href: "#" },
      { label: "Belts", href: "#" },
    ],
  },
]

const menColumns = [
  {
    heading: "Clothing",
    items: [
      { label: "Shirts", href: "#" },
      { label: "Tees", href: "#" },
      { label: "Pants", href: "#" },
      { label: "Jackets", href: "#" },
    ],
  },
  {
    heading: "Shoes",
    items: [
      { label: "Sneakers", href: "#" },
      { label: "Boots", href: "#" },
      { label: "Loafers", href: "#" },
      { label: "Sandals", href: "#" },
    ],
  },
  {
    heading: "Accessories",
    items: [
      { label: "Watches", href: "#" },
      { label: "Bags", href: "#" },
      { label: "Hats", href: "#" },
      { label: "Socks", href: "#" },
    ],
  },
]

const homeColumns = [
  {
    heading: "Living",
    items: [
      { label: "Sofas", href: "#" },
      { label: "Tables", href: "#" },
      { label: "Lighting", href: "#" },
    ],
  },
  {
    heading: "Bedroom",
    items: [
      { label: "Bedding", href: "#" },
      { label: "Storage", href: "#" },
      { label: "Decor", href: "#" },
    ],
  },
  {
    heading: "Kitchen",
    items: [
      { label: "Cookware", href: "#" },
      { label: "Tableware", href: "#" },
      { label: "Appliances", href: "#" },
    ],
  },
]

const newArrivals = [
  {
    title: "Summer edit",
    href: "#",
    description: "Light layers and warm-weather essentials.",
  },
  {
    title: "Workwear refresh",
    href: "#",
    description: "Sharp pieces for the office and beyond.",
  },
  {
    title: "Weekend staples",
    href: "#",
    description: "Easy fits you will reach for every Saturday.",
  },
]

const iconBtn =
  "size-[46px] min-h-[46px] max-h-[46px] min-w-[46px] max-w-[46px] rounded-[12px] border-border/70 shadow-none"

const menuTriggerClass =
  "h-auto bg-transparent px-3 py-1.5 shadow-none hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:text-foreground"

function Brand() {
  return (
    <a
      href="#"
      className="flex cursor-pointer items-center gap-2 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
    >
      <img
        src="/images/logos/logo.svg"
        alt=""
        width={28}
        height={32}
        className="h-8 w-auto shrink-0"
      />
      <span className="text-sm font-semibold tracking-tight text-foreground">
        Sono Shop
      </span>
    </a>
  )
}

function MegaColumns({
  columns,
}: {
  columns: { heading: string; items: { label: string; href: string }[] }[]
}) {
  return (
    <div
      className={cn(
        "grid w-[min(100vw-2rem,36rem)] gap-6 p-4",
        columns.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
      )}
    >
      {columns.map((column) => (
        <div key={column.heading} className="space-y-2">
          <p className="px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            {column.heading}
          </p>
          <ul className="grid gap-0.5">
            {column.items.map((item) => (
              <li key={item.label}>
                <NavigationMenuLink asChild>
                  <a
                    href={item.href}
                    className="block cursor-pointer rounded-[12px] px-3 py-2 text-sm font-medium text-foreground no-underline outline-hidden transition-colors hover:bg-muted/70 focus:bg-muted/70"
                  >
                    {item.label}
                  </a>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function Navbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-h-[28rem] w-full flex-col bg-card", className)}
      {...props}
    >
      <div className="border-b border-border/70 bg-canvas px-4 py-2 text-center text-xs text-muted-foreground sm:px-6">
        Free shipping over $75 · Easy 30-day returns
      </div>
      <header className="z-30 border-b border-border/70 bg-card">
        <div className="mx-auto flex min-h-[62px] w-full max-w-5xl items-center gap-3 px-4 sm:px-6">
          <Brand />
          <div className="relative ms-2 hidden min-w-0 flex-1 md:block md:max-w-md lg:max-w-lg">
            <SearchIcon className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search the catalog"
              aria-label="Search the catalog"
              className="h-[46px] min-h-[46px] max-h-[46px] rounded-[12px] border-border/70 bg-canvas ps-10 shadow-none"
            />
          </div>
          <div className="ms-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={iconBtn}
                  aria-label="Account"
                >
                  <UserIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-[12px]">
                <DropdownMenuLabel>Lila Reyes</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Wishlist
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              className={cn(iconBtn, "relative")}
              aria-label="Cart, 3 items"
            >
              <ShoppingBagIcon className="size-4" />
              <Badge className="absolute -end-1.5 -top-1.5 h-5 min-w-5 justify-center rounded-full px-1 text-[11px] leading-none">
                3
              </Badge>
            </Button>
          </div>
        </div>

        <div className="border-t border-border/70">
          <div className="mx-auto flex min-h-12 w-full max-w-5xl items-center px-4 sm:px-6">
            <NavigationMenu className="hidden max-w-full md:flex">
              <NavigationMenuList className="gap-0.5">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={menuTriggerClass}>
                    New
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[min(100vw-2rem,22rem)] gap-0.5 p-3">
                      {newArrivals.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className="block cursor-pointer rounded-[12px] px-3 py-2.5 no-underline outline-hidden transition-colors hover:bg-muted/70 focus:bg-muted/70"
                            >
                              <span className="block text-sm font-medium text-foreground">
                                {item.title}
                              </span>
                              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                {item.description}
                              </span>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={menuTriggerClass}>
                    Women
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaColumns columns={womenColumns} />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={menuTriggerClass}>
                    Men
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaColumns columns={menColumns} />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={menuTriggerClass}>
                    Home
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaColumns columns={homeColumns} />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      menuTriggerClass,
                      "cursor-pointer text-primary hover:text-primary data-[state=open]:text-primary"
                    )}
                  >
                    Sale
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <nav className="flex gap-1 overflow-x-auto md:hidden">
              {["New", "Women", "Men", "Home", "Sale"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className={cn(
                    "cursor-pointer whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    label === "Sale" && "text-primary hover:text-primary"
                  )}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-lg text-balance text-h3 text-foreground">
          Storefront with nested category menus
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Matching icon buttons up top. New, Women, Men, and Home open nested
          mega menus underneath.
        </p>
      </main>
    </div>
  )
}
