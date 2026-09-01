/**
 * Source-owned component manifest. Each public entry declares its exact source
 * closure. CSS is deliberately one generated stylesheet: it preserves the
 * library's layered visual contract while consumers own the installed copy.
 */
const css = ["all-components"];
const item = (files, dependsOn = []) => ({ files, dependsOn, css, packages: {} });
const icons = "icons.jsx";
const density = "controlDensity.ts";
const button = ["button.tsx", "spinner.tsx", density];
const trigger = ["controlTrigger.tsx", density];
const forms = ["forms.tsx", icons, ...button];
const select = ["select.tsx", ...trigger, ...forms];
const ui = ["ui.tsx", ...button, "iconButton.tsx", "pill.tsx", "statusBanner.tsx", "popover.tsx", ...select, icons];

export const registry = {
  "action-group": item(["layout.tsx"]), avatar: item(["avatar.tsx"]), badge: item(["badge.tsx"]),
  button: item(button), "button-link": item(button), "text-button": item(button), "text-disclosure": item(button),
  card: item(["card.tsx"]), "card-actions": item(["card.tsx"]), "card-header": item(["cardHeader.tsx"]), center: item(["surface.tsx"]),
  checkbox: item(forms), "checkbox-select": item(["checkboxSelect.tsx", "popover.tsx", ...trigger, ...forms]),
  collapsible: item(["collapsible.tsx", icons]), container: item(["surface.tsx"]), "control-group": item(["controlGroup.tsx"]), "control-trigger": item(trigger), divider: item(["divider.tsx"]),
  drawer: item(["drawer.tsx", icons]), "empty-state": item(ui), "field-group": item(forms), "file-upload": item(forms),
  "form-field": item(forms), grid: item(["layout.tsx"]), heading: item(["text.tsx"]), "icon-button": item(["iconButton.tsx"]),
  inline: item(["layout.tsx"]), link: item(["text.tsx"]), list: item(["list.tsx"]), "modal-frame": item(["modalFrame.tsx", ...button, ...ui]),
  nav: item(["nav.tsx", "navContext.ts"]), pagination: item(["pagination.tsx", ...select]), panel: item(ui), paper: item(["surface.tsx"]),
  "password-input": item(forms), pill: item(["pill.tsx"]), popover: item(["popover.tsx"]), "popover-menu-item": item(["popover.tsx"]),
  progress: item(["progress.tsx"]), "rich-text-safe": item(["richTextSafe.tsx"]), "section-heading": item(ui), select: item(select),
  sidebar: item(["sidebar.tsx", "nav.tsx", "navContext.ts"]), skeleton: item(["skeleton.tsx"]), spinner: item(["spinner.tsx"]),
  "split-button": item(["splitButton.tsx", "popover.tsx", icons, density]), stack: item(["layout.tsx"]), "status-banner": item(["statusBanner.tsx", icons]),
  "status-summary-compact": item(["statusSummaryCompact.tsx"]), surface: item(["surface.tsx"]), table: item(["table.tsx", icons]),
  tabs: item(["tabs.tsx", density]), text: item(["text.tsx"]), "text-input": item(forms), textarea: item(forms), toast: item(ui), "toast-region": item(ui), tooltip: item(["tooltip.tsx"]),
};
