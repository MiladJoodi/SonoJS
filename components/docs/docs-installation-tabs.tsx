"use client"

import { CopyButton } from "@/components/docs/copy-button"
import { InstallNeedsHint } from "@/components/docs/install-needs-hint"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

export type DocsInstallFileView = {
  title: string
  code: string
  html: string
}

export type DocsInstallationTabsProps = {
  cliCode: string
  cliHtml: string
  alsoNeedsRegistry: string[]
  alsoNeedsNpm: string[]
  manualNpmCommand: string | null
  files: DocsInstallFileView[]
  showAliasNote: boolean
  /** Drawer copy buttons stay icon-only. */
  copyTooltip?: boolean
}

function CliCodeFrame({
  code,
  html,
  copyTooltip,
}: {
  code: string
  html: string
  copyTooltip: boolean
}) {
  return (
    <div className="sono-code-block rounded-none border-0">
      <div className="flex items-center justify-between gap-2 border-b border-[color:var(--code-border)] px-4 py-2">
        <div className="font-mono text-[14px] font-normal text-[color:var(--code-header-fg)]">
          CLI
        </div>
        <CopyButton value={code} tooltip={copyTooltip} />
      </div>
      <div
        className="sono-code-shiki no-scrollbar font-mono text-[14px] leading-[1.65]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

function ManualFileFrame({
  file,
  copyTooltip,
}: {
  file: DocsInstallFileView
  copyTooltip: boolean
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/80">
      <div className="sono-code-block rounded-none border-0">
        <div className="flex items-center justify-between gap-2 border-b border-[color:var(--code-border)] px-4 py-2">
          <div className="min-w-0 truncate font-mono text-[14px] font-normal text-[color:var(--code-header-fg)]">
            {file.title}
          </div>
          {/* Copy raw source only — never path or highlight HTML */}
          <CopyButton value={file.code} tooltip={copyTooltip} />
        </div>
        <div
          className="sono-code-shiki no-scrollbar max-h-96 overflow-auto font-mono text-[14px] leading-[1.65]"
          dangerouslySetInnerHTML={{ __html: file.html }}
        />
      </div>
    </div>
  )
}

function QuietCommand({
  command,
  copyTooltip,
}: {
  command: string
  copyTooltip: boolean
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <code className="min-w-0 max-w-full flex-1 truncate rounded-md border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[11.5px] text-foreground">
        {command}
      </code>
      <CopyButton
        value={command}
        tooltip={copyTooltip}
        className="shrink-0 text-muted-foreground hover:bg-muted hover:text-foreground"
      />
    </div>
  )
}

const installTabTriggerClass =
  "flex-none border-transparent px-3 shadow-none focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"

export function DocsInstallationTabs({
  cliCode,
  cliHtml,
  alsoNeedsRegistry,
  alsoNeedsNpm,
  manualNpmCommand,
  files,
  showAliasNote,
  copyTooltip = true,
}: DocsInstallationTabsProps) {
  const hasCommandNeeds =
    alsoNeedsRegistry.length > 0 || alsoNeedsNpm.length > 0
  const registryAdd =
    alsoNeedsRegistry.length > 0
      ? `npx @sonojs/ui@latest add ${alsoNeedsRegistry.join(" ")}`
      : null
  const dependencyCommand = [registryAdd, manualNpmCommand]
    .filter(Boolean)
    .join(" && ")

  return (
    <Tabs defaultValue="command" className="gap-3">
      <TabsList variant="line" className="w-full justify-start sm:w-fit">
        <TabsTrigger value="command" className={installTabTriggerClass}>
          Command
        </TabsTrigger>
        <TabsTrigger value="manual" className={installTabTriggerClass}>
          Manual
        </TabsTrigger>
      </TabsList>

      <TabsContent value="command" className="mt-0 outline-none">
        <div className="overflow-hidden rounded-xl border border-border/80">
          <CliCodeFrame
            code={cliCode}
            html={cliHtml}
            copyTooltip={copyTooltip}
          />
          {hasCommandNeeds ? (
            <InstallNeedsHint
              label="Also needs"
              registry={alsoNeedsRegistry}
              npm={alsoNeedsNpm}
              copyTooltip={copyTooltip}
            />
          ) : null}
        </div>
      </TabsContent>

      <TabsContent value="manual" className="mt-0 space-y-5 outline-none">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Copy the following file{files.length === 1 ? "" : "s"} into your
            project.
          </p>
          <div className="space-y-3">
            {files.map((file, index) => (
              <ManualFileFrame
                key={`${file.title}:${index}`}
                file={file}
                copyTooltip={copyTooltip}
              />
            ))}
          </div>
        </div>

        {showAliasNote ? (
          <p className="text-sm text-muted-foreground">
            Adjust{" "}
            <code className="font-mono text-[0.9em]">@/</code> import paths to
            match your project.
          </p>
        ) : null}

        {dependencyCommand ? (
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">
              Then install dependencies:
            </p>
            <QuietCommand
              command={dependencyCommand}
              copyTooltip={copyTooltip}
            />
          </div>
        ) : null}
      </TabsContent>
    </Tabs>
  )
}
