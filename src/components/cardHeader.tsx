import type { HTMLAttributes, ReactNode } from "react";

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  metadata?: ReactNode;
  badges?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

/** Responsive card header with stable title, badge, metadata, and action slots. */
export function CardHeader({ title, metadata, badges, actions, className = "", children, ...props }: CardHeaderProps) {
  return (
    <div className={["ink-card-header", className].filter(Boolean).join(" ")} {...props}>
      <div className="ink-card-header__main">
        <div className="ink-card-header__title-row">
          <div className="ink-card-header__title">{title}</div>
          {badges ? <div className="ink-card-header__badges">{badges}</div> : null}
        </div>
        {metadata ? <div className="ink-card-header__metadata">{metadata}</div> : null}
        {children}
      </div>
      {actions ? <div className="ink-card-header__actions">{actions}</div> : null}
    </div>
  );
}
