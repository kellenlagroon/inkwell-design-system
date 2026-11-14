import "@lagroon/inkwell-design-system/styles.css";
import "./page.css";

import { League_Spartan, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";

const bodyFont = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans" });
const displayFont = League_Spartan({ subsets: ["latin"], variable: "--font-league-spartan" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="inkwell-page">{children}</body>
    </html>
  );
}
