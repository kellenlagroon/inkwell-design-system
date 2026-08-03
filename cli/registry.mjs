/**
 * Source-owned component manifest. Each public entry declares its exact source
 * closure. CSS is deliberately one generated stylesheet: it preserves the
 * library's layered visual contract while consumers own the installed copy.
 */
const css = ["all-components"];
const item = (files, dependsOn = []) => ({ files, dependsOn, css, packages: {} });
const icons = "icons.jsx";
const forms = ["forms.tsx", icons];
const select = ["select.tsx", ...forms];
const ui = ["ui.tsx", "button.tsx", "spinner.tsx", "iconButton.tsx", "pill.tsx", "statusBanner.tsx", "popover.tsx", ...select, icons];

export const registry = {
  "action-group": item(["layout.tsx"]), avatar: item(["avatar.tsx"]), badge: item(["badge.tsx"]),
  button: item(["button.tsx", "spinner.tsx"]), "button-link": item(["button.tsx", "spinner.tsx"]), "text-button": item(["button.tsx", "spinner.tsx"]),
  card: item(["card.tsx"]), "card-actions": item(["card.tsx"]), center: item(["surface.tsx"]),
  checkbox: item(forms), "checkbox-select": item(["checkboxSelect.tsx", "button.tsx", "spinner.tsx", "popover.tsx", ...forms]),
  collapsible: item(["collapsible.tsx", icons]), container: item(["surface.tsx"]), divider: item(["divider.tsx"]),
  drawer: item(["drawer.tsx", icons]), "empty-state": item(ui), "field-group": item(forms), "file-upload": item(forms),
  "form-field": item(forms), grid: item(["layout.tsx"]), heading: item(["text.tsx"]), "icon-button": item(["iconButton.tsx"]),
  inline: item(["layout.tsx"]), link: item(["text.tsx"]), list: item(["list.tsx"]), "modal-frame": item(["modalFrame.tsx", "button.tsx", "spinner.tsx", ...ui]),
  nav: item(["nav.tsx", "navContext.ts"]), pagination: item(["pagination.tsx", ...select]), panel: item(ui), paper: item(["surface.tsx"]),
  "password-input": item(forms), pill: item(["pill.tsx"]), popover: item(["popover.tsx"]), "popover-menu-item": item(["popover.tsx"]),
  progress: item(["progress.tsx"]), "rich-text-safe": item(["richTextSafe.tsx"]), "section-heading": item(ui), select: item(select),
  sidebar: item(["sidebar.tsx", "nav.tsx", "navContext.ts"]), skeleton: item(["skeleton.tsx"]), spinner: item(["spinner.tsx"]),
  "split-button": item(["splitButton.tsx", "popover.tsx", icons]), stack: item(["layout.tsx"]), "status-banner": item(["statusBanner.tsx", icons]),
  "status-summary-compact": item(["statusSummaryCompact.tsx"]), surface: item(["surface.tsx"]), table: item(["table.tsx", icons]),
  tabs: item(["tabs.tsx"]), text: item(["text.tsx"]), "text-input": item(forms), textarea: item(forms), toast: item(ui), "toast-region": item(ui), tooltip: item(["tooltip.tsx"]),
};
