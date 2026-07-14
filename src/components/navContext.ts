import { createContext } from "react";
import type { NavVariant } from "./nav";

/**
 * Optional context set by container components (currently `Sidebar`) to
 * signal a default `variant` for any nested `Nav`. Nav consumes this only
 * when its own `variant` prop is not explicitly set.
 */
export const NavVariantContext = createContext<NavVariant | null>(null);
