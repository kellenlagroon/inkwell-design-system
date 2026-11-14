"use client";

import { useEffect, useState } from "react";
import { Button, Heading, Text } from "@lagroon/inkwell-design-system";

type Snapshot = {
  bodyFont: string;
  headingFont: string;
  canvas: string;
  controlHeight: string;
  buttonHeight: string;
};

function readSnapshot(): Snapshot {
  const root = getComputedStyle(document.documentElement);
  const button = document.querySelector<HTMLButtonElement>("#adoption-button");
  const heading = document.querySelector<HTMLElement>("#adoption-heading");
  return {
    bodyFont: getComputedStyle(document.body).fontFamily,
    headingFont: heading ? getComputedStyle(heading).fontFamily : "",
    canvas: getComputedStyle(document.body).backgroundColor,
    controlHeight: root.getPropertyValue("--control-md-height").trim(),
    buttonHeight: button ? getComputedStyle(button).height : "",
  };
}

export function AdoptionProbe() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    setSnapshot(readSnapshot());
  }, [theme]);

  const passed = snapshot !== null
    && /Source.Sans.3/i.test(snapshot.bodyFont)
    && /League.Spartan/i.test(snapshot.headingFont)
    && snapshot.canvas !== "rgba(0, 0, 0, 0)"
    && snapshot.controlHeight === "40px"
    && snapshot.buttonHeight === "40px";

  return (
    <div className="adoption-probe">
      <Heading id="adoption-heading" level={2} size="sm">Consumer contract</Heading>
      <Text>Toggle the theme and inspect the resolved values below.</Text>
      <div className="adoption-actions">
        <Button id="adoption-button">Default Button</Button>
        <Button variant="secondary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          Switch to {theme === "dark" ? "light" : "dark"}
        </Button>
      </div>
      <output className="adoption-result" aria-live="polite">
        {snapshot ? (passed ? "PASS" : "CHECK") : "Measuring…"} · {theme} theme
      </output>
      {snapshot ? (
        <dl className="adoption-values">
          <dt>Body font</dt><dd>{snapshot.bodyFont}</dd>
          <dt>Display font</dt><dd>{snapshot.headingFont}</dd>
          <dt>Canvas background</dt><dd>{snapshot.canvas}</dd>
          <dt>Control token</dt><dd>{snapshot.controlHeight}</dd>
          <dt>Button height</dt><dd>{snapshot.buttonHeight}</dd>
        </dl>
      ) : null}
    </div>
  );
}
