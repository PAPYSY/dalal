import { z } from "zod";

const nonEmpty = z.string().trim().min(1);
const strongSecret = z.string().min(32, "must be at least 32 characters long");

const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  PORT: z.string().optional(),

  // Auth/session
  JWT_SECRET: strongSecret,

  // OAuth + app
  VITE_APP_ID: nonEmpty,
  OAUTH_SERVER_URL: nonEmpty,

  // DB (required if you run migrations / community features)
  DATABASE_URL: z.string().optional(),
  DATABASE_SSL: z.string().optional(),
  DATABASE_SSL_REJECT_UNAUTHORIZED: z.string().optional(),
  DATABASE_SSL_CA: z.string().optional(),
  DATABASE_POOL_LIMIT: z.string().optional(),

  // Optional: restrict allowed browser origins for state-changing requests
  // Comma-separated list like: "https://dalal.app,https://www.dalal.app"
  APP_ALLOWED_ORIGINS: z.string().optional(),

  // Optional: owner/admin bootstrap
  OWNER_OPEN_ID: z.string().optional(),

  // Optional: Manus forge proxy
  BUILT_IN_FORGE_API_URL: z.string().optional(),
  BUILT_IN_FORGE_API_KEY: z.string().optional(),
});

export type ValidatedEnv = z.infer<typeof envSchema>;

export function validateEnv(): ValidatedEnv {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const errors = parsed.error.issues
      .map(i => `${i.path.join(".") || "env"}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${errors}`);
  }
  return parsed.data;
}

