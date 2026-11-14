CREATE TYPE "public"."product_entitlement_source" AS ENUM('purchase', 'admin_grant');--> statement-breakpoint
CREATE TABLE "product_entitlements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"clerk_user_id" text NOT NULL,
	"product_slug" text NOT NULL,
	"source" "product_entitlement_source" NOT NULL,
	"stripe_checkout_session_id" text,
	"amount_cents" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"revoked_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "product_entitlements" ADD CONSTRAINT "product_entitlements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "product_entitlements_user_id_product_slug_uidx" ON "product_entitlements" USING btree ("user_id","product_slug");--> statement-breakpoint
CREATE UNIQUE INDEX "product_entitlements_stripe_checkout_session_id_uidx" ON "product_entitlements" USING btree ("stripe_checkout_session_id");--> statement-breakpoint
CREATE INDEX "product_entitlements_clerk_user_id_idx" ON "product_entitlements" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE INDEX "product_entitlements_product_slug_idx" ON "product_entitlements" USING btree ("product_slug");