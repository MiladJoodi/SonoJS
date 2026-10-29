"use client"

import * as React from "react"

import {
  ApprovalCard,
  type ApprovalCardStatus,
} from "@sonojs/ui/components/approval-card"

export function ApprovalCardDefault() {
  const [status, setStatus] = React.useState<ApprovalCardStatus>("pending")

  return (
    <div className="mx-auto w-full max-w-md">
      <ApprovalCard
        title="Deploy schema migration"
        description="Apply the pending users.role enum change to production. This cannot be rolled back automatically."
        status={status}
        onApprove={() => setStatus("approved")}
        onRequestChanges={() => setStatus("changes-requested")}
        onReject={() => setStatus("rejected")}
        onDismiss={() => setStatus("pending")}
        result={
          status === "approved"
            ? "Migration queued for production."
            : status === "changes-requested"
              ? "Waiting for an updated plan."
              : status === "rejected"
                ? "Deployment cancelled."
                : undefined
        }
      />
    </div>
  )
}
