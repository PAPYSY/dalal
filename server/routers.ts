import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { enforceRateLimit } from "./_core/rateLimit";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getRecentPosts, createPost, addSupport, addRelate, reportPost, getChatMessages, sendChatMessage } from "./db";
import { invokeLLM } from "./_core/llm";

const SYSTEM_PROMPT = `Tu es un compagnon d'écoute bienveillant sur Dallaal, une plateforme de bien-être mental pour la jeunesse sénégalaise et ouest-africaine.

Ton rôle est d'écouter, pas de résoudre. Tu accueilles ce que la personne dit avant de proposer quoi que ce soit.

Règles absolues:
- Ne pose jamais de diagnostic
- Ne prescris jamais rien
- Si la personne mentionne des pensées suicidaires ou un danger immédiat, oriente doucement vers l'espace Urgence et le +221 33 825 50 22
- Ne demande jamais de nom, d'âge, ou de lieu — l'anonymat est sacré

Ta façon d'être:
- Chaleureux, patient, poétique — comme un feu de camp dans la savane
- Tes réponses sont courtes (2-4 phrases) sauf si la personne a besoin de plus
- Tu uses d'images naturelles: baobab, fleuve, étoiles, aube, pluie
- Tu peux glisser un mot en wolof si c'est naturel (ex: "dallaal")
- Tu rappelles parfois les espaces: exercices (/exercices), urgence (/urgence)

Commence toujours par accueillir ce que la personne exprime.`;

const roomIdSchema = z.enum(['general', 'tristesse', 'anxiete', 'famille', 'amour', 'deuil']);

export const appRouter = router({
  system: systemRouter,

  ai: router({
    chat: publicProcedure
      .input(z.object({
        messages: z.array(z.object({
          role: z.enum(['user', 'assistant']),
          content: z.string().min(1).max(2000),
        })).min(1).max(30),
      }))
      .mutation(async ({ input, ctx }) => {
        enforceRateLimit(ctx, 'ai:chat', { windowMs: 60_000, max: 20 });
        if (!process.env.BUILT_IN_FORGE_API_KEY) {
          return { message: "Je suis là, mais mon souffle n'est pas encore connecté en local. Déploie sur Vercel pour me réveiller pleinement. En attendant, les autres espaces de Dallaal t'attendent." };
        }
        try {
          const result = await invokeLLM({
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...input.messages,
            ],
          });
          const raw = result.choices[0]?.message?.content ?? '';
          const message = typeof raw === 'string' ? raw : '';
          return { message };
        } catch {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: "Le compagnon IA n'est pas disponible pour le moment. Réessaie dans quelques instants.",
          });
        }
      }),
  }),

  peerChat: router({
    messages: publicProcedure
      .input(z.object({ roomId: roomIdSchema }))
      .query(async ({ input }) => {
        return getChatMessages(input.roomId);
      }),

    send: publicProcedure
      .input(z.object({
        roomId: roomIdSchema,
        pseudonym: z.string().min(1).max(100),
        content: z.string().min(1).max(500),
      }))
      .mutation(async ({ input, ctx }) => {
        enforceRateLimit(ctx, 'chat:send', { windowMs: 60_000, max: 10 });
        await sendChatMessage(input);
        return { success: true };
      }),
  }),

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
