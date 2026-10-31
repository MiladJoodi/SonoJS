CREATE TYPE "public"."webhook_event_status" AS ENUM('processing', 'processed', 'failed');--> statement-breakpoint
CREATE TABLE "clerk_sync_leases" (
	"clerk_user_id" text PRIMARY KEY NOT NULL,
	"fence" bigint DEFAULT 0 NOT NULL,
	"holder_token" uuid,
	"locked_until" timestamp with time zone,
	"pending" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "last_stripe_event_created" integer;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "stripe_webhook_events" ADD COLUMN "status" "webhook_event_status" DEFAULT 'processing' NOT NULL;--> statement-breakpoint
ALTER TABLE "stripe_webhook_events" ADD COLUMN "claim_token" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "stripe_webhook_events" ADD COLUMN "attempt_count" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "stripe_webhook_events" ADD COLUMN "last_error" text;--> statement-breakpoint
ALTER TABLE "stripe_webhook_events" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "last_stripe_event_created" integer;