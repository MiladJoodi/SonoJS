"use client"

import * as React from "react"
import { PlusIcon, XIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@sonojs/ui/components/input-group"
import { cn } from "@/lib/utils"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden>
      *
    </span>
  )
}

export default function WorkspaceSetup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [workspaceName, setWorkspaceName] = React.useState("")
  const [slug, setSlug] = React.useState("")
  const [slugTouched, setSlugTouched] = React.useState(false)
  const [inviteInput, setInviteInput] = React.useState("")
  const [invites, setInvites] = React.useState<string[]>([
    "alex@acme.com",
    "sam@acme.com",
  ])

  const onWorkspaceNameChange = (value: string) => {
    setWorkspaceName(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  const addInvite = () => {
    const next = inviteInput.trim().toLowerCase()
    if (!next || !isValidEmail(next) || invites.includes(next)) {
      return
    }
    setInvites((prev) => [...prev, next])
    setInviteInput("")
  }

  const removeInvite = (email: string) => {
    setInvites((prev) => prev.filter((item) => item !== email))
  }

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-16",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-lg">
        <form
          className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
          onSubmit={(event) => event.preventDefault()}
          noValidate
          aria-labelledby="workspace-setup-04-heading"
        >
          <header className="border-b border-border/70 px-5 py-5 text-start sm:px-8 sm:py-6">
            <div className="flex flex-wrap items-center gap-2">
              <h1
                id="workspace-setup-04-heading"
                className="text-balance text-xl font-semibold tracking-tight sm:text-2xl"
              >
                Create & invite
              </h1>
              <Badge variant="secondary">Optional invites</Badge>
            </div>
            <p className="mt-1.5 text-pretty text-sm text-muted-foreground">
              Set up the workspace, then add teammates by email before you
              launch.
            </p>
          </header>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="workspace-setup-04-workspace">
                  Workspace name <RequiredMark />
                </FieldLabel>
                <Input
                  id="workspace-setup-04-workspace"
                  name="workspaceName"
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Design"
                  value={workspaceName}
                  onChange={(e) => onWorkspaceNameChange(e.target.value)}
                  required
                  aria-required="true"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="workspace-setup-04-slug">
                  Workspace URL <RequiredMark />
                </FieldLabel>
                <InputGroup dir="ltr">
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>app.example.com/</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="workspace-setup-04-slug"
                    name="workspaceSlug"
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="acme"
                    value={slug}
                    onChange={(e) => {
                      setSlugTouched(true)
                      setSlug(slugify(e.target.value))
                    }}
                    required
                    aria-required="true"
                  />
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="workspace-setup-04-invite">
                  Invite teammates
                </FieldLabel>
                <InputGroup dir="ltr">
                  <InputGroupInput
                    id="workspace-setup-04-invite"
                    name="inviteEmail"
                    type="email"
                    autoComplete="off"
                    placeholder="name@company.com"
                    value={inviteInput}
                    onChange={(e) => setInviteInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addInvite()
                      }
                    }}
                    aria-describedby="workspace-setup-04-invite-hint"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={addInvite}
                      aria-label="Add invite"
                    >
                      <PlusIcon className="size-4" aria-hidden />
                      Add
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription id="workspace-setup-04-invite-hint">
                  Press Enter or Add. You can skip this and invite later.
                </FieldDescription>

                {invites.length > 0 ? (
                  <ul
                    className="mt-3 flex flex-wrap gap-2"
                    aria-label="Pending invites"
                  >
                    {invites.map((email) => (
                      <li key={email}>
                        <span
                          dir="ltr"
                          className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-muted/40 py-1 ps-2.5 pe-1 text-xs text-foreground"
                        >
                          {email}
                          <button
                            type="button"
                            className="inline-flex size-5 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                            onClick={() => removeInvite(email)}
                            aria-label={`Remove ${email}`}
                          >
                            <XIcon className="size-3" aria-hidden />
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Field>

              <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button type="submit" className="cursor-pointer">
                  {invites.length > 0
                    ? "Create & send invites"
                    : "Create workspace"}
                </Button>
              </div>
            </FieldGroup>
          </div>
        </form>
      </div>
    </div>
  )
}
