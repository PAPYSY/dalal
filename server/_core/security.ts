import type { RequestHandler } from "express";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function parseAllowedOrigins(value: string | undefined): Set<string> | null {
  if (!value) return null;
  const parts = value
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
  return parts.length > 0 ? new Set(parts) : null;
}

function getRequestOrigin(req: Parameters<RequestHandler>[0]) {
  const origin = req.headers.origin;
  return typeof origin === "string" ? origin : undefined;
}

function getRequestUrl(req: Parameters<RequestHandler>[0]) {
  // When middleware is mounted (e.g. app.use("/api/trpc", ...)),
  // req.path becomes "/" and we must use originalUrl for prefix checks.
  const url = (req as any).originalUrl;
  return typeof url === "string" ? url : req.url;
}

function isAllowedOrigin(origin: string, allowed: Set<string>) {
  return allowed.has(origin);
}

function deriveSelfOrigin(req: Parameters<RequestHandler>[0]) {
  const host = req.headers.host;
  if (!host) return undefined;
  const forwardedProto = req.headers["x-forwarded-proto"];
  const proto =
    typeof forwardedProto === "string"
      ? forwardedProto.split(",")[0]?.trim()
      : req.protocol;
  const normalizedProto = proto?.toLowerCase() === "https" ? "https" : "http";
  return `${normalizedProto}://${host}`;
}

/**
 * Minimal CSRF protection for cookie-based auth:
 * - For state-changing requests, if a browser Origin header exists, enforce it.
 * - If APP_ALLOWED_ORIGINS is set, only those origins are allowed.
 * - Otherwise, allow only the current host origin (derived from request).
 */
export function originGate(opts?: {
  allowedOriginsEnv?: string | undefined;
  paths?: string[];
}): RequestHandler {
  const allowedFromEnv = parseAllowedOrigins(opts?.allowedOriginsEnv);
  const pathPrefixes = opts?.paths ?? ["/api/trpc", "/api/oauth/callback"];

  return (req, res, next) => {
    if (SAFE_METHODS.has(req.method)) return next();
    const url = getRequestUrl(req);
    if (!pathPrefixes.some(p => url.startsWith(p))) return next();

    const origin = getRequestOrigin(req);
    if (!origin) {
      // Non-browser clients or same-origin without Origin header
      return next();
    }

    if (allowedFromEnv) {
      if (!isAllowedOrigin(origin, allowedFromEnv)) {
        res.status(403).json({ error: "Forbidden origin" });
        return;
      }
      return next();
    }

    const selfOrigin = deriveSelfOrigin(req);
    if (!selfOrigin || origin !== selfOrigin) {
      res.status(403).json({ error: "Forbidden origin" });
      return;
    }

    return next();
  };
}

