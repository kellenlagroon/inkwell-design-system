import test from "node:test";
import assert from "node:assert/strict";
import { clientPayload, handle } from "./src/index.mjs";

const PASSCODE = "pilot-passcode-value";
const FILE_KEY = "TeLw1zTEVZIqCPR1AjuVPp";
const env = {
  FIGMA_WEBHOOK_PASSCODE: PASSCODE,
  GITHUB_TOKEN: "github-token",
  GITHUB_REPOSITORY: "kellenlagroon/inkwell-design-system",
  FIGMA_FILE_KEY: FILE_KEY,
};

const post = (body, init = {}) =>
  new Request("https://webhook.example/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
    ...init,
  });

function recorder(result = { ok: true, status: 204 }) {
  const calls = [];
  return {
    calls,
    dispatch: async (_env, payload) => {
      calls.push(payload);
      return result;
    },
  };
}

const publish = (overrides = {}) => ({
  event_type: "LIBRARY_PUBLISH",
  passcode: PASSCODE,
  file_key: FILE_KEY,
  file_name: "Inkwell Design System",
  timestamp: "2026-10-16T12:00:00Z",
  webhook_id: "123456",
  library_item: { key: "abc", name: "Inkwell Design System" },
  triggered_by: { id: "1", handle: "Kellen" },
  ...overrides,
});

test("rejects anything but POST", async () => {
  const { dispatch, calls } = recorder();
  const response = await handle(new Request("https://webhook.example/"), env, dispatch);
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "POST");
  assert.equal(calls.length, 0);
});

test("fails closed when a secret or var is missing", async () => {
  const { dispatch, calls } = recorder();
  const response = await handle(post(publish()), { ...env, GITHUB_TOKEN: "" }, dispatch);
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), { error: "worker_not_configured" });
  assert.equal(calls.length, 0);
});

test("rejects a body that is not a JSON object", async () => {
  const { dispatch } = recorder();
  assert.equal((await handle(post("not json"), env, dispatch)).status, 400);
  assert.equal((await handle(post("[1,2]"), env, dispatch)).status, 400);
});

test("rejects an oversized body before parsing it", async () => {
  const { dispatch, calls } = recorder();
  const huge = JSON.stringify({ ...publish(), filler: "x".repeat(300_000) });
  const response = await handle(post(huge), env, dispatch);
  assert.equal(response.status, 413);
  assert.equal(calls.length, 0);
});

test("rejects a missing or wrong passcode", async () => {
  const { dispatch, calls } = recorder();
  assert.equal((await handle(post(publish({ passcode: undefined })), env, dispatch)).status, 401);
  assert.equal((await handle(post(publish({ passcode: "wrong" })), env, dispatch)).status, 401);
  assert.equal((await handle(post(publish({ passcode: `${PASSCODE}x` })), env, dispatch)).status, 401);
  assert.equal(calls.length, 0);
});

test("accepts the registration PING without dispatching", async () => {
  const { dispatch, calls } = recorder();
  const ping = { event_type: "PING", passcode: PASSCODE, webhook_id: "123456", timestamp: "2026-10-16T12:00:00Z" };
  const response = await handle(post(ping), env, dispatch);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, event: "PING" });
  assert.equal(calls.length, 0);
});

test("rejects a PING with a bad passcode so registration fails", async () => {
  const { dispatch } = recorder();
  const ping = { event_type: "PING", passcode: "wrong", webhook_id: "123456" };
  assert.equal((await handle(post(ping), env, dispatch)).status, 401);
});

test("dispatches an authorized publish and never forwards the passcode", async () => {
  const { dispatch, calls } = recorder();
  const response = await handle(post(publish()), env, dispatch);
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { ok: true, dispatched: "figma_library_publish" });
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0], {
    file_key: FILE_KEY,
    file_name: "Inkwell Design System",
    timestamp: "2026-10-16T12:00:00Z",
    webhook_id: "123456",
    library_item_name: "Inkwell Design System",
    triggered_by: "Kellen",
  });
  assert.ok(!JSON.stringify(calls[0]).includes(PASSCODE));
});

test("refuses a publish from an unexpected file key", async () => {
  const { dispatch, calls } = recorder();
  const response = await handle(post(publish({ file_key: "SomeOtherFileKey000000" })), env, dispatch);
  assert.equal(response.status, 403);
  assert.equal(calls.length, 0);
  assert.equal((await handle(post(publish({ file_key: undefined })), env, dispatch)).status, 403);
  assert.equal(calls.length, 0);
});

test("ignores other authorized event types", async () => {
  const { dispatch, calls } = recorder();
  const response = await handle(post(publish({ event_type: "FILE_UPDATE" })), env, dispatch);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, ignored: true, event: "FILE_UPDATE" });
  assert.equal(calls.length, 0);
});

test("reports a GitHub failure as a retryable 502", async () => {
  const { dispatch } = recorder({ ok: false, status: 401 });
  const response = await handle(post(publish()), env, dispatch);
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { error: "dispatch_failed" });
});

test("clientPayload keeps only known string fields", () => {
  const payload = clientPayload({ ...publish(), passcode: "secret", created_components: [{ key: "a" }] });
  assert.deepEqual(Object.keys(payload).sort(), [
    "file_key",
    "file_name",
    "library_item_name",
    "timestamp",
    "triggered_by",
    "webhook_id",
  ]);
  assert.deepEqual(clientPayload({ file_key: FILE_KEY, timestamp: 17 }), { file_key: FILE_KEY });
});
