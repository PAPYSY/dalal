import { describe, expect, it } from "vitest";
import type { TrpcContext } from "./_core/context";
import { enforceRateLimit } from "./_core/rateLimit";

function createCtx(ip = "203.0.113.10"): TrpcContext {
  return {
    user: null,
    req: {
      headers: {
        "x-forwarded-for": ip,
      },
    } as unknown as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("enforceRateLimit", () => {
  it("blocks after exceeding the max within the window", () => {
    const ctx = createCtx("203.0.113.11");
    const key = "test:key";

    // allow max=3 within window
    enforceRateLimit(ctx, key, { windowMs: 60_000, max: 3 });
    enforceRateLimit(ctx, key, { windowMs: 60_000, max: 3 });
    enforceRateLimit(ctx, key, { windowMs: 60_000, max: 3 });

    expect(() =>
      enforceRateLimit(ctx, key, { windowMs: 60_000, max: 3 })
    ).toThrow(/Trop de requêtes/i);
  });
});

