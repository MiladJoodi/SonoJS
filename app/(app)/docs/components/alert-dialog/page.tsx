import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("alert-dialog", "Alert Dialog")

const exampleDefs = [
  {
    name: "alert-dialog-default",
    title: "Default",
    description: "Confirm a sensitive action before it runs.",
  },
  {
    name: "alert-dialog-small",
    title: "Small",
    description: "A tighter dialog for short confirmations.",
  },
  {
    name: "alert-dialog-destructive",
    title: "Destructive",
    description: "Style the confirm action for irreversible deletes.",
  },
]

const alertDialogSource = `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`

export default async function AlertDialogDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Alert Dialog"
        pathname="/docs/components/alert-dialog"
        description={
          <p className="leading-relaxed text-muted-foreground">
          A modal dialog that interrupts the user with important content and
          expects a response. Built on Radix Alert Dialog.
        </p>
        }
      />

      <section className="space-y-3">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="alert-dialog" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="alert-dialog.tsx"
          lang="tsx"
          code={alertDialogSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "size",
              type: '"default" | "sm"',
              defaultValue: '"default"',
              description:
                "On AlertDialogContent: default is wider on sm+; sm is compact with a 2-column footer.",
            },
            {
              name: "variant",
              type: "Button variant",
              defaultValue: 'Action: "default" · Cancel: "outline"',
              description:
                "On AlertDialogAction / AlertDialogCancel: forwarded to Button.",
            },
            {
              name: "asChild",
              type: "boolean",
              defaultValue: "false",
              description:
                "On AlertDialogTrigger: merge props into the child (e.g. Button).",
            },
          ]}
        />
      </section>
    </article>
  )
}
