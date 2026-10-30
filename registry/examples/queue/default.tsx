"use client"

import * as React from "react"
import { ArrowUpIcon, Trash2Icon } from "lucide-react"

import type { QueueMessage, QueueTodo } from "@sonojs/ui/components/queue"
import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemAttachment,
  QueueItemContent,
  QueueItemDescription,
  QueueItemFile,
  QueueItemImage,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from "@sonojs/ui/components/queue"

const sampleMessages: QueueMessage[] = [
  {
    id: "msg-1",
    parts: [{ text: "How do I set up the project?", type: "text" }],
  },
  {
    id: "msg-2",
    parts: [{ text: "What is the roadmap for Q4?", type: "text" }],
  },
  {
    id: "msg-3",
    parts: [
      { text: "Update the default logo to this png.", type: "text" },
      {
        filename: "setup-guide.png",
        mediaType: "image/png",
        type: "file",
        url: "https://github.com/haydenbleasel.png",
      },
    ],
  },
  {
    id: "msg-4",
    parts: [{ text: "Please generate a changelog.", type: "text" }],
  },
  {
    id: "msg-5",
    parts: [{ text: "Add dark mode support.", type: "text" }],
  },
  {
    id: "msg-6",
    parts: [{ text: "Optimize database queries.", type: "text" }],
  },
  {
    id: "msg-7",
    parts: [{ text: "Set up CI/CD pipeline.", type: "text" }],
  },
]

const sampleTodos: QueueTodo[] = [
  {
    description: "Complete the README and API docs",
    id: "todo-1",
    status: "completed",
    title: "Write project documentation",
  },
  {
    id: "todo-2",
    status: "pending",
    title: "Implement authentication",
  },
  {
    description: "Resolve crash on settings page",
    id: "todo-3",
    status: "pending",
    title: "Fix bug #42",
  },
  {
    description: "Unify queue and todo state management",
    id: "todo-4",
    status: "pending",
    title: "Refactor queue logic",
  },
  {
    description: "Increase test coverage for hooks",
    id: "todo-5",
    status: "pending",
    title: "Add unit tests",
  },
]

const MessageActions = React.memo(function MessageActions({
  messageId,
  onRemove,
  onSend,
}: {
  messageId: string
  onRemove: (e: React.MouseEvent, id: string) => void
  onSend: (e: React.MouseEvent, id: string) => void
}) {
  return (
    <QueueItemActions>
      <QueueItemAction
        aria-label="Remove from queue"
        title="Remove from queue"
        onClick={(e) => onRemove(e, messageId)}
      >
        <Trash2Icon className="size-3" />
      </QueueItemAction>
      <QueueItemAction
        aria-label="Send now"
        title="Send now"
        onClick={(e) => onSend(e, messageId)}
      >
        <ArrowUpIcon className="size-3.5" />
      </QueueItemAction>
    </QueueItemActions>
  )
})

const TodoItem = React.memo(function TodoItem({
  todo,
  onRemove,
}: {
  todo: QueueTodo
  onRemove: (id: string) => void
}) {
  const isCompleted = todo.status === "completed"

  return (
    <QueueItem>
      <div className="flex min-w-0 items-center gap-2">
        <QueueItemIndicator completed={isCompleted} />
        <QueueItemContent completed={isCompleted}>{todo.title}</QueueItemContent>
        <QueueItemActions>
          <QueueItemAction
            aria-label="Remove todo"
            onClick={() => onRemove(todo.id)}
          >
            <Trash2Icon className="size-3" />
          </QueueItemAction>
        </QueueItemActions>
      </div>
      {todo.description ? (
        <QueueItemDescription completed={isCompleted}>
          {todo.description}
        </QueueItemDescription>
      ) : null}
    </QueueItem>
  )
})

export function QueueDefault() {
  const [messages, setMessages] = React.useState(sampleMessages)
  const [todos, setTodos] = React.useState(sampleTodos)

  const handleMessageRemove = React.useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault()
      e.stopPropagation()
      setMessages((prev) => prev.filter((msg) => msg.id !== id))
    },
    []
  )

  const handleMessageSend = React.useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault()
      e.stopPropagation()
      setMessages((prev) => prev.filter((msg) => msg.id !== id))
    },
    []
  )

  const handleRemoveTodo = React.useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  if (messages.length === 0 && todos.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Queue is empty — refresh to reset the demo.
      </p>
    )
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-8">
      <Queue>
        {messages.length > 0 ? (
          <QueueSection>
            <QueueSectionTrigger>
              <QueueSectionLabel count={messages.length} label="Queued" />
            </QueueSectionTrigger>
            <QueueSectionContent>
              <QueueList>
                {messages.map((message) => {
                  const text = message.parts
                    .filter((p) => p.type === "text")
                    .map((p) => p.text)
                    .join(" ")
                    .trim()
                  const summary = text || "(queued message)"
                  const files = message.parts.filter(
                    (p) => p.type === "file" && p.url
                  )

                  return (
                    <QueueItem key={message.id}>
                      <div className="flex min-w-0 items-center gap-2">
                        <QueueItemIndicator />
                        <QueueItemContent>{summary}</QueueItemContent>
                        <MessageActions
                          messageId={message.id}
                          onRemove={handleMessageRemove}
                          onSend={handleMessageSend}
                        />
                      </div>
                      {files.length > 0 ? (
                        <QueueItemAttachment>
                          {files.map((file) => {
                            if (
                              file.mediaType?.startsWith("image/") &&
                              file.url
                            ) {
                              return (
                                <QueueItemImage
                                  key={file.url}
                                  alt={file.filename || "attachment"}
                                  src={file.url}
                                />
                              )
                            }
                            return (
                              <QueueItemFile key={file.url}>
                                {file.filename || "file"}
                              </QueueItemFile>
                            )
                          })}
                        </QueueItemAttachment>
                      ) : null}
                    </QueueItem>
                  )
                })}
              </QueueList>
            </QueueSectionContent>
          </QueueSection>
        ) : null}

        {todos.length > 0 ? (
          <QueueSection>
            <QueueSectionTrigger>
              <QueueSectionLabel count={todos.length} label="Todo" />
            </QueueSectionTrigger>
            <QueueSectionContent>
              <QueueList>
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onRemove={handleRemoveTodo}
                  />
                ))}
              </QueueList>
            </QueueSectionContent>
          </QueueSection>
        ) : null}
      </Queue>
    </div>
  )
}
