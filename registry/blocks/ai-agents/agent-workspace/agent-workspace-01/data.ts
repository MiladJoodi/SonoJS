import type { Model, StreamReply, Thread, WorkspaceUser } from "./types"

export const user: WorkspaceUser = {
  name: "Alex Rivera",
  email: "alex@example.com",
  initials: "AR",
}

export const models: Model[] = [
  {
    name: "Nova 4.1",
    vendor: "nova",
    hint: "Fast everyday reasoning",
    context: "128k",
  },
  {
    name: "Nova 4.1 Pro",
    vendor: "nova",
    hint: "Deeper analysis and coding",
    context: "200k",
  },
  {
    name: "Atlas Sonnet",
    vendor: "atlas",
    hint: "Balanced writing and tools",
    context: "200k",
  },
  {
    name: "Atlas Opus",
    vendor: "atlas",
    hint: "Highest quality long form",
    context: "200k",
  },
]

export const replies: StreamReply[] = [
  {
    reasoning:
      "Compare COP ratings, climate zone, and duct vs ductless install complexity.",
    text: "For most temperate homes a cold-climate heat pump with a COP around 3 is the sweet spot. Look for a unit rated to keep capacity down to about -15°C, and size it so the backup heat only kicks in on the coldest nights.\n\nIf you already have ducts in good shape, a central heat pump is usually cheaper than a full mini-split layout. Otherwise, a multi-zone mini-split avoids tearing into walls.",
  },
  {
    reasoning: "Weigh install cost against bill savings over a 10-year horizon.",
    text: "Expect install in the $8k–$15k range for a typical detached home, before rebates. Many regions still offer incentives that cut that by 30–50%.\n\nPayback often lands between 5 and 9 years if you are replacing electric resistance or oil heat. Gas furnaces with cheap fuel can take longer unless comfort or cooling is part of the decision.",
  },
  {
    reasoning: "Call out noise, maintenance, and winter behavior people forget.",
    text: "Outdoor units do get louder when defrosting, but modern inverter models stay near conversation level most of the time. Keep 60–90 cm of clear space around the cabinet and clear snow after storms.\n\nFilter changes every 1–3 months and an annual professional check keep efficiency from drifting. That is usually enough maintenance for a decade of service.",
  },
]

export const threads: Thread[] = [
  {
    id: "heat-pump",
    title: "Heat pump sizing",
    preview: "How do I choose the right cold-climate unit?",
    updated: "2m",
    group: "today",
    pinned: true,
    turns: [
      {
        id: "hp-1",
        role: "user",
        text: "How do I choose a cold-climate heat pump for a 180 m² house?",
        day: "today",
      },
      {
        id: "hp-2",
        role: "assistant",
        text: "Start with a Manual J style load calculation rather than square meters alone. Insulation, windows, and climate zone matter more than floor area.\n\nFor a well-insulated 180 m² home in a cold region, many people land between 9 and 14 kW of rated capacity, with a unit that still delivers heat near -15°C. Ask the installer for the capacity curve, not only the nameplate.",
        day: "today",
        thought: 6,
        reasoning: "Size from heat load, then verify low-temp capacity curves.",
      },
      {
        id: "hp-3",
        role: "user",
        text: "Should I go ducted or mini-split?",
        day: "today",
      },
      {
        id: "hp-4",
        role: "assistant",
        text: "Use ducted if your ducts are sealed and sized for heat pump airflow. Go multi-zone mini-split when ducts are leaky, missing, or would be expensive to rebuild.\n\nA hybrid is common too: ducted downstairs for even heat, and one or two heads upstairs for rooms that never felt right.",
        day: "today",
        thought: 4,
        reasoning: "Match distribution system to existing duct condition.",
      },
    ],
  },
  {
    id: "vacation",
    title: "Weekend itinerary",
    preview: "Quiet coastal towns within 3 hours",
    updated: "1h",
    group: "today",
    turns: [
      {
        id: "v-1",
        role: "user",
        text: "Suggest a quiet coastal weekend within 3 hours of the city.",
        day: "today",
      },
      {
        id: "v-2",
        role: "assistant",
        text: "Aim for a small harbor town with one good trail and a late dinner spot. Travel Friday after 7 so you skip traffic, hike Saturday morning, and keep Sunday free for a slow cafe and the drive back.",
        day: "today",
        thought: 3,
        reasoning: "Prefer low-crowd towns and a simple two-night rhythm.",
      },
    ],
  },
  {
    id: "sql-join",
    title: "SQL window functions",
    preview: "Running total by customer",
    updated: "Yesterday",
    group: "yesterday",
    turns: [
      {
        id: "s-1",
        role: "user",
        text: "How do I write a running total by customer in SQL?",
        day: "yesterday",
      },
      {
        id: "s-2",
        role: "assistant",
        text: "Use SUM(amount) OVER (PARTITION BY customer_id ORDER BY created_at ROWS UNBOUNDED PRECEDING). That keeps a per-customer cumulative sum as rows arrive in time order.",
        day: "yesterday",
        thought: 2,
        reasoning: "Window sum partitioned by customer, ordered by time.",
      },
    ],
  },
  {
    id: "onboarding",
    title: "Onboarding email",
    preview: "Friendly first-week checklist",
    updated: "Mon",
    group: "week",
    turns: [
      {
        id: "o-1",
        role: "user",
        text: "Draft a short onboarding email for new teammates.",
        day: "week",
      },
      {
        id: "o-2",
        role: "assistant",
        text: "Subject: Welcome aboard — your first-week map\n\nHi {{name}}, glad you are here. This week: set up accounts, meet your buddy, and ship one small fix. Reply with any blockers and we will unblock fast.",
        day: "week",
        thought: 3,
        reasoning: "Keep welcome mail short with three concrete first-week steps.",
      },
    ],
  },
]
