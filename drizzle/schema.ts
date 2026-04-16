import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Community posts — anonymous sharing
 * Posts expire after 7 days (handled by query filter)
 */
export const communityPosts = mysqlTable("community_posts", {
  id: int("id").autoincrement().primaryKey(),
  /** Anonymous display name (e.g. "Étoile anonyme #42") */
  pseudonym: varchar("pseudonym", { length: 100 }).notNull(),
  /** Post content */
  content: text("content").notNull(),
  /** Emotion tag */
  emotion: varchar("emotion", { length: 50 }),
  /** Number of "je te soutiens" reactions */
  supportCount: int("supportCount").default(0).notNull(),
  /** Number of "je me reconnais" reactions */
  relateCount: int("relateCount").default(0).notNull(),
  /** Whether post has been flagged/hidden */
  isHidden: boolean("isHidden").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = typeof communityPosts.$inferInsert;

/**
 * Reports for community posts
 */
export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  reason: varchar("reason", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;
