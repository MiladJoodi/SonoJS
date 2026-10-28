"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  ClockIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  XCircleIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Separator } from "@sonojs/ui/components/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"
import { cn } from "@/lib/utils"

const ENDPOINTS = [
  {
    id: "wh_12345",
    label: "Billing",
    url: "https://api.acmecorp.com/webhooks/billing",
    status: "active" as const,
  },
  {
    id: "wh_67890",
    label: "Slack",
    url: "https://hooks.slack.com/services/T01/B02/xyz",
    status: "active" as const,
  },
  {
    id: "wh_11223",
    label: "Zapier",
    url: "https://zapier.com/hooks/catch/123/abc",
    status: "failing" as const,
  },
] as const

const DELIVERIES = [
  {
    id: "dlv_9f2a",
    endpointId: "wh_12345",
    event: "invoice.paid",
    status: 200,
    time: "10:24:12 AM",
    duration: "124ms",
    attempt: 1,
    request: `{
  "id": "evt_1a2b",
  "type": "invoice.paid",
  "data": {
    "object": {
      "id": "in_8842",
      "amount_paid": 4900,
      "currency": "usd"
    }
  }
}`,
    response: `{
  "ok": true,
  "received": "invoice.paid"
}`,
    headers: `content-type: application/json
user-agent: Webhooks/1.0
x-webhook-id: wh_12345
x-webhook-signature: t=1714…,v1=a3f…`,
  },
  {
    id: "dlv_8c1b",
    endpointId: "wh_12345",
    event: "invoice.created",
    status: 200,
    time: "10:23:48 AM",
    duration: "89ms",
    attempt: 1,
    request: `{
  "id": "evt_3c4d",
  "type": "invoice.created",
  "data": { "object": { "id": "in_8843" } }
}`,
    response: `{ "ok": true }`,
    headers: `content-type: application/json
x-webhook-id: wh_12345`,
  },
  {
    id: "dlv_7a0e",
    endpointId: "wh_11223",
    event: "subscription.canceled",
    status: 500,
    time: "Yesterday 6:02 PM",
    duration: "3004ms",
    attempt: 3,
    request: `{
  "id": "evt_9z8y",
  "type": "subscription.canceled",
  "data": { "object": { "id": "sub_221" } }
}`,
    response: `{
  "error": "upstream_timeout",
  "message": "Handler did not respond in time"
}`,
    headers: `content-type: application/json
x-webhook-id: wh_11223`,
  },
  {
    id: "dlv_6b4d",
    endpointId: "wh_67890",
    event: "customer.created",
    status: 200,
    time: "09:15:03 AM",
    duration: "156ms",
    attempt: 1,
    request: `{
  "id": "evt_5e6f",
  "type": "customer.created",
  "data": { "object": { "id": "cus_991" } }
}`,
    response: `{ "ok": true }`,
    headers: `content-type: application/json
x-webhook-id: wh_67890`,
  },
] as const

type DeliveryId = (typeof DELIVERIES)[number]["id"]
type EndpointId = (typeof ENDPOINTS)[number]["id"]

