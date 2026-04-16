import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
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
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==================== COMMUNITY ====================

import { communityPosts, reports, type InsertCommunityPost, type InsertReport } from "../drizzle/schema";
import { desc, sql, and, gte } from "drizzle-orm";

/** Get recent community posts (last 7 days, not hidden) */
export async function getRecentPosts(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return db.select().from(communityPosts)
    .where(and(
      eq(communityPosts.isHidden, false),
      gte(communityPosts.createdAt, sevenDaysAgo)
    ))
    .orderBy(desc(communityPosts.createdAt))
    .limit(limit);
}

/** Create a community post */
export async function createPost(post: InsertCommunityPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(communityPosts).values(post);
  return result;
}

/** Increment support count */
export async function addSupport(postId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(communityPosts)
    .set({ supportCount: sql`${communityPosts.supportCount} + 1` })
    .where(eq(communityPosts.id, postId));
}

/** Increment relate count */
export async function addRelate(postId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(communityPosts)
    .set({ relateCount: sql`${communityPosts.relateCount} + 1` })
    .where(eq(communityPosts.id, postId));
}

/** Report a post */
export async function reportPost(report: InsertReport) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(reports).values(report);
  // Auto-hide if 3+ reports
  const reportCount = await db.select({ count: sql<number>`count(*)` })
    .from(reports)
    .where(eq(reports.postId, report.postId));
  if (reportCount[0] && reportCount[0].count >= 3) {
    await db.update(communityPosts)
      .set({ isHidden: true })
      .where(eq(communityPosts.id, report.postId));
  }
}
