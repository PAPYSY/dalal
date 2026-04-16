import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { originGate } from "./security";
import { validateEnv } from "./validateEnv";

export function createExpressApp() {
  const validatedEnv = validateEnv();

  const app = express();

  // Correct client IP / protocol behind Vercel proxy
  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  app.use(
    helmet({
      // CSP is set at the edge (Vercel headers). Keep server-side CSP off to avoid
      // accidental breakage when adding external scripts (maps, fonts, etc.).
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );

  // CORS: keep strict; only enable explicit origins when configured.
  // (For same-origin usage, browsers won't need CORS anyway.)
  const allowedOrigins = (validatedEnv.APP_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
  app.use(
    cors({
      origin:
        allowedOrigins.length > 0
          ? (
              origin: string | undefined,
              cb: (err: Error | null, allow?: boolean) => void
            ) => {
              if (!origin) return cb(null, true);
              return cb(null, allowedOrigins.includes(origin));
            }
          : false,
      credentials: true,
    })
  );

  // Body parsers (keep conservative; uploads should use dedicated endpoints)
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  // Minimal CSRF protection for cookie-based auth
  app.use(
    originGate({
      allowedOriginsEnv: validatedEnv.APP_ALLOWED_ORIGINS,
      paths: ["/api/trpc", "/api/oauth/callback"],
    })
  );

  // Basic global rate limiting on API endpoint
  app.use(
    "/api/trpc",
    rateLimit({
      windowMs: 60_000,
      limit: 300,
      standardHeaders: "draft-7",
      legacyHeaders: false,
    })
  );

  // Tight limiter for OAuth callback to reduce abuse
  app.use(
    "/api/oauth/callback",
    rateLimit({
      windowMs: 60_000,
      limit: 30,
      standardHeaders: "draft-7",
      legacyHeaders: false,
    })
  );

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  return app;
}

