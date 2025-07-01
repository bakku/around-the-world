PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_rooms`("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM `rooms`;--> statement-breakpoint
DROP TABLE `rooms`;--> statement-breakpoint
ALTER TABLE `__new_rooms` RENAME TO `rooms`;--> statement-breakpoint
PRAGMA foreign_keys=ON;