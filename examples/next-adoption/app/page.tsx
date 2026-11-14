"use client";

import { Card, Heading, Text } from "@lagroon/inkwell-design-system";
import { AdoptionProbe } from "./probe";

export default function Page() {
  return (
    <main className="adoption-page">
      <Heading level={1} size="lg">Inkwell in Next.js</Heading>
      <Text>Package styles, variable fonts, theme tokens, and control density in a consumer app.</Text>
      <Card variant="outlined">
        <AdoptionProbe />
      </Card>
    </main>
  );
}
