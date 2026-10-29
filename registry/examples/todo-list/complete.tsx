"use client"

import { TodoList } from "@sonojs/ui/components/todo-list"

export function TodoListComplete() {
  return (
    <div className="mx-auto w-full max-w-md">
      <TodoList
        title="Launch checklist"
        collapseOnComplete={false}
        defaultOpen
        items={[
          { id: "a", title: "Ship registry payload", status: "completed" },
          { id: "b", title: "Update docs nav", status: "completed" },
          {
            id: "c",
            title: "Spot-check install path",
            status: "completed",
            detail: "sonojs/",
          },
          { id: "d", title: "Skipped old copy", status: "cancelled" },
        ]}
      />
    </div>
  )
}
