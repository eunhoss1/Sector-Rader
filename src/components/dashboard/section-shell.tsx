import type { PropsWithChildren, ReactNode } from "react";

type SectionShellProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}>;

export function SectionShell({ eyebrow, title, description, action, children }: SectionShellProps) {
  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-normal text-primary">{eyebrow}</p>
          <h2 className="mt-1 text-lg font-semibold tracking-normal text-foreground">{title}</h2>
          {description ? <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
