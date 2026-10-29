"use client"

import {
  AgentActivity,
  type AgentActivityItem,
} from "@sonojs/ui/components/agent-activity"

const ITEMS: AgentActivityItem[] = [
  {
    id: "s1",
    type: "step",
    label: "Reading flavor briefs",
    status: "complete",
  },
  {
    id: "s2",
    type: "step",
    label: "Scanning supplier lists",
    status: "complete",
  },
  {
    id: "s3",
    type: "step",
    label: "Comparing tasting notes",
    status: "complete",
    meta: "6 flavors",
  },
  {
    id: "s4",
    type: "step",
    label: "Writing the scoop report",
    status: "complete",
  },
]

export function AgentActivityComplete() {
  return (
    <div className="mx-auto w-full max-w-md py-6">
      <AgentActivity
        items={ITEMS}
        status="complete"
        duration={4}
        defaultOpen={false}
      />
    </div>
  )
}
