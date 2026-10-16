const fileKey = "TeLw1zTEVZIqCPR1AjuVPp";
const token = process.env.FIGMA_TOKEN;
const passcode = process.env.FIGMA_WEBHOOK_PASSCODE;
const endpoint = process.env.FIGMA_WEBHOOK_ENDPOINT;

if (!token || !passcode || !endpoint) {
  throw new Error("Set FIGMA_TOKEN, FIGMA_WEBHOOK_PASSCODE, and FIGMA_WEBHOOK_ENDPOINT");
}
if (passcode.length > 100 || new URL(endpoint).protocol !== "https:") {
  throw new Error("Webhook passcode must be at most 100 characters and endpoint must use HTTPS");
}

const headers = { "X-Figma-Token": token, "Content-Type": "application/json" };
const list = await fetch(`https://api.figma.com/v2/webhooks?context=file&context_id=${fileKey}`, { headers });
if (!list.ok) throw new Error(`Could not list Figma webhooks: HTTP ${list.status}`);
const existing = (await list.json()).webhooks ?? [];
const match = existing.find((item) => item.event_type === "LIBRARY_PUBLISH" && item.endpoint === endpoint);
if (match) {
  console.log(`Library publish webhook already exists: ${match.id} (${match.status})`);
  process.exit(0);
}

const response = await fetch("https://api.figma.com/v2/webhooks", {
  method: "POST",
  headers,
  body: JSON.stringify({
    event_type: "LIBRARY_PUBLISH",
    context: "file",
    context_id: fileKey,
    endpoint,
    passcode,
    description: "Inkwell library publish to draft code PR",
  }),
});
if (!response.ok) throw new Error(`Could not create Figma webhook: HTTP ${response.status}`);
const webhook = await response.json();
console.log(`Created library publish webhook: ${webhook.id} (${webhook.status})`);
