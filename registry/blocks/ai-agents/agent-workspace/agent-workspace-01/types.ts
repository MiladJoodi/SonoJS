export type Turn = {
  id: string
  role: "user" | "assistant"
  text: string
  day?: string
  streaming?: boolean
  reasoning?: string
  thought?: number
  error?: boolean
}

export type Thread = {
  id: string
  title: string
  preview: string
  updated: string
  group: "today" | "yesterday" | "week" | "older"
  pinned?: boolean
  turns: Turn[]
}

export type Model = {
  name: string
  vendor: "nova" | "atlas"
  hint: string
  context: string
}

export type Attachment = {
  id: string
  name: string
  kind: "image" | "file"
}

export type WorkspaceUser = {
  name: string
  email: string
  initials: string
}

export type StreamReply = {
  text: string
  reasoning: string
}
