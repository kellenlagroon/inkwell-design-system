import type { HTMLAttributes, ReactNode } from "react";

export interface ControlGroupProps extends HTMLAttributes<HTMLDivElement> {
  start?: ReactNode;
  end?: ReactNode;
  stackBelow?: "sm" | "md" | "lg" | "never";
  children?: ReactNode;
}

/** Responsive form/control row with stable start and end alignment. */
export function ControlGroup({ start, end, stackBelow = "sm", className = "", children, ...props }: ControlGroupProps) {
  return (
    <div className={["ink-control-group", stackBelow !== "never" ? `ink-control-group--stack-${stackBelow}` : "", className].filter(Boolean).join(" ")} {...props}>
      <div className="ink-control-group__start">{start ?? children}</div>
      {end ? <div className="ink-control-group__end">{end}</div> : null}
    </div>
  );
}
