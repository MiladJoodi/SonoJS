"use client";

import { useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/components/tools/endpoints/workspace/workspace-provider";
import {
  ConfirmDialog,
  PromptDialog,
} from "@/components/tools/endpoints/dialogs/app-dialogs";
import { Button } from "@/components/tools/endpoints/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tools/endpoints/ui/dialog";
import { Input } from "@/components/tools/endpoints/ui/input";
import { Label } from "@/components/tools/endpoints/ui/label";
import { Textarea } from "@/components/tools/endpoints/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/tools/endpoints/ui/select";

const CONTACT_EMAIL = "info@endpoints.ir";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { preferences, setPreferences, resetWorkspace } = useWorkspace();
  const [customTimeoutOpen, setCustomTimeoutOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactHoneypot, setContactHoneypot] = useState("");
  const [sendingContact, setSendingContact] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      toast.success("Email copied");
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy email");
    }
  };

  const handleResetWorkspace = async () => {
    setResetting(true);
    try {
      await resetWorkspace();
      toast.success("Workspace reset");
      onOpenChange(false);
    } catch {
      toast.error("Could not reset workspace");
    } finally {
      setResetting(false);
    }
  };

  const resetContactForm = () => {
    setContactName("");
    setContactEmail("");
    setContactMessage("");
    setContactHoneypot("");
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendingContact) return;
    setSendingContact(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          company: contactHoneypot,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;
      if (!res.ok || !data?.ok) {
        toast.error(data?.error || "Could not send message");
        return;
      }
      toast.success("Message sent");
      resetContactForm();
      setContactFormOpen(false);
    } catch {
      toast.error("Could not send message");
    } finally {
      setSendingContact(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Preferences stay on this device. Nothing is synced to a server.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Request timeout</Label>
              <Select
                value={String(preferences.timeoutMs)}
                items={{
                  "10000": "10 seconds",
                  "30000": "30 seconds",
                  "60000": "60 seconds",
                  custom: "Custom…",
                  ...(![10_000, 30_000, 60_000].includes(preferences.timeoutMs)
                    ? {
                        [String(preferences.timeoutMs)]:
                          `${preferences.timeoutMs / 1000} seconds`,
                      }
                    : {}),
                }}
                onValueChange={(value) => {
                  if (!value) return;
                  if (value === "custom") {
                    setCustomTimeoutOpen(true);
                    return;
                  }
                  setPreferences({ timeoutMs: Number(value) });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10000">10 seconds</SelectItem>
                  <SelectItem value="30000">30 seconds</SelectItem>
                  <SelectItem value="60000">60 seconds</SelectItem>
                  <SelectItem value="custom">Custom…</SelectItem>
                  {![10_000, 30_000, 60_000].includes(preferences.timeoutMs) ? (
                    <SelectItem value={String(preferences.timeoutMs)}>
                      {preferences.timeoutMs / 1000} seconds
                    </SelectItem>
                  ) : null}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 rounded-lg border border-border/80 bg-muted/30 px-3 py-3">
              <Label>Contact us</Label>
              <p className="text-xs text-muted-foreground">
                Questions, feedback, or partnership — email us.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-mono text-sm font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="ghost"
                    className="size-6 shrink-0 text-muted-foreground hover:text-foreground"
                    aria-label={copied ? "Copied" : "Copy email"}
                    onClick={() => void copyEmail()}
                  >
                    {copied ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </Button>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setContactFormOpen(true)}
                >
                  Send message…
                </Button>
              </div>
            </div>

            <div className="space-y-2 rounded-lg border border-destructive/25 bg-destructive/5 px-3 py-3">
              <Label>Reset workspace</Label>
              <p className="text-xs text-muted-foreground">
                Permanently deletes collections, requests, history, environments,
                and settings on this device. Theme is kept.
              </p>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                disabled={resetting}
                onClick={() => setResetOpen(true)}
              >
                Reset everything…
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              API Client is local-first. Collections, history, and environments are stored in
              IndexedDB on this device.
            </p>
          </div>

          <div className="flex justify-end">
            <Button type="button" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={contactFormOpen}
        onOpenChange={(next) => {
          setContactFormOpen(next);
          if (!next) resetContactForm();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send message</DialogTitle>
            <DialogDescription>
              Questions, feedback, or partnership — we will reply by email.
            </DialogDescription>
          </DialogHeader>

          <form
            id="contact-form"
            className="space-y-3"
            onSubmit={(e) => void handleContactSubmit(e)}
          >
            <div className="space-y-1.5">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                maxLength={120}
                autoComplete="name"
                disabled={sendingContact}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                maxLength={254}
                autoComplete="email"
                disabled={sendingContact}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
                maxLength={4000}
                rows={4}
                disabled={sendingContact}
                className="min-h-24 resize-y"
              />
            </div>
            <input
              type="text"
              name="company"
              value={contactHoneypot}
              onChange={(e) => setContactHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -start-[9999px] h-0 w-0 opacity-0"
            />
          </form>

          <DialogFooter className="mx-0 mb-0 gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={sendingContact}
              onClick={() => setContactFormOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="contact-form"
              disabled={sendingContact}
            >
              {sendingContact ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Sending…
                </>
              ) : (
                "Send"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PromptDialog
        open={customTimeoutOpen}
        onOpenChange={setCustomTimeoutOpen}
        title="Custom timeout"
        description="Enter timeout in seconds."
        label="Seconds"
        defaultValue="45"
        confirmLabel="Apply"
        onConfirm={(raw) => {
          const seconds = Number(raw);
          if (!Number.isFinite(seconds) || seconds <= 0) return;
          setPreferences({ timeoutMs: Math.round(seconds * 1000) });
        }}
      />

      <ConfirmDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        title="Reset workspace?"
        description="This permanently deletes collections, requests, history, environments, and settings on this device. Your theme is kept. This cannot be undone."
        confirmLabel="Reset everything"
        destructive
        onConfirm={() => void handleResetWorkspace()}
      />
    </>
  );
}
