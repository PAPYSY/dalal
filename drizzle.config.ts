import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to run drizzle commands");
}

const sslEnabled = (process.env.DATABASE_SSL ?? "").toLowerCase();
const useSsl = sslEnabled === "1" || sslEnabled === "true" || sslEnabled === "required";

function getMysqlCredentialsFromUrl(urlString: string) {
  const url = new URL(urlString);
  if (url.protocol !== "mysql:") {
    throw new Error(`Unsupported DATABASE_URL protocol for mysql dialect: ${url.protocol}`);
  }

  const database = url.pathname.replace(/^\//, "");
  if (!database) {
    throw new Error("DATABASE_URL must include a database name (e.g. /dalal)");
  }

  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database,
  };
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: useSsl
    ? {
        ...getMysqlCredentialsFromUrl(connectionString),
        ssl: {
          rejectUnauthorized: (process.env.DATABASE_SSL_REJECT_UNAUTHORIZED ?? "true").toLowerCase() !== "false",
          ca: process.env.DATABASE_SSL_CA?.replace(/\\n/g, "\n"),
        },
      }
    : {
        url: connectionString,
      },
});
