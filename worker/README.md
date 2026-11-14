# Inkwell Figma webhook Worker

Receives Figma's `LIBRARY_PUBLISH` webhook for the Inkwell library, validates
it, and forwards authorized publishes to GitHub as a `repository_dispatch`
event named `figma_library_publish`. See
[`docs/figma-pipeline.md`](../docs/figma-pipeline.md) for the whole pipeline.

## Behavior

| Request | Response |
| --- | --- |
| Anything but `POST` | `405` with `Allow: POST` |
| Missing secret or var | `500 worker_not_configured` |
| Body over 256 KiB | `413 payload_too_large` |
| Body that is not a JSON object | `400 invalid_json` |
| Missing or wrong `passcode` | `401 invalid_passcode` |
| `PING` with a valid passcode | `200` — registration succeeds, nothing dispatched |
| `LIBRARY_PUBLISH` from another file | `403 unexpected_file_key` |
| Any other event type | `200` ignored |
| `LIBRARY_PUBLISH` for the pilot file | `202` after GitHub accepts the dispatch |
| GitHub rejects the dispatch | `502 dispatch_failed`, so Figma retries |

The passcode is compared through SHA-256 digests so the response time does not
reveal it, and the dispatch payload is built from an allowlist (`file_key`,
`file_name`, `timestamp`, `webhook_id`, `library_item_name`, `triggered_by`) so
the passcode can never reach GitHub.

## Configuration

`wrangler.jsonc` holds the two non-secret vars: `GITHUB_REPOSITORY` and
`FIGMA_FILE_KEY`. The two secrets live only in the platform:

```bash
npx wrangler secret put FIGMA_WEBHOOK_PASSCODE
npx wrangler secret put GITHUB_TOKEN
```

`GITHUB_TOKEN` is a GitHub fine-grained token limited to
`kellenlagroon/inkwell-design-system` with **Contents: write** — the permission
`repository_dispatch` requires. Do not commit either value.

## Commands

```bash
npm install
npm test     # node:test against the handler
npm run check # wrangler deploy --dry-run, validates config and bundle
npm run dev   # local server; put test values in .dev.vars (gitignored)
npm run deploy
```

CI runs the tests and the dry-run check on every push that touches `worker/`,
and deploys when `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` exist as
Actions secrets.
