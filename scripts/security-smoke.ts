type CheckResult = { name: string; ok: boolean; details?: string };

function assertEnv(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing env var ${name}`);
}

async function httpCheck(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  const text = await res.text().catch(() => "");
  return { res, text };
}

async function main() {
  const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
  const allowedOrigin = process.env.ALLOWED_ORIGIN ?? baseUrl;
  const evilOrigin = process.env.EVIL_ORIGIN ?? "http://evil.example";

  const results: CheckResult[] = [];

  // 1) Front root reachable
  {
    const { res } = await httpCheck(`${baseUrl}/`);
    results.push({
      name: "GET / returns 200",
      ok: res.status === 200,
      details: `status=${res.status}`,
    });
  }

  // 2) tRPC health works in batch format (same as httpBatchLink)
  {
    const url =
      `${baseUrl}/api/trpc/system.health` +
      `?batch=1&input=${encodeURIComponent(
        JSON.stringify({ 0: { json: { timestamp: 0 } } })
      )}`;
    const { res, text } = await httpCheck(url, {
      headers: { Origin: allowedOrigin },
    });
    results.push({
      name: "tRPC system.health batch returns 200",
      ok: res.status === 200,
      details: `status=${res.status}${text ? ` body=${text.slice(0, 200)}` : ""}`,
    });
  }

  // 3) OriginGate blocks evil origins on state-changing endpoints
  {
    const { res } = await httpCheck(`${baseUrl}/api/trpc`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Origin: evilOrigin,
      },
      body: JSON.stringify({}),
    });
    results.push({
      name: "OriginGate blocks evil Origin (403)",
      ok: res.status === 403,
      details: `status=${res.status}`,
    });
  }

  // 4) OriginGate allows allowed origin (should not be 403)
  {
    const { res } = await httpCheck(`${baseUrl}/api/trpc`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Origin: allowedOrigin,
      },
      body: JSON.stringify({}),
    });
    results.push({
      name: "OriginGate allows allowed Origin (not 403)",
      ok: res.status !== 403,
      details: `status=${res.status}`,
    });
  }

  const failed = results.filter(r => !r.ok);
  for (const r of results) {
    // eslint-disable-next-line no-console
    console.log(`${r.ok ? "PASS" : "FAIL"}: ${r.name}${r.details ? ` (${r.details})` : ""}`);
  }

  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error("security-smoke failed:", err);
  process.exitCode = 1;
});

