"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useReverification, useUser } from "@clerk/nextjs"
import {
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  Link2Icon,
  ShieldIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react"

import { AccountIdentityHero } from "@/components/auth/account"
import { GithubIcon } from "@/registry/icons/github"
import { GoogleIcon } from "@/registry/icons/google"
import {
  formatPlanExpiry,
  getEffectivePlanExpiresAt,
  getUserPlan,
  getViewerPlanId,
  planLabel,
} from "@/lib/access"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Input } from "@sonojs/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { Label } from "@sonojs/ui/components/label"
import { Spinner } from "@sonojs/ui/components/spinner"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

const NAV = [
  { value: "profile", label: "Profile", icon: UserIcon },
  { value: "security", label: "Security", icon: ShieldIcon },
  { value: "connections", label: "Connections", icon: Link2Icon },
  { value: "danger", label: "Danger zone", icon: Trash2Icon },
] as const

type OAuthStrategy = "oauth_google" | "oauth_github"

const OAUTH_PROVIDERS: {
  strategy: OAuthStrategy
  label: string
  Icon: React.ComponentType<{ className?: string }>
}[] = [
  { strategy: "oauth_google", label: "Google", Icon: GoogleIcon },
  { strategy: "oauth_github", label: "GitHub", Icon: GithubIcon },
]

