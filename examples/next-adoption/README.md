# Next.js adoption check

This small App Router consumer imports Inkwell from a local package install,
loads Source Sans 3 and League Spartan through `next/font`, and shows computed
font, theme, token, and Button height values. It is separate from Storybook so
package exports and the bundled stylesheet are exercised as a consumer sees
them. The page is a Client Component because the package's bundled entry point
also contains interactive components that use React client hooks.

From the Inkwell repository root:

```bash
npm run build
npm install --prefix examples/next-adoption
npm run build --prefix examples/next-adoption
npm run dev --prefix examples/next-adoption
```

Open the local Next.js page. Both dark and light themes should report `PASS`;
the body and heading should show the two Next font families, and the default
Button should measure 40px high. The build uses `next/font/google`, so its
first build needs access to fetch the font files for local self-hosting.
