CREATE TABLE "marketplace_downloads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"clerk_user_id" text NOT NULL,
	"slug" text NOT NULL,
	"source" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "marketplace_downloads" ADD CONSTRAINT "marketplace_downloads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "marketplace_downloads_user_id_created_at_idx" ON "marketplace_downloads" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "marketplace_downloads_slug_created_at_idx" ON "marketplace_downloads" USING btree ("slug","created_at");--> statement-breakpoint
CREATE INDEX "marketplace_downloads_clerk_user_id_created_at_idx" ON "marketplace_downloads" USING btree ("clerk_user_id","created_at");
