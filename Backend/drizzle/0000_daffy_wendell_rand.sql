CREATE TABLE `shortLinks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`short_code` varchar(225) NOT NULL,
	`url` varchar(500) NOT NULL,
	`clicks` int DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `shortLinks_id` PRIMARY KEY(`id`),
	CONSTRAINT `shortLinks_short_code_unique` UNIQUE(`short_code`)
);
