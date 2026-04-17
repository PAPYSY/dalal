import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { eq, and, gte, desc, sql } from "drizzle-orm";
import { users, communityPosts, reports } from "../drizzle/schema";
import type { InsertUser, InsertCommunityPost, InsertReport } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: NeonHttpDatabase | null = null;

export function getDb(): NeonHttpDatabase | null {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const sqlClient = neon(process.env.DATABASE_URL);
      _db = drizzle(sqlClient);
    } catch (error) {
      console.warn("[Database] Failed to init:", error);
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");

  const db = getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

    await db
      .insert(users)
      .values(values)
      .onConflictDoUpdate({ target: users.openId, set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ==================== COMMUNITY ====================

export async function getRecentPosts(limit = 50) {
  const db = getDb();
  if (!db) return [];
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return db
    .select()
    .from(communityPosts)
    .where(and(eq(communityPosts.isHidden, false), gte(communityPosts.createdAt, sevenDaysAgo)))
    .orderBy(desc(communityPosts.createdAt))
    .limit(limit);
}

export async function createPost(post: InsertCommunityPost) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(communityPosts).values(post);
}

export async function addSupport(postId: number) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(communityPosts)
    .set({ supportCount: sql`${communityPosts.supportCount} + 1` })
    .where(eq(communityPosts.id, postId));
}

export async function addRelate(postId: number) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(communityPosts)
    .set({ relateCount: sql`${communityPosts.relateCount} + 1` })
    .where(eq(communityPosts.id, postId));
}

export async function reportPost(report: InsertReport) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(reports).values(report);
  const reportCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(reports)
    .where(eq(reports.postId, report.postId));
  if (reportCount[0] && reportCount[0].count >= 3) {
    await db.update(communityPosts).set({ isHidden: true }).where(eq(communityPosts.id, report.postId));
  }
}
