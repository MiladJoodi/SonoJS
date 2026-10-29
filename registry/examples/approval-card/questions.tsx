"use client"

import * as React from "react"

import {
  ApprovalCard,
  type ApprovalCardAnswers,
  type ApprovalCardStatus,
} from "@sonojs/ui/components/approval-card"

const QUESTIONS = [
  {
    id: "scope",
    title: "What should we change?",
    description: "Pick the areas this agent is allowed to touch.",
    multiple: true,
    options: [
      { value: "docs", label: "Documentation" },
      { value: "ui", label: "UI components" },
      { value: "cli", label: "CLI install path" },
    ],
  },
  {
    id: "risk",
    title: "How careful should it be?",
    description: "Single choice — advances automatically.",
    options: [
      { value: "strict", label: "Strict — ask before every write" },
      { value: "balanced", label: "Balanced — ask on risky files" },
      { value: "fast", label: "Fast — propose a full patch" },
    ],
  },
  {
    id: "note",
    title: "Anything else?",
    description: "Optional free-form note for the agent.",
    allowCustom: true,
    customPlaceholder: "Add context…",
  },
]

export function ApprovalCardQuestions() {
  const [status, setStatus] = React.useState<ApprovalCardStatus>("pending")
  const [answers, setAnswers] = React.useState<ApprovalCardAnswers>({})

  return (
    <div className="mx-auto w-full max-w-md">
      <ApprovalCard
        title="Configure agent run"
        questions={QUESTIONS}
        status={status}
        answers={answers}
        onAnswersChange={setAnswers}
        onSubmit={() => setStatus("answered")}
        onDismiss={() => {
          setStatus("pending")
          setAnswers({})
        }}
        result="Preferences saved for this run."
      />
    </div>
  )
}
