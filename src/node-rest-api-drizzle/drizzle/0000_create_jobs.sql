CREATE TYPE "public"."status" AS ENUM('Applied', 'Interview', 'Offer', 'Rejected');--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jobs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"company" varchar(100) NOT NULL,
	"role" varchar(100) NOT NULL,
	"status" "status" DEFAULT 'Applied' NOT NULL,
	"applied_on" date NOT NULL
);
