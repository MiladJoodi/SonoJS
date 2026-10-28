import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import RolesAndPermissions01 from "@/registry/blocks/user-account/roles-and-permissions/roles-and-permissions-01/roles-and-permissions"
import RolesAndPermissions02 from "@/registry/blocks/user-account/roles-and-permissions/roles-and-permissions-02/roles-and-permissions"
import RolesAndPermissions03 from "@/registry/blocks/user-account/roles-and-permissions/roles-and-permissions-03/roles-and-permissions"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/user-account/roles-and-permissions",
  "Roles & Permissions",
  "Ready-to-use Roles & Permissions UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import RolesAndPermissions from "@/components/blocks/user-account/${name}/roles-and-permissions"

export default function Page() {
  return <RolesAndPermissions />
}`

const EXAMPLES = [
  { name: "roles-and-permissions-01", Component: RolesAndPermissions01 },
  { name: "roles-and-permissions-02", Component: RolesAndPermissions02 },
  { name: "roles-and-permissions-03", Component: RolesAndPermissions03 },
] as const

export default function BlockRolesAndPermissionsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Roles & Permissions"
        pathname="/blocks/user-account/roles-and-permissions"
        description="Permission matrix, role cards, and a create/edit role flow for workspace access control."
      />

      <div className="flex flex-col gap-8">
        {EXAMPLES.map(({ name, Component }) => (
          <BlockExample
            key={name}
            name={name}
            usage={[
              {
                title: "app/page.tsx",
                code: usage(name),
              },
            ]}
            previewAlign="start"
            previewClassName="bg-canvas p-0"
          >
            <Component />
          </BlockExample>
        ))}
      </div>
    </article>
  )
}