export default function WebhookManagement({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [endpointId, setEndpointId] = React.useState<EndpointId>("wh_12345")
  const [deliveryId, setDeliveryId] = React.useState<DeliveryId>("dlv_9f2a")

  const deliveries = DELIVERIES.filter((d) => d.endpointId === endpointId)
  const selected =
    deliveries.find((d) => d.id === deliveryId) ?? deliveries[0] ?? null

  const onSelectEndpoint = (id: EndpointId) => {
    setEndpointId(id)
    const first = DELIVERIES.find((d) => d.endpointId === id)
    if (first) {
      setDeliveryId(first.id)
    }
  }

  const ok = selected ? selected.status === 200 : false

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-16",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="flex flex-col gap-3 text-start sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Delivery inspector
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick an endpoint, then inspect request and response payloads.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer gap-1.5 self-start"
          >
            <RefreshCwIcon className="size-4" aria-hidden />
            Refresh
          </Button>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(14rem,17rem)_minmax(0,1fr)]">
          <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-soft">
            <CardHeader className="border-b border-border/70 py-4">
              <CardTitle className="text-base">Endpoints</CardTitle>
              <CardDescription>Select a webhook to inspect.</CardDescription>
            </CardHeader>
            <ul className="divide-y divide-border/70" role="list">
              {ENDPOINTS.map((ep) => {
                const active = ep.id === endpointId
                return (
                  <li key={ep.id}>
                    <button
                      type="button"
                      className={cn(
                        "w-full cursor-pointer px-4 py-3 text-start transition-colors",
                        active ? "bg-muted/60" : "hover:bg-muted/40"
                      )}
                      onClick={() => onSelectEndpoint(ep.id)}
                      aria-current={active ? "true" : undefined}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {ep.label}
                        </span>
                        <Badge
                          variant={
                            ep.status === "active" ? "secondary" : "destructive"
                          }
                          className={cn(
                            "capitalize",
                            ep.status === "active" &&
                              "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                          )}
                        >
                          {ep.status}
                        </Badge>
                      </div>
                      <p
                        dir="ltr"
                        className="mt-1 truncate font-mono text-[11px] text-muted-foreground"
                      >
                        {ep.url}
                      </p>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Card>

          <div className="min-w-0 space-y-4">
            <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-soft">
              <CardHeader className="border-b border-border/70 py-4">
                <CardTitle className="text-base">Recent deliveries</CardTitle>
              </CardHeader>
              <ul className="divide-y divide-border/70" role="list">
                {deliveries.length === 0 ? (
                  <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No deliveries for this endpoint.
                  </li>
                ) : (
                  deliveries.map((d) => {
                    const selectedRow = selected?.id === d.id
                    const rowOk = d.status === 200
                    return (
                      <li key={d.id}>
                        <button
                          type="button"
                          className={cn(
                            "flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-start transition-colors",
                            selectedRow ? "bg-muted/60" : "hover:bg-muted/40"
                          )}
                          onClick={() => setDeliveryId(d.id)}
                          aria-current={selectedRow ? "true" : undefined}
                        >
                          {rowOk ? (
                            <CheckCircle2Icon
                              className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                              aria-hidden
                            />
                          ) : (
                            <XCircleIcon
                              className="size-4 shrink-0 text-destructive"
                              aria-hidden
                            />
                          )}
                          <span
                            dir="ltr"
                            className="min-w-0 flex-1 truncate text-sm font-medium"
                          >
                            {d.event}
                          </span>
                          <Badge
                            variant={rowOk ? "secondary" : "destructive"}
                            className={cn(
                              rowOk &&
                                "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                            )}
                          >
                            <span dir="ltr">{d.status}</span>
                          </Badge>
                          <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">
                            {d.time}
                          </span>
                        </button>
                      </li>
                    )
                  })
                )}
              </ul>
            </Card>

            {selected ? (
              <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-soft">
                <CardHeader className="flex flex-col gap-3 border-b border-border/70 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-start">
                    <CardTitle className="text-base">
                      <span dir="ltr">{selected.event}</span>
                    </CardTitle>
                    <CardDescription>
                      <span dir="ltr">{selected.id}</span> · attempt{" "}
                      {selected.attempt}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={ok ? "secondary" : "destructive"}
                      className={cn(
                        ok &&
                          "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                      )}
                    >
                      <span dir="ltr">{selected.status}</span>
                    </Badge>
                    <Badge variant="outline" className="gap-1 font-normal">
                      <ClockIcon className="size-3" aria-hidden />
                      <span dir="ltr" className="tabular-nums">
                        {selected.duration}
                      </span>
                    </Badge>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="cursor-pointer gap-1.5"
                    >
                      <RotateCcwIcon className="size-3.5" aria-hidden />
                      Resend
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-5">
                  <Tabs defaultValue="request">
                    <TabsList className="w-full justify-start sm:w-auto">
                      <TabsTrigger
                        value="request"
                        className="cursor-pointer"
                      >
                        Request
                      </TabsTrigger>
                      <TabsTrigger
                        value="response"
                        className="cursor-pointer"
                      >
                        Response
                      </TabsTrigger>
                      <TabsTrigger
                        value="headers"
                        className="cursor-pointer"
                      >
                        Headers
                      </TabsTrigger>
                    </TabsList>
                    <Separator className="my-4" />
                    {(
                      [
                        ["request", selected.request],
                        ["response", selected.response],
                        ["headers", selected.headers],
                      ] as const
                    ).map(([value, body]) => (
                      <TabsContent key={value} value={value} className="mt-0">
                        <pre
                          dir="ltr"
                          className="max-h-72 overflow-auto rounded-[12px] border border-border/70 bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground"
                        >
                          {body}
                        </pre>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
