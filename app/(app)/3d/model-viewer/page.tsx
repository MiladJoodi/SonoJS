import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Model Viewer",
  description:
    "An interactive Three.js model viewer for GLTF, GLB, FBX, and OBJ with orbit controls, lights, and environment presets. Install with the SonoJS CLI.",
  path: "/3d/model-viewer",
})

const exampleDefs = [
  {
    name: "model-viewer-default",
    title: "Default",
    description:
      "Orbit and zoom the bundled Flight Helmet sample. Drag to rotate; scroll to zoom.",
  },
]

const usage = `"use client"

import { ModelViewer } from "@/components/3d/model-viewer"

export default function Page() {
  return (
    <div className="h-[560px] w-full">
      <ModelViewer
        url="/media/3d/model-viewer/FlightHelmet.gltf"
        autoRotate
        autoRotateSpeed={1}
        environmentPreset="studio"
      />
    </div>
  )
}`

export default async function ModelViewerDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Model Viewer"
        pathname="/3d/model-viewer"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Load{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              .gltf
            </code>
            ,{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              .glb
            </code>
            ,{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              .fbx
            </code>
            , or{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              .obj
            </code>{" "}
            with orbit, zoom, three-point lights, contact shadows, and
            environment presets. Built with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              three
            </code>
            ,{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              @react-three/fiber
            </code>
            , and{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              @react-three/drei
            </code>
            . The demo Flight Helmet installs to{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              public/media/3d/model-viewer
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
          previewClassName="bg-card p-0"
        />
      </section>

      <DocsInstallation name="model-viewer" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "url",
              type: "string",
              defaultValue: "/media/3d/model-viewer/FlightHelmet.gltf",
              description: "Model URL (gltf, glb, fbx, or obj).",
            },
            {
              name: "width",
              type: "string | number",
              defaultValue: '"100%"',
              description: "Viewer width.",
            },
            {
              name: "height",
              type: "string | number",
              defaultValue: '"100%"',
              description: "Viewer height.",
            },
            {
              name: "defaultZoom",
              type: "number",
              defaultValue: "2",
              description: "Initial camera Z distance.",
            },
            {
              name: "minZoomDistance",
              type: "number",
              defaultValue: "0.5",
              description: "Closest orbit distance.",
            },
            {
              name: "maxZoomDistance",
              type: "number",
              defaultValue: "10",
              description: "Farthest orbit distance.",
            },
            {
              name: "enableManualRotation",
              type: "boolean",
              defaultValue: "true",
              description: "Allow drag/touch orbit.",
            },
            {
              name: "enableManualZoom",
              type: "boolean",
              defaultValue: "true",
              description: "Allow wheel/pinch zoom.",
            },
            {
              name: "ambientIntensity",
              type: "number",
              defaultValue: "0.3",
              description: "Ambient light strength.",
            },
            {
              name: "keyLightIntensity",
              type: "number",
              defaultValue: "1",
              description: "Key directional light.",
            },
            {
              name: "fillLightIntensity",
              type: "number",
              defaultValue: "0.5",
              description: "Fill directional light.",
            },
            {
              name: "rimLightIntensity",
              type: "number",
              defaultValue: "0.8",
              description: "Rim directional light.",
            },
            {
              name: "environmentPreset",
              type: "ModelViewerEnvironmentPreset",
              defaultValue: '"studio"',
              description:
                "`city` | `sunset` | `night` | `dawn` | `studio` | `apartment` | `forest` | `park` | `none`.",
            },
            {
              name: "autoRotate",
              type: "boolean",
              defaultValue: "false",
              description: "Spin the model (respects reduced motion).",
            },
            {
              name: "autoRotateSpeed",
              type: "number",
              defaultValue: "0.35",
              description: "Auto-rotate speed.",
            },
            {
              name: "onModelLoaded",
              type: "() => void",
              description: "Fires once after the model is ready.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the outer wrapper.",
            },
          ]}
        />
      </section>
    </article>
  )
}