function FieldError({ message }: { message?: string | null }) {
  if (!message) return null
  return <p className="text-sm text-destructive">{message}</p>
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  disabled,
  required,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  autoComplete: string
  disabled?: boolean
  required?: boolean
}) {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <InputGroup>
        <InputGroupInput
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className="shadow-none"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            size="icon-xs"
            variant="ghost"
            className="cursor-pointer text-muted-foreground/55 shadow-none hover:bg-transparent hover:text-muted-foreground"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            disabled={disabled}
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? (
              <EyeOffIcon className="size-4" aria-hidden />
            ) : (
              <EyeIcon className="size-4" aria-hidden />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function StatusMessage({
  tone = "muted",
  children,
}: {
  tone?: "muted" | "success" | "destructive"
  children: React.ReactNode
}) {
  return (
    <p
      className={cn(
        "text-sm",
        tone === "success" && "text-emerald-600 dark:text-emerald-400",
        tone === "destructive" && "text-destructive",
        tone === "muted" && "text-muted-foreground"
      )}
    >
      {children}
    </p>
  )
}

export function AccountSettings({ className }: { className?: string }) {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [profileMsg, setProfileMsg] = React.useState<string | null>(null)
  const [profileError, setProfileError] = React.useState<string | null>(null)
  const [profileBusy, setProfileBusy] = React.useState(false)

  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [passwordMsg, setPasswordMsg] = React.useState<string | null>(null)
  const [passwordError, setPasswordError] = React.useState<string | null>(null)
  const [passwordBusy, setPasswordBusy] = React.useState(false)

  const [connBusy, setConnBusy] = React.useState<string | null>(null)
  const [connError, setConnError] = React.useState<string | null>(null)

  const [deleteBusy, setDeleteBusy] = React.useState(false)
  const [deleteError, setDeleteError] = React.useState<string | null>(null)

  const updatePassword = useReverification(
    (params: {
      currentPassword?: string
      newPassword: string
    }) =>
      user?.updatePassword({
        ...(params.currentPassword
          ? { currentPassword: params.currentPassword }
          : {}),
        newPassword: params.newPassword,
        signOutOfOtherSessions: true,
      })
  )

  const deleteUser = useReverification(() => user?.delete())

  React.useEffect(() => {
    if (!user) return
    setFirstName(user.firstName ?? "")
    setLastName(user.lastName ?? "")
  }, [user])

  if (!isLoaded) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner className="size-5 text-muted-foreground" />
      </div>
    )
  }

  if (!isSignedIn || !user) {
    return (
      <div className="mx-auto flex min-h-[40vh] max-w-md flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          Sign in to manage your account.
        </p>
        <Button
          type="button"
          className="cursor-pointer"
          onClick={() => router.push("/sign-in")}
        >
          Sign in
        </Button>
      </div>
    )
  }

  const email = user.primaryEmailAddress?.emailAddress
  const displayName = user.fullName || email || "Account"
  const metadata = user.publicMetadata
  const isPro = getUserPlan(metadata) === "pro"
  const planId = getViewerPlanId(metadata)
  const planName = planLabel(metadata)
  const planExpiryLabel = formatPlanExpiry(
    getEffectivePlanExpiresAt(metadata)
  )

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault()
    setProfileBusy(true)
    setProfileError(null)
    setProfileMsg(null)
    try {
      await user.update({ firstName, lastName })
      setProfileMsg("Profile saved.")
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Could not save profile.")
    } finally {
      setProfileBusy(false)
    }
  }

  const onAvatarFile = async (file: File) => {
    setProfileBusy(true)
    setProfileError(null)
    setProfileMsg(null)
    try {
      await user.setProfileImage({ file })
      setProfileMsg("Avatar updated.")
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Could not update avatar.")
    } finally {
      setProfileBusy(false)
    }
  }

  const removeAvatar = async () => {
    setProfileBusy(true)
    setProfileError(null)
    setProfileMsg(null)
    try {
      await user.setProfileImage({ file: null })
      setProfileMsg("Avatar removed.")
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Could not remove avatar.")
    } finally {
      setProfileBusy(false)
    }
  }

  const savePassword = async (event: React.FormEvent) => {
    event.preventDefault()
    setPasswordError(null)
    setPasswordMsg(null)
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.")
      return
    }
    const hasPassword = user.passwordEnabled
    if (hasPassword && !currentPassword) {
      setPasswordError("Enter your current password.")
      return
    }
    setPasswordBusy(true)
    try {
      await updatePassword({
        ...(hasPassword ? { currentPassword } : {}),
        newPassword,
      })
      setPasswordMsg(
        hasPassword
          ? "Password updated. Other sessions were signed out."
          : "Password added. You can also sign in with email."
      )
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Could not update password."
      )
    } finally {
      setPasswordBusy(false)
    }
  }

  const connectProvider = async (strategy: OAuthStrategy) => {
    setConnBusy(strategy)
    setConnError(null)
    try {
      const external = await user.createExternalAccount({
        strategy,
        redirectUrl: `${window.location.origin}/account`,
      })
      const redirectUrl = external.verification?.externalVerificationRedirectURL
      if (redirectUrl) {
        window.location.href = redirectUrl.href
        return
      }
      setConnError("Could not start the connection flow.")
    } catch (err) {
      setConnError(
        err instanceof Error ? err.message : "Could not connect account."
      )
    } finally {
      setConnBusy(null)
    }
  }

  const disconnectProvider = async (accountId: string) => {
    setConnBusy(accountId)
    setConnError(null)
    try {
      const account = user.externalAccounts.find((item) => item.id === accountId)
      await account?.destroy()
    } catch (err) {
      setConnError(
        err instanceof Error ? err.message : "Could not disconnect account."
      )
    } finally {
      setConnBusy(null)
    }
  }

  const onDelete = async () => {
    const confirmed = window.confirm(
      "Delete your account permanently? This cannot be undone."
    )
    if (!confirmed) return
    setDeleteBusy(true)
    setDeleteError(null)
    try {
      await deleteUser()
      router.replace("/")
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Could not delete account."
      )
      setDeleteBusy(false)
    }
  }

  return (
    <main
      className={cn(
        "w-full min-w-0 bg-canvas py-8 text-foreground sm:py-10",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <AccountIdentityHero
          name={displayName}
          email={email}
          imageUrl={user.imageUrl}
          isPro={isPro}
          planId={planId}
          planName={planName}
          expiryLabel={planExpiryLabel}
          avatarBusy={profileBusy}
          onPickAvatar={(file) => void onAvatarFile(file)}
          onRemoveAvatar={() => void removeAvatar()}
        />

        <Tabs
          defaultValue="profile"
          orientation="vertical"
          className="flex flex-col gap-3 md:flex-row md:items-start md:!gap-2"
        >
          <div className="w-full shrink-0 md:w-48">
            <TabsList
              aria-label="Account settings sections"
              className="h-auto w-full flex-row justify-start gap-0.5 overflow-x-auto rounded-[12px] border border-border/60 bg-card p-1 md:flex-col md:overflow-visible"
            >
              {NAV.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="h-10 cursor-pointer justify-start gap-2 rounded-md px-3 data-[state=active]:bg-primary/10 data-[state=active]:shadow-none data-[state=active]:text-primary"
                >
                  <item.icon className="size-4" aria-hidden />
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="min-w-0 flex-1 space-y-6">
            <TabsContent value="profile" className="mt-0">
              <Card className="gap-0 border-border/60 py-0 shadow-none">
                <CardHeader className="border-b border-border/50 py-6">
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Update your name. Change your photo from the avatar above.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 py-6">
                  <form className="grid gap-4" onSubmit={saveProfile}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="account-first">First name</Label>
                        <Input
                          id="account-first"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          disabled={profileBusy}
                          className="shadow-none"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="account-last">Last name</Label>
                        <Input
                          id="account-last"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          disabled={profileBusy}
                          className="shadow-none"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="account-email">Email</Label>
                      <Input
                        id="account-email"
                        value={email ?? ""}
                        readOnly
                        dir="ltr"
                        className="shadow-none opacity-80"
                      />
                      <p className="text-xs text-muted-foreground">
                        Primary email is managed by your sign-in method.
                      </p>
                    </div>
                    <FieldError message={profileError} />
                    {profileMsg ? (
                      <StatusMessage tone="success">{profileMsg}</StatusMessage>
                    ) : null}
                    <div>
                      <Button
                        type="submit"
                        className="cursor-pointer shadow-none"
                        disabled={profileBusy}
                      >
                        {profileBusy ? <Spinner className="size-4" /> : "Save profile"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <Card className="gap-0 border-border/60 py-0 shadow-none">
                <CardHeader className="border-b border-border/50 py-6">
                  <CardTitle className="flex items-center gap-2">
                    <KeyIcon className="size-4" aria-hidden />
                    {user.passwordEnabled ? "Change password" : "Add a password"}
                  </CardTitle>
                  <CardDescription>
                    {user.passwordEnabled
                      ? "Update your password and sign out other sessions."
                      : "You signed in with Google or GitHub. Optionally add a password to sign in with email too."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-6">
                  <form className="grid max-w-md gap-4" onSubmit={savePassword}>
                    {user.passwordEnabled ? (
                      <PasswordField
                        id="current-password"
                        label="Current password"
                        autoComplete="current-password"
                        value={currentPassword}
                        onChange={setCurrentPassword}
                        required
                        disabled={passwordBusy}
                      />
                    ) : null}
                    <PasswordField
                      id="new-password"
                      label={
                        user.passwordEnabled ? "New password" : "Password"
                      }
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={setNewPassword}
                      required
                      disabled={passwordBusy}
                    />
                    <PasswordField
                      id="confirm-password"
                      label="Confirm password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      required
                      disabled={passwordBusy}
                    />
                    <FieldError message={passwordError} />
                    {passwordMsg ? (
                      <StatusMessage tone="success">{passwordMsg}</StatusMessage>
                    ) : null}
                    <Button
                      type="submit"
                      className="w-fit cursor-pointer shadow-none"
                      disabled={passwordBusy}
                    >
                      {passwordBusy ? (
                        <Spinner className="size-4" />
                      ) : user.passwordEnabled ? (
                        "Update password"
                      ) : (
                        "Add password"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="connections" className="mt-0">
              <Card className="gap-0 border-border/60 py-0 shadow-none">
                <CardHeader className="border-b border-border/50 py-6">
                  <CardTitle>Connected accounts</CardTitle>
                  <CardDescription>
                    Link Google or GitHub for faster sign-in.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 py-6">
                  {OAUTH_PROVIDERS.map(({ strategy, label, Icon }) => {
                    const connected = user.externalAccounts.find(
                      (account) =>
                        account.provider === strategy.replace("oauth_", "") ||
                        account.verification?.strategy === strategy
                    )
                    const busy = connBusy === strategy || connBusy === connected?.id

                    return (
                      <div
                        key={strategy}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-border/70 bg-card px-4 py-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <Icon className="size-5 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {label}
                            </p>
                            {connected ? (
                              <p className="truncate text-xs text-muted-foreground">
                                {connected.emailAddress ||
                                  connected.username ||
                                  "Connected"}
                              </p>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                Not connected
                              </p>
                            )}
                          </div>
                        </div>
                        {connected ? (
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-flex items-center gap-1 text-emerald-600/70 dark:text-emerald-400/65"
                              title="Connected"
                            >
                              <CheckIcon
                                className="size-3.5 stroke-[2.5]"
                                aria-hidden
                              />
                              <span className="hidden text-xs font-medium tracking-tight sm:inline">
                                Connected
                              </span>
                              <span className="sr-only sm:hidden">Connected</span>
                            </span>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="cursor-pointer border-border/70 shadow-none"
                              disabled={busy}
                              onClick={() =>
                                void disconnectProvider(connected.id)
                              }
                            >
                              {busy ? (
                                <Spinner className="size-4" />
                              ) : (
                                "Disconnect"
                              )}
                            </Button>
                          </div>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="cursor-pointer border-border/70 shadow-none"
                            disabled={busy}
                            onClick={() => void connectProvider(strategy)}
                          >
                            {busy ? <Spinner className="size-4" /> : "Connect"}
                          </Button>
                        )}
                      </div>
                    )
                  })}
                  <FieldError message={connError} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="danger" className="mt-0">
              <Card className="gap-0 border-destructive/25 py-0 shadow-none">
                <CardHeader className="border-b border-destructive/15 py-6">
                  <CardTitle className="text-destructive">Delete account</CardTitle>
                  <CardDescription>
                    Permanently remove your account and all associated data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 py-6">
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone. You may be asked to verify your
                    identity before deletion.
                  </p>
                  <FieldError message={deleteError} />
                </CardContent>
                <CardFooter className="border-t border-destructive/20 py-4">
                  <Button
                    type="button"
                    variant="destructive"
                    className="cursor-pointer"
                    disabled={deleteBusy}
                    onClick={() => void onDelete()}
                  >
                    {deleteBusy ? (
                      <Spinner className="size-4" />
                    ) : (
                      <>
                        <Trash2Icon className="size-4" />
                        Delete account
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  )
}
