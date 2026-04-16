import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { enforceRateLimit } from "./_core/rateLimit";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getRecentPosts, createPost, addSupport, addRelate, reportPost } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  community: router({
    /** Get recent posts (last 7 days) */
    list: publicProcedure.query(async () => {
      return getRecentPosts(50);
    }),

    /** Create a new anonymous post */
    create: publicProcedure
      .input(z.object({
        pseudonym: z.string().min(1).max(100),
        content: z.string().min(1).max(2000),
        emotion: z.string().max(50).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        enforceRateLimit(ctx, "community:create", { windowMs: 60_000, max: 10 });
        await createPost({
          pseudonym: input.pseudonym,
          content: input.content,
          emotion: input.emotion ?? null,
        });
        return { success: true };
      }),

    /** Add support reaction */
    support: publicProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        enforceRateLimit(ctx, "community:react", { windowMs: 60_000, max: 60 });
        await addSupport(input.postId);
        return { success: true };
      }),

    /** Add relate reaction */
    relate: publicProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        enforceRateLimit(ctx, "community:react", { windowMs: 60_000, max: 60 });
        await addRelate(input.postId);
        return { success: true };
      }),

    /** Report a post */
    report: publicProcedure
      .input(z.object({
        postId: z.number(),
        reason: z.string().min(1).max(255),
      }))
      .mutation(async ({ input, ctx }) => {
        enforceRateLimit(ctx, "community:report", { windowMs: 60_000, max: 10 });
        await reportPost({
          postId: input.postId,
          reason: input.reason,
        });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
