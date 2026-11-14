/**
 * Cloudflare Worker that receives Figma's LIBRARY_PUBLISH webhook for the
 * Inkwell design library and forwards authorized publishes to GitHub as a
 * `repository_dispatch` event.
 *
 * Secrets (set with `wrangler secret put`, never committed):
 *   FIGMA_WEBHOOK_PASSCODE  the passcode registered with the Figma webhook
 *   GITHUB_TOKEN            fine-grained token, Contents: write on the repo
 * Vars (wrangler.jsonc):
 *   GITHUB_REPOSITORY       owner/repo to dispatch to
 *   FIGMA_FILE_KEY          the only file key allowed to trigger a dispatch
 */

const DISPATCH_EVENT = "figma_library_publish";
const MAX_BODY_BYTES = 262_144;
const encoder = new TextEncoder();

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

/** Compare digests so the response time does not reveal the passcode. */
async function constantTimeEquals(left, right) {
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const x = new Uint8Array(a);
  const y = new Uint8Array(b);
  let diff = 0;
  for (let index = 0; index < x.length; index += 1) diff |= x[index] ^ y[index];
  return diff === 0;
}

/**
 * Build the dispatch payload from an explicit allowlist. The webhook passcode
 * must never reach GitHub, so fields are copied in rather than deleted out.
 */
export function clientPayload(event) {
  const fields = {
    file_key: event.file_key,
    file_name: event.file_name,
    timestamp: event.timestamp,
    webhook_id: event.webhook_id,
    library_item_name: event.library_item?.name,
    triggered_by: event.triggered_by?.handle,
  };
  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => typeof value === "string" && value !== ""),
  );
}

async function dispatchToGitHub(env, payload) {
  const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPOSITORY}/dispatches`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.GITHUB_TOKEN}`,
      accept: "application/vnd.github+json",
      "x-github-api-version": "2022-11-28",
      "user-agent": "inkwell-figma-webhook",
      "content-type": "application/json",
    },
    body: JSON.stringify({ event_type: DISPATCH_EVENT, client_payload: payload }),
  });
  if (!response.ok) return { ok: false, status: response.status };
  return { ok: true, status: response.status };
}

async function readBody(request) {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return { tooLarge: true };
  const text = await request.text();
  if (encoder.encode(text).byteLength > MAX_BODY_BYTES) return { tooLarge: true };
  try {
    const event = JSON.parse(text);
    if (!event || typeof event !== "object" || Array.isArray(event)) return { invalid: true };
    return { event };
  } catch {
    return { invalid: true };
  }
}

/** The request handler. `dispatch` is injected by the tests. */
export async function handle(request, env, dispatch = dispatchToGitHub) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });
  }
  if (!env?.FIGMA_WEBHOOK_PASSCODE || !env?.GITHUB_TOKEN || !env?.GITHUB_REPOSITORY || !env?.FIGMA_FILE_KEY) {
    console.error("Worker is missing required secrets or vars");
    return json(500, { error: "worker_not_configured" });
  }

  const body = await readBody(request);
  if (body.tooLarge) return json(413, { error: "payload_too_large" });
  if (body.invalid) return json(400, { error: "invalid_json" });
  const event = body.event;

  if (typeof event.passcode !== "string" || !(await constantTimeEquals(event.passcode, env.FIGMA_WEBHOOK_PASSCODE))) {
    return json(401, { error: "invalid_passcode" });
  }

  // Figma sends a PING when the webhook is registered; it carries no file key.
  if (event.event_type === "PING") {
    return json(200, { ok: true, event: "PING" });
  }
  if (event.event_type !== "LIBRARY_PUBLISH") {
    return json(200, { ok: true, ignored: true, event: event.event_type ?? null });
  }
  if (event.file_key !== env.FIGMA_FILE_KEY) {
    console.warn("Rejected LIBRARY_PUBLISH for an unexpected file key");
    return json(403, { error: "unexpected_file_key" });
  }

  const result = await dispatch(env, clientPayload(event));
  if (!result.ok) {
    console.error(`GitHub dispatch failed: HTTP ${result.status}`);
    return json(502, { error: "dispatch_failed" });
  }
  return json(202, { ok: true, dispatched: DISPATCH_EVENT });
}

export default { fetch: (request, env) => handle(request, env) };
