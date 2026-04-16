CREATE TABLE `community_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pseudonym` varchar(100) NOT NULL,
	`content` text NOT NULL,
	`emotion` varchar(50),
	`supportCount` int NOT NULL DEFAULT 0,
	`relateCount` int NOT NULL DEFAULT 0,
	`isHidden` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `community_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`reason` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
