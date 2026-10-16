# Figma publish pipeline

The [Inkwell Figma library](https://www.figma.com/design/TeLw1zTEVZIqCPR1AjuVPp) is in the Kellen Professional team. The pilot covers palette, semantic colors in Dark and Light modes, spacing, radius, typography styles, and the Button family.

**Status: not live.** Every piece of code is written and tested. The pipeline still needs credentials that only an account holder can create, listed under [Remaining setup](#remaining-setup). Do not describe the pipeline as working until the end-to-end publish test in step 6 passes.

## Publish flow

1. Figma sends `LIBRARY_PUBLISH` to the Cloudflare Worker in [`worker/`](../worker/README.md).
2. The Worker checks the webhook passcode and file key, then sends a GitHub `repository_dispatch` event named `figma_library_publish`.
3. `.github/workflows/figma-library-sync.yml` reads the file's `Token Sync` page through Figma's file API. Its variable-bound probes expose the current values of the pilot's 103 variables in all applicable modes.
4. Changed values update `tokens/inkwell.tokens.json` and the reviewed snapshot. `npm run tokens` regenerates `src/styles/tokens.css`.
5. Tests, typecheck, Storybook, and package builds run. If there is a diff, the workflow opens or updates a draft PR.
6. Merging that PR to `main` runs `.github/workflows/storybook-pages.yml`, which rebuilds Storybook and deploys it to GitHub Pages.

The workflow preserves a simple `var(--token)` alias when the referenced token still resolves to the Figma value. A changed expression that cannot be represented as an alias becomes a literal in the draft PR for review.

## The webhook Worker

[`worker/`](../worker/README.md) is a self-contained Cloudflare Worker with its own `package.json`, lockfile, and tests. It is not part of the published npm package.

- `worker/src/index.mjs` is the handler. It answers `405` to anything but `POST`, `500` when a secret or var is missing, `413` over 256 KiB, `400` on a body that is not a JSON object, and `401` on a missing or wrong passcode. A valid `PING` returns `200` so registration succeeds. `LIBRARY_PUBLISH` from any other file key returns `403`. Any other event type is ignored with `200`. An authorized publish returns `202` once GitHub accepts the dispatch, or `502` so Figma retries.
- The passcode is compared through SHA-256 digests rather than string equality, so the response time does not reveal it. The dispatch payload is built from an allowlist (`file_key`, `file_name`, `timestamp`, `webhook_id`, `library_item_name`, `triggered_by`) so the passcode cannot reach GitHub.
- `worker/wrangler.jsonc` holds only the two non-secret vars, `GITHUB_REPOSITORY` and `FIGMA_FILE_KEY`. `FIGMA_WEBHOOK_PASSCODE` and `GITHUB_TOKEN` are Worker secrets set with `wrangler secret put`; `wrangler deploy` leaves existing secrets in place.
- `.github/workflows/worker-deploy.yml` runs the tests and the `wrangler deploy --dry-run` check on every push touching `worker/`, then deploys when `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` exist as Actions secrets. Until they do, the run posts a notice instead of failing.

Verified locally: 12 handler tests pass under `node --test`, the dry run accepts the config and bundle, and a `wrangler dev` server returned the documented status code for every case above. That run included a real call out to GitHub's API, which answered `401` for a deliberately invalid token and produced the expected `502`.

## Storybook hosting

GitHub Pages, built by `.github/workflows/storybook-pages.yml` on every push to `main` and on demand. The build command is `npm run build-storybook` and the artifact is `storybook-static`. Storybook's output uses relative asset paths, so the project subpath needs no configuration. The repository's Pages source must be **GitHub Actions**.

Cloudflare Pages is a valid alternative, but this pilot deliberately keeps one Cloudflare surface — the Worker — so the webhook receiver is the only thing that needs a Cloudflare account.

## Button Code Connect

The four `.figma.ts` files in `code-connect/` map the published Primary, Secondary, Ghost, and Danger sets to the public React `Button`. They pass through the Figma label and all five sizes. The Figma Disabled state becomes the `disabled` prop; Hover and Focused describe preview states and do not add code props.

They are written in Figma's **template** format, `figma.selectedInstance` plus `figma.code`, which is the actively maintained approach. The framework parsers, including the legacy React one, no longer receive updates.

Figma's direct mapping tool rejects connections on this Professional team, and `get_code_connect_map` for node `7-42` returns an empty object, confirming nothing is published yet. The [Code Connect CLI](https://developers.figma.com/docs/code-connect/) supports Professional with one active framework. Run it from the repository root, where `figma.config.json` lives:

```bash
npx --yes @figma/code-connect@2.0.2 connect parse --exit-on-unreadable-files
npx --yes @figma/code-connect@2.0.2 connect publish --dry-run
npx --yes @figma/code-connect@2.0.2 connect publish
```

`parse` passes with no token: all four templates parse, and the CLI picks up label `React` and language `jsx` from `figma.config.json`. The dry run lists all four nodes (`7-84`, `7-42`, `7-126`, `7-168`) and then stops at `Couldn't find a Figma access token`. That token is the only thing missing.

The CLI is deliberately not a devDependency yet, because `package.json` currently carries an unrelated in-progress v0.3.0 change. Add `@figma/code-connect` as a devDependency and wrap `parse` in an npm script once that release work lands.

## Remaining setup

Each step needs a credential that cannot be created from a checkout. Do not commit any of these values.

1. **Figma access token for Code Connect.** Create one with **Code Connect: write** and **File content: read**. Set it as `FIGMA_ACCESS_TOKEN`, run the dry run and then the publish command above, and check each of the four Button sets in Dev Mode. Requires a Full or Dev seat on the Kellen team.
2. **Figma token for the sync workflow.** Create one with `file_content:read`, `webhooks:read`, and `webhooks:write`. Add it to the repository with `gh secret set FIGMA_TOKEN`. Keep it locally only while registering the webhook in step 4.
3. **Deploy the Worker.** Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as Actions secrets and rerun **Deploy Figma webhook Worker**, or run `npm install && npx wrangler login && npm run deploy` in `worker/`. Then set the two Worker secrets and note the `https://` URL:

   ```bash
   cd worker
   npx wrangler secret put FIGMA_WEBHOOK_PASSCODE
   npx wrangler secret put GITHUB_TOKEN
   ```

   The passcode is a new random string of at most 100 characters. `GITHUB_TOKEN` is a GitHub fine-grained token limited to `kellenlagroon/inkwell-design-system` with **Contents: write**, the permission `repository_dispatch` requires.
4. **Register the webhook.** With the step 2 token, the step 3 passcode, and the Worker URL, run `node scripts/register-figma-webhook.mjs` with `FIGMA_TOKEN`, `FIGMA_WEBHOOK_PASSCODE`, and `FIGMA_WEBHOOK_ENDPOINT` set. Figma sends a `PING` during registration; the Worker answers `200` only if the passcode matches, so a mismatch fails registration instead of creating a dead webhook.
5. **Seed the snapshot.** Run **Sync Figma library** once with **Run workflow**. A no-change result is expected, and it proves `FIGMA_TOKEN` can read the `Token Sync` probes.
6. **End-to-end test.** Change one pilot variable in Figma and publish the library. Confirm, in order: a `202` in the Worker's logs, a **Sync Figma library** run triggered by `repository_dispatch`, a draft PR containing both the token JSON and the `src/styles/tokens.css` change, and, after merging, the new value live in the Pages Storybook.

Repository settings already configured: the Pages source is **GitHub Actions**, and **Allow GitHub Actions to create and approve pull requests** is enabled so the sync workflow's short-lived `GITHUB_TOKEN` can open the draft PR with its requested `contents: write` and `pull-requests: write`.

## Scope and limits

- The automatic code update covers the 103 pilot variable values and their resulting Storybook styles. The Button component is bound to those tokens.
- Direct changes to Button structure, text layout, icons, loading behavior, or unbound geometry still require a reviewed component implementation. The workflow does not generate arbitrary React code from Figma layers.
- Figma's Variables REST API requires Enterprise. The `Token Sync` page provides reactive export probes through the file API on the Professional plan. Keep their bindings and names intact; a missing or detached probe fails the workflow instead of applying a stale value.
- Figma may send several publish events for one release. The Worker dispatches each one; the workflow's `figma-library-sync` concurrency group serializes them and skips a PR when the code already matches the latest probes.
- The `codex/figma-sync-*` PR branch is managed by the workflow. Make review edits on another branch; a later publish can replace that branch's contents.
