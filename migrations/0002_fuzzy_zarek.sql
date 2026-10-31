ALTER TABLE "subscriptions" ADD COLUMN "last_stripe_event_id" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "last_reconciled_at" timestamp with time zone;