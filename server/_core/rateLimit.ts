import type { TrpcContext } from "./context";
import { TRPCError } from "@trpc/server";

type Bucket = { windowStart: number; count: number };

const buckets = new Map<string, Bucket>();

function getClientIp(ctx: TrpcContext): string {
  const xf = ctx.req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length > 0) {
    return xf.split(",")[0]?.trim() || "unknown";
  }
  const ra = (ctx.req as any)?.socket?.remoteAddress as unknown;
  return typeof ra === "string" && ra.length > 0 ? ra : "unknown";
}

export function enforceRateLimit(
  ctx: TrpcContext,
  key: string,
  opts: { windowMs: number; max: number }
) {
  const ip = getClientIp(ctx);
  const bucketKey = `${key}:${ip}`;
  const now = Date.now();

  const existing = buckets.get(bucketKey);
  if (!existing || now - existing.windowStart >= opts.windowMs) {
    buckets.set(bucketKey, { windowStart: now, count: 1 });
    return;
  }

  existing.count += 1;
  if (existing.count > opts.max) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Trop de requêtes. Réessaie dans quelques instants.",
    });
  }
}

