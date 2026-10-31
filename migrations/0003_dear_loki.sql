CREATE TABLE "subscription_reconcile_leases" (
	"stripe_subscription_id" text PRIMARY KEY NOT NULL,
	"fence" bigint DEFAULT 0 NOT NULL,
	"holder_token" uuid,
	"locked_until" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "clerk_sync_leases" ADD COLUMN "last_synced_fingerprint" text;