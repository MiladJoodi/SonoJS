export type PipelineHttpResult =
  | { status: "skipped"; reason: "duplicate" | "in_flight" }
  | { status: "processed" }
  | { status: "failed"; error: string }

/** Map pipeline result to Stripe-facing HTTP status. */
export function pipelineResultToHttpStatus(result: PipelineHttpResult): number {
  if (result.status === "processed") return 200
  if (result.status === "skipped" && result.reason === "duplicate") return 200
  if (result.status === "skipped" && result.reason === "in_flight") return 503
  return 500
}
