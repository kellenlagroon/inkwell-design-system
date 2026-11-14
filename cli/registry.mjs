/**
 * Source-owned component manifest. Each public entry declares its exact source
 * closure. Fragment IDs follow canonical source modules, so shared source
 * dependencies bring their CSS once in the opt-in fragment mode.
 */
export const cssFragmentByFile = Object.fromEntries([
  "avatar.tsx", "badge.tsx", "button.tsx", "card.tsx", "cardHeader.tsx",
  "checkboxSelect.tsx", "collapsible.tsx", "controlGroup.tsx",
  "controlTrigger.tsx", "divider.tsx", "drawer.tsx", "forms.tsx",
  "expandableContent.tsx", "iconButton.tsx", "layout.tsx", "list.tsx", "modalFrame.tsx", "nav.tsx",
  "pagination.tsx", "pill.tsx", "popover.tsx", "progress.tsx",
  "richTextSafe.tsx", "select.tsx", "sidebar.tsx", "skeleton.tsx",
  "spinner.tsx", "splitButton.tsx", "statusBanner.tsx", "statusDetailsPopover.tsx",
  "statusSummaryCompact.tsx", "surface.tsx", "table.tsx", "tabs.tsx",
  "text.tsx", "tooltip.tsx", "ui.tsx",
].map((file) => [file, file.slice(0, -4)]));
const noCssFiles = new Set(["controlDensity.ts", "icons.jsx", "navContext.ts"]);
const item = (files, dependsOn = []) => {
  for (const file of files) {
    if (!cssFragmentByFile[file] && !noCssFiles.has(file)) throw new Error(`Missing CLI CSS ownership for ${file}`);
  }
  return {
    files,
    dependsOn,
    css: [...new Set(["shared", ...files.map((file) => cssFragmentByFile[file]).filter(Boolean)])],
    packages: {},
  };
};
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
  "expandable-content": item(["expandableContent.tsx", ...button]),
  "form-field": item(forms), grid: item(["layout.tsx"]), heading: item(["text.tsx"]), "icon-button": item(["iconButton.tsx"]),
  inline: item(["layout.tsx"]), link: item(["text.tsx"]), list: item(["list.tsx"]), "modal-frame": item(["modalFrame.tsx", ...button, ...ui]),
  nav: item(["nav.tsx", "navContext.ts"]), pagination: item(["pagination.tsx", ...select]), panel: item(ui),
  "password-input": item(forms), pill: item(["pill.tsx"]), popover: item(["popover.tsx"]), "popover-menu-item": item(["popover.tsx"]),
  progress: item(["progress.tsx"]), "rich-text-safe": item(["richTextSafe.tsx"]), "section-heading": item(ui), select: item(select),
  sidebar: item(["sidebar.tsx", "nav.tsx", "navContext.ts"]), skeleton: item(["skeleton.tsx"]), spinner: item(["spinner.tsx"]),
  "split-button": item(["splitButton.tsx", "popover.tsx", icons, density]), stack: item(["layout.tsx"]), "status-banner": item(["statusBanner.tsx", icons]),
  "status-summary-compact": item(["statusSummaryCompact.tsx"]), surface: item(["surface.tsx"]), table: item(["table.tsx", icons]),
  "status-details-popover": item(["statusDetailsPopover.tsx", "popover.tsx", icons]),
  tabs: item(["tabs.tsx", density]), text: item(["text.tsx"]), "text-input": item(forms), textarea: item(forms), toast: item(ui), "toast-region": item(ui), tooltip: item(["tooltip.tsx"]),
};
